"use client";

import React from "react";

/**
 * Floating 3D-style decorative elements (CSS/SVG based).
 * Gives a premium SaaS feel similar to 3D glass spheres, rings, and crystal shapes.
 * Used as a background layer on the landing page and inner pages.
 */
export function FloatingDecorElements({ variant = "hero" }: { variant?: "hero" | "dark" }) {
  if (variant === "hero") {
    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10" aria-hidden="true">
        {/* Large glass sphere - top left */}
        <div className="absolute -top-10 -left-10 w-72 h-72 sm:w-96 sm:h-96">
          <div className="w-full h-full rounded-full bg-gradient-to-br from-[#8BFF68]/20 via-white/40 to-blue-200/30 shadow-[inset_0_-20px_60px_rgba(139,255,104,0.15),0_20px_60px_rgba(139,255,104,0.1)] animate-float-slow" />
          <div className="absolute top-8 left-8 w-16 h-16 rounded-full bg-gradient-to-br from-white/70 to-transparent blur-sm" />
        </div>

        {/* Chrome ring - top right */}
        <div className="absolute top-16 right-10 sm:right-24 w-40 h-40 sm:w-56 sm:h-56 animate-float-reverse">
          <div className="w-full h-full rounded-full border-[12px] sm:border-[16px] border-[#8BFF68]/30 bg-transparent shadow-[0_0_40px_rgba(139,255,104,0.15),inset_0_0_30px_rgba(139,255,104,0.05)] rotate-[25deg]" style={{ borderRadius: "50%" }} />
        </div>

        {/* Small metallic sphere cluster - left side */}
        <div className="absolute top-1/3 left-8 sm:left-16 flex flex-col gap-3 animate-float-slow" style={{ animationDelay: "1s" }}>
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-slate-200 via-slate-400 to-slate-600 shadow-lg shadow-slate-400/30" />
          <div className="w-4 h-4 rounded-full bg-gradient-to-br from-slate-300 via-slate-400 to-slate-500 shadow-md ml-4" />
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#8BFF68]/60 via-[#8BFF68] to-emerald-600 shadow-[0_0_15px_rgba(139,255,104,0.5)] ml-2" />
        </div>

        {/* Green crystal - right side */}
        <div className="absolute top-2/5 right-6 sm:right-16 animate-float-reverse" style={{ animationDelay: "0.5s" }}>
          <div className="w-10 h-14 sm:w-14 sm:h-20 bg-gradient-to-b from-[#8BFF68] to-emerald-600 shadow-[0_0_25px_rgba(139,255,104,0.4)] rotate-45" style={{ clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" }} />
        </div>

        {/* Large glass torus / ring - bottom left */}
        <div className="absolute bottom-16 -left-8 sm:left-8 w-48 h-48 sm:w-64 sm:h-64 animate-float-slow" style={{ animationDelay: "2s" }}>
          <div className="w-full h-full rounded-full border-[10px] sm:border-[14px] border-blue-300/20 bg-transparent shadow-[0_0_30px_rgba(59,130,246,0.08)] -rotate-[15deg]" />
        </div>

        {/* Metallic sphere - bottom right */}
        <div className="absolute bottom-20 right-12 sm:right-32 animate-float-reverse" style={{ animationDelay: "1.5s" }}>
          <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-slate-200 via-slate-400/80 to-slate-700 shadow-xl shadow-slate-500/20">
            <div className="absolute top-2 left-3 w-4 h-4 rounded-full bg-white/40 blur-[2px]" />
          </div>
        </div>

        {/* Small green orbs scattered */}
        <div className="absolute top-1/4 left-1/3 w-3 h-3 rounded-full bg-[#8BFF68] shadow-[0_0_12px_#8BFF68] animate-pulse" />
        <div className="absolute top-2/3 right-1/3 w-2 h-2 rounded-full bg-[#8BFF68] shadow-[0_0_8px_#8BFF68] animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute bottom-1/3 left-1/4 w-2.5 h-2.5 rounded-full bg-[#8BFF68]/80 shadow-[0_0_10px_#8BFF68] animate-pulse" style={{ animationDelay: "2s" }} />

        {/* Floating green cube - mid left */}
        <div className="absolute top-1/2 left-4 sm:left-12 w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-[#8BFF68] to-emerald-500 shadow-[0_0_20px_rgba(139,255,104,0.4)] rotate-45 animate-float-slow rounded-sm" style={{ animationDelay: "3s" }} />

        {/* Background radial glow centers */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#8BFF68]/6 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl" />
      </div>
    );
  }

  // Dark variant for dashboard/inner pages
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10" aria-hidden="true">
      {/* Subtle green glow orbs */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-[#8BFF68]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-blue-600/5 rounded-full blur-3xl" />
      <div className="absolute top-3/4 left-1/3 w-60 h-60 bg-[#8BFF68]/3 rounded-full blur-3xl" />

      {/* Small floating particles */}
      <div className="absolute top-1/5 right-1/4 w-2 h-2 rounded-full bg-[#8BFF68]/40 shadow-[0_0_8px_rgba(139,255,104,0.3)] animate-pulse" />
      <div className="absolute top-2/3 left-1/5 w-1.5 h-1.5 rounded-full bg-[#8BFF68]/30 shadow-[0_0_6px_rgba(139,255,104,0.2)] animate-pulse" style={{ animationDelay: "1.5s" }} />
      <div className="absolute bottom-1/4 right-1/3 w-2 h-2 rounded-full bg-blue-500/30 shadow-[0_0_8px_rgba(59,130,246,0.2)] animate-pulse" style={{ animationDelay: "2.5s" }} />

      {/* Subtle dark ring decorations */}
      <div className="absolute top-10 right-10 w-32 h-32 rounded-full border-[6px] border-white/[0.03] animate-float-slow" />
      <div className="absolute bottom-20 left-10 w-24 h-24 rounded-full border-[4px] border-[#8BFF68]/[0.06] animate-float-reverse" />

      {/* Dot grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(#8BFF68 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
    </div>
  );
}
