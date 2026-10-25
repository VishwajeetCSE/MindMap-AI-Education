"use client";

import React, { useState } from "react";
import Link from "next/link";
import { LucideIcon, ArrowRight, RotateCw } from "lucide-react";

export interface FeatureCardData {
  id: string;
  icon: LucideIcon;
  title: string;
  badge?: string;
  frontDescription: string;
  backDescription: string;
  actionText: string;
  actionHref: string;
  tagColor?: string;
}

export function FeatureFlipCard({ feature }: { feature: FeatureCardData }) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setIsFlipped(!isFlipped);
    }
  };

  const Icon = feature.icon;

  return (
    <div
      className="group perspective-1000 h-[280px] w-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#8BFF68]/50 rounded-2xl"
      tabIndex={0}
      role="button"
      aria-label={`${feature.title} feature card. Click or press enter to flip and view details.`}
      aria-expanded={isFlipped}
      onKeyDown={handleKeyDown}
      onClick={() => setIsFlipped(!isFlipped)}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <div
        className={`relative w-full h-full duration-300 preserve-3d transition-transform ease-out rounded-2xl ${
          isFlipped ? "rotate-y-180" : ""
        }`}
      >
        {/* FRONT FACE */}
        <div className="absolute inset-0 backface-hidden bg-[#0c1228]/95 backdrop-blur-md rounded-2xl p-6 border border-white/10 group-hover:border-[#8BFF68]/50 shadow-xl group-hover:shadow-[0_0_25px_rgba(139,255,104,0.15)] flex flex-col justify-between transition-all">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-950/80 text-[#8BFF68] rounded-xl border border-[#8BFF68]/30 group-hover:bg-[#8BFF68] group-hover:text-black transition-colors duration-200 shadow-sm">
                <Icon className="w-6 h-6" />
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-300 bg-white/5 border border-white/10 px-2.5 py-1 rounded-full font-medium">
                <RotateCw className="w-3 h-3 text-[#8BFF68]" />
                <span>Flip for details</span>
              </div>
            </div>

            <h3 className="text-lg font-bold text-white group-hover:text-[#8BFF68] transition-colors mb-2">
              {feature.title}
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              {feature.frontDescription}
            </p>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-white/10 text-xs font-bold text-[#8BFF68]">
            <span>Explore capability</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* BACK FACE */}
        <div className="absolute inset-0 backface-hidden rotate-y-180 bg-gradient-to-br from-[#121c40] via-[#0b122b] to-[#060a18] text-white rounded-2xl p-6 border border-[#8BFF68]/40 shadow-2xl shadow-black/80 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Icon className="w-5 h-5 text-[#8BFF68]" />
                <span className="text-sm font-bold text-white">How It Works</span>
              </div>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#8BFF68]/15 text-[#8BFF68] border border-[#8BFF68]/40">
                AI Powered
              </span>
            </div>

            <h4 className="text-base font-bold text-white mb-2">{feature.title}</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              {feature.backDescription}
            </p>
          </div>

          <div className="pt-3 border-t border-white/10" onClick={(e) => e.stopPropagation()}>
            <Link
              href={feature.actionHref}
              className="inline-flex items-center justify-center w-full gap-2 px-3 py-2 text-xs font-black uppercase bg-[#8BFF68] hover:bg-[#a1ff84] text-black rounded-lg shadow-[0_0_15px_rgba(139,255,104,0.4)] transition-all"
            >
              <span>{feature.actionText}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
