"use client";

import React, { useEffect, useState, useCallback } from "react";
import Link from "next/link";
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
  Sparkles,
  Shield,
  ShieldCheck,
  ArrowRight,
  Lock,
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
  const [loadingSamples, setLoadingSamples] = useState(false);
  const [loadingCyber, setLoadingCyber] = useState(false);

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

  const handleImportCybersecurity = async () => {
    if (!user) return;
    setLoadingCyber(true);
    try {
      const cyberModules = [
        {
          userId: user.$id,
          title: "CS 480: Zero Trust Architecture & Defense-in-Depth",
          fileType: "Note",
          tags: ["cybersecurity", "zerotrust", "defense-in-depth", "nist"],
          textContent: "The Foundation of Information Security rests upon the CIA Triad: Confidentiality via AES-256 and RBAC, Integrity via SHA-256 and HMAC digital signatures, and Availability protected against DDoS using rate-limiting, CDNs, and failover clustering. Non-repudiation combines asymmetric public key cryptography with trusted Certificate Authorities. Defense-in-Depth (DiD) deploys layered controls so that if perimeter firewalls fail, internal micro-segmentation and IDS/IPS prevent lateral movement. Zero Trust Architecture (NIST SP 800-207) eliminates implicit trust under the principle 'Never Trust, Always Verify'. Key tenets include continuous authentication of device posture and session risk, Principle of Least Privilege (PoLP) with Just-In-Time access, and micro-perimeters assuming the network is already breached.",
        },
        {
          userId: user.$id,
          title: "CS 480: Applied Cryptography, PKI & TLS 1.3 Handshake",
          fileType: "PDF",
          tags: ["cryptography", "tls1.3", "aes256", "pki", "ecc"],
          textContent: "Symmetric encryption uses AES-256-GCM for Authenticated Encryption with Associated Data (AEAD) and ChaCha20-Poly1305 for stream ciphers. Asymmetric cryptography utilizes RSA (2048-4096 bit prime factorization) and Elliptic Curve Cryptography (ECC Ed25519, secp256r1) which provides 128-bit security with only 256-bit keys. Diffie-Hellman Key Exchange (ECDHE) enables Ephemeral Perfect Forward Secrecy (PFS), guaranteeing that past recorded sessions cannot be decrypted even if private keys are compromised later. The TLS 1.3 protocol (RFC 8446) eliminates legacy ciphers (MD5, SHA-1, RC4, static RSA), introduces a 1-RTT zero-overhead handshake with pre-sent key shares, and encrypts server certificates to prevent eavesdropping.",
        },
        {
          userId: user.$id,
          title: "CS 480: Web Application Security & OWASP Top 10 Exploits",
          fileType: "Note",
          tags: ["owasp", "sqli", "xss", "csrf", "ssrf", "security"],
          textContent: "SQL Injection (SQLi) occurs when untrusted input is concatenated into SQL queries; prevented strictly by Parameterized Queries (Prepared Statements) and ORMs with database least privilege. Cross-Site Scripting (XSS) executes malicious JavaScript in victim browsers: Stored XSS resides in database records, Reflected XSS reflects off query parameters, and DOM XSS occurs client-side in unsafe sinks like innerHTML; mitigated by context-aware output encoding and Content Security Policy (CSP default-src 'self'). Cross-Site Request Forgery (CSRF) tricks authenticated users into sending state-changing requests; mitigated with Anti-CSRF Synchronizer Tokens and SameSite=Strict cookies. Server-Side Request Forgery (SSRF) coerces servers to access internal cloud metadata (169.254.169.254); mitigated by egress firewalls and strict URL whitelisting. Broken Object Level Authorization (BOLA/IDOR) requires server-side ownership checks on every object ID lookup.",
        },
        {
          userId: user.$id,
          title: "CS 480: Threat Intelligence, Malware & Incident Response (DFIR)",
          fileType: "Note",
          tags: ["mitre", "malware", "dfir", "siem", "ransomware"],
          textContent: "The MITRE ATT&CK Framework categorizes adversary tactics and techniques across Initial Access, Execution, Persistence, Privilege Escalation, Defense Evasion, Credential Access (Mimikatz LSASS dumps), Lateral Movement (Pass-the-Hash), and Exfiltration. Malware categories include Ransomware (hybrid asymmetric-symmetric payload encryption), Rootkits (ring-0 kernel hooks hiding malicious processes), and Buffer Overflows overwriting instruction pointers (EIP/RIP); modern OS defenses include ASLR, DEP/NX, and Stack Canaries. NIST SP 800-61 Rev. 2 defines Incident Handling across Preparation, Detection & Analysis (SIEM log analysis, IOC file hashes), Containment (host isolation, token revocation), Eradication, and Recovery from immutable offline backups. In Digital Forensics (DFIR), Order of Volatility is: Registers/Cache > RAM Memory > Swap space > Hard Drives > Network logs, guarded under strict chain of custody.",
        },
      ];

      for (const mod of cyberModules) {
        await fetch("/api/ingest", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(mod),
        });
      }

      toast({
        title: "🛡️ Cybersecurity Masterclass Imported!",
        description: "4 in-depth modules indexed with vector embeddings! Head over to AI Chat or Study Hub to start your session.",
        variant: "success",
      });

      fetchDocuments();
    } catch {
      toast({ title: "Failed to load cybersecurity notes", variant: "destructive" });
    } finally {
      setLoadingCyber(false);
    }
  };

  const handleLoadSampleNotes = async () => {
    if (!user) return;
    setLoadingSamples(true);
    try {
      const sample1 = {
        userId: user.$id,
        title: "CS 401: Quantum Computing Foundations",
        fileType: "Note",
        tags: ["quantum", "physics", "superposition"],
        textContent: "Quantum computing leverages superposition, entanglement, and interference to perform calculations intractable for classical computers. Qubits represent linear combinations of orthogonal basis states |0> and |1>. When multiple qubits become entangled, the state vector of the system cannot be factored into individual single-qubit states. In 2024, experiments with topological Majorana zero modes demonstrated a 42% reduction in environmental decoherence. Quantum key distribution protocols such as BB84 utilize quantum no-cloning theorem to guarantee eavesdropping detection.",
      };

      const sample2 = {
        userId: user.$id,
        title: "CS 502: Advanced Deep Learning & Attention",
        fileType: "PDF",
        tags: ["ai", "transformers", "deep-learning"],
        textContent: "The Transformer neural architecture replaces recurrent networks with scaled dot-product attention across multiple representation heads. Key improvements include FlashAttention-3, which reorganizes GPU SRAM tiling and enables asynchronous matrix multiply-accumulate on NVIDIA Hopper Tensor Cores, yielding a 1.8x speedup. Rotary Position Embeddings (RoPE) inject relative position information without requiring absolute learned positional tables, unlocking context windows beyond 128k tokens. Mixture of Experts (MoE) dynamically activates sparse sub-networks per token.",
      };

      await fetch("/api/ingest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sample1),
      });

      await fetch("/api/ingest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sample2),
      });

      toast({
        title: "Sample Course Notes Loaded! 📚",
        description: "2 academic modules were indexed. Head over to Study Hub or AI Chat to test them!",
        variant: "success",
      });

      fetchDocuments();
    } catch {
      toast({ title: "Failed to load sample notes", variant: "destructive" });
    } finally {
      setLoadingSamples(false);
    }
  };

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
          <h1 className="text-2xl font-bold text-zinc-100">Course Notes &amp; Syllabus</h1>
          <p className="text-zinc-400 mt-1">
            {documents.length} module{documents.length !== 1 ? "s" : ""} indexed in semantic memory
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Button
            onClick={handleImportCybersecurity}
            disabled={loadingCyber}
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold shadow-md shadow-emerald-900/30"
          >
            {loadingCyber ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Importing Cybersecurity...
              </>
            ) : (
              <>
                <ShieldCheck className="w-4 h-4 mr-2" />
                Import Cybersecurity Notes
              </>
            )}
          </Button>

          <Button
            variant="outline"
            onClick={handleLoadSampleNotes}
            disabled={loadingSamples}
            className="border-indigo-500/30 bg-indigo-500/10 text-indigo-300 hover:bg-indigo-500/20"
          >
            {loadingSamples ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Indexing Samples...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 mr-2 text-indigo-400" />
                Load General Samples
              </>
            )}
          </Button>

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
      </div>

      {/* Featured Deep Cybersecurity Curriculum Card */}
      <div className="bg-gradient-to-r from-emerald-950/70 via-slate-900 to-indigo-950/60 border border-emerald-500/30 rounded-2xl p-6 shadow-xl relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-emerald-500/15 text-emerald-400 rounded-2xl border border-emerald-500/30 shrink-0 mt-0.5 shadow-sm">
            <Shield className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 text-[10px] font-bold uppercase tracking-wider">
                Full Curriculum Available
              </Badge>
              <span className="text-xs text-slate-400">CS 480 • 4 In-Depth Academic Modules</span>
            </div>
            <h3 className="text-lg font-bold text-white">
              Advanced Cybersecurity &amp; Threat Intelligence Masterclass
            </h3>
            <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
              University-grade notes on Zero Trust Architecture, Applied Cryptography (AES-256-GCM, TLS 1.3 1-RTT Handshake), OWASP Top 10 Web Exploits (SQLi, Stored/Reflected XSS, CSRF, SSRF), and MITRE ATT&amp;CK DFIR.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-2.5 shrink-0 w-full md:w-auto">
          <Button
            onClick={handleImportCybersecurity}
            disabled={loadingCyber}
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-5 py-3 rounded-xl shadow-lg shadow-emerald-900/30 w-full sm:w-auto"
          >
            {loadingCyber ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Indexing 4 Modules...
              </>
            ) : (
              <>
                <ShieldCheck className="w-4 h-4 mr-2" />
                1-Click Import Cybersecurity
              </>
            )}
          </Button>

          <Link href="/dashboard/chat" className="w-full sm:w-auto">
            <Button
              variant="outline"
              className="border-emerald-500/30 bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20 text-xs font-semibold px-4 py-3 rounded-xl w-full"
            >
              Start Chat Session
              <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
            </Button>
          </Link>
        </div>
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
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button
                variant="outline"
                onClick={handleLoadSampleNotes}
                disabled={loadingSamples}
                className="border-indigo-500/30 bg-indigo-500/10 text-indigo-300 hover:bg-indigo-500/20"
              >
                {loadingSamples ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Loading Modules...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2 text-indigo-400" />
                    Load Sample Course Notes
                  </>
                )}
              </Button>
              <Button
                className="bg-indigo-600 hover:bg-indigo-500 text-white"
                onClick={() => setDialogOpen(true)}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Custom Note
              </Button>
            </div>
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
