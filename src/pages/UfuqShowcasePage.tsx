import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Apple,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Volume2,
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
  Layers,
  Database,
  Cpu,
  Smartphone,
  Eye,
  Activity,
  Heart,
  VolumeX,
} from 'lucide-react';
import ufuqIcon from '@/assets/ufuq-icon.png';

interface ScreenItem {
  id: string;
  number: number;
  title: string;
  arabicTitle: string;
  tagline: string;
  description: string;
  imageSrc: string;
  icon: React.ReactNode;
  accent: string;
  badge: string;
  highlights: string[];
  dynamicIslandContent: {
    title: string;
    status: string;
    icon: string;
  };
}

const SCREENS: ScreenItem[] = [
  {
    id: 'screen-1',
    number: 1,
    title: 'Daily Athkar & Interactive Subha',
    arabicTitle: 'أذكار الصباح والمساء وحصن المسلم',
    tagline: 'Tactile daily supplications with haptic feedback digital tasbih.',
    description:
      'Categorized morning, evening, sleep, and prayer supplications sourced directly from Hisn al-Muslim. Features an interactive digital Subha counter with tactile haptic vibration triggers and local persistence.',
    imageSrc: 'assets/images/projects/ufuq/ufuq-screen-1.jpg',
    icon: <Sparkles className="w-4 h-4" />,
    accent: '#10B981',
    badge: 'Daily Supplications',
    highlights: [
      'Comprehensive Hisn al-Muslim verified texts',
      'Tactile haptic vibration on each Subha tap',
      'Automatic cycle completion & daily tracking',
      'Instant search with Arabic diacritics normalization',
    ],
    dynamicIslandContent: {
      title: 'سُبْحَانَ اللَّهِ',
      status: '33x Counter Active',
      icon: '📿',
    },
  },
  {
    id: 'screen-2',
    number: 2,
    title: 'Holy Quran in Authentic Uthmani Script',
    arabicTitle: 'القرآن الكريم كاملاً بخط عثماني أصيل',
    tagline: 'Distraction-free offline reading with ayah bookmarks and smooth paging.',
    description:
      'The entire Holy Quran rendered in high-fidelity authentic Medina Uthmani script. Built with an offline-first SQLite database providing zero-latency page hydration and instantaneous verse search.',
    imageSrc: 'assets/images/projects/ufuq/ufuq-screen-2.jpg',
    icon: <BookOpen className="w-4 h-4" />,
    accent: '#34D399',
    badge: 'Offline SQLite Quran',
    highlights: [
      'Authentic Medina Uthmani script typography',
      '100% offline local SQLite storage (0 data needed)',
      'Multiple reading bookmarks & last-read sync',
      'Customizable night mode & eye-comfort palettes',
    ],
    dynamicIslandContent: {
      title: 'سورة البقرة · ص ٢',
      status: 'Reading In Progress',
      icon: '📖',
    },
  },
  {
    id: 'screen-3',
    number: 3,
    title: '24/7 Live Holy Quran Radio Streams',
    arabicTitle: 'إذاعة القرآن الكريم - بث مباشر على مدار الساعة',
    tagline: 'Continuous audio recitations streaming in decoupled background isolates.',
    description:
      'Live 24/7 worldwide Islamic and Quranic radio stations streaming in low-latency AAC. Engineered with decoupled background audio isolates and native iOS lock-screen media player integration.',
    imageSrc: 'assets/images/projects/ufuq/ufuq-screen-3.jpg',
    icon: <Radio className="w-4 h-4" />,
    accent: '#059669',
    badge: 'Audio Streaming Engine',
    highlights: [
      'Live broadcast from Makkah Al-Mukarramah & Cairo',
      'Decoupled Flutter background isolate execution',
      'Native iOS Control Center & Lock Screen controls',
      'Ultra low-latency AAC 128kbps adaptive streaming',
    ],
    dynamicIslandContent: {
      title: 'إذاعة القرآن بمكة',
      status: 'Live 128 kbps',
      icon: '📻',
    },
  },
  {
    id: 'screen-4',
    number: 4,
    title: 'GPS Astronomical Prayer Times',
    arabicTitle: 'مواقيت الصلاة الدقيقة بناءً على الموقع الجغرافي',
    tagline: 'High-precision solar ephemeris calculations with live prayer countdowns.',
    description:
      'Calculates accurate prayer times based on user GPS coordinates and recognized astronomical conventions (Umm Al-Qura, Egyptian General Authority, ISNA, MWL) with automated notification scheduling.',
    imageSrc: 'assets/images/projects/ufuq/ufuq-screen-4.jpg',
    icon: <Clock className="w-4 h-4" />,
    accent: '#047857',
    badge: 'Astronomical Solar Math',
    highlights: [
      'Sub-second solar zenith & twilight calculation',
      'Recognized calculation authorities selection',
      'Automated background notification scheduling',
      'Live countdown timer to the upcoming prayer',
    ],
    dynamicIslandContent: {
      title: 'العصر 3:18 PM',
      status: '42m remaining',
      icon: '⏱️',
    },
  },
  {
    id: 'screen-5',
    number: 5,
    title: 'Hardware-Calibrated Qibla Compass',
    arabicTitle: 'بوصلة القبلة الدقيقة مع مستشعر الاتجاه',
    tagline: 'Sensor-fused magnetometer heading with 3-axis tilt compensation.',
    description:
      'Directs worshippers towards the Holy Kaaba using native 3-axis magnetometer sensor fusion with hardware tilt compensation and haptic alignment confirmation when aligned.',
    imageSrc: 'assets/images/projects/ufuq/ufuq-screen-5.jpg',
    icon: <Compass className="w-4 h-4" />,
    accent: '#10B981',
    badge: 'Magnetometer Fusion',
    highlights: [
      'Great-circle distance & bearing trigonometry',
      '3-axis tilt compensation for tilted hand angles',
      'Tactile haptic pulse upon exact Kaaba alignment',
      'Zero calibration drift with magnetic anomaly filter',
    ],
    dynamicIslandContent: {
      title: '136° SE · اتجاه القبلة',
      status: 'Aligned with Kaaba',
      icon: '🧭',
    },
  },
  {
    id: 'screen-6',
    number: 6,
    title: 'Native iOS Home & Lock Screen Widgets',
    arabicTitle: 'ودجات الشاشة الرئيسية وشاشة القفل',
    tagline: 'Glanceable prayer countdowns engineered with native WidgetKit.',
    description:
      'Custom iOS widgets providing glanceable prayer times, upcoming prayer countdowns, and daily Athkar directly on the user’s Lock Screen and Home Screen without opening the app.',
    imageSrc: 'assets/images/projects/ufuq/ufuq-screen-6.jpg',
    icon: <Layout className="w-4 h-4" />,
    accent: '#34D399',
    badge: 'iOS WidgetKit Bridge',
    highlights: [
      'Swift WidgetKit native bridge integration',
      'Low-power background timeline provider refreshes',
      'Circular, rectangular, and inline Lock Screen widgets',
      'Dynamic Home Screen medium & large widget cards',
    ],
    dynamicIslandContent: {
      title: 'WidgetKit Synced',
      status: 'Next: المغرب 6:02 PM',
      icon: '📱',
    },
  },
  {
    id: 'screen-7',
    number: 7,
    title: 'Quranic Ayah Card Studio & Exporter',
    arabicTitle: 'تصميم بطاقات الآيات القرآنية ومشاركتها',
    tagline: 'Custom typography and aesthetic card studio for social sharing.',
    description:
      'Empowers users to customize, style, and export Quranic verses into beautifully formatted social cards with curated Islamic background textures, fonts, and diacritics.',
    imageSrc: 'assets/images/projects/ufuq/ufuq-screen-7.jpg',
    icon: <Share2 className="w-4 h-4" />,
    accent: '#059669',
    badge: 'Card Studio',
    highlights: [
      'High-resolution PNG / JPEG rasterizer engine',
      'Handcrafted aesthetic typography & backgrounds',
      'Direct iOS share sheet export integration',
      'Offline card generator with zero server upload',
    ],
    dynamicIslandContent: {
      title: 'Card Studio Export',
      status: 'Ready to Share',
      icon: '✨',
    },
  },
];

