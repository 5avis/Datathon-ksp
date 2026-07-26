"use client";
import React, { useState, useRef, useEffect } from 'react';

declare const process: {
  env: {
    [key: string]: string | undefined;
  };
};

interface Message {
  role: 'user' | 'ai';
  content: string;
}

const BACKEND_URL = (typeof process !== 'undefined' && process.env?.NEXT_PUBLIC_BACKEND_URL) || 'http://localhost:8000';

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'ai', content: 'Namaskara. I am your Crime Intelligence Assistant. How can I help you investigate today? (e.g., "Show network links for Accused X" or "Predict theft hotspots in Bangalore")' }
  ]);
  const [input, setInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages((prev: Message[]) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch(`${BACKEND_URL}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input, history: messages })
      });

      const data = await response.json();
      console.log("🔍 Backend Response:", data);

      if (!response.ok) {
        throw new Error(data.detail || "Backend returned an error");
      }

      const aiText = data.response || "Received empty response from backend.";
      setMessages((prev: Message[]) => [...prev, { role: 'ai', content: aiText }]);
      
    } catch (error: any) {
      console.error("❌ Chat Error:", error);
      setMessages((prev: Message[]) => [...prev, { 
        role: 'ai', 
        content: `⚠️ Error: ${error.message || 'Failed to connect to the intelligence backend.'}` 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleExportPDF = () => {
    alert("PDF Export triggered!");
  };

  const handleVoiceInput = () => {
    alert("Voice input triggered!");
  };

  return (
    <div className="panel-surface flex flex-col h-[600px]">
      <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-[#EAF4FC]">
        {messages.map((msg: Message, index: number) => (
          <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[82%] p-3.5 rounded-xl transition-all duration-300 ${
              msg.role === 'user' 
                ? 'glass-button text-white rounded-br-none shadow-md' 
                : 'bg-white text-[#1A3459] rounded-bl-none border border-[#C0D1E3] shadow-md'
            }`}>
              <p className="whitespace-pre-wrap text-xs leading-relaxed tracking-wide">{msg.content}</p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white p-3.5 rounded-xl rounded-bl-none border border-[#C0D1E3] shadow-md">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-[#3E8EDE] rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-[#3E8EDE] rounded-full animate-bounce delay-100"></div>
                <div className="w-2 h-2 bg-[#3E8EDE] rounded-full animate-bounce delay-200"></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t border-[#C0D1E3] bg-white rounded-b-xl">
        <div className="flex gap-2">
          <button onClick={handleVoiceInput} className="glass-button-secondary p-3 text-sm" title="Voice Input">🎤</button>
          <input
            type="text"
            value={input}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && handleSend()}
            placeholder="Ask about crime patterns, networks, or FIRs..."
            className="glass-input flex-1 text-xs"
          />
          <button onClick={handleSend} disabled={isLoading} className="glass-button px-6 text-xs font-semibold tracking-wider">Send</button>
          <button onClick={handleExportPDF} className="glass-button-secondary p-3 text-sm" title="Export to PDF">📄</button>
        </div>
      </div>
    </div>
  );
}