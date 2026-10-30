import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Apple,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  ShieldCheck,
  Compass,
  Clock,
  BookOpen,
  Radio,
  Share2,
  Layout,
  CheckCircle2,
  QrCode,
  ArrowLeft,
  Star,
  ChevronDown,
  ChevronUp,
  Volume2,
  Smartphone,
  Heart,
  Mail,
  Zap,
} from 'lucide-react';
import ufuqIcon from '@/assets/ufuq-icon.png';

interface ScreenshotData {
  id: string;
  title: string;
  arabicTitle: string;
  caption: string;
  file: string;
}

const SCREENSHOTS: ScreenshotData[] = [
  {
    id: 's1',
    title: 'Daily Athkar & Subha',
    arabicTitle: 'أذكار الصباح والمساء وحصن المسلم',
    caption: 'Hisn al-Muslim supplications with tactile haptic digital tasbih',
    file: 'assets/images/projects/ufuq/ufuq-screen-1.jpg',
  },
  {
    id: 's2',
    title: 'Holy Quran Reader',
    arabicTitle: 'القرآن الكريم بخط عثماني أصيل',
    caption: 'Medina Uthmani script with reading bookmarks and offline SQLite',
    file: 'assets/images/projects/ufuq/ufuq-screen-2.jpg',
  },
  {
    id: 's3',
    title: '24/7 Live Quran Radio',
    arabicTitle: 'إذاعة القرآن الكريم - بث مباشر',
    caption: 'Continuous live audio streams from Makkah and Cairo in background',
    file: 'assets/images/projects/ufuq/ufuq-screen-3.jpg',
  },
  {
    id: 's4',
    title: 'Astronomical Prayer Times',
    arabicTitle: 'مواقيت الصلاة الدقيقة والعد التنازلي',
    caption: 'Precise GPS solar calculations with upcoming prayer countdown',
    file: 'assets/images/projects/ufuq/ufuq-screen-4.jpg',
  },
  {
    id: 's5',
    title: 'Magnetic Qibla Compass',
    arabicTitle: 'بوصلة القبلة مع مستشعر الاتجاه',
    caption: 'Hardware magnetometer heading with 3-axis tilt compensation',
    file: 'assets/images/projects/ufuq/ufuq-screen-5.jpg',
  },
  {
    id: 's6',
    title: 'iOS Dynamic Widgets',
    arabicTitle: 'ودجات الشاشة الرئيسية وشاشة القفل',
    caption: 'Glanceable prayer countdowns engineered with native WidgetKit',
    file: 'assets/images/projects/ufuq/ufuq-screen-6.jpg',
  },
  {
    id: 's7',
    title: 'Ayah Card Studio',
    arabicTitle: 'تصميم بطاقات الآيات ومشاركتها',
    caption: 'Curated typography and aesthetic backgrounds for social sharing',
    file: 'assets/images/projects/ufuq/ufuq-screen-7.jpg',
  },
];

interface FAQItem {
  q: string;
  arabicQ: string;
  a: string;
}

const FAQS: FAQItem[] = [
  {
    q: 'Is Ufuq completely free and ad-free?',
    arabicQ: 'هل تطبيق أفق مجاني وخالٍ تماماً من الإعلانات؟',
    a: 'Yes, Ufuq is 100% free with zero ads, zero in-app purchases, and no subscription paywalls. It was engineered purely for spiritual focus and peace of mind.',
  },
  {
    q: 'Does Ufuq work offline without an internet connection?',
    arabicQ: 'هل يعمل التطبيق بدون اتصال بالإنترنت؟',
    a: 'Yes! The entire Holy Quran text, Hisn al-Muslim Athkar, and prayer calculations are stored in an offline SQLite database on your device and work seamlessly with zero internet. Only live audio radio streaming requires internet.',
  },
  {
    q: 'How are prayer times calculated?',
    arabicQ: 'كيف يتم حساب مواقيت الصلاة؟',
    a: 'Ufuq uses sub-second astronomical GPS solar algorithms supporting internationally recognized calculation conventions, including Umm Al-Qura (Makkah), Egyptian General Authority of Survey, Muslim World League (MWL), and ISNA.',
  },
  {
    q: 'Can I listen to Quran Radio with my screen locked?',
    arabicQ: 'هل يمكن الاستماع لإذاعة القرآن الكريم أثناء قفل الشاشة؟',
    a: 'Yes, Ufuq is engineered with decoupled background audio isolates and native iOS lock-screen media player controls, allowing continuous listening while multitasking or with your phone locked.',
  },
  {
    q: 'Does Ufuq track my location or collect private data?',
    arabicQ: 'هل يقوم التطبيق بجمع أو تتبع بيانات موقعي؟',
    a: 'No. Your GPS coordinates are processed exclusively on-device to compute local prayer times and Qibla heading. Zero location coordinates or user data are ever stored or transmitted to external servers.',
  },
];

