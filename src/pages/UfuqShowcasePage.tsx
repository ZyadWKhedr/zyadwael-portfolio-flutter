import React, { useState, useEffect } from 'react';
import {
  Apple,
  ArrowLeft,
  ChevronDown,
  Sparkles,
  QrCode,
  Shield,
  WifiOff,
  Radio,
  Compass,
  Check,
  Star,
  ExternalLink,
  ChevronRight,
  Share2,
  Clock,
  BookOpen,
  X,
  Volume2,
  Play,
  Pause,
  Smartphone,
  Heart,
  Fingerprint,
  Calendar,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import ufuqIcon from '@/assets/ufuq-icon.png';
import { getAssetUrl } from '@/lib/utils';

// Authentic Production Screenshots from the App
const APP_MODULES = [
  {
    id: 'home',
    title: 'Daily Spiritual Dashboard',
    arabicTitle: 'الرئيسية الشاملة',
    badge: 'Home & Overview',
    tagline: 'Morning inspiration, live radio, and next prayer countdown at a single glance.',
    image: 'assets/images/projects/ufuq/ufuq-real-home.jpg',
    highlights: [
      'Scenic dynamic header with daily Quranic verse reflection',
      'Instant 1-tap live Holy Quran radio from Cairo (FM 94.7)',
      'Hijri calendar date with quick Qibla & Names of Allah shortcuts',
      'Timely Athkar and Quran reading resumption bookmarks',
    ],
    metric: 'Instant Daily Access',
  },
  {
    id: 'quran',
    title: 'Holy Quran in Medina Script',
    arabicTitle: 'المصحف العثماني',
    badge: '100% Offline SQLite',
    tagline: 'Complete 114 Surahs in authentic Medina Uthmani script with zero internet needed.',
    image: 'assets/images/projects/ufuq/ufuq-real-quran.jpg',
    highlights: [
      'High-definition authentic Medina typography with golden Ayah rosettes',
      'Zero internet connection needed — bundled locally in SQLite',
      'Juz, Surah, and Page indicators with fast jumping controls',
      'Smooth vertical reading flow with eye-friendly warm papyrus tone',
    ],
    metric: '114 Surahs · 100% Offline',
  },
  {
    id: 'subha',
    title: 'Tactile Electronic Subha',
    arabicTitle: 'المسبحة الإلكترونية',
    badge: 'Haptic Tally Counter',
    tagline: 'A realistic electronic tally counter with vibration feedback and custom goals.',
    image: 'assets/images/projects/ufuq/ufuq-real-subha.png',
    highlights: [
      'Authentic emerald green tally device with 5-digit LCD screen',
      'Tactile gold touch sensor with subtle device vibration feedback',
      'Dhikr presets (Subhan Allah, Alhamdulillah, Allahu Akbar, La Ilaha Illa Allah)',
      'Configurable targets: 33, 99, 100, or open continuous counting',
    ],
    metric: 'Tactile Haptic Feedback',
  },
  {
    id: 'qibla',
    title: 'Calibrated Qibla Compass',
    arabicTitle: 'بوصلة القبلة الذكية',
    badge: 'Magnetometer Precision',
    tagline: 'Sensor-calibrated Kaaba direction dial with exact degree and distance calculation.',
    image: 'assets/images/projects/ufuq/ufuq-real-qibla.png',
    highlights: [
      'Hardware magnetometer alignment with smooth tilt compensation',
      'Exact Kaaba degree heading (136.1°) and distance (1,287 km from Cairo)',
      'Gold & ivory circular compass dial with clear directional needle',
      'On-device GPS calculation without telemetry or location sharing',
    ],
    metric: 'Hardware Sensor Calibrated',
  },
  {
    id: 'prayer',
    title: 'GPS Astronomical Prayer Times',
    arabicTitle: 'مواقيت الصلاة الدقيقة',
    badge: 'Astronomical Precision',
    tagline: 'Exact prayer schedules, next prayer countdown, and Iqama timetable for Cairo & worldwide.',
    image: 'assets/images/projects/ufuq/ufuq-real-prayer.jpg',
    highlights: [
      'Precise solar angle calculation based on device GPS coordinates',
      'Prominent live countdown to next prayer with active highlighting',
      'Detailed schedule: Fajr, Shuruq, Dhuhr, Asr, Maghrib, Isha, Midnight',
      'Exact Iqama intervals and astronomical moon phase display',
    ],
    metric: 'Solar GPS Accuracy',
  },
  {
    id: 'athkar',
    title: 'Hisn al-Muslim Supplications',
    arabicTitle: 'حصن المسلم',
    badge: 'Daily Remembrance',
    tagline: 'Comprehensive authentic Athkar for morning, evening, and after prayers.',
    image: 'assets/images/projects/ufuq/ufuq-real-athkar.png',
    highlights: [
      'Authentic Sahih supplications from Hisn al-Muslim (حصن المسلم)',
      'Clear, bold Arabic calligraphy designed for effortless legibility',
      'Repetition progress counters with automatic completion signals',
      'One-tap sharing and personal favorites bookmarking',
    ],
    metric: '130+ Authentic Athkar',
  },
  {
    id: 'splash',
    title: 'Sacred Brand Identity & Splash',
    arabicTitle: 'شاشة البداية والوقار',
    badge: 'Sacred Visual Design',
    tagline: 'Deep emerald texture, golden Quranic verse, and peaceful typography.',
    image: 'assets/images/projects/ufuq/ufuq-real-splash.jpg',
    highlights: [
      'Deep Islamic emerald texture reflecting timeless manuscript binding',
      'Authentic Thuluth calligraphic logo for Ufuq (أفق)',
      'Reflective Quranic verse: «وَقَالَ رَبُّكُمُ ادْعُونِي أَسْتَجِبْ لَكُمْ»',
      'Distraction-free entry into daily spiritual worship',
    ],
    metric: 'Distraction-Free Sanctuary',
  },
];

// Feature Bento Pillars
const BENTO_FEATURES = [
  {
    icon: Shield,
    title: '100% Free & Ad-Free Forever',
    arabic: 'مجاني تماماً وبدون أي إعلانات',
    desc: 'Zero interstitial ads, zero banner clutter, and zero subscriptions. Built with sincere intention as an ongoing charity (صدقة جارية).',
    color: 'emerald',
  },
  {
    icon: WifiOff,
    title: 'Complete Offline Autonomy',
    arabic: 'يعمل بالكامل بدون اتصال بالإنترنت',
    desc: 'The entire Holy Quran text, 130+ Hisn al-Muslim Athkar, and prayer calculation models reside on-device in an optimized SQLite database.',
    color: 'amber',
  },
  {
    icon: Radio,
    title: '24/7 Background Audio Radio',
    arabic: 'بث إذاعي مستمر في الخلفية',
    desc: 'Continuous live stream from Cairo & Mecca Holy Quran radio stations that keeps playing when your phone is locked or multitasking.',
    color: 'teal',
  },
  {
    icon: Compass,
    title: 'Sensor-Calibrated Qibla Compass',
    arabic: 'بوصلة القبلة الذكية بمستشعرات الهاتف',
    desc: 'Integrates device magnetometer hardware with tilt compensation to point directly toward the Kaaba anywhere on Earth.',
    color: 'emerald',
  },
];

// FAQ list
const FAQS = [
  {
    q: 'Is Ufuq completely free?',
    a: 'Yes, Ufuq is 100% free with no in-app purchases, no subscriptions, and zero advertising banners or videos.',
  },
  {
    q: 'Does reading the Quran require an active internet connection?',
    a: 'No. All 114 Surahs in authentic Medina Uthmani script are bundled locally in an optimized SQLite database on your device.',
  },
  {
    q: 'Can I listen to Holy Quran Radio with my screen locked?',
    a: 'Yes. The audio service runs in a dedicated background isolate, with full lock-screen media controls and Dynamic Island integration on iOS.',
  },
  {
    q: 'How does Ufuq calculate prayer times?',
    a: 'Ufuq uses astronomical GPS algorithms adhering to the Egyptian General Authority of Survey, Umm al-Qura, and Muslim World League conventions.',
  },
  {
    q: 'Does Ufuq collect or track my personal location?',
    a: 'No. Your GPS coordinates are processed exclusively on-device to calculate solar prayer angles. Zero telemetry, zero tracking, zero data collection.',
  },
];

export const UfuqShowcasePage: React.FC = () => {
  const [activeModuleIndex, setActiveModuleIndex] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showQrModal, setShowQrModal] = useState(false);
  const [isRadioPlaying, setIsRadioPlaying] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const appStoreUrl = 'https://apps.apple.com/id/app/ufuq/id6821979552';
  const currentModule = APP_MODULES[activeModuleIndex];

  useEffect(() => {
    window.scrollTo(0, 0);
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#070A09] text-zinc-100 font-sans selection:bg-emerald-500 selection:text-black relative overflow-x-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-emerald-500/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-[800px] right-0 w-[500px] h-[500px] bg-teal-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-[1800px] left-0 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-[180px] pointer-events-none" />

      {/* ========================================================================= */}
      {/* FLOATING FROSTED HEADER (Framer & Wheel of Tea Style) */}
      {/* ========================================================================= */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#070A09]/90 backdrop-blur-md border-b border-white/10 shadow-2xl py-3.5'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-white transition-colors px-3 py-1.5 rounded-lg hover:bg-white/5 border border-transparent hover:border-white/10"
              title="Return to Zyad Wael's main portfolio"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Zyad Wael</span>
            </Link>
            <span className="text-zinc-600">/</span>
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl overflow-hidden border border-white/15 bg-zinc-900 shrink-0 shadow-sm">
                <img
                  src={ufuqIcon}
                  alt="Ufuq App Icon"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-left leading-none">
                <span className="font-serif font-bold text-base tracking-tight text-white block">
                  Ufuq
                </span>
                <span className="text-[11px] font-serif text-emerald-400">
                  أفق
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setShowQrModal(true)}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-xs font-mono text-zinc-300 transition-colors"
            >
              <QrCode className="w-3.5 h-3.5 text-emerald-400" />
              <span>Scan QR</span>
            </button>

            <a
              href={appStoreUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-xs font-mono shadow-lg shadow-emerald-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Apple className="w-4 h-4 fill-current" />
              <span>Download Free</span>
            </a>
          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* HERO SECTION (Dribbble Artspire + Framer Promo Landing Pattern) */}
      {/* ========================================================================= */}
      <section className="relative pt-32 pb-16 sm:pt-40 sm:pb-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center relative z-10">
          {/* Subtle Tag Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 font-mono text-xs mb-6 backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>100% Free · Zero Ads · Native iOS Experience</span>
          </div>

          {/* Bilingual Headline */}
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white mb-4 max-w-4xl mx-auto leading-[1.12]">
            Your Spiritual Journey,
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-200 mt-2 font-serif">
              Pure &amp; Undistracted.
            </span>
          </h1>

          <p className="font-serif text-lg sm:text-2xl text-emerald-200/90 mb-6 max-w-2xl mx-auto leading-relaxed font-normal">
            أفق — القرآن الكريم كاملاً، أذكار حصن المسلم، ومواقيت الصلاة الدقيقة
          </p>

          <p className="text-sm sm:text-base text-zinc-400 max-w-2xl mx-auto leading-relaxed mb-8 font-sans">
            A modern Islamic companion engineered with Flutter &amp; Clean Architecture. Featuring offline Medina Quran, 24/7 Cairo live radio streaming, solar GPS prayer times, and a tactile electronic Subha counter.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
            <a
              href={appStoreUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-6 py-3.5 rounded-2xl bg-white hover:bg-zinc-100 text-zinc-950 font-bold text-sm shadow-xl shadow-white/10 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Apple className="w-5 h-5 fill-current" />
              <div className="text-left leading-tight">
                <div className="text-[10px] uppercase font-mono tracking-wider opacity-70">Download on the</div>
                <div className="text-sm font-bold">Apple App Store</div>
              </div>
            </a>

            <button
              type="button"
              onClick={() => setShowQrModal(true)}
              className="inline-flex items-center gap-2.5 px-5 py-3.5 rounded-2xl border border-white/15 bg-white/5 hover:bg-white/10 text-white font-mono text-xs font-medium transition-all"
            >
              <QrCode className="w-4 h-4 text-emerald-400" />
              <span>Scan with iPhone</span>
            </button>
          </div>

          {/* Rating & Trust Strip */}
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs font-mono text-zinc-400 pt-2 border-t border-white/10 max-w-2xl mx-auto">
            <div className="flex items-center gap-1.5">
              <div className="flex items-center gap-0.5 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-current" />
                ))}
              </div>
              <span className="text-zinc-300 font-semibold">4.9 on App Store</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span>No In-App Purchases</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span>iOS 16+ Ready</span>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* CENTERPIECE 3D IPHONE MOCKUP WITH FLOATING CARDS (Dribbble Artspire Style) */}
        {/* ========================================================================= */}
        <div className="mt-14 max-w-5xl mx-auto px-4 sm:px-6 relative">
          <div className="relative mx-auto flex justify-center">
            {/* Phone Hardware Shell */}
            <div className="relative w-[280px] sm:w-[320px] md:w-[350px] aspect-[9/19.5] rounded-[50px] p-3 bg-gradient-to-b from-zinc-700 via-zinc-800 to-zinc-950 border-4 border-zinc-600/70 shadow-2xl shadow-emerald-950/40 z-20">
              {/* Dynamic Island */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-5 bg-black rounded-full z-30 flex items-center justify-end pr-2.5">
                <div className="w-2 h-2 rounded-full bg-emerald-500/80 animate-pulse" />
              </div>

              {/* Screen Frame */}
              <div className="relative w-full h-full rounded-[40px] overflow-hidden bg-black border border-white/10">
                <img
                  src={getAssetUrl('assets/images/projects/ufuq/ufuq-real-home.jpg')}
                  alt="Ufuq App Real Home Screen"
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>

            {/* Floating Card 1: Left (Live Radio Audio Pill) */}
            <div className="hidden lg:block absolute -left-2 top-1/4 -translate-y-1/2 p-4 rounded-2xl bg-zinc-900/95 border border-white/10 backdrop-blur-md shadow-2xl text-left max-w-[240px] z-30 animate-fade-in hover:scale-105 transition-transform">
              <div className="flex items-center justify-between mb-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <Radio className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                  LIVE FM 94.7
                </span>
              </div>
              <div className="text-xs font-mono font-bold text-white mb-1">Holy Quran Radio</div>
              <div className="text-[11px] font-serif text-emerald-300 mb-1">إذاعة القرآن الكريم من القاهرة</div>
              <p className="text-[11px] text-zinc-400 leading-relaxed font-sans">
                Continuous background stream with lock-screen controls.
              </p>
            </div>

            {/* Floating Card 2: Right (Medina Script Quran Pill) */}
            <div className="hidden lg:block absolute -right-2 top-1/3 -translate-y-1/2 p-4 rounded-2xl bg-zinc-900/95 border border-white/10 backdrop-blur-md shadow-2xl text-left max-w-[240px] z-30 animate-fade-in hover:scale-105 transition-transform">
              <div className="flex items-center justify-between mb-2">
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                  <BookOpen className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">
                  100% Offline
                </span>
              </div>
              <div className="text-xs font-mono font-bold text-white mb-1">Medina Uthmani Script</div>
              <div className="text-[11px] font-serif text-amber-300 mb-1">المصحف الشريف بالرسم العثماني</div>
              <p className="text-[11px] text-zinc-400 leading-relaxed font-sans">
                Full 114 Surahs stored locally in on-device SQLite database.
              </p>
            </div>

            {/* Floating Card 3: Bottom Left (Cairo GPS Prayer Times) */}
            <div className="hidden lg:block absolute left-8 bottom-12 p-3.5 rounded-2xl bg-zinc-900/95 border border-white/10 backdrop-blur-md shadow-2xl text-left max-w-[220px] z-30 animate-fade-in hover:scale-105 transition-transform">
              <div className="flex items-center gap-2 mb-1.5">
                <Clock className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-xs font-mono font-bold text-white">Cairo GPS Time</span>
              </div>
              <div className="text-xs font-mono text-emerald-400 font-semibold">
                Asr in 01:21:38
              </div>
              <p className="text-[10px] font-mono text-zinc-400 mt-1">
                Astronomical solar calculation without tracking.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* INTERACTIVE EXPERIENCE GALLERY (Wheel of Tea & Figma Template Style) */}
      {/* ========================================================================= */}
      <section className="py-20 sm:py-28 bg-[#090D0B] border-y border-white/10 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-semibold mb-2 block">
              Explore The Experience
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-tight mb-3">
              Designed with Reverence &amp; Precision.
            </h2>
            <p className="text-sm text-zinc-400 font-sans">
              Tap any module below to inspect the authentic iPhone screens and feature capabilities.
            </p>
          </div>

          {/* Module Selector Buttons Bar */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
            {APP_MODULES.map((mod, idx) => (
              <button
                key={mod.id}
                type="button"
                onClick={() => setActiveModuleIndex(idx)}
                className={`touch-target px-4 py-2 rounded-xl text-xs font-mono transition-all flex items-center gap-2 ${
                  activeModuleIndex === idx
                    ? 'bg-emerald-500 text-black font-bold shadow-lg shadow-emerald-500/20 scale-105'
                    : 'bg-white/5 text-zinc-300 hover:bg-white/10 border border-white/10'
                }`}
              >
                <span>{mod.title}</span>
                <span className="text-[10px] opacity-75 font-serif">{mod.arabicTitle}</span>
              </button>
            ))}
          </div>

          {/* Showcase Display Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Phone Mockup Frame (5 cols) */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-[270px] sm:w-[310px] aspect-[9/19.5] rounded-[48px] p-2.5 bg-gradient-to-b from-zinc-700 via-zinc-800 to-zinc-950 border-4 border-zinc-600/70 shadow-2xl shadow-emerald-950/40">
                <div className="w-full h-full rounded-[38px] overflow-hidden bg-black border border-white/10">
                  <img
                    src={getAssetUrl(currentModule.image)}
                    alt={currentModule.title}
                    className="w-full h-full object-cover object-top transition-opacity duration-300"
                  />
                </div>
              </div>
            </div>

            {/* Feature Description & Deep Breakdown (7 cols) */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="p-8 rounded-3xl bg-zinc-900/70 border border-white/10 backdrop-blur-md shadow-2xl space-y-6">
                <div>
                  <div className="flex items-center justify-between gap-3 mb-2">
                    <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-xs font-semibold">
                      {currentModule.badge}
                    </span>
                    <span className="text-xs font-mono text-zinc-400">
                      Module 0{activeModuleIndex + 1} of 0{APP_MODULES.length}
                    </span>
                  </div>

                  <h3 className="font-serif text-3xl font-bold text-white mb-1">
                    {currentModule.title}
                  </h3>
                  <div className="font-serif text-xl text-emerald-300/90 mb-3">
                    {currentModule.arabicTitle}
                  </div>
                  <p className="text-sm text-zinc-300 leading-relaxed font-sans">
                    {currentModule.tagline}
                  </p>
                </div>

                {/* Highlights List */}
                <div className="space-y-3 pt-2 border-t border-white/10">
                  <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold block">
                    Key Engineered Capabilities:
                  </span>
                  <div className="space-y-2.5">
                    {currentModule.highlights.map((h, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-300">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer Metric Pill */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="text-xs font-mono text-emerald-400 font-semibold">
                    ✓ {currentModule.metric}
                  </span>
                  <a
                    href={appStoreUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-white hover:text-emerald-400 transition-colors"
                  >
                    <span>Download on App Store</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4-CARD FEATURE BENTO GRID (Framer App Landing Page Pattern) */}
      {/* ========================================================================= */}
      <section className="py-20 sm:py-28 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-semibold mb-2 block">
              Core Principles
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-tight">
              Pure Worship. Zero Friction.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {BENTO_FEATURES.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="p-8 rounded-3xl bg-zinc-900/60 border border-white/10 hover:border-emerald-500/30 transition-all text-left flex flex-col justify-between group shadow-lg"
                >
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-5 group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-serif text-2xl font-bold text-white mb-1">
                      {item.title}
                    </h3>
                    <div className="font-serif text-sm text-emerald-300/80 mb-3">
                      {item.arabic}
                    </div>
                    <p className="text-sm text-zinc-400 leading-relaxed font-sans">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* DEEP DEVOTION MANIFESTO (Wheel of Tea Style) */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-20 bg-gradient-to-b from-[#090D0B] to-[#070A09] border-y border-white/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6">
          <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 mx-auto flex items-center justify-center text-emerald-400">
            <Heart className="w-6 h-6 fill-current" />
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
            Built as an Ongoing Charity (صدقة جارية)
          </h2>

          <p className="font-serif text-base sm:text-lg text-emerald-200/90 max-w-2xl mx-auto leading-relaxed">
            «إِذَا مَاتَ ابْنُ آدَمَ انْقَطَعَ عَمَلُهُ إِلَّا مِنْ ثَلَاثٍ: صَدَقَةٍ جَارِيَةٍ، أَوْ عِلْمٍ يُنْتَفَعُ بِهِ، أَوْ وَلَدٍ صَالِحٍ يَدْعُو لَهُ»
          </p>

          <p className="text-sm text-zinc-400 max-w-2xl mx-auto leading-relaxed font-sans">
            Ufuq was created to provide a quiet, sacred sanctuary free of commercial noise. No paywalls, no banners popping up mid-prayer, and no telemetry tracking your life. Just pure Islamic remembrance.
          </p>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* FAQ SECTION (AppInstitute & Unbounce Best Practices) */}
      {/* ========================================================================= */}
      <section className="py-20 sm:py-28">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-semibold mb-2 block">
              Common Inquiries
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Frequently Asked Questions.
            </h2>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, idx) => (
              <div
                key={idx}
                className="rounded-2xl bg-zinc-900/60 border border-white/10 overflow-hidden text-left transition-colors hover:border-white/20"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-5 sm:p-6 flex items-center justify-between gap-4 text-left font-serif text-base sm:text-lg font-bold text-white"
                  aria-expanded={openFaq === idx}
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-emerald-400 shrink-0 transition-transform duration-200 ${
                      openFaq === idx ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openFaq === idx && (
                  <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-sm text-zinc-400 leading-relaxed font-sans border-t border-white/5 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* FINAL DOWNLOAD CTA BANNER */}
      {/* ========================================================================= */}
      <section className="py-20 sm:py-28 bg-gradient-to-b from-[#090D0B] to-[#050706] border-t border-white/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-emerald-500/5 blur-[120px] pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10 space-y-6">
          <div className="w-16 h-16 rounded-2xl overflow-hidden mx-auto border-2 border-emerald-500/40 shadow-xl shadow-emerald-500/20">
            <img src={ufuqIcon} alt="Ufuq App Icon" className="w-full h-full object-cover" />
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-tight">
            Start Your Distraction-Free Worship.
          </h2>

          <p className="text-zinc-400 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Free on the Apple App Store. Designed with reverence for your spiritual focus.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-3">
            <a
              href={appStoreUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-base shadow-xl shadow-emerald-500/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Apple className="w-6 h-6 fill-current" />
              <span>Download on Apple App Store</span>
            </a>

            <button
              type="button"
              onClick={() => setShowQrModal(true)}
              className="inline-flex items-center gap-2 px-6 py-4 rounded-2xl border border-white/15 bg-white/5 hover:bg-white/10 text-white font-mono text-sm font-medium transition-all"
            >
              <QrCode className="w-4 h-4 text-emerald-400" />
              <span>Scan QR Code</span>
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* FOOTER */}
      {/* ========================================================================= */}
      <footer className="py-8 border-t border-white/5 bg-[#040605] text-xs font-mono text-zinc-500">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Link to="/" className="text-zinc-400 hover:text-white transition-colors">
              ← Return to Zyad Wael Portfolio
            </Link>
          </div>
          <div>
            Ufuq (أفق) © {new Date().getFullYear()} Zyad Wael. All rights reserved.
          </div>
        </div>
      </footer>

      {/* ========================================================================= */}
      {/* QR CODE SCAN MODAL */}
      {/* ========================================================================= */}
      {showQrModal && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setShowQrModal(false)}
        >
          <div
            className="w-full max-w-sm rounded-3xl bg-zinc-900 border border-white/15 p-6 text-center space-y-4 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setShowQrModal(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10"
              aria-label="Close QR Modal"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="w-12 h-12 rounded-xl overflow-hidden mx-auto border border-emerald-500/30">
              <img src={ufuqIcon} alt="Ufuq App" className="w-full h-full object-cover rounded-lg" />
            </div>

            <h3 className="font-serif text-xl font-bold text-white">
              Scan with your iPhone Camera
            </h3>

            <p className="text-xs text-zinc-400 leading-relaxed font-sans">
              Point your iPhone camera at this code to install Ufuq directly from the App Store.
            </p>

            <div className="p-4 bg-white rounded-2xl inline-block shadow-inner">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(
                  appStoreUrl
                )}`}
                alt="App Store QR Code"
                className="w-40 h-40 mx-auto"
              />
            </div>

            <div className="pt-2">
              <a
                href={appStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono text-emerald-400 hover:underline inline-flex items-center gap-1"
              >
                <span>Direct App Store Link</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UfuqShowcasePage;
