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

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    const query = input.trim();
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
        content: "I encountered an error processing your request. Please try again.",
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
    // Auto-resize
    const textarea = e.target;
    textarea.style.height = "auto";
    textarea.style.height = Math.min(textarea.scrollHeight, 160) + "px";
  };

  // Deduplicate sources
  const getUniqueSources = (sources: string[]) => {
    return [...new Set(sources)];
  };

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] lg:h-screen">
      {/* Chat Header */}
      <div className="border-b border-zinc-800 bg-zinc-900/50 backdrop-blur-xl px-6 py-4 flex items-center gap-3 flex-shrink-0">
        <div className="p-2 bg-indigo-500/10 rounded-xl">
          <Sparkles className="w-5 h-5 text-indigo-400" />
        </div>
        <div>
          <h1 className="text-lg font-semibold text-zinc-100">AI Chat</h1>
          <p className="text-xs text-zinc-500">
            Ask questions about your knowledge base
          </p>
        </div>
      </div>

      {/* Messages Area */}
      <ScrollArea className="flex-1">
        <div className="max-w-3xl mx-auto px-4 py-6">
          {messages.length === 0 ? (
            /* Welcome screen */
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
              <div className="p-4 bg-indigo-500/10 rounded-2xl mb-6">
                <Brain className="w-12 h-12 text-indigo-400" />
              </div>
              <h2 className="text-2xl font-bold text-zinc-200 mb-3">
                Ask me anything
              </h2>
              <p className="text-zinc-400 max-w-md mb-8 leading-relaxed">
                I can search through your knowledge base and provide answers
                with source citations. Try asking a specific question about
                your uploaded documents.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-md">
                {[
                  "What are the key findings?",
                  "Summarize the main concepts",
                  "Compare the methodologies",
                  "What are the limitations?",
                ].map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => {
                      setInput(suggestion);
                      textareaRef.current?.focus();
                    }}
                    className="px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-sm text-zinc-400 hover:text-zinc-200 hover:border-zinc-700 hover:bg-zinc-800/50 transition-all text-left"
                  >
                    {suggestion}
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
                      <div className="p-2 bg-indigo-500/10 rounded-xl">
                        <Sparkles className="w-4 h-4 text-indigo-400" />
                      </div>
                    </div>
                  )}

                  <div
                    className={cn(
                      "max-w-[80%] rounded-2xl px-4 py-3",
                      message.role === "user"
                        ? "bg-indigo-600 text-white"
                        : "bg-zinc-800/80 text-zinc-200"
                    )}
                  >
                    <div className="text-sm leading-relaxed whitespace-pre-wrap">
                      {message.content}
                    </div>

                    {/* Source citations */}
                    {message.sources && message.sources.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-zinc-700/50">
                        <div className="flex items-center gap-1.5 mb-2">
                          <FileText className="w-3 h-3 text-zinc-500" />
                          <span className="text-xs text-zinc-500 font-medium">
                            Sources
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {getUniqueSources(message.sources).map((sourceId, idx) => (
                            <Badge
                              key={`${sourceId}-${idx}`}
                              variant="outline"
                              className="bg-zinc-900/50 text-zinc-400 border-zinc-700 text-xs hover:bg-zinc-700/50 cursor-pointer transition-colors"
                            >
                              📄 {sourceId.slice(0, 8)}...
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    <div
                      className={cn(
                        "mt-2 text-xs",
                        message.role === "user"
                          ? "text-indigo-200/60"
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
                      <div className="p-2 bg-zinc-800 rounded-xl">
                        <User className="w-4 h-4 text-zinc-400" />
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {/* Typing indicator */}
              {isLoading && (
                <div className="flex gap-3 justify-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="p-2 bg-indigo-500/10 rounded-xl">
                      <Sparkles className="w-4 h-4 text-indigo-400" />
                    </div>
                  </div>
                  <div className="bg-zinc-800/80 rounded-2xl px-4 py-3">
                    <div className="flex items-center gap-1.5">
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
      <div className="border-t border-zinc-800 bg-zinc-900/80 backdrop-blur-xl px-4 py-4 flex-shrink-0">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-end gap-3 bg-zinc-800/50 border border-zinc-700/50 rounded-2xl p-2 focus-within:border-indigo-500/50 transition-colors">
            <Textarea
              ref={textareaRef}
              value={input}
              onChange={handleTextareaChange}
              onKeyDown={handleKeyDown}
              placeholder="Ask a question about your knowledge base..."
              disabled={isLoading}
              className="flex-1 bg-transparent border-0 text-zinc-100 placeholder:text-zinc-500 resize-none min-h-[40px] max-h-[160px] focus-visible:ring-0 focus-visible:ring-offset-0 p-2"
              rows={1}
            />
            <Button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              size="icon"
              className={cn(
                "rounded-xl h-10 w-10 flex-shrink-0 transition-all",
                input.trim()
                  ? "bg-indigo-600 hover:bg-indigo-500 text-white"
                  : "bg-zinc-700 text-zinc-500"
              )}
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
            </Button>
          </div>
          <p className="text-xs text-zinc-600 text-center mt-2">
            MindMap AI searches your knowledge base and generates responses using GPT-4o-mini
          </p>
        </div>
      </div>
    </div>
  );
}
