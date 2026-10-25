"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Brain,
  Sparkles,
  GraduationCap,
  CheckCircle2,
  ChevronRight,
} from "lucide-react";

export function FloatingProductPreview() {
  const [activeTab, setActiveTab] = useState<"mindmap" | "flashcard" | "chat" | "guide">("mindmap");

  return (
    <div className="relative w-full max-w-6xl mx-auto my-8">
      {/* Background radial glow */}
      <div className="absolute -inset-4 bg-gradient-to-r from-blue-600/20 via-[#8BFF68]/10 to-indigo-600/20 rounded-3xl blur-3xl -z-10" />

      {/* Main SaaS Window Frame */}
      <div className="bg-[#090e24]/95 backdrop-blur-2xl border border-blue-500/30 rounded-3xl shadow-2xl shadow-black/80 overflow-hidden text-white">
        {/* Top Browser Bar */}
        <div className="px-5 py-3.5 bg-[#0e1638] border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-rose-500" />
            <div className="w-3 h-3 rounded-full bg-amber-400" />
            <div className="w-3 h-3 rounded-full bg-[#8BFF68] shadow-[0_0_8px_#8BFF68]" />
            <span className="text-xs font-bold text-slate-300 ml-2 hidden sm:inline">
              MindMap AI Studio • Student Workspace
            </span>
          </div>

          {/* Interactive preview tabs */}
          <div className="flex items-center bg-[#070b1a] p-1 rounded-xl text-xs font-semibold border border-white/10">
            <button
              onClick={() => setActiveTab("mindmap")}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeTab === "mindmap"
                  ? "bg-[#8BFF68] text-black font-extrabold shadow-[0_0_12px_rgba(139,255,104,0.4)]"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              Mind Map
            </button>
            <button
              onClick={() => setActiveTab("flashcard")}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeTab === "flashcard"
                  ? "bg-[#8BFF68] text-black font-extrabold shadow-[0_0_12px_rgba(139,255,104,0.4)]"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              Flashcards
            </button>
            <button
              onClick={() => setActiveTab("chat")}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeTab === "chat"
                  ? "bg-[#8BFF68] text-black font-extrabold shadow-[0_0_12px_rgba(139,255,104,0.4)]"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              AI Chat
            </button>
            <button
              onClick={() => setActiveTab("guide")}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeTab === "guide"
                  ? "bg-[#8BFF68] text-black font-extrabold shadow-[0_0_12px_rgba(139,255,104,0.4)]"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              Study Guide
            </button>
          </div>

          <div className="flex items-center gap-2 text-xs text-[#8BFF68] font-bold">
            <span className="inline-block w-2 h-2 rounded-full bg-[#8BFF68] animate-pulse shadow-[0_0_8px_#8BFF68]" />
            <span className="hidden sm:inline">Gemini 1.5 Flash Connected</span>
          </div>
        </div>

        {/* Dynamic Interactive Preview Canvas */}
        <div className="p-6 sm:p-8 bg-gradient-to-b from-[#080d21] to-[#050817] min-h-[420px] flex flex-col justify-center relative">
          {/* TAB 1: MIND MAP INTERACTIVE VISUAL */}
          {activeTab === "mindmap" && (
            <div className="relative w-full h-[360px] flex items-center justify-center bg-[#070b1c]/80 rounded-2xl border border-blue-500/20 p-6 overflow-hidden">
              {/* Decorative Canvas Grid */}
              <div
                className="absolute inset-0 opacity-[0.12] pointer-events-none"
                style={{
                  backgroundImage:
                    "radial-gradient(#8BFF68 1.5px, transparent 1.5px)",
                  backgroundSize: "28px 28px",
                }}
              />

              {/* Central Core Concept Node */}
              <div className="relative z-10 bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 text-white px-6 py-3.5 rounded-2xl shadow-[0_0_35px_rgba(30,64,175,0.6)] text-center border-2 border-[#8BFF68]">
                <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#8BFF68] font-black uppercase tracking-wider mb-0.5">
                  <Brain className="w-3.5 h-3.5 text-[#8BFF68]" />
                  <span>Central Topic</span>
                </div>
                <div className="text-base sm:text-lg font-black tracking-tight">Deep Neural Networks</div>
              </div>

              {/* Connected Branch Nodes */}
              {/* Branch 1 - Top Left */}
              <div className="absolute top-6 left-6 sm:left-14 z-10 bg-[#0e1638]/95 border border-blue-400/30 p-3.5 rounded-xl shadow-lg text-xs max-w-[180px] animate-float-slow">
                <span className="font-bold text-[#8BFF68] block mb-1">
                  1. Backpropagation
                </span>
                <span className="text-slate-300 text-[11px] leading-tight block">
                  Chain rule applied across hidden layers to minimize loss.
                </span>
              </div>

              {/* Branch 2 - Top Right */}
              <div className="absolute top-6 right-6 sm:right-14 z-10 bg-[#0e1638]/95 border border-blue-400/30 p-3.5 rounded-xl shadow-lg text-xs max-w-[180px] animate-float-reverse">
                <span className="font-bold text-[#8BFF68] block mb-1">
                  2. Attention Mechanism
                </span>
                <span className="text-slate-300 text-[11px] leading-tight block">
                  Self-attention computes dynamic weights between token pairs.
                </span>
              </div>

              {/* Branch 3 - Bottom Left */}
              <div className="absolute bottom-6 left-6 sm:left-16 z-10 bg-[#0e1638]/95 border border-blue-400/30 p-3.5 rounded-xl shadow-lg text-xs max-w-[180px] animate-float-reverse">
                <span className="font-bold text-[#8BFF68] block mb-1">
                  3. Gradient Descent
                </span>
                <span className="text-slate-300 text-[11px] leading-tight block">
                  Optimizes weights using learning rate &amp; momentum.
                </span>
              </div>

              {/* Branch 4 - Bottom Right */}
              <div className="absolute bottom-6 right-6 sm:right-16 z-10 bg-[#0e1638]/95 border border-blue-400/30 p-3.5 rounded-xl shadow-lg text-xs max-w-[180px] animate-float-slow">
                <span className="font-bold text-[#8BFF68] block mb-1">
                  4. Activation Functions
                </span>
                <span className="text-slate-300 text-[11px] leading-tight block">
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
                  stroke="#8BFF68"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                  strokeOpacity="0.6"
                />
                <line
                  x1="50%"
                  y1="50%"
                  x2="78%"
                  y2="20%"
                  stroke="#8BFF68"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                  strokeOpacity="0.6"
                />
                <line
                  x1="50%"
                  y1="50%"
                  x2="22%"
                  y2="80%"
                  stroke="#8BFF68"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                  strokeOpacity="0.6"
                />
                <line
                  x1="50%"
                  y1="50%"
                  x2="78%"
                  y2="80%"
                  stroke="#8BFF68"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                  strokeOpacity="0.6"
                />
              </svg>
            </div>
          )}

          {/* TAB 2: AI FLASHCARD PREVIEW */}
          {activeTab === "flashcard" && (
            <div className="flex flex-col items-center justify-center py-4">
              <div className="w-full max-w-lg bg-gradient-to-br from-[#121c45] via-[#0d1433] to-[#070b1a] text-white rounded-2xl p-6 shadow-2xl border border-[#8BFF68]/40">
                <div className="flex items-center justify-between text-xs mb-4">
                  <span className="px-2.5 py-1 rounded-full bg-[#8BFF68]/15 text-[#8BFF68] font-bold border border-[#8BFF68]/30">
                    Card 03 of 12 • Active Recall
                  </span>
                  <span className="text-[#8BFF68] font-bold flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" /> High Yield
                  </span>
                </div>
                <div className="text-xs uppercase tracking-wider text-slate-400 font-bold mb-2">
                  Question
                </div>
                <p className="text-base sm:text-lg font-bold text-white mb-6">
                  What is the fundamental difference between L1 (Lasso) and L2 (Ridge) Regularization?
                </p>
                <div className="pt-4 border-t border-white/10 bg-[#060a18]/70 -mx-6 -mb-6 p-5 rounded-b-2xl">
                  <div className="text-xs uppercase tracking-wider text-[#8BFF68] font-black mb-1">
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
                <div className="bg-[#1742e6] text-white rounded-2xl rounded-tr-xs px-5 py-3 max-w-md shadow-md text-sm font-medium">
                  Can you summarize how transformers overcome the sequential bottleneck of RNNs?
                </div>
              </div>

              {/* AI response */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-[#8BFF68] text-black flex items-center justify-center shrink-0 shadow-[0_0_15px_#8BFF68] font-bold">
                  <Brain className="w-5 h-5 text-black" />
                </div>
                <div className="bg-[#0e1638] border border-blue-400/30 rounded-2xl rounded-tl-xs p-5 shadow-lg text-white text-xs sm:text-sm space-y-2">
                  <p className="leading-relaxed text-slate-200">
                    Unlike RNNs that process tokens sequentially (step t depends on step t-1), Transformers process all sequence tokens <strong className="text-[#8BFF68]">in parallel</strong> using Multi-Head Self-Attention.
                  </p>
                  <p className="text-slate-300 text-xs">
                    This eliminates gradient vanishing across long distances and enables accelerated GPU tensor matrix multiplication during training.
                  </p>
                  <div className="flex items-center gap-2 pt-2 border-t border-white/10">
                    <span className="text-[11px] bg-[#8BFF68]/15 text-[#8BFF68] px-2 py-0.5 rounded font-mono border border-[#8BFF68]/30 font-bold">
                      Citation: CS224N Lecture 5, §3.2
                    </span>
                    <span className="text-[11px] text-[#8BFF68] font-bold">
                      ✓ Verified Source
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: STUDY GUIDE SUMMARY */}
          {activeTab === "guide" && (
            <div className="w-full max-w-2xl mx-auto bg-[#0d1434] border border-blue-400/30 rounded-2xl p-5 shadow-xl space-y-3">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-[#8BFF68]" />
                  <span className="font-bold text-white text-sm">
                    Course Unit: Supervised Learning Architectures
                  </span>
                </div>
                <span className="text-xs bg-white/10 text-[#8BFF68] px-2 py-0.5 rounded font-bold border border-white/10">
                  3 Pages Synthesized
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-[#080d21] rounded-xl border border-white/10">
                  <div className="font-bold text-[#8BFF68] mb-1">Key Formulas</div>
                  <p className="text-slate-300">Cross-Entropy Loss: L = -∑ yᵢ log(ŷᵢ)</p>
                  <p className="text-slate-300 mt-1">Weight Update: w := w - α ∇L(w)</p>
                </div>
                <div className="p-3 bg-[#080d21] rounded-xl border border-white/10">
                  <div className="font-bold text-[#8BFF68] mb-1">Exam Trap Warning</div>
                  <p className="text-slate-300">Do not confuse Precision (false positives penalty) with Recall (false negatives penalty) in skewed datasets.</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Status & Action Bar */}
        <div className="px-6 py-4 bg-[#0a0f26] border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#8BFF68]" />
            <span>Interactive Demo data preloaded for immediate exploration</span>
          </div>
          <Link
            href="/dashboard/study"
            className="inline-flex items-center gap-1 font-bold text-[#8BFF68] hover:underline transition-all"
          >
            Open in Live Fullscreen Studio
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
