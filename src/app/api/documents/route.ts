import { NextRequest, NextResponse } from "next/server";
import { Query } from "appwrite";
import {
  databases,
  DATABASE_ID,
  METADATA_COLLECTION_ID,
  VECTORS_COLLECTION_ID,
} from "@/lib/appwrite";

/** Maximum Appwrite documents per list query */
const QUERY_LIMIT = 100;

/**
 * GET /api/documents?userId=<userId>
 *
 * Lists all source metadata documents belonging to the specified user.
 */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { error: "Missing required query parameter: userId" },
        { status: 400 }
      );
    }

    // Paginate through all documents for this user
    const allDocuments: unknown[] = [];
    let offset = 0;
    let hasMore = true;

    while (hasMore) {
      const response = await databases.listDocuments(
        DATABASE_ID,
        METADATA_COLLECTION_ID,
        [
          Query.equal("userId", userId),
          Query.orderDesc("$createdAt"),
          Query.limit(QUERY_LIMIT),
          Query.offset(offset),
        ]
      );

      allDocuments.push(...response.documents);

      if (response.documents.length < QUERY_LIMIT) {
        hasMore = false;
      } else {
        offset += QUERY_LIMIT;
      }
    }

    return NextResponse.json({ documents: allDocuments });
  } catch (error) {
    console.error("[/api/documents GET] Error:", error);
    const message =
      error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

/**
 * DELETE /api/documents?docId=<docId>
 *
 * Deletes a source document and all of its associated knowledge embeddings.
 */
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const docId = searchParams.get("docId");

    if (!docId) {
      return NextResponse.json(
        { error: "Missing required query parameter: docId" },
        { status: 400 }
      );
    }

    // ── 1. Delete the metadata document ─────────────────────────────────
    await databases.deleteDocument(
      DATABASE_ID,
      METADATA_COLLECTION_ID,
      docId
    );

    // ── 2. Delete all associated embedding chunks ───────────────────────
    let hasMore = true;

    while (hasMore) {
      const embeddingsResponse = await databases.listDocuments(
        DATABASE_ID,
        VECTORS_COLLECTION_ID,
        [
          Query.equal("sourceDocId", docId),
          Query.limit(QUERY_LIMIT),
        ]
      );

      if (embeddingsResponse.documents.length === 0) {
        hasMore = false;
        break;
      }

      // Delete each embedding document
      const deletePromises = embeddingsResponse.documents.map((doc) =>
        databases.deleteDocument(DATABASE_ID, VECTORS_COLLECTION_ID, doc.$id)
      );

      await Promise.all(deletePromises);

      // If we got fewer than QUERY_LIMIT, we've processed them all
      if (embeddingsResponse.documents.length < QUERY_LIMIT) {
        hasMore = false;
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[/api/documents DELETE] Error:", error);
    const message =
      error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
