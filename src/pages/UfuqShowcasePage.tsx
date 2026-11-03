import React, { useState, useEffect, useRef } from 'react';
import {
  Apple,
  ShieldCheck,
  Radio,
  BookOpen,
  Fingerprint,
  Clock,
  Compass,
  Heart,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import ufuqIcon from '@/assets/ufuq-icon.png';
import { getAssetUrl } from '@/lib/utils';

// App Store verified link
const APP_STORE_URL = 'https://apps.apple.com/id/app/ufuq/id6821979552';

interface FeatureItem {
  id: string;
  stepAr: string;
  stepEn: string;
  shortNameAr: string;
  shortNameEn: string;
  tagAr: string;
  tagEn: string;
  titleAr: string;
  titleEn: string;
  descAr: string;
  descEn: string;
  image: string;
  fallbackImage: string;
  icon: React.ElementType;
}

const FEATURES: FeatureItem[] = [
  {
    id: 'home-radio',
    stepAr: '٠١',
    stepEn: '01',
    shortNameAr: 'الرئيسية والإذاعة',
    shortNameEn: 'Home & Radio',
    tagAr: 'الرئيسية · البث المباشر',
    tagEn: 'Home & Radio',
    titleAr: 'الرئيسية وبث إذاعة القرآن الكريم',
    titleEn: 'Home & Live Cairo Quran Radio',
    descAr:
      'واجهة موحدة تعرض آية يومية والعد التنازلي لموعد الصلاة القادم. نتيح الاستماع المباشر لإذاعة القرآن الكريم من القاهرة على مدار الساعة في الخلفية بنقرة واحدة.',
    descEn:
      'A unified home screen displaying the daily verse and next prayer countdown. Listen to live Cairo Quran Radio 24/7 in the background with a single tap.',
    image: 'assets/images/projects/ufuq/ufuq-screen-home.webp',
    fallbackImage: 'assets/images/projects/ufuq/ufuq-real-home.jpg',
    icon: Radio,
  },
  {
    id: 'mushaf',
    stepAr: '٠٢',
    stepEn: '02',
    shortNameAr: 'المصحف الشريف',
    shortNameEn: 'Holy Quran',
    tagAr: 'المصحف الشريف',
    tagEn: 'Holy Quran',
    titleAr: 'المصحف الشريف بالرسم العثماني',
    titleEn: 'Holy Quran in Uthmani Script',
    descAr:
      'مصحف كامل مدمج محلياً داخل التطبيق للقراءة دون الحاجة إلى اتصال بالإنترنت. كُتب بالرسم العثماني المعتمد مع فهرس منظم للسور والأجزاء.',
    descEn:
      'The complete Holy Quran bundled locally for offline reading. Displayed in authentic Uthmani script with an intuitive index for Surahs and Juzs.',
    image: 'assets/images/projects/ufuq/ufuq-screen-quran.webp',
    fallbackImage: 'assets/images/projects/ufuq/ufuq-real-quran.jpg',
    icon: BookOpen,
  },
  {
    id: 'tasbeeh',
    stepAr: '٠٣',
    stepEn: '03',
    shortNameAr: 'المسبحة اللمسية',
    shortNameEn: 'Subha Counter',
    tagAr: 'المسبحة اللمسية',
    tagEn: 'Haptic Tasbeeh',
    titleAr: 'مسبحة إلكترونية بنبضات لمسية',
    titleEn: 'Tactile Electronic Subha',
    descAr:
      'مسبحة رقمية تدعم الأعداد المأثورة (33، 99، 100) أو العدّ المفتوح. تُصدر نبضات اهتزازية لمسية عند كل تسبيحة لتساعدك على الذكر دون النظر إلى الشاشة.',
    descEn:
      'A digital subha supporting standard counts (33, 99, 100) or open tallying. Subtle haptic vibrations at every press allow you to recite without looking at the display.',
    image: 'assets/images/projects/ufuq/ufuq-screen-tasbeeh.webp',
    fallbackImage: 'assets/images/projects/ufuq/ufuq-real-subha.png',
    icon: Fingerprint,
  },
  {
    id: 'prayer-times',
    stepAr: '٠٤',
    stepEn: '04',
    shortNameAr: 'مواقيت الصلاة',
    shortNameEn: 'Prayer Times',
    tagAr: 'مواقيت الصلاة',
    tagEn: 'Prayer Timings',
    titleAr: 'مواقيت الصلاة الفلكية والعد التنازلي',
    titleEn: 'Astronomical Prayer Timings',
    descAr:
      'حساب دقيق لمواقيت الصلوات الخمس بحسب إحداثيات موقعك الجغرافي. نقدّم عداداً تنازلياً يوضح الوقت المتبقي لأداء الصلاة القادمة.',
    descEn:
      'Accurate prayer times calculated from your GPS coordinates, featuring a live countdown timer until the next prayer.',
    image: 'assets/images/projects/ufuq/ufuq-screen-prayer.webp',
    fallbackImage: 'assets/images/projects/ufuq/ufuq-real-prayer.jpg',
    icon: Clock,
  },
  {
    id: 'qibla',
    stepAr: '٠٥',
    stepEn: '05',
    shortNameAr: 'بوصلة القبلة',
    shortNameEn: 'Qibla Compass',
    tagAr: 'بوصلة القبلة',
    tagEn: 'Qibla Compass',
    titleAr: 'بوصلة القبلة بمستشعرات الجهاز',
    titleEn: 'Sensor-Calibrated Qibla Compass',
    descAr:
      'تحديد مباشر لاتجاه الكعبة المشرفة اعتماداً على مستشعر البوصلة المدمج في هاتفك، مع عرض المسافة المباشرة من موقعك الحالي.',
    descEn:
      'Find the direction of the Holy Kaaba using your device\'s built-in magnetometer, along with the direct distance from your location.',
    image: 'assets/images/projects/ufuq/ufuq-screen-qibla.webp',
    fallbackImage: 'assets/images/projects/ufuq/ufuq-real-qibla.png',
    icon: Compass,
  },
  {
    id: 'athkar',
    stepAr: '٠٦',
    stepEn: '06',
    shortNameAr: 'الأذكار اليومية',
    shortNameEn: 'Daily Athkar',
    tagAr: 'الأذكار اليومية',
    tagEn: 'Daily Athkar',
    titleAr: 'أذكار اليوم والليلة من حصن المسلم',
    titleEn: 'Daily Diacritized Athkar',
    descAr:
      'أذكار الصباح والمساء وما بعد الصلوات مفرّقة ومشكولة بالكامل. يحتوي كل ذكر على عداد مخصص لتسهيل إتمام التكرارات المطلوبة.',
    descEn:
      'Diacritized morning, evening, and post-prayer supplications from Hisn al-Muslim, each paired with an individual counter.',
    image: 'assets/images/projects/ufuq/ufuq-screen-athkar.webp',
    fallbackImage: 'assets/images/projects/ufuq/ufuq-real-athkar.png',
    icon: Heart,
  },
];

/**
 * Pure CSS/SVG Real iPhone Device Frame
 * Locked explicit pixel dimensions (295px width, 630px height) ensuring it can never collapse.
 */
interface PhoneMockupProps {
  activeScreenIndex?: number;
  singleScreenIndex?: number;
  className?: string;
}

const PhoneMockup: React.FC<PhoneMockupProps> = ({
  activeScreenIndex = 0,
  singleScreenIndex,
  className = '',
}) => {
  const isSingle = typeof singleScreenIndex === 'number';

  return (
    <div className={`relative select-none shrink-0 ${className}`}>
      {/* Soft Ambient Radial Backlight behind Phone */}
      <div className="absolute -inset-8 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />

      {/* Physical Hardware Outer Chassis - Explicit Width & Height */}
      <div className="relative w-[280px] h-[585px] sm:w-[300px] sm:h-[630px] rounded-[48px] p-[10px] sm:p-[11px] bg-gradient-to-b from-zinc-700 via-zinc-800 to-zinc-950 border border-white/20 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.9),0_0_0_1px_rgba(255,255,255,0.1),0_0_0_6px_#18191c]">
        {/* Hardware side buttons */}
        <div className="absolute -left-[9px] top-24 w-[3px] h-8 bg-zinc-500 rounded-l-sm" />
        <div className="absolute -left-[9px] top-36 w-[3px] h-12 bg-zinc-500 rounded-l-sm" />
        <div className="absolute -left-[9px] top-52 w-[3px] h-12 bg-zinc-500 rounded-l-sm" />
        <div className="absolute -right-[9px] top-32 w-[3px] h-16 bg-zinc-500 rounded-r-sm" />

        {/* Screen Bezel & Container - Explicit Height */}
        <div className="relative w-full h-full rounded-[38px] overflow-hidden bg-black shadow-inner ring-1 ring-white/10">
          {/* Top Dynamic Island */}
          <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-[85px] h-[22px] bg-black rounded-full z-30 shadow-md flex items-center justify-end px-2 pointer-events-none">
            <span className="w-2.5 h-2.5 rounded-full bg-[#0a0f1d] ring-1 ring-white/15" />
          </div>

          {/* Screen Content Layers */}
          {isSingle ? (
            <img
              src={getAssetUrl(FEATURES[singleScreenIndex].image)}
              alt={FEATURES[singleScreenIndex].titleAr}
              width={470}
              height={1024}
              loading="lazy"
              className="w-full h-full object-cover object-top block"
              onError={(e) => {
                const target = e.currentTarget;
                const fallback = FEATURES[singleScreenIndex].fallbackImage;
                if (fallback && target.src !== getAssetUrl(fallback)) {
                  target.src = getAssetUrl(fallback);
                }
              }}
            />
          ) : (
            FEATURES.map((item, idx) => (
              <img
                key={item.id}
                src={getAssetUrl(item.image)}
                alt={item.titleAr}
                width={470}
                height={1024}
                loading={idx <= 1 ? 'eager' : 'lazy'}
                className="absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-300 ease-out block"
                style={{
                  opacity: idx === activeScreenIndex ? 1 : 0,
                  zIndex: idx === activeScreenIndex ? 10 : 1,
                  pointerEvents: idx === activeScreenIndex ? 'auto' : 'none',
                }}
                onError={(e) => {
                  const target = e.currentTarget;
                  const fallback = item.fallbackImage;
                  if (fallback && target.src !== getAssetUrl(fallback)) {
                    target.src = getAssetUrl(fallback);
                  }
                }}
              />
            ))
          )}

          {/* Screen Glare & Lighting Overlay */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-white/[0.06] via-transparent to-white/[0.02] z-20" />
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
  const chapterRefs = useRef<(HTMLDivElement | null)[]>([]);

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

  // Track active chapter during scrolling on desktop with IntersectionObserver
  useEffect(() => {
    if (typeof window === 'undefined') return;

    if ('IntersectionObserver' in window) {
      const observers: IntersectionObserver[] = [];
      chapterRefs.current.forEach((el, index) => {
        if (!el) return;
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                setActiveFeatureIndex(index);
              }
            });
          },
          {
            rootMargin: '-20% 0px -20% 0px',
            threshold: 0.3,
          }
        );
        observer.observe(el);
        observers.push(observer);
      });

      return () => {
        observers.forEach((obs) => obs.disconnect());
      };
    } else {
      // Fallback scroll listener
      const handleScroll = () => {
        const scrollPosition = window.scrollY + window.innerHeight * 0.45;
        chapterRefs.current.forEach((el, index) => {
          if (!el) return;
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveFeatureIndex(index);
          }
        });
      };

      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const scrollToFeature = (index: number) => {
    setActiveFeatureIndex(index);
    const targetEl = chapterRefs.current[index];
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div
      className="min-h-screen bg-[#070b09] text-zinc-100 selection:bg-emerald-500 selection:text-black antialiased font-sans"
      style={{ direction: isAr ? 'rtl' : 'ltr' }}
    >
      {/* ------------------------------------------------------------- */}
      {/* 1. TOP BAR / NAVIGATION (Clean, human, unbloated)              */}
      {/* ------------------------------------------------------------- */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-[#070b09]/90 border-b border-white/[0.07]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Logo & App Name */}
          <Link to="/ufuq" className="flex items-center gap-2.5 group">
            <img
              src={ufuqIcon}
              alt="Ufuq App Icon"
              width={30}
              height={30}
              className="rounded-lg shadow ring-1 ring-white/15"
            />
            <span className="font-bold text-lg text-white tracking-tight group-hover:text-emerald-400 transition-colors">
              {isAr ? 'أُفُق' : 'Ufuq'}
            </span>
          </Link>

          {/* Right Controls: Minimal & Natural */}
          <div className="flex items-center gap-3">
            {/* Language Switcher */}
            <button
              onClick={() => setLang(isAr ? 'en' : 'ar')}
              aria-label={isAr ? 'Switch to English' : 'التحويل إلى العربية'}
              className="px-2.5 py-1 rounded-md text-xs font-mono text-zinc-400 hover:text-white transition-colors"
            >
              {isAr ? 'English' : 'العربية'}
            </button>

            {/* Direct App Store Download Button */}
            <a
              href={APP_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-white hover:bg-zinc-100 text-black font-semibold text-xs transition-colors shadow-sm active:scale-95"
            >
              <Apple className="w-3.5 h-3.5 fill-black" />
              <span>App Store</span>
            </a>
          </div>
        </div>
      </header>

      {/* ------------------------------------------------------------- */}
      {/* 2. HERO SECTION                                               */}
      {/* ------------------------------------------------------------- */}
      <section className="relative pt-16 pb-16 md:pt-20 md:pb-20 overflow-hidden border-b border-white/[0.07]">
        {/* Ambient Radial Glow */}
        <div className="pointer-events-none absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-emerald-600/10 blur-[130px] rounded-full" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
          {/* App Icon */}
          <div className="inline-block mb-6">
            <img
              src={ufuqIcon}
              alt="Ufuq App Icon"
              width={88}
              height={88}
              className="rounded-[24px] shadow-2xl ring-1 ring-white/15 mx-auto"
            />
          </div>

          {/* App Title */}
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
            {isAr ? 'تطبيق أُفُق' : 'Ufuq'}
          </h1>

          {/* One-line Tagline */}
          <p className="text-lg sm:text-xl text-zinc-300 max-w-2xl mx-auto leading-relaxed mb-8">
            {isAr
              ? 'رفيقك اليومي الهادئ للقرآن، الإذاعة المباشرة، ومواقيت الصلاة دون تشتيت.'
              : 'A quiet daily companion for Holy Quran, live Cairo radio, and solar prayer times.'}
          </p>

          {/* Store Badges */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
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
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 3. SCROLL STORY (2-COLUMN SPLIT PRESENTATION)                  */}
      {/* ------------------------------------------------------------- */}

      {/* DESKTOP SPLIT STORY (md+) */}
      <section className="relative hidden md:block py-16 px-6 max-w-6xl mx-auto border-b border-white/[0.07]">
        {/* Quick-Jump Feature Filter Pills at Top */}
        <div className="flex items-center justify-center gap-2 mb-12 flex-wrap">
          {FEATURES.map((feat, idx) => {
            const Icon = feat.icon;
            const isActive = idx === activeFeatureIndex;
            return (
              <button
                key={feat.id}
                onClick={() => scrollToFeature(idx)}
                className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-emerald-500 text-black font-semibold shadow-md ring-1 ring-emerald-400'
                    : 'bg-zinc-900/80 text-zinc-400 hover:text-white border border-white/10'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{isAr ? feat.shortNameAr : feat.shortNameEn}</span>
              </button>
            );
          })}
        </div>

        {/* 2-Column Split: Sticky Phone on One Side, Scrolling Chapters on the Other */}
        <div className="grid grid-cols-12 gap-8 lg:gap-12 items-start relative">
          {/* Scrolling Text Chapters (7 columns) */}
          <div className="col-span-7 space-y-6">
            {FEATURES.map((feat, idx) => {
              const Icon = feat.icon;
              const isActive = idx === activeFeatureIndex;
              return (
                <div
                  key={feat.id}
                  id={feat.id}
                  ref={(el) => {
                    chapterRefs.current[idx] = el;
                  }}
                  onClick={() => scrollToFeature(idx)}
                  className={`p-8 lg:p-10 rounded-3xl transition-all duration-300 cursor-pointer min-h-[380px] flex flex-col justify-center border ${
                    isActive
                      ? 'bg-zinc-900/90 border-emerald-500/40 shadow-2xl shadow-emerald-950/40 ring-1 ring-emerald-500/20'
                      : 'bg-zinc-950/40 border-white/[0.06] hover:border-white/15 opacity-60 hover:opacity-90'
                  }`}
                >
                  <div className="space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/70 border border-emerald-800/40 text-emerald-300 text-xs font-mono w-fit">
                      <Icon className="w-3.5 h-3.5" />
                      <span>
                        {isAr
                          ? `${feat.stepAr} / ٠٦ · ${feat.tagAr}`
                          : `${feat.stepEn} / 06 · ${feat.tagEn}`}
                      </span>
                    </div>

                    <h2 className="text-2xl lg:text-3xl font-bold text-white tracking-tight">
                      {isAr ? feat.titleAr : feat.titleEn}
                    </h2>

                    <p className="text-base text-zinc-300 leading-relaxed max-w-xl">
                      {isAr ? feat.descAr : feat.descEn}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Sticky Phone Column (5 columns, pinned in viewport alongside chapters) */}
          <div className="col-span-5 sticky top-28 flex flex-col items-center justify-center py-2">
            <PhoneMockup activeScreenIndex={activeFeatureIndex} />

            {/* Quick-Jump Step Dots under the Phone */}
            <div className="mt-6 flex items-center gap-2">
              {FEATURES.map((feat, idx) => {
                const isActive = idx === activeFeatureIndex;
                return (
                  <button
                    key={feat.id}
                    onClick={() => scrollToFeature(idx)}
                    aria-label={`Jump to ${feat.titleEn}`}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      isActive
                        ? 'w-7 bg-emerald-400'
                        : 'w-2 bg-zinc-700 hover:bg-zinc-500'
                    }`}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* MOBILE STORY (< md) */}
      <section className="block md:hidden py-12 px-4 sm:px-6 divide-y divide-white/[0.07] border-b border-white/[0.07]">
        <div className="max-w-xl mx-auto space-y-14">
          {FEATURES.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div key={feat.id} className="pt-10 first:pt-0 space-y-5">
                <div className="space-y-2.5">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/70 border border-emerald-800/40 text-emerald-300 text-xs font-mono">
                    <Icon className="w-3.5 h-3.5" />
                    <span>
                      {isAr
                        ? `${feat.stepAr} / ٠٦ · ${feat.tagAr}`
                        : `${feat.stepEn} / 06 · ${feat.tagEn}`}
                    </span>
                  </div>

                  <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    {isAr ? feat.titleAr : feat.titleEn}
                  </h2>

                  <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
                    {isAr ? feat.descAr : feat.descEn}
                  </p>
                </div>

                {/* Mobile Inline Phone Mockup */}
                <div className="pt-2 flex justify-center">
                  <PhoneMockup singleScreenIndex={idx} />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 4. ADS AND PRIVACY NOTE                                       */}
      {/* ------------------------------------------------------------- */}
      <section className="py-16 md:py-20 px-4 sm:px-6 border-b border-white/[0.07] bg-[#060e0a]">
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
      <section className="py-16 md:py-24 px-4 sm:px-6 border-b border-white/[0.07] relative">
        <div className="max-w-3xl mx-auto">
          <div className="p-8 sm:p-12 rounded-3xl bg-zinc-900/60 border border-white/10 shadow-2xl relative overflow-hidden text-center sm:text-start">
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
      <footer className="py-8 px-4 sm:px-6 bg-[#050806] text-xs text-zinc-500 font-mono">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-start">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-zinc-300">{isAr ? 'أُفُق' : 'Ufuq'}</span>
            <span>·</span>
            <span>© {new Date().getFullYear()}</span>
          </div>

          <div className="flex items-center gap-6">
            <Link to="/" className="text-zinc-400 hover:text-emerald-400 transition-colors">
              {isAr ? 'ملف الأعمال' : 'Portfolio'}
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