export const UfuqShowcasePage: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlayingRadio, setIsPlayingRadio] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [autoPlay, setAutoPlay] = useState(true);
  const [showQrModal, setShowQrModal] = useState(false);
  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null);

  const currentScreen = SCREENS[activeIndex];
  const appStoreUrl = 'https://apps.apple.com/id/app/ufuq/id6821979552';

  // Helper to resolve asset URLs correctly across dev and production base paths
  const getAssetUrl = (path: string) => {
    const base = import.meta.env.BASE_URL || '/';
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;
    return `${base}${cleanPath}`;
  };

  // Keyboard navigation (ArrowLeft / ArrowRight)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        nextScreen();
      } else if (e.key === 'ArrowLeft') {
        prevScreen();
      } else if (e.key === 'Escape' && showQrModal) {
        setShowQrModal(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex, showQrModal]);

  // Auto-advance carousel
  useEffect(() => {
    if (!autoPlay) return;
    autoPlayTimerRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % SCREENS.length);
    }, 5500);

    return () => {
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
    };
  }, [autoPlay, activeIndex]);

  const nextScreen = () => {
    setActiveIndex((prev) => (prev + 1) % SCREENS.length);
  };

  const prevScreen = () => {
    setActiveIndex((prev) => (prev - 1 + SCREENS.length) % SCREENS.length);
  };

  const getSiblingIndex = (offset: number) => {
    return (activeIndex + offset + SCREENS.length) % SCREENS.length;
  };

  return (
    <div className="min-h-screen bg-[#070A0D] text-slate-100 font-sans selection:bg-emerald-500 selection:text-black overflow-x-hidden">
      {/* ========================================================================= */}
      {/* SPOTIFY-STYLE AMBIENT BACKDROP LIGHTING & AURORAS */}
      {/* ========================================================================= */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {/* Dynamic primary atmospheric glow shifting with current screen accent */}
        <div
          className="absolute -top-[20%] left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full blur-[160px] opacity-25 transition-all duration-700"
          style={{ backgroundColor: currentScreen.accent }}
        />
        {/* Secondary deep emerald backdrop glow */}
        <div className="absolute top-[40%] -right-[15%] w-[650px] h-[650px] rounded-full bg-emerald-900/15 blur-[180px]" />
        {/* Tertiary subtle teal ambient pool */}
        <div className="absolute bottom-[10%] -left-[10%] w-[550px] h-[550px] rounded-full bg-teal-900/10 blur-[160px]" />
        {/* Noise overlay for cinematic luxury depth */}
        <div className="absolute inset-0 bg-[radial-gradient(#10B981_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.03]" />
      </div>

      {/* ========================================================================= */}
      {/* TOP NAVIGATION BAR */}
      {/* ========================================================================= */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#070A0D]/80 border-b border-white/[0.08] transition-all">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          {/* Back to Portfolio + App Identity */}
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="touch-target inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-xs font-mono text-slate-300 hover:text-emerald-400 transition-colors"
              title="Return to Zyad Wael Portfolio"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Portfolio</span>
            </Link>

            <div className="h-5 w-px bg-white/10 hidden sm:block" />

            {/* Official App Logo & Titles */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl overflow-hidden border border-emerald-500/30 shadow-lg shadow-emerald-500/10 shrink-0 bg-slate-900">
                <img
                  src={ufuqIcon}
                  alt="Ufuq App Official Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-start">
                <div className="flex items-center gap-2">
                  <h1 className="font-serif text-base sm:text-lg font-bold text-white tracking-tight">
                    Ufuq <span className="text-emerald-400 font-sans text-xs">أفق</span>
                  </h1>
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    iOS Shipped
                  </span>
                </div>
                <p className="text-[11px] font-mono text-slate-400 hidden md:block">
                  By Zyad Wael · Islamic Companion &amp; Audio
                </p>
              </div>
            </div>
          </div>

          {/* Quick Anchor Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-6 font-mono text-xs text-slate-400">
            <a href="#mockup-stage" className="hover:text-emerald-400 transition-colors">
              Device Mockups
            </a>
            <a href="#audio-stream" className="hover:text-emerald-400 transition-colors">
              Live Audio
            </a>
            <a href="#engineering" className="hover:text-emerald-400 transition-colors">
              Architecture
            </a>
            <a href="#specifications" className="hover:text-emerald-400 transition-colors">
              Specs
            </a>
          </nav>

          {/* CTA: Official App Store Button */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowQrModal(true)}
              className="touch-target p-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-slate-300 hover:text-emerald-400 transition-colors"
              title="Scan QR Code to open on iPhone"
              aria-label="Scan QR Code"
            >
              <QrCode className="w-4 h-4" />
            </button>

            <a
              href={appStoreUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-tactile touch-target inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-mono text-xs font-bold shadow-lg shadow-emerald-500/25 transition-all"
            >
              <Apple className="w-4 h-4 fill-current" />
              <span>Get on App Store</span>
            </a>
          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* HERO SECTION: SPOTIFY-STYLE BENEFIT-FIRST PRESENTATION */}
      {/* ========================================================================= */}
      <section className="relative z-10 pt-16 md:pt-24 pb-12 md:pb-16 text-center">
        <div className="container max-w-5xl mx-auto px-4 sm:px-6">
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs font-semibold uppercase tracking-wider mb-6 animate-pulse">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Official Apple App Store Release · ID: 6821979552</span>
          </div>

          {/* Big Editorial Headline */}
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-6 leading-[1.15]">
            Spiritual Tranquillity,{' '}
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-200 bg-clip-text text-transparent">
              Engineered for Modern iOS.
            </span>
          </h1>

          {/* Arabic Calligraphy Subtitle */}
          <p
            dir="rtl"
            className="text-xl sm:text-2xl text-emerald-300/90 font-serif font-medium mb-6 leading-relaxed"
          >
            أفق — رفيقك اليومي للعبادة والطاعة بتصميم إسلامي هادئ وعصري
          </p>

          {/* English Narrative */}
          <p className="max-w-3xl mx-auto text-base sm:text-lg text-slate-300 font-sans leading-relaxed mb-10">
            A high-fidelity spiritual companion built in Flutter &amp; Dart.
            Engineered with clean BLoC architecture, offline-first SQLite database,
            astronomical GPS prayer calculations, and low-latency 24/7 background audio streaming.
          </p>

          {/* Key Value Metrics Ribbon */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto text-start">
            <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-sm">
              <span className="text-emerald-400 font-mono text-xs font-bold block mb-0.5">
                100% Offline
              </span>
              <span className="text-xs text-slate-300 font-medium block">
                Complete Quran &amp; Athkar
              </span>
            </div>
            <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-sm">
              <span className="text-emerald-400 font-mono text-xs font-bold block mb-0.5">
                24/7 Live Radio
              </span>
              <span className="text-xs text-slate-300 font-medium block">
                Background Audio Isolates
              </span>
            </div>
            <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-sm">
              <span className="text-emerald-400 font-mono text-xs font-bold block mb-0.5">
                Sub-Second GPS
              </span>
              <span className="text-xs text-slate-300 font-medium block">
                Astronomical Prayer Times
              </span>
            </div>
            <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-sm">
              <span className="text-emerald-400 font-mono text-xs font-bold block mb-0.5">
                100% Private
              </span>
              <span className="text-xs text-slate-300 font-medium block">
                0 Ads · 0 Trackers
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* THE CENTERPIECE: IPHONE 18 PRO MOCKUP STAGE WITH TRANSITIONS */}
      {/* ========================================================================= */}
      <section id="mockup-stage" className="relative z-10 py-12 md:py-20 overflow-hidden">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 text-start">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-widest text-emerald-400 mb-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Next-Gen Device Showcase · iPhone 18 Mockups</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-tight">
                Authentic App Interface &amp; Transitions
              </h2>
              <p className="text-slate-400 text-sm md:text-base mt-2 max-w-2xl">
                Explore the genuine App Store screens running inside high-fidelity iPhone 18 hardware frames with smooth transitions, live Dynamic Island states, and engineering dossiers.
              </p>
            </div>

            {/* Auto-Advance & Controls Toggle */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setAutoPlay(!autoPlay)}
                className={`touch-target inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-mono transition-colors ${
                  autoPlay
                    ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300'
                    : 'bg-white/[0.04] border-white/10 text-slate-400 hover:text-white'
                }`}
              >
                <Activity className="w-3.5 h-3.5" />
                <span>Auto-Tour: {autoPlay ? 'ON' : 'PAUSED'}</span>
              </button>

              <div className="flex items-center gap-1.5 bg-white/[0.04] p-1 rounded-xl border border-white/10">
                <button
                  type="button"
                  onClick={prevScreen}
                  className="touch-target p-2 rounded-lg hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
                  aria-label="Previous screen"
                  title="Previous screen (Left Arrow)"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="font-mono text-xs text-slate-400 px-2">
                  {activeIndex + 1} / {SCREENS.length}
                </span>
                <button
                  type="button"
                  onClick={nextScreen}
                  className="touch-target p-2 rounded-lg hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
                  aria-label="Next screen"
                  title="Next screen (Right Arrow)"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Interactive Screen Selector Pills (Spotify Track Tabs Style) */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
            {SCREENS.map((sc, idx) => {
              const isSelected = activeIndex === idx;
              return (
                <button
                  key={sc.id}
                  type="button"
                  onClick={() => {
                    setActiveIndex(idx);
                    setAutoPlay(false);
                  }}
                  className={`touch-target shrink-0 flex items-center gap-2 px-3.5 py-2 rounded-xl border font-mono text-xs transition-all ${
                    isSelected
                      ? 'bg-emerald-500 text-slate-950 font-bold border-emerald-400 shadow-lg shadow-emerald-500/20 scale-105'
                      : 'bg-white/[0.03] hover:bg-white/[0.08] border-white/[0.08] text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <span>{sc.number}.</span>
                  <span>{sc.title.split('&')[0].trim()}</span>
                </button>
              );
            })}
          </div>

          {/* ===================================================================== */}
          {/* 3D MULTI-DEVICE MOCKUP STAGE */}
          {/* ===================================================================== */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* The 3-Device Perspective Stage (7 cols) */}
            <div className="lg:col-span-7 relative flex items-center justify-center min-h-[620px] md:min-h-[720px] py-6 select-none">
              {/* Radial Backdrop Glow tuned to current screen accent */}
              <div
                className="absolute w-[400px] h-[400px] rounded-full blur-[120px] opacity-35 transition-all duration-700 pointer-events-none"
                style={{ backgroundColor: currentScreen.accent }}
              />

              {/* Sibling Left Preview Mockup (Clickable) */}
              <div
                onClick={prevScreen}
                className="hidden md:block absolute left-4 lg:left-0 top-1/2 -translate-y-1/2 scale-75 opacity-35 blur-[1px] hover:opacity-70 transition-all duration-500 cursor-pointer z-10 -rotate-6 hover:-rotate-3"
                title={`Jump to: ${SCREENS[getSiblingIndex(-1)].title}`}
              >
                <div className="w-[280px] h-[580px] rounded-[48px] bg-slate-950 p-2.5 border-2 border-slate-700/60 shadow-2xl overflow-hidden relative">
                  <img
                    src={getAssetUrl(SCREENS[getSiblingIndex(-1)].imageSrc)}
                    alt={SCREENS[getSiblingIndex(-1)].title}
                    className="w-full h-full object-cover rounded-[38px] opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/40" />
                </div>
              </div>

              {/* Sibling Right Preview Mockup (Clickable) */}
              <div
                onClick={nextScreen}
                className="hidden md:block absolute right-4 lg:right-0 top-1/2 -translate-y-1/2 scale-75 opacity-35 blur-[1px] hover:opacity-70 transition-all duration-500 cursor-pointer z-10 rotate-6 hover:rotate-3"
                title={`Jump to: ${SCREENS[getSiblingIndex(1)].title}`}
              >
                <div className="w-[280px] h-[580px] rounded-[48px] bg-slate-950 p-2.5 border-2 border-slate-700/60 shadow-2xl overflow-hidden relative">
                  <img
                    src={getAssetUrl(SCREENS[getSiblingIndex(1)].imageSrc)}
                    alt={SCREENS[getSiblingIndex(1)].title}
                    className="w-full h-full object-cover rounded-[38px] opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/40" />
                </div>
              </div>

              {/* =============================================================== */}
              {/* CENTER ACTIVE IPHONE 18 PRO MOCKUP */}
              {/* =============================================================== */}
              <div className="relative z-30 transition-all duration-500 transform hover:scale-[1.01]">
                {/* iPhone 18 Titanium Chassis */}
                <div className="w-[300px] sm:w-[330px] md:w-[350px] h-[630px] sm:h-[690px] md:h-[730px] rounded-[52px] bg-gradient-to-b from-slate-800 via-slate-900 to-slate-950 p-[10px] border border-white/20 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_40px_rgba(16,185,129,0.25)] relative">
                  {/* Subtle Titanium Edge Bevel */}
                  <div className="absolute inset-0 rounded-[52px] ring-1 ring-inset ring-white/10 pointer-events-none" />

                  {/* Inner Screen Bezel */}
                  <div className="w-full h-full rounded-[44px] bg-black overflow-hidden relative border border-slate-800 flex flex-col">
                    {/* Top Status Bar & Dynamic Island */}
                    <div className="absolute top-0 inset-x-0 z-40 pt-3 px-6 flex items-center justify-between text-[11px] font-semibold text-white pointer-events-none">
                      {/* Left: Live Time */}
                      <span className="font-mono">9:41</span>

                      {/* Center: Dynamic Island with Real-time Status */}
                      <div className="relative -mt-0.5 px-3 py-1 rounded-full bg-black border border-white/15 flex items-center gap-1.5 shadow-md">
                        <span className="text-xs">
                          {currentScreen.dynamicIslandContent.icon}
                        </span>
                        <div className="flex items-center gap-1 text-[10px] font-mono text-emerald-400">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          <span className="truncate max-w-[110px]">
                            {currentScreen.dynamicIslandContent.title}
                          </span>
                        </div>
                      </div>

                      {/* Right: Cellular, 5G & Battery */}
                      <div className="flex items-center gap-1.5 text-xs text-white">
                        <span>5G</span>
                        <div className="w-5 h-2.5 rounded-sm border border-white/80 p-0.5 flex items-center">
                          <div className="w-full h-full bg-white rounded-xs" />
                        </div>
                      </div>
                    </div>

                    {/* The Screen Display (Actual App Screenshot) */}
                    <div className="w-full h-full relative overflow-hidden bg-slate-950">
                      <img
                        key={currentScreen.id}
                        src={getAssetUrl(currentScreen.imageSrc)}
                        alt={currentScreen.title}
                        className="w-full h-full object-cover transition-opacity duration-300 animate-fadeIn"
                        loading="eager"
                      />

                      {/* Dynamic Glass Specular Highlight Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.04] to-transparent pointer-events-none" />

                      {/* Bottom Vignette */}
                      <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                    </div>

                    {/* Bottom iOS Home Indicator Pill */}
                    <div className="absolute bottom-2 inset-x-0 flex justify-center pointer-events-none z-40">
                      <div className="w-32 h-1 rounded-full bg-white/70" />
                    </div>
                  </div>
                </div>

                {/* Hardware Reflection Glow Underneath */}
                <div className="w-3/4 mx-auto h-4 rounded-full bg-emerald-500/20 blur-xl mt-3" />
              </div>
            </div>

            {/* Deep Architectural Dossier for Active Screen (5 cols) */}
            <div className="lg:col-span-5 text-start space-y-6">
              {/* Screen Badge & Counter */}
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs font-semibold">
                  {currentScreen.icon}
                  <span>{currentScreen.badge}</span>
                </span>
                <span className="font-mono text-xs text-slate-500">
                  Feature Screen {activeIndex + 1} of {SCREENS.length}
                </span>
              </div>

              {/* Screen Title (English & Arabic) */}
              <div>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  {currentScreen.title}
                </h3>
                <p
                  dir="rtl"
                  className="font-serif text-lg text-emerald-300/90 mt-1 leading-relaxed"
                >
                  {currentScreen.arabicTitle}
                </p>
                <p className="font-sans text-sm text-slate-300 mt-2 font-medium">
                  {currentScreen.tagline}
                </p>
              </div>

              {/* Detailed Description */}
              <p className="text-slate-400 text-sm leading-relaxed font-sans">
                {currentScreen.description}
              </p>

              {/* Highlights Checklist */}
              <div className="space-y-2 pt-2">
                <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-slate-400">
                  Engineered Capabilities
                </h4>
                <div className="space-y-2 text-xs font-mono text-slate-300">
                  {currentScreen.highlights.map((h) => (
                    <div
                      key={h}
                      className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08]"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Fast Jump Arrows & Direct Download Link */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={prevScreen}
                    className="touch-target px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs font-mono text-slate-300 hover:text-white transition-colors"
                  >
                    ← Prev
                  </button>
                  <button
                    type="button"
                    onClick={nextScreen}
                    className="touch-target px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs font-mono text-slate-300 hover:text-white transition-colors"
                  >
                    Next →
                  </button>
                </div>

                <a
                  href={appStoreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-tactile touch-target inline-flex items-center gap-1.5 text-xs font-mono text-emerald-400 hover:text-emerald-300 hover:underline"
                >
                  <span>Download App</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SPOTIFY-STYLE LIVE AUDIO STREAMING PLAYER BAR */}
      {/* ========================================================================= */}
      <section id="audio-stream" className="relative z-10 py-12 border-y border-white/[0.08] bg-[#0A0E12]">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-emerald-950/40 p-5 md:p-6 border border-white/10 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Left: Track Metadata (Spotify Vibe) */}
            <div className="flex items-center gap-4 w-full md:w-auto">
              <div className="w-14 h-14 rounded-xl bg-slate-950 border border-emerald-500/40 p-1 shrink-0 overflow-hidden shadow-lg relative group">
                <img
                  src={ufuqIcon}
                  alt="Ufuq Audio Stream"
                  className="w-full h-full object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-emerald-500/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Radio className="w-5 h-5 text-emerald-300" />
                </div>
              </div>
              <div className="text-start truncate">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                    Live Broadcast • مكة المكرمة
                  </span>
                </div>
                <h4 className="font-serif text-base font-bold text-white truncate">
                  Holy Quran Radio • إذاعة القرآن الكريم
                </h4>
                <p className="font-mono text-xs text-slate-400 truncate">
                  Low-latency AAC 128 kbps · Decoupled Background Isolate
                </p>
              </div>
            </div>

            {/* Center: Interactive Play/Pause & Equalizer Visualizer */}
            <div className="flex flex-col items-center gap-2 w-full md:w-auto">
              <div className="flex items-center gap-4">
                {/* 5-Bar Animated Equalizer */}
                <div className="flex items-end gap-1 h-6 px-2">
                  {[40, 90, 60, 100, 70].map((height, i) => (
                    <span
                      key={i}
                      className={`w-1 rounded-full bg-emerald-400 transition-all duration-300 ${
                        isPlayingRadio ? 'animate-pulse' : 'opacity-40'
                      }`}
                      style={{
                        height: isPlayingRadio ? `${height}%` : '20%',
                        animationDelay: `${i * 120}ms`,
                      }}
                    />
                  ))}
                </div>

                {/* Play / Pause Toggle Button */}
                <button
                  type="button"
                  onClick={() => setIsPlayingRadio(!isPlayingRadio)}
                  className="touch-target w-11 h-11 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 flex items-center justify-center shadow-lg shadow-emerald-500/30 transition-transform active:scale-95"
                  aria-label={isPlayingRadio ? 'Pause audio stream' : 'Play audio stream'}
                >
                  {isPlayingRadio ? (
                    <Pause className="w-5 h-5 fill-current" />
                  ) : (
                    <Play className="w-5 h-5 fill-current ms-0.5" />
                  )}
                </button>

                {/* Mute Toggle */}
                <button
                  type="button"
                  onClick={() => setIsMuted(!isMuted)}
                  className="touch-target p-2 rounded-lg text-slate-400 hover:text-white transition-colors"
                  aria-label={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted ? (
                    <VolumeX className="w-4 h-4 text-rose-400" />
                  ) : (
                    <Volume2 className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Progress Bar (Simulated Live Buffer) */}
              <div className="w-full sm:w-64 flex items-center gap-2 font-mono text-[10px] text-slate-400">
                <span>LIVE</span>
                <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full animate-pulse" />
                </div>
                <span>AAC HD</span>
              </div>
            </div>

            {/* Right: Lockscreen Control Center Integration Badge */}
            <div className="text-end hidden lg:block">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/[0.08] text-[11px] font-mono text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>iOS Lock Screen Controls</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* BENTO GRID: ENGINEERING ARCHITECTURE BY ZYAD WAEL */}
      {/* ========================================================================= */}
      <section id="engineering" className="relative z-10 py-16 md:py-24">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12 text-start">
            <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-widest text-emerald-400 mb-2">
              <Layers className="w-3.5 h-3.5" />
              <span>Full Technical Dossier</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Architectural Decisions &amp; Core Systems
            </h2>
            <p className="text-slate-400 text-sm md:text-base mt-2">
              How Ufuq was engineered by Zyad Wael as a solo mobile engineer, maintaining 60 FPS performance, offline reliability, and battery-friendly background tasks.
            </p>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card 1: Clean Architecture & BLoC */}
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08] hover:border-emerald-500/40 transition-all text-start space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-white">
                Clean Architecture &amp; State Containers
              </h3>
              <p className="text-xs font-mono text-slate-400 leading-relaxed">
                Strict separation between Domain Entities, Repositories, and Presentation layers. BLoC handles complex reactive events (prayer time countdowns, audio buffering) while Provider handles simple ambient UI state.
              </p>
              <div className="pt-2 flex flex-wrap gap-1.5 text-[10px] font-mono text-emerald-300">
                <span className="px-2 py-0.5 rounded bg-white/[0.04] border border-white/10">Clean Arch</span>
                <span className="px-2 py-0.5 rounded bg-white/[0.04] border border-white/10">BLoC</span>
                <span className="px-2 py-0.5 rounded bg-white/[0.04] border border-white/10">Provider</span>
              </div>
            </div>

            {/* Card 2: Offline SQLite Core */}
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08] hover:border-emerald-500/40 transition-all text-start space-y-3">
              <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400">
                <Database className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-white">
                Offline-First SQLite Vector Database
              </h3>
              <p className="text-xs font-mono text-slate-400 leading-relaxed">
                Complete Quranic text, Hisn al-Muslim supplications, and bookmarks are stored directly on the device using SQLite with FTS5 search. Operates seamlessly in flight mode with 0ms query latency.
              </p>
              <div className="pt-2 flex flex-wrap gap-1.5 text-[10px] font-mono text-teal-300">
                <span className="px-2 py-0.5 rounded bg-white/[0.04] border border-white/10">SQLite</span>
                <span className="px-2 py-0.5 rounded bg-white/[0.04] border border-white/10">Zero Latency</span>
                <span className="px-2 py-0.5 rounded bg-white/[0.04] border border-white/10">FTS5 Search</span>
              </div>
            </div>

            {/* Card 3: Decoupled Background Audio Isolates */}
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08] hover:border-emerald-500/40 transition-all text-start space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <Radio className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-white">
                Background Audio Isolates &amp; AVPlayer
              </h3>
              <p className="text-xs font-mono text-slate-400 leading-relaxed">
                Audio playback executes inside dedicated background Dart isolates, keeping the UI thread pinned at 60 FPS. Full integration with native iOS lock-screen media player and headphone remote controls.
              </p>
              <div className="pt-2 flex flex-wrap gap-1.5 text-[10px] font-mono text-emerald-300">
                <span className="px-2 py-0.5 rounded bg-white/[0.04] border border-white/10">Dart Isolates</span>
                <span className="px-2 py-0.5 rounded bg-white/[0.04] border border-white/10">AVPlayer</span>
                <span className="px-2 py-0.5 rounded bg-white/[0.04] border border-white/10">Lock Screen</span>
              </div>
            </div>

            {/* Card 4: Astronomical GPS Calculations */}
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08] hover:border-emerald-500/40 transition-all text-start space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-white">
                Astronomical Solar Ephemeris Algorithms
              </h3>
              <p className="text-xs font-mono text-slate-400 leading-relaxed">
                Calculates sun coordinates and twilight angles with sub-second precision. Supports Umm Al-Qura, Egyptian General Authority, ISNA, and MWL methods with high-latitude adjustments.
              </p>
              <div className="pt-2 flex flex-wrap gap-1.5 text-[10px] font-mono text-emerald-300">
                <span className="px-2 py-0.5 rounded bg-white/[0.04] border border-white/10">Solar Ephemeris</span>
                <span className="px-2 py-0.5 rounded bg-white/[0.04] border border-white/10">GPS Geolocation</span>
                <span className="px-2 py-0.5 rounded bg-white/[0.04] border border-white/10">Twilight Angles</span>
              </div>
            </div>

            {/* Card 5: Magnetometer Qibla Sensor Fusion */}
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08] hover:border-emerald-500/40 transition-all text-start space-y-3">
              <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400">
                <Compass className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-white">
                Hardware Magnetometer Tilt Compensation
              </h3>
              <p className="text-xs font-mono text-slate-400 leading-relaxed">
                Fuses data from the device’s 3-axis magnetometer and accelerometer to compute true North and Kaaba bearing even when holding the phone at arbitrary physical tilt angles.
              </p>
              <div className="pt-2 flex flex-wrap gap-1.5 text-[10px] font-mono text-teal-300">
                <span className="px-2 py-0.5 rounded bg-white/[0.04] border border-white/10">Magnetometer</span>
                <span className="px-2 py-0.5 rounded bg-white/[0.04] border border-white/10">Tilt Correction</span>
                <span className="px-2 py-0.5 rounded bg-white/[0.04] border border-white/10">Haptic Pulse</span>
              </div>
            </div>

            {/* Card 6: Strict Privacy & Zero Ads */}
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08] hover:border-emerald-500/40 transition-all text-start space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-white">
                Zero Trackers · 100% Privacy Respected
              </h3>
              <p className="text-xs font-mono text-slate-400 leading-relaxed">
                Engineered with strict zero-tracking principles. No third-party ad networks, no analytics trackers, no telemetry profiling. User prayer and worship remain strictly sacred and confidential.
              </p>
              <div className="pt-2 flex flex-wrap gap-1.5 text-[10px] font-mono text-emerald-300">
                <span className="px-2 py-0.5 rounded bg-white/[0.04] border border-white/10">Zero Ads</span>
                <span className="px-2 py-0.5 rounded bg-white/[0.04] border border-white/10">No Trackers</span>
                <span className="px-2 py-0.5 rounded bg-white/[0.04] border border-white/10">Battery Friendly</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* APP SPECIFICATIONS & CREDITS TABLE */}
      {/* ========================================================================= */}
      <section id="specifications" className="relative z-10 py-12 border-t border-white/[0.08] bg-[#0A0D10]">
        <div className="container max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-start mb-8">
            <h3 className="font-serif text-2xl font-bold text-white">
              Application Ledger &amp; Store Metadata
            </h3>
            <p className="text-xs font-mono text-slate-400 mt-1">
              Verified details published on Apple App Store
            </p>
          </div>

          <div className="rounded-2xl bg-white/[0.02] border border-white/[0.08] divide-y divide-white/[0.06] font-mono text-xs text-start">
            <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span className="text-slate-400">App Name</span>
              <span className="text-white font-semibold">Ufuq (أفق - أذكار وقرآن وإذاعة)</span>
            </div>
            <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span className="text-slate-400">Apple App Store ID</span>
              <span className="text-emerald-400 font-bold">6821979552</span>
            </div>
            <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span className="text-slate-400">Framework &amp; Language</span>
              <span className="text-white">Flutter 3.x · Dart 3.x · Swift Native Bridge</span>
            </div>
            <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span className="text-slate-400">Compatibility</span>
              <span className="text-white">iOS 16.0 or later (iPhone &amp; iPad)</span>
            </div>
            <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span className="text-slate-400">Lead Mobile Engineer</span>
              <span className="text-white">Zyad Wael (Architecture, Engineering &amp; Store Delivery)</span>
            </div>
            <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span className="text-slate-400">Category</span>
              <span className="text-white">Lifestyle / Islamic Companion / Reference</span>
            </div>
            <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span className="text-slate-400">Download Size</span>
              <span className="text-white">~51.4 MB (Lightweight binary)</span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* FINAL CALL TO ACTION: APP STORE & QR CODE */}
      {/* ========================================================================= */}
      <section className="relative z-10 py-20 text-center">
        <div className="container max-w-4xl mx-auto px-4 sm:px-6">
          <div className="p-8 md:p-12 rounded-3xl bg-gradient-to-b from-white/[0.04] to-emerald-950/30 border border-emerald-500/30 shadow-2xl relative overflow-hidden">
            {/* Background Light Aura */}
            <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-emerald-500/10 blur-[100px] pointer-events-none" />

            <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-emerald-500/40 p-1 mx-auto mb-6 shadow-xl">
              <img
                src={ufuqIcon}
                alt="Ufuq App Icon"
                className="w-full h-full object-cover rounded-xl"
              />
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-white mb-3">
              Experience Ufuq on Your iPhone
            </h2>
            <p className="font-sans text-slate-300 text-sm sm:text-base max-w-xl mx-auto mb-8">
              Available now on the Apple App Store. Free, completely ad-free, and designed with peace of mind.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href={appStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-tactile touch-target inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-mono text-sm font-bold shadow-xl shadow-emerald-500/30 transition-all scale-100 hover:scale-105"
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
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* FOOTER */}
      {/* ========================================================================= */}
      <footer className="relative z-10 py-10 border-t border-white/[0.08] text-center font-mono text-xs text-slate-500">
        <div className="container max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-slate-400">Designed &amp; Engineered by Zyad Wael</span>
            <span>·</span>
            <Link to="/" className="text-emerald-400 hover:underline">
              Return to Portfolio
            </Link>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <a
              href="https://github.com/ZyadWKhedr"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-emerald-400 transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/zyad-khedr"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-emerald-400 transition-colors"
            >
              LinkedIn
            </a>
            <a
              href={appStoreUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-emerald-400 transition-colors"
            >
              App Store Listing
            </a>
          </div>
        </div>
      </footer>

      {/* ========================================================================= */}
      {/* MODAL: QR CODE FOR DESKTOP VISITORS TO SCAN FROM IPHONE */}
      {/* ========================================================================= */}
      {showQrModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setShowQrModal(false)}
        >
          <div
            className="rounded-3xl bg-[#0D1217] border border-white/20 p-6 md:p-8 max-w-sm w-full text-center space-y-4 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-12 h-12 rounded-xl bg-slate-900 border border-emerald-500/40 p-1 mx-auto">
              <img src={ufuqIcon} alt="Ufuq App" className="w-full h-full object-cover rounded-lg" />
            </div>

            <h3 className="font-serif text-xl font-bold text-white">
              Scan with iPhone Camera
            </h3>
            <p className="text-xs text-slate-400 font-sans">
              Point your iPhone camera at this code to open Ufuq directly on the Apple App Store.
            </p>

            {/* Stylized QR Code Box */}
            <div className="p-4 rounded-2xl bg-white flex items-center justify-center shadow-inner mx-auto w-48 h-48">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(
                  appStoreUrl
                )}`}
                alt="Ufuq App Store QR Code"
                className="w-full h-full"
              />
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => setShowQrModal(false)}
                className="touch-target w-full py-2.5 rounded-xl bg-white/[0.08] hover:bg-white/[0.15] text-white font-mono text-xs font-semibold transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UfuqShowcasePage;

