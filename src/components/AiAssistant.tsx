import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Send, X, Sparkles, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { trackEvent } from '@/lib/analytics';

type Msg = { role: 'user' | 'assistant'; content: string };

const STARTER_REPLIES = [
  'What does Zyad build?',
  'Show his best AI project',
  'Tech stack & strengths',
  'I want to hire him',
];

const FOLLOWUP_REPLIES = [
  'Tell me more',
  'How much would it cost?',
  'How long would it take?',
  'Connect me with Zyad',
];

const AiAssistant = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: 'assistant',
      content:
        "Hi! I'm Zyad's AI assistant. Ask me about his mobile & AI work — or tell me about your project and I'll route you to him.",
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50);
  }, [open]);

  useEffect(() => {
    scrollerRef.current?.scrollTo({
      top: scrollerRef.current.scrollHeight,
      behavior: 'smooth',
    });
  }, [messages, loading]);

  const send = async (textOverride?: string) => {
    const text = (textOverride ?? input).trim();
    if (!text || loading) return;
    setInput('');
    const next: Msg[] = [...messages, { role: 'user', content: text }];
    setMessages(next);
    setLoading(true);
    trackEvent('ai_assistant_message', { length: text.length });

    try {
      const { data, error } = await supabase.functions.invoke('portfolio-assistant', {
        body: { messages: next },
      });
      if (error) throw error;
      const reply: string = data?.reply ?? "Sorry, I didn't catch that.";
      const action: string | null = data?.action ?? null;
      setMessages((m) => [...m, { role: 'assistant', content: reply }]);

      if (action === 'open_contact') {
        trackEvent('ai_assistant_route_contact', {});
        setTimeout(() => {
          setOpen(false);
          document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
          toast.success('Tell Zyad about your project below 👇', { duration: 4000 });
        }, 800);
      }
    } catch (err: any) {
      console.error(err);
      const msg =
        err?.context?.error || err?.message || 'Something went wrong. Please use the contact form.';
      setMessages((m) => [...m, { role: 'assistant', content: msg }]);
    } finally {
      setLoading(false);
    }
  };

  const onKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <>
      {/* Launcher */}
      <motion.button
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.2, type: 'spring', stiffness: 180, damping: 14 }}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        onClick={() => {
          setOpen((v) => !v);
          if (!open) trackEvent('ai_assistant_open', {});
        }}
        aria-label={open ? 'Close AI assistant' : 'Open AI assistant'}
        className="fixed bottom-5 right-5 z-50 h-14 w-14 rounded-full bg-gradient-to-br from-flutter-purple via-flutter-blue to-flutter-teal shadow-[0_8px_30px_-4px_rgba(168,85,247,0.55)] flex items-center justify-center border border-white/20"
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span
              key="x"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <X className="h-6 w-6 text-white" />
            </motion.span>
          ) : (
            <motion.span
              key="bot"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              className="relative"
            >
              <Bot className="h-6 w-6 text-white" />
              <span className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-emerald-400 ring-2 ring-[#0A0E27] animate-pulse" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 220, damping: 22 }}
            className="fixed z-50 bottom-24 right-4 left-4 sm:left-auto sm:right-5 sm:w-[380px] h-[70vh] sm:h-[540px] rounded-3xl border border-white/15 bg-[#0A0E27]/95 backdrop-blur-2xl shadow-2xl shadow-flutter-purple/20 overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="relative px-4 py-3 border-b border-white/10 bg-gradient-to-br from-flutter-purple/20 via-flutter-blue/10 to-transparent">
              <div className="flex items-center gap-3">
                <div className="relative h-9 w-9 rounded-xl bg-gradient-to-br from-flutter-purple to-flutter-blue flex items-center justify-center">
                  <Sparkles className="h-4 w-4 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-white">Zyad's AI Assistant</div>
                  <div className="flex items-center gap-1.5 text-[11px] text-flutter-light-blue">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Powered by Lovable AI
                  </div>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div ref={scrollerRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3 scrollbar-hide">
              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-wrap ${
                      m.role === 'user'
                        ? 'bg-gradient-to-br from-flutter-blue to-flutter-purple text-white rounded-br-md'
                        : 'bg-white/[0.06] border border-white/10 text-gray-100 rounded-bl-md'
                    }`}
                  >
                    {m.content}
                  </div>
                </motion.div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-white/[0.06] border border-white/10 rounded-2xl rounded-bl-md px-4 py-3 flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-flutter-light-blue animate-bounce [animation-delay:-0.3s]" />
                    <span className="h-1.5 w-1.5 rounded-full bg-flutter-light-blue animate-bounce [animation-delay:-0.15s]" />
                    <span className="h-1.5 w-1.5 rounded-full bg-flutter-light-blue animate-bounce" />
                  </div>
                </div>
              )}

              {!loading && (
                <div className="pt-1 flex flex-wrap gap-2">
                  {(messages.length === 1 ? STARTER_REPLIES : FOLLOWUP_REPLIES).map((s) => (
                    <motion.button
                      key={s}
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => send(s)}
                      className="text-[11px] px-3 py-1.5 rounded-full border border-flutter-light-blue/30 bg-white/[0.04] text-flutter-light-blue hover:bg-flutter-light-blue/10 transition-colors"
                    >
                      {s}
                    </motion.button>
                  ))}
                </div>
              )}
            </div>

            {/* Composer */}
            <div className="border-t border-white/10 p-3 bg-black/30">
              <div className="flex items-end gap-2 rounded-2xl bg-white/[0.05] border border-white/10 focus-within:border-flutter-light-blue/50 transition-colors px-3 py-2">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={onKey}
                  rows={1}
                  placeholder="Ask anything about Zyad…"
                  className="flex-1 bg-transparent text-sm text-white placeholder:text-gray-500 resize-none focus:outline-none max-h-28"
                />
                <Button
                  size="icon"
                  onClick={() => send()}
                  disabled={loading || !input.trim()}
                  className="h-8 w-8 rounded-xl bg-flutter-gradient text-white shrink-0 disabled:opacity-40"
                  aria-label="Send"
                >
                  {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                </Button>
              </div>
              <p className="text-[10px] text-gray-500 mt-1.5 text-center">
                AI can make mistakes — for project details use the contact form.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AiAssistant;
