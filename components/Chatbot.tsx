
"use client";

import React, { useState, useEffect, useRef } from "react";

interface Message {
  role: "user" | "model";
  text: string;
}

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasBackend, setHasBackend] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Init welcome message
  useEffect(() => {
    setMessages([
      {
        role: "model",
        text:
          "Chào bạn! Tôi là **Sứ giả của Làng gốm Mỹ Thiện**. " +
          "Tôi sẵn sàng chia sẻ về lịch sử, kỹ thuật và tinh hoa gốm truyền thống Quảng Ngãi.",
      },
    ]);
  }, []);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim() || isLoading || !hasBackend) return;

    const content = userInput;
    setUserInput("");
    setIsLoading(true);

    setMessages((prev) => [...prev, { role: "user", text: content }]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: content }),
      });

      if (!res.ok) {
        throw new Error(`Server error ${res.status}`);
      }

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        {
          role: "model",
          text: data.text || "Tôi đang suy ngẫm thêm về câu hỏi này...",
        },
      ]);
    } catch (err) {
      console.error("Chat error:", err);
      setHasBackend(false);
      setMessages((prev) => [
        ...prev,
        {
          role: "model",
          text:
            "Lò nung đang tạm nghỉ 🔥. " +
            "Hệ thống AI chưa sẵn sàng, vui lòng thử lại sau.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Chat Window */}
      <div
        className={`fixed bottom-24 right-4 sm:right-8 w-[calc(100%-2rem)] sm:w-[400px] 
        h-[70vh] max-h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col 
        transition-all duration-300 z-50
        ${isOpen ? "scale-100 opacity-100" : "scale-90 opacity-0 pointer-events-none"}`}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-5 bg-brand-terracotta text-white rounded-t-2xl">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-brand-glaze rounded-full flex items-center justify-center text-xl">
              🏺
            </div>
            <div>
              <h3 className="font-bold">Sứ giả Mỹ Thiện</h3>
              <p className="text-xs opacity-80">
                {hasBackend ? "Trực tuyến" : "Tạm ngắt kết nối"}
              </p>
            </div>
          </div>
          <button onClick={() => setIsOpen(false)}>
            ✕
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 p-5 space-y-4 overflow-y-auto bg-brand-glaze bg-opacity-30">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm whitespace-pre-wrap
                ${
                  msg.role === "user"
                    ? "bg-brand-clay text-white rounded-tr-none"
                    : "bg-white border border-gray-100 rounded-tl-none"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="px-4 py-2 bg-white rounded-2xl border">
                Đang nung đất sét…
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <form
          onSubmit={handleSendMessage}
          className="p-4 bg-white border-t flex gap-2 rounded-b-2xl"
        >
          <input
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder={
              hasBackend
                ? "Hỏi về lịch sử, kỹ thuật gốm Mỹ Thiện…"
                : "Hệ thống đang bảo trì…"
            }
            disabled={!hasBackend || isLoading}
            className="flex-1 px-4 py-2 border rounded-full outline-none disabled:bg-gray-100"
          />
          <button
            type="submit"
            disabled={!hasBackend || isLoading}
            className="bg-brand-terracotta text-white px-4 py-2 rounded-full disabled:bg-gray-400"
          >
            ➤
          </button>
        </form>
      </div>

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-brand-terracotta text-white w-16 h-16 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition z-50"
      >
        💬
      </button>
    </>
  );
};

export default Chatbot;
