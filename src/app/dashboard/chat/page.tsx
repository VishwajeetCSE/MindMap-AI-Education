"use client";

import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/components/ui/use-toast";
import {
  Brain,
  Send,
  Sparkles,
  User,
  FileText,
  Loader2,
  Trash2,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { ChatMessage } from "@/types";

export default function ChatPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Storage key based on user
  const storageKey = `mindmap_chat_${user?.$id || "guest"}`;

  // 1. Load conversation from localStorage on mount / user change
  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setMessages(parsed);
        }
      }
    } catch (e) {
      console.warn("Could not load chat history from localStorage", e);
    }
  }, [storageKey]);

  // 2. Persist conversation to localStorage
  useEffect(() => {
    if (messages.length > 0) {
      try {
        localStorage.setItem(storageKey, JSON.stringify(messages));
      } catch (e) {
        console.warn("Could not save chat history to localStorage", e);
      }
    }
  }, [messages, storageKey]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleClearChat = () => {
    try {
      localStorage.removeItem(storageKey);
    } catch {}
    setMessages([]);
    toast({ title: "Chat Cleared", description: "Conversation history has been reset.", variant: "default" });
  };

  const handleSend = async (overrideQuery?: string) => {
    const query = (overrideQuery || input).trim();
    if (!query || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: query,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userQuery: query,
          userId: user?.$id,
        }),
      });

      const data = await res.json();

      if (data.answer) {
        const assistantMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: data.answer,
          sources: data.sources || [],
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, assistantMessage]);
      } else {
        throw new Error(data.error || "No response from AI");
      }
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Failed to get AI response";
      toast({ title: "Chat Error", description: message, variant: "destructive" });

      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "I encountered a network issue processing your request. Please try asking again.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    const textarea = e.target;
    textarea.style.height = "auto";
    textarea.style.height = Math.min(textarea.scrollHeight, 160) + "px";
  };

  const getUniqueSources = (sources: string[]) => {
    return [...new Set(sources)];
  };

  return (
    <div className="relative flex flex-col h-[calc(100vh-64px)] lg:h-screen bg-zinc-950 overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-1/4 w-80 h-80 bg-indigo-500/5 rounded-full blur-3xl glow-pulse" />
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl glow-pulse" style={{ animationDelay: "1.8s" }} />
      </div>

      {/* Chat Header */}
      <div className="relative z-10 border-b border-zinc-800/80 bg-zinc-900/60 backdrop-blur-xl px-6 py-3.5 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-500/10 border border-indigo-500/20 rounded-xl">
            <Sparkles className="w-5 h-5 text-indigo-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-semibold text-zinc-100">AI Study Tutor</h1>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">
                Gemini 1.5 Flash
              </span>
            </div>
            <p className="text-xs text-zinc-500">
              Conversational study companion with persistent session memory
            </p>
          </div>
        </div>

        {messages.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClearChat}
            className="text-zinc-500 hover:text-red-400 hover:bg-red-500/10 text-xs gap-1.5"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Clear Chat
          </Button>
        )}
      </div>

      {/* Messages Area */}
      <ScrollArea className="relative z-10 flex-1">
        <div className="max-w-3xl mx-auto px-4 py-6">
          {messages.length === 0 ? (
            /* Welcome screen */
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
              <div className="p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl mb-5 shadow-lg shadow-indigo-500/5 animate-pulse">
                <Brain className="w-12 h-12 text-indigo-400" />
              </div>
              <h2 className="text-2xl font-bold text-zinc-100 mb-2">
                What would you like to learn today?
              </h2>
              <p className="text-zinc-400 text-sm max-w-md mb-8 leading-relaxed">
                I can explain concepts, synthesize notes, or answer questions directly from your uploaded course materials with source citations.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 w-full max-w-lg">
                {[
                  "Hi! How can you help me study?",
                  "Explain quantum superposition simply",
                  "How does self-attention work in Transformers?",
                  "What are key concepts in my course notes?",
                ].map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => handleSend(suggestion)}
                    className="px-4 py-3 bg-zinc-900/80 border border-zinc-800 rounded-xl text-xs text-zinc-300 hover:text-white hover:border-indigo-500/40 hover:bg-zinc-800/60 transition-all text-left flex items-center justify-between group"
                  >
                    <span>{suggestion}</span>
                    <Zap className="w-3.5 h-3.5 text-zinc-600 group-hover:text-indigo-400 transition-colors flex-shrink-0 ml-2" />
                  </button>
                ))}
              </div>
            </div>
          ) : (
            /* Messages list */
            <div className="space-y-6">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex gap-3",
                    message.role === "user" ? "justify-end" : "justify-start"
                  )}
                >
                  {message.role === "assistant" && (
                    <div className="flex-shrink-0 mt-1">
                      <div className="p-2 bg-indigo-500/10 border border-indigo-500/20 rounded-xl">
                        <Sparkles className="w-4 h-4 text-indigo-400" />
                      </div>
                    </div>
                  )}

                  <div
                    className={cn(
                      "max-w-[85%] rounded-2xl px-4 py-3.5 shadow-sm",
                      message.role === "user"
                        ? "bg-indigo-600 text-white rounded-tr-none"
                        : "bg-zinc-900/90 border border-zinc-800/80 text-zinc-200 rounded-tl-none"
                    )}
                  >
                    <div className="text-sm leading-relaxed whitespace-pre-wrap">
                      {message.content}
                    </div>

                    {/* Source citations */}
                    {message.sources && message.sources.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-zinc-800">
                        <div className="flex items-center gap-1.5 mb-2">
                          <FileText className="w-3 h-3 text-indigo-400" />
                          <span className="text-[11px] text-zinc-400 font-medium">
                            Verified Source Citations
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {getUniqueSources(message.sources).map((sourceId, idx) => (
                            <Badge
                              key={`${sourceId}-${idx}`}
                              variant="outline"
                              className="bg-zinc-800/60 text-zinc-300 border-zinc-700 text-xs hover:border-indigo-500 transition-colors"
                            >
                              📄 Doc #{idx + 1} ({sourceId.slice(0, 8)})
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    <div
                      className={cn(
                        "mt-2 text-[10px]",
                        message.role === "user"
                          ? "text-indigo-200/70"
                          : "text-zinc-500"
                      )}
                    >
                      {new Date(message.timestamp).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </div>

                  {message.role === "user" && (
                    <div className="flex-shrink-0 mt-1">
                      <div className="p-2 bg-zinc-800 border border-zinc-700 rounded-xl">
                        <User className="w-4 h-4 text-zinc-400" />
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {/* Advanced AI Thinking Animation */}
              {isLoading && (
                <div className="flex gap-3 justify-start items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="p-2 bg-indigo-500/10 border border-indigo-500/30 rounded-xl animate-pulse">
                      <Sparkles className="w-4 h-4 text-indigo-400" />
                    </div>
                  </div>

                  <div className="bg-zinc-900 border border-indigo-500/30 rounded-2xl rounded-tl-none p-4 max-w-[85%] space-y-2.5 shadow-lg shadow-indigo-500/5">
                    <div className="flex items-center gap-2 text-xs font-medium text-indigo-300">
                      <Loader2 className="w-3.5 h-3.5 animate-spin text-indigo-400" />
                      <span>Gemini 1.5 Flash is thinking &amp; searching notes...</span>
                    </div>

                    {/* Shimmer bar animation */}
                    <div className="h-1.5 w-52 bg-zinc-800 rounded-full overflow-hidden">
                      <div className="h-full w-full animate-shimmer" />
                    </div>

                    <div className="flex items-center gap-1.5 pt-1">
                      <span className="typing-dot" />
                      <span className="typing-dot" />
                      <span className="typing-dot" />
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Input Area */}
      <div className="relative z-10 border-t border-zinc-800/80 bg-zinc-900/70 backdrop-blur-xl px-4 py-4 flex-shrink-0">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-end gap-3 bg-zinc-800/60 border border-zinc-700/60 rounded-2xl p-2 focus-within:border-indigo-500/60 focus-within:ring-1 focus-within:ring-indigo-500/30 transition-all">
            <Textarea
              ref={textareaRef}
              value={input}
              onChange={handleTextareaChange}
              onKeyDown={handleKeyDown}
              placeholder="Ask anything about your course notes or syllabus..."
              disabled={isLoading}
              className="flex-1 bg-transparent border-0 text-zinc-100 placeholder:text-zinc-500 resize-none min-h-[40px] max-h-[160px] focus-visible:ring-0 focus-visible:ring-offset-0 p-2 text-sm"
              rows={1}
            />
            <Button
              onClick={() => handleSend()}
              disabled={!input.trim() || isLoading}
              size="icon"
              className={cn(
                "rounded-xl h-10 w-10 flex-shrink-0 transition-all",
                input.trim()
                  ? "bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-500/20"
                  : "bg-zinc-700/60 text-zinc-500"
              )}
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
            </Button>
          </div>
          <p className="text-[11px] text-zinc-500 text-center mt-2">
            MindMap AI • Chat history saved locally • Shift+Enter for newline
          </p>
        </div>
      </div>
    </div>
  );
}
