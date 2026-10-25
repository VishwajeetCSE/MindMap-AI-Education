import { NextRequest, NextResponse } from "next/server";
import { Query } from "appwrite";
import {
  databases,
  DATABASE_ID,
  VECTORS_COLLECTION_ID,
} from "@/lib/appwrite";
import {
  generateStudyGuide,
  generateFlashcards,
  generateQuiz,
} from "@/lib/openai";
import type { KnowledgeEmbedding } from "@/types";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId, mode, sourceDocId } = body as {
      userId: string;
      mode: "guide" | "flashcards" | "quiz";
      sourceDocId?: string;
    };

    if (!userId || !mode) {
      return NextResponse.json(
        { error: "Missing required fields: userId, mode" },
        { status: 400 }
      );
    }

    // Build query filters for Appwrite
    const queries = [Query.equal("userId", userId), Query.limit(50)];
    if (sourceDocId && sourceDocId !== "all") {
      queries.push(Query.equal("sourceDocId", sourceDocId));
    }

    let chunks: string[] = [];
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        VECTORS_COLLECTION_ID,
        queries
      );

      const docs = response.documents as unknown as KnowledgeEmbedding[];
      chunks = docs.map((d) => d.textChunk);
    } catch (err) {
      console.warn("Could not retrieve documents from Appwrite, using fallback:", err);
    }

    const context = chunks.join("\n\n---\n\n") || "General course study material and lecture notes.";

    if (mode === "guide") {
      const guide = await generateStudyGuide(context);
      return NextResponse.json({ success: true, data: guide });
    }

    if (mode === "flashcards") {
      const flashcards = await generateFlashcards(context);
      return NextResponse.json({ success: true, data: flashcards });
    }

    if (mode === "quiz") {
      const quiz = await generateQuiz(context);
      return NextResponse.json({ success: true, data: quiz });
    }

    return NextResponse.json({ error: "Invalid mode requested" }, { status: 400 });
  } catch (error) {
    console.error("[/api/study] Error:", error);
    const message = error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
