"use client";

import React from "react";
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
} from "lucide-react";

export function LearningTransformation() {
  return (
    <div className="w-full max-w-5xl mx-auto my-12">
      <div className="text-center max-w-2xl mx-auto mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#8BFF68]/15 text-[#8BFF68] rounded-full text-xs font-bold mb-3 border border-[#8BFF68]/30">
          <Sparkles className="w-3.5 h-3.5 text-[#8BFF68]" />
          <span>The Study Paradigm Shift</span>
        </div>
        <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight">
          From Chaotic Lecture Notes to <span className="text-[#8BFF68] drop-shadow-[0_0_20px_rgba(139,255,104,0.4)]">Structured Mastery</span>
        </h3>
        <p className="text-xs sm:text-sm text-slate-300 mt-2">
          Compare how traditional passive note-taking stacks up against an AI-powered second brain.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
        {/* BEFORE CARD */}
        <div className="bg-[#0b1022]/90 border border-rose-500/30 rounded-3xl p-6 shadow-xl relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/10 rounded-full blur-2xl pointer-events-none" />

          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-400 bg-rose-500/10 px-2.5 py-1 rounded-full border border-rose-500/20">
                Before MindMap AI
              </span>
              <XCircle className="w-5 h-5 text-rose-500" />
            </div>

            <h4 className="text-lg font-bold text-white mb-2">
              Passive &amp; Disorganized Studying
            </h4>
            <p className="text-xs text-slate-400 mb-6">
              Dense textbook PDFs, chaotic notes, and endless hours spent scrolling looking for formulas.
            </p>

            <ul className="space-y-3 text-xs text-slate-300">
              <li className="flex items-start gap-2.5">
                <span className="p-1 bg-rose-500/20 text-rose-400 rounded-md shrink-0 mt-0.5">
                  <FileWarning className="w-3.5 h-3.5" />
                </span>
                <span><strong className="text-white">Endless Walls of Text:</strong> 100+ slide PDFs with no clear conceptual structure or visual hierarchy.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="p-1 bg-rose-500/20 text-rose-400 rounded-md shrink-0 mt-0.5">
                  <Clock className="w-3.5 h-3.5" />
                </span>
                <span><strong className="text-white">Wasted Preparation Time:</strong> Spending 4 hours making manual flashcards instead of actively learning.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="p-1 bg-rose-500/20 text-rose-400 rounded-md shrink-0 mt-0.5">
                  <Search className="w-3.5 h-3.5" />
                </span>
                <span><strong className="text-white">Context Blind Spots:</strong> Searching for a theorem across 5 different course folders without semantic search.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="p-1 bg-rose-500/20 text-rose-400 rounded-md shrink-0 mt-0.5">
                  <BookOpen className="w-3.5 h-3.5" />
                </span>
                <span><strong className="text-white">Passive Rereading Trap:</strong> Cramming definitions with low long-term retention and high exam anxiety.</span>
              </li>
            </ul>
          </div>

          <div className="mt-6 pt-4 border-t border-rose-500/20 text-[11px] text-rose-400 font-medium">
            Result: Exhaustion, low concept connection, and last-minute cramming panic.
          </div>
        </div>

        {/* AFTER CARD */}
        <div className="bg-[#0e1638] border-2 border-[#8BFF68] rounded-3xl p-6 shadow-[0_0_35px_rgba(139,255,104,0.15)] relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#8BFF68]/10 rounded-full blur-2xl pointer-events-none" />

          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-black uppercase tracking-wider text-black bg-[#8BFF68] px-3 py-1 rounded-full shadow-[0_0_12px_#8BFF68]">
                With MindMap AI
              </span>
              <CheckCircle2 className="w-5 h-5 text-[#8BFF68]" />
            </div>

            <h4 className="text-lg font-black text-white mb-2">
              Active, Visual &amp; Citation-Grounded Mastery
            </h4>
            <p className="text-xs text-slate-300 mb-6">
              AI organizes your raw notes into structured nodes, practice cards, and verified answers in seconds.
            </p>

            <ul className="space-y-3 text-xs text-slate-200">
              <li className="flex items-start gap-2.5">
                <span className="p-1 bg-[#8BFF68]/20 text-[#8BFF68] rounded-md shrink-0 mt-0.5">
                  <Brain className="w-3.5 h-3.5" />
                </span>
                <span><strong className="text-[#8BFF68]">Interactive Visual Mind Maps:</strong> See parent concepts, sub-theories, and relationships clearly connected.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="p-1 bg-[#8BFF68]/20 text-[#8BFF68] rounded-md shrink-0 mt-0.5">
                  <Layers className="w-3.5 h-3.5" />
                </span>
                <span><strong className="text-[#8BFF68]">10-Second High-Yield Flashcards:</strong> Active-recall 3D flip decks ready for spaced repetition practice.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="p-1 bg-[#8BFF68]/20 text-[#8BFF68] rounded-md shrink-0 mt-0.5">
                  <Sparkles className="w-3.5 h-3.5" />
                </span>
                <span><strong className="text-[#8BFF68]">Cited Second Brain Chat:</strong> Ask questions and get answers linked directly to your professor&apos;s slides.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="p-1 bg-[#8BFF68]/20 text-[#8BFF68] rounded-md shrink-0 mt-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </span>
                <span><strong className="text-[#8BFF68]">Practice Exam Readiness:</strong> Self-test with instant diagnostic feedback and comprehensive study guides.</span>
              </li>
            </ul>
          </div>

          <div className="mt-6 pt-4 border-t border-white/10 text-[11px] text-[#8BFF68] font-bold flex items-center justify-between">
            <span>Result: 3x faster exam revision with deep conceptual understanding.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
