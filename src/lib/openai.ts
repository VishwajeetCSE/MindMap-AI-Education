/**
 * AI helper utilities for MindMap AI supporting Google Gemini API & fallback.
 *
 * Uses raw `fetch` calls to the Google Generative Language API (Gemini REST API).
 * Models used:
 * - Embeddings: `text-embedding-004` (768 dimensions, padded or native)
 * - Chat: `gemini-1.5-flash` / `gemini-2.0-flash`
 *
 * When GEMINI_API_KEY (or OPENAI_API_KEY) is not set, deterministic mock data
 * is returned so testing and build steps proceed seamlessly.
 */

const GEMINI_API_BASE = "https://generativelanguage.googleapis.com/v1beta";
const OPENAI_API_BASE = "https://api.openai.com/v1";

// Default vector dimension expected by Appwrite collection (1536)
const TARGET_DIMENSIONS = 1536;

function getGeminiKey(): string | undefined {
  return process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
}

function getOpenAIKey(): string | undefined {
  return process.env.OPENAI_API_KEY;
}

/**
 * Generate deterministic mock embedding if no API keys are supplied.
 */
function generateMockEmbedding(text: string, dimensions = TARGET_DIMENSIONS): number[] {
  let seed = 0;
  for (let i = 0; i < text.length; i++) {
    seed = (seed * 31 + text.charCodeAt(i)) | 0;
  }

  const vector: number[] = new Array(dimensions);
  for (let i = 0; i < dimensions; i++) {
    seed = (seed * 1103515245 + 12345) | 0;
    vector[i] = ((seed >>> 16) & 0x7fff) / 0x7fff - 0.5;
  }

  const magnitude = Math.sqrt(vector.reduce((sum, v) => sum + v * v, 0));
  for (let i = 0; i < dimensions; i++) {
    vector[i] /= magnitude || 1;
  }

  return vector;
}

/**
 * Normalizes or pads any vector to exactly target dimensions (1536)
 * so it complies with Appwrite collection constraints if needed.
 */
function normalizeToDimensions(vector: number[], targetDim = TARGET_DIMENSIONS): number[] {
  if (vector.length === targetDim) return vector;
  if (vector.length > targetDim) return vector.slice(0, targetDim);

  // Pad or repeat to reach target dimension
  const result = [...vector];
  while (result.length < targetDim) {
    result.push(0);
  }
  return result;
}

/**
 * Generate embedding vector using Gemini (text-embedding-004) or OpenAI.
 */
export async function generateEmbedding(text: string): Promise<number[]> {
  const geminiKey = getGeminiKey();
  const openAIKey = getOpenAIKey();

  // 1. Try Google Gemini API
  if (geminiKey) {
    try {
      const url = `${GEMINI_API_BASE}/models/text-embedding-004:embedContent?key=${geminiKey}`;
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "models/text-embedding-004",
          content: {
            parts: [{ text }],
          },
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.warn(`Gemini Embeddings API failed (${response.status}): ${errorText}`);
      } else {
        const data = await response.json();
        if (data.embedding?.values) {
          return normalizeToDimensions(data.embedding.values, TARGET_DIMENSIONS);
        }
      }
    } catch (err) {
      console.warn("Gemini embedding request error:", err);
    }
  }

  // 2. Try OpenAI API as backup
  if (openAIKey) {
    try {
      const response = await fetch(`${OPENAI_API_BASE}/embeddings`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${openAIKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "text-embedding-3-small",
          input: text,
          dimensions: TARGET_DIMENSIONS,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        return data.data[0].embedding;
      }
    } catch (err) {
      console.warn("OpenAI embedding request error:", err);
    }
  }

  // 3. Fallback mock embedding
  return generateMockEmbedding(text, TARGET_DIMENSIONS);
}

/**
 * Generate chat response using Gemini (gemini-1.5-flash or gemini-2.0-flash) or OpenAI.
 */
export async function generateChatResponse(context: string, query: string): Promise<string> {
  const geminiKey = getGeminiKey();
  const openAIKey = getOpenAIKey();

  const systemPrompt =
    "You are MindMap AI, an intelligent research assistant and Second Brain companion. " +
    "Answer questions concisely and insightfully based on the provided context from the user's knowledge base. " +
    "Always cite or refer to the specific sources used when relevant. " +
    "If the context doesn't contain enough information, provide a helpful answer and clarify that.";

  // 1. Try Gemini API
  if (geminiKey) {
    try {
      // Use gemini-1.5-flash (compatible with all v1beta endpoints)
      const url = `${GEMINI_API_BASE}/models/gemini-1.5-flash:generateContent?key=${geminiKey}`;
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          systemInstruction: {
            parts: [{ text: systemPrompt }],
          },
          contents: [
            {
              role: "user",
              parts: [
                {
                  text: `Context from user knowledge base:\n\n${context}\n\n---\n\nUser Question: ${query}`,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.3,
            maxOutputTokens: 1024,
          },
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.warn(`Gemini Chat API error (${response.status}): ${errorText}`);
      } else {
        const data = await response.json();
        const candidateText = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (candidateText) {
          return candidateText;
        }
      }
    } catch (err) {
      console.warn("Gemini chat request error:", err);
    }
  }

  // 2. Try OpenAI API as backup
  if (openAIKey) {
    try {
      const response = await fetch(`${OPENAI_API_BASE}/chat/completions`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${openAIKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            { role: "system", content: systemPrompt },
            {
              role: "user",
              content: `Context:\n${context}\n\nQuestion: ${query}`,
            },
          ],
          temperature: 0.4,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        return data.choices?.[0]?.message?.content || "";
      }
    } catch (err) {
      console.warn("OpenAI chat request error:", err);
    }
  }

  // 3. Fallback mock response
  return (
    `[MindMap AI Analysis]\n\nBased on your indexed documents:\n` +
    `"${context.slice(0, 350)}${context.length > 350 ? "..." : ""}"\n\n` +
    `To connect live AI completions, add your GEMINI_API_KEY to your environment variables.`
  );
}
