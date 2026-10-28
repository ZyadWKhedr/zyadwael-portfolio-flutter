import React, { useState, useEffect, useRef } from 'react';
import { Bot, Send, X, Sparkles, Loader2, MessageSquare, ArrowDown, User } from 'lucide-react';
import { toast } from 'sonner';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const STARTER_PROMPTS = [
  'What does Zyad specialize in?',
  'Tell me about his Flutter Clean Architecture',
  'How does he integrate AI into mobile apps?',
  'Is Zyad available for freelance or contract roles?',
];

export const AiAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content:
        "Hello! I am Zyad's portfolio assistant powered by Gemini. Ask me about his production Flutter applications, clean architecture, or AI integration — or tell me about your project to connect directly with him.",
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      launcherRef.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleSend = async (textOverride?: string) => {
    const textToSend = (textOverride || input).trim();
    if (!textToSend || isLoading) return;

    setInput('');
    const newMessages: Message[] = [...messages, { role: 'user', content: textToSend }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const { supabase } = await import('@/integrations/supabase/client');
      const { data, error } = await supabase.functions.invoke('portfolio-assistant', {
        body: { messages: newMessages },
      });

      if (error) {
        throw error;
      }

      const reply: string = data?.reply || "I'm having trouble retrieving that detail right now. Feel free to message Zyad directly via the contact form below.";
      const action: string | null = data?.action || null;

      setMessages((prev) => [...prev, { role: 'assistant', content: reply }]);

      if (action === 'open_contact') {
        setTimeout(() => {
          setIsOpen(false);
          document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
          toast.success('Routed you to the contact section to reach Zyad directly.');
        }, 1200);
      }
    } catch (err: any) {
      console.error('AI assistant error:', err);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'Unable to reach the assistant gateway. Please use the direct contact form or email ziad.w.khedr@gmail.com.',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDownInput = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Launcher Button */}
      <div className="fixed bottom-5 right-5 z-40">
        <button
          ref={launcherRef}
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="btn-tactile group flex items-center gap-2.5 px-4 py-3 rounded-full bg-surface border border-border-strong text-ink shadow-card hover:border-accent hover:text-accent transition-all duration-200"
          aria-expanded={isOpen}
          aria-label={isOpen ? 'Close AI Portfolio Assistant' : 'Open AI Portfolio Assistant'}
        >
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-accent" />
          </span>
          <span className="font-mono text-xs font-semibold uppercase tracking-wider">
            {isOpen ? 'Close AI' : 'Ask AI'}
          </span>
          <span className="hidden sm:inline text-[10px] font-mono px-1.5 py-0.5 rounded bg-elevated border border-border-subtle text-ink-faint">
            ⌘K
          </span>
        </button>
      </div>

      {/* Slide-up Chat Panel Dialog */}
      {isOpen && (
        <div
          role="dialog"
          aria-label="AI Portfolio Assistant"
          className="fixed bottom-20 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[420px] max-h-[82vh] h-[560px] bg-surface border border-border-strong rounded-2xl shadow-card-hover flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200"
        >
          {/* Panel Header */}
          <div className="px-4 py-3.5 border-b border-border-subtle bg-elevated/70 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-surface border border-border-subtle flex items-center justify-center text-accent">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-ink font-serif flex items-center gap-1.5">
                  <span>Zyad's AI Concierge</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                </div>
                <div className="text-[10px] font-mono text-ink-faint">
                  Grounded in verified portfolio facts
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="touch-target p-1.5 rounded-md text-ink-faint hover:text-ink hover:bg-surface transition-colors"
              aria-label="Close assistant dialog (Escape)"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs font-sans">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex gap-2.5 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.role === 'assistant' && (
                  <div className="w-6 h-6 rounded-full bg-elevated border border-border-subtle flex items-center justify-center text-accent shrink-0 mt-0.5">
                    <Sparkles className="w-3 h-3" />
                  </div>
                )}
                <div
                  className={`max-w-[85%] rounded-xl p-3 leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-accent text-white shadow-subtle'
                      : 'bg-elevated/70 border border-border-subtle text-ink'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.content}</p>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-2.5 items-center text-ink-faint text-xs font-mono">
                <div className="w-6 h-6 rounded-full bg-elevated border border-border-subtle flex items-center justify-center text-accent shrink-0">
                  <Loader2 className="w-3 h-3 animate-spin" />
                </div>
                <span>Synthesizing answer...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Starter Chips */}
          {messages.length <= 2 && (
            <div className="px-4 py-2 border-t border-border-subtle bg-canvas/40 flex flex-wrap gap-1.5">
              {STARTER_PROMPTS.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => handleSend(prompt)}
                  className="btn-tactile text-left px-2.5 py-1 rounded-md bg-surface border border-border-subtle text-[11px] font-mono text-ink-muted hover:border-accent hover:text-accent transition-colors"
                >
                  {prompt}
                </button>
              ))}
            </div>
          )}

          {/* Input Footer */}
          <div className="p-3 border-t border-border-subtle bg-surface">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <textarea
                ref={inputRef}
                rows={1}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDownInput}
                placeholder="Ask about Zyad's apps, architecture, or availability..."
                disabled={isLoading}
                className="flex-1 px-3 py-2 rounded-md border border-border-subtle bg-canvas text-ink text-xs font-sans focus:outline-none focus:border-accent resize-none disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="btn-tactile touch-target px-3 py-2 rounded-md bg-accent text-white hover:bg-accent-hover transition-colors disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
                aria-label="Send query"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AiAssistant;
