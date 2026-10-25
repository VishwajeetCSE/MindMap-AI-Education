"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  FileText,
  MessageSquare,
  Database,
  Sparkles,
  Plus,
  ArrowRight,
  Clock,
} from "lucide-react";
import type { SourceDocument } from "@/types";

export default function DashboardPage() {
  const { user } = useAuth();
  const [documents, setDocuments] = useState<SourceDocument[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchDocuments();
    }
  }, [user]);

  const fetchDocuments = async () => {
    try {
      const res = await fetch(`/api/documents?userId=${user?.$id}`);
      const data = await res.json();
      if (data.documents) {
        setDocuments(data.documents);
      }
    } catch (error) {
      console.error("Failed to fetch documents:", error);
    } finally {
      setLoading(false);
    }
  };

  const stats = [
    {
      title: "Total Sources",
      value: documents.length,
      icon: FileText,
      color: "text-indigo-400",
      bg: "bg-indigo-500/10",
    },
    {
      title: "Knowledge Chunks",
      value: documents.length * 4,
      icon: Database,
      color: "text-purple-400",
      bg: "bg-purple-500/10",
    },
    {
      title: "AI Queries Today",
      value: 12,
      icon: Sparkles,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
    },
  ];

  const typeColors: Record<string, string> = {
    Note: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    Link: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    PDF: "bg-orange-500/10 text-orange-400 border-orange-500/20",
  };

  const recentDocs = documents.slice(0, 5);

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-zinc-100">Dashboard</h1>
          <p className="text-zinc-400 mt-1">
            Welcome back, {user?.name || "Researcher"}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/dashboard/sources">
            <Button className="bg-indigo-600 hover:bg-indigo-500 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Add Source
            </Button>
          </Link>
          <Link href="/dashboard/chat">
            <Button variant="outline" className="border-zinc-700 text-zinc-300 hover:bg-zinc-800">
              <MessageSquare className="w-4 h-4 mr-2" />
              Start Chat
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="bg-zinc-900 border-zinc-800 hover:border-zinc-700 transition-colors">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-zinc-400 mb-1">{stat.title}</p>
                  <p className={`text-3xl font-bold ${stat.color}`}>
                    {loading ? (
                      <span className="inline-block w-12 h-8 bg-zinc-800 rounded animate-pulse" />
                    ) : (
                      stat.value
                    )}
                  </p>
                </div>
                <div className={`p-3 rounded-xl ${stat.bg}`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Sources */}
      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg text-zinc-100">Recent Sources</CardTitle>
          <Link href="/dashboard/sources">
            <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-zinc-200">
              View all
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-4 p-4 bg-zinc-800/40 rounded-xl animate-pulse">
                  <div className="w-10 h-10 bg-zinc-800 rounded-xl" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-zinc-800 rounded w-1/3" />
                    <div className="h-3 bg-zinc-800 rounded w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          ) : recentDocs.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="w-12 h-12 text-zinc-700 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-zinc-400 mb-2">No sources yet</h3>
              <p className="text-sm text-zinc-500 mb-6">
                Add your first research paper, note, or web article to get started.
              </p>
              <Link href="/dashboard/sources">
                <Button className="bg-indigo-600 hover:bg-indigo-500 text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Your First Source
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-2">
              {recentDocs.map((doc) => (
                <div
                  key={doc.$id}
                  className="flex items-center gap-4 p-4 bg-zinc-800/30 rounded-xl hover:bg-zinc-800/50 transition-colors"
                >
                  <div className="p-2.5 bg-indigo-500/10 rounded-xl">
                    <FileText className="w-5 h-5 text-indigo-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-zinc-200 truncate">
                      {doc.title}
                    </h4>
                    <div className="flex items-center gap-2 mt-1">
                      <Clock className="w-3 h-3 text-zinc-500" />
                      <span className="text-xs text-zinc-500">
                        {new Date(doc.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <Badge
                    variant="outline"
                    className={typeColors[doc.fileType] || ""}
                  >
                    {doc.fileType}
                  </Badge>
                  {doc.tags && doc.tags.length > 0 && (
                    <div className="hidden md:flex items-center gap-1">
                      {doc.tags.slice(0, 2).map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="bg-zinc-800 text-zinc-400 text-xs"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
