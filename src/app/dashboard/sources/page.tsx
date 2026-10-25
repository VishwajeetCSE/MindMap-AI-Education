"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import {
  Plus,
  FileText,
  Link2,
  FileType,
  Search,
  Trash2,
  Loader2,
  Clock,
  Tag,
  Filter,
} from "lucide-react";
import type { SourceDocument } from "@/types";

export default function SourcesPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [documents, setDocuments] = useState<SourceDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<string>("all");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Form state
  const [formTitle, setFormTitle] = useState("");
  const [formType, setFormType] = useState<string>("Note");
  const [formUrl, setFormUrl] = useState("");
  const [formTags, setFormTags] = useState("");
  const [formContent, setFormContent] = useState("");

  const fetchDocuments = useCallback(async () => {
    if (!user) return;
    try {
      const res = await fetch(`/api/documents?userId=${user.$id}`);
      const data = await res.json();
      if (data.documents) {
        setDocuments(data.documents);
      }
    } catch (error) {
      console.error("Failed to fetch documents:", error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchDocuments();
  }, [fetchDocuments]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle || !formContent) {
      toast({
        title: "Missing fields",
        description: "Title and content are required.",
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);
    try {
      const tags = formTags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);

      const res = await fetch("/api/ingest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user?.$id,
          title: formTitle,
          fileType: formType,
          textContent: formContent,
          originalUrl: formUrl || undefined,
          tags,
        }),
      });

      const data = await res.json();
      if (data.success) {
        toast({
          title: "Source added!",
          description: `"${formTitle}" has been indexed successfully.`,
          variant: "success",
        });
        // Reset form
        setFormTitle("");
        setFormType("Note");
        setFormUrl("");
        setFormTags("");
        setFormContent("");
        setDialogOpen(false);
        fetchDocuments();
      } else {
        throw new Error(data.error || "Failed to ingest document");
      }
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Failed to add source";
      toast({ title: "Error", description: message, variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (docId: string) => {
    setDeletingId(docId);
    try {
      const res = await fetch(`/api/documents?docId=${docId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        toast({
          title: "Source deleted",
          description: "The document and its embeddings have been removed.",
          variant: "default",
        });
        setDocuments((prev) => prev.filter((d) => d.$id !== docId));
      } else {
        throw new Error(data.error || "Failed to delete");
      }
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Failed to delete document";
      toast({ title: "Error", description: message, variant: "destructive" });
    } finally {
      setDeletingId(null);
    }
  };

  const parseTags = (tags: string[] | string | undefined): string[] => {
    if (!tags) return [];
    if (Array.isArray(tags)) return tags;
    if (typeof tags === "string") {
      return tags.split(",").map((t) => t.trim()).filter(Boolean);
    }
    return [];
  };

  const filteredDocs = documents.filter((doc) => {
    const tagsList = parseTags(doc.tags);
    const matchesSearch =
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tagsList.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesType = filterType === "all" || doc.fileType === filterType;
    return matchesSearch && matchesType;
  });

  const typeColors: Record<string, string> = {
    Note: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    Link: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    PDF: "bg-orange-500/10 text-orange-400 border-orange-500/20",
  };

  const typeIcons: Record<string, React.ReactNode> = {
    Note: <FileText className="w-5 h-5 text-blue-400" />,
    Link: <Link2 className="w-5 h-5 text-emerald-400" />,
    PDF: <FileType className="w-5 h-5 text-orange-400" />,
  };

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-zinc-100">Knowledge Base</h1>
          <p className="text-zinc-400 mt-1">
            {documents.length} source{documents.length !== 1 ? "s" : ""} indexed
          </p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-indigo-600 hover:bg-indigo-500 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Add Source
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-zinc-900 border-zinc-800 sm:max-w-lg">
            <DialogHeader>
              <DialogTitle className="text-zinc-100">Add New Source</DialogTitle>
              <DialogDescription className="text-zinc-400">
                Paste your content below. MindMap AI will automatically chunk and index it.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-zinc-300">Title</Label>
                <Input
                  id="title"
                  placeholder="e.g., Research Paper on Neural Networks"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  disabled={submitting}
                  className="bg-zinc-800 border-zinc-700 text-zinc-100"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-zinc-300">Type</Label>
                  <Select value={formType} onValueChange={setFormType} disabled={submitting}>
                    <SelectTrigger className="bg-zinc-800 border-zinc-700 text-zinc-100">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-900 border-zinc-800">
                      <SelectItem value="Note">📝 Note</SelectItem>
                      <SelectItem value="Link">🔗 Link</SelectItem>
                      <SelectItem value="PDF">📄 PDF</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tags" className="text-zinc-300">Tags (comma-separated)</Label>
                  <Input
                    id="tags"
                    placeholder="ai, research, ml"
                    value={formTags}
                    onChange={(e) => setFormTags(e.target.value)}
                    disabled={submitting}
                    className="bg-zinc-800 border-zinc-700 text-zinc-100"
                  />
                </div>
              </div>
              {formType === "Link" && (
                <div className="space-y-2">
                  <Label htmlFor="url" className="text-zinc-300">URL</Label>
                  <Input
                    id="url"
                    type="url"
                    placeholder="https://example.com/article"
                    value={formUrl}
                    onChange={(e) => setFormUrl(e.target.value)}
                    disabled={submitting}
                    className="bg-zinc-800 border-zinc-700 text-zinc-100"
                  />
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="content" className="text-zinc-300">Content</Label>
                <Textarea
                  id="content"
                  placeholder="Paste your text content here..."
                  value={formContent}
                  onChange={(e) => setFormContent(e.target.value)}
                  disabled={submitting}
                  className="bg-zinc-800 border-zinc-700 text-zinc-100 min-h-[200px] resize-none"
                />
                <p className="text-xs text-zinc-500">
                  {formContent.length} characters • ~{Math.ceil(formContent.length / 500)} chunks
                </p>
              </div>
              <DialogFooter className="gap-2">
                <DialogClose asChild>
                  <Button variant="outline" className="border-zinc-700 text-zinc-300 hover:bg-zinc-800" disabled={submitting}>
                    Cancel
                  </Button>
                </DialogClose>
                <Button
                  type="submit"
                  className="bg-indigo-600 hover:bg-indigo-500 text-white"
                  disabled={submitting}
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Indexing...
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4 mr-2" />
                      Add Source
                    </>
                  )}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <Input
            placeholder="Search sources by title or tag..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-zinc-900 border-zinc-800 text-zinc-100"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-zinc-500" />
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-32 bg-zinc-900 border-zinc-800 text-zinc-100">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-zinc-900 border-zinc-800">
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="Note">Notes</SelectItem>
              <SelectItem value="Link">Links</SelectItem>
              <SelectItem value="PDF">PDFs</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Sources Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i} className="bg-zinc-900 border-zinc-800">
              <CardContent className="p-6 space-y-3 animate-pulse">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-zinc-800 rounded-xl" />
                  <div className="flex-1 h-5 bg-zinc-800 rounded" />
                </div>
                <div className="h-3 bg-zinc-800 rounded w-2/3" />
                <div className="flex gap-2">
                  <div className="h-5 w-12 bg-zinc-800 rounded-full" />
                  <div className="h-5 w-16 bg-zinc-800 rounded-full" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : filteredDocs.length === 0 ? (
        <div className="text-center py-20">
          <FileText className="w-16 h-16 text-zinc-700 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-zinc-400 mb-2">
            {documents.length === 0
              ? "Your knowledge base is empty"
              : "No matching sources"}
          </h3>
          <p className="text-sm text-zinc-500 mb-6 max-w-md mx-auto">
            {documents.length === 0
              ? "Add your first research paper, note, or web article to start building your AI-powered knowledge graph."
              : "Try adjusting your search or filter criteria."}
          </p>
          {documents.length === 0 && (
            <Button
              className="bg-indigo-600 hover:bg-indigo-500 text-white"
              onClick={() => setDialogOpen(true)}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Source
            </Button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredDocs.map((doc) => (
            <Card
              key={doc.$id}
              className="bg-zinc-900 border-zinc-800 hover:border-zinc-700 transition-all duration-200 group"
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="p-2 bg-zinc-800 rounded-xl flex-shrink-0">
                      {typeIcons[doc.fileType] || <FileText className="w-5 h-5 text-zinc-400" />}
                    </div>
                    <h3 className="font-medium text-zinc-200 truncate">{doc.title}</h3>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="opacity-0 group-hover:opacity-100 transition-opacity text-zinc-500 hover:text-red-400 hover:bg-red-500/10 flex-shrink-0"
                    onClick={() => handleDelete(doc.$id)}
                    disabled={deletingId === doc.$id}
                  >
                    {deletingId === doc.$id ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Trash2 className="w-4 h-4" />
                    )}
                  </Button>
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <Badge
                    variant="outline"
                    className={typeColors[doc.fileType] || ""}
                  >
                    {doc.fileType}
                  </Badge>
                  <div className="flex items-center gap-1 text-xs text-zinc-500">
                    <Clock className="w-3 h-3" />
                    {new Date(doc.createdAt).toLocaleDateString()}
                  </div>
                </div>

                {parseTags(doc.tags).length > 0 && (
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <Tag className="w-3 h-3 text-zinc-600" />
                    {parseTags(doc.tags).map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="bg-zinc-800 text-zinc-400 text-xs hover:bg-zinc-700"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}

                {doc.originalUrl && (
                  <a
                    href={doc.originalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 mt-3 text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
                  >
                    <Link2 className="w-3 h-3" />
                    View original
                  </a>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
