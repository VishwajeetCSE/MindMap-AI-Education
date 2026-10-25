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
    },
    {
      step: "02",
      icon: Brain,
      title: "AI Synthesis & Indexing",
      desc: "Google Gemini text-embedding-004 generates high-dimensional vectors stored in Appwrite VectorsDB, establishing semantic relationships and conceptual hierarchy.",
    },
    {
      step: "03",
      icon: GraduationCap,
      title: "Master, Practice & Retain",
      desc: "Study through interactive visual mind maps, flip 3D active-recall flashcards, take self-graded practice quizzes, and get verified citations for every question.",
    },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto my-16">
      <div className="text-center max-w-xl mx-auto mb-12">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#8BFF68]/15 text-[#8BFF68] rounded-full text-xs font-bold mb-3 border border-[#8BFF68]/30">
          <Brain className="w-3.5 h-3.5" />
          <span>Streamlined Learning Workflow</span>
        </div>
        <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight">
          How MindMap AI Works in <span className="text-[#8BFF68] drop-shadow-[0_0_20px_rgba(139,255,104,0.4)]">Three Steps</span>
        </h3>
        <p className="text-xs sm:text-sm text-slate-300 mt-2">
          From unorganized course materials to exam-ready mastery in under a minute.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
        {steps.map((s, idx) => {
          const Icon = s.icon;
          return (
            <div
              key={s.step}
              className="relative bg-[#0e1638] backdrop-blur-sm border border-blue-500/20 rounded-3xl p-6 shadow-xl hover:shadow-[0_0_25px_rgba(139,255,104,0.1)] hover:border-[#8BFF68]/50 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl font-black text-white/10 font-mono group-hover:text-[#8BFF68]/30 transition-colors">
                    {s.step}
                  </span>
                  <div className="p-3 rounded-xl bg-[#8BFF68]/15 text-[#8BFF68] border border-[#8BFF68]/30 group-hover:bg-[#8BFF68] group-hover:text-black transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                <h4 className="text-base font-bold text-white mb-2">
                  {s.title}
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {s.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-bold text-[#8BFF68]">
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
