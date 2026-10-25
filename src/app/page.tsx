"use client";

import React from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Brain,
  Sparkles,
  FileText,
  MessageSquare,
  BookOpen,
  ArrowRight,
  GraduationCap,
  Layers,
  HelpCircle,
  Search,
  Shield,
  Zap,
} from "lucide-react";

export default function LandingPage() {
  const { isAuthenticated, loading } = useAuth();

  const features = [
    {
      icon: GraduationCap,
      title: "Interactive Study Guides",
      description:
        "Gemini 1.5 Flash analyzes complex lecture slides and textbooks to synthesize high-yield study guides, concept definitions, and exam prep tips.",
    },
    {
      icon: Layers,
      title: "AI Flashcard Generator",
      description:
        "Automatically extract high-yield revision flashcards with interactive active-recall flip mechanics directly from your uploaded course notes.",
    },
    {
      icon: HelpCircle,
      title: "'Quiz Me' Knowledge Check",
      description:
        "Generate multi-choice practice tests tailored to your syllabus with instant pedagogical feedback and answer explanations.",
    },
    {
      icon: MessageSquare,
      title: "Citation-Backed AI Chat",
      description:
        "Ask complex questions across your entire syllabus. Gemini retrieves context from Appwrite VectorsDB and references exact sources.",
    },
    {
      icon: Search,
      title: "Semantic Vector Search",
      description:
        "Powered by Gemini text-embedding-004 and Appwrite, discover cross-topic insights and related concepts across entirely different course modules.",
    },
    {
      icon: Shield,
      title: "Private & Frictionless",
      description:
        "Your academic notes stay secure and private. Experience the full platform instantly with our 1-click Guest Demo mode.",
    },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl glow-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl glow-pulse" style={{ animationDelay: "1.5s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-3xl" />
      </div>

      {/* Navigation */}
      <nav className="relative z-10 border-b border-zinc-800/50 bg-zinc-950/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-500/10 rounded-xl">
              <Brain className="w-6 h-6 text-indigo-400" />
            </div>
            <div>
              <span className="text-xl font-bold text-zinc-100">MindMap AI</span>
              <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-medium">
                Edu Edition
              </span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {!loading && (
              isAuthenticated ? (
                <Link href="/dashboard">
                  <Button className="bg-indigo-600 hover:bg-indigo-500 text-white">
                    Dashboard
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              ) : (
                <>
                  <Link href="/auth/login">
                    <Button variant="ghost" className="text-zinc-400 hover:text-zinc-100">
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/auth/login">
                    <Button className="bg-indigo-600 hover:bg-indigo-500 text-white">
                      Guest Demo
                    </Button>
                  </Link>
                </>
              )
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-16 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full mb-8">
          <Sparkles className="w-4 h-4 text-indigo-400" />
          <span className="text-sm text-indigo-300">
            Education Hackathon • Powered by Google Gemini API &amp; Appwrite
          </span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
          <span className="gradient-text">The AI Second Brain</span>
          <br />
          <span className="text-zinc-100">For Modern Education</span>
        </h1>

        <p className="text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          Transform unstructured lecture notes, textbooks, and research papers into
          interactive study guides, active-recall flashcards, and citation-backed AI conversations.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Link href={isAuthenticated ? "/dashboard" : "/auth/login"}>
            <Button
              size="lg"
              className="bg-indigo-600 hover:bg-indigo-500 text-white text-base px-8 py-6 rounded-xl shadow-lg shadow-indigo-500/20 transition-all hover:shadow-indigo-500/40 w-full sm:w-auto"
            >
              Explore 1-Click Demo
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
          <Link href="/dashboard/study">
            <Button
              size="lg"
              variant="outline"
              className="text-zinc-300 border-zinc-700 hover:bg-zinc-800 text-base px-8 py-6 rounded-xl w-full sm:w-auto"
            >
              <GraduationCap className="w-5 h-5 mr-2 text-indigo-400" />
              Open Study Hub
            </Button>
          </Link>
        </div>

        {/* Dashboard preview showcase */}
        <div className="relative max-w-4xl mx-auto">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-2xl text-left">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-zinc-800">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/60" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                <div className="w-3 h-3 rounded-full bg-green-500/60" />
                <span className="text-xs text-zinc-500 ml-2">Study Hub • Interactive Student Workspace</span>
              </div>
              <Badge variant="outline" className="text-xs border-indigo-500/30 text-indigo-400">
                Gemini 1.5 Flash
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="p-4 bg-zinc-800/40 rounded-xl border border-zinc-800">
                <p className="text-xs text-zinc-500 uppercase font-semibold mb-1">Study Guide</p>
                <p className="text-sm font-medium text-zinc-200">Quantum Computing &amp; ML Transformers</p>
                <p className="text-xs text-emerald-400 mt-2">✓ Synthesized with citations</p>
              </div>
              <div className="p-4 bg-zinc-800/40 rounded-xl border border-zinc-800">
                <p className="text-xs text-zinc-500 uppercase font-semibold mb-1">Active Recall</p>
                <p className="text-sm font-medium text-zinc-200">6 High-Yield Flashcards</p>
                <p className="text-xs text-indigo-400 mt-2">✓ 3D Flip revision mode</p>
              </div>
              <div className="p-4 bg-zinc-800/40 rounded-xl border border-zinc-800">
                <p className="text-xs text-zinc-500 uppercase font-semibold mb-1">Exam Readiness</p>
                <p className="text-sm font-medium text-zinc-200">Knowledge Check Quiz</p>
                <p className="text-xs text-purple-400 mt-2">✓ Instant scoring &amp; explanations</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-zinc-100 mb-4">
            Built for the <span className="text-indigo-400">Future of Learning</span>
          </h2>
          <p className="text-base text-zinc-400 max-w-xl mx-auto">
            Combining Google Gemini&apos;s multimodal reasoning with Appwrite&apos;s vector database engine.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <Card
              key={feature.title}
              className="bg-zinc-900/50 border-zinc-800 hover:border-zinc-700 transition-all duration-300 group"
            >
              <CardContent className="p-6">
                <div className="p-3 bg-indigo-500/10 rounded-xl w-fit mb-4 group-hover:bg-indigo-500/20 transition-colors">
                  <feature.icon className="w-6 h-6 text-indigo-400" />
                </div>
                <h3 className="text-lg font-semibold text-zinc-100 mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-zinc-800/50 py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-indigo-400" />
            <span className="text-sm text-zinc-400 font-semibold">MindMap AI Education</span>
          </div>
          <p className="text-xs text-zinc-500">
            Hack Day Project • Category: Education • Powered by Google Gemini &amp; Appwrite
          </p>
        </div>
      </footer>
    </div>
  );
}
