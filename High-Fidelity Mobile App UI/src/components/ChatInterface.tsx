import { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, Copy, Check, Trash2, Mic, Volume2, Globe } from 'lucide-react';
import { ChatSkeleton } from './Skeleton';

export function ChatInterface() {
  const [language, setLanguage] = useState<'ENG' | 'HIN'>('ENG');
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<{ role: 'user' | 'ai', text: string, time: string }[]>([
    {
      role: 'ai',
      text: "Namaste! I'm SchemeSense assistant. How can I help you today?",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [isLoading, setIsLoading] = useState(true);
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  const toggleLanguage = () => {
    setLanguage(language === 'ENG' ? 'HIN' : 'ENG');
  };

  const clearChat = () => {
    if (window.confirm('Clear all messages?')) {
      setChatHistory([{
        role: 'ai',
        text: "Chat cleared. How can I help you now?",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    }
  };

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedId(index);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSend = async () => {
    if (!message.trim() || isLoading) return;

    const userMessage = {
      role: 'user' as const,
      text: message,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatHistory([...chatHistory, userMessage]);
    setMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: userMessage.text })
      });

      if (!response.ok) throw new Error('Failed to get AI response');

      const data = await response.json();

      const aiResponse = {
        role: 'ai' as const,
        text: data.response,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setChatHistory(prev => [...prev, aiResponse]);
    } catch (error) {
      console.error('Chat error:', error);
      setChatHistory(prev => [...prev, {
        role: 'ai',
        text: "I'm having trouble connecting to the server. Please try again later.",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen pb-16 bg-gray-50 dark:bg-black transition-colors duration-500">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#2563eb] via-[#1e40af] to-[#1e3a8a] text-white px-6 py-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-2xl -mr-8 -mt-8"></div>
        <div className="flex items-center justify-between relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20 shadow-inner">
              <Bot size={28} className="text-white" />
            </div>
            <div>
              <h1 className="text-xl font-black tracking-tight">SchemeSense</h1>
              <p className="text-[10px] text-white/70 font-bold uppercase tracking-widest mt-0.5">AI Benefits Assistant</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={clearChat}
              className="p-2.5 hover:bg-white/10 rounded-xl transition-all text-white/70 hover:text-white group"
              title="Clear Chat"
            >
              <Trash2 size={20} className="group-hover:scale-110 transition-transform" />
            </button>
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl hover:bg-white/20 transition-all border border-white/10"
            >
              <Globe size={14} />
              <span className="text-xs font-black tracking-widest">{language}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {isLoading && chatHistory.length === 1 && <ChatSkeleton />}
        {chatHistory.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
            <div className={`
              ${msg.role === 'user'
                ? 'bg-[#2563eb] dark:bg-blue-600 text-white rounded-tr-none'
                : 'bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 rounded-tl-none border border-gray-100 dark:border-gray-800'
              } px-5 py-4 rounded-[24px] max-w-[85%] shadow-sm relative group transition-colors
            `}>
              <p className="text-sm leading-relaxed whitespace-pre-wrap font-medium">{msg.text}</p>
              <div className={`flex items-center justify-between mt-2 pt-2 border-t ${msg.role === 'user' ? 'border-white/10' : 'border-gray-50 dark:border-gray-800'}`}>
                <span className={`text-[9px] font-bold ${msg.role === 'user' ? 'text-white/60' : 'text-gray-400 dark:text-gray-600'}`}>
                  {msg.time}
                </span>

                {msg.role === 'ai' && (
                  <button
                    onClick={() => copyToClipboard(msg.text, idx)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg text-gray-400 dark:text-gray-600 hover:text-[#2563eb]"
                    title="Copy message"
                  >
                    {copiedId === idx ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
        {isLoading && chatHistory.length > 1 && (
          <div className="flex justify-start animate-in fade-in duration-300">
            <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 px-5 py-4 rounded-[24px] rounded-tl-none shadow-sm">
              <div className="flex gap-1.5">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce [animation-duration:800ms]"></div>
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce [animation-duration:800ms] [animation-delay:200ms]"></div>
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce [animation-duration:800ms] [animation-delay:400ms]"></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="bg-white dark:bg-black border-t border-gray-100 dark:border-gray-800 px-6 py-4 shadow-2xl relative z-10 transition-colors">
        <form
          onSubmit={(e) => { e.preventDefault(); handleSend(); }}
          className="flex items-center gap-3"
        >
          <button type="button" className="p-2.5 text-gray-400 dark:text-gray-600 hover:text-[#2563eb] dark:hover:text-blue-400 transition-all hover:bg-blue-50 dark:hover:bg-blue-900/10 rounded-xl">
            <Mic size={20} />
          </button>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            disabled={isLoading}
            placeholder="Type your question..."
            className="flex-1 bg-gray-50 dark:bg-gray-900 rounded-2xl px-6 py-3.5 text-sm focus:outline-none focus:ring-4 focus:ring-blue-500/10 dark:focus:ring-blue-400/10 border border-transparent focus:border-[#2563eb]/20 focus:bg-white dark:focus:bg-gray-950 transition-all disabled:opacity-50 font-bold text-gray-800 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-600"
          />
          <button
            type="submit"
            disabled={!message.trim() || isLoading}
            className="bg-[#2563eb] dark:bg-blue-600 text-white p-3.5 rounded-2xl hover:bg-[#1d4ed8] dark:hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/20 disabled:bg-gray-100 dark:disabled:bg-gray-800 disabled:text-gray-400 disabled:shadow-none transform active:scale-95"
          >
            <Send size={20} />
          </button>
        </form>
      </div>
    </div>
  );
}
