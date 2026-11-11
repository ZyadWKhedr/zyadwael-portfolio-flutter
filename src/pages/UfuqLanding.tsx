import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  Clock,
  Compass,
  Radio,
  Sparkles,
  Smartphone,
  WifiOff,
  Calendar,
  Bell,
  Shield,
  Check,
  ExternalLink,
  Globe,
  Menu,
  X,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  Heart,
  Share2,
} from 'lucide-react';
import ufuqIcon from '@/assets/ufuq-icon.png';

// Asset helper ensuring correct path under Vite base URL
const getAssetUrl = (path: string) => {
  const base = import.meta.env.BASE_URL || '/';
  const cleanBase = base.endsWith('/') ? base : `${base}/`;
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${cleanBase}${cleanPath}`;
};

const APP_STORE_URL = 'https://apps.apple.com/us/app/ufuq/id6821979552';

interface FeatureItem {
  id: string;
  number: string;
  titleAr: string;
  titleEn: string;
  descAr: string;
  descEn: string;
  tagAr: string;
  tagEn: string;
  image: string;
}

const FEATURES: FeatureItem[] = [
  {
    id: 'quran',
    number: '01',
    titleAr: 'القرآن الكريم',
    titleEn: 'The Holy Quran',
    descAr: 'اقرأ القرآن الكريم بالرسم العثماني، واستمتع بتجربة قراءة متاحة دون اتصال بالإنترنت.',
    descEn: 'Read the Holy Quran in authentic Uthmani script with complete offline availability.',
    tagAr: 'الرسم العثماني · متاح بدون إنترنت',
    tagEn: 'Uthmani Script · Offline Reader',
    image: getAssetUrl('assets/images/projects/ufuq/ufuq-screen-1.jpg'),
  },
  {
    id: 'prayer',
    number: '02',
    titleAr: 'مواقيت الصلاة',
    titleEn: 'Prayer Times',
    descAr: 'تابع مواقيت الصلوات الخمس، واعرف موعد الصلاة القادمة بسهولة.',
    descEn: 'Track the five daily prayers and effortlessly know the exact countdown to the upcoming prayer.',
    tagAr: 'حساب فلكي دقيق · عداد تنازلي',
    tagEn: 'Precise Astronomical GPS · Next Prayer',
    image: getAssetUrl('assets/images/projects/ufuq/ufuq-screen-2.jpg'),
  },
  {
    id: 'tasbeeh',
    number: '03',
    titleAr: 'المسبحة الإلكترونية',
    titleEn: 'Electronic Tasbeeh',
    descAr: 'حافظ على وردك اليومي مع مسبحة إلكترونية سهلة الاستخدام وخيارات متعددة للأذكار.',
    descEn: 'Maintain your daily remembrance with an intuitive digital Tasbeeh counter and customizable supplications.',
    tagAr: 'اهتزاز لمسي · خيارات متعددة',
    tagEn: 'Haptic Feedback · Multiple Presets',
    image: getAssetUrl('assets/images/projects/ufuq/ufuq-screen-3.jpg'),
  },
  {
    id: 'qibla',
    number: '04',
    titleAr: 'اتجاه القبلة',
    titleEn: 'Qibla Direction',
    descAr: 'اعرف اتجاه القبلة أينما كنت باستخدام بوصلة جهازك.',
    descEn: 'Find the exact direction of the Kaaba wherever you are using your device compass.',
    tagAr: 'بوصلة رقمية دقيقة · تحديد تلقائي',
    tagEn: 'Digital Magnetometer · Auto Calibration',
    image: getAssetUrl('assets/images/projects/ufuq/ufuq-screen-4.jpg'),
  },
  {
    id: 'athkar',
    number: '05',
    titleAr: 'الأذكار اليومية',
    titleEn: 'Daily Athkar',
    descAr: 'أذكار الصباح والمساء وما بعد الصلاة، مع عداد يساعدك على متابعة تكرار الأذكار.',
    descEn: 'Morning, evening, and post-prayer supplications with an interactive repetition counter.',
    tagAr: 'حصن المسلم · عداد التكرار',
    tagEn: 'Hisn al-Muslim · Repetition Tracker',
    image: getAssetUrl('assets/images/projects/ufuq/ufuq-screen-5.jpg'),
  },
  {
    id: 'radio',
    number: '06',
    titleAr: 'إذاعة القرآن الكريم',
    titleEn: 'Quran Radio Stream',
    descAr: 'استمع إلى إذاعة القرآن الكريم من القاهرة مباشرة.',
    descEn: 'Stream the official Holy Quran recitation radio broadcast directly from Cairo 24/7.',
    tagAr: 'بث مباشر 24/7 · تلاوات خاشعة',
    tagEn: 'Live Cairo Radio · 24/7 Streaming',
    image: getAssetUrl('assets/images/projects/ufuq/ufuq-screen-6.jpg'),
  },
];

interface ExtraFeature {
  titleAr: string;
  titleEn: string;
  descAr: string;
  descEn: string;
  icon: React.ComponentType<{ className?: string }>;
}

const EXTRA_FEATURES: ExtraFeature[] = [
  {
    titleAr: 'تقويم هجري',
    titleEn: 'Hijri Calendar',
    descAr: 'متابعة المناسبات والتواريخ والشهور الإسلامية بدقة وسهولة.',
    descEn: 'Accurate Islamic calendar tracking dates, seasons, and religious milestones.',
    icon: Calendar,
  },
  {
    titleAr: 'أدوات للشاشة الرئيسية',
    titleEn: 'Home Screen Widgets',
    descAr: 'ودجات ذكية لمواقيت الصلاة والورد اليومي دون الحاجة لفتح التطبيق.',
    descEn: 'Serene home screen widgets displaying upcoming prayer times and daily verses.',
    icon: Smartphone,
  },
  {
    titleAr: 'تذكيرات بمواقيت الصلاة',
    titleEn: 'Prayer Notifications',
    descAr: 'تنبيهات هادئة عند حلول وقت كل صلاة لتنظيم يومك.',
    descEn: 'Gentle, customizable Adhan alerts keeping your daily schedule in harmony.',
    icon: Bell,
  },
  {
    titleAr: 'تنبيهات للأيام المباركة',
    titleEn: 'Islamic Occasions Alerts',
    descAr: 'إشعارات بأيام الصيام والسنن كالإثنين والخميس والأيام البيض.',
    descEn: 'Timely reminders for recommended fasts, Sunnah days, and holy seasons.',
    icon: Sparkles,
  },
  {
    titleAr: 'أسماء الله الحسنى',
    titleEn: 'The 99 Beautiful Names',
    descAr: 'استعراض أسماء الله الحسنى وتدبر معانيها الجليلة.',
    descEn: 'Reflect upon the 99 Names of Allah with clear explanations and meanings.',
    icon: Heart,
  },
];

export const UfuqLanding: React.FC = () => {
  const [lang, setLang] = useState<'ar' | 'en'>('ar');
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeImageModal, setActiveImageModal] = useState<{ src: string; caption: string } | null>(null);
  const [showPlayModal, setShowPlayModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);

  const isRtl = lang === 'ar';

  // Scroll listener for sticky navigation
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keyboard escape listener for modals
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (activeImageModal) setActiveImageModal(null);
        if (showPlayModal) setShowPlayModal(false);
        if (showPrivacyModal) setShowPrivacyModal(false);
        if (mobileMenuOpen) setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeImageModal, showPlayModal, showPrivacyModal, mobileMenuOpen]);

  const toggleLanguage = () => {
    setLang((prev) => (prev === 'ar' ? 'en' : 'ar'));
  };

  return (
    <div
      dir={isRtl ? 'rtl' : 'ltr'}
      className={`min-h-screen text-[#292D27] bg-[#F8F6EF] transition-colors duration-200 selection:bg-[#B5A36A]/30 selection:text-[#164A3A] ${
        isRtl ? 'font-arabic' : 'font-sans'
      }`}
      style={{
        // Dedicated typography & layout variables for Ufuq
        fontFamily: isRtl
          ? "'IBM Plex Sans Arabic', 'Cairo', system-ui, sans-serif"
          : "'Inter', system-ui, sans-serif",
      }}
    >
      {/* ========================================================================= */}
      {/* 00 · NAVIGATION HEADER (72px Height) */}
      {/* ========================================================================= */}
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-200 h-[72px] flex items-center ${
          scrolled
            ? 'bg-[#F8F6EF]/92 backdrop-blur-md border-b border-[#E9E5D9] shadow-sm'
            : 'bg-[#F8F6EF]/80 backdrop-blur-sm border-b border-transparent'
        }`}
      >
        <div className="container max-w-[1160px] mx-auto px-5 sm:px-8 lg:px-10 flex items-center justify-between">
          {/* Brand Identity (Logo on Right for Arabic RTL, on Left for LTR) */}
          <a
            href="#hero"
            className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#164A3A] rounded-lg"
            aria-label="Ufuq App Homepage"
          >
            <div className="w-10 h-10 rounded-xl overflow-hidden bg-white border border-[#E9E5D9] shadow-sm p-1 shrink-0 flex items-center justify-center transition-transform group-hover:scale-105 duration-200">
              <img
                src={ufuqIcon}
                alt="Ufuq App Icon"
                width="40"
                height="40"
                className="w-full h-full object-contain rounded-lg"
              />
            </div>
            <div className="flex flex-col text-start">
              <span className="font-bold text-lg text-[#164A3A] tracking-tight leading-none">
                {isRtl ? 'أُفُق' : 'Ufuq'}
              </span>
              <span className="text-[11px] text-[#77796F] mt-0.5 leading-none">
                {isRtl ? 'رفيقك في تفاصيل يومك' : 'Islamic Companion'}
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-[#77796F]">
            <a href="#features" className="hover:text-[#164A3A] transition-colors py-1">
              {isRtl ? 'المميزات' : 'Features'}
            </a>
            <a href="#offline" className="hover:text-[#164A3A] transition-colors py-1">
              {isRtl ? 'بدون إنترنت' : 'Offline Mode'}
            </a>
            <a href="#details" className="hover:text-[#164A3A] transition-colors py-1">
              {isRtl ? 'مزايا إضافية' : 'Details'}
            </a>
            <a href="#download" className="hover:text-[#164A3A] transition-colors py-1">
              {isRtl ? 'التحميل' : 'Download'}
            </a>
          </nav>

          {/* Header Controls: Language Switch & Download Button */}
          <div className="flex items-center gap-3">
            {/* Language Switcher */}
            <button
              type="button"
              onClick={toggleLanguage}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md border border-[#E9E5D9] bg-white hover:bg-[#F3EFE4] text-[#164A3A] transition-colors"
              aria-label={isRtl ? 'Switch to English' : 'التحويل إلى العربية'}
              title={isRtl ? 'English language' : 'اللغة العربية'}
            >
              <Globe className="w-3.5 h-3.5 text-[#B5A36A]" />
              <span>{isRtl ? 'English' : 'عربي'}</span>
            </button>

            {/* Header Direct Download CTA */}
            <a
              href="#download"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-md bg-[#164A3A] text-white hover:bg-[#11382C] transition-colors shadow-sm"
            >
              <span>{isRtl ? 'تحميل التطبيق' : 'Get Ufuq'}</span>
            </a>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-md border border-[#E9E5D9] bg-white text-[#292D27] hover:text-[#164A3A] transition-colors"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-[72px] inset-x-0 bg-[#F8F6EF] border-b border-[#E9E5D9] px-6 py-5 shadow-lg">
            <nav className="flex flex-col gap-3 text-start font-medium text-sm text-[#292D27]">
              <a
                href="#features"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5 hover:text-[#164A3A]"
              >
                {isRtl ? 'المميزات الرئيسية' : 'Features'}
              </a>
              <a
                href="#offline"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5 hover:text-[#164A3A]"
              >
                {isRtl ? 'تجربة بدون إنترنت' : 'Offline Experience'}
              </a>
              <a
                href="#details"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5 hover:text-[#164A3A]"
              >
                {isRtl ? 'مزايا إضافية' : 'More Details'}
              </a>
              <a
                href="#download"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5 hover:text-[#164A3A]"
              >
                {isRtl ? 'تحميل التطبيق' : 'Download Now'}
              </a>
              <div className="pt-3 border-t border-[#E9E5D9] flex items-center justify-between">
                <a
                  href={APP_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 text-xs font-bold rounded-md bg-[#164A3A] text-white"
                >
                  {isRtl ? 'متجر App Store' : 'App Store'}
                </a>
                <span className="text-xs text-[#77796F]">
                  {isRtl ? 'مجاني بالكامل' : '100% Free'}
                </span>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* ========================================================================= */}
      {/* 01 · HERO SECTION */}
      {/* ========================================================================= */}
      <section id="hero" className="scroll-mt-20 pt-12 pb-20 md:pt-20 md:pb-32 overflow-hidden">
        <div className="container max-w-[1160px] mx-auto px-5 sm:px-8 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left/Start Column: Text & Store Buttons (6-7 cols) */}
            <div className="lg:col-span-7 text-start space-y-6 max-w-[680px]">
              {/* Product Eyebrow Pill */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-[#E9E5D9] shadow-sm text-xs text-[#164A3A] font-medium">
                <span className="w-2 h-2 rounded-full bg-[#B5A36A]" />
                <span>{isRtl ? 'تطبيق إسلامي شامل وهادئ' : 'Serene Islamic Companion'}</span>
              </div>

              {/* Main Heading */}
              <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-bold text-[#164A3A] leading-[1.2] tracking-tight">
                {isRtl ? (
                  <>
                    أُفُق — كل ما تحتاجه ليومك، <br className="hidden sm:inline" />
                    في مكان واحد.
                  </>
                ) : (
                  <>
                    Ufuq — Everything you need for your day, in one place.
                  </>
                )}
              </h1>

              {/* Supporting Text (Maximum two lines) */}
              <p className="text-base sm:text-lg text-[#77796F] leading-relaxed">
                {isRtl
                  ? 'القرآن الكريم، مواقيت الصلاة، الأذكار، والمزيد من الأدوات اليومية في تطبيق واحد، بتجربة بسيطة وهادئة.'
                  : 'The Holy Quran, prayer times, Athkar, and daily spiritual tools in a calm, unified experience.'}
              </p>

              {/* Official Store Download Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                {/* Apple App Store Button */}
                <a
                  href={APP_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-5 py-3 rounded-xl bg-[#164A3A] text-white hover:bg-[#11382C] transition-all shadow-md hover:shadow-lg active:scale-[0.98]"
                  aria-label="Download Ufuq on Apple App Store"
                >
                  <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current shrink-0" aria-hidden="true">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.85c.66-.82 1.11-1.96.99-3.1-.96.04-2.12.64-2.8 1.44-.6.69-1.12 1.83-.98 2.95 1.08.08 2.15-.55 2.79-1.29z" />
                  </svg>
                  <div className="text-start">
                    <div className="text-[10px] uppercase font-sans tracking-wider opacity-80 leading-none">
                      {isRtl ? 'متاح على' : 'Download on the'}
                    </div>
                    <div className="text-sm sm:text-base font-bold font-sans leading-tight">
                      App Store
                    </div>
                  </div>
                </a>

                {/* Google Play Store Button */}
                <button
                  type="button"
                  onClick={() => setShowPlayModal(true)}
                  className="inline-flex items-center gap-3 px-5 py-3 rounded-xl bg-white border border-[#E9E5D9] text-[#292D27] hover:bg-[#F3EFE4] hover:border-[#B5A36A] transition-all shadow-sm hover:shadow active:scale-[0.98]"
                  aria-label="Download Ufuq on Google Play"
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current text-[#164A3A] shrink-0" aria-hidden="true">
                    <path d="M3.609 1.814L13.792 12 3.61 22.186a1.996 1.996 0 0 1-.61-1.446V3.26c0-.555.225-1.057.61-1.446zM15.207 13.414l2.586 2.586-11.83 6.83 9.244-9.416zm0-2.828L5.963 1.17l11.83 6.83-2.586 2.586zm1.414 1.414l3.182 1.837c.87.502.87 1.324 0 1.826l-3.182 1.837-2.122-2.75 2.122-2.75z" />
                  </svg>
                  <div className="text-start">
                    <div className="text-[10px] uppercase font-sans tracking-wider text-[#77796F] leading-none">
                      {isRtl ? 'احصل عليه من' : 'GET IT ON'}
                    </div>
                    <div className="text-sm sm:text-base font-bold font-sans text-[#164A3A] leading-tight">
                      Google Play
                    </div>
                  </div>
                </button>
              </div>

              {/* Subtle Trust Indicators */}
              <div className="pt-2 flex items-center gap-4 text-xs text-[#77796F]">
                <div className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-[#B5A36A]" />
                  <span>{isRtl ? 'بدون إعلانات' : 'Zero Advertisements'}</span>
                </div>
                <span>·</span>
                <div className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-[#B5A36A]" />
                  <span>{isRtl ? 'يعمل بدون إنترنت' : '100% Offline Capable'}</span>
                </div>
                <span>·</span>
                <div className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-[#B5A36A]" />
                  <span>{isRtl ? 'خصوصية تامة' : 'Private & Secure'}</span>
                </div>
              </div>
            </div>

            {/* Right/End Column: Realistic Smartphone Showcase (5 cols) */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-[320px] sm:max-w-[340px]">
                {/* Phone Chassis Frame */}
                <div className="relative rounded-[46px] p-3 bg-[#164A3A]/10 border-4 border-[#164A3A]/20 shadow-2xl shadow-[#164A3A]/15 backdrop-blur-sm">
                  <div className="relative aspect-[9/19] rounded-[36px] overflow-hidden bg-white shadow-inner border border-[#E9E5D9]">
                    <img
                      src={getAssetUrl('assets/images/projects/ufuq/ufuq-hero.jpg')}
                      alt="Ufuq App Home Screen"
                      width="340"
                      height="718"
                      className="w-full h-full object-cover object-top hover:scale-[1.02] transition-transform duration-300 cursor-pointer"
                      onClick={() =>
                        setActiveImageModal({
                          src: getAssetUrl('assets/images/projects/ufuq/ufuq-hero.jpg'),
                          caption: isRtl ? 'الشاشة الرئيسية لتطبيق أُفُق' : 'Ufuq App Home Screen',
                        })
                      }
                    />

                    {/* Subtle Click To Enlarge Indicator */}
                    <button
                      type="button"
                      onClick={() =>
                        setActiveImageModal({
                          src: getAssetUrl('assets/images/projects/ufuq/ufuq-hero.jpg'),
                          caption: isRtl ? 'الشاشة الرئيسية لتطبيق أُفُق' : 'Ufuq App Home Screen',
                        })
                      }
                      className="absolute bottom-3 right-3 p-2 rounded-full bg-black/60 text-white backdrop-blur-md opacity-80 hover:opacity-100 transition-opacity"
                      aria-label="Enlarge Screenshot"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 02 · INTRODUCTION SECTION */}
      {/* ========================================================================= */}
      <section className="py-16 md:py-24 border-y border-[#E9E5D9] bg-white">
        <div className="container max-w-[1160px] mx-auto px-5 sm:px-8 lg:px-10 text-center">
          <div className="max-w-[720px] mx-auto space-y-4">
            <div className="text-xs font-semibold text-[#B5A36A] uppercase tracking-widest">
              {isRtl ? 'رفيقك في تفاصيل يومك' : 'Your Daily Companion'}
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#164A3A] tracking-tight">
              {isRtl ? 'بساطة وهدوء يجمعان كل ما يهمك' : 'Serenity and simplicity for what matters most'}
            </h2>
            <p className="text-base sm:text-lg text-[#77796F] leading-relaxed pt-2">
              {isRtl
                ? 'من قراءة القرآن الكريم إلى متابعة مواقيت الصلاة والأذكار اليومية، يجمع أُفُق الأدوات التي تحتاجها في مكان واحد، لتكون أقرب إلى ما يهمك كل يوم.'
                : 'From reading the Holy Quran to tracking prayer times and daily supplications, Ufuq brings together the tools you need in one place, keeping you connected to what matters most every day.'}
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 03 · MAIN FEATURES (6 Distinct Feature Spreads) */}
      {/* ========================================================================= */}
      <section id="features" className="scroll-mt-20 py-20 md:py-32">
        <div className="container max-w-[1160px] mx-auto px-5 sm:px-8 lg:px-10">
          {/* Section Heading */}
          <div className="max-w-[680px] mb-16 md:mb-24 text-start">
            <div className="text-xs font-semibold text-[#B5A36A] uppercase tracking-widest mb-2">
              {isRtl ? 'المميزات الأساسية' : 'Core Capabilities'}
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#164A3A] tracking-tight mb-3">
              {isRtl ? 'كل ما تحتاجه، في تجربة واحدة' : 'Everything you need, in one unified experience'}
            </h2>
            <p className="text-base text-[#77796F] leading-relaxed">
              {isRtl
                ? 'ست ميزات متكاملة صُممت بعناية لترافق يومك بكل سكينة وسهولة، مع التركيز التام على تجربة الاستخدام.'
                : 'Six core capabilities thoughtfully designed to accompany your day with serenity and effortless clarity.'}
            </p>
          </div>

          {/* Alternating Feature Gallery */}
          <div className="space-y-24 md:space-y-32">
            {FEATURES.map((feat, idx) => {
              const isEven = idx % 2 === 0;

              return (
                <div
                  key={feat.id}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center"
                >
                  {/* Text Column (5-6 cols) */}
                  <div
                    className={`lg:col-span-6 space-y-4 text-start ${
                      isEven ? 'order-1' : 'order-1 lg:order-2'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-bold font-mono text-[#B5A36A] px-2 py-0.5 rounded bg-white border border-[#E9E5D9]">
                        {feat.number}
                      </span>
                      <span className="text-xs font-medium text-[#77796F]">
                        {isRtl ? feat.tagAr : feat.tagEn}
                      </span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-bold text-[#164A3A] tracking-tight">
                      {isRtl ? feat.titleAr : feat.titleEn}
                    </h3>

                    <p className="text-base sm:text-lg text-[#77796F] leading-relaxed max-w-[540px]">
                      {isRtl ? feat.descAr : feat.descEn}
                    </p>

                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={() =>
                          setActiveImageModal({
                            src: feat.image,
                            caption: isRtl ? feat.titleAr : feat.titleEn,
                          })
                        }
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#164A3A] hover:text-[#B5A36A] transition-colors"
                      >
                        <Maximize2 className="w-3.5 h-3.5" />
                        <span>{isRtl ? 'تكبير لقطة الشاشة' : 'Click to enlarge screenshot'}</span>
                      </button>
                    </div>
                  </div>

                  {/* Screenshot Device Column (6 cols) */}
                  <div
                    className={`lg:col-span-6 flex justify-center ${
                      isEven ? 'order-2' : 'order-2 lg:order-1'
                    }`}
                  >
                    <div className="relative w-full max-w-[280px] sm:max-w-[300px]">
                      <div className="relative rounded-[40px] p-2.5 bg-white border-2 border-[#E9E5D9] shadow-xl hover:shadow-2xl transition-all duration-300 group">
                        <div className="aspect-[9/19] rounded-[30px] overflow-hidden bg-[#F3EFE4] relative">
                          <img
                            src={feat.image}
                            alt={isRtl ? feat.titleAr : feat.titleEn}
                            width="300"
                            height="633"
                            loading="lazy"
                            className="w-full h-full object-cover object-top group-hover:scale-[1.02] transition-transform duration-300 cursor-pointer"
                            onClick={() =>
                              setActiveImageModal({
                                src: feat.image,
                                caption: isRtl ? feat.titleAr : feat.titleEn,
                              })
                            }
                          />

                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors pointer-events-none flex items-center justify-center">
                            <span className="p-2.5 rounded-full bg-white/90 text-[#164A3A] shadow opacity-0 group-hover:opacity-100 transition-opacity">
                              <Maximize2 className="w-4 h-4" />
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 04 · OFFLINE EXPERIENCE HIGHLIGHT */}
      {/* ========================================================================= */}
      <section id="offline" className="scroll-mt-20 py-20 md:py-28 bg-[#164A3A] text-white">
        <div className="container max-w-[1160px] mx-auto px-5 sm:px-8 lg:px-10">
          <div className="max-w-[720px] mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-white/90 text-xs font-semibold backdrop-blur-sm">
              <WifiOff className="w-3.5 h-3.5 text-[#B5A36A]" />
              <span>{isRtl ? 'يعمل بدون إنترنت' : '100% Offline Capability'}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
              {isRtl ? 'محتواك الأساسي معك، حتى بدون إنترنت' : 'Your core content with you, even offline'}
            </h2>

            <p className="text-base sm:text-lg text-white/80 leading-relaxed max-w-[620px] mx-auto">
              {isRtl
                ? 'يمكنك قراءة القرآن الكريم دون الحاجة إلى اتصال بالإنترنت، لتبقى القراءة متاحة أينما كنت وفي أي وقت.'
                : 'You can read the Holy Quran without needing an internet connection, keeping your recitation accessible wherever you go.'}
            </p>

            {/* Offline Grid Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 text-start">
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <BookOpen className="w-5 h-5 text-[#B5A36A] mb-2" />
                <div className="text-sm font-bold text-white">
                  {isRtl ? 'المصحف كاملاً' : 'Full Quran'}
                </div>
                <div className="text-[11px] text-white/70 mt-1">
                  {isRtl ? 'رسم عثماني محفوظ محلياً' : 'Stored locally in Uthmani text'}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <Heart className="w-5 h-5 text-[#B5A36A] mb-2" />
                <div className="text-sm font-bold text-white">
                  {isRtl ? 'الأذكار اليومية' : 'Daily Athkar'}
                </div>
                <div className="text-[11px] text-white/70 mt-1">
                  {isRtl ? 'أذكار الصباح والمساء' : 'Morning and evening supplications'}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <Clock className="w-5 h-5 text-[#B5A36A] mb-2" />
                <div className="text-sm font-bold text-white">
                  {isRtl ? 'مواقيت الصلاة' : 'Prayer Times'}
                </div>
                <div className="text-[11px] text-white/70 mt-1">
                  {isRtl ? 'حساب فلكي محلي' : 'Local astronomical calculation'}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <Compass className="w-5 h-5 text-[#B5A36A] mb-2" />
                <div className="text-sm font-bold text-white">
                  {isRtl ? 'بوصلة القبلة' : 'Qibla Compass'}
                </div>
                <div className="text-[11px] text-white/70 mt-1">
                  {isRtl ? 'حساسات الجهاز بدون شبكة' : 'Hardware sensors without data'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 05 · MORE FEATURES (Thoughtful Details) */}
      {/* ========================================================================= */}
      <section id="details" className="scroll-mt-20 py-20 md:py-32 border-b border-[#E9E5D9]">
        <div className="container max-w-[1160px] mx-auto px-5 sm:px-8 lg:px-10">
          <div className="max-w-[680px] mb-14 text-start">
            <div className="text-xs font-semibold text-[#B5A36A] uppercase tracking-widest mb-2">
              {isRtl ? 'مزايا مصممة بعناية' : 'Thoughtful Touches'}
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#164A3A] tracking-tight mb-3">
              {isRtl ? 'تفاصيل صغيرة تجعل يومك أسهل' : 'Thoughtful details that make your day easier'}
            </h2>
            <p className="text-base text-[#77796F] leading-relaxed">
              {isRtl
                ? 'أدوات يومية مساندة تساعدك على تنظيم وقتك والارتباط بذكر الله على مدار اليوم.'
                : 'Subtle features designed to make your daily worship and schedule completely seamless.'}
            </p>
          </div>

          {/* 5 Feature Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-start">
            {EXTRA_FEATURES.map((item, i) => {
              const IconComp = item.icon;
              return (
                <div
                  key={i}
                  className="p-6 rounded-2xl bg-white border border-[#E9E5D9] hover:border-[#B5A36A] hover:shadow-md transition-all group"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#F8F6EF] text-[#164A3A] group-hover:text-[#B5A36A] flex items-center justify-center mb-4 transition-colors">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-[#164A3A] mb-2">
                    {isRtl ? item.titleAr : item.titleEn}
                  </h3>
                  <p className="text-sm text-[#77796F] leading-relaxed">
                    {isRtl ? item.descAr : item.descEn}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 06 · FINAL CALL TO ACTION (CTA) */}
      {/* ========================================================================= */}
      <section id="download" className="scroll-mt-20 py-20 md:py-32 bg-white border-b border-[#E9E5D9]">
        <div className="container max-w-[1160px] mx-auto px-5 sm:px-8 lg:px-10 text-center">
          <div className="max-w-[650px] mx-auto space-y-6">
            <div className="w-16 h-16 rounded-2xl overflow-hidden bg-white border border-[#E9E5D9] shadow-md p-1.5 mx-auto">
              <img
                src={ufuqIcon}
                alt="Ufuq App Icon"
                width="64"
                height="64"
                className="w-full h-full object-contain rounded-xl"
              />
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#164A3A] tracking-tight">
              {isRtl ? 'ابدأ يومك مع أُفُق' : 'Start your day with Ufuq'}
            </h2>

            <p className="text-base sm:text-lg text-[#77796F] leading-relaxed">
              {isRtl
                ? 'كل أدواتك اليومية في تطبيق واحد، بتجربة بسيطة ومجانية بالكامل.'
                : 'All your daily spiritual essentials in one serene app. Free and without ads.'}
            </p>

            <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
              {/* App Store Button */}
              <a
                href={APP_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-6 py-3.5 rounded-xl bg-[#164A3A] text-white hover:bg-[#11382C] transition-all shadow-md hover:shadow-lg active:scale-[0.98]"
              >
                <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current shrink-0" aria-hidden="true">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.85c.66-.82 1.11-1.96.99-3.1-.96.04-2.12.64-2.8 1.44-.6.69-1.12 1.83-.98 2.95 1.08.08 2.15-.55 2.79-1.29z" />
                </svg>
                <div className="text-start">
                  <div className="text-[10px] uppercase font-sans tracking-wider opacity-80 leading-none">
                    {isRtl ? 'حمّل من' : 'Download on the'}
                  </div>
                  <div className="text-base font-bold font-sans leading-tight">App Store</div>
                </div>
              </a>

              {/* Google Play Button */}
              <button
                type="button"
                onClick={() => setShowPlayModal(true)}
                className="inline-flex items-center gap-3 px-6 py-3.5 rounded-xl bg-[#F8F6EF] border border-[#E9E5D9] text-[#292D27] hover:bg-[#F3EFE4] hover:border-[#B5A36A] transition-all shadow-sm active:scale-[0.98]"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current text-[#164A3A] shrink-0" aria-hidden="true">
                  <path d="M3.609 1.814L13.792 12 3.61 22.186a1.996 1.996 0 0 1-.61-1.446V3.26c0-.555.225-1.057.61-1.446zM15.207 13.414l2.586 2.586-11.83 6.83 9.244-9.416zm0-2.828L5.963 1.17l11.83 6.83-2.586 2.586zm1.414 1.414l3.182 1.837c.87.502.87 1.324 0 1.826l-3.182 1.837-2.122-2.75 2.122-2.75z" />
                </svg>
                <div className="text-start">
                  <div className="text-[10px] uppercase font-sans tracking-wider text-[#77796F] leading-none">
                    {isRtl ? 'حمّل من' : 'GET IT ON'}
                  </div>
                  <div className="text-base font-bold font-sans text-[#164A3A] leading-tight">Google Play</div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 07 · FOOTER */}
      {/* ========================================================================= */}
      <footer className="py-12 bg-[#F8F6EF] text-[#77796F] text-xs">
        <div className="container max-w-[1160px] mx-auto px-5 sm:px-8 lg:px-10 space-y-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-6 border-b border-[#E9E5D9]">
            {/* Brand + Name */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg overflow-hidden bg-white border border-[#E9E5D9] p-0.5 shrink-0 flex items-center justify-center">
                <img src={ufuqIcon} alt="Ufuq Logo" width="32" height="32" className="w-full h-full object-contain rounded" />
              </div>
              <div className="text-start">
                <span className="font-bold text-sm text-[#164A3A] block">{isRtl ? 'تطبيق أُفُق' : 'Ufuq Application'}</span>
                <span className="text-[11px] text-[#77796F]">
                  {isRtl ? 'القرآن الكريم، مواقيت الصلاة والأذكار' : 'Quran, Prayer Times & Daily Athkar'}
                </span>
              </div>
            </div>

            {/* Links */}
            <div className="flex flex-wrap items-center gap-6">
              <button
                type="button"
                onClick={() => setShowPrivacyModal(true)}
                className="hover:text-[#164A3A] transition-colors"
              >
                {isRtl ? 'سياسة الخصوصية' : 'Privacy Policy'}
              </button>

              <a
                href="mailto:ziad.w.khedr@gmail.com?subject=Ufuq%20App%20Support"
                className="hover:text-[#164A3A] transition-colors"
              >
                {isRtl ? 'الدعم والتواصل' : 'Support & Inquiries'}
              </a>

              <a
                href={APP_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#164A3A] transition-colors"
              >
                {isRtl ? 'متجر App Store' : 'App Store'}
              </a>

              {/* Developer Link back to portfolio */}
              <a
                href="/zyadwael-portfolio-flutter/"
                className="text-[#164A3A] font-semibold hover:underline"
              >
                {isRtl ? 'معرض أعمال المطور (زياد وائل)' : 'Zyad Wael Portfolio'}
              </a>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-[#77796F]">
            <div>
              © {new Date().getFullYear()} {isRtl ? 'أُفُق. جميع الحقوق محفوظة.' : 'Ufuq. All rights reserved.'}
            </div>
            <div>
              {isRtl ? 'صُنع بعناية وتفانٍ' : 'Crafted with serenity and devotion'}
            </div>
          </div>
        </div>
      </footer>

      {/* ========================================================================= */}
      {/* LIGHTBOX MODAL: FULL-RESOLUTION SCREENSHOT */}
      {/* ========================================================================= */}
      {activeImageModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setActiveImageModal(null)}
        >
          <div
            className="relative max-w-sm sm:max-w-md max-h-[90vh] bg-white rounded-3xl overflow-hidden shadow-2xl p-2 border border-white/20"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setActiveImageModal(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/70 text-white hover:bg-black transition-colors"
              aria-label="Close image modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="rounded-2xl overflow-hidden bg-black max-h-[80vh]">
              <img
                src={activeImageModal.src}
                alt={activeImageModal.caption}
                className="w-full h-auto max-h-[80vh] object-contain mx-auto"
              />
            </div>

            <div className="p-3 text-center text-xs font-semibold text-[#164A3A]">
              {activeImageModal.caption}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* GOOGLE PLAY STATUS MODAL */}
      {/* ========================================================================= */}
      {showPlayModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setShowPlayModal(false)}
        >
          <div
            className="relative w-full max-w-md bg-white rounded-2xl p-6 sm:p-8 shadow-2xl text-center space-y-4 border border-[#E9E5D9]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-12 h-12 rounded-xl bg-[#F8F6EF] text-[#164A3A] flex items-center justify-center mx-auto">
              <Smartphone className="w-6 h-6" />
            </div>

            <h3 className="text-xl font-bold text-[#164A3A]">
              {isRtl ? 'نسخة الأندرويد قادمة قريباً' : 'Android Release Coming Soon'}
            </h3>

            <p className="text-sm text-[#77796F] leading-relaxed">
              {isRtl
                ? 'تطبيق أُفُق متاح حالياً للتحميل مجاناً على أجهزة iOS عبر متجر App Store. نعمل على إطلاق نسخة متجر Google Play قريباً جداً بإذن الله.'
                : 'Ufuq is currently available on Apple App Store for iOS. The Google Play version is in final preparation and will be available soon!'}
            </p>

            <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={APP_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-xl bg-[#164A3A] text-white font-semibold text-xs hover:bg-[#11382C] transition-colors"
              >
                {isRtl ? 'تحميل نسخة App Store' : 'Get it on App Store'}
              </a>

              <button
                type="button"
                onClick={() => setShowPlayModal(false)}
                className="px-5 py-2.5 rounded-xl bg-[#F8F6EF] text-[#292D27] font-semibold text-xs hover:bg-[#F3EFE4] transition-colors"
              >
                {isRtl ? 'إغلاق' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* PRIVACY POLICY MODAL */}
      {/* ========================================================================= */}
      {showPrivacyModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setShowPrivacyModal(false)}
        >
          <div
            className="relative w-full max-w-lg bg-white rounded-2xl p-6 sm:p-8 shadow-2xl text-start space-y-4 max-h-[85vh] overflow-y-auto border border-[#E9E5D9]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-[#E9E5D9]">
              <div className="flex items-center gap-2 text-base font-bold text-[#164A3A]">
                <Shield className="w-5 h-5 text-[#B5A36A]" />
                <span>{isRtl ? 'سياسة الخصوصية لتطبيق أُفُق' : 'Ufuq Privacy Policy'}</span>
              </div>
              <button
                type="button"
                onClick={() => setShowPrivacyModal(false)}
                className="p-1 rounded-md text-[#77796F] hover:text-[#292D27]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="text-xs sm:text-sm text-[#77796F] space-y-3 leading-relaxed">
              <p>
                {isRtl
                  ? 'خصوصية المستخدم وأمان بياناته هما الركيزة الأساسية في تصميم تطبيق أُفُق:'
                  : 'User privacy and data security are core design principles of Ufuq:'}
              </p>
              <ul className="space-y-2 list-disc list-inside text-xs">
                <li>
                  <strong className="text-[#292D27]">
                    {isRtl ? 'بدون جمع بيانات شخصية:' : 'Zero Personal Data Collection:'}
                  </strong>{' '}
                  {isRtl
                    ? 'التطبيق لا يطلب إنشاء حساب أو تسجيل دخول، ولا يجمع أي معلومات شخصية عن المستخدمين.'
                    : 'Ufuq does not require an account, login, or any personally identifiable information.'}
                </li>
                <li>
                  <strong className="text-[#292D27]">
                    {isRtl ? 'الموقع الجغرافي محلي 100%:' : 'On-Device Location Only:'}
                  </strong>{' '}
                  {isRtl
                    ? 'يُستخدم إذن الموقع الجغرافي فقط على جهازك لحساب مواقيت الصلاة واتجاه القبلة، ولا يتم إرسال موقعك لأي خادم إطلاقاً.'
                    : 'Location permissions are strictly processed on-device for prayer calculations and Qibla heading. It is never transmitted to any external server.'}
                </li>
                <li>
                  <strong className="text-[#292D27]">
                    {isRtl ? 'خالٍ تماماً من الإعلانات:' : 'Zero Commercial Advertisements:'}
                  </strong>{' '}
                  {isRtl
                    ? 'التطبيق خالٍ تماماً من الإعلانات التتبعية والشركات الإعلانية الخارجية.'
                    : 'The application contains no commercial ad networks or third-party advertising SDKs.'}
                </li>
              </ul>
            </div>

            <div className="pt-3 border-t border-[#E9E5D9] text-end">
              <button
                type="button"
                onClick={() => setShowPrivacyModal(false)}
                className="px-5 py-2 rounded-xl bg-[#164A3A] text-white font-semibold text-xs hover:bg-[#11382C] transition-colors"
              >
                {isRtl ? 'فهمت ذلك' : 'Understood'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UfuqLanding;

