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

    // Default permissions (All users can read/write if collection has document security)
    const permissions = [
      Permission.read(Role.any()),
      Permission.write(Role.any()),
    ];

    // Prepare tags in both string and array representations
    const tagsString = Array.isArray(tags) ? tags.join(", ") : (tags ? String(tags) : "");
    const tagsArray = Array.isArray(tags)
      ? tags
      : typeof tags === "string" && tags.trim().length > 0
      ? tags.split(",").map((t) => t.trim()).filter(Boolean)
      : [];

    // Base document data
    const baseData: Record<string, unknown> = {
      title,
      fileType,
      userId,
      createdAt: new Date().toISOString(),
    };

    // Only include originalUrl if it has a non-empty string value
    if (originalUrl && typeof originalUrl === "string" && originalUrl.trim().length > 0) {
      baseData.originalUrl = originalUrl.trim();
    }

    // ── 1. Create source metadata document with multi-tier resilience ───
    let metadataDoc: { $id: string } | null = null;
    const errors: string[] = [];

    // Attempt 1: tags as string with permissions
    try {
      metadataDoc = await databases.createDocument(
        DATABASE_ID,
        METADATA_COLLECTION_ID,
        ID.unique(),
        { ...baseData, tags: tagsString } as Record<string, unknown>,
        permissions
      );
    } catch (e1: unknown) {
      const msg1 = e1 instanceof Error ? e1.message : String(e1);
      errors.push(`Attempt 1: ${msg1}`);

      // Attempt 2: tags as string without permissions (inherits collection permissions)
      try {
        metadataDoc = await databases.createDocument(
          DATABASE_ID,
          METADATA_COLLECTION_ID,
          ID.unique(),
          { ...baseData, tags: tagsString } as Record<string, unknown>
        );
      } catch (e2: unknown) {
        const msg2 = e2 instanceof Error ? e2.message : String(e2);
        errors.push(`Attempt 2: ${msg2}`);

        // Attempt 3: tags as array (if collection configured tags as array)
        try {
          metadataDoc = await databases.createDocument(
            DATABASE_ID,
            METADATA_COLLECTION_ID,
            ID.unique(),
            { ...baseData, tags: tagsArray } as Record<string, unknown>
          );
        } catch (e3: unknown) {
          const msg3 = e3 instanceof Error ? e3.message : String(e3);
          errors.push(`Attempt 3: ${msg3}`);

          // Attempt 4: without tags attribute at all (guaranteed to succeed if tags column has issues)
          try {
            metadataDoc = await databases.createDocument(
              DATABASE_ID,
              METADATA_COLLECTION_ID,
              ID.unique(),
              baseData as Record<string, unknown>
            );
          } catch (e4: unknown) {
            const msg4 = e4 instanceof Error ? e4.message : String(e4);
            errors.push(`Attempt 4: ${msg4}`);
            throw new Error(`Failed to create metadata document. Errors: ${errors.join(" | ")}`);
          }
        }
      }
    }

    if (!metadataDoc) {
      throw new Error(`Failed to create metadata document: ${errors.join(" | ")}`);
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

      // Try storing with Float array, fallback to stringified embedding, with or without permissions
      try {
        return await databases.createDocument(
          DATABASE_ID,
          VECTORS_COLLECTION_ID,
          ID.unique(),
          { ...chunkData, embedding },
          permissions
        );
      } catch {
        try {
          return await databases.createDocument(
            DATABASE_ID,
            VECTORS_COLLECTION_ID,
            ID.unique(),
            { ...chunkData, embedding }
          );
        } catch {
          // If embedding is configured as Text/String in Appwrite
          try {
            return await databases.createDocument(
              DATABASE_ID,
              VECTORS_COLLECTION_ID,
              ID.unique(),
              { ...chunkData, embedding: JSON.stringify(embedding) }
            );
          } catch {
            return await databases.createDocument(
              DATABASE_ID,
              VECTORS_COLLECTION_ID,
              ID.unique(),
              { ...chunkData, embedding: JSON.stringify(embedding) },
              permissions
            );
          }
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
