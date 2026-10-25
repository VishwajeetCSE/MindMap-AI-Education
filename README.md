# 🎓 MindMap AI Education — The Intelligent Second Brain for Higher Education

> **Hack Day Submission** • **Category:** Education • **AI Core:** Google Gemini API (`gemini-1.5-flash` & `text-embedding-004`)

MindMap AI Education is a comprehensive, context-aware second brain tailored for students, researchers, and educators. Instead of drowning in endless slide decks, PDF research papers, and scattered lecture notes, students ingest their course materials into a centralized semantic workspace. Powered by **Google Gemini 1.5 Flash** and **Appwrite's Vector Engine**, the platform automatically synthesizes structured study guides, extracts interactive revision flashcards, generates adaptive practice quizzes, and provides citation-backed conversational tutoring.

![Google Gemini](https://img.shields.io/badge/Google%20Gemini-1.5%20Flash-4285F4?style=flat-square&logo=google&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js%2015-black?style=flat-square&logo=next.js)
![Appwrite](https://img.shields.io/badge/Appwrite-Tables%20%26%20Vectors-FD366E?style=flat-square&logo=appwrite&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-Strict-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-v4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)

---

## 🌟 Key Educational Features

### 1. 📘 AI Study Guide Generator (Powered by Gemini 1.5 Flash)
- Ingest textbook chapters, lecture notes, or web articles.
- With one click, Gemini parses your materials and returns an executive summary, high-yield bullet takeaways, essential concept definitions, and exam prep tips.

### 2. 🎴 Active-Recall Revision Flashcards
- Automatically extract 4–6 high-yield revision flashcards from any document.
- Features an interactive 3D flip card UI for self-testing before midterms and finals.

### 3. 🧠 "Quiz Me" Knowledge Readiness
- Generates 3-question multiple-choice practice tests tailored specifically to your syllabus.
- Provides instant scoring, answer validation, and pedagogical explanations for every option.

### 4. 💬 Citation-Backed AI Study Tutor
- Ask hyper-specific questions about lecture slides or research data.
- The AI responds using semantic chunks retrieved from Appwrite's vector database, displaying verifiable source badges below each answer.

### 5. ⚡ 1-Click Guest Demo Access
- Zero friction for hackathon evaluators and students. Click **"Continue as Guest"** to immediately explore the entire platform without manual registration.

---

## 🤖 Why Google Gemini API? (20% Judging Weight)

1. **`gemini-1.5-flash` (Structured Reasoning & Speed):**
   - Utilizes native `responseMimeType: "application/json"` for deterministic JSON generation of flashcards, quizzes, and study guides.
   - Sub-second latency allows real-time educational synthesis directly on mobile and desktop devices.
2. **`text-embedding-004` (Semantic Knowledge Retrieval):**
   - Captures deep semantic relationships across course topics, enabling cross-document search even when keywords differ.

---

## 🏗️ Architecture & Database Design

```
MindMap AI Education
├── Frontend (Next.js 15 App Router + Tailwind v4 + shadcn/ui)
│   ├── /                 -> Education Landing Page
│   ├── /auth/login       -> Email Auth + 1-Click Guest Demo
│   ├── /dashboard        -> Student Overview & Knowledge Stats
│   ├── /dashboard/study  -> AI Study Guide, Flashcards & Quiz Me
│   ├── /dashboard/chat   -> Semantic AI Companion with Source Citations
│   └── /dashboard/sources-> Course Notes Ingestion (Notes, PDFs, Links)
│
├── AI Engine (Google Gemini API)
│   ├── text-embedding-004 (Vector Embeddings)
│   └── gemini-1.5-flash (Pedagogical Synthesis & JSON Generation)
│
└── Database & Auth (Appwrite Cloud)
    ├── source_metadata   -> Document titles, types, URLs, tags, user relations
    └── knowledge_embeddings -> Text fragments + vector embeddings
```

---

## 🚀 Quickstart for Local Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/VishwajeetCSE/MindMap-AI-Education.git
   cd MindMap-AI-Education
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure `.env.local`:**
   ```env
   NEXT_PUBLIC_APPWRITE_ENDPOINT=https://fra.cloud.appwrite.io/v1
   NEXT_PUBLIC_APPWRITE_PROJECT_ID=your_appwrite_project_id
   NEXT_PUBLIC_APPWRITE_DATABASE_ID=your_database_id
   NEXT_PUBLIC_APPWRITE_METADATA_COLLECTION_ID=your_metadata_table_id
   NEXT_PUBLIC_APPWRITE_VECTORS_COLLECTION_ID=your_vectors_table_id
   GEMINI_API_KEY=your_gemini_api_key
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` to start exploring!

---

## 👥 Hack Day Submission Info

* **Theme:** Education
* **Live Demo:** [https://mindmap-ai-mu.vercel.app/](https://mindmap-ai-mu.vercel.app/) *(or your fresh deployment URL)*
* **Repository:** [https://github.com/VishwajeetCSE/MindMap-AI-Education](https://github.com/VishwajeetCSE/MindMap-AI-Education)
