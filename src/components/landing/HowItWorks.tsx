"use client";

import React from "react";
import { UploadCloud, Brain, GraduationCap, ArrowRight } from "lucide-react";

export function HowItWorks() {
  const steps = [
    {
      step: "01",
      icon: UploadCloud,
      title: "Upload & Ingest",
      desc: "Drop lecture notes, syllabus guides, or textbook chapters in TXT, Markdown, or PDF format. Multi-tier ingestion parses and chunks content automatically.",
      color: "from-blue-600 to-cyan-600",
      accentBg: "bg-blue-50 text-blue-700 border-blue-200",
    },
    {
      step: "02",
      icon: Brain,
      title: "AI Synthesis & Indexing",
      desc: "Google Gemini text-embedding-004 generates high-dimensional vectors stored in Appwrite VectorsDB, establishing semantic relationships and conceptual hierarchy.",
      color: "from-indigo-600 to-violet-600",
      accentBg: "bg-indigo-50 text-indigo-700 border-indigo-200",
    },
    {
      step: "03",
      icon: GraduationCap,
      title: "Master, Practice & Retain",
      desc: "Study through interactive visual mind maps, flip 3D active-recall flashcards, take self-graded practice quizzes, and get verified citations for every question.",
      color: "from-violet-600 to-purple-600",
      accentBg: "bg-purple-50 text-purple-700 border-purple-200",
    },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto my-16">
      <div className="text-center max-w-xl mx-auto mb-12">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-semibold mb-3 border border-blue-100">
          <Brain className="w-3.5 h-3.5" />
          <span>Streamlined Learning Workflow</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          How MindMap AI Works in <span className="saas-gradient-text">Three Steps</span>
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 mt-2">
          From unorganized course materials to exam-ready mastery in under a minute.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
        {steps.map((s, idx) => {
          const Icon = s.icon;
          return (
            <div
              key={s.step}
              className="relative bg-white/95 backdrop-blur-sm border border-slate-200/90 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-black text-slate-300 font-mono">
                    {s.step}
                  </span>
                  <div className={`p-3 rounded-xl border ${s.accentBg}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                <h4 className="text-base font-bold text-slate-900 mb-2">
                  {s.title}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {s.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-blue-600">
                <span>Step {idx + 1} of 3</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
