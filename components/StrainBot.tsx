import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, ExternalLink } from 'lucide-react';
import { chatWithBudBot } from '../services/geminiService';
import { ChatMessage } from '../types';

const StrainBot: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: "Yo! I'm BudBot 🌿. I've been upgraded with deep-search capabilities. Enter any strain name to get a full breakdown of effects, flavors, medical benefits, and lineage from the latest databases. What are we smoking on today?",
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!inputText.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: inputText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    // Format history for Gemini
    const history = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
    }));

    const { text, sources } = await chatWithBudBot(history, userMsg.text);

    const botMsg: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: 'model',
      text: text,
      sources: sources,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, botMsg]);
    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-zinc-950 pb-20 animate-in fade-in duration-300">
      {/* Header */}
      <div className="bg-zinc-900 border-b border-zinc-800 p-4 flex items-center justify-center sticky top-0 z-10 shadow-lg">
        <Bot className="text-emerald-400 mr-2" />
        <h1 className="text-lg font-bold text-white">BudBot Assistant</h1>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'} items-end gap-2`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-zinc-800' : 'bg-emerald-900'}`}>
                    {msg.role === 'user' ? <User size={16} /> : <Sparkles size={16} className="text-emerald-400" />}
                </div>
                <div
                    className={`p-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                    msg.role === 'user'
                        ? 'bg-emerald-600 text-white rounded-br-none'
                        : 'bg-zinc-800 text-zinc-100 rounded-bl-none border border-zinc-700'
                    }`}
                >
                    {msg.text}
                    {msg.sources && msg.sources.length > 0 && (
                        <div className="mt-3 pt-2 border-t border-emerald-500/20">
                            <p className="text-[10px] uppercase tracking-wider text-emerald-400/80 font-bold mb-1.5 flex items-center">
                                <ExternalLink size={10} className="mr-1" /> Sources
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {msg.sources.map((source, idx) => (
                                    <a 
                                        key={idx} 
                                        href={source.uri} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="text-xs bg-black/40 hover:bg-black/60 px-2 py-1 rounded text-emerald-100 truncate max-w-[200px] border border-emerald-900/50 transition-colors"
                                    >
                                        {source.title}
                                    </a>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
          </div>
        ))}
        {isLoading && (
            <div className="flex justify-start w-full">
                <div className="flex items-center gap-2 max-w-[80%]">
                    <div className="w-8 h-8 rounded-full bg-emerald-900 flex items-center justify-center">
                         <Sparkles size={16} className="text-emerald-400 animate-pulse" />
                    </div>
                    <div className="bg-zinc-800 p-3 rounded-2xl rounded-bl-none border border-zinc-700 flex items-center gap-1">
                        <span className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce"></span>
                        <span className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce delay-100"></span>
                        <span className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce delay-200"></span>
                    </div>
                </div>
            </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 bg-zinc-900 border-t border-zinc-800">
        <div className="flex items-center bg-zinc-950 border border-zinc-800 rounded-full px-4 py-2 focus-within:border-emerald-500 transition-colors">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Search strain (e.g., Blue Dream)..."
            className="flex-1 bg-transparent text-white placeholder-zinc-500 outline-none"
          />
          <button
            onClick={handleSend}
            disabled={!inputText.trim() || isLoading}
            className={`ml-2 p-2 rounded-full transition-colors ${
              inputText.trim() && !isLoading ? 'bg-emerald-500 text-white' : 'bg-zinc-800 text-zinc-600'
            }`}
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default StrainBot;