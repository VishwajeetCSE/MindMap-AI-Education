"use client";

import React, { useState, useEffect } from "react";

const phrases = [
  "Turn Notes Into Interactive Mind Maps",
  "Generate AI-Powered Flashcards",
  "Chat With Your Study Materials",
  "Create Smart Study Guides",
  "Learn Faster With Your AI Study Companion",
];

export function AnimatedTypingText() {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check user preference for reduced motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const listener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", listener);
    return () => mediaQuery.removeEventListener("change", listener);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplayText(phrases[phraseIndex]);
      const timer = setTimeout(() => {
        setPhraseIndex((prev) => (prev + 1) % phrases.length);
      }, 3500);
      return () => clearTimeout(timer);
    }

    const currentPhrase = phrases[phraseIndex];
    let timer: NodeJS.Timeout;

    if (!isDeleting) {
      if (displayText.length < currentPhrase.length) {
        timer = setTimeout(() => {
          setDisplayText(currentPhrase.slice(0, displayText.length + 1));
        }, 40);
      } else {
        // Paused at full phrase
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, 2200);
      }
    } else {
      if (displayText.length > 0) {
        timer = setTimeout(() => {
          setDisplayText(currentPhrase.slice(0, displayText.length - 1));
        }, 20);
      } else {
        setIsDeleting(false);
        setPhraseIndex((prev) => (prev + 1) % phrases.length);
      }
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, phraseIndex, prefersReducedMotion]);

  return (
    <div
      className="min-h-[4.5rem] sm:min-h-[5.5rem] md:min-h-[6.5rem] flex items-center justify-center text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-center px-4"
      aria-live="polite"
      aria-atomic="true"
    >
      <span className="text-[#8BFF68] drop-shadow-[0_0_35px_rgba(139,255,104,0.55)]">
        {displayText}
      </span>
      <span
        className="inline-block w-1.5 sm:w-2 h-8 sm:h-12 md:h-14 ml-2.5 bg-[#8BFF68] rounded-full shadow-[0_0_20px_#8BFF68] animate-cursor-blink"
        aria-hidden="true"
      />
    </div>
  );
}
