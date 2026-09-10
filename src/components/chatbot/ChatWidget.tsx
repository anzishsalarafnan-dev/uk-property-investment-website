"use client";

import { useState, useRef, useEffect } from "react";
import { CHAT_LANGUAGES } from "@/lib/chatbot/languages";

interface Message {
  role: "user" | "model";
  text: string;
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "model", text: "Hi! Ask me anything about UK cities, prices, yields, or areas — in any language." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState("en-US");
  const [showLangMenu, setShowLangMenu] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  async function sendMessage(text: string) {
    if (!text.trim() || loading) return;

    const newMessages: Message[] = [...messages, { role: "user", text }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          history: newMessages.slice(1).map((m) => ({ role: m.role, text: m.text })),
          language,
        }),
      });
      const data = await res.json();
      const reply = data.reply || "Sorry, something went wrong. Please try again.";
      setMessages((prev) => [...prev, { role: "model", text: reply }]);
    } catch {
      setMessages((prev) => [...prev, { role: "model", text: "Sorry, something went wrong." }]);
    } finally {
      setLoading(false);
    }
  }

  const currentLangLabel = CHAT_LANGUAGES.find((l) => l.code === language)?.label || "English";

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-slate-900 to-slate-700 text-white shadow-xl ring-4 ring-white/50 transition-transform hover:scale-105"
        aria-label="Open chat"
      >
        <span className="text-2xl">{isOpen ? "✕" : "💬"}</span>
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 flex h-[520px] w-[360px] flex-col overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-black/5">
          <div className="flex items-center justify-between bg-gradient-to-r from-slate-900 to-slate-800 px-4 py-3.5 text-white">
            <div>
              <p className="text-sm font-semibold">Property Assistant</p>
              <p className="text-xs text-slate-300">Ask about cities, prices & yields</p>
            </div>
            <div className="relative">
              <button
                onClick={() => setShowLangMenu(!showLangMenu)}
                className="rounded-md bg-white/10 px-2.5 py-1.5 text-xs font-medium hover:bg-white/20"
              >
                {currentLangLabel} ▾
              </button>
              {showLangMenu && (
                <div className="absolute right-0 top-full z-10 mt-1 max-h-64 w-32 overflow-y-auto rounded-md bg-white py-1 shadow-xl ring-1 ring-black/10">
                  {CHAT_LANGUAGES.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => {
                        setLanguage(l.code);
                        setShowLangMenu(false);
                      }}
                      className={`block w-full px-3 py-1.5 text-left text-sm ${
                        language === l.code ? "bg-slate-100 font-semibold text-slate-900" : "text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      {l.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto bg-slate-50 px-4 py-4">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed shadow-sm ${
                  msg.role === "user"
                    ? "ml-auto rounded-br-sm bg-slate-900 text-white"
                    : "rounded-bl-sm bg-white text-slate-800 ring-1 ring-slate-200"
                }`}
              >
                {msg.text}
              </div>
            ))}
            {loading && (
              <div className="max-w-[85%] rounded-2xl rounded-bl-sm bg-white px-3.5 py-2.5 text-sm text-slate-400 ring-1 ring-slate-200">
                <span className="inline-flex gap-1">
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400 [animation-delay:-0.3s]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400 [animation-delay:-0.15s]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400" />
                </span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 border-t border-slate-200 bg-white p-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
              placeholder="Type a message..."
              className="flex-1 rounded-full border border-slate-300 px-4 py-2 text-sm focus:border-slate-500 focus:outline-none"
            />
            <button
              onClick={() => sendMessage(input)}
              disabled={loading}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-900 text-white hover:bg-slate-700 disabled:opacity-50"
              aria-label="Send"
            >
              →
            </button>
          </div>
        </div>
      )}
    </>
  );
}
