import { NextRequest, NextResponse } from "next/server";
import { ID, Permission, Role } from "appwrite";
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
      tags: string[] | string;
    };

    // ── Validate required fields ────────────────────────────────────────
    if (!userId || !title || !fileType || !textContent) {
      return NextResponse.json(
        { error: "Missing required fields: userId, title, fileType, textContent" },
        { status: 400 }
      );
    }

    // Default permissions
    const permissions = [
      Permission.read(Role.any()),
      Permission.write(Role.any()),
    ];

    const nowIso = new Date().toISOString();
    const tagsString = Array.isArray(tags) ? tags.join(", ") : (tags ? String(tags) : "");
    const tagsArray = Array.isArray(tags)
      ? tags
      : typeof tags === "string" && tags.trim().length > 0
      ? tags.split(",").map((t) => t.trim()).filter(Boolean)
      : [];

    // Base document data
    const baseObj: Record<string, unknown> = {
      title,
      fileType,
      userId,
    };

    if (originalUrl && typeof originalUrl === "string" && originalUrl.trim().length > 0) {
      baseObj.originalUrl = originalUrl.trim();
    }

    // ── 1. Create source metadata document ──────────────────────────────
    // The candidate payloads cover all variations of Appwrite column definitions:
    // - createdAt as array [nowIso] (when user checked Array in Appwrite console)
    // - createdAt as string nowIso
    // - createdAt omitted (Appwrite automatically populates $createdAt)
    // - tags as string vs array vs omitted
    const candidatePayloads: Record<string, unknown>[] = [
      // Top candidate: createdAt as array (exact match for user's Appwrite column)
      { ...baseObj, createdAt: [nowIso], tags: tagsString },
      { ...baseObj, createdAt: [nowIso], tags: tagsArray },
      { ...baseObj, createdAt: [nowIso] },

      // String createdAt candidates
      { ...baseObj, createdAt: nowIso, tags: tagsString },
      { ...baseObj, createdAt: nowIso, tags: tagsArray },
      { ...baseObj, createdAt: nowIso },

      // Without custom createdAt (uses Appwrite built-in $createdAt)
      { ...baseObj, tags: tagsString },
      { ...baseObj, tags: tagsArray },
      { ...baseObj },
    ];

    let metadataDoc: { $id: string } | null = null;
    const errors: string[] = [];

    for (const payload of candidatePayloads) {
      // Try without explicit permissions first (inherits collection permissions)
      try {
        metadataDoc = await databases.createDocument(
          DATABASE_ID,
          METADATA_COLLECTION_ID,
          ID.unique(),
          payload
        );
        if (metadataDoc?.$id) break;
      } catch (err1: unknown) {
        errors.push(err1 instanceof Error ? err1.message : String(err1));
      }

      // Try with explicit permissions
      try {
        metadataDoc = await databases.createDocument(
          DATABASE_ID,
          METADATA_COLLECTION_ID,
          ID.unique(),
          payload,
          permissions
        );
        if (metadataDoc?.$id) break;
      } catch (err2: unknown) {
        errors.push(err2 instanceof Error ? err2.message : String(err2));
      }
    }

    if (!metadataDoc?.$id) {
      throw new Error(`Failed to create document after testing schema variants: ${errors.slice(-3).join(" | ")}`);
    }

    const docId = metadataDoc.$id;

    // ── 2. Chunk the text ───────────────────────────────────────────────
    const chunks = chunkText(textContent, CHUNK_SIZE);

    // ── 3–4. Embed & store each chunk ───────────────────────────────────
    const embeddingPromises = chunks.map(async (chunk) => {
      const embedding = await generateEmbedding(chunk);

      const chunkData = {
        sourceDocId: docId,
        userId,
        textChunk: chunk,
      };

      const embeddingCandidates: Record<string, unknown>[] = [
        { ...chunkData, embedding },
        { ...chunkData, embedding: JSON.stringify(embedding) },
        { ...chunkData, embedding: [embedding] },
      ];

      for (const payload of embeddingCandidates) {
        try {
          return await databases.createDocument(
            DATABASE_ID,
            VECTORS_COLLECTION_ID,
            ID.unique(),
            payload
          );
        } catch {
          try {
            return await databases.createDocument(
              DATABASE_ID,
              VECTORS_COLLECTION_ID,
              ID.unique(),
              payload,
              permissions
            );
          } catch {}
        }
      }
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
