"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Brain,
  Layers,
  GraduationCap,
  MessageSquare,
  Sparkles,
  ArrowRight,
  RotateCw,
  CheckCircle2,
} from "lucide-react";

interface TopicDemoData {
  id: string;
  name: string;
  category: string;
  overview: string;
  mindMapNodes: { title: string; desc: string; color: string }[];
  flashcard: { question: string; answer: string };
  studySummary: string[];
  sampleChat: { question: string; answer: string; citation: string };
}

const sampleTopics: TopicDemoData[] = [
  {
    id: "ai-ml",
    name: "Artificial Intelligence & Neural Networks",
    category: "Computer Science",
    overview:
      "Study unit covering feedforward architectures, backpropagation calculus, cross-entropy loss gradients, and multi-head attention mechanisms.",
    mindMapNodes: [
      {
        title: "Backpropagation",
        desc: "Reverse-mode differentiation calculating partial derivatives of loss with respect to all layer weights.",
        color: "blue",
      },
      {
        title: "Loss Functions",
        desc: "Mean Squared Error for regression, Categorical Cross-Entropy for multi-class classification.",
        color: "indigo",
      },
      {
        title: "Self-Attention",
        desc: "Query, Key, and Value matrices computing pairwise similarity scores across sequence tokens.",
        color: "violet",
      },
      {
        title: "Regularization",
        desc: "Dropout, Weight Decay (L2), and Batch Normalization to prevent overfitting on training data.",
        color: "emerald",
      },
    ],
    flashcard: {
      question: "Why does the vanishing gradient problem occur with Sigmoid activations in deep networks?",
      answer:
        "The derivative of the sigmoid function reaches a maximum of only 0.25. As gradients are multiplied across dozens of layers during backpropagation via the chain rule, they decay exponentially toward zero, preventing earlier layers from updating weights.",
    },
    studySummary: [
      "Key Theorem: Universal Approximation Theorem states a feedforward network with one hidden layer can approximate any continuous function.",
      "Optimization Rule: Adam optimizer blends RMSprop (adaptive learning rate) with Momentum (moving average of gradients).",
      "Exam Alert: Always normalize inputs with standard scaling or batch norm to keep gradients stable across training epochs.",
    ],
    sampleChat: {
      question: "How does the Learning Rate parameter affect model convergence?",
      answer:
        "If the learning rate is too high, gradient updates overshoot the minimum and the loss function diverges. If it is too low, training requires excessive epochs and risks getting trapped in suboptimal local minima or saddle points.",
      citation: "CS229 Lecture Notes: Optimization & Gradient Dynamics, p. 19",
    },
  },
  {
    id: "dsa",
    name: "Data Structures & Graph Algorithms",
    category: "Software Engineering",
    overview:
      "Comprehensive syllabus covering tree traversals, shortest path algorithms (Dijkstra, Bellman-Ford), and asymptotic time complexity.",
    mindMapNodes: [
      {
        title: "Graph Traversal",
        desc: "BFS uses FIFO queue for shortest paths in unweighted graphs; DFS uses stack/recursion for topological sorting.",
        color: "blue",
      },
      {
        title: "Dijkstra Algorithm",
        desc: "Greedy single-source shortest path using a min-heap priority queue with non-negative edge weights.",
        color: "indigo",
      },
      {
        title: "Balanced BST",
        desc: "AVL trees and Red-Black trees maintain O(log n) worst-case search, insertion, and deletion times.",
        color: "violet",
      },
      {
        title: "Dynamic Programming",
        desc: "Overlapping subproblems and optimal substructure solved via memoization or iterative tabulation.",
        color: "emerald",
      },
    ],
    flashcard: {
      question: "What is the time complexity of finding the shortest path in a graph with Dijkstra using a Fibonacci Heap?",
      answer:
        "O(E + V log V), where V is the number of vertices and E is the number of edges. This improves upon binary heaps when the graph is dense (E >> V).",
    },
    studySummary: [
      "Crucial Invariant: In a Min-Heap, the key at any node is always <= the keys of its children.",
      "Proof Technique: Induction on edge counts verifies Bellman-Ford can detect negative cycles after V-1 relaxations.",
      "Exam Alert: Dijkstra will fail or produce incorrect shortest paths if any edge weight is negative.",
    ],
    sampleChat: {
      question: "When should I choose Tabulation (Bottom-Up) over Memoization (Top-Down) in DP?",
      answer:
        "Choose Tabulation when all subproblems must be solved anyway, as it avoids recursion stack overhead and allows space optimization (e.g., maintaining only the last two rows). Use Memoization when many states in the subproblem space are never reached.",
      citation: "Algorithm Design Manual, Ch. 8: Dynamic Programming, §8.3",
    },
  },
];

