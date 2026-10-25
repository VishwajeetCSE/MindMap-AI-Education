"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Brain,
  Sparkles,
  Send,
  Copy,
  Check,
  ArrowRight,
  BookOpen,
  MessageSquare,
} from "lucide-react";

interface ChatPreset {
  id: string;
  label: string;
  question: string;
  answer: string;
  citation: string;
  sourceDoc: string;
}

const presets: ChatPreset[] = [
  {
    id: "grad-descent",
    label: "Gradient Descent Intuition",
    question: "Explain how gradient descent finds the minimum of a cost function in simple terms.",
    answer:
      "Imagine standing on a foggy mountainside trying to reach the valley floor. Because you can't see the bottom, you feel the slope beneath your feet and take a step in the direction of steepest downward descent. In machine learning, the slope is the gradient of the loss function, the step size is the learning rate (alpha), and the valley floor represents the optimal model parameters with minimum prediction error.",
    citation: "Lecture 03: Optimization & Convex Loss Landscapes, Slide 14",
    sourceDoc: "CS-229-Machine-Learning.pdf",
  },
  {
    id: "attention",
    label: "Self-Attention Mechanism",
    question: "Why did Transformers replace RNNs for sequence processing?",
    answer:
      "Traditional Recurrent Neural Networks (RNNs) suffer from two core limitations: sequential calculation prevents parallel training on GPUs, and gradients vanish over long sequence contexts. Transformers introduce Multi-Head Self-Attention, which computes token relationship weights simultaneously across the entire context window in O(1) sequential operations.",
    citation: "Vaswani et al.: 'Attention Is All You Need', §3.1",
    sourceDoc: "Attention-Is-All-You-Need-Paper.pdf",
  },
  {
    id: "big-o",
    label: "Time Complexity & Big-O",
    question: "What is the key difference between O(n log n) and O(n^2) algorithms?",
    answer:
      "At small input sizes (n = 100), the difference is negligible (664 vs 10,000 operations). But at scale (n = 1,000,000), an O(n log n) algorithm like MergeSort performs ~20 million operations (fractions of a second), whereas an O(n^2) algorithm like BubbleSort performs 1 trillion operations, taking hours or running out of memory.",
    citation: "CS-106B Lecture 8: Asymptotic Algorithm Analysis, p. 28",
    sourceDoc: "Data-Structures-Course-Notes.md",
  },
];

export function AIChatPreview() {
  const [selectedPreset, setSelectedPreset] = useState<ChatPreset>(presets[0]);
  const [copied, setCopied] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(
      `Q: ${selectedPreset.question}\n\nA: ${selectedPreset.answer}\n\nCitation: [${selectedPreset.citation}]`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const selectPreset = (preset: ChatPreset) => {
    setIsTyping(true);
    setSelectedPreset(preset);
    setTimeout(() => {
      setIsTyping(false);
    }, 400);
  };

  return (
    <div className="w-full max-w-4xl mx-auto my-12 bg-white/95 backdrop-blur-xl border border-slate-200/90 rounded-2xl shadow-xl overflow-hidden">
      {/* Top Header */}
      <div className="p-6 bg-slate-50/80 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-100/70 px-2.5 py-0.5 rounded-full mb-1">
            <MessageSquare className="w-3 h-3 text-emerald-600" />
            <span>Interactive Chat Sandbox</span>
          </div>
          <h3 className="text-xl font-bold text-slate-900">
            Ask Questions Across Your Syllabus
          </h3>
          <p className="text-xs text-slate-600 mt-0.5">
            Gemini 1.5 Flash retrieves context from Appwrite VectorsDB and returns verified, cited answers.
          </p>
        </div>

        <Link
          href="/dashboard/chat"
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors shrink-0"
        >
          <span>Open Full Chat Hub</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Suggested Prompt Chips */}
      <div className="px-6 py-3 bg-slate-100/60 border-b border-slate-200/70 flex items-center gap-2 overflow-x-auto text-xs">
        <span className="text-slate-600 font-semibold shrink-0">Try prompt:</span>
        {presets.map((preset) => (
          <button
            key={preset.id}
            onClick={() => selectPreset(preset)}
            className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-all border ${
              selectedPreset.id === preset.id
                ? "bg-white text-blue-700 border-blue-300 shadow-xs font-bold"
                : "bg-white/60 text-slate-600 border-slate-200 hover:bg-white"
            }`}
          >
            {preset.label}
          </button>
        ))}
      </div>

      {/* Chat Messages Body */}
      <div className="p-6 sm:p-8 space-y-5 bg-gradient-to-b from-slate-50/30 to-white min-h-[300px]">
        {/* User Bubble */}
        <div className="flex items-start justify-end gap-3">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl rounded-tr-xs px-5 py-3 text-sm max-w-lg shadow-sm">
            {selectedPreset.question}
          </div>
        </div>

        {/* AI Answer Bubble */}
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-violet-600 flex items-center justify-center text-white shrink-0 shadow-md">
            <Brain className="w-4 h-4" />
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-xs p-5 shadow-sm text-slate-800 text-sm max-w-2xl relative space-y-3">
            {isTyping ? (
              <div className="flex items-center gap-2 py-4 text-xs text-blue-600 font-medium">
                <span className="typing-dot" />
                <span className="typing-dot" />
                <span className="typing-dot" />
                <span className="ml-2 text-slate-600">Retrieving syllabus chunks from Appwrite...</span>
              </div>
            ) : (
              <>
                <p className="leading-relaxed text-slate-700">
                  {selectedPreset.answer}
                </p>

                {/* Citation Card Footer */}
                <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="p-1 bg-blue-50 text-blue-700 rounded border border-blue-200 font-mono text-[11px] font-semibold">
                      [{selectedPreset.citation}]
                    </span>
                    <span className="text-[11px] text-emerald-600 font-medium flex items-center gap-1">
                      <Sparkles className="w-3 h-3" /> Grounded In Source
                    </span>
                  </div>

                  <button
                    onClick={handleCopy}
                    className="inline-flex items-center gap-1 text-xs text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-2.5 py-1 rounded-md transition-colors"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-600" />
                        <span className="text-emerald-700 font-medium">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3 text-slate-600" />
                        <span>Copy Answer</span>
                      </>
                    )}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Simulated Input Field */}
      <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Ask a question about your uploaded documents or choose a prompt above..."
          className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-800 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
          onKeyDown={(e) => {
            if (e.key === "Enter" && inputValue.trim()) {
              setIsTyping(true);
              setTimeout(() => {
                setIsTyping(false);
                setInputValue("");
              }, 500);
            }
          }}
        />
        <Link
          href="/dashboard/chat"
          className="p-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-xs transition-colors shrink-0"
          aria-label="Send query to live chat"
        >
          <Send className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
