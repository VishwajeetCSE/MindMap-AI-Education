import { Client, Account, Databases } from "appwrite";

/**
 * Appwrite client configuration for MindMap AI.
 *
 * Uses environment variables for endpoint and project ID,
 * falling back to Appwrite Cloud defaults.
 */
const client = new Client();

client
  .setEndpoint(
    process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || "https://cloud.appwrite.io/v1"
  )
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || "");

/** Appwrite Account service — authentication & user management */
const account = new Account(client);

/** Appwrite Databases service — document CRUD operations */
const databases = new Databases(client);

// ─── Collection & Database Constants ────────────────────────────────────────
/** Primary database for all MindMap AI collections */
export const DATABASE_ID = "mindmap_db";

/** Stores metadata about ingested sources (notes, links, PDFs) */
export const METADATA_COLLECTION_ID = "source_metadata";

/** Stores text chunks and their vector embeddings */
export const VECTORS_COLLECTION_ID = "knowledge_embeddings";

export { client, account, databases };
