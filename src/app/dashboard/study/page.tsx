"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import {
  GraduationCap,
  Sparkles,
  BookOpen,
  HelpCircle,
  RotateCw,
  CheckCircle2,
  XCircle,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Layers,
  Lightbulb,
  Shield,
  ShieldCheck,
} from "lucide-react";
import type { SourceDocument, StudyGuide, Flashcard, QuizQuestion } from "@/types";

export default function StudyHubPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [documents, setDocuments] = useState<SourceDocument[]>([]);
  const [selectedDocId, setSelectedDocId] = useState<string>("all");
  const [activeTab, setActiveTab] = useState<string>("guide");
  const [loading, setLoading] = useState(false);

  // Educational content states
  const [studyGuide, setStudyGuide] = useState<StudyGuide | null>(null);
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);

  // Flashcard UI state
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // Quiz UI state
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [submittedQuiz, setSubmittedQuiz] = useState(false);

  const fetchDocuments = useCallback(async () => {
    if (!user) return;
    try {
      const res = await fetch(`/api/documents?userId=${user.$id}`);
      const data = await res.json();
      if (data.documents) {
        setDocuments(data.documents);
      }
    } catch (err) {
      console.error("Failed to load documents", err);
    }
  }, [user]);

  useEffect(() => {
    fetchDocuments();
  }, [fetchDocuments]);

  const handleGenerate = async (mode: "guide" | "flashcards" | "quiz") => {
    if (!user) return;
    setLoading(true);

    try {
      const res = await fetch("/api/study", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.$id,
          sourceDocId: selectedDocId,
          mode,
        }),
      });

      const json = await res.json();
      if (json.success) {
        if (mode === "guide") setStudyGuide(json.data);
        if (mode === "flashcards") {
          setFlashcards(json.data);
          setCurrentCardIndex(0);
          setIsFlipped(false);
        }
        if (mode === "quiz") {
          setQuizQuestions(json.data);
          setSelectedAnswers({});
          setSubmittedQuiz(false);
        }
        toast({
          title: "Gemini Generated!",
          description: `Successfully synthesized ${mode} from your notes.`,
          variant: "success",
        });
      } else {
        throw new Error(json.error || "Generation failed");
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Generation failed";
      toast({ title: "Error", description: msg, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  // Auto-generate active tab on first load if empty
  useEffect(() => {
    if (user && !studyGuide && activeTab === "guide" && !loading) {
      handleGenerate("guide");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const handleSelectAnswer = (qIndex: number, optionIndex: number) => {
    if (submittedQuiz) return;
    setSelectedAnswers((prev) => ({ ...prev, [qIndex]: optionIndex }));
  };

  const calculateScore = () => {
    let score = 0;
    quizQuestions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctIndex) score++;
    });
    return score;
  };

  return (
    <div className="p-6 lg:p-8 max-w-6xl mx-auto space-y-6">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs text-indigo-400 mb-2">
            <GraduationCap className="w-3.5 h-3.5" />
            Education Hub • Powered by Gemini 1.5 Flash
          </div>
          <h1 className="text-2xl font-bold text-zinc-100">AI Study Companion</h1>
          <p className="text-sm text-zinc-400">
            Synthesize lecture notes, generate interactive flashcards, and test exam readiness.
          </p>
        </div>

        {/* Source Filter & Re-generate */}
        <div className="flex items-center gap-3">
          <Select value={selectedDocId} onValueChange={setSelectedDocId}>
            <SelectTrigger className="w-48 bg-zinc-900 border-zinc-800 text-zinc-200">
              <SelectValue placeholder="All Sources" />
            </SelectTrigger>
            <SelectContent className="bg-zinc-900 border-zinc-800">
              <SelectItem value="all">📚 All Course Notes</SelectItem>
              {documents.map((d) => (
                <SelectItem key={d.$id} value={d.$id}>
                  {d.title.slice(0, 24)}...
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button
            onClick={() => handleGenerate(activeTab as "guide" | "flashcards" | "quiz")}
            disabled={loading}
            className="bg-indigo-600 hover:bg-indigo-500 text-white"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Gemini Thinking...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 mr-2" />
                Synthesize
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Quick Cybersecurity Import Suggestion */}
      {documents.length === 0 && (
        <div className="bg-gradient-to-r from-emerald-950/60 via-slate-900 to-indigo-950/40 border border-emerald-500/30 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs shadow-md">
          <div className="flex items-center gap-2.5">
            <Shield className="w-5 h-5 text-emerald-400 shrink-0" />
            <span className="text-slate-300">
              Want to practice flashcards &amp; quizzes on a complete syllabus?
            </span>
          </div>
          <Link href="/dashboard/sources">
            <Button size="sm" className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-sm">
              <ShieldCheck className="w-3.5 h-3.5 mr-1.5" />
              Import Cybersecurity Notes (4 Modules)
            </Button>
          </Link>
        </div>
      )}

      {/* Main Tabs */}
      <Tabs
        value={activeTab}
        onValueChange={(val) => {
          setActiveTab(val);
          if (val === "guide" && !studyGuide) handleGenerate("guide");
          if (val === "flashcards" && flashcards.length === 0) handleGenerate("flashcards");
          if (val === "quiz" && quizQuestions.length === 0) handleGenerate("quiz");
        }}
        className="w-full space-y-6"
      >
        <TabsList className="bg-zinc-900 border border-zinc-800 p-1 rounded-xl">
          <TabsTrigger value="guide" className="gap-2 data-[state=active]:bg-indigo-600 data-[state=active]:text-white">
            <BookOpen className="w-4 h-4" />
            Study Guide
          </TabsTrigger>
          <TabsTrigger value="flashcards" className="gap-2 data-[state=active]:bg-indigo-600 data-[state=active]:text-white">
            <Layers className="w-4 h-4" />
            Revision Flashcards
          </TabsTrigger>
          <TabsTrigger value="quiz" className="gap-2 data-[state=active]:bg-indigo-600 data-[state=active]:text-white">
            <HelpCircle className="w-4 h-4" />
            Quiz Me
          </TabsTrigger>
        </TabsList>

        {/* ─── TAB 1: STUDY GUIDE ────────────────────────────────────────── */}
        <TabsContent value="guide" className="space-y-6">
          {loading && !studyGuide ? (
            <Card className="bg-zinc-900 border-zinc-800 p-12 text-center">
              <Loader2 className="w-8 h-8 text-indigo-400 animate-spin mx-auto mb-4" />
              <p className="text-zinc-400 text-sm">Gemini is synthesizing your course notes into a structured study guide...</p>
            </Card>
          ) : studyGuide ? (
            <div className="space-y-6">
              {/* Executive Summary */}
              <Card className="bg-zinc-900 border-zinc-800">
                <CardHeader>
                  <div className="flex items-center gap-2 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-1">
                    <Sparkles className="w-4 h-4" />
                    Executive Summary
                  </div>
                  <CardTitle className="text-xl text-zinc-100">{studyGuide.title}</CardTitle>
                  <CardDescription className="text-zinc-400 text-base leading-relaxed pt-2">
                    {studyGuide.summary}
                  </CardDescription>
                </CardHeader>
              </Card>

              {/* Key Takeaways */}
              <Card className="bg-zinc-900 border-zinc-800">
                <CardHeader>
                  <CardTitle className="text-lg text-zinc-200 flex items-center gap-2">
                    <Lightbulb className="w-5 h-5 text-amber-400" />
                    Core Takeaways & High-Yield Insights
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2.5">
                  {studyGuide.keyTakeaways.map((takeaway, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 bg-zinc-800/40 rounded-xl border border-zinc-800">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-300 text-xs flex items-center justify-center font-bold">
                        {idx + 1}
                      </span>
                      <p className="text-sm text-zinc-300 leading-relaxed">{takeaway}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Concept Definitions Grid */}
              <div className="grid md:grid-cols-2 gap-4">
                {studyGuide.concepts.map((concept, idx) => (
                  <Card key={idx} className="bg-zinc-900 border-zinc-800 hover:border-zinc-700 transition-colors">
                    <CardHeader className="pb-2">
                      <Badge variant="outline" className="w-fit bg-indigo-500/10 text-indigo-400 border-indigo-500/20 text-xs mb-1">
                        Concept {idx + 1}
                      </Badge>
                      <CardTitle className="text-base text-zinc-200">{concept.term}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-zinc-400 leading-relaxed">{concept.definition}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Exam & Revision Tips */}
              {studyGuide.examTips && studyGuide.examTips.length > 0 && (
                <Card className="bg-gradient-to-r from-indigo-950/30 to-purple-950/20 border-indigo-500/20">
                  <CardHeader>
                    <CardTitle className="text-base text-indigo-300 flex items-center gap-2">
                      <GraduationCap className="w-5 h-5 text-indigo-400" />
                      Exam & Synthesis Tips
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {studyGuide.examTips.map((tip, idx) => (
                      <p key={idx} className="text-sm text-zinc-400 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                        {tip}
                      </p>
                    ))}
                  </CardContent>
                </Card>
              )}
            </div>
          ) : (
            <Card className="bg-zinc-900 border-zinc-800 p-12 text-center">
              <BookOpen className="w-12 h-12 text-zinc-600 mx-auto mb-3" />
              <p className="text-zinc-400 font-medium">No study guide generated yet.</p>
              <p className="text-zinc-500 text-sm mb-4">Click &quot;Synthesize&quot; to have Gemini read your notes.</p>
              <Button onClick={() => handleGenerate("guide")} className="bg-indigo-600 hover:bg-indigo-500 text-white">
                Generate Study Guide
              </Button>
            </Card>
          )}
        </TabsContent>

        {/* ─── TAB 2: FLASHCARDS ────────────────────────────────────────── */}
        <TabsContent value="flashcards" className="space-y-6">
          {flashcards.length > 0 ? (
            <div className="max-w-xl mx-auto space-y-6">
              {/* Progress counter */}
              <div className="flex items-center justify-between text-xs text-zinc-400 px-1">
                <span>
                  Card {currentCardIndex + 1} of {flashcards.length}
                </span>
                <Badge variant="secondary" className="bg-zinc-800 text-zinc-400">
                  {flashcards[currentCardIndex].category || "Active Recall"}
                </Badge>
              </div>

              {/* Interactive Flip Card */}
              <div
                onClick={() => setIsFlipped(!isFlipped)}
                className="cursor-pointer min-h-[260px] bg-zinc-900 border border-zinc-800 hover:border-indigo-500/40 rounded-2xl p-8 flex flex-col justify-between transition-all duration-300 shadow-xl group"
              >
                <div className="flex items-center justify-between text-xs font-semibold tracking-wider text-zinc-500 uppercase">
                  <span>{isFlipped ? "Answer" : "Question"}</span>
                  <span className="flex items-center gap-1 group-hover:text-indigo-400 transition-colors">
                    <RotateCw className="w-3.5 h-3.5" />
                    Click to flip
                  </span>
                </div>

                <div className="py-6 text-center">
                  <p className="text-lg md:text-xl font-medium text-zinc-100 leading-relaxed">
                    {isFlipped ? flashcards[currentCardIndex].answer : flashcards[currentCardIndex].question}
                  </p>
                </div>

                <div className="text-center text-xs text-zinc-500">
                  {isFlipped ? "Flip back to review question" : "Tap anywhere to reveal verified answer"}
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-between gap-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setIsFlipped(false);
                    setCurrentCardIndex((prev) => (prev > 0 ? prev - 1 : flashcards.length - 1));
                  }}
                  className="border-zinc-800 text-zinc-300 hover:bg-zinc-800"
                >
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Previous
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsFlipped(!isFlipped)}
                  className="text-zinc-400 hover:text-zinc-200"
                >
                  <RotateCw className="w-4 h-4 mr-1.5" />
                  Flip Card
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setIsFlipped(false);
                    setCurrentCardIndex((prev) => (prev < flashcards.length - 1 ? prev + 1 : 0));
                  }}
                  className="border-zinc-800 text-zinc-300 hover:bg-zinc-800"
                >
                  Next
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </div>
          ) : (
            <Card className="bg-zinc-900 border-zinc-800 p-12 text-center">
              <Layers className="w-12 h-12 text-zinc-600 mx-auto mb-3" />
              <p className="text-zinc-400 font-medium">No flashcards created yet.</p>
              <p className="text-zinc-500 text-sm mb-4">Gemini can extract key Q&amp;A flashcards from your documents.</p>
              <Button onClick={() => handleGenerate("flashcards")} className="bg-indigo-600 hover:bg-indigo-500 text-white">
                Generate Flashcards
              </Button>
            </Card>
          )}
        </TabsContent>

        {/* ─── TAB 3: QUIZ ME ────────────────────────────────────────────── */}
        <TabsContent value="quiz" className="space-y-6">
          {quizQuestions.length > 0 ? (
            <div className="space-y-6 max-w-2xl mx-auto">
              {quizQuestions.map((q, qIdx) => {
                const isSelected = selectedAnswers[qIdx] !== undefined;
                const isCorrect = selectedAnswers[qIdx] === q.correctIndex;

                return (
                  <Card key={q.id || qIdx} className="bg-zinc-900 border-zinc-800">
                    <CardHeader className="pb-3">
                      <div className="text-xs text-indigo-400 font-semibold mb-1">Question {qIdx + 1}</div>
                      <CardTitle className="text-base text-zinc-200 leading-snug">{q.question}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2.5">
                      {q.options.map((option, optIdx) => {
                        let btnStyle = "border-zinc-800 bg-zinc-800/40 text-zinc-300 hover:bg-zinc-800";
                        if (selectedAnswers[qIdx] === optIdx) {
                          btnStyle = "border-indigo-500 bg-indigo-500/20 text-indigo-200 font-medium";
                        }
                        if (submittedQuiz) {
                          if (optIdx === q.correctIndex) {
                            btnStyle = "border-emerald-500/50 bg-emerald-500/20 text-emerald-200 font-medium";
                          } else if (selectedAnswers[qIdx] === optIdx) {
                            btnStyle = "border-red-500/50 bg-red-500/20 text-red-200";
                          }
                        }

                        return (
                          <button
                            key={optIdx}
                            onClick={() => handleSelectAnswer(qIdx, optIdx)}
                            className={`w-full text-left p-3.5 rounded-xl border text-sm transition-all flex items-center justify-between ${btnStyle}`}
                          >
                            <span>{option}</span>
                            {submittedQuiz && optIdx === q.correctIndex && (
                              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                            )}
                            {submittedQuiz && selectedAnswers[qIdx] === optIdx && optIdx !== q.correctIndex && (
                              <XCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                            )}
                          </button>
                        );
                      })}

                      {/* Explanation Box */}
                      {submittedQuiz && (
                        <div className="mt-3 p-3 rounded-lg bg-zinc-800/60 border border-zinc-700/50 text-xs text-zinc-300 leading-relaxed">
                          <span className="font-semibold text-indigo-300">Explanation: </span>
                          {q.explanation}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}

              {/* Submit & Score */}
              <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  {submittedQuiz ? (
                    <div className="text-sm">
                      <span className="text-zinc-400">Your Score: </span>
                      <span className="font-bold text-indigo-400 text-base">
                        {calculateScore()} / {quizQuestions.length}
                      </span>
                      <span className="text-zinc-500 ml-2">
                        ({Math.round((calculateScore() / quizQuestions.length) * 100)}%)
                      </span>
                    </div>
                  ) : (
                    <p className="text-xs text-zinc-500">
                      Answer all questions to check your knowledge readiness.
                    </p>
                  )}
                </div>

                <div className="flex gap-2">
                  {submittedQuiz ? (
                    <Button
                      onClick={() => handleGenerate("quiz")}
                      className="bg-indigo-600 hover:bg-indigo-500 text-white"
                    >
                      <RotateCw className="w-4 h-4 mr-2" />
                      Generate New Quiz
                    </Button>
                  ) : (
                    <Button
                      onClick={() => setSubmittedQuiz(true)}
                      disabled={Object.keys(selectedAnswers).length === 0}
                      className="bg-indigo-600 hover:bg-indigo-500 text-white"
                    >
                      Check Answers
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <Card className="bg-zinc-900 border-zinc-800 p-12 text-center">
              <HelpCircle className="w-12 h-12 text-zinc-600 mx-auto mb-3" />
              <p className="text-zinc-400 font-medium">No quiz active.</p>
              <p className="text-zinc-500 text-sm mb-4">Gemini will generate a rapid 3-question revision quiz based on your materials.</p>
              <Button onClick={() => handleGenerate("quiz")} className="bg-indigo-600 hover:bg-indigo-500 text-white">
                Start Revision Quiz
              </Button>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