export const UfuqShowcasePage: React.FC = () => {
  const [activeScreenIndex, setActiveScreenIndex] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [showQrModal, setShowQrModal] = useState(false);

  const appStoreUrl = 'https://apps.apple.com/id/app/ufuq/id6821979552';

  const getAssetUrl = (path: string) => {
    const base = import.meta.env.BASE_URL || '/';
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;
    return `${base}${cleanPath}`;
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        setActiveScreenIndex((prev) => (prev + 1) % SCREENSHOTS.length);
      } else if (e.key === 'ArrowLeft') {
        setActiveScreenIndex((prev) => (prev - 1 + SCREENSHOTS.length) % SCREENSHOTS.length);
      } else if (e.key === 'Escape' && showQrModal) {
        setShowQrModal(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showQrModal]);

  return (
    <div className="min-h-screen bg-[#0A0D12] text-slate-100 font-sans selection:bg-emerald-500 selection:text-black antialiased overflow-x-hidden">
      {/* Ambient Radial Mesh Gradients */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full bg-emerald-500/15 blur-[160px]" />
        <div className="absolute top-[35%] -right-20 w-[600px] h-[600px] rounded-full bg-teal-500/10 blur-[180px]" />
        <div className="absolute bottom-10 -left-20 w-[600px] h-[600px] rounded-full bg-emerald-600/10 blur-[180px]" />
      </div>

      {/* ========================================================================= */}
      {/* 1. FLOATING NAVIGATION BAR (AppLaunchFlow Style) */}
      {/* ========================================================================= */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#0A0D12]/80 border-b border-white/10 transition-all">
        <div className="container max-w-6xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between">
          {/* Left: Back to Portfolio & App Brand */}
          <div className="flex items-center gap-3 sm:gap-4">
            <Link
              to="/"
              className="touch-target inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs font-mono text-slate-300 hover:text-emerald-400 transition-colors"
              title="Return to Zyad Wael Portfolio"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Portfolio</span>
            </Link>

            <div className="h-5 w-px bg-white/10" />

            {/* App Brand */}
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl overflow-hidden border border-emerald-500/30 shadow-md shadow-emerald-500/10 shrink-0 bg-slate-900">
                <img
                  src={ufuqIcon}
                  alt="Ufuq App Icon"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-start">
                <div className="flex items-center gap-1.5">
                  <span className="font-serif text-base sm:text-lg font-bold text-white tracking-tight">
                    Ufuq
                  </span>
                  <span className="text-emerald-400 font-sans text-xs font-medium">أفق</span>
                </div>
                <span className="text-[10px] font-mono text-slate-400 block -mt-0.5">
                  iOS Spiritual Companion
                </span>
              </div>
            </div>
          </div>

          {/* Center Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-6 font-mono text-xs text-slate-400">
            <a href="#features" className="hover:text-emerald-400 transition-colors">Features</a>
            <a href="#screenshots" className="hover:text-emerald-400 transition-colors">Screenshots</a>
            <a href="#faq" className="hover:text-emerald-400 transition-colors">FAQ</a>
            <a href="mailto:ziad.w.khedr@gmail.com" className="hover:text-emerald-400 transition-colors">Support</a>
          </nav>

          {/* Right CTA */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowQrModal(true)}
              className="touch-target p-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-slate-300 hover:text-emerald-400 transition-colors"
              title="Scan QR Code to open on iPhone"
              aria-label="Scan QR Code"
            >
              <QrCode className="w-4 h-4" />
            </button>

            <a
              href={appStoreUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-tactile touch-target inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white hover:bg-slate-200 text-slate-950 font-mono text-xs font-bold shadow-lg transition-all"
            >
              <Apple className="w-4 h-4 fill-current" />
              <span>Download</span>
            </a>
          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 2. HERO SECTION (AppLaunchFlow High-Converting Hero) */}
      {/* ========================================================================= */}
      <section className="relative z-10 pt-16 sm:pt-20 pb-16 md:pb-24 text-center">
        <div className="container max-w-5xl mx-auto px-4 sm:px-6">
          {/* Eyebrow / Social Proof Rating */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md mb-6">
            <div className="flex items-center text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-current" />
              ))}
            </div>
            <span className="text-xs font-mono font-semibold text-slate-300">
              4.9 on Apple App Store
            </span>
            <span className="text-slate-600">·</span>
            <span className="text-xs font-mono text-emerald-400 font-medium">100% Ad-Free</span>
          </div>

          {/* Main Headline */}
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-6 leading-[1.15] max-w-4xl mx-auto">
            Your Daily Spiritual Companion for{' '}
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-200 bg-clip-text text-transparent">
              Worship &amp; Serenity.
            </span>
          </h1>

          {/* Arabic Subtitle */}
          <p
            dir="rtl"
            className="text-xl sm:text-2xl text-emerald-300/90 font-serif font-medium mb-6 leading-relaxed"
          >
            رفيقك اليومي للعبادة والطاعة بتصميم إسلامي هادئ وعصري
          </p>

          {/* English Narrative */}
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-300 font-sans leading-relaxed mb-8">
            Accurate GPS prayer times with live countdown, complete Holy Quran in authentic Uthmani script, 24/7 live Quran radio, daily Hisn al-Muslim Athkar with tactile Subha, and a calibrated Qibla compass. Completely free and ad-free.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
            <a
              href={appStoreUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-tactile touch-target inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-white hover:bg-slate-200 text-slate-950 font-mono text-sm font-bold shadow-xl shadow-white/10 transition-all scale-100 hover:scale-105"
            >
              <Apple className="w-5 h-5 fill-current" />
              <span>Download on the App Store</span>
            </a>

            <button
              type="button"
              onClick={() => setShowQrModal(true)}
              className="btn-tactile touch-target inline-flex items-center gap-2 px-5 py-3.5 rounded-2xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 font-mono text-sm text-white transition-colors"
            >
              <QrCode className="w-4 h-4 text-emerald-400" />
              <span>Scan QR Code</span>
            </button>
          </div>

          {/* ===================================================================== */}
          {/* HERO DEVICE PRESENTATION (Centerpiece Phone with Floating Pills) */}
          {/* ===================================================================== */}
          <div className="relative max-w-sm sm:max-w-md mx-auto pt-4">
            {/* Ambient Device Glow */}
            <div className="absolute inset-0 bg-emerald-500/20 blur-[100px] rounded-full pointer-events-none" />

            {/* Floating Feature Tag 1 (Top Left) */}
            <div className="hidden sm:flex absolute -left-16 top-16 items-center gap-2 px-3.5 py-2 rounded-2xl bg-[#0F141C]/90 border border-white/15 backdrop-blur-md shadow-xl text-start z-30">
              <span className="text-base">📖</span>
              <div>
                <span className="text-xs font-bold text-white block">Offline Quran</span>
                <span className="text-[10px] font-mono text-emerald-400">Authentic Uthmani</span>
              </div>
            </div>

            {/* Floating Feature Tag 2 (Top Right) */}
            <div className="hidden sm:flex absolute -right-16 top-28 items-center gap-2 px-3.5 py-2 rounded-2xl bg-[#0F141C]/90 border border-white/15 backdrop-blur-md shadow-xl text-start z-30">
              <span className="text-base">📻</span>
              <div>
                <span className="text-xs font-bold text-white block">24/7 Live Radio</span>
                <span className="text-[10px] font-mono text-emerald-400">Makkah &amp; Cairo</span>
              </div>
            </div>

            {/* Floating Feature Tag 3 (Bottom Left) */}
            <div className="hidden sm:flex absolute -left-20 bottom-28 items-center gap-2 px-3.5 py-2 rounded-2xl bg-[#0F141C]/90 border border-white/15 backdrop-blur-md shadow-xl text-start z-30">
              <span className="text-base">⏱️</span>
              <div>
                <span className="text-xs font-bold text-white block">Astronomical GPS</span>
                <span className="text-[10px] font-mono text-emerald-400">Live Countdown</span>
              </div>
            </div>

            {/* Floating Feature Tag 4 (Bottom Right) */}
            <div className="hidden sm:flex absolute -right-16 bottom-20 items-center gap-2 px-3.5 py-2 rounded-2xl bg-[#0F141C]/90 border border-white/15 backdrop-blur-md shadow-xl text-start z-30">
              <span className="text-base">🛡️</span>
              <div>
                <span className="text-xs font-bold text-white block">Zero Ads</span>
                <span className="text-[10px] font-mono text-emerald-400">100% Private</span>
              </div>
            </div>

            {/* The iPhone 18 Mockup */}
            <div className="relative z-20 w-[290px] sm:w-[320px] md:w-[340px] h-[610px] sm:h-[670px] md:h-[710px] mx-auto rounded-[50px] bg-gradient-to-b from-slate-700 via-slate-800 to-slate-900 p-2.5 border border-white/20 shadow-2xl">
              <div className="w-full h-full rounded-[42px] bg-black overflow-hidden relative border border-slate-800 flex flex-col">
                {/* Top Dynamic Island */}
                <div className="absolute top-2.5 inset-x-0 z-40 flex justify-center pointer-events-none">
                  <div className="w-24 h-5 rounded-full bg-black border border-white/10 flex items-center justify-between px-2.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[9px] font-mono text-emerald-400">أفق Ufuq</span>
                  </div>
                </div>

                {/* Hero Screen Image */}
                <img
                  src={getAssetUrl('assets/images/projects/ufuq/ufuq-screen-1.jpg')}
                  alt="Ufuq App Interface"
                  className="w-full h-full object-cover"
                />

                {/* Bottom Bar Indicator */}
                <div className="absolute bottom-2 inset-x-0 flex justify-center pointer-events-none">
                  <div className="w-28 h-1 rounded-full bg-white/70" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. SCREENSHOTS SHOWCASE TRACK (AppLaunchFlow Gallery) */}
      {/* ========================================================================= */}
      <section id="screenshots" className="relative z-10 py-16 md:py-24 border-t border-white/10 bg-[#080B0F]">
        <div className="container max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-mono font-semibold uppercase tracking-widest text-emerald-400 block mb-2">
              App Store Screenshot Showcase
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Designed for Daily Spiritual Serenity
            </h2>
            <p className="text-sm md:text-base text-slate-400 mt-2">
              Browse through the 7 authentic iOS interface screens shipped on the Apple App Store.
            </p>
          </div>

          {/* Screenshot Pills */}
          <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
            {SCREENSHOTS.map((s, idx) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setActiveScreenIndex(idx)}
                className={`touch-target shrink-0 px-3.5 py-2 rounded-xl text-xs font-mono transition-all border ${
                  activeScreenIndex === idx
                    ? 'bg-white text-slate-950 font-bold border-white shadow-lg'
                    : 'bg-white/[0.04] text-slate-400 hover:text-white border-white/10'
                }`}
              >
                <span>{idx + 1}. {s.title}</span>
              </button>
            ))}
          </div>

          {/* Active Screen Display (Featured Card) */}
          <div className="max-w-4xl mx-auto rounded-3xl bg-white/[0.02] border border-white/10 p-6 md:p-10 shadow-2xl grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Screen Mockup (5 cols) */}
            <div className="md:col-span-5 flex justify-center">
              <div className="w-[240px] sm:w-[260px] h-[510px] sm:h-[550px] rounded-[44px] bg-slate-800 p-2 border border-white/20 shadow-2xl overflow-hidden relative">
                <img
                  src={getAssetUrl(SCREENSHOTS[activeScreenIndex].file)}
                  alt={SCREENSHOTS[activeScreenIndex].title}
                  className="w-full h-full object-cover rounded-[36px]"
                />
              </div>
            </div>

            {/* Details (7 cols) */}
            <div className="md:col-span-7 text-start space-y-4">
              <span className="text-xs font-mono px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold inline-block">
                Screen {activeScreenIndex + 1} of {SCREENSHOTS.length}
              </span>

              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                {SCREENSHOTS[activeScreenIndex].title}
              </h3>

              <p
                dir="rtl"
                className="font-serif text-lg text-emerald-300/90 leading-relaxed"
              >
                {SCREENSHOTS[activeScreenIndex].arabicTitle}
              </p>

              <p className="text-sm text-slate-300 font-sans leading-relaxed">
                {SCREENSHOTS[activeScreenIndex].caption}
              </p>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      setActiveScreenIndex((prev) => (prev - 1 + SCREENSHOTS.length) % SCREENSHOTS.length)
                    }
                    className="touch-target p-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-slate-300 hover:text-white transition-colors"
                    aria-label="Previous screenshot"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setActiveScreenIndex((prev) => (prev + 1) % SCREENSHOTS.length)
                    }
                    className="touch-target p-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-slate-300 hover:text-white transition-colors"
                    aria-label="Next screenshot"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>

                <a
                  href={appStoreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-400 hover:underline"
                >
                  <span>Download on App Store</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. ALTERNATING FEATURE SECTIONS (AppLaunchFlow Signature Style) */}
      {/* ========================================================================= */}
      <section id="features" className="relative z-10 py-16 md:py-24">
        <div className="container max-w-6xl mx-auto px-4 sm:px-6 space-y-20 md:space-y-32">
          {/* Feature Block 1: Offline Holy Quran */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="md:col-span-6 order-2 md:order-1 text-start space-y-4">
              <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest font-semibold flex items-center gap-1.5">
                <BookOpen className="w-4 h-4" />
                <span>Holy Quran in Medina Script</span>
              </span>
              <h3 className="font-serif text-3xl font-bold text-white tracking-tight">
                Authentic Medina Uthmani Script with Zero Internet Required
              </h3>
              <p
                dir="rtl"
                className="font-serif text-lg text-emerald-300/90 leading-relaxed"
              >
                القرآن الكريم كاملاً بخط عثماني أصيل مع فواصل القراءة وحفظ العلامات بدون أي اتصال بالإنترنت
              </p>
              <p className="text-slate-400 text-sm leading-relaxed font-sans">
                Read the entire Holy Quran rendered in high-definition Medina Uthmani typography. Backed by an offline-first SQLite database that hydrates verses instantly with zero loading delay. Save reading bookmarks, track reading progress, and switch between light and eye-comfort dark palettes.
              </p>
            </div>
            <div className="md:col-span-6 order-1 md:order-2 flex justify-center">
              <div className="w-[250px] sm:w-[280px] h-[530px] sm:h-[590px] rounded-[44px] bg-slate-800 p-2 border border-white/15 shadow-2xl overflow-hidden">
                <img
                  src={getAssetUrl('assets/images/projects/ufuq/ufuq-screen-2.jpg')}
                  alt="Holy Quran Reader"
                  className="w-full h-full object-cover rounded-[36px]"
                />
              </div>
            </div>
          </div>

          {/* Feature Block 2: 24/7 Live Radio */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="md:col-span-6 order-1 flex justify-center">
              <div className="w-[250px] sm:w-[280px] h-[530px] sm:h-[590px] rounded-[44px] bg-slate-800 p-2 border border-white/15 shadow-2xl overflow-hidden">
                <img
                  src={getAssetUrl('assets/images/projects/ufuq/ufuq-screen-3.jpg')}
                  alt="Holy Quran Radio Stream"
                  className="w-full h-full object-cover rounded-[36px]"
                />
              </div>
            </div>
            <div className="md:col-span-6 order-2 text-start space-y-4">
              <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest font-semibold flex items-center gap-1.5">
                <Radio className="w-4 h-4" />
                <span>24/7 Live Audio Streaming</span>
              </span>
              <h3 className="font-serif text-3xl font-bold text-white tracking-tight">
                Continuous Recitations from Makkah Al-Mukarramah &amp; Cairo
              </h3>
              <p
                dir="rtl"
                className="font-serif text-lg text-emerald-300/90 leading-relaxed"
              >
                استماع مباشر لإذاعة القرآن الكريم على مدار الساعة مع دعم كامل للتشغيل في الخلفية وشاشة القفل
              </p>
              <p className="text-slate-400 text-sm leading-relaxed font-sans">
                Stream authentic Quranic recitations and religious broadcasts in crystal-clear AAC audio. Built with decoupled background audio isolates, allowing audio to keep playing uninterrupted when browsing other apps or when your iPhone screen is locked.
              </p>
            </div>
          </div>

          {/* Feature Block 3: Astronomical GPS Prayer Times */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="md:col-span-6 order-2 md:order-1 text-start space-y-4">
              <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest font-semibold flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                <span>Astronomical GPS Precision</span>
              </span>
              <h3 className="font-serif text-3xl font-bold text-white tracking-tight">
                Sub-Second Prayer Calculations with Live Countdown
              </h3>
              <p
                dir="rtl"
                className="font-serif text-lg text-emerald-300/90 leading-relaxed"
              >
                مواقيت صلاة دقيقة مع عد تنازلي حي لكل صلاة بناءً على الإحداثيات الجغرافية وزوايا الشفق
              </p>
              <p className="text-slate-400 text-sm leading-relaxed font-sans">
                Calculates Fajr, Dhuhr, Asr, Maghrib, and Isha with astronomical precision based on your exact geolocation. Supports customizable calculation methods (Umm Al-Qura, Egyptian Authority, MWL, ISNA) and sends timely, battery-friendly Adhan notifications.
              </p>
            </div>
            <div className="md:col-span-6 order-1 md:order-2 flex justify-center">
              <div className="w-[250px] sm:w-[280px] h-[530px] sm:h-[590px] rounded-[44px] bg-slate-800 p-2 border border-white/15 shadow-2xl overflow-hidden">
                <img
                  src={getAssetUrl('assets/images/projects/ufuq/ufuq-screen-4.jpg')}
                  alt="Astronomical Prayer Times"
                  className="w-full h-full object-cover rounded-[36px]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. APP VALUE PILLARS (AppLaunchFlow 4-Grid) */}
      {/* ========================================================================= */}
      <section className="relative z-10 py-16 border-y border-white/10 bg-[#080B0F]">
        <div className="container max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-start">
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="font-serif text-lg font-bold text-white">100% Ad-Free</h4>
              <p className="text-xs text-slate-400 font-sans leading-relaxed">
                Zero distracting banner ads, zero popups, zero sponsored interruptions. Sacred worship deserves complete peace of mind.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400">
                <BookOpen className="w-5 h-5" />
              </div>
              <h4 className="font-serif text-lg font-bold text-white">Offline-First SQLite</h4>
              <p className="text-xs text-slate-400 font-sans leading-relaxed">
                Full Holy Quran text, bookmarks, and Hisn al-Muslim supplications are stored directly on your phone. Works with zero internet.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <Radio className="w-5 h-5" />
              </div>
              <h4 className="font-serif text-lg font-bold text-white">Background Audio</h4>
              <p className="text-xs text-slate-400 font-sans leading-relaxed">
                Live Islamic radio continues playing when multitasking or when your screen is locked with native lock-screen media controls.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400">
                <Compass className="w-5 h-5" />
              </div>
              <h4 className="font-serif text-lg font-bold text-white">Tilt-Calibrated Qibla</h4>
              <p className="text-xs text-slate-400 font-sans leading-relaxed">
                Hardware 3-axis magnetometer sensor fusion with tilt compensation directs you straight to the Holy Kaaba wherever you travel.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. FAQ ACCORDION (AppLaunchFlow Standard Pattern) */}
      {/* ========================================================================= */}
      <section id="faq" className="relative z-10 py-16 md:py-24">
        <div className="container max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="text-xs font-mono font-semibold uppercase tracking-widest text-emerald-400 block mb-2">
              Frequently Asked Questions
            </span>
            <h2 className="font-serif text-3xl font-bold text-white tracking-tight">
              Everything You Need to Know
            </h2>
          </div>

          <div className="space-y-3 text-start">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl bg-white/[0.02] border border-white/10 overflow-hidden transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-5 text-start flex items-center justify-between gap-4 font-serif text-base font-bold text-white hover:text-emerald-400 transition-colors"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-emerald-400 shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 space-y-2 text-sm text-slate-300 font-sans leading-relaxed border-t border-white/[0.06] animate-fadeIn">
                      <p dir="rtl" className="font-serif text-emerald-300/90 text-sm">
                        {faq.arabicQ}
                      </p>
                      <p>{faq.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. APP STORE CALL TO ACTION & QR CODE BANNER */}
      {/* ========================================================================= */}
      <section className="relative z-10 py-16 md:py-24 text-center">
        <div className="container max-w-4xl mx-auto px-4 sm:px-6">
          <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-white/[0.04] to-emerald-950/30 border border-emerald-500/30 shadow-2xl relative overflow-hidden">
            <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-emerald-500/40 p-1 mx-auto mb-6 shadow-xl">
              <img src={ufuqIcon} alt="Ufuq App" className="w-full h-full object-cover rounded-xl" />
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-white mb-3">
              Download Ufuq for iOS
            </h2>
            <p className="font-sans text-slate-300 text-sm sm:text-base max-w-lg mx-auto mb-8">
              Available now on the Apple App Store for iPhone &amp; iPad. Completely free, ad-free, and respectful of your privacy.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href={appStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-tactile touch-target inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-white hover:bg-slate-200 text-slate-950 font-mono text-sm font-bold shadow-xl transition-all scale-100 hover:scale-105"
              >
                <Apple className="w-5 h-5 fill-current" />
                <span>Get on App Store</span>
              </a>

              <button
                type="button"
                onClick={() => setShowQrModal(true)}
                className="btn-tactile touch-target inline-flex items-center gap-2 px-5 py-3.5 rounded-2xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 font-mono text-sm text-white transition-colors"
              >
                <QrCode className="w-4 h-4 text-emerald-400" />
                <span>Scan with iPhone</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. COMPLIANCE & SUPPORT FOOTER */}
      {/* ========================================================================= */}
      <footer className="relative z-10 py-10 border-t border-white/10 text-center font-mono text-xs text-slate-500">
        <div className="container max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-slate-400">Ufuq (أفق) iOS App</span>
            <span>·</span>
            <Link to="/" className="text-emerald-400 hover:underline">
              Zyad Wael Portfolio
            </Link>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <a href="mailto:ziad.w.khedr@gmail.com" className="hover:text-emerald-400 transition-colors">
              Support
            </a>
            <a href={appStoreUrl} target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors">
              App Store Listing (ID: 6821979552)
            </a>
            <a href="https://github.com/ZyadWKhedr" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors">
              GitHub
            </a>
          </div>
        </div>
      </footer>

      {/* QR Code Modal */}
      {showQrModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setShowQrModal(false)}
        >
          <div
            className="rounded-3xl bg-[#0F141C] border border-white/20 p-6 md:p-8 max-w-sm w-full text-center space-y-4 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-12 h-12 rounded-xl bg-slate-900 border border-emerald-500/40 p-1 mx-auto">
              <img src={ufuqIcon} alt="Ufuq App" className="w-full h-full object-cover rounded-lg" />
            </div>

            <h3 className="font-serif text-xl font-bold text-white">
              Scan with iPhone Camera
            </h3>
            <p className="text-xs text-slate-400 font-sans">
              Point your iPhone camera at this QR code to open Ufuq directly on the Apple App Store.
            </p>

            <div className="p-4 rounded-2xl bg-white flex items-center justify-center shadow-inner mx-auto w-48 h-48">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(appStoreUrl)}`}
                alt="Ufuq App Store QR Code"
                className="w-full h-full"
              />
            </div>

            <button
              type="button"
              onClick={() => setShowQrModal(false)}
              className="touch-target w-full py-2.5 rounded-xl bg-white/[0.08] hover:bg-white/[0.15] text-white font-mono text-xs font-semibold transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UfuqShowcasePage;
