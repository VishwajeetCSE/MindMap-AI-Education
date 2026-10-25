// ─── Source Document ────────────────────────────────────────────────────────
/**
 * Metadata for an ingested source document (note, link, or PDF).
 * Maps to the `source_metadata` Appwrite collection.
 */
export interface SourceDocument {
  $id: string;
  $createdAt: string;
  $updatedAt: string;
  title: string;
  fileType: "Note" | "Link" | "PDF";
  originalUrl?: string;
  userId: string;
  tags: string[];
  createdAt: string;
}

// ─── Knowledge Embedding ────────────────────────────────────────────────────
/**
 * A text chunk paired with its vector embedding.
 * Maps to the `knowledge_embeddings` Appwrite collection.
 */
export interface KnowledgeEmbedding {
  $id: string;
  sourceDocId: string;
  userId: string;
  textChunk: string;
  embedding: number[];
}

// ─── Chat ───────────────────────────────────────────────────────────────────
/** A single message in a chat conversation. */
export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  sources?: string[];
  timestamp: Date;
}

// ─── Ingest ─────────────────────────────────────────────────────────────────
/** Payload sent to the `/api/ingest` endpoint. */
export interface IngestPayload {
  title: string;
  fileType: "Note" | "Link" | "PDF";
  textContent: string;
  originalUrl?: string;
  tags: string[];
}
