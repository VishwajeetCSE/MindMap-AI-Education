"use client";

import React from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Brain,
  Sparkles,
  FileText,
  MessageSquare,
  BookOpen,
  ArrowRight,
  Zap,
  Search,
  Shield,
} from "lucide-react";

export default function LandingPage() {
  const { isAuthenticated, loading } = useAuth();

  const features = [
    {
      icon: FileText,
      title: "Smart Ingestion",
      description:
        "Paste notes, research papers, or web articles. MindMap AI automatically chunks, processes, and indexes your content into a searchable knowledge graph.",
    },
    {
      icon: MessageSquare,
      title: "AI Chat Companion",
      description:
        "Ask complex, semantic questions across your entire knowledge base. Get instant answers with context pulled from multiple documents.",
    },
    {
      icon: BookOpen,
      title: "Source Citations",
      description:
        "Every AI response comes with exact source citations. Trace answers back to the original document, paragraph, and context chunk.",
    },
    {
      icon: Search,
      title: "Vector Search",
      description:
        "Powered by Appwrite VectorsDB, find semantically similar content even when keywords don't match. Discover hidden connections across documents.",
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description:
        "Document-level permissions ensure your knowledge base stays private. Only you can access your data with Appwrite's built-in auth system.",
    },
    {
      icon: Zap,
      title: "Blazing Fast",
      description:
        "Built on Appwrite's modern data engine for instant retrieval. Native vector search returns results in milliseconds, not seconds.",
    },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 relative overflow-hidden">
      {/* Background effects */}
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
            <span className="text-xl font-bold text-zinc-100">MindMap AI</span>
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
                  <Link href="/auth/register">
                    <Button className="bg-indigo-600 hover:bg-indigo-500 text-white">
                      Get Started
                    </Button>
                  </Link>
                </>
              )
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-20 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full mb-8">
          <Sparkles className="w-4 h-4 text-indigo-400" />
          <span className="text-sm text-indigo-300">Powered by Appwrite Databases</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
          <span className="gradient-text">Your AI-Powered</span>
          <br />
          <span className="text-zinc-100">Second Brain</span>
        </h1>

        <p className="text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          Stop drowning in open tabs, scattered notes, and forgotten bookmarks.
          MindMap AI ingests your research and transforms it into a living,
          conversational knowledge base.
        </p>

        <div className="flex items-center justify-center gap-4 mb-16">
          <Link href={isAuthenticated ? "/dashboard" : "/auth/register"}>
            <Button
              size="lg"
              className="bg-indigo-600 hover:bg-indigo-500 text-white text-lg px-8 py-6 rounded-xl shadow-lg shadow-indigo-500/20 transition-all hover:shadow-indigo-500/40"
            >
              Get Started Free
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
          <Link href="#features">
            <Button
              size="lg"
              variant="outline"
              className="text-zinc-300 border-zinc-700 hover:bg-zinc-800 text-lg px-8 py-6 rounded-xl"
            >
              Learn More
            </Button>
          </Link>
        </div>

        {/* Mock dashboard preview */}
        <div className="relative max-w-4xl mx-auto">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-2xl">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-red-500/60" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
              <div className="w-3 h-3 rounded-full bg-green-500/60" />
              <div className="flex-1 mx-4 h-6 bg-zinc-800 rounded-lg" />
            </div>
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="h-20 bg-zinc-800/60 rounded-xl flex items-center justify-center">
                <div className="text-center">
                  <p className="text-2xl font-bold text-indigo-400">24</p>
                  <p className="text-xs text-zinc-500">Sources</p>
                </div>
              </div>
              <div className="h-20 bg-zinc-800/60 rounded-xl flex items-center justify-center">
                <div className="text-center">
                  <p className="text-2xl font-bold text-purple-400">156</p>
                  <p className="text-xs text-zinc-500">Chunks</p>
                </div>
              </div>
              <div className="h-20 bg-zinc-800/60 rounded-xl flex items-center justify-center">
                <div className="text-center">
                  <p className="text-2xl font-bold text-emerald-400">42</p>
                  <p className="text-xs text-zinc-500">Queries</p>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-zinc-800/40 rounded-lg">
                  <div className="w-8 h-8 bg-indigo-500/20 rounded-lg" />
                  <div className="flex-1">
                    <div className="h-3 bg-zinc-700 rounded w-1/3 mb-1" />
                    <div className="h-2 bg-zinc-800 rounded w-2/3" />
                  </div>
                  <div className="h-5 w-12 bg-indigo-500/20 rounded-full" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative z-10 max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-zinc-100 mb-4">
            Everything you need to <span className="text-indigo-400">remember everything</span>
          </h2>
          <p className="text-lg text-zinc-400 max-w-xl mx-auto">
            Built on Appwrite&apos;s DocumentsDB and VectorsDB for blazing-fast
            semantic search and secure knowledge management.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <Card
              key={feature.title}
              className="bg-zinc-900/50 border-zinc-800 hover:border-zinc-700 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/5 group"
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

      {/* CTA Section */}
      <section className="relative z-10 max-w-4xl mx-auto px-6 py-24 text-center">
        <div className="bg-gradient-to-b from-indigo-500/10 to-transparent border border-indigo-500/20 rounded-3xl p-12">
          <Brain className="w-12 h-12 text-indigo-400 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-zinc-100 mb-4">
            Ready to build your second brain?
          </h2>
          <p className="text-zinc-400 mb-8 max-w-lg mx-auto">
            Join researchers and students who are transforming static notes into
            living knowledge graphs.
          </p>
          <Link href={isAuthenticated ? "/dashboard" : "/auth/register"}>
            <Button
              size="lg"
              className="bg-indigo-600 hover:bg-indigo-500 text-white text-lg px-8 py-6 rounded-xl"
            >
              Start for Free
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-zinc-800/50 py-8">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-indigo-400" />
            <span className="text-sm text-zinc-500">MindMap AI</span>
          </div>
          <p className="text-sm text-zinc-600">
            Built for the Appwrite Databases Hackathon 2026
          </p>
        </div>
      </footer>
    </div>
  );
}
