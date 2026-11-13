import React, { useState, useEffect, useRef } from 'react';
import { Bot, Send, X, Sparkles, Loader2, MessageSquare, ArrowDown, User, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

// Grounded portfolio knowledge base for instant, deterministic fallback responses
const PORTFOLIO_KNOWLEDGE = [
  {
    keywords: ['specialize', 'speciality', 'what does', 'who is', 'background', 'about', 'role', 'تخصص', 'من هو', 'نبذة', 'خبرة'],
    answer_en:
      "Zyad Wael is a software engineer specializing in cross-platform mobile development with Flutter and Dart for iOS and Android. He focuses on Clean Architecture, offline-first SQLite persistence, on-device AI integration (like ONNX models), and reactive state management.",
    answer_ar:
      "زياد وائل هو مطور برمجيات متخصص في تطوير تطبيقات الموبايل عابرة المنصات باستخدام فلاتر و Dart لنظامي iOS و Android. يركز على معمارية Clean Architecture، والتخزين المحلي الموثوق عبر SQLite للعمل دون اتصال، ودمج نماذج الذكاء الاصطناعي على الأجهزة (مثل ONNX)، وإدارة الحالة التفاعلية.",
  },
  {
    keywords: ['clean architecture', 'architecture', 'bloc', 'provider', 'riverpod', 'patterns', 'معمارية', 'هندسة', 'أنماط'],
    answer_en:
      "Zyad strictly separates concerns across Domain, Data, and Presentation layers. He designs repository abstractions, decouples business logic from UI rendering, and writes modular state containers using BLoC, Provider, and Riverpod with offline-resilient local buffering.",
    answer_ar:
      "يطبق زياد مبادئ Clean Architecture بفصل صارم بين طبقات العرض والنطاق والبيانات. يقوم بتصميم تجريدات المستودعات، وفصل منطق الأعمال عن واجهة المستخدم، وبناء حاويات حالة نموذجية عبر BLoC و Provider و Riverpod مع حماية تدفق البيانات عند انقطاع الشبكة.",
  },
  {
    keywords: ['ai', 'machine learning', 'onnx', 'model', 'shakkal', 'tashkeel', 'edge', 'ذكاء اصطناعي', 'تعلّم الآلة', 'تشكيل'],
    answer_en:
      "Zyad integrates AI directly into mobile applications on-device. For example, in Tashkeel he integrated the pretrained ShakkalV3 ONNX model using ONNX Runtime for 100% offline Arabic diacritization without cloud dependency. He has also explored Mel spectrogram audio alignment and computer vision gesture pipelines.",
    answer_ar:
      "يقوم زياد بدمج نماذج الذكاء الاصطناعي مباشرة على أجهزة الموبايل. على سبيل المثال، في تطبيق تشكيل (Tashkeel) قام بدمج نموذج ShakkalV3 ONNX المدرّب مسبقاً عبر ONNX Runtime للتشكيل الآلي الكامل دون خوادم سحابية. كما قام بأبحاث تجريبية في التعرف الصوتي على القرآن وتتبع إشارات اليد بالرؤية الحاسوبية.",
  },
  {
    keywords: ['ufuq', 'quran', 'islamic', 'prayer', 'radio', 'athkar', 'أفق', 'قرآن', 'صلاة', 'أذكار', 'إذاعة'],
    answer_en:
      "Ufuq is a calm, distraction-free Islamic mobile companion built by Zyad. It features the complete Holy Quran in authentic Uthmani script for 100% offline reading, live 24/7 background audio streaming for Cairo Quran Radio, astronomical GPS prayer countdowns, and a digital Subha.",
    answer_ar:
      "أُفُق هو تطبيق إسلامي هادئ بدون مشتتات طوّره زياد لنظامي iOS و Android. يتميز بقراءة القرآن الكريم بالرسم العثماني دون إنترنت بنسبة 100%، وبث إذاعة القرآن الكريم من القاهرة على مدار الساعة، ومواقيت الصلاة الفلكية بدقة GPS، ومسبحة رقمية مع نبضات لمسية.",
  },
  {
    keywords: ['tashkeel', 'diacritization', 'arabic', 'shakkalv3', 'تشكيل', 'حركات'],
    answer_en:
      "Tashkeel is an iOS/iPadOS mobile app built by Zyad for Arabic text diacritization. It runs completely offline on-device by integrating the existing ShakkalV3 ONNX model, allowing single-tap text and .txt file processing with zero server tracking.",
    answer_ar:
      "تشكيل هو تطبيق لنظامي iOS و iPadOS قام زياد ببنائه لتشكيل النصوص العربية. يعمل التطبيق محلياً بنسبة 100% على الجهاز عبر دمج نموذج ShakkalV3 ONNX، مما يتيح تشكيل النصوص ومعالجة ملفات txt بخصوصية تامة دون إرسال البيانات لأي خادم خارجي.",
  },
  {
    keywords: ['liquid', 'navbar', 'package', 'pub.dev', 'حزمة'],
    answer_en:
      "Liquid Navbar is an open-source Flutter package built by Zyad and published on pub.dev (scored 130/140 points). It delivers a physics-based liquid-glass floating navigation bar with fluid spring transitions using native CustomPainter and bezier vector math.",
    answer_ar:
      "حزمة Liquid Navbar هي مكتبة فلاتر مفتوحة المصدر طوّرها زياد ونشرها على pub.dev وحصلت على تقييم 130/140 نقطة. تقدم شريط تنقل انسيابي بفيزياء النوابض السلسة بمعدل 60 إطاراً في الثانية دون أي مكتبات خارجية.",
  },
  {
    keywords: ['boa', 'go', 'compression', 'terminal', 'cli', 'ضغط', 'طرفية'],
    answer_en:
      "Boa is an open-source terminal compression toolkit and file explorer written in Go. It supports multi-threaded Zstandard and DEFLATE streaming compression, archive inspection without extraction, filesystem benchmarking, and Zip-Slip path traversal protection.",
    answer_ar:
      "أداة Boa هي مجموعة أدوات سطر أوامر ومستكشف ملفات مفتوح المصدر كُتب بلغة Go. تدعم الضغط المتدفق متعدد الخيوط بخوارزميات Zstandard و DEFLATE، واستعراض الأرشيف دون فك الضغط، ومقارنة سرعة المعالجة، والوقاية من ثغرات Zip-Slip.",
  },
  {
    keywords: ['available', 'hire', 'freelance', 'contract', 'job', 'work together', 'pricing', 'quote', 'توظيف', 'عقد', 'متاح', 'عمل'],
    answer_en:
      "Zyad is available for mobile engineering roles, contract projects, and architecture consultations. You can reach him directly via the contact form on this site or by emailing ziad.w.khedr@gmail.com.",
    answer_ar:
      "زياد متاح لفرص تطوير تطبيقات الموبايل، والمشاريع المستقلة، والاستشارات المعمارية. يمكنك التواصل معه مباشرة عبر نموذج المراسلة في هذا الموقع أو عبر البريد الإلكتروني ziad.w.khedr@gmail.com.",
    action: 'open_contact',
  },
];

export const AiAssistant: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Set initial greeting whenever language changes or first load
  useEffect(() => {
    const greeting = isArabic
      ? "أهلاً بك! أنا المساعد الذكي لمعرض زياد وائل. يمكنك سؤالي عن مشاريعه المنشورة (مثل أُفُق وتشكيل)، أو أسلوبه المعماري في فلاتر، أو جاهزيته لفرص العمل."
      : "Hi! I'm Zyad's portfolio assistant. Ask me about his shipped apps (like Ufuq and Tashkeel), his Clean Architecture approach in Flutter, or his availability for roles.";

    setMessages([
      {
        role: 'assistant',
        content: greeting,
      },
    ]);
  }, [isArabic]);

  // Scroll to bottom on new message
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  // Focus input on dialog open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const starterPrompts = [
    t('aiAssistant.starter1', 'What does Zyad specialize in?'),
    t('aiAssistant.starter2', 'Tell me about his Flutter Clean Architecture'),
    t('aiAssistant.starter3', 'How does he integrate AI into mobile apps?'),
    t('aiAssistant.starter4', 'Is Zyad available for freelance or contract roles?'),
  ];

  const handleSend = async (queryText?: string) => {
    const query = (queryText || input).trim();
    if (!query || isLoading) return;

    const userMessage: Message = { role: 'user', content: query };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // 1. First attempt: invoke Supabase edge function for assistant
      const { supabase } = await import('@/integrations/supabase/client');
      const { data, error } = await supabase.functions.invoke('portfolio-assistant', {
        body: {
          query,
          history: messages.slice(-4),
          locale: isArabic ? 'ar' : 'en',
        },
      });

      if (!error && data && data.reply) {
        setMessages((prev) => [...prev, { role: 'assistant', content: data.reply }]);
        setIsLoading(false);
        return;
      }
    } catch {
      // Fallback seamlessly to local grounded knowledge
    }

    // 2. Deterministic local knowledge match fallback
    setTimeout(() => {
      const lower = query.toLowerCase();
      let matched = PORTFOLIO_KNOWLEDGE.find((item) =>
        item.keywords.some((k) => lower.includes(k))
      );

      let reply = matched
        ? (isArabic ? matched.answer_ar : matched.answer_en)
        : (isArabic
            ? "يقوم زياد بهندسة تطبيقات موبايل عالية الاعتمادية باستخدام فلاتر و Dart، مع التركيز على Clean Architecture والتخزين المحلي بالـ SQLite ونماذج الذكاء الاصطناعي على الأجهزة (ONNX). يمكنك استكشاف مشاريعه المنشورة أعلاه أو سؤالي عن تطبيق محدد مثل أُفُق أو تشكيل."
            : "Zyad builds production-grade cross-platform apps using Flutter and Dart, focusing on Clean Architecture, offline SQLite persistence, and on-device AI (like ONNX models). You can explore his shipped work above or ask me about specific projects like Ufuq or Tashkeel.");

      setMessages((prev) => [...prev, { role: 'assistant', content: reply }]);
      setIsLoading(false);
    }, 400);
  };

  const handleKeyDownInput = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <aside aria-label="Portfolio AI Assistant" className="fixed bottom-5 end-5 z-40">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="btn-tactile touch-target flex items-center gap-2.5 px-4 py-3 rounded-full bg-accent text-accent-fg shadow-xl hover:bg-accent-hover transition-all focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
          aria-expanded={isOpen}
          aria-label={t('aiAssistant.triggerAria', 'Open AI Portfolio Assistant')}
        >
          <Bot className="w-5 h-5 shrink-0" />
          <span className="font-mono text-xs font-semibold hidden sm:inline">
            {t('aiAssistant.title', 'Zyad Wael AI')}
          </span>
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-fg opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-fg" />
          </span>
        </button>
      </aside>

      {/* Floating Chat Modal */}
      {isOpen && (
        <div
          role="dialog"
          aria-label={t('aiAssistant.title', 'Zyad Wael AI Assistant')}
          aria-modal="true"
          className="fixed bottom-20 end-5 w-[calc(100vw-2.5rem)] sm:w-[400px] h-[520px] max-h-[calc(100vh-6.5rem)] rounded-2xl bg-surface border border-border shadow-2xl flex flex-col z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        >
          {/* Header Bar */}
          <div className="px-4 py-3.5 border-b border-border-subtle bg-canvas/70 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-accent text-accent-fg flex items-center justify-center">
                <Bot className="w-4 h-4" />
              </div>
              <div className="text-start">
                <h3 className="font-display text-xs font-bold text-ink">
                  {t('aiAssistant.title', 'Zyad Wael AI')}
                </h3>
                <span className="text-[10px] font-mono text-ink-muted flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                  <span>{t('aiAssistant.status', 'Grounded in portfolio facts')}</span>
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="touch-target p-1.5 rounded-md text-ink-muted hover:text-ink hover:bg-elevated transition-colors"
              aria-label={t('aiAssistant.closeAria', 'Close assistant dialog (Escape)')}
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs font-sans text-start">
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
                  className={`max-w-[85%] rounded-xl p-3 leading-relaxed text-start ${
                    msg.role === 'user'
                      ? 'bg-accent text-accent-fg shadow-subtle'
                      : 'bg-elevated/70 border border-border-subtle text-ink'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.content}</p>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-2.5 items-center text-ink-muted text-xs font-mono">
                <div className="w-6 h-6 rounded-full bg-elevated border border-border-subtle flex items-center justify-center text-accent shrink-0">
                  <Loader2 className="w-3 h-3 animate-spin" />
                </div>
                <span>{isArabic ? 'جاري إعداد الإجابة...' : 'Synthesizing answer...'}</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Starter Prompts */}
          {messages.length <= 2 && (
            <div className="px-4 py-2 border-t border-border-subtle bg-canvas/40 flex flex-wrap gap-1.5 text-start">
              {starterPrompts.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => handleSend(prompt)}
                  className="btn-tactile text-start px-2.5 py-1 rounded-md bg-surface border border-border-subtle text-[11px] font-mono text-ink-muted hover:border-accent hover:text-accent transition-colors"
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
                placeholder={t('aiAssistant.placeholder', "Ask about Zyad's apps, architecture, or availability...")}
                disabled={isLoading}
                className="flex-1 px-3 py-2 rounded-md border border-border-subtle bg-canvas text-ink text-xs font-sans focus:outline-none focus:border-accent resize-none disabled:opacity-50 text-start"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="btn-tactile touch-target px-3 py-2 rounded-md bg-accent text-accent-fg hover:bg-accent-hover transition-colors disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
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
