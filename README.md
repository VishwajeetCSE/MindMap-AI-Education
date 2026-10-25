# 🧠 MindMap AI — AI-Powered Second Brain for Researchers

> Built for the **Appwrite Databases Hackathon 2026**

MindMap AI is a comprehensive knowledge management platform that acts as an intelligent second brain for students and researchers. Instead of manually organizing nested folder paths, users ingest quick notes, research papers, and web articles into a centralized hub. The platform automatically chunks and processes the raw data, offering an intuitive, context-aware AI chat companion that answers complex technical questions, surfaces hidden connections across entirely different documents, and references exact sources instantly.

![Next.js](https://img.shields.io/badge/Next.js%2015-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Appwrite](https://img.shields.io/badge/Appwrite-FD366E?style=flat-square&logo=appwrite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![OpenAI](https://img.shields.io/badge/OpenAI-412991?style=flat-square&logo=openai&logoColor=white)

## ✨ Features

- **Smart Ingestion** — Paste notes, research papers, or web articles. MindMap AI automatically chunks, embeds, and indexes your content into a searchable knowledge graph.
- **AI Chat Companion** — Ask complex, semantic questions across your entire knowledge base. Get instant answers with context pulled from multiple documents.
- **Source Citations** — Every AI response comes with exact source citations. Trace answers back to the original document and context chunk.
- **Vector Search** — Powered by Appwrite VectorsDB, find semantically similar content even when keywords don't match.
- **Secure & Private** — Document-level permissions ensure your knowledge base stays private. Only you can access your data.

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| **Next.js 15** (App Router) | Full-stack React framework |
| **TypeScript** | Type-safe development |
| **Appwrite Web SDK** | Auth, DocumentsDB, VectorsDB |
| **Tailwind CSS** + **shadcn/ui** | Premium dark-mode UI |
| **Lucide React** | Icon library |
| **OpenAI API** | `text-embedding-3-small` (1536 dim) + `gpt-4o-mini` |

## 📦 Appwrite Databases Used

- [x] **DocumentsDB** — `source_metadata` collection storing document titles, types, tags, URLs, and user references
- [x] **VectorsDB** — `knowledge_embeddings` collection storing text chunks with 1536-dimensional embeddings for semantic search

## 🏗️ Database Architecture

```
mindmap_db/
├── source_metadata (DocumentsDB)
│   ├── title (string, required)
│   ├── fileType (string, required: 'Note' | 'Link' | 'PDF')
│   ├── originalUrl (string, optional)
│   ├── userId (string, required)
│   ├── tags (string[], optional)
│   └── createdAt (string, required)
│
└── knowledge_embeddings (VectorsDB)
    ├── sourceDocId (string, required → references source_metadata)
    ├── userId (string, required)
    ├── textChunk (string, required)
    └── embedding (vector, 1536 dimensions)
```

Both collections use **document-level permissions** — users can only read/write their own documents.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- An [Appwrite](https://appwrite.io) project
- An [OpenAI](https://platform.openai.com) API key

### Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/YOUR_USERNAME/mindmap-ai.git
   cd mindmap-ai
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   ```bash
   cp .env.local.example .env.local
   ```
   Edit `.env.local` with your credentials:
   ```env
   NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
   NEXT_PUBLIC_APPWRITE_PROJECT_ID=your_project_id
   OPENAI_API_KEY=your_openai_api_key
   ```

4. **Set up Appwrite:**
   - Create a database named `mindmap_db`
   - Create collection `source_metadata` with the attributes listed above
   - Create collection `knowledge_embeddings` with the attributes listed above (including a vector attribute with 1536 dimensions)
   - Enable Email/Password authentication

5. **Run the development server:**
   ```bash
   npm run dev
   ```

6. **Open [http://localhost:3000](http://localhost:3000)**

## 📁 Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── chat/route.ts        # AI chat with RAG
│   │   ├── documents/route.ts   # CRUD for source documents
│   │   └── ingest/route.ts      # Document ingestion pipeline
│   ├── auth/
│   │   ├── login/page.tsx
│   │   └── register/page.tsx
│   ├── dashboard/
│   │   ├── chat/page.tsx        # AI Chat interface
│   │   ├── sources/page.tsx     # Knowledge base management
│   │   ├── layout.tsx           # Dashboard shell with sidebar
│   │   └── page.tsx             # Dashboard overview
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx                 # Landing page
├── components/ui/               # shadcn/ui component library
├── lib/
│   ├── appwrite.ts              # Appwrite client config
│   ├── auth-context.tsx         # Auth context provider
│   ├── openai.ts                # OpenAI API helpers
│   └── utils.ts                 # Utility functions
└── types/
    └── index.ts                 # TypeScript interfaces
```

## 💡 Inspiration

As developers and students, we constantly suffer from information overload. Traditional bookmarking systems and note apps are static — they require manual sorting and rapidly become digital graveyards. We wanted to build an active, conversational knowledge base that remembers everything for you, letting you focus on synthesis rather than continuous manual organization.

## 📜 License

MIT License — see [LICENSE](LICENSE) for details.

---

**Built solo for the Appwrite Databases Hackathon 2026** 🚀
