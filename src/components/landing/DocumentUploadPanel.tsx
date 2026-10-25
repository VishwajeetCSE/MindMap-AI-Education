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

    // Simulate multi-tier chunking & embedding pipeline
    for (const newFile of newFiles) {
      // Step 1: Uploading
      await new Promise((res) => setTimeout(res, 600));
      setFiles((prev) =>
        prev.map((f) => (f.id === newFile.id ? { ...f, status: "indexing", progress: 65 } : f))
      );

      // Step 2: Indexing in Appwrite VectorsDB with Gemini text-embedding-004
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
    <div className="w-full max-w-4xl mx-auto bg-white/95 backdrop-blur-xl border border-slate-200/90 rounded-2xl shadow-xl p-6 sm:p-8">
      <div className="text-center max-w-xl mx-auto mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-semibold mb-3 border border-blue-100">
          <UploadCloud className="w-3.5 h-3.5" />
          <span>Multimodal Ingestion Engine</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">
          Drop Your Course Notes or Syllabi
        </h3>
        <p className="text-xs sm:text-sm text-slate-600">
          Appwrite stores chunk embeddings via Google Gemini text-embedding-004 for high-speed semantic retrieval.
        </p>
      </div>

      {/* Drag & Drop Area */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
          isDragging
            ? "border-blue-600 bg-blue-50/60 scale-[1.01]"
            : "border-slate-300 hover:border-blue-400 bg-slate-50/60 hover:bg-slate-50"
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
        <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
          <UploadCloud className="w-6 h-6" />
        </div>
        <p className="text-sm font-semibold text-slate-800 mb-1">
          Click to browse or drag and drop files here
        </p>
        <p className="text-xs text-slate-600 mb-3">
          Supports TXT, Markdown (.md), PDF notes, and Course Syllabus documents
        </p>
        <div className="inline-flex items-center gap-2 text-[11px] text-slate-600 bg-white px-3 py-1 rounded-md border border-slate-200 font-mono">
          <span>Max size: 10MB</span>
          <span>•</span>
          <span>Automatic Semantic Chunking</span>
        </div>
      </div>

      {/* Uploaded Documents List */}
      {files.length > 0 && (
        <div className="mt-6 space-y-2.5">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-600 flex items-center justify-between">
            <span>Ingested Documents ({files.length})</span>
            {isProcessing && (
              <span className="text-blue-600 flex items-center gap-1 normal-case font-medium">
                <Loader2 className="w-3 h-3 animate-spin" /> Vectorizing chunks...
              </span>
            )}
          </div>

          <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
            {files.map((file) => (
              <div
                key={file.id}
                className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="p-2 bg-white rounded-lg border border-slate-200 text-blue-600 shrink-0">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold truncate max-w-xs sm:max-w-md">{file.name}</p>
                    <p className="text-[11px] text-slate-600">{file.size}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  {file.status === "uploading" && (
                    <span className="text-blue-600 flex items-center gap-1 font-medium text-[11px]">
                      <Loader2 className="w-3 h-3 animate-spin" /> Uploading...
                    </span>
                  )}
                  {file.status === "indexing" && (
                    <span className="text-indigo-600 flex items-center gap-1 font-medium text-[11px]">
                      <Sparkles className="w-3 h-3 animate-pulse" /> Embedding vectors...
                    </span>
                  )}
                  {file.status === "success" && (
                    <span className="text-emerald-600 flex items-center gap-1 font-medium text-[11px] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      <CheckCircle2 className="w-3 h-3" /> Ready
                    </span>
                  )}
                  {file.status === "error" && (
                    <span className="text-rose-600 flex items-center gap-1 font-medium text-[11px]">
                      <AlertCircle className="w-3 h-3" /> Error
                    </span>
                  )}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFile(file.id);
                    }}
                    className="text-slate-600 hover:text-slate-600 p-1 rounded hover:bg-slate-200 transition-colors"
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
        <div className="mt-6 pt-6 border-t border-slate-200">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-600 mb-3">
            Available AI Next Steps:
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <Link
              href="/dashboard/study"
              className="flex items-center justify-center gap-2 p-3 rounded-xl bg-blue-50/70 hover:bg-blue-100/70 border border-blue-200 text-blue-700 text-xs font-semibold transition-all group"
            >
              <Brain className="w-4 h-4 text-blue-600" />
              <span>Mind Map</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </Link>

            <Link
              href="/dashboard/study"
              className="flex items-center justify-center gap-2 p-3 rounded-xl bg-indigo-50/70 hover:bg-indigo-100/70 border border-indigo-200 text-indigo-700 text-xs font-semibold transition-all group"
            >
              <Layers className="w-4 h-4 text-indigo-600" />
              <span>Flashcards</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </Link>

            <Link
              href="/dashboard/study"
              className="flex items-center justify-center gap-2 p-3 rounded-xl bg-violet-50/70 hover:bg-violet-100/70 border border-violet-200 text-violet-700 text-xs font-semibold transition-all group"
            >
              <Sparkles className="w-4 h-4 text-violet-600" />
              <span>Study Guide</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </Link>

            <Link
              href="/dashboard/chat"
              className="flex items-center justify-center gap-2 p-3 rounded-xl bg-emerald-50/70 hover:bg-emerald-100/70 border border-emerald-200 text-emerald-800 text-xs font-semibold transition-all group"
            >
              <MessageSquare className="w-4 h-4 text-emerald-600" />
              <span>Ask Notes</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
