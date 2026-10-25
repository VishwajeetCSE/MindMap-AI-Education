"use client";

import React, { useState } from "react";
import {
  FileWarning,
  Sparkles,
  CheckCircle2,
  XCircle,
  Brain,
  Layers,
  Clock,
  Search,
  BookOpen,
  ArrowRight,
} from "lucide-react";

export function LearningTransformation() {
  const [activeMode, setActiveMode] = useState<"comparison" | "before" | "after">("comparison");

  return (
    <div className="w-full max-w-5xl mx-auto my-12">
      <div className="text-center max-w-2xl mx-auto mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-violet-50 text-violet-700 rounded-full text-xs font-semibold mb-3 border border-violet-100">
          <Sparkles className="w-3.5 h-3.5 text-violet-600" />
          <span>The Study Paradigm Shift</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          From Chaotic Lecture Notes to <span className="saas-gradient-text">Structured Mastery</span>
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 mt-2">
          Compare how traditional passive note-taking stacks up against an AI-powered second brain.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
        {/* BEFORE CARD */}
        <div className="bg-slate-50/90 border border-rose-200/80 rounded-2xl p-6 shadow-sm relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/5 rounded-full blur-2xl pointer-events-none" />

          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-600 bg-rose-100/70 px-2.5 py-1 rounded-full">
                Before MindMap AI
              </span>
              <XCircle className="w-5 h-5 text-rose-500" />
            </div>

            <h4 className="text-lg font-bold text-slate-900 mb-2">
              Passive &amp; Disorganized Studying
            </h4>
            <p className="text-xs text-slate-600 mb-6">
              Dense textbook PDFs, chaotic notes, and endless hours spent scrolling looking for formulas.
            </p>

            <ul className="space-y-3 text-xs text-slate-700">
              <li className="flex items-start gap-2.5">
                <span className="p-1 bg-rose-100 text-rose-600 rounded-md shrink-0 mt-0.5">
                  <FileWarning className="w-3.5 h-3.5" />
                </span>
                <span><strong>Endless Walls of Text:</strong> 100+ slide PDFs with no clear conceptual structure or visual hierarchy.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="p-1 bg-rose-100 text-rose-600 rounded-md shrink-0 mt-0.5">
                  <Clock className="w-3.5 h-3.5" />
                </span>
                <span><strong>Wasted Preparation Time:</strong> Spending 4 hours making manual flashcards instead of actively learning.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="p-1 bg-rose-100 text-rose-600 rounded-md shrink-0 mt-0.5">
                  <Search className="w-3.5 h-3.5" />
                </span>
                <span><strong>Context Blind Spots:</strong> Searching for a theorem across 5 different course folders without semantic search.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="p-1 bg-rose-100 text-rose-600 rounded-md shrink-0 mt-0.5">
                  <BookOpen className="w-3.5 h-3.5" />
                </span>
                <span><strong>Passive Rereading Trap:</strong> Cramming definitions with low long-term retention and high exam anxiety.</span>
              </li>
            </ul>
          </div>

          <div className="mt-6 pt-4 border-t border-rose-100 text-[11px] text-rose-700 font-medium">
            Result: Exhaustion, low concept connection, and last-minute cramming panic.
          </div>
        </div>

        {/* AFTER CARD */}
        <div className="bg-white/95 border-2 border-blue-500/40 rounded-2xl p-6 shadow-xl shadow-blue-500/5 relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-100 px-2.5 py-1 rounded-full">
                With MindMap AI
              </span>
              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
            </div>

            <h4 className="text-lg font-bold text-slate-900 mb-2">
              Active, Visual &amp; Citation-Grounded Mastery
            </h4>
            <p className="text-xs text-slate-600 mb-6">
              AI organizes your raw notes into structured nodes, practice cards, and verified answers in seconds.
            </p>

            <ul className="space-y-3 text-xs text-slate-700">
              <li className="flex items-start gap-2.5">
                <span className="p-1 bg-blue-100 text-blue-700 rounded-md shrink-0 mt-0.5">
                  <Brain className="w-3.5 h-3.5" />
                </span>
                <span><strong>Interactive Visual Mind Maps:</strong> See parent concepts, sub-theories, and relationships clearly connected.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="p-1 bg-indigo-100 text-indigo-700 rounded-md shrink-0 mt-0.5">
                  <Layers className="w-3.5 h-3.5" />
                </span>
                <span><strong>10-Second High-Yield Flashcards:</strong> Active-recall 3D flip decks ready for spaced repetition practice.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="p-1 bg-emerald-100 text-emerald-700 rounded-md shrink-0 mt-0.5">
                  <Sparkles className="w-3.5 h-3.5" />
                </span>
                <span><strong>Cited Second Brain Chat:</strong> Ask questions and get answers linked directly to your professor&apos;s slides.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="p-1 bg-violet-100 text-violet-700 rounded-md shrink-0 mt-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </span>
                <span><strong>Practice Exam Readiness:</strong> Self-test with instant diagnostic feedback and comprehensive study guides.</span>
              </li>
            </ul>
          </div>

          <div className="mt-6 pt-4 border-t border-blue-100 text-[11px] text-blue-700 font-semibold flex items-center justify-between">
            <span>Result: 3x faster exam revision with deep conceptual understanding.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
