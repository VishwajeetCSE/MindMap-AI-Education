import { NextRequest, NextResponse } from "next/server";
import { Query } from "appwrite";
import {
  databases,
  DATABASE_ID,
  VECTORS_COLLECTION_ID,
} from "@/lib/appwrite";
import { generateEmbedding, generateChatResponse } from "@/lib/openai";
import type { KnowledgeEmbedding } from "@/types";

/**
 * Compute the cosine similarity between two equal-length vectors.
 * Returns a value in [-1, 1] where 1 means identical direction.
 */
function cosineSimilarity(a: number[], b: number[]): number {
  let dot = 0;
  let magA = 0;
  let magB = 0;

  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    magA += a[i] * a[i];
    magB += b[i] * b[i];
  }

  const magnitude = Math.sqrt(magA) * Math.sqrt(magB);
  if (magnitude === 0) return 0;

  return dot / magnitude;
}

/** Number of top-matching chunks to use as context */
const TOP_K = 5;

/** Maximum Appwrite documents per list query */
const QUERY_LIMIT = 100;

/**
 * POST /api/chat
 *
 * Processes a user query against their knowledge base:
 * 1. Generates an embedding for the query
 * 2. Fetches the user's knowledge embeddings from Appwrite
 * 3. Ranks chunks by cosine similarity (top 5)
 * 4. Sends the top chunks as context to GPT-4o-mini
 * 5. Returns the AI-generated answer with source document IDs
 *
 * Request body:
 * ```json
 * {
 *   "userQuery": "string",
 *   "userId": "string"
 * }
 * ```
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userQuery, userId } = body as {
      userQuery: string;
      userId: string;
    };

    // ── Validate required fields ────────────────────────────────────────
    if (!userQuery || !userId) {
      return NextResponse.json(
        { error: "Missing required fields: userQuery, userId" },
        { status: 400 }
      );
    }

    // ── 1. Generate query embedding ─────────────────────────────────────
    const queryEmbedding = await generateEmbedding(userQuery);

    // ── 2. Fetch user's embeddings from Appwrite ────────────────────────
    // Paginate through all documents for this user
    const allEmbeddings: KnowledgeEmbedding[] = [];
    let offset = 0;
    let hasMore = true;

    while (hasMore) {
      const response = await databases.listDocuments(
        DATABASE_ID,
        VECTORS_COLLECTION_ID,
        [
          Query.equal("userId", userId),
          Query.limit(QUERY_LIMIT),
          Query.offset(offset),
        ]
      );

      const docs = response.documents as unknown as KnowledgeEmbedding[];
      allEmbeddings.push(...docs);

      if (docs.length < QUERY_LIMIT) {
        hasMore = false;
      } else {
        offset += QUERY_LIMIT;
      }
    }

    // ── 3. Rank by cosine similarity ────────────────────────────────────
    if (allEmbeddings.length === 0) {
      return NextResponse.json({
        answer:
          "I don't have any documents in your knowledge base yet. " +
          "Try adding some notes, links, or PDFs first!",
        sources: [],
      });
    }

    function parseEmbedding(raw: unknown): number[] {
      if (Array.isArray(raw)) return raw as number[];
      if (typeof raw === "string") {
        try {
          const parsed = JSON.parse(raw);
          if (Array.isArray(parsed)) return parsed as number[];
        } catch {}
      }
      return [];
    }

    const scored = allEmbeddings
      .map((doc) => {
        const emb = parseEmbedding(doc.embedding);
        return {
          doc,
          score: emb.length === queryEmbedding.length ? cosineSimilarity(queryEmbedding, emb) : 0,
        };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, TOP_K);

    // ── 4. Build context from top chunks ────────────────────────────────
    const context = scored
      .map(
        ({ doc, score }, i) =>
          `[Source ${i + 1} (similarity: ${score.toFixed(3)})]\n${doc.textChunk}`
      )
      .join("\n\n---\n\n");

    // ── 5. Generate AI response ─────────────────────────────────────────
    const answer = await generateChatResponse(context, userQuery);

    // Collect unique source document IDs
    const sources = [
      ...new Set(scored.map(({ doc }) => doc.sourceDocId)),
    ];

    return NextResponse.json({ answer, sources });
  } catch (error) {
    console.error("[/api/chat] Error:", error);
    const message =
      error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