export function InteractiveTopicDemo() {
  const [selectedTopicId, setSelectedTopicId] = useState<string>("ai-ml");
  const [activeTab, setActiveTab] = useState<"mindmap" | "flashcard" | "chat" | "guide">("mindmap");
  const [isFlipped, setIsFlipped] = useState(false);

  const topic = sampleTopics.find((t) => t.id === selectedTopicId) || sampleTopics[0];

  return (
    <div className="w-full max-w-5xl mx-auto my-12 bg-[#090e24]/95 backdrop-blur-2xl border border-blue-500/30 rounded-3xl shadow-2xl overflow-hidden text-white">
      {/* Header with Topic Switcher */}
      <div className="p-6 bg-[#0e1638] border-b border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#8BFF68] bg-[#8BFF68]/15 px-2.5 py-0.5 rounded-full mb-1 border border-[#8BFF68]/30">
            <Sparkles className="w-3 h-3 text-[#8BFF68]" />
            <span>Interactive Demo Sandbox</span>
          </div>
          <h3 className="text-xl font-black text-white">
            Explore Without Signing In
          </h3>
          <p className="text-xs text-slate-300 mt-0.5">
            Select a syllabus topic below to experience instant mind maps, flashcards, and cited chat.
          </p>
        </div>

        {/* Topic selector buttons */}
        <div className="flex items-center gap-2">
          {sampleTopics.map((t) => (
            <button
              key={t.id}
              onClick={() => {
                setSelectedTopicId(t.id);
                setIsFlipped(false);
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all border ${
                selectedTopicId === t.id
                  ? "bg-[#8BFF68] text-black border-[#8BFF68] shadow-[0_0_15px_rgba(139,255,104,0.4)]"
                  : "bg-white/5 text-slate-300 border-white/10 hover:bg-white/10"
              }`}
            >
              {t.name}
            </button>
          ))}
        </div>
      </div>

      {/* Secondary Navigation for Sub-Features */}
      <div className="px-6 py-3 bg-[#070b1a] border-b border-white/10 flex items-center gap-2 overflow-x-auto text-xs font-medium">
        <button
          onClick={() => setActiveTab("mindmap")}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
            activeTab === "mindmap"
              ? "bg-[#8BFF68] text-black font-extrabold shadow-[0_0_10px_rgba(139,255,104,0.3)]"
              : "text-slate-300 hover:text-white"
          }`}
        >
          <Brain className="w-3.5 h-3.5" />
          <span>Visual Mind Map</span>
        </button>

        <button
          onClick={() => setActiveTab("flashcard")}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
            activeTab === "flashcard"
              ? "bg-[#8BFF68] text-black font-extrabold shadow-[0_0_10px_rgba(139,255,104,0.3)]"
              : "text-slate-300 hover:text-white"
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Active Recall Flashcard</span>
        </button>

        <button
          onClick={() => setActiveTab("guide")}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
            activeTab === "guide"
              ? "bg-[#8BFF68] text-black font-extrabold shadow-[0_0_10px_rgba(139,255,104,0.3)]"
              : "text-slate-300 hover:text-white"
          }`}
        >
          <GraduationCap className="w-3.5 h-3.5" />
          <span>High-Yield Summary</span>
        </button>

        <button
          onClick={() => setActiveTab("chat")}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
            activeTab === "chat"
              ? "bg-[#8BFF68] text-black font-extrabold shadow-[0_0_10px_rgba(139,255,104,0.3)]"
              : "text-slate-300 hover:text-white"
          }`}
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Context-Aware Chat</span>
        </button>
      </div>

      {/* Content Area */}
      <div className="p-6 sm:p-8 min-h-[340px] flex flex-col justify-center">
        {/* SUB-VIEW 1: MIND MAP */}
        {activeTab === "mindmap" && (
          <div>
            <div className="mb-4 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#8BFF68]">
                  Concept Hierarchy Graph
                </span>
                <h4 className="text-base font-bold text-white">{topic.name}</h4>
              </div>
              <span className="text-xs bg-[#8BFF68]/15 text-[#8BFF68] border border-[#8BFF68]/30 px-2 py-0.5 rounded-full font-bold">
                Synthesized by Gemini 1.5 Flash
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {topic.mindMapNodes.map((node, i) => (
                <div
                  key={node.title}
                  className="p-4 bg-[#0e1638] border border-blue-500/20 rounded-2xl hover:border-[#8BFF68]/60 transition-all shadow-md group"
                >
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#8BFF68] mb-1">
                    <span className="w-5 h-5 rounded-full bg-[#8BFF68] text-black flex items-center justify-center text-[11px] font-black">
                      {i + 1}
                    </span>
                    <span>{node.title}</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">{node.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SUB-VIEW 2: FLASHCARD */}
        {activeTab === "flashcard" && (
          <div className="max-w-md mx-auto w-full">
            <div
              onClick={() => setIsFlipped(!isFlipped)}
              className="cursor-pointer perspective-1000 h-[220px]"
            >
              <div
                className={`relative w-full h-full duration-300 preserve-3d transition-transform ${
                  isFlipped ? "rotate-y-180" : ""
                }`}
              >
                {/* Front */}
                <div className="absolute inset-0 backface-hidden bg-gradient-to-br from-[#121c45] to-[#070b1a] text-white p-6 rounded-2xl border border-blue-400/40 shadow-xl flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                      <span className="text-[#8BFF68] font-bold">Concept Flashcard</span>
                      <span className="flex items-center gap-1 text-slate-300">
                        <RotateCw className="w-3 h-3 text-[#8BFF68]" /> Click to Flip
                      </span>
                    </div>
                    <p className="text-sm sm:text-base font-bold leading-relaxed mt-2 text-white">
                      {topic.flashcard.question}
                    </p>
                  </div>
                  <div className="text-xs text-[#8BFF68] font-bold pt-2 border-t border-white/10">
                    Topic: {topic.name}
                  </div>
                </div>

                {/* Back */}
                <div className="absolute inset-0 backface-hidden rotate-y-180 bg-[#0e1638] text-white p-6 rounded-2xl border border-[#8BFF68] shadow-2xl flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs text-[#8BFF68] font-bold mb-2">
                      <span className="flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#8BFF68]" /> Answer Explanation
                      </span>
                      <span className="text-slate-400">Click to Flip Back</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                      {topic.flashcard.answer}
                    </p>
                  </div>
                  <div className="text-xs text-[#8BFF68] font-bold pt-2 border-t border-white/10">
                    Active Recall Mastery
                  </div>
                </div>
              </div>
            </div>
            <p className="text-center text-xs text-slate-400 mt-3">
              Click the card or press Enter to test your knowledge
            </p>
          </div>
        )}

        {/* SUB-VIEW 3: SUMMARY */}
        {activeTab === "guide" && (
          <div className="space-y-3 max-w-2xl mx-auto">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-[#8BFF68]" />
              High-Yield Exam Prep Takeaways
            </h4>
            <div className="space-y-2">
              {topic.studySummary.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3.5 bg-[#0e1638] border border-blue-500/20 rounded-xl text-xs text-slate-200 flex items-start gap-2.5"
                >
                  <span className="w-4 h-4 rounded-full bg-[#8BFF68] text-black text-[10px] font-black flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SUB-VIEW 4: CHAT */}
        {activeTab === "chat" && (
          <div className="max-w-xl mx-auto space-y-3">
            <div className="flex justify-end">
              <div className="bg-[#1742e6] text-white rounded-2xl rounded-tr-xs px-4 py-2.5 text-xs sm:text-sm max-w-sm font-medium">
                {topic.sampleChat.question}
              </div>
            </div>
            <div className="bg-[#0e1638] border border-blue-500/30 rounded-2xl rounded-tl-xs p-4 text-xs sm:text-sm text-white space-y-2">
              <p className="leading-relaxed text-slate-200">{topic.sampleChat.answer}</p>
              <div className="pt-2 border-t border-white/10 flex items-center gap-2">
                <span className="text-[11px] bg-[#8BFF68]/15 text-[#8BFF68] font-mono px-2 py-0.5 rounded font-bold border border-[#8BFF68]/30">
                  {topic.sampleChat.citation}
                </span>
                <span className="text-[11px] text-[#8BFF68] font-bold">✓ Verified Source</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer CTA */}
      <div className="px-6 py-4 bg-[#070b1a] border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <span className="text-slate-300">
          Want to upload your own custom textbook or slides?
        </span>
        <Link
          href="/auth/login"
          className="inline-flex items-center gap-1.5 font-black text-[#8BFF68] hover:underline transition-all"
        >
          Launch Free Guest Demo Session
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
