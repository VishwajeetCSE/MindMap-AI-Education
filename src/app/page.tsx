"use client";

import React from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import {
  Brain,
  Sparkles,
  ArrowRight,
  GraduationCap,
  Layers,
  MessageSquare,
  FileText,
  ShieldCheck,
  Network,
  BookOpen,
  CheckCircle2,
} from "lucide-react";

import { AnimatedTypingText } from "@/components/landing/AnimatedTypingText";
import { FeatureFlipCard, FeatureCardData } from "@/components/landing/FeatureFlipCard";
import { FloatingProductPreview } from "@/components/landing/FloatingProductPreview";
import { DocumentUploadPanel } from "@/components/landing/DocumentUploadPanel";
import { InteractiveTopicDemo } from "@/components/landing/InteractiveTopicDemo";
import { LearningTransformation } from "@/components/landing/LearningTransformation";
import { AIChatPreview } from "@/components/landing/AIChatPreview";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { TrustPrivacySection } from "@/components/landing/TrustPrivacySection";

export default function LandingPage() {
  const { isAuthenticated, loading } = useAuth();

  const featureCards: FeatureCardData[] = [
    {
      id: "mind-maps",
      icon: Network,
      title: "Smart Mind Maps",
      frontDescription:
        "Transform dense lecture slides, research papers, and textbook chapters into interconnected visual concept nodes.",
      backDescription:
        "Gemini 1.5 Flash analyzes conceptual hierarchies and structural relationships to generate node-and-edge graphs. Navigate parent theories and sub-topics with zero clutter.",
      actionText: "Open Mind Map Studio",
      actionHref: "/dashboard/study",
    },
    {
      id: "ai-flashcards",
      icon: Layers,
      title: "AI Flashcards",
      frontDescription:
        "Automatic high-yield question & answer extraction with active-recall 3D tactile flip mechanics.",
      backDescription:
        "Turns your course syllabus into spaced-repetition card decks. Test your retention with tactile flip interactions, self-grading, and instant answer keys.",
      actionText: "Practice Flashcards",
      actionHref: "/dashboard/study",
    },
    {
      id: "study-guides",
      icon: BookOpen,
      title: "AI Study Guides & Summaries",
      frontDescription:
        "Organize complex academic material into structured, exam-ready summaries and high-yield cheat sheets.",
      backDescription:
        "Extracts core formulas, key terminology, and high-frequency exam traps. Gemini synthesizes multi-chapter notes into clear 5-minute study digests.",
      actionText: "Synthesize Study Guide",
      actionHref: "/dashboard/study",
    },
    {
      id: "chat-notes",
      icon: MessageSquare,
      title: "Chat With Your Notes",
      frontDescription:
        "Ask questions across your entire syllabus and get precise, context-grounded academic explanations.",
      backDescription:
        "Conversational AI powered by Google Gemini 1.5 Flash. Request intuitive analogies, code walkthroughs, or step-by-step mathematical proofs directly from your notes.",
      actionText: "Start AI Conversation",
      actionHref: "/dashboard/chat",
    },
    {
      id: "doc-intelligence",
      icon: FileText,
      title: "Document Intelligence",
      frontDescription:
        "Multi-tier ingestion, semantic chunking, and knowledge extraction for notes, PDFs, and outlines.",
      backDescription:
        "Ingests text notes, Markdown summaries, and lecture slides. Extracts core semantic units and creates vector representations ready for instant retrieval.",
      actionText: "Manage Course Documents",
      actionHref: "/dashboard/sources",
    },
    {
      id: "citations",
      icon: ShieldCheck,
      title: "Citation-Aware Answers",
      frontDescription:
        "Source-linked answers grounded directly in your syllabus with verified semantic chunk anchors.",
      backDescription:
        "Eliminate hallucinations with transparent citations. Every answer links directly to specific lecture slides, textbook pages, or section headers in your source files.",
      actionText: "Explore Verified Citations",
      actionHref: "/dashboard/chat",
    },
  ];

  return (
    <div className="min-h-screen bg-[#050a18] text-white relative selection:bg-[#8BFF68]/30 selection:text-white overflow-hidden">
      {/* Dark decorative background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-blue-600/8 rounded-full blur-3xl" />
        <div className="absolute top-1/4 -right-32 w-[500px] h-[500px] bg-[#8BFF68]/5 rounded-full blur-3xl" />
        <div className="absolute top-2/3 left-1/3 w-[600px] h-[600px] bg-indigo-600/6 rounded-full blur-3xl" />
        {/* Dot grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "radial-gradient(#8BFF68 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      {/* Sticky Dark Navbar */}
      <header className="sticky top-0 z-50 bg-[#050a18]/90 backdrop-blur-xl border-b border-white/10 transition-all">
        <div className="max-w-7xl mx-auto px-6 py-3.5 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="p-2 bg-[#8BFF68] rounded-xl text-black shadow-[0_0_20px_rgba(139,255,104,0.4)] group-hover:scale-110 transition-transform">
              <Brain className="w-5 h-5" />
            </div>
            <div>
              <span className="text-lg font-black tracking-tight text-white group-hover:text-[#8BFF68] transition-colors">
                MindMap AI
              </span>
              <span className="ml-2 text-[11px] px-2 py-0.5 rounded-full bg-[#8BFF68]/15 text-[#8BFF68] border border-[#8BFF68]/30 font-bold uppercase tracking-wider">
                Edu Edition
              </span>
            </div>
          </Link>

          {/* Nav links */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-400">
            <a href="#features" className="hover:text-[#8BFF68] transition-colors">
              Features
            </a>
            <a href="#preview" className="hover:text-[#8BFF68] transition-colors">
              Studio Preview
            </a>
            <a href="#demo" className="hover:text-[#8BFF68] transition-colors">
              Interactive Demo
            </a>
            <a href="#workflow" className="hover:text-[#8BFF68] transition-colors">
              How It Works
            </a>
            <a href="#upload" className="hover:text-[#8BFF68] transition-colors">
              Ingest Notes
            </a>
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-3">
            {!loading && (
              isAuthenticated ? (
                <Link href="/dashboard">
                  <Button className="bg-[#8BFF68] hover:bg-[#a1ff84] text-black font-black text-xs px-4 py-2 rounded-xl shadow-[0_0_20px_rgba(139,255,104,0.4)]">
                    Dashboard
                    <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                  </Button>
                </Link>
              ) : (
                <>
                  <Link href="/auth/login">
                    <Button
                      variant="ghost"
                      className="text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/10 px-3 py-1.5 rounded-lg"
                    >
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/auth/login">
                    <Button className="bg-[#8BFF68] hover:bg-[#a1ff84] text-black text-xs font-black px-4 py-2 rounded-xl shadow-[0_0_20px_rgba(139,255,104,0.4)]">
                      1-Click Guest Demo
                    </Button>
                  </Link>
                </>
              )
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pt-16 sm:pt-24 pb-12 text-center">
        {/* Hackathon Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#8BFF68]/10 border border-[#8BFF68]/30 rounded-full mb-6 shadow-[0_0_15px_rgba(139,255,104,0.15)]">
          <Sparkles className="w-3.5 h-3.5 text-[#8BFF68]" />
          <span className="text-xs font-bold text-[#8BFF68]">
            Education Hackathon • Powered by Google Gemini 1.5 Flash &amp; Appwrite VectorsDB
          </span>
        </div>

        {/* Static Main Heading */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white tracking-tight leading-[1.05] mb-4">
          The AI Second Brain <br />
          <span className="text-[#8BFF68] drop-shadow-[0_0_40px_rgba(139,255,104,0.5)]">
            For Modern Education
          </span>
        </h1>

        {/* Animated Rotating Typing Text (Now BIG & BOLD) */}
        <div className="mb-6">
          <AnimatedTypingText />
        </div>

        {/* Description */}
        <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto mb-8 leading-relaxed">
          Transform unstructured lecture notes, textbooks, and syllabus outlines into
          interactive visual mind maps, 3D active-recall flashcards, and citation-backed AI conversations.
        </p>

        {/* Hero CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-14">
          <Link href={isAuthenticated ? "/dashboard" : "/auth/login"} className="w-full sm:w-auto">
            <Button
              size="lg"
              className="bg-[#8BFF68] hover:bg-[#a1ff84] text-black text-sm font-black px-8 py-6 rounded-xl shadow-[0_0_30px_rgba(139,255,104,0.5)] transition-all hover:shadow-[0_0_45px_rgba(139,255,104,0.7)] w-full sm:w-auto uppercase tracking-wide"
            >
              Explore Interactive Demo
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
          <Link href="/dashboard/study" className="w-full sm:w-auto">
            <Button
              size="lg"
              variant="outline"
              className="border-white/20 hover:bg-white/10 hover:border-[#8BFF68]/50 text-white text-sm font-semibold px-8 py-6 rounded-xl w-full sm:w-auto"
            >
              <GraduationCap className="w-4 h-4 mr-2 text-[#8BFF68]" />
              Open Study Hub
            </Button>
          </Link>
        </div>

        {/* Floating SaaS Application Preview */}
        <div id="preview">
          <FloatingProductPreview />
        </div>
      </section>

      {/* Feature Cards Showcase (3D Flip Cards) */}
      <section id="features" className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        <div className="text-center max-w-xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#8BFF68]/15 text-[#8BFF68] rounded-full text-xs font-bold mb-3 border border-[#8BFF68]/30">
            <Brain className="w-3.5 h-3.5 text-[#8BFF68]" />
            <span>Interactive Feature Engine</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">
            Designed for <span className="text-[#8BFF68] drop-shadow-[0_0_20px_rgba(139,255,104,0.4)]">Deeper Retention</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-2">
            Hover or tap each card to flip and discover the underlying AI reasoning and study mechanics.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featureCards.map((feat) => (
            <FeatureFlipCard key={feat.id} feature={feat} />
          ))}
        </div>
      </section>

      {/* Drag & Drop Document Ingestion Section */}
      <section id="upload" className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        <DocumentUploadPanel />
      </section>

      {/* 1-Click Interactive Topic Demo */}
      <section id="demo" className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        <InteractiveTopicDemo />
      </section>

      {/* Before & After Learning Transformation */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        <LearningTransformation />
      </section>

      {/* Interactive AI Chat Preview */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        <AIChatPreview />
      </section>

      {/* How It Works (3 Steps) */}
      <section id="workflow" className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        <HowItWorks />
      </section>

      {/* Trust & Academic Privacy Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        <TrustPrivacySection />
      </section>

      {/* Final Call to Action Banner */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 py-16 text-center">
        <div className="bg-gradient-to-r from-[#0e1638] via-[#121c45] to-[#0e1638] border-2 border-[#8BFF68]/50 text-white rounded-3xl p-8 sm:p-14 shadow-[0_0_50px_rgba(139,255,104,0.1)] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#8BFF68]/8 rounded-full blur-3xl pointer-events-none" />
          <div className="max-w-2xl mx-auto space-y-4 relative z-10">
            <h3 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
              Ready to Upgrade Your Academic Workflow?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto leading-relaxed">
              Experience the power of Google Gemini 1.5 Flash and Appwrite VectorsDB in a zero-friction guest demo environment.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
              <Link href="/auth/login" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="bg-[#8BFF68] hover:bg-[#a1ff84] text-black font-black text-sm px-8 py-6 rounded-xl shadow-[0_0_30px_rgba(139,255,104,0.5)] w-full sm:w-auto uppercase tracking-wide"
                >
                  Start 1-Click Guest Demo
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link href="/dashboard/study" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/20 hover:bg-white/10 hover:border-[#8BFF68]/50 text-white text-sm font-semibold px-8 py-6 rounded-xl w-full sm:w-auto"
                >
                  <GraduationCap className="w-4 h-4 mr-2 text-[#8BFF68]" />
                  Explore Study Workspace
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Dark Modern Footer */}
      <footer className="relative z-10 border-t border-white/10 bg-[#030710] py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10 text-xs">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-[#8BFF68] rounded-lg text-black">
                  <Brain className="w-4 h-4" />
                </div>
                <span className="font-black text-sm text-white">MindMap AI</span>
              </div>
              <p className="text-slate-400 leading-relaxed">
                The AI Second Brain for Modern Education. Built for the Google Gemini &amp; Appwrite Education Hackathon.
              </p>
              <div className="text-[11px] text-slate-500">
                Category: <strong className="text-[#8BFF68]">Education</strong>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-white mb-3 uppercase tracking-wider text-[11px]">
                Product Features
              </h4>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <Link href="/dashboard/study" className="hover:text-[#8BFF68] transition-colors">
                    Smart Mind Maps
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard/study" className="hover:text-[#8BFF68] transition-colors">
                    AI Flashcard Decks
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard/study" className="hover:text-[#8BFF68] transition-colors">
                    Exam Study Guides
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard/chat" className="hover:text-[#8BFF68] transition-colors">
                    Citation-Backed Chat
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white mb-3 uppercase tracking-wider text-[11px]">
                Technology Stack
              </h4>
              <ul className="space-y-2 text-slate-400">
                <li>Google Gemini 1.5 Flash</li>
                <li>Gemini text-embedding-004</li>
                <li>Appwrite VectorsDB</li>
                <li>Next.js 15 &amp; React 19</li>
                <li>Tailwind CSS v4</li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white mb-3 uppercase tracking-wider text-[11px]">
                Quick Links
              </h4>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <Link href="/auth/login" className="hover:text-[#8BFF68] transition-colors">
                    1-Click Guest Access
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard/sources" className="hover:text-[#8BFF68] transition-colors">
                    Document Ingestion
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard" className="hover:text-[#8BFF68] transition-colors">
                    Student Workspace
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <p>
              © 2026 MindMap AI — Edu Edition. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <span className="inline-flex items-center gap-1 text-[#8BFF68] font-bold">
                <CheckCircle2 className="w-3.5 h-3.5" /> Hackathon Submission Prototype
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
