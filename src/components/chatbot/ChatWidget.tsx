"use client";

import { useState, useRef, useEffect } from "react";
import { useVoice } from "@/lib/chatbot/useVoice";

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
  const { isListening, isSpeaking, startListening, speak, stopSpeaking } = useVoice();
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
        }),
      });
      const data = await res.json();
      const reply = data.reply || "Sorry, something went wrong. Please try again.";
      setMessages((prev) => [...prev, { role: "model", text: reply }]);
      speak(reply);
    } catch {
      setMessages((prev) => [...prev, { role: "model", text: "Sorry, something went wrong." }]);
    } finally {
      setLoading(false);
    }
  }

  function handleVoiceInput() {
    stopSpeaking();
    startListening((transcript) => {
      sendMessage(transcript);
    });
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-slate-900 text-white shadow-lg transition-transform hover:scale-105"
        aria-label="Open chat"
      >
        {isOpen ? (
          <span className="text-xl">✕</span>
        ) : (
          <span className="text-xl">💬</span>
        )}
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 flex h-[500px] w-[350px] flex-col rounded-xl bg-white shadow-2xl ring-1 ring-slate-200">
          <div className="flex items-center justify-between rounded-t-xl bg-slate-900 px-4 py-3 text-white">
            <span className="text-sm font-semibold">Ask us anything</span>
            {isSpeaking && (
              <button onClick={stopSpeaking} className="text-xs text-slate-300 hover:text-white">
                🔇 Stop
              </button>
            )}
          </div>

          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-3">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`max-w-[85%] rounded-lg px-3 py-2 text-sm ${
                  msg.role === "user"
                    ? "ml-auto bg-slate-900 text-white"
                    : "bg-slate-100 text-slate-800"
                }`}
              >
                {msg.text}
              </div>
            ))}
            {loading && (
              <div className="max-w-[85%] rounded-lg bg-slate-100 px-3 py-2 text-sm text-slate-500">
                Typing...
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 border-t border-slate-200 p-3">
            <button
              onClick={handleVoiceInput}
              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
                isListening ? "bg-red-500 text-white" : "bg-slate-100 text-slate-600"
              }`}
              aria-label="Voice input"
              type="button"
            >
              🎤
            </button>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
              placeholder="Type or speak..."
              className="flex-1 rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
            />
            <button
              onClick={() => sendMessage(input)}
              disabled={loading}
              className="rounded-md bg-slate-900 px-3 py-2 text-sm font-semibold text-white hover:bg-slate-700 disabled:opacity-50"
            >
              →
            </button>
          </div>
        </div>
      )}
    </>
  );
}
