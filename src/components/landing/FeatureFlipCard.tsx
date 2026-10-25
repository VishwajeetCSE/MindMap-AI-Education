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
      className="group perspective-1000 h-[280px] w-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500/50 rounded-2xl"
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
        <div className="absolute inset-0 backface-hidden bg-white/90 backdrop-blur-md rounded-2xl p-6 border border-slate-200/90 shadow-sm hover:shadow-xl hover:shadow-blue-500/5 flex flex-col justify-between transition-all">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-xl border border-blue-100/80 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-200">
                <Icon className="w-6 h-6" />
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-600 bg-slate-100/80 px-2.5 py-1 rounded-full font-medium">
                <RotateCw className="w-3 h-3 text-slate-600" />
                <span>Flip for details</span>
              </div>
            </div>

            <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-2">
              {feature.title}
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              {feature.frontDescription}
            </p>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-100 text-xs font-semibold text-blue-600">
            <span>Explore capability</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* BACK FACE */}
        <div className="absolute inset-0 backface-hidden rotate-y-180 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white rounded-2xl p-6 border border-indigo-500/30 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Icon className="w-5 h-5 text-indigo-400" />
                <span className="text-sm font-bold text-indigo-200">How It Works</span>
              </div>
              <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                AI Powered
              </span>
            </div>

            <h4 className="text-base font-bold text-white mb-2">{feature.title}</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              {feature.backDescription}
            </p>
          </div>

          <div className="pt-3 border-t border-indigo-900/60" onClick={(e) => e.stopPropagation()}>
            <Link
              href={feature.actionHref}
              className="inline-flex items-center justify-center w-full gap-2 px-3 py-2 text-xs font-medium bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-lg shadow-sm transition-all"
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
