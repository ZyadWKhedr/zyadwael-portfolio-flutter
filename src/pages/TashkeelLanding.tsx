import React, { useState, useEffect } from 'react';
import {
  Apple,
  ShieldCheck,
  Cpu,
  WifiOff,
  Copy,
  Check,
  ChevronDown,
  Layers,
  History,
  FileText,
  Sliders,
  Globe,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  ExternalLink,
  Lock,
  Zap,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { getAssetUrl } from '@/lib/utils';

// Official verified App Store link
const APP_STORE_URL = 'https://apps.apple.com/us/app/tashkeel-%D8%AA-%D8%B4-%D9%83-%D9%8A%D9%84/id6827159466';

interface ShowcaseSlide {
  id: string;
  tabTitleAr: string;
  tabTitleEn: string;
  headlineAr: string;
  headlineEn: string;
  descAr: string;
  descEn: string;
  image: string;
  icon: React.ElementType;
}

const SHOWCASE_SLIDES: ShowcaseSlide[] = [
  {
    id: 'editor',
    tabTitleAr: 'المحرر الذكي',
    tabTitleEn: 'Smart Editor',
    headlineAr: 'مساحة كتابة هادئة وخالية من المشتتات',
    headlineEn: 'A serene, distraction-free writing canvas',
    descAr: 'اكتب نصك بحرية أو الصقه بنقرة واحدة. صُممت الواجهة بأناقة وبساطة لتضع تركيزك على النص وجمال اللغة دون أي قوائم معقدة.',
    descEn: 'Type freely or paste text with a single tap. Designed with minimal clutter so your focus remains on words and language aesthetics.',
    image: 'assets/images/projects/tashkeel/tashkeel-screen-editor.webp',
    icon: FileText,
  },
  {
    id: 'vocalized',
    tabTitleAr: 'النتيجة المشكولة',
    tabTitleEn: 'Vocalized Output',
    headlineAr: 'تشكيل كامل بالسياق وقواعد الإعراب',
    headlineEn: 'Complete contextual diacritization and syntax',
    descAr: 'يحلل النموذج العصبي سياق الجملة لإضافة الفتحة، الضمة، الكسرة، السكون، التنوين بأنواعه، والشدة. انسخ النتيجة أو شاركها فوراً.',
    descEn: 'The neural engine analyzes the sentence context to append full Harakat (Fatha, Damma, Kasra, Sukun, Tanween, Shaddah). Copy or share instantly.',
    image: 'assets/images/projects/tashkeel/tashkeel-screen-result.webp',
    icon: Sparkles,
  },
  {
    id: 'history',
    tabTitleAr: 'سجل المحفوظات',
    tabTitleEn: 'Local Archive',
    headlineAr: 'نصوصك السابقة في متناول يدك دائماً',
    headlineEn: 'Your previous passages always at hand',
    descAr: 'سجل محفوظات داخلي يحفظ نصوصك المشكولة على هاتفك فقط لتسترجعها في أي وقت دون الحاجة لإعادة معالجتها أو الاتصال بأي خادم.',
    descEn: 'A local on-device archive stores your past diacritized passages so you can revisit them anytime without re-processing or network access.',
    image: 'assets/images/projects/tashkeel/tashkeel-screen-history.webp',
    icon: History,
  },
  {
    id: 'settings',
    tabTitleAr: 'التخصيص والتصدير',
    tabTitleEn: 'Export & Formats',
    headlineAr: 'استيراد وتصدير مرن مع دعم الوضع الداكن',
    headlineEn: 'Flexible file export and full dark mode support',
    descAr: 'استورد ملفات نصية كاملة بصيغة (.txt)، وصدّر النتائج المشكولة مباشرة إلى تطبيقاتك المفضلة. الواجهة تدعم الوضع الفاتح والداكن تلقائياً.',
    descEn: 'Import full .txt documents and export diacritized text directly to your preferred apps. Fully supports both light and dark iOS themes.',
    image: 'assets/images/projects/tashkeel/tashkeel-screen-settings.webp',
    icon: Sliders,
  },
];

interface DemoExample {
  titleAr: string;
  titleEn: string;
  raw: string;
  diacritized: string;
}

const DEMO_EXAMPLES: DemoExample[] = [
  {
    titleAr: 'حكمة في العلم',
    titleEn: 'Wisdom on Knowledge',
    raw: 'العلم نور والجهل ظلام، وبه ترتقي الأمم وتنهض الحضارات عبر الزمان.',
    diacritized: 'الْعِلْمُ نُورٌ وَالْجَهْلُ ظَلَامٌ، وَبِهِ تَرْتَقِي الْأُمَمُ وَتَنْهَضُ الْحَضَارَاتُ عَبْرَ الزَّمَانِ.',
  },
  {
    titleAr: 'بلاغة وفصاحة',
    titleEn: 'Classical Eloquence',
    raw: 'إن من البيان لسحرا وإن من الشعر لحكمة.',
    diacritized: 'إِنَّ مِنَ الْبَيَانِ لَسِحْرًا وَإِنَّ مِنَ الشِّعْرِ لَحِكْمَةً.',
  },
  {
    titleAr: 'نثر حديث',
    titleEn: 'Modern Prose',
    raw: 'تطبيق تشكيل يضبط أواخر الكلمات وسياق الجملة بدقة واحترافية عالية.',
    diacritized: 'تَطْبِيقُ تَشْكِيلٍ يَضْبِطُ أَوَاخِرَ الْكَلِمَاتِ وَسِيَاقَ الْجُمْلَةِ بِدِقَّةٍ وَاحْتِرَافِيَّةٍ عَالِيَةٍ.',
  },
];

interface FAQItem {
  questionAr: string;
  questionEn: string;
  answerAr: string;
  answerEn: string;
}

const FAQS: FAQItem[] = [
  {
    questionAr: 'هل يحتاج تطبيق تَشْكِيل إلى اتصال بالإنترنت؟',
    questionEn: 'Does Tashkeel require an internet connection?',
    answerAr:
      'لا، يعمل تطبيق تَشْكِيل محلياً بنسبة 100% دون الحاجة إلى شبكة الإنترنت أو باقة البيانات. يمكنك استخدامه في وضع الطيران وأثناء السفر وفي أي مكان.',
    answerEn:
      'No. Tashkeel operates 100% locally on your device without needing an internet or cellular connection. You can use it in airplane mode, while traveling, or anywhere offline.',
  },
  {
    questionAr: 'ما هو نموذج الذكاء الاصطناعي المستخدم؟',
    questionEn: 'What AI model powers the diacritization?',
    answerAr:
      'يعتمد التطبيق على نموذج Shakkala v3 المدرّب مسبقاً، والمُشغَّل محلياً عبر تقنية ONNX Runtime المحسّنة لأجهزة Apple، ليحلل سياق الجملة وقواعد النحو بسرعة فائقة.',
    answerEn:
      'The app relies on the pretrained Shakkala v3 neural model, executed locally using ONNX Runtime optimized for Apple devices to analyze syntax and grammar with sub-second response.',
  },
  {
    questionAr: 'هل يتم رفع أي نصوص إلى خوادم خارجية؟',
    questionEn: 'Is any of my text uploaded to external servers?',
    answerAr:
      'أبداً. لا يمتلك التطبيق أي خوادم لتحليل النصوص ولا يتم إرسال أي حرف خارج جهازك. نصوصك تظل دائماً في ذاكرة هاتفك الخاصة.',
    answerEn:
      'Never. The application has no external processing servers and never transmits any character outside your device. Your writing always stays strictly in your phone memory.',
  },
  {
    questionAr: 'هل يتطلب التطبيق إنشاء حساب أو تسجيل دخول؟',
    questionEn: 'Does it require an account or subscription?',
    answerAr:
      'لا. لا توجد حسابات، لا اشتراكات، ولا طلب لبياناتك الشخصية. ثبّت التطبيق من متجر App Store وابدأ العمل فوراً وبالمجان.',
    answerEn:
      'No. There are no user accounts, no subscriptions, and zero personal data requests. Download from the App Store and start diacritizing immediately for free.',
  },
  {
    questionAr: 'ما هي الأجهزة وإصدارات iOS المدعومة؟',
    questionEn: 'Which devices and iOS versions are supported?',
    answerAr:
      'يدعم التطبيق هواتف iPhone وأجهزة iPad التي تعمل بنظام iOS 15.0 أو أحدث، مع دعم مُحسّن للشاشات بمختلف أحجامها بما فيها iPhone Duo.',
    answerEn:
      'Tashkeel supports iPhone and iPad devices running iOS 15.0 or later, with responsive layouts across all screen form-factors including iPhone Duo.',
  },
];

export const TashkeelLanding: React.FC = () => {
  const [lang, setLang] = useState<'ar' | 'en'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('tashkeel_lang');
      if (saved === 'ar' || saved === 'en') return saved;
      const navLang = navigator.language?.toLowerCase() || '';
      return navLang.startsWith('ar') ? 'ar' : 'en';
    }
    return 'ar';
  });

  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [selectedExampleIndex, setSelectedExampleIndex] = useState(0);
  const [isVocalizedView, setIsVocalizedView] = useState(true);
  const [copiedText, setCopiedText] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const isRtl = lang === 'ar';

  const toggleLanguage = () => {
    const next = lang === 'ar' ? 'en' : 'ar';
    setLang(next);
    if (typeof window !== 'undefined') {
      localStorage.setItem('tashkeel_lang', next);
    }
  };

  const currentExample = DEMO_EXAMPLES[selectedExampleIndex];
  const activeSlide = SHOWCASE_SLIDES[activeSlideIndex];

  const handleCopy = (text: string) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedText(true);
      setTimeout(() => setCopiedText(false), 2000);
    }
  };

  return (
    <div
      dir={isRtl ? 'rtl' : 'ltr'}
      className="min-h-screen bg-[#FBFBFA] text-[#1C1D1B] font-sans antialiased selection:bg-[#1E5E3A] selection:text-white"
    >
      {/* ========================================================================= */}
      {/* TOP NAVIGATION BAR */}
      {/* ========================================================================= */}
      <header className="sticky top-0 z-40 bg-[#FBFBFA]/90 backdrop-blur-md border-b border-[#E7E5E0]">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo & Identity */}
          <Link
            to="/tashkeel/"
            className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1E5E3A]"
          >
            <div className="w-9 h-9 rounded-xl overflow-hidden border border-[#E7E5E0] shadow-sm bg-white shrink-0 group-hover:scale-105 transition-transform">
              <img
                src={getAssetUrl('assets/images/projects/tashkeel/tashkeel-icon.webp')}
                alt="Tashkeel App Icon"
                width={36}
                height={36}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-start">
              <span className="font-bold text-base text-[#1C1D1B] tracking-tight block leading-none">
                {isRtl ? 'تَشْكِيل' : 'Tashkeel'}
              </span>
              <span className="text-[11px] font-mono text-[#78716C] leading-none">
                {isRtl ? 'ذكاء اصطناعي محلي' : 'On-Device AI'}
              </span>
            </div>
          </Link>

          {/* Quick Nav Links & Actions */}
          <div className="flex items-center gap-3 sm:gap-6">
            <nav className="hidden md:flex items-center gap-6 text-xs font-medium text-[#78716C]">
              <a href="#demo" className="hover:text-[#1E5E3A] transition-colors">
                {isRtl ? 'التجربة الحية' : 'Live Demo'}
              </a>
              <a href="#how-it-works" className="hover:text-[#1E5E3A] transition-colors">
                {isRtl ? 'كيف يعمل' : 'How It Works'}
              </a>
              <a href="#privacy" className="hover:text-[#1E5E3A] transition-colors">
                {isRtl ? 'الخصوصية والأوفلاين' : 'Privacy & Offline'}
              </a>
              <a href="#showcase" className="hover:text-[#1E5E3A] transition-colors">
                {isRtl ? 'معرض الواجهات' : 'Showcase'}
              </a>
              <a href="#faq" className="hover:text-[#1E5E3A] transition-colors">
                {isRtl ? 'الأسئلة الشائعة' : 'FAQ'}
              </a>
            </nav>

            <div className="flex items-center gap-2">
              {/* Language Switcher */}
              <button
                type="button"
                onClick={toggleLanguage}
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-lg border border-[#E7E5E0] bg-white text-[#1C1D1B] hover:bg-[#F3F2EE] hover:border-[#D6D3CB] transition-all"
                aria-label="Switch Language"
              >
                <Globe className="w-3.5 h-3.5 text-[#1E5E3A]" />
                <span className="font-mono">{isRtl ? 'English' : 'العربية'}</span>
              </button>

              {/* Direct App Store Download Link */}
              <a
                href={APP_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-[#1E5E3A] text-white hover:bg-[#16482C] shadow-sm hover:shadow transition-all"
              >
                <Apple className="w-3.5 h-3.5 fill-current" />
                <span>App Store</span>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 01 · HERO SECTION */}
      {/* ========================================================================= */}
      <section className="pt-16 pb-20 md:pt-24 md:pb-32 overflow-hidden border-b border-[#E7E5E0]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Text & Positioning Column (7 cols) */}
            <div className="lg:col-span-7 space-y-6 text-start">
              {/* Editorial Pill */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-[#E7E5E0] text-xs font-mono text-[#1E5E3A] shadow-xs">
                <span className="w-2 h-2 rounded-full bg-[#1E5E3A] animate-pulse" />
                <span>SHAKKALA-V3 · ONNX RUNTIME · 100% OFFLINE</span>
              </div>

              {/* Bilingual Dual Headlines */}
              <div className="space-y-2">
                <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-bold text-[#1C1D1B] leading-[1.15] tracking-tight">
                  {isRtl ? 'لِلْعَرَبِيَّةِ جَمَالُهَا بِحَرَكَاتِهَا.' : 'Arabic deserves its full expression.'}
                </h1>
                <p className="text-xl sm:text-2xl font-serif text-[#78716C] tracking-normal font-normal">
                  {isRtl ? 'Arabic deserves its full expression.' : 'لِلْعَرَبِيَّةِ جَمَالُهَا بِحَرَكَاتِهَا.'}
                </p>
              </div>

              {/* Core Positioning */}
              <p className="text-base sm:text-lg text-[#57534E] leading-relaxed max-w-xl">
                {isRtl
                  ? 'تشكيل النصوص العربية بالذكاء الاصطناعي على جهازك. يعمل بدون إنترنت بالكامل، بدون رفع للبيانات، وبخصوصية تامة. كلماتك ملكك وحدك.'
                  : 'Arabic diacritization powered by on-device AI. No internet. No uploads. Your text stays yours.'}
              </p>

              {/* Hero Call to Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <a
                  href={APP_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-6 py-3.5 rounded-xl bg-[#1E5E3A] text-white hover:bg-[#16482C] font-semibold text-sm shadow-md hover:shadow-lg active:scale-[0.98] transition-all"
                >
                  <Apple className="w-5 h-5 fill-current" />
                  <div className="text-start">
                    <div className="text-[10px] uppercase font-mono tracking-wider opacity-85 leading-none">
                      {isRtl ? 'تحميل مجاني على' : 'Download on the'}
                    </div>
                    <div className="text-base font-bold leading-tight">App Store</div>
                  </div>
                </a>

                <a
                  href="#demo"
                  className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white border border-[#E7E5E0] text-[#1C1D1B] hover:bg-[#F3F2EE] hover:border-[#D6D3CB] font-semibold text-sm transition-all"
                >
                  <span>{isRtl ? 'جرّب التشكيل الآن' : 'See how it works'}</span>
                  {isRtl ? <ArrowLeft className="w-4 h-4 text-[#78716C]" /> : <ArrowRight className="w-4 h-4 text-[#78716C]" />}
                </a>
              </div>

              {/* Key Trust Signals */}
              <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-[#78716C]">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#1E5E3A]" />
                  <span>{isRtl ? 'أوفلاين بالكامل' : '100% Offline'}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Lock className="w-4 h-4 text-[#1E5E3A]" />
                  <span>{isRtl ? 'خصوصية مطلقة' : 'Zero Data Sent'}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-[#1E5E3A]" />
                  <span>{isRtl ? 'بدون اشتراك أو إعلانات' : 'No Subscriptions or Ads'}</span>
                </div>
              </div>
            </div>

            {/* Visual Device Column (5 cols) */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-[300px] sm:max-w-[320px]">
                {/* Subtle Ambient Glow */}
                <div className="absolute -inset-4 bg-gradient-to-tr from-[#1E5E3A]/10 to-stone-200/40 rounded-[50px] blur-xl opacity-70" />

                {/* iPhone Chassis Frame */}
                <div className="relative rounded-[44px] p-2.5 bg-white border-2 border-[#D6D3CB] shadow-2xl">
                  {/* Dynamic Island Notch */}
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-5 bg-black rounded-full z-20 flex items-center justify-end px-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-stone-900 border border-stone-800" />
                  </div>

                  {/* Inner Screen Display */}
                  <div className="relative aspect-[524/1136] rounded-[34px] overflow-hidden bg-stone-950 border border-stone-800">
                    <img
                      src={getAssetUrl('assets/images/projects/tashkeel/tashkeel-screen-result.webp')}
                      alt="Tashkeel App Diacritization Result"
                      width={320}
                      height={693}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                </div>

                {/* Floating On-Device Badge */}
                <div
                  className={`absolute -bottom-4 ${
                    isRtl ? '-left-3' : '-right-3'
                  } bg-white border border-[#E7E5E0] shadow-lg rounded-xl px-3.5 py-2 flex items-center gap-2 text-xs font-mono`}
                >
                  <Cpu className="w-4 h-4 text-[#1E5E3A]" />
                  <span className="font-semibold text-[#1C1D1B]">ONNX On-Device</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 02 · INTERACTIVE BEFORE & AFTER DEMONSTRATION */}
      {/* ========================================================================= */}
      <section id="demo" className="scroll-mt-20 py-20 md:py-28 bg-white border-b border-[#E7E5E0]">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center max-w-xl mx-auto mb-12 space-y-3">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#1E5E3A]">
              {isRtl ? 'المقارنة التفاعلية' : 'Interactive Demonstration'}
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold text-[#1C1D1B] tracking-tight">
              {isRtl ? 'شاهد الفرق: من نص جاف إلى لغة تنبض بالحياة' : 'See the clarity diacritics bring to Arabic'}
            </h2>
            <p className="text-sm sm:text-base text-[#78716C] leading-relaxed">
              {isRtl
                ? 'الحركات ليست مجرد زينة، بل هي المعنى والإعراب والنطق السليم.'
                : 'Diacritics are not mere ornament; they define meaning, grammar, and correct vocalization.'}
            </p>
          </div>

          {/* Preset Example Selectors */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
            {DEMO_EXAMPLES.map((ex, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedExampleIndex(idx)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  selectedExampleIndex === idx
                    ? 'bg-[#1E5E3A] text-white shadow-xs'
                    : 'bg-[#FBFBFA] border border-[#E7E5E0] text-[#78716C] hover:text-[#1C1D1B] hover:border-[#D6D3CB]'
                }`}
              >
                {isRtl ? ex.titleAr : ex.titleEn}
              </button>
            ))}
          </div>

          {/* Interactive Comparison Card */}
          <div className="rounded-2xl border border-[#E7E5E0] bg-[#FBFBFA] p-6 sm:p-8 shadow-sm">
            {/* Mode Switcher Tabs */}
            <div className="flex items-center justify-between pb-6 border-b border-[#E7E5E0] mb-6 flex-wrap gap-4">
              <div className="inline-flex p-1 rounded-xl bg-white border border-[#E7E5E0] text-xs font-medium">
                <button
                  type="button"
                  onClick={() => setIsVocalizedView(false)}
                  className={`px-4 py-1.5 rounded-lg transition-all ${
                    !isVocalizedView
                      ? 'bg-[#1C1D1B] text-white shadow-xs font-semibold'
                      : 'text-[#78716C] hover:text-[#1C1D1B]'
                  }`}
                >
                  {isRtl ? 'بدون تشكيل (النص الأصلي)' : 'Without Diacritics (Raw)'}
                </button>
                <button
                  type="button"
                  onClick={() => setIsVocalizedView(true)}
                  className={`px-4 py-1.5 rounded-lg transition-all ${
                    isVocalizedView
                      ? 'bg-[#1E5E3A] text-white shadow-xs font-semibold'
                      : 'text-[#78716C] hover:text-[#1C1D1B]'
                  }`}
                >
                  {isRtl ? 'بالتشكيل الكامل (تَشْكِيل)' : 'Fully Vocalized (Tashkeel)'}
                </button>
              </div>

              {/* Copy Action */}
              <button
                type="button"
                onClick={() => handleCopy(isVocalizedView ? currentExample.diacritized : currentExample.raw)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#E7E5E0] bg-white text-xs font-medium text-[#1C1D1B] hover:bg-[#F3F2EE] transition-all"
                title="Copy text to clipboard"
              >
                {copiedText ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#1E5E3A]" />
                    <span className="text-[#1E5E3A]">{isRtl ? 'تم النسخ!' : 'Copied!'}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-[#78716C]" />
                    <span>{isRtl ? 'نسخ النص' : 'Copy Text'}</span>
                  </>
                )}
              </button>
            </div>

            {/* Display Passage Area */}
            <div className="min-h-[140px] flex items-center justify-center p-6 bg-white rounded-xl border border-[#E7E5E0] shadow-inner">
              <p
                dir="rtl"
                className={`text-xl sm:text-2xl md:text-3xl font-serif text-center leading-[2] sm:leading-[2.2] transition-all duration-300 ${
                  isVocalizedView ? 'text-[#1E5E3A]' : 'text-[#57534E]'
                }`}
              >
                {isVocalizedView ? currentExample.diacritized : currentExample.raw}
              </p>
            </div>

            {/* Sub-Card Technical Footnote */}
            <div className="mt-6 pt-4 border-t border-[#E7E5E0] flex items-center justify-between text-xs text-[#78716C] font-mono">
              <span>{isVocalizedView ? '✓ Shakkala v3 Inferred' : '• Raw Unvocalized Input'}</span>
              <span>100% On-Device · Zero Network Latency</span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 03 · HOW IT WORKS (3 Disciplined Steps) */}
      {/* ========================================================================= */}
      <section id="how-it-works" className="scroll-mt-20 py-20 md:py-28 border-b border-[#E7E5E0]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-xl text-start mb-16 space-y-2">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#1E5E3A]">
              {isRtl ? 'خطوات العمل' : 'How It Works'}
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold text-[#1C1D1B] tracking-tight">
              {isRtl ? 'ثلاث خطوات بسيطة لنص عربي مكتمل' : 'Three steps to perfectly vocalized Arabic'}
            </h2>
            <p className="text-sm sm:text-base text-[#78716C]">
              {isRtl
                ? 'تجربة مستخدم مُبسَّطة ومركّزة، تلغي أي تعقيد وتمنحك النتيجة في ثوانٍ.'
                : 'A focused, streamlined user flow designed to eliminate friction.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="p-8 rounded-2xl bg-white border border-[#E7E5E0] space-y-4 hover:border-[#D6D3CB] transition-all shadow-xs">
              <div className="flex items-center justify-between">
                <span className="font-mono text-sm font-bold text-[#1E5E3A] px-2.5 py-1 rounded-md bg-[#EBF4EF]">
                  01
                </span>
                <FileText className="w-5 h-5 text-[#78716C]" />
              </div>
              <h3 className="text-lg font-bold text-[#1C1D1B]">
                {isRtl ? 'اكتب أو الصق النص' : 'Type or Paste Text'}
              </h3>
              <p className="text-sm text-[#78716C] leading-relaxed">
                {isRtl
                  ? 'اكتب النص مباشرة في المحرر، الصقه من الحافظة، أو استورد ملف نصي (.txt) كامل بكل سهولة.'
                  : 'Type directly into the clean editor, paste from your clipboard, or import a complete .txt document.'}
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-8 rounded-2xl bg-white border border-[#E7E5E0] space-y-4 hover:border-[#D6D3CB] transition-all shadow-xs">
              <div className="flex items-center justify-between">
                <span className="font-mono text-sm font-bold text-[#1E5E3A] px-2.5 py-1 rounded-md bg-[#EBF4EF]">
                  02
                </span>
                <Cpu className="w-5 h-5 text-[#78716C]" />
              </div>
              <h3 className="text-lg font-bold text-[#1C1D1B]">
                {isRtl ? 'معالجة محلية بالذكاء الاصطناعي' : 'Process Locally On-Device'}
              </h3>
              <p className="text-sm text-[#78716C] leading-relaxed">
                {isRtl
                  ? 'يقوم نموذج Shakkala v3 عبر محرك ONNX بتحليل سياق الجمل نحويّاً وإعرابياً في أجزاء من الثانية محلياً.'
                  : 'Shakkala v3 model runs via ONNX runtime to analyze context, syntax, and grammar locally in milliseconds.'}
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-8 rounded-2xl bg-white border border-[#E7E5E0] space-y-4 hover:border-[#D6D3CB] transition-all shadow-xs">
              <div className="flex items-center justify-between">
                <span className="font-mono text-sm font-bold text-[#1E5E3A] px-2.5 py-1 rounded-md bg-[#EBF4EF]">
                  03
                </span>
                <Copy className="w-5 h-5 text-[#78716C]" />
              </div>
              <h3 className="text-lg font-bold text-[#1C1D1B]">
                {isRtl ? 'انسخ أو شارك النتيجة' : 'Copy or Share Output'}
              </h3>
              <p className="text-sm text-[#78716C] leading-relaxed">
                {isRtl
                  ? 'احصل على النص مع الحركات كاملة، انسخه بنقرة واحدة، أو احفظه وشاركه مباشرة عبر تطبيقاتك.'
                  : 'Obtain the fully vocalized passage with pristine diacritics, copy with a tap, or share to other apps.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 04 · OFFLINE & PRIVACY COMMITMENT (Architectural Facts) */}
      {/* ========================================================================= */}
      <section id="privacy" className="scroll-mt-20 py-20 md:py-28 bg-[#18231C] text-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-2xl text-start mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-mono text-emerald-300">
              <WifiOff className="w-3.5 h-3.5" />
              <span>OFFLINE FIRST · PRIVACY ASSURED</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white">
              {isRtl ? 'خصوصية نصوصك ليست ميزة إضافية، بل أساس البناء' : 'Your text stays yours. By architectural design.'}
            </h2>
            <p className="text-sm sm:text-base text-stone-300 leading-relaxed">
              {isRtl
                ? 'في زمن تصدير كل بيانات المستخدمين إلى السحاب، بُني تَشْكِيل ليعمل باستقلالية تامة على عتاد هاتفك.'
                : 'In an era where personal data is constantly funneled to cloud servers, Tashkeel operates completely within your device hardware.'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-3">
              <Cpu className="w-6 h-6 text-emerald-400" />
              <h3 className="font-bold text-base text-white">
                {isRtl ? 'نموذج محلي مدمج' : 'Embedded On-Device Model'}
              </h3>
              <p className="text-xs text-stone-300 leading-relaxed">
                {isRtl
                  ? 'نموذج Shakkala v3 مدمج بالكامل داخل حزمة التطبيق بحجم مدروس لا يتجاوز 69 ميجابايت.'
                  : 'Shakkala v3 model is bundled inside the app binary (~68.7MB) and runs using ONNX.'}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-3">
              <WifiOff className="w-6 h-6 text-emerald-400" />
              <h3 className="font-bold text-base text-white">
                {isRtl ? 'بدون إنترنت' : 'Zero Network Requests'}
              </h3>
              <p className="text-xs text-stone-300 leading-relaxed">
                {isRtl
                  ? 'لا يرسل التطبيق أي طلبات شبكة أثناء المعالجة، ويعمل بكفاءة كاملة في وضع الطيران.'
                  : 'The app initiates zero outbound HTTP requests for text processing, working seamlessly in airplane mode.'}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-3">
              <Lock className="w-6 h-6 text-emerald-400" />
              <h3 className="font-bold text-base text-white">
                {isRtl ? 'بدون حسابات أو تسجيل' : 'Zero Account Requirement'}
              </h3>
              <p className="text-xs text-stone-300 leading-relaxed">
                {isRtl
                  ? 'لا نطلب بريدك الإلكتروني، لا تسجيل دخول، ولا جمع لأي ملفات تعريف ارتباط أو تتبّع.'
                  : 'No account creation, no email signups, and zero user telemetry or behavioral tracking.'}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-3">
              <History className="w-6 h-6 text-emerald-400" />
              <h3 className="font-bold text-base text-white">
                {isRtl ? 'حفظ محلي آمن' : 'Encrypted Local Storage'}
              </h3>
              <p className="text-xs text-stone-300 leading-relaxed">
                {isRtl
                  ? 'تُحفظ نصوص السجل على مساحة التخزين الداخلية لهاتفك فقط، ولا يمكن لأي طرف ثالث الوصول إليها.'
                  : 'All diacritization history is saved strictly to your local device sandbox and never synchronized externally.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 05 · PRODUCT SHOWCASE (Real Screenshots Carousel/Tabs) */}
      {/* ========================================================================= */}
      <section id="showcase" className="scroll-mt-20 py-20 md:py-28 bg-white border-b border-[#E7E5E0]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-xl text-start mb-12 space-y-2">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#1E5E3A]">
              {isRtl ? 'واجهات التطبيق الحقيقية' : 'Production Screenshots'}
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold text-[#1C1D1B] tracking-tight">
              {isRtl ? 'تصميم راقٍ يُكرّم جمال لغة الضاد' : 'Crafted with discipline and typographic care'}
            </h2>
            <p className="text-sm sm:text-base text-[#78716C]">
              {isRtl
                ? 'واجهة تفاعلية مصممة خصيصاً للباحثين والطلاب والكتّاب.'
                : 'A clean interface tuned specifically for writers, scholars, and language enthusiasts.'}
            </p>
          </div>

          {/* Tab Controls */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 border-b border-[#E7E5E0]">
            {SHOWCASE_SLIDES.map((slide, idx) => {
              const IconComp = slide.icon;
              const isActive = activeSlideIndex === idx;
              return (
                <button
                  key={slide.id}
                  type="button"
                  onClick={() => setActiveSlideIndex(idx)}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-[#1E5E3A] text-white shadow-xs'
                      : 'bg-[#FBFBFA] border border-[#E7E5E0] text-[#78716C] hover:text-[#1C1D1B] hover:border-[#D6D3CB]'
                  }`}
                >
                  <IconComp className="w-3.5 h-3.5" />
                  <span>{isRtl ? slide.tabTitleAr : slide.tabTitleEn}</span>
                </button>
              );
            })}
          </div>

          {/* Active Screen Spread */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center bg-[#FBFBFA] rounded-3xl p-6 sm:p-10 border border-[#E7E5E0]">
            {/* Description (7 cols) */}
            <div className="lg:col-span-7 space-y-4 text-start">
              <span className="text-xs font-mono font-semibold text-[#1E5E3A] px-2.5 py-1 rounded bg-[#EBF4EF]">
                SCREEN 0{activeSlideIndex + 1} / 04
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-[#1C1D1B] tracking-tight">
                {isRtl ? activeSlide.headlineAr : activeSlide.headlineEn}
              </h3>
              <p className="text-base text-[#57534E] leading-relaxed max-w-lg">
                {isRtl ? activeSlide.descAr : activeSlide.descEn}
              </p>
              <div className="pt-4 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setActiveSlideIndex((prev) => (prev > 0 ? prev - 1 : SHOWCASE_SLIDES.length - 1))}
                  className="p-2.5 rounded-lg border border-[#E7E5E0] bg-white text-[#1C1D1B] hover:bg-[#F3F2EE] transition-all"
                  aria-label="Previous screenshot"
                >
                  <ArrowRight className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} />
                </button>
                <button
                  type="button"
                  onClick={() => setActiveSlideIndex((prev) => (prev < SHOWCASE_SLIDES.length - 1 ? prev + 1 : 0))}
                  className="p-2.5 rounded-lg border border-[#E7E5E0] bg-white text-[#1C1D1B] hover:bg-[#F3F2EE] transition-all"
                  aria-label="Next screenshot"
                >
                  <ArrowLeft className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} />
                </button>
              </div>
            </div>

            {/* Realistic iPhone Showcase (5 cols) */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-[260px] sm:max-w-[280px]">
                <div className="relative rounded-[40px] p-2 bg-white border-2 border-[#D6D3CB] shadow-xl">
                  {/* Notch */}
                  <div className="absolute top-3.5 left-1/2 -translate-x-1/2 w-20 h-4 bg-black rounded-full z-20 flex items-center justify-end px-2">
                    <div className="w-2 h-2 rounded-full bg-stone-900" />
                  </div>

                  <div className="relative aspect-[524/1136] rounded-[32px] overflow-hidden bg-stone-950 border border-stone-800">
                    <img
                      src={getAssetUrl(activeSlide.image)}
                      alt={isRtl ? activeSlide.tabTitleAr : activeSlide.tabTitleEn}
                      width={280}
                      height={606}
                      className="w-full h-full object-cover object-top transition-opacity duration-300"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 06 · FREQUENTLY ASKED QUESTIONS (FAQ) */}
      {/* ========================================================================= */}
      <section id="faq" className="scroll-mt-20 py-20 md:py-28 border-b border-[#E7E5E0]">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-16 space-y-2">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#1E5E3A]">
              {isRtl ? 'الأسئلة الشائعة' : 'Frequently Asked Questions'}
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold text-[#1C1D1B] tracking-tight">
              {isRtl ? 'كل ما تحتاج معرفته عن تَشْكِيل' : 'Everything you need to know about Tashkeel'}
            </h2>
          </div>

          <div className="space-y-4 text-start">
            {FAQS.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="rounded-2xl border border-[#E7E5E0] bg-white overflow-hidden transition-all shadow-xs"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full p-6 text-start flex items-center justify-between gap-4 font-bold text-base text-[#1C1D1B] hover:text-[#1E5E3A] transition-colors"
                  >
                    <span>{isRtl ? faq.questionAr : faq.questionEn}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#78716C] transition-transform duration-200 shrink-0 ${
                        isOpen ? 'rotate-180 text-[#1E5E3A]' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 pt-0 text-sm text-[#57534E] leading-relaxed border-t border-[#F3F2EE] mt-2 pt-4">
                      {isRtl ? faq.answerAr : faq.answerEn}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 07 · FINAL CALL TO ACTION (CTA) */}
      {/* ========================================================================= */}
      <section className="py-20 md:py-32 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-8">
          <div className="w-20 h-20 rounded-2xl overflow-hidden border border-[#E7E5E0] shadow-md bg-white p-1 mx-auto">
            <img
              src={getAssetUrl('assets/images/projects/tashkeel/tashkeel-icon.webp')}
              alt="Tashkeel App Icon"
              width={80}
              height={80}
              className="w-full h-full object-cover rounded-xl"
            />
          </div>

          <div className="space-y-3 max-w-xl mx-auto">
            <h2 className="text-3xl sm:text-5xl font-bold text-[#1C1D1B] tracking-tight">
              {isRtl ? 'حمّل تَشْكِيل الآن مجاناً' : 'Get Tashkeel on the App Store'}
            </h2>
            <p className="text-base text-[#78716C] leading-relaxed">
              {isRtl
                ? 'متاح لأجهزة iPhone و iPad التي تعمل بنظام iOS 15.0 أو أحدث. بدون اشتراك، وبدون إعلانات.'
                : 'Available for iPhone and iPad on iOS 15.0 or later. Free, private, and 100% offline.'}
            </p>
          </div>

          <div className="flex justify-center">
            <a
              href={APP_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-[#1E5E3A] text-white hover:bg-[#16482C] font-semibold text-base shadow-lg hover:shadow-xl active:scale-[0.98] transition-all"
            >
              <Apple className="w-6 h-6 fill-current" />
              <div className="text-start">
                <div className="text-[10px] uppercase font-mono tracking-wider opacity-85 leading-none">
                  {isRtl ? 'تنزيل مجاني من' : 'Download on the'}
                </div>
                <div className="text-lg font-bold leading-tight">Apple App Store</div>
              </div>
            </a>
          </div>

          <div className="pt-4 text-xs font-mono text-[#78716C] flex items-center justify-center gap-4">
            <span>VERSION 1.0.1</span>
            <span>·</span>
            <span>ID: 6827159466</span>
            <span>·</span>
            <span>BUNDLE: com.ziad.tashkeel</span>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 08 · FOOTER */}
      {/* ========================================================================= */}
      <footer className="border-t border-[#E7E5E0] bg-[#FBFBFA] py-12 text-xs text-[#78716C]">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <span className="font-semibold text-[#1C1D1B]">
              {isRtl ? 'تَشْكِيل' : 'Tashkeel'}
            </span>
            <span>—</span>
            <span>
              {isRtl
                ? 'تطبيق تشكيل النصوص العربية بالذكاء الاصطناعي المحلي'
                : 'On-device Arabic diacritization app'}
            </span>
          </div>

          <div className="flex items-center gap-6">
            <Link
              to="/"
              className="text-[#1E5E3A] hover:underline font-medium inline-flex items-center gap-1"
            >
              <span>{isRtl ? 'ملف المطور (زياد وائل)' : 'Zyad Wael Portfolio'}</span>
              <ExternalLink className="w-3 h-3" />
            </Link>

            <a
              href={APP_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#1C1D1B] transition-colors"
            >
              {isRtl ? 'صفحة التطبيق' : 'App Store Page'}
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default TashkeelLanding;
