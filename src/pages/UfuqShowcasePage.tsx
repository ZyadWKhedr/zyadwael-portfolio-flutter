import React, { useState, useEffect, useRef } from 'react';
import {
  Apple,
  ArrowUpRight,
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  Globe,
  Radio,
  BookOpen,
  Fingerprint,
  Clock,
  Compass,
  Heart,
  QrCode,
  Sparkles,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import ufuqIcon from '@/assets/ufuq-icon.png';
import { getAssetUrl } from '@/lib/utils';

// App Store verified link
const APP_STORE_URL = 'https://apps.apple.com/id/app/ufuq/id6821979552';

// 6 Core Features in exact required order
interface FeatureItem {
  id: string;
  stepAr: string;
  stepEn: string;
  tagAr: string;
  tagEn: string;
  titleAr: string;
  titleEn: string;
  descAr: string;
  descEn: string;
  image: string;
  icon: React.ElementType;
}

const FEATURES: FeatureItem[] = [
  {
    id: 'home-radio',
    stepAr: '٠١',
    stepEn: '01',
    tagAr: 'الرئيسية · البث المباشر',
    tagEn: 'Home & Radio',
    titleAr: 'الرئيسية وبث إذاعة القرآن الكريم',
    titleEn: 'Home & Live Cairo Quran Radio',
    descAr:
      'واجهة موحدة تعرض آية يومية والعد التنازلي لموعد الصلاة القادم. نتيح الاستماع المباشر لإذاعة القرآن الكريم من القاهرة على مدار الساعة في الخلفية بنقرة واحدة.',
    descEn:
      'A unified home screen displaying the daily verse and next prayer countdown. Listen to live Cairo Quran Radio 24/7 in the background with a single tap.',
    image: 'assets/images/projects/ufuq/ufuq-screen-home.webp',
    icon: Radio,
  },
  {
    id: 'mushaf',
    stepAr: '٠٢',
    stepEn: '02',
    tagAr: 'المصحف الشريف',
    tagEn: 'Holy Quran',
    titleAr: 'المصحف الشريف بالرسم العثماني',
    titleEn: 'Holy Quran in Uthmani Script',
    descAr:
      'مصحف كامل مدمج محلياً داخل التطبيق للقراءة دون الحاجة إلى اتصال بالإنترنت. كُتب بالرسم العثماني المعتمد مع فهرس منظم للسور والأجزاء.',
    descEn:
      'The complete Holy Quran bundled locally for offline reading. Displayed in authentic Uthmani script with an intuitive index for Surahs and Juzs.',
    image: 'assets/images/projects/ufuq/ufuq-screen-quran.webp',
    icon: BookOpen,
  },
  {
    id: 'tasbeeh',
    stepAr: '٠٣',
    stepEn: '03',
    tagAr: 'المسبحة اللمسية',
    tagEn: 'Haptic Tasbeeh',
    titleAr: 'مسبحة إلكترونية بنبضات لمسية',
    titleEn: 'Tactile Electronic Subha',
    descAr:
      'مسبحة رقمية تدعم الأعداد المأثورة (33، 99، 100) أو العدّ المفتوح. تُصدر نبضات اهتزازية لمسية عند كل تسبيحة لتساعدك على الذكر دون النظر إلى الشاشة.',
    descEn:
      'A digital subha supporting standard counts (33, 99, 100) or open tallying. Subtle haptic vibrations at every press allow you to recite without looking at the display.',
    image: 'assets/images/projects/ufuq/ufuq-screen-tasbeeh.webp',
    icon: Fingerprint,
  },
  {
    id: 'prayer-times',
    stepAr: '٠٤',
    stepEn: '04',
    tagAr: 'مواقيت الصلاة',
    tagEn: 'Prayer Timings',
    titleAr: 'مواقيت الصلاة الفلكية والعد التنازلي',
    titleEn: 'Astronomical Prayer Timings',
    descAr:
      'حساب دقيق لمواقيت الصلوات الخمس بحسب إحداثيات موقعك الجغرافي. نقدّم عداداً تنازلياً يوضح الوقت المتبقي لأداء الصلاة القادمة.',
    descEn:
      'Accurate prayer times calculated from your GPS coordinates, featuring a live countdown timer until the next prayer.',
    image: 'assets/images/projects/ufuq/ufuq-screen-prayer.webp',
    icon: Clock,
  },
  {
    id: 'qibla',
    stepAr: '٠٥',
    stepEn: '05',
    tagAr: 'بوصلة القبلة',
    tagEn: 'Qibla Compass',
    titleAr: 'بوصلة القبلة بمستشعرات الجهاز',
    titleEn: 'Sensor-Calibrated Qibla Compass',
    descAr:
      'تحديد مباشر لاتجاه الكعبة المشرفة اعتماداً على مستشعر البوصلة المدمج في هاتفك، مع عرض المسافة المباشرة من موقعك الحالي.',
    descEn:
      'Find the direction of the Holy Kaaba using your device\'s built-in magnetometer, along with the direct distance from your location.',
    image: 'assets/images/projects/ufuq/ufuq-screen-qibla.webp',
    icon: Compass,
  },
  {
    id: 'athkar',
    stepAr: '٠٦',
    stepEn: '06',
    tagAr: 'الأذكار اليومية',
    tagEn: 'Daily Athkar',
    titleAr: 'أذكار اليوم والليلة من حصن المسلم',
    titleEn: 'Daily Diacritized Athkar',
    descAr:
      'أذكار الصباح والمساء وما بعد الصلوات مفرّقة ومشكولة بالكامل. يحتوي كل ذكر على عداد مخصص لتسهيل إتمام التكرارات المطلوبة.',
    descEn:
      'Diacritized morning, evening, and post-prayer supplications from Hisn al-Muslim, each paired with an individual counter.',
    image: 'assets/images/projects/ufuq/ufuq-screen-athkar.webp',
    icon: Heart,
  },
];

/**
 * Pure CSS/SVG Real iPhone Device Mockup
 * Zero heavy external phone frame images; completely hardware-accelerated.
 */
interface PhoneMockupProps {
  activeScreenIndex?: number;
  singleScreenIndex?: number;
  className?: string;
  isFloating?: boolean;
}

const PhoneMockup: React.FC<PhoneMockupProps> = ({
  activeScreenIndex = 0,
  singleScreenIndex,
  className = '',
  isFloating = false,
}) => {
  const isSingle = typeof singleScreenIndex === 'number';

  return (
    <div
      className={`relative mx-auto select-none ${className}`}
      style={{
        width: '100%',
        maxWidth: '310px',
      }}
    >
      {/* Physical Hardware Outer Chassis */}
      <div className="relative rounded-[50px] p-[10px] bg-gradient-to-b from-zinc-700 via-zinc-900 to-zinc-950 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.85),0_0_0_1px_rgba(255,255,255,0.12),0_0_0_8px_#141517]">
        {/* Hardware side button accents (CSS) */}
        <div className="absolute -left-[12px] top-24 w-[3px] h-8 bg-zinc-600 rounded-l-sm" />
        <div className="absolute -left-[12px] top-36 w-[3px] h-12 bg-zinc-600 rounded-l-sm" />
        <div className="absolute -left-[12px] top-52 w-[3px] h-12 bg-zinc-600 rounded-l-sm" />
        <div className="absolute -right-[12px] top-32 w-[3px] h-16 bg-zinc-600 rounded-r-sm" />

        {/* Screen Bezel & Container */}
        <div className="relative rounded-[40px] overflow-hidden bg-black aspect-[470/1024]">
          {/* Top Dynamic Island */}
          <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-[90px] h-[22px] bg-black rounded-full z-30 shadow-md flex items-center justify-end px-2 pointer-events-none">
            {/* Subtle camera lens reflection */}
            <span className="w-2.5 h-2.5 rounded-full bg-[#0a0f1d] ring-1 ring-white/10" />
          </div>

          {/* Screen Content Layers */}
          {isSingle ? (
            <img
              src={getAssetUrl(FEATURES[singleScreenIndex].image)}
              alt={FEATURES[singleScreenIndex].titleAr}
              width={470}
              height={1024}
              loading="lazy"
              className="w-full h-full object-cover object-top"
            />
          ) : (
            FEATURES.map((item, idx) => (
              <img
                key={item.id}
                src={getAssetUrl(item.image)}
                alt={item.titleAr}
                width={470}
                height={1024}
                loading={idx === 0 ? 'eager' : 'lazy'}
                className="absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-500 ease-out"
                style={{
                  opacity: idx === activeScreenIndex ? 1 : 0,
                  pointerEvents: idx === activeScreenIndex ? 'auto' : 'none',
                }}
              />
            ))
          )}

          {/* Screen Glare & Lighting Overlay */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-white/[0.04] via-transparent to-white/[0.02] z-20" />
        </div>
      </div>
    </div>
  );
};

export const UfuqShowcasePage: React.FC = () => {
  // Arabic first per requirement, with English toggle
  const [lang, setLang] = useState<'ar' | 'en'>('ar');
  const isAr = lang === 'ar';

  const [activeFeatureIndex, setActiveFeatureIndex] = useState(0);
  const storyContainerRef = useRef<HTMLDivElement>(null);
  const chapterRefs = useRef<(HTMLDivElement | null)[]>([]);

  const prefersReducedMotion = useReducedMotion();

  // Scroll Progress for 3D tilt & smooth scaling
  const { scrollYProgress } = useScroll({
    target: storyContainerRef,
    offset: ['start start', 'end end'],
  });

  const rotateY = useTransform(
    scrollYProgress,
    [0, 0.2, 0.4, 0.6, 0.8, 1],
    isAr ? [-3, 2, -2, 3, -2, 0] : [3, -2, 2, -3, 2, 0]
  );
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [2, -1, 0]);
  const phoneScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.02, 1]);

  // Set document language and direction
  useEffect(() => {
    document.documentElement.lang = isAr ? 'ar' : 'en';
    document.documentElement.dir = isAr ? 'rtl' : 'ltr';

    const originalTitle = document.title;
    document.title = isAr
      ? 'تطبيق أُفُق (Ufuq) — رفيقك الإسلامي للقرآن، الإذاعة ومواقيت الصلاة'
      : 'Ufuq App — Distraction-Free Quran, Live Radio & Solar Prayer Timings';

    return () => {
      document.title = originalTitle;
      document.documentElement.lang = 'en';
      document.documentElement.dir = 'ltr';
    };
  }, [isAr]);

  // Track active chapter during desktop scroll
  useEffect(() => {
    if (prefersReducedMotion) return;

    const observers: IntersectionObserver[] = [];
    chapterRefs.current.forEach((el, index) => {
      if (!el) return;
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveFeatureIndex(index);
            }
          });
        },
        {
          rootMargin: '-30% 0px -40% 0px',
          threshold: 0.2,
        }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => {
      observers.forEach((o) => o.disconnect());
    };
  }, [prefersReducedMotion]);

  return (
    <div
      className={`min-h-screen bg-[#070b09] text-zinc-100 selection:bg-emerald-500 selection:text-black antialiased ${
        isAr ? 'font-sans' : 'font-sans'
      }`}
      style={{ direction: isAr ? 'rtl' : 'ltr' }}
    >
      {/* ------------------------------------------------------------- */}
      {/* 1. TOP BAR / NAVIGATION                                        */}
      {/* ------------------------------------------------------------- */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-[#070b09]/85 border-b border-emerald-950/40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Logo & App Name */}
          <div className="flex items-center gap-3">
            <img
              src={ufuqIcon}
              alt="Ufuq App Icon"
              width={34}
              height={34}
              className="rounded-xl shadow-md ring-1 ring-white/10"
            />
            <div className="flex items-baseline gap-2">
              <span className="font-bold text-lg text-white tracking-tight">
                {isAr ? 'أُفُق' : 'Ufuq'}
              </span>
              <span className="text-[11px] font-mono text-emerald-400 font-semibold px-2 py-0.5 rounded-full bg-emerald-950/60 border border-emerald-800/40">
                iOS
              </span>
            </div>
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Language Toggle */}
            <button
              onClick={() => setLang(isAr ? 'en' : 'ar')}
              aria-label={isAr ? 'Switch to English' : 'التحويل إلى العربية'}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900/80 hover:bg-zinc-800 text-xs font-mono text-zinc-300 border border-white/10 transition-colors"
            >
              <Globe className="w-3.5 h-3.5 text-emerald-400" />
              <span>{isAr ? 'English' : 'عربي'}</span>
            </button>

            {/* Back to Portfolio Link */}
            <Link
              to="/"
              className="text-xs font-medium text-zinc-400 hover:text-white transition-colors hidden sm:inline-flex items-center gap-1"
            >
              <span>{isAr ? 'ملف الأعمال' : 'Portfolio'}</span>
              {isAr ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
            </Link>

            {/* App Store Download Button */}
            <a
              href={APP_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-xs transition-colors shadow-sm active:scale-95"
            >
              <Apple className="w-4 h-4 fill-black" />
              <span>{isAr ? 'تحميل' : 'Download'}</span>
            </a>
          </div>
        </div>
      </header>

      {/* ------------------------------------------------------------- */}
      {/* 2. HERO SECTION                                               */}
      {/* ------------------------------------------------------------- */}
      <section className="relative pt-16 pb-20 md:pt-24 md:pb-32 overflow-hidden border-b border-emerald-950/30">
        {/* Subtle Ambient Radial Glow */}
        <div className="pointer-events-none absolute top-12 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-emerald-600/10 blur-[130px] rounded-full" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
          {/* App Icon */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="inline-block mb-6"
          >
            <img
              src={ufuqIcon}
              alt="Ufuq App Icon"
              width={88}
              height={88}
              className="rounded-[24px] shadow-2xl ring-1 ring-white/15 mx-auto"
            />
          </motion.div>

          {/* App Title */}
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
            {isAr ? 'تطبيق أُفُق' : 'Ufuq'}
          </h1>

          {/* One-line Tagline (Written by user / Placeholder) */}
          {/* [TODO: ضع جملتك التعريفية المفضلة هنا إن أردت صياغة مخصصة] */}
          {/* [TODO: Replace with your exact one-line tagline if desired] */}
          <p className="text-lg sm:text-xl text-zinc-300 max-w-2xl mx-auto leading-relaxed mb-8">
            {isAr
              ? 'رفيقك اليومي الهادئ للقرآن، الإذاعة المباشرة، ومواقيت الصلاة دون تشتيت.'
              : 'A quiet daily companion for Holy Quran, live Cairo radio, and solar prayer times.'}
          </p>

          {/* Store Badges */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-16">
            {/* App Store Download Badge */}
            <a
              href={APP_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-5 py-3 rounded-xl bg-white hover:bg-zinc-100 text-black shadow-lg transition-all active:scale-95"
            >
              <Apple className="w-6 h-6 fill-black shrink-0" />
              <div className="text-start leading-tight">
                <span className="block text-[10px] font-mono uppercase text-zinc-600">
                  {isAr ? 'حمّل من متجر' : 'Download on the'}
                </span>
                <span className="block text-sm font-bold">App Store</span>
              </div>
            </a>

            {/* Google Play Disabled Coming Soon Badge */}
            <div
              aria-disabled="true"
              className="inline-flex items-center gap-3 px-5 py-3 rounded-xl bg-zinc-900/90 border border-zinc-800 text-zinc-400 opacity-65 cursor-not-allowed select-none"
            >
              <svg className="w-5 h-5 fill-current shrink-0" viewBox="0 0 24 24">
                <path d="M3.609 1.814L13.793 12 3.61 22.186a1.94 1.94 0 0 1-.61-.954V2.768c.15-.36.368-.69.61-.954zm11.6 11.602l2.366-2.366-10.42-6.01 8.054 8.376zm2.366-3.782l1.986 1.147a1.442 1.442 0 0 1 0 2.476l-1.986 1.147-2.366-2.385 2.366-2.385zm-3.782 4.966l-8.054 8.376 10.42-6.01-2.366-2.366z" />
              </svg>
              <div className="text-start leading-tight">
                <span className="block text-[10px] font-mono uppercase text-zinc-500">
                  {isAr ? 'قريباً على' : 'Coming soon to'}
                </span>
                <span className="block text-sm font-semibold text-zinc-300">Google Play</span>
              </div>
            </div>
          </div>

          {/* Phone Mockup Hero Floating Entrance */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 30 }}
            animate={
              prefersReducedMotion
                ? { opacity: 1, y: 0 }
                : { opacity: 1, y: [0, -6, 0] }
            }
            transition={
              prefersReducedMotion
                ? { duration: 0.5 }
                : {
                    opacity: { duration: 0.7, ease: 'easeOut' },
                    y: { duration: 5, repeat: Infinity, ease: 'easeInOut' },
                  }
            }
            className="pt-4 max-w-[310px] mx-auto"
          >
            <PhoneMockup singleScreenIndex={0} isFloating />
          </motion.div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 3. SCROLL STORY (PHONE PINNED)                                */}
      {/* ------------------------------------------------------------- */}

      {/* DESKTOP PINNED STORY (Shown on md+ when reduced motion is NOT requested) */}
      {!prefersReducedMotion && (
        <section
          ref={storyContainerRef}
          className="relative hidden md:block border-b border-emerald-950/30"
          style={{ height: `${FEATURES.length * 90}vh` }}
        >
          {/* Sticky Centered Stage */}
          <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
            <div className="max-w-6xl w-full mx-auto px-6 grid grid-cols-12 gap-8 items-center">
              {/* Text Side (6 columns) */}
              <div className="col-span-6 z-10 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-800/40 text-emerald-300 text-xs font-mono">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>
                    {isAr
                      ? `${FEATURES[activeFeatureIndex].stepAr} / ٠٦ · ${FEATURES[activeFeatureIndex].tagAr}`
                      : `${FEATURES[activeFeatureIndex].stepEn} / 06 · ${FEATURES[activeFeatureIndex].tagEn}`}
                  </span>
                </div>

                <h2 className="text-3xl lg:text-4xl font-bold text-white tracking-tight leading-snug">
                  {isAr
                    ? FEATURES[activeFeatureIndex].titleAr
                    : FEATURES[activeFeatureIndex].titleEn}
                </h2>

                <p className="text-base lg:text-lg text-zinc-300 leading-relaxed max-w-md">
                  {isAr
                    ? FEATURES[activeFeatureIndex].descAr
                    : FEATURES[activeFeatureIndex].descEn}
                </p>

                {/* Step Indicators / Quick Jump */}
                <div className="pt-4 flex items-center gap-2">
                  {FEATURES.map((feat, idx) => (
                    <button
                      key={feat.id}
                      onClick={() => {
                        const targetEl = chapterRefs.current[idx];
                        if (targetEl) {
                          targetEl.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                      aria-label={`Jump to ${feat.titleEn}`}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        idx === activeFeatureIndex
                          ? 'w-8 bg-emerald-400'
                          : 'w-2 bg-zinc-700 hover:bg-zinc-500'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Phone Mockup Side with 3D Tilt & Scale (6 columns) */}
              <div className="col-span-6 flex items-center justify-center z-10" style={{ perspective: 1200 }}>
                <motion.div
                  style={{
                    rotateY,
                    rotateX,
                    scale: phoneScale,
                    transformStyle: 'preserve-3d',
                  }}
                >
                  <PhoneMockup activeScreenIndex={activeFeatureIndex} />
                </motion.div>
              </div>
            </div>
          </div>

          {/* Invisible Scroll Track Markers */}
          <div className="absolute inset-0 pointer-events-none">
            {FEATURES.map((feat, idx) => (
              <div
                key={feat.id}
                ref={(el) => {
                  chapterRefs.current[idx] = el;
                }}
                className="h-[90vh]"
              />
            ))}
          </div>
        </section>
      )}

      {/* MOBILE & REDUCED MOTION STATIC STACKED STORY */}
      {/* (Mobile: no pinning; phone appears inline per section) */}
      <section
        className={`${
          prefersReducedMotion ? 'block' : 'block md:hidden'
        } py-16 px-4 sm:px-6 divide-y divide-emerald-950/30 border-b border-emerald-950/30`}
      >
        <div className="max-w-xl mx-auto space-y-16">
          {FEATURES.map((feat, idx) => (
            <div key={feat.id} className="pt-12 first:pt-0 space-y-6">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-800/40 text-emerald-300 text-xs font-mono">
                  <span>
                    {isAr
                      ? `${feat.stepAr} / ٠٦ · ${feat.tagAr}`
                      : `${feat.stepEn} / 06 · ${feat.tagEn}`}
                  </span>
                </div>

                <h2 className="text-2xl font-bold text-white tracking-tight">
                  {isAr ? feat.titleAr : feat.titleEn}
                </h2>

                <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
                  {isAr ? feat.descAr : feat.descEn}
                </p>
              </div>

              {/* Mobile Inline Phone Mockup */}
              <div className="pt-2">
                <PhoneMockup singleScreenIndex={idx} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 4. ADS AND PRIVACY NOTE                                       */}
      {/* ------------------------------------------------------------- */}
      <section className="py-16 md:py-24 px-4 sm:px-6 border-b border-emerald-950/30 bg-[#060e0a]">
        <div className="max-w-2xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-emerald-950/80 border border-emerald-800/40 text-emerald-400 mx-auto shadow-inner">
            <ShieldCheck className="w-6 h-6" />
          </div>

          <h2 className="text-2xl font-bold text-white tracking-tight">
            {isAr ? 'الخصوصية والإعلانات' : 'Privacy & Advertisements'}
          </h2>

          <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
            {isAr
              ? 'نحترم خصوصيتك: لا يتطلب تطبيق أُفق إنشاء حساب ولا يسجل أي بيانات عنك. نعرض فقط إعلانات خفيفة وبسيطة للمساهمة في استمرار خوادم البث المباشر لإذاعة القرآن الكريم، ونحرص تماماً على ألا تقطع تلاوتك أو خشوعك في الصلاة.'
              : 'We value your privacy: Ufuq requires no account registration and collects no personal or religious data. We display only minimal, non-intrusive ads to help support server bandwidth for the live radio stream, carefully designed never to interrupt your Quran reading or prayer.'}
          </p>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 5. FINAL SECTION: BIG QR CODE & APP STORE                     */}
      {/* ------------------------------------------------------------- */}
      <section className="py-20 md:py-28 px-4 sm:px-6 border-b border-emerald-950/30 relative">
        <div className="max-w-3xl mx-auto">
          <div className="p-8 sm:p-12 rounded-3xl bg-zinc-900/70 border border-emerald-900/40 shadow-2xl relative overflow-hidden text-center sm:text-start">
            {/* Ambient Background Glow */}
            <div className="pointer-events-none absolute -top-20 -right-20 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl" />

            <div className="flex flex-col sm:flex-row items-center gap-8 relative z-10">
              {/* Build-Time Generated QR Code SVG */}
              <div className="p-3 bg-zinc-950 rounded-2xl border border-white/10 shadow-lg shrink-0">
                <img
                  src={getAssetUrl('assets/images/projects/ufuq/ufuq-qr-dark.svg')}
                  alt="App Store QR Code"
                  width={160}
                  height={160}
                  className="w-40 h-40 block"
                />
              </div>

              {/* Action Content */}
              <div className="space-y-4 flex-1">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {isAr ? 'حمّل تطبيق أُفق الآن' : 'Download Ufuq Today'}
                </h2>

                <p className="text-sm text-zinc-300 leading-relaxed">
                  {isAr
                    ? 'امسح رمز الاستجابة السريعة بكاميرا هاتفك أو اضغط على الزر أدناه للانتقال المباشر إلى صفحة التطبيق في متجر App Store.'
                    : 'Scan the QR code with your iPhone camera or tap the badge below to view the app directly on the App Store.'}
                </p>

                {/* App Store Badge */}
                <div className="pt-2 flex flex-col sm:flex-row items-center sm:items-start gap-3">
                  <a
                    href={APP_STORE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 px-5 py-3 rounded-xl bg-white hover:bg-zinc-100 text-black shadow-lg transition-all active:scale-95"
                  >
                    <Apple className="w-6 h-6 fill-black shrink-0" />
                    <div className="text-start leading-tight">
                      <span className="block text-[10px] font-mono uppercase text-zinc-600">
                        {isAr ? 'حمّل من متجر' : 'Download on the'}
                      </span>
                      <span className="block text-sm font-bold">App Store</span>
                    </div>
                  </a>
                </div>

                {/* Android Notice */}
                <div className="pt-1">
                  <span className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/80" />
                    {isAr ? 'قريباً على أندرويد (Google Play)' : 'Android coming soon (Google Play)'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 6. MINIMAL FOOTER                                             */}
      {/* ------------------------------------------------------------- */}
      <footer className="py-10 px-4 sm:px-6 bg-[#050806] text-xs text-zinc-500 font-mono">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-start">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-zinc-300">{isAr ? 'أُفُق' : 'Ufuq'}</span>
            <span>·</span>
            <span>© {new Date().getFullYear()}</span>
          </div>

          <div className="flex items-center gap-6">
            <Link to="/" className="text-zinc-400 hover:text-emerald-400 transition-colors">
              {isAr ? 'ملف أعمال زياد وائل' : 'Zyad Wael Portfolio'}
            </Link>
            <a
              href="https://github.com/ZyadWKhedr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-emerald-400 transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default UfuqShowcasePage;
