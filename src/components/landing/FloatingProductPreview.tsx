"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Brain,
  Sparkles,
  FileText,
  MessageSquare,
  GraduationCap,
  Layers,
  CheckCircle2,
  Share2,
  Copy,
  ChevronRight,
  Search,
} from "lucide-react";

export function FloatingProductPreview() {
  const [activeTab, setActiveTab] = useState<"mindmap" | "flashcard" | "chat" | "guide">("mindmap");

  return (
    <div className="relative w-full max-w-6xl mx-auto my-8">
      {/* Background radial glow */}
      <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-violet-500/10 rounded-3xl blur-2xl -z-10" />

      {/* Main SaaS Window Frame */}
      <div className="bg-white/95 backdrop-blur-xl border border-slate-200/90 rounded-2xl shadow-2xl shadow-blue-900/10 overflow-hidden">
        {/* Top Browser Bar */}
        <div className="px-5 py-3.5 bg-slate-50/90 border-b border-slate-200/80 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-rose-400/80" />
            <div className="w-3 h-3 rounded-full bg-amber-400/80" />
            <div className="w-3 h-3 rounded-full bg-emerald-400/80" />
            <span className="text-xs font-medium text-slate-600 ml-2">
              MindMap AI Studio • Edu Workspace
            </span>
          </div>

          {/* Interactive preview tabs */}
          <div className="flex items-center bg-slate-200/70 p-1 rounded-lg text-xs font-medium text-slate-600">
            <button
              onClick={() => setActiveTab("mindmap")}
              className={`px-3 py-1 rounded-md transition-all ${
                activeTab === "mindmap"
                  ? "bg-white text-blue-700 font-semibold shadow-xs"
                  : "hover:text-slate-900"
              }`}
            >
              Mind Map
            </button>
            <button
              onClick={() => setActiveTab("flashcard")}
              className={`px-3 py-1 rounded-md transition-all ${
                activeTab === "flashcard"
                  ? "bg-white text-blue-700 font-semibold shadow-xs"
                  : "hover:text-slate-900"
              }`}
            >
              Flashcards
            </button>
            <button
              onClick={() => setActiveTab("chat")}
              className={`px-3 py-1 rounded-md transition-all ${
                activeTab === "chat"
                  ? "bg-white text-blue-700 font-semibold shadow-xs"
                  : "hover:text-slate-900"
              }`}
            >
              AI Chat
            </button>
            <button
              onClick={() => setActiveTab("guide")}
              className={`px-3 py-1 rounded-md transition-all ${
                activeTab === "guide"
                  ? "bg-white text-blue-700 font-semibold shadow-xs"
                  : "hover:text-slate-900"
              }`}
            >
              Study Guide
            </button>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-xs text-blue-600 font-medium">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Gemini 1.5 Flash Connected
          </div>
        </div>

        {/* Dynamic Interactive Preview Canvas */}
        <div className="p-6 sm:p-8 bg-gradient-to-b from-slate-50/50 to-white min-h-[420px] flex flex-col justify-center relative">
          {/* TAB 1: MIND MAP INTERACTIVE VISUAL */}
          {activeTab === "mindmap" && (
            <div className="relative w-full h-[360px] flex items-center justify-center bg-slate-900/5 rounded-xl border border-slate-200/80 p-6 overflow-hidden">
              {/* Decorative Canvas Grid */}
              <div
                className="absolute inset-0 opacity-[0.07] pointer-events-none"
                style={{
                  backgroundImage:
                    "radial-gradient(#2563eb 1.5px, transparent 1.5px)",
                  backgroundSize: "24px 24px",
                }}
              />

              {/* Central Core Concept Node */}
              <div className="relative z-10 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-5 py-3 rounded-xl shadow-lg shadow-blue-500/20 text-center border border-white/20">
                <div className="flex items-center justify-center gap-1.5 text-xs text-blue-200 font-medium uppercase tracking-wider mb-0.5">
                  <Brain className="w-3.5 h-3.5" />
                  <span>Central Topic</span>
                </div>
                <div className="text-base font-bold">Deep Neural Networks</div>
              </div>

              {/* Connected Branch Nodes */}
              {/* Branch 1 - Top Left */}
              <div className="absolute top-8 left-8 sm:left-16 z-10 bg-white/95 border border-blue-200 p-3 rounded-xl shadow-md text-xs max-w-[170px] animate-float-slow">
                <span className="font-bold text-blue-700 block mb-1">
                  1. Backpropagation
                </span>
                <span className="text-slate-600 text-[11px] leading-tight block">
                  Chain rule applied across hidden layers to minimize loss.
                </span>
              </div>

              {/* Branch 2 - Top Right */}
              <div className="absolute top-8 right-8 sm:right-16 z-10 bg-white/95 border border-indigo-200 p-3 rounded-xl shadow-md text-xs max-w-[170px] animate-float-reverse">
                <span className="font-bold text-indigo-700 block mb-1">
                  2. Attention Mechanism
                </span>
                <span className="text-slate-600 text-[11px] leading-tight block">
                  Self-attention computes dynamic weights between token pairs.
                </span>
              </div>

              {/* Branch 3 - Bottom Left */}
              <div className="absolute bottom-8 left-8 sm:left-20 z-10 bg-white/95 border border-violet-200 p-3 rounded-xl shadow-md text-xs max-w-[170px] animate-float-reverse">
                <span className="font-bold text-violet-700 block mb-1">
                  3. Gradient Descent
                </span>
                <span className="text-slate-600 text-[11px] leading-tight block">
                  Optimizes weights using learning rate &amp; momentum.
                </span>
              </div>

              {/* Branch 4 - Bottom Right */}
              <div className="absolute bottom-8 right-8 sm:right-20 z-10 bg-white/95 border border-emerald-200 p-3 rounded-xl shadow-md text-xs max-w-[170px] animate-float-slow">
                <span className="font-bold text-emerald-700 block mb-1">
                  4. Activation Functions
                </span>
                <span className="text-slate-600 text-[11px] leading-tight block">
                  ReLU, GELU, and Sigmoid introduce non-linearity.
                </span>
              </div>

              {/* Connecting Lines SVG */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                <line
                  x1="50%"
                  y1="50%"
                  x2="22%"
                  y2="20%"
                  stroke="#93c5fd"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                />
                <line
                  x1="50%"
                  y1="50%"
                  x2="78%"
                  y2="20%"
                  stroke="#c7d2fe"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                />
                <line
                  x1="50%"
                  y1="50%"
                  x2="22%"
                  y2="80%"
                  stroke="#ddd6fe"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                />
                <line
                  x1="50%"
                  y1="50%"
                  x2="78%"
                  y2="80%"
                  stroke="#a7f3d0"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                />
              </svg>
            </div>
          )}

          {/* TAB 2: AI FLASHCARD PREVIEW */}
          {activeTab === "flashcard" && (
            <div className="flex flex-col items-center justify-center py-4">
              <div className="w-full max-w-lg bg-gradient-to-br from-indigo-900 to-slate-900 text-white rounded-2xl p-6 shadow-xl border border-indigo-500/30">
                <div className="flex items-center justify-between text-xs mb-4">
                  <span className="px-2.5 py-1 rounded-full bg-indigo-500/20 text-indigo-300 font-medium border border-indigo-500/30">
                    Card 03 of 12 • Active Recall
                  </span>
                  <span className="text-emerald-400 font-semibold flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" /> High Yield
                  </span>
                </div>
                <div className="text-xs uppercase tracking-wider text-indigo-300 font-semibold mb-2">
                  Question
                </div>
                <p className="text-lg font-semibold text-white mb-6">
                  What is the fundamental difference between L1 (Lasso) and L2 (Ridge) Regularization?
                </p>
                <div className="pt-4 border-t border-indigo-800/80 bg-slate-950/40 -mx-6 -mb-6 p-5 rounded-b-2xl">
                  <div className="text-xs uppercase tracking-wider text-emerald-400 font-semibold mb-1">
                    Answer Key
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    L1 adds an absolute penalty (|w|) and enforces sparsity by shrinking weights strictly to zero (feature selection). L2 adds a squared penalty (w²) which shrinks weights smoothly toward zero without eliminating them entirely.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: AI CHAT INTERACTIVE PREVIEW */}
          {activeTab === "chat" && (
            <div className="w-full max-w-2xl mx-auto space-y-4">
              {/* User question */}
              <div className="flex items-start justify-end gap-3">
                <div className="bg-blue-600 text-white rounded-2xl rounded-tr-xs px-4 py-3 max-w-md shadow-sm text-sm">
                  Can you summarize how transformers overcome the sequential bottleneck of RNNs?
                </div>
              </div>

              {/* AI response */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-violet-600 flex items-center justify-center text-white shrink-0 shadow-md">
                  <Brain className="w-4 h-4" />
                </div>
                <div className="bg-white border border-slate-200/90 rounded-2xl rounded-tl-xs p-4 shadow-sm text-slate-800 text-xs sm:text-sm space-y-2">
                  <p>
                    Unlike RNNs that process tokens sequentially (step t depends on step t-1), Transformers process all sequence tokens <strong>in parallel</strong> using Multi-Head Self-Attention.
                  </p>
                  <p className="text-slate-600 text-xs">
                    This eliminates gradient vanishing across long distances and enables accelerated GPU tensor matrix multiplication during training.
                  </p>
                  <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
                    <span className="text-[11px] bg-blue-50 text-blue-700 px-2 py-0.5 rounded font-mono border border-blue-200">
                      Citation: CS224N Lecture 5, §3.2
                    </span>
                    <span className="text-[11px] text-emerald-600 font-medium">
                      ✓ Verified Source
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: STUDY GUIDE SUMMARY */}
          {activeTab === "guide" && (
            <div className="w-full max-w-2xl mx-auto bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-3">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-blue-600" />
                  <span className="font-bold text-slate-900 text-sm">
                    Course Unit: Supervised Learning Architectures
                  </span>
                </div>
                <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-medium">
                  3 Pages Synthesized
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                  <div className="font-semibold text-blue-700 mb-1">Key Formulas</div>
                  <p className="text-slate-600">Cross-Entropy Loss: L = -∑ yᵢ log(ŷᵢ)</p>
                  <p className="text-slate-600 mt-1">Weight Update: w := w - α ∇L(w)</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                  <div className="font-semibold text-indigo-700 mb-1">Exam Trap Warning</div>
                  <p className="text-slate-600">Do not confuse Precision (false positives penalty) with Recall (false negatives penalty) in skewed datasets.</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Status & Action Bar */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span>Interactive Demo data preloaded for immediate exploration</span>
          </div>
          <Link
            href="/dashboard/study"
            className="inline-flex items-center gap-1 font-semibold text-blue-600 hover:text-blue-700 transition-colors"
          >
            Open in Live Fullscreen Studio
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
