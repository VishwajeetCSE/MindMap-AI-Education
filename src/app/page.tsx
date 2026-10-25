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
import { FloatingDecorElements } from "@/components/landing/FloatingDecorElements";

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
    <div className="min-h-screen bg-[#f3f9f7] text-slate-900 relative selection:bg-emerald-100 selection:text-emerald-900 overflow-x-hidden">
      {/* 3D Hero Background Image Layer */}
      <div
        className="absolute top-0 left-0 right-0 h-[920px] bg-cover bg-center -z-20 pointer-events-none opacity-90"
        style={{ backgroundImage: "url('/hero-bg.jpg')" }}
      />
      {/* Soft gradient wash overlay */}
      <div className="absolute top-0 left-0 right-0 h-[920px] bg-gradient-to-b from-[#eaf6f2]/60 via-[#f3f9f7]/70 to-[#f3f9f7] -z-10 pointer-events-none" />

      {/* Floating 3D CSS Elements (glass spheres, rings, crystals) */}
      <FloatingDecorElements variant="hero" />

      {/* Top Floating Pill-Shaped Navbar (Inspired by Reference Image) */}
      <div className="sticky top-4 z-50 px-4 sm:px-6 max-w-7xl mx-auto">
        <header className="bg-white/85 backdrop-blur-xl border border-slate-200/80 rounded-full shadow-lg shadow-emerald-950/5 px-6 py-3 flex items-center justify-between transition-all">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="p-2 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-xl text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <Brain className="w-5 h-5" />
            </div>
            <div className="flex items-center">
              <span className="text-base sm:text-lg font-black tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors">
                MindMap AI
              </span>
              <span className="ml-2 text-[10px] sm:text-[11px] px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 font-bold uppercase tracking-wider">
                Edu Edition
              </span>
            </div>
          </Link>

          {/* Nav links */}
          <nav className="hidden lg:flex items-center gap-7 text-xs font-semibold text-slate-600">
            <a href="#features" className="hover:text-emerald-600 transition-colors">
              Features
            </a>
            <a href="#preview" className="hover:text-emerald-600 transition-colors">
              Studio Preview
            </a>
            <a href="#demo" className="hover:text-emerald-600 transition-colors">
              Interactive Demo
            </a>
            <a href="#workflow" className="hover:text-emerald-600 transition-colors">
              How It Works
            </a>
            <a href="#upload" className="hover:text-emerald-600 transition-colors">
              Ingest Notes
            </a>
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-3">
            {!loading && (
              isAuthenticated ? (
                <Link href="/dashboard">
                  <Button className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-bold text-xs px-5 py-2.5 rounded-full shadow-md shadow-blue-600/20">
                    Dashboard
                    <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                  </Button>
                </Link>
              ) : (
                <>
                  <Link href="/auth/login">
                    <Button
                      variant="ghost"
                      className="text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 px-3.5 py-1.5 rounded-full"
                    >
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/auth/login">
                    <Button className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-xs font-bold px-5 py-2.5 rounded-full shadow-md shadow-blue-600/25 transition-all hover:shadow-blue-600/40">
                      1-Click Guest Demo
                    </Button>
                  </Link>
                </>
              )
            )}
          </div>
        </header>
      </div>

      {/* Hero Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pt-12 sm:pt-16 pb-12 text-center">
        {/* Hackathon Badge Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/80 backdrop-blur-md border border-blue-200/90 rounded-full mb-6 shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-blue-600" />
          <span className="text-xs font-semibold text-blue-900">
            Education Hackathon • Powered by Google Gemini 1.5 Flash &amp; Appwrite VectorsDB
          </span>
        </div>

        {/* Static Main Heading */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-7xl font-black text-slate-900 tracking-tight leading-[1.08] mb-3">
          The AI Second Brain <br />
          <span className="bg-gradient-to-r from-[#0d9488] via-[#059669] to-[#10b981] bg-clip-text text-transparent">
            For Modern Education
          </span>
        </h1>

        {/* Animated Rotating Typing Text Line */}
        <div className="mb-5">
          <AnimatedTypingText />
        </div>

        {/* Subtitle */}
        <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto mb-8 leading-relaxed font-normal">
          Transform unstructured lecture notes, textbooks, and syllabus outlines into
          interactive visual mind maps, 3D active-recall flashcards, and citation-backed AI conversations.
        </p>

        {/* Hero CTAs matching Reference Image */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-14">
          <Link href={isAuthenticated ? "/dashboard" : "/auth/login"} className="w-full sm:w-auto">
            <Button
              size="lg"
              className="bg-[#059669] hover:bg-[#047857] text-white text-sm font-bold px-8 py-6 rounded-full shadow-lg shadow-emerald-600/25 transition-all hover:shadow-emerald-600/40 w-full sm:w-auto"
            >
              Explore Interactive Demo
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
          <Link href="/dashboard/study" className="w-full sm:w-auto">
            <Button
              size="lg"
              variant="outline"
              className="bg-white/90 hover:bg-white text-slate-700 border-slate-300 text-sm font-semibold px-8 py-6 rounded-full w-full sm:w-auto shadow-sm"
            >
              <GraduationCap className="w-4 h-4 mr-2 text-blue-600" />
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
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-800 rounded-full text-xs font-semibold mb-3 border border-emerald-200">
            <Brain className="w-3.5 h-3.5 text-emerald-600" />
            <span>Interactive Feature Engine</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
            Designed for <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Deeper Retention</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-2">
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
        <div className="bg-gradient-to-r from-emerald-700 via-teal-700 to-blue-700 text-white rounded-3xl p-8 sm:p-14 shadow-2xl relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-4 relative z-10">
            <h3 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
              Ready to Upgrade Your Academic Workflow?
            </h3>
            <p className="text-xs sm:text-sm text-emerald-100 max-w-lg mx-auto leading-relaxed">
              Experience the power of Google Gemini 1.5 Flash and Appwrite VectorsDB in a zero-friction guest demo environment.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
              <Link href="/auth/login" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="bg-white hover:bg-slate-100 text-emerald-800 font-black text-sm px-8 py-6 rounded-full shadow-lg w-full sm:w-auto"
                >
                  Start 1-Click Guest Demo
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link href="/dashboard/study" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/30 hover:bg-white/10 text-white text-sm font-semibold px-8 py-6 rounded-full w-full sm:w-auto"
                >
                  <GraduationCap className="w-4 h-4 mr-2" />
                  Explore Study Workspace
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Modern SaaS Footer */}
      <footer className="relative z-10 border-t border-slate-200/90 bg-white/80 backdrop-blur-md py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10 text-xs">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-emerald-600 rounded-lg text-white">
                  <Brain className="w-4 h-4" />
                </div>
                <span className="font-black text-sm text-slate-900">MindMap AI</span>
              </div>
              <p className="text-slate-600 leading-relaxed">
                The AI Second Brain for Modern Education. Built for the Google Gemini &amp; Appwrite Education Hackathon.
              </p>
              <div className="text-[11px] text-slate-500">
                Category: <strong className="text-emerald-700">Education</strong>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 mb-3 uppercase tracking-wider text-[11px]">
                Product Features
              </h4>
              <ul className="space-y-2 text-slate-600">
                <li>
                  <Link href="/dashboard/study" className="hover:text-emerald-600 transition-colors">
                    Smart Mind Maps
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard/study" className="hover:text-emerald-600 transition-colors">
                    AI Flashcard Decks
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard/study" className="hover:text-emerald-600 transition-colors">
                    Exam Study Guides
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard/chat" className="hover:text-emerald-600 transition-colors">
                    Citation-Backed Chat
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 mb-3 uppercase tracking-wider text-[11px]">
                Technology Stack
              </h4>
              <ul className="space-y-2 text-slate-600">
                <li>Google Gemini 1.5 Flash</li>
                <li>Gemini text-embedding-004</li>
                <li>Appwrite VectorsDB</li>
                <li>Next.js 15 &amp; React 19</li>
                <li>Tailwind CSS v4</li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 mb-3 uppercase tracking-wider text-[11px]">
                Quick Links
              </h4>
              <ul className="space-y-2 text-slate-600">
                <li>
                  <Link href="/auth/login" className="hover:text-emerald-600 transition-colors">
                    1-Click Guest Access
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard/sources" className="hover:text-emerald-600 transition-colors">
                    Document Ingestion
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard" className="hover:text-emerald-600 transition-colors">
                    Student Workspace
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-600">
            <p>
              © 2026 MindMap AI — Edu Edition. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <span className="inline-flex items-center gap-1 text-emerald-600 font-bold">
                <CheckCircle2 className="w-3.5 h-3.5" /> Hackathon Submission Prototype
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
