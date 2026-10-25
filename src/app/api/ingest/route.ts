import { NextRequest, NextResponse } from "next/server";
import { ID, Permission, Role, Query } from "appwrite";
import {
  databases,
  DATABASE_ID,
  METADATA_COLLECTION_ID,
  VECTORS_COLLECTION_ID,
} from "@/lib/appwrite";
import { generateEmbedding } from "@/lib/openai";

/**
 * Maximum characters per text chunk when splitting ingested content.
 * Embeddings are generated for each chunk independently.
 */
const CHUNK_SIZE = 500;

/**
 * Split a text string into chunks of at most `size` characters.
 * Splits on the last whitespace boundary within each window to avoid
 * breaking words whenever possible.
 */
function chunkText(text: string, size: number): string[] {
  const chunks: string[] = [];
  let start = 0;

  while (start < text.length) {
    let end = Math.min(start + size, text.length);

    // If we're not at the very end, try to split on a whitespace boundary
    if (end < text.length) {
      const lastSpace = text.lastIndexOf(" ", end);
      if (lastSpace > start) {
        end = lastSpace;
      }
    }

    const chunk = text.slice(start, end).trim();
    if (chunk.length > 0) {
      chunks.push(chunk);
    }

    start = end;
    // Skip the whitespace character we split on
    if (start < text.length && text[start] === " ") {
      start++;
    }
  }

  return chunks;
}

/**
 * POST /api/ingest
 *
 * Ingests a new document into the MindMap AI knowledge base:
 * 1. Creates a metadata record in `source_metadata`
 * 2. Chunks the provided text content
 * 3. Generates an embedding for each chunk
 * 4. Stores each chunk + embedding in `knowledge_embeddings`
 *
 * Request body:
 * ```json
 * {
 *   "userId": "string",
 *   "title": "string",
 *   "fileType": "Note" | "Link" | "PDF",
 *   "textContent": "string",
 *   "originalUrl": "string (optional)",
 *   "tags": ["string"]
 * }
 * ```
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      userId,
      title,
      fileType,
      textContent,
      originalUrl,
      tags,
    } = body as {
      userId: string;
      title: string;
      fileType: "Note" | "Link" | "PDF";
      textContent: string;
      originalUrl?: string;
      tags: string[];
    };

    // ── Validate required fields ────────────────────────────────────────
    if (!userId || !title || !fileType || !textContent) {
      return NextResponse.json(
        { error: "Missing required fields: userId, title, fileType, textContent" },
        { status: 400 }
      );
    }

    // ── Per-user document permissions ───────────────────────────────────
    const permissions = [
      Permission.read(Role.user(userId)),
      Permission.write(Role.user(userId)),
    ];

    // ── 1. Create source metadata document ──────────────────────────────
    const metadataDoc = await databases.createDocument(
      DATABASE_ID,
      METADATA_COLLECTION_ID,
      ID.unique(),
      {
        title,
        fileType,
        originalUrl: originalUrl || null,
        userId,
        tags,
        createdAt: new Date().toISOString(),
      },
      permissions
    );

    const docId = metadataDoc.$id;

    // ── 2. Chunk the text ───────────────────────────────────────────────
    const chunks = chunkText(textContent, CHUNK_SIZE);

    // ── 3–4. Embed & store each chunk ───────────────────────────────────
    const embeddingPromises = chunks.map(async (chunk) => {
      const embedding = await generateEmbedding(chunk);

      return databases.createDocument(
        DATABASE_ID,
        VECTORS_COLLECTION_ID,
        ID.unique(),
        {
          sourceDocId: docId,
          userId,
          textChunk: chunk,
          embedding,
        },
        permissions
      );
    });

    await Promise.all(embeddingPromises);

    return NextResponse.json(
      { success: true, docId, chunksCreated: chunks.length },
      { status: 201 }
    );
  } catch (error) {
    console.error("[/api/ingest] Error:", error);
    const message =
      error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
