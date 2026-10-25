"use client";

import React from "react";
import { ShieldCheck, Lock, Cpu, EyeOff, CheckCircle2 } from "lucide-react";

export function TrustPrivacySection() {
  const trustPoints = [
    {
      icon: Lock,
      title: "Isolated Account Storage",
      desc: "Your course notes, syllabi, and study summaries are strictly partitioned by Appwrite authenticated user IDs. No cross-tenant access.",
    },
    {
      icon: EyeOff,
      title: "No Training on Your Notes",
      desc: "Text parsed through Google Gemini 1.5 Flash API is used purely for real-time RAG inference and vector generation, never used to train public foundation models.",
    },
    {
      icon: Cpu,
      title: "Modern Vector Architecture",
      desc: "Embeddings generated with Gemini text-embedding-004 are indexed inside Appwrite VectorsDB, ensuring sub-second semantic retrieval.",
    },
    {
      icon: ShieldCheck,
      title: "Academic Integrity & Citations",
      desc: "Every AI claim references exact chunks, lecture slides, and text excerpts so you can independently verify definitions and formulas.",
    },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto my-16">
      <div className="bg-gradient-to-br from-[#0a1230] via-[#0e1638] to-[#080d21] text-white rounded-3xl p-8 sm:p-12 border border-[#8BFF68]/30 shadow-[0_0_40px_rgba(139,255,104,0.08)] relative overflow-hidden">
        {/* Glow decoration */}
        <div className="absolute top-0 right-1/4 w-80 h-80 bg-[#8BFF68]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#8BFF68]/15 text-[#8BFF68] rounded-full text-xs font-bold mb-3 border border-[#8BFF68]/30">
            <ShieldCheck className="w-3.5 h-3.5 text-[#8BFF68]" />
            <span>Built For Trust &amp; Academic Integrity</span>
          </div>
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight">
            Engineered for Student Privacy &amp; Verifiable Knowledge
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 mt-2">
            MindMap AI is built with privacy-first architecture. We do not invent statistics or user counts; we deliver transparent, cited learning tools powered by Google Gemini and Appwrite.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative z-10">
          {trustPoints.map((tp) => {
            const Icon = tp.icon;
            return (
              <div
                key={tp.title}
                className="bg-[#070b1a]/80 border border-white/10 p-5 rounded-2xl flex items-start gap-3.5 hover:border-[#8BFF68]/40 transition-colors group"
              >
                <div className="p-2.5 bg-[#8BFF68]/15 text-[#8BFF68] rounded-xl border border-[#8BFF68]/30 shrink-0 mt-0.5 group-hover:bg-[#8BFF68] group-hover:text-black transition-colors">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white mb-1">
                    {tp.title}
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {tp.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 relative z-10">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#8BFF68]" />
            <span>Open Source Hackathon Project • Google Gemini API &amp; Appwrite VectorsDB</span>
          </div>
          <div className="text-[11px] text-slate-400">
            Full compliance with standard educational fair-use principles.
          </div>
        </div>
      </div>
    </div>
  );
}
