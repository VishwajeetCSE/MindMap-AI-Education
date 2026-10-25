"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import {
  UploadCloud,
  FileText,
  CheckCircle2,
  AlertCircle,
  X,
  ArrowRight,
  Brain,
  Layers,
  Sparkles,
  MessageSquare,
  Loader2,
} from "lucide-react";

interface UploadedFileState {
  id: string;
  name: string;
  size: string;
  status: "idle" | "uploading" | "indexing" | "success" | "error";
  progress: number;
  errorMessage?: string;
}

export function DocumentUploadPanel() {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<UploadedFileState[]>([
    {
      id: "demo-sample-1",
      name: "Lecture-03-Machine-Learning-Optimization.txt",
      size: "24.5 KB",
      status: "success",
      progress: 100,
    },
  ]);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleFiles = async (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return;
    setIsProcessing(true);

    const newFiles: UploadedFileState[] = Array.from(fileList).map((file, idx) => ({
      id: `${Date.now()}-${idx}`,
      name: file.name,
      size: `${(file.size / 1024).toFixed(1)} KB`,
      status: "uploading",
      progress: 15,
    }));

    setFiles((prev) => [...prev, ...newFiles]);

    // Multi-tier chunking & embedding pipeline simulation
    for (const newFile of newFiles) {
      await new Promise((res) => setTimeout(res, 600));
      setFiles((prev) =>
        prev.map((f) => (f.id === newFile.id ? { ...f, status: "indexing", progress: 65 } : f))
      );

      await new Promise((res) => setTimeout(res, 800));
      setFiles((prev) =>
        prev.map((f) => (f.id === newFile.id ? { ...f, status: "success", progress: 100 } : f))
      );
    }

    setIsProcessing(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const hasSuccessfulFiles = files.some((f) => f.status === "success");

  return (
    <div className="w-full max-w-4xl mx-auto bg-[#0a0f26]/95 backdrop-blur-2xl border border-blue-500/30 rounded-3xl shadow-2xl p-6 sm:p-8 text-white">
      <div className="text-center max-w-xl mx-auto mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#8BFF68]/15 text-[#8BFF68] rounded-full text-xs font-bold mb-3 border border-[#8BFF68]/30">
          <UploadCloud className="w-3.5 h-3.5" />
          <span>Multimodal Ingestion Engine</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-black text-white mb-2">
          Drop Your Course Notes or Syllabi
        </h3>
        <p className="text-xs sm:text-sm text-slate-300">
          Appwrite stores chunk embeddings via Google Gemini text-embedding-004 for high-speed semantic retrieval.
        </p>
      </div>

      {/* Drag & Drop Area */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all ${
          isDragging
            ? "border-[#8BFF68] bg-[#8BFF68]/10 scale-[1.01]"
            : "border-blue-500/40 hover:border-[#8BFF68] bg-[#070b1a]/80 hover:bg-[#070b1a]"
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept=".txt,.md,.json,.csv,.pdf"
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
        <div className="w-12 h-12 mx-auto mb-3 rounded-2xl bg-[#8BFF68] text-black flex items-center justify-center shadow-[0_0_20px_rgba(139,255,104,0.4)] font-bold">
          <UploadCloud className="w-6 h-6 text-black" />
        </div>
        <p className="text-sm font-bold text-white mb-1">
          Click to browse or drag and drop files here
        </p>
        <p className="text-xs text-slate-400 mb-3">
          Supports TXT, Markdown (.md), PDF notes, and Course Syllabus documents
        </p>
        <div className="inline-flex items-center gap-2 text-[11px] text-slate-300 bg-white/5 px-3 py-1 rounded-md border border-white/10 font-mono">
          <span>Max size: 10MB</span>
          <span>•</span>
          <span className="text-[#8BFF68]">Automatic Semantic Chunking</span>
        </div>
      </div>

      {/* Uploaded Documents List */}
      {files.length > 0 && (
        <div className="mt-6 space-y-2.5">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
            <span>Ingested Documents ({files.length})</span>
            {isProcessing && (
              <span className="text-[#8BFF68] flex items-center gap-1 normal-case font-bold">
                <Loader2 className="w-3 h-3 animate-spin" /> Vectorizing chunks...
              </span>
            )}
          </div>

          <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
            {files.map((file) => (
              <div
                key={file.id}
                className="flex items-center justify-between p-3.5 rounded-xl bg-[#0e1638] border border-blue-500/20 text-xs text-white"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="p-2 bg-blue-950 rounded-lg border border-blue-500/40 text-[#8BFF68] shrink-0">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-bold truncate max-w-xs sm:max-w-md">{file.name}</p>
                    <p className="text-[11px] text-slate-400">{file.size}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  {file.status === "uploading" && (
                    <span className="text-blue-400 flex items-center gap-1 font-bold text-[11px]">
                      <Loader2 className="w-3 h-3 animate-spin" /> Uploading...
                    </span>
                  )}
                  {file.status === "indexing" && (
                    <span className="text-[#8BFF68] flex items-center gap-1 font-bold text-[11px]">
                      <Sparkles className="w-3 h-3 animate-pulse" /> Embedding vectors...
                    </span>
                  )}
                  {file.status === "success" && (
                    <span className="text-[#8BFF68] flex items-center gap-1 font-bold text-[11px] bg-[#8BFF68]/15 px-2.5 py-0.5 rounded-full border border-[#8BFF68]/30">
                      <CheckCircle2 className="w-3 h-3" /> Ready
                    </span>
                  )}
                  {file.status === "error" && (
                    <span className="text-rose-400 flex items-center gap-1 font-bold text-[11px]">
                      <AlertCircle className="w-3 h-3" /> Error
                    </span>
                  )}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFile(file.id);
                    }}
                    className="text-slate-400 hover:text-white p-1 rounded hover:bg-white/10 transition-colors"
                    aria-label={`Remove ${file.name}`}
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Available Next Steps after ingestion */}
      {hasSuccessfulFiles && (
        <div className="mt-6 pt-6 border-t border-white/10">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
            Available AI Next Steps:
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <Link
              href="/dashboard/study"
              className="flex items-center justify-center gap-2 p-3 rounded-xl bg-blue-600/20 hover:bg-[#8BFF68] hover:text-black border border-blue-500/30 text-white text-xs font-bold transition-all group"
            >
              <Brain className="w-4 h-4 text-[#8BFF68] group-hover:text-black" />
              <span>Mind Map</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </Link>

            <Link
              href="/dashboard/study"
              className="flex items-center justify-center gap-2 p-3 rounded-xl bg-blue-600/20 hover:bg-[#8BFF68] hover:text-black border border-blue-500/30 text-white text-xs font-bold transition-all group"
            >
              <Layers className="w-4 h-4 text-[#8BFF68] group-hover:text-black" />
              <span>Flashcards</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </Link>

            <Link
              href="/dashboard/study"
              className="flex items-center justify-center gap-2 p-3 rounded-xl bg-blue-600/20 hover:bg-[#8BFF68] hover:text-black border border-blue-500/30 text-white text-xs font-bold transition-all group"
            >
              <Sparkles className="w-4 h-4 text-[#8BFF68] group-hover:text-black" />
              <span>Study Guide</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </Link>

            <Link
              href="/dashboard/chat"
              className="flex items-center justify-center gap-2 p-3 rounded-xl bg-blue-600/20 hover:bg-[#8BFF68] hover:text-black border border-blue-500/30 text-white text-xs font-bold transition-all group"
            >
              <MessageSquare className="w-4 h-4 text-[#8BFF68] group-hover:text-black" />
              <span>Ask Notes</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
