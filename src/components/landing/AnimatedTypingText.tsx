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
        }, 45);
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
        }, 25);
      } else {
        setIsDeleting(false);
        setPhraseIndex((prev) => (prev + 1) % phrases.length);
      }
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, phraseIndex, prefersReducedMotion]);

  return (
    <div
      className="min-h-[2.5rem] sm:min-h-[3rem] flex items-center justify-center text-lg sm:text-2xl font-semibold text-blue-700 tracking-tight"
      aria-live="polite"
      aria-atomic="true"
    >
      <span className="bg-gradient-to-r from-blue-700 via-indigo-700 to-violet-700 bg-clip-text text-transparent">
        {displayText}
      </span>
      <span
        className="inline-block w-[3px] h-6 sm:h-7 ml-1 bg-gradient-to-b from-blue-600 to-violet-600 rounded-sm animate-cursor-blink"
        aria-hidden="true"
      />
    </div>
  );
}
