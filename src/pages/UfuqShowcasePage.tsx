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
  Smartphone,
  Heart,
  Fingerprint,
  Calendar,
  Layers,
  ArrowUpRight,
  Send,
  Info,
  Globe,
  Bell,
  Sliders,
  Eye,
  CheckCircle2,
  Lock,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import ufuqIcon from '@/assets/ufuq-icon.png';
import { getAssetUrl } from '@/lib/utils';

// Authentic Production Screenshots from the App
const APP_MODULES = [
  {
    id: 'home',
    title: 'Daily Spiritual Dashboard',
    arabicTitle: 'الرئيسية الشاملة والإذاعة',
    badge: 'الرئيسية · البث المباشر',
    tagline: 'Morning inspiration, live radio, and next prayer countdown at a single glance.',
    arabicTagline: 'واجهة صباحية ملهمة، بث مباشر لإذاعة القرآن من القاهرة، وعد تنازلي للصلاة القادمة بنظرة واحدة.',
    image: 'assets/images/projects/ufuq/ufuq-real-home.jpg',
    highlights: [
      'Scenic dynamic header with daily Quranic verse reflection',
      'Instant 1-tap live Holy Quran radio from Cairo (FM 94.7)',
      'Hijri calendar date with quick Qibla & Names of Allah shortcuts',
      'Timely Athkar and Quran reading resumption bookmarks',
    ],
    arabicHighlights: [
      'هيدر جمالي هادئ يعرض آية قرآنية متجددة يومياً للتأمل',
      'تشغيل فوري بنقرة واحدة لإذاعة القرآن الكريم من القاهرة (FM 94.7)',
      'عرض التاريخ الهجري مع وصول سريع لبوصلة القبلة وأسماء الله الحسنى',
      'بطاقات مخصصة لمتابعة ورد القراءة اليومي وأذكار ما بعد الصلاة',
    ],
    metric: 'بث مباشر 24/7 دون انقطاع',
  },
  {
    id: 'quran',
    title: 'Holy Quran in Medina Script',
    arabicTitle: 'المصحف الشريف بالرسم العثماني',
    badge: '100% بدون إنترنت',
    tagline: 'Complete 114 Surahs in authentic Medina Uthmani script with zero internet needed.',
    arabicTagline: 'المصحف كاملاً 114 سورة برواية حفص عن عاصم بخط مجمع المدينة المنورة وبدون إنترنت.',
    image: 'assets/images/projects/ufuq/ufuq-real-quran.jpg',
    highlights: [
      'High-definition authentic Medina typography with golden Ayah rosettes',
      'Zero internet connection needed — bundled locally in SQLite',
      'Juz, Surah, and Page indicators with fast jumping controls',
      'Smooth vertical reading flow with eye-friendly warm papyrus tone',
    ],
    arabicHighlights: [
      'رسم عثماني أصيل فائق الوضوح مع فواصل الآيات المذهبة وترقيمها',
      'يعمل محلياً بالكامل من قاعدة بيانات مدمجة دون استهلاك باقة الإنترنت',
      'مؤشرات واضحة للجزء ورقم السورة والصفحة مع تنقل سلس وسريع',
      'خلفية مريحة للعين بنمط الورق الأصيل لقراءة طويلة دون إجهاد',
    ],
    metric: '114 سورة كاملة محلياً',
  },
  {
    id: 'subha',
    title: 'Tactile Electronic Subha',
    arabicTitle: 'المسبحة اللمسية الذكية',
    badge: 'اهتزاز لمسي Haptic Feedback',
    tagline: 'A realistic electronic tally counter with vibration feedback and custom goals.',
    arabicTagline: 'مسبحة إلكترونية تحاكي سبحة اليد الرقمية باهتزازات حقيقية وأهداف قابلة للتخصيص.',
    image: 'assets/images/projects/ufuq/ufuq-real-subha.png',
    highlights: [
      'Authentic emerald green tally device with 5-digit LCD screen',
      'Tactile gold touch sensor with subtle device vibration feedback',
      'Dhikr presets (Subhan Allah, Alhamdulillah, Allahu Akbar, La Ilaha Illa Allah)',
      'Configurable targets: 33, 99, 100, or open continuous counting',
    ],
    arabicHighlights: [
      'تصميم زمردي فخم يحاكي خاتم التسبيح الرقمي مع شاشة LCD خماسية',
      'مستشعر بصمة مذهب ينبض باهتزاز لمسي خفيف عند كل ضغطة',
      'قوائم جاهزة لأشهر الأذكار (سبحان الله، الحمد لله، الله أكبر، لا إله إلا الله)',
      'أهداف قابلة للضبط: 33 أو 99 أو 100 تسبيحة أو عدّاد مفتوح ومستمر',
    ],
    metric: 'نبضات لمسية تغنيك عن النظر',
  },
  {
    id: 'qibla',
    title: 'Calibrated Qibla Compass',
    arabicTitle: 'بوصلة القبلة الدقيقة',
    badge: 'معايرة بمستشعر المغناطيسية',
    tagline: 'Sensor-calibrated Kaaba direction dial with exact degree and distance calculation.',
    arabicTagline: 'تحديد فوري لاتجاه الكعبة المشرفة بدقة الزاوية وحساب المسافة المباشرة بالكيلومتر.',
    image: 'assets/images/projects/ufuq/ufuq-real-qibla.png',
    highlights: [
      'Hardware magnetometer alignment with smooth tilt compensation',
      'Exact Kaaba degree heading (136.1°) and distance (1,287 km from Cairo)',
      'Gold & ivory circular compass dial with clear directional needle',
      'On-device GPS calculation without telemetry or location sharing',
    ],
    arabicHighlights: [
      'معايرة فورية بالبوصلة ومقياس التسارع بالجهاز لضمان أعلى دقة',
      'إظهار زاوية القبلة الدقيقة (مثال: 136.1° في القاهرة) والمسافة للكعبة',
      'قرص دائري أنيق باللونين العاجي والذهبي مع مؤشر واضح وسهل التوجيه',
      'حسابات فلكية تتم محلياً على الجهاز بدون إرسال موقعك لأي خادم',
    ],
    metric: 'دقة زاوية فلكية 136.1°',
  },
  {
    id: 'prayer',
    title: 'GPS Astronomical Prayer Times',
    arabicTitle: 'مواقيت الصلاة الفلكية',
    badge: 'حساب شمسي بالـ GPS',
    tagline: 'Exact prayer schedules, next prayer countdown, and Iqama timetable for Cairo & worldwide.',
    arabicTagline: 'مواعيد دقيقة للأذان والإقامة مع عد تنازلي حي للصلاة القادمة حسب إحداثيات موقعك.',
    image: 'assets/images/projects/ufuq/ufuq-real-prayer.jpg',
    highlights: [
      'Precise solar angle calculation based on device GPS coordinates',
      'Prominent live countdown to next prayer with active highlighting',
      'Detailed schedule: Fajr, Shuruq, Dhuhr, Asr, Maghrib, Isha, Midnight',
      'Exact Iqama intervals and astronomical moon phase display',
    ],
    arabicHighlights: [
      'حساب فلكي شمسي دقيق لزوايا الفجر والغروب والزوال وفق معايير المساحة',
      'عداد تنازلي حي بالدقائق والثواني حتى موعد الصلاة التالية',
      'جدول تفصيلي يشمل: الفجر، الشروق، الظهر، العصر، المغرب، العشاء',
      'أوقات الإقامة المقدرة وتنبيهات الأذان الهادئة لتنظيم صلواتك',
    ],
    metric: 'عد تنازلي دقيق للصلاة التالية',
  },
  {
    id: 'athkar',
    title: 'Hisn al-Muslim Supplications',
    arabicTitle: 'حصن المسلم والأذكار اليومية',
    badge: 'أذكار مشكولة وموثقة',
    tagline: 'Comprehensive authentic Athkar for morning, evening, and after prayers.',
    arabicTagline: 'موسوعة متكاملة لأذكار الصباح والمساء وما بعد الصلاة مشكولة بالكامل مع عداد التكرار.',
    image: 'assets/images/projects/ufuq/ufuq-real-athkar.png',
    highlights: [
      'Authentic Sahih supplications from Hisn al-Muslim (حصن المسلم)',
      'Clear, bold Arabic calligraphy designed for effortless legibility',
      'Repetition progress counters with automatic completion signals',
      'One-tap sharing and personal favorites bookmarking',
    ],
    arabicHighlights: [
      'أحاديث وأدعية صحيحة مأثورة من كتاب حصن المسلم المعتمد',
      'خط عربي واضح وكبير مشكول بدقة لسهولة القراءة والترديد',
      'عداد تقدم تفاعلي يتابع عدد مرات التكرار المطلوبة لكل ذكر',
      'ميزة حفظ الأذكار في المفضلة ومشاركتها كبطاقة أنيقة للأهل والأصدقاء',
    ],
    metric: 'أكثر من 130 ذكراً ودعاءً',
  },
  {
    id: 'splash',
    title: 'Sacred Brand Identity & Splash',
    arabicTitle: 'الهوية البصرية والوقار',
    badge: 'تصميم هادئ ومريح للعين',
    tagline: 'Deep emerald texture, golden Quranic verse, and peaceful typography.',
    arabicTagline: 'خلفية زمردية مريحة تعكس وقار المخطوطات الإسلامية مع آية كريمة ملهمة.',
    image: 'assets/images/projects/ufuq/ufuq-real-splash.jpg',
    highlights: [
      'Deep Islamic emerald texture reflecting timeless manuscript binding',
      'Authentic Thuluth calligraphic logo for Ufuq (أفق)',
      'Reflective Quranic verse: «وَقَالَ رَبُّكُمُ ادْعُونِي أَسْتَجِبْ لَكُمْ»',
      'Distraction-free entry into daily spiritual worship',
    ],
    arabicHighlights: [
      'خامة جلدية خضراء داكنة مستوحاة من تجليد المصاحف التراثية الفخمة',
      'شعار خط الثلث العربي الأصيل لكلمة «أُفُق» بجماليات أصيلة',
      'افتتاحية مهيبة بالآية الكريمة: «وَقَالَ رَبُّكُمُ ادْعُونِي أَسْتَجِبْ لَكُمْ»',
      'بيئة إيمانية هادئة تخلو تماماً من المشتتات منذ اللحظة الأولى لفتح التطبيق',
    ],
    metric: 'ملاذ إيماني بلا ضجيج',
  },
];

// Core Pillars (Rise Science style: sleep debt & circadian rhythm -> Quran connection & daily worship discipline)
const CORE_PILLARS = [
  {
    number: '01',
    title: 'الاتصال الدائم بالقرآن الكريم',
    titleEn: 'The Constant Quranic Connection',
    subtitle: 'تلاوة بالرسم العثماني وبث صوتي مباشر',
    subtitleEn: 'Uthmani Recitation & Live Cairo Radio',
    description:
      'تماماً كما يحتاج الجسد إلى الطاقة اليومية، تحيا الروح بالاتصال المستمر بكتاب الله. يمنحك أفق تلاوة كاملة لمصحف المدينة النبوية محلياً دون الحاجة للإنترنت، مع بث مباشر متواصل لإذاعة القرآن الكريم من القاهرة 94.7 FM في الخلفية لتعطير منزلك وسيارتك دون انقطاع حتى مع قفل الشاشة.',
    descriptionEn:
      'Just as the body needs daily nourishment, the soul thrives on constant connection with the Word of Allah. Ufuq provides a complete offline Medina Quran in authentic Uthmani script, alongside 24/7 background streaming of Holy Quran Radio from Cairo (FM 94.7) to bring peace into your home and car, even while your phone is locked.',
    points: [
      { ar: 'مصحف المدينة كاملاً مدمج محلياً (SQLite) بدون إنترنت', en: 'Complete Medina Quran bundled locally in SQLite' },
      { ar: 'بث إذاعي مباشر فائق النقاء يعمل في الخلفية 24/7', en: 'Crystal-clear 24/7 Cairo live radio in background isolate' },
      { ar: 'تصفح القرآن أثناء الاستماع للإذاعة بالتوازي دون تعارض', en: 'Read Quran while listening to the radio concurrently' },
      { ar: 'تحكم كامل من شاشة القفل و Dynamic Island في iOS', en: 'Seamless Lock Screen and Dynamic Island media controls' },
    ],
    screenshot: 'assets/images/projects/ufuq/ufuq-real-quran.jpg',
    tag: 'القرآن صوتاً وتلاوة',
  },
  {
    number: '02',
    title: 'الانضباط اليومي بالصلوات والأذكار',
    titleEn: 'Daily Worship & Habit Discipline',
    subtitle: 'مواقيت فلكية حية ومسبحة لمسية ذكية',
    subtitleEn: 'Astronomical Timetables & Haptic Subha',
    description:
      'بناء روتين إيماني يومي منضبط حول مواعيد الصلوات الخمس. خوارزميات فلكية تحسب مواقيت الأذان والإقامة وفق موقعك الجغرافي الدقيق مع عد تنازلي حي، بالإضافة لأذكار حصن المسلم الموثقة ومسبحة إلكترونية بنبضات لمسية حقيقية تمكنك من التسبيح والذكر وأنت مغمض العينين دون النظر للشاشة.',
    descriptionEn:
      'Structuring your day around the five prayers. Astronomical algorithms calculate exact prayer and Iqama times based on your on-device GPS coordinates with a live countdown, paired with verified Hisn al-Muslim supplications and a tactile Subha counter with subtle haptic vibration, letting you glorify Allah without looking at the screen.',
    points: [
      { ar: 'حساب فلكي شمسي دقيق لموقعك مع عد تنازلي للصلاة القادمة', en: 'Solar astronomical angles calculation with next prayer countdown' },
      { ar: 'مسبحة لمسية بنبضات Haptic Feedback عند كل تسبيحة', en: 'Tactile electronic Subha with haptic feedback at every press' },
      { ar: 'بوصلة القبلة المستشعرة بزاوية 136.1° والمسافة المباشرة', en: 'Sensor-calibrated Qibla compass showing angle and distance' },
      { ar: 'أذكار الصباح والمساء وما بعد الصلاة مشكولة مع عداد الإنجاز', en: 'Diacritized morning and evening Athkar with counter goals' },
    ],
    screenshot: 'assets/images/projects/ufuq/ufuq-real-subha.png',
    tag: 'الانضباط اليومي',
  },
];

// FAQs in Arabic and English
const FAQS = [
  {
    qAr: 'هل التطبيق مجاني بالكامل؟',
    qEn: 'Is the app completely free?',
    aAr: 'نعم، تطبيق أُفق مجاني بالكامل بدون أي اشتراكات دورية ولا رسوم خفية ولا جدران دفع. جميع المميزات (المصحف كاملاً، الإذاعة، المواقيت، القبلة، الأذكار) متاحة لك دون مقابل.',
    aEn: 'Yes, Ufuq is 100% free with no recurring subscriptions, hidden fees, or paywalls. All features (full Quran, live radio, prayer times, Qibla, Athkar) are accessible at zero cost.',
  },
  {
    qAr: 'ما هي طبيعة الإعلانات داخل التطبيق؟',
    qEn: 'What kind of advertisements are in the app?',
    aAr: 'التطبيق يحتوي على إعلانات خفيفة وبسيطة جداً، وُضعت بعناية لدعم استمرارية خوادم البث المباشر للإذاعة وتطوير التحديثات. نحن نلتزم بعدم تشغيل أي إعلانات فيديو تملأ الشاشة فجأة أو تقطع خشوعك أثناء قراءة القرآن أو أداء الصلاة والأذكار.',
    aEn: 'The app contains minimal, lightweight, non-intrusive ads designed to cover the continuous server bandwidth costs for the 24/7 radio stream. We strictly avoid full-screen pop-up video ads or interruptions during Quran reading, prayer, or Athkar.',
  },
  {
    qAr: 'متى ستتوفر نسخة أندرويد (Google Play)؟',
    qEn: 'When will the Android version be available on Google Play?',
    aAr: 'نسخة الأندرويد في مرحلة الاختبار والمراجعة النهائية حالياً، وستتوفر قريباً جداً على متجر Google Play. يمكنك إدخال بريدك الإلكتروني في القسم المخصص أدناه لنرسل لك إشعاراً فور إطلاقها.',
    aEn: 'The Android version is in final testing and review, and will be released on Google Play very soon. You can enter your email in the section below to get notified the moment it goes live.',
  },
  {
    qAr: 'هل يتطلب المصحف اتصالاً بالإنترنت؟',
    qEn: 'Does reading the Quran require an internet connection?',
    aAr: 'كلا، المصحف الشريف كاملاً (114 سورة) بالرسم العثماني مدمج محلياً داخل التطبيق في قاعدة بيانات SQLite سريعة وخفيفة، ويعمل 100% بدون أي اتصال بالإنترنت.',
    aEn: 'No. The entire Holy Quran (114 Surahs) in authentic Medina Uthmani script is embedded locally on-device inside a fast SQLite database, functioning 100% offline.',
  },
  {
    qAr: 'هل يعمل بث إذاعة القرآن الكريم والشاشة مقفلة؟',
    qEn: 'Does the Holy Quran Radio keep playing when the phone is locked?',
    aAr: 'نعم بكل تأكيد. تم بناء مشغل الصوت في معالج خلفي مستقل (Background Audio Handler) يدعم الاستماع والشاشة مقفلة، مع أدوات التحكم في الصوت من شاشة القفل وشريط Dynamic Island في هواتف iPhone الحديثة.',
    aEn: 'Yes, absolutely. The audio player runs in an independent background isolate, supporting playback while locked, with integrated media controls on the Lock Screen and Dynamic Island.',
  },
  {
    qAr: 'كيف يتم حساب مواقيت الصلاة واتجاه القبلة؟',
    qEn: 'How are prayer times and Qibla direction calculated?',
    aAr: 'تعتمد الحسابات على معادلات فلكية دقيقة وفق زوايا ميل الشمس وإحداثيات GPS لجهازك، متوافقة مع معايير الهيئة المصرية العامة للمساحة وأم القرى. جميع الحسابات تتم محلياً على جهازك دون إرسال موقعك لأي خادم خارجي حفاظاً على خصوصيتك.',
    aEn: 'Calculations use precise astronomical solar equations and device GPS coordinates, aligned with Egyptian General Authority of Survey and Umm al-Qura standards. All processing happens on-device with zero location telemetry.',
  },
];

export const UfuqShowcasePage: React.FC = () => {
  // Primary language: Arabic ('ar') as default per user directive, with English toggle
  const [lang, setLang] = useState<'ar' | 'en'>('ar');
  const [activeModuleIndex, setActiveModuleIndex] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showQrModal, setShowQrModal] = useState(false);
  const [emailInput, setEmailInput] = useState('');
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isRtl = lang === 'ar';
  const currentModule = APP_MODULES[activeModuleIndex];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setEmailSubmitted(true);
      setTimeout(() => {
        setEmailInput('');
      }, 3000);
    }
  };

  return (
    <div
      dir={isRtl ? 'rtl' : 'ltr'}
      className={`min-h-screen bg-[#070d0b] text-[#f2f7f4] selection:bg-[#10b981]/30 selection:text-[#34d399] ${
        isRtl ? 'font-arabic' : 'font-sans'
      }`}
    >
      {/* --------------------------------------------------------------------- */}
      {/* 1. TOP ANNOUNCEMENT & TRUST BAR (Rise Science Style) */}
      {/* --------------------------------------------------------------------- */}
      <div className="bg-[#0b1814] border-b border-[#1b382f]/60 py-2.5 px-4 text-xs font-medium text-emerald-300/90 text-center relative z-40">
        <div className="container max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 mx-auto sm:mx-0">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>
              {isRtl
                ? '★ تقييم 4.9 في App Store · متاح الآن مجاناً لأجهزة iPhone و iPad'
                : '★ Rated 4.9 on App Store · Available Now Free for iPhone & iPad'}
            </span>
            <span className="hidden md:inline text-emerald-500/50">|</span>
            <span className="hidden md:inline text-emerald-400/80">
              {isRtl ? 'قريباً على متجر Google Play (أندرويد)' : 'Coming Soon to Google Play (Android)'}
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-4 text-[11px] text-emerald-400/70">
            <a href="#pillars" className="hover:text-emerald-300 transition-colors">
              {isRtl ? 'الركيزتان' : 'Two Pillars'}
            </a>
            <a href="#features" className="hover:text-emerald-300 transition-colors">
              {isRtl ? 'المميزات' : 'Features'}
            </a>
            <a href="#transparency" className="hover:text-emerald-300 transition-colors">
              {isRtl ? 'الشفافية والإعلانات' : 'Transparency'}
            </a>
            <a href="#android" className="hover:text-emerald-300 transition-colors">
              {isRtl ? 'أندرويد' : 'Android'}
            </a>
            <a href="#faq" className="hover:text-emerald-300 transition-colors">
              {isRtl ? 'الأسئلة الشائعة' : 'FAQ'}
            </a>
          </div>
        </div>
      </div>

      {/* --------------------------------------------------------------------- */}
      {/* 2. STICKY FROSTED HEADER */}
      {/* --------------------------------------------------------------------- */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#070d0b]/85 border-b border-[#1b382f]/60 transition-all">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          {/* Logo & Identity */}
          <div className="flex items-center gap-3">
            <Link
              to="/ufuq"
              className="flex items-center gap-3 group focus:outline-none"
            >
              <div className="w-11 h-11 rounded-2xl overflow-hidden border border-emerald-500/30 bg-[#0e241d] p-1 shadow-lg shadow-emerald-950/40 group-hover:border-emerald-400/60 transition-all flex items-center justify-center">
                <img
                  src={ufuqIcon}
                  alt="Ufuq App Icon"
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
              <div className="flex flex-col text-start">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-xl tracking-tight text-white group-hover:text-emerald-300 transition-colors">
                    {isRtl ? 'أُفُق' : 'UFUQ'}
                  </span>
                  <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                    iOS
                  </span>
                </div>
                <span className="text-xs text-emerald-400/70 font-normal">
                  {isRtl ? 'القرآن، الأذكار وإذاعة القاهرة' : 'Quran, Athkar & Cairo Radio'}
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation Links (Rise Science style) */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-emerald-100/80">
            <a href="#pillars" className="hover:text-emerald-300 transition-colors">
              {isRtl ? 'الركيزتان' : 'Two Pillars'}
            </a>
            <a href="#features" className="hover:text-emerald-300 transition-colors">
              {isRtl ? 'المميزات العميقة' : 'Features'}
            </a>
            <a href="#transparency" className="hover:text-emerald-300 transition-colors">
              {isRtl ? 'الشفافية والإعلانات' : 'Transparency & Ads'}
            </a>
            <a href="#android" className="hover:text-emerald-300 transition-colors">
              {isRtl ? 'نسخة أندرويد' : 'Android Release'}
            </a>
            <a href="#faq" className="hover:text-emerald-300 transition-colors">
              {isRtl ? 'الأسئلة' : 'FAQ'}
            </a>
          </nav>

          {/* Actions: Language Toggle & Direct Store Link */}
          <div className="flex items-center gap-3">
            {/* Language Switcher */}
            <button
              type="button"
              onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-emerald-500/30 bg-[#0d211a] hover:bg-[#122e24] text-xs font-medium text-emerald-300 hover:text-white transition-all shadow-sm"
              title={isRtl ? 'Switch to English' : 'التحويل للعربية'}
            >
              <Globe className="w-3.5 h-3.5 text-emerald-400" />
              <span>{isRtl ? 'English' : 'العربية'}</span>
            </button>

            {/* Back to Portfolio */}
            <Link
              to="/"
              className="hidden sm:inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs text-emerald-400/80 hover:text-white hover:bg-emerald-950/40 transition-colors"
            >
              <span>{isRtl ? 'ملف الأعمال' : 'Portfolio'}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>

            {/* App Store Primary Button */}
            <a
              href="https://apps.apple.com/id/app/ufuq/id6821979552"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-black font-semibold text-xs sm:text-sm shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all transform active:scale-95"
            >
              <Apple className="w-4 h-4" />
              <span>{isRtl ? 'تحميل مجاني' : 'Download Free'}</span>
            </a>
          </div>
        </div>
      </header>

      {/* --------------------------------------------------------------------- */}
      {/* 3. HERO SECTION (High-Impact Value Proposition in Rise Science Style) */}
      {/* --------------------------------------------------------------------- */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-32 overflow-hidden border-b border-[#1b382f]/60">
        {/* Ambient Gradient Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-emerald-600/10 blur-[140px] pointer-events-none rounded-full" />
        <div className="absolute top-1/3 right-10 w-[400px] h-[300px] bg-teal-500/10 blur-[120px] pointer-events-none rounded-full" />

        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-medium mb-6 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>
                {isRtl
                  ? 'يومك متصل بنور القرآن وسكينة الذكر بلا تشتيت'
                  : 'Distraction-Free Daily Quran, Radio & Solar Prayer Timings'}
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.25] mb-6">
              {isRtl ? (
                <>
                  عش يومك بنور القرآن <br />
                  <span className="bg-gradient-to-r from-emerald-300 via-teal-200 to-amber-200 bg-clip-text text-transparent">
                    وسكينة الذكر بلا تشتيت.
                  </span>
                </>
              ) : (
                <>
                  Connect your spiritual day <br />
                  <span className="bg-gradient-to-r from-emerald-300 via-teal-200 to-amber-200 bg-clip-text text-transparent">
                    with quiet, authentic clarity.
                  </span>
                </>
              )}
            </h1>

            {/* Subtitle with Honest Nuance */}
            <p className="text-base sm:text-lg md:text-xl text-emerald-100/75 leading-relaxed font-normal mb-8 max-w-2xl mx-auto">
              {isRtl
                ? 'تطبيق إسلامي حديث بهندسة متقنة يجمع لك المصحف الشريف بالرسم العثماني كاملاً دون إنترنت، البث المباشر لإذاعة القرآن الكريم من القاهرة 24/7، ومواقيت الصلاة الفلكية بدقة GPS، ومسبحة لمسية تحاكي المسبحة الواقعية — في واجهة هادئة خالية من المقاطعة وبإعلانات خفيفة للغاية تحترم وقتك وخشوعك.'
                : 'A modern, distraction-free Islamic companion combining the complete Medina Quran offline, 24/7 live Holy Quran Radio from Cairo, sensor-calibrated prayer timings, and a tactile haptic Subha — crafted with minimal, respectful ads that never interrupt your worship.'}
            </p>

            {/* Hero CTAs: App Store + Android Coming Soon + QR Code */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              {/* App Store CTA */}
              <a
                href="https://apps.apple.com/id/app/ufuq/id6821979552"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-black font-bold text-sm sm:text-base shadow-xl shadow-emerald-500/25 hover:shadow-emerald-500/35 transition-all transform active:scale-95 group"
              >
                <Apple className="w-5 h-5 transition-transform group-hover:scale-110" />
                <div className="flex flex-col text-start leading-tight">
                  <span className="text-[10px] opacity-80 uppercase tracking-wider font-sans">
                    {isRtl ? 'تحميل مجاني على' : 'Download on the'}
                  </span>
                  <span className="text-sm font-bold">App Store (iOS)</span>
                </div>
              </a>

              {/* Android Coming Soon Pill */}
              <a
                href="#android"
                className="inline-flex items-center gap-3 px-6 py-3.5 rounded-2xl bg-[#0e241d] hover:bg-[#133027] border border-emerald-500/30 text-emerald-200 text-sm font-semibold transition-all shadow-md group"
              >
                <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:rotate-12 transition-transform">
                  <Smartphone className="w-3.5 h-3.5" />
                </div>
                <div className="flex flex-col text-start leading-tight">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-white">Google Play</span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      {isRtl ? 'قريباً' : 'Soon'}
                    </span>
                  </div>
                  <span className="text-[11px] text-emerald-400/80">
                    {isRtl ? 'أندرويد قيد المراجعة' : 'Android In Review'}
                  </span>
                </div>
              </a>

              {/* QR Code Quick Scan Trigger */}
              <button
                type="button"
                onClick={() => setShowQrModal(true)}
                className="inline-flex items-center gap-2 px-4 py-3.5 rounded-2xl bg-[#091512] hover:bg-[#0e211b] border border-[#1b382f] text-emerald-300/80 hover:text-white text-xs sm:text-sm font-medium transition-colors"
                title={isRtl ? 'مسح رمز الاستجابة السريعة (QR)' : 'Scan QR code'}
              >
                <QrCode className="w-4 h-4 text-emerald-400" />
                <span>{isRtl ? 'مسح رمز QR' : 'Scan QR'}</span>
              </button>
            </div>

            {/* Quick Proof Badges Under CTAs */}
            <div className="flex flex-wrap items-center justify-center gap-6 mt-8 text-xs text-emerald-300/70 font-medium">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>{isRtl ? 'بدون أي اشتراكات' : 'No Subscriptions'}</span>
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>{isRtl ? 'إعلانات خفيفة غير مشتتة' : 'Light Non-Intrusive Ads'}</span>
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>{isRtl ? 'يعمل بدون إنترنت' : '100% Offline Quran'}</span>
              </span>
            </div>
          </div>

          {/* Centered Realistic 3D Device Showcase with Floating Callouts */}
          <div className="relative max-w-4xl mx-auto mt-6">
            {/* Ambient Base Light */}
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-emerald-500/15 blur-3xl pointer-events-none rounded-full" />

            {/* Phone Frame Container */}
            <div className="relative mx-auto w-[290px] sm:w-[330px] md:w-[360px] aspect-[9/19.5] rounded-[48px] bg-gradient-to-b from-zinc-700 via-zinc-900 to-black p-3.5 shadow-2xl shadow-emerald-950/80 border border-emerald-500/20">
              {/* Screen Bezel & Dynamic Island */}
              <div className="relative w-full h-full rounded-[38px] overflow-hidden bg-black border border-zinc-800">
                {/* Dynamic Island Pill */}
                <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-24 h-5 bg-black rounded-full z-30 flex items-center justify-end px-2 gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-zinc-900 border border-zinc-700" />
                </div>

                {/* Screenshot Display */}
                <img
                  src={getAssetUrl('assets/images/projects/ufuq/ufuq-real-home.jpg')}
                  alt="Ufuq App Home Screen"
                  className="w-full h-full object-cover object-top"
                  loading="eager"
                />

                {/* Subtle Inner Screen Shadow */}
                <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]" />
              </div>
            </div>

            {/* Floating Callout 1 (Left / Right depending on RTL): Cairo Radio */}
            <div className="hidden md:flex absolute top-12 -left-6 lg:left-6 items-center gap-3 p-3.5 rounded-2xl bg-[#091a14]/90 backdrop-blur-md border border-emerald-500/30 shadow-xl max-w-xs text-start animate-fade-in">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                <Radio className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider block">
                  {isRtl ? 'إذاعة القاهرة 94.7 FM' : 'Cairo Radio Live'}
                </span>
                <p className="text-xs font-semibold text-white leading-tight">
                  {isRtl
                    ? 'بث مباشر معتمد في الخلفية 24 ساعة دون تقطيع'
                    : '24/7 background audio stream with lockscreen controls'}
                </p>
              </div>
            </div>

            {/* Floating Callout 2: Offline Medina Quran */}
            <div className="hidden md:flex absolute bottom-24 -left-8 lg:left-2 items-center gap-3 p-3.5 rounded-2xl bg-[#091a14]/90 backdrop-blur-md border border-emerald-500/30 shadow-xl max-w-xs text-start">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider block">
                  {isRtl ? 'مصحف المدينة المنورة' : 'Offline Medina Quran'}
                </span>
                <p className="text-xs font-semibold text-white leading-tight">
                  {isRtl
                    ? '114 سورة بالرسم العثماني محلياً دون أي اتصال'
                    : '114 Surahs bundled in local SQLite database'}
                </p>
              </div>
            </div>

            {/* Floating Callout 3: Qibla & Distance */}
            <div className="hidden md:flex absolute top-28 -right-6 lg:right-6 items-center gap-3 p-3.5 rounded-2xl bg-[#091a14]/90 backdrop-blur-md border border-emerald-500/30 shadow-xl max-w-xs text-start">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                <Compass className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider block">
                  {isRtl ? 'بوصلة القبلة الدقيقة' : 'Calibrated Qibla Compass'}
                </span>
                <p className="text-xs font-semibold text-white leading-tight">
                  {isRtl
                    ? 'زاوية الكعبة 136.1° والمسافة بالكيلومتر بمستشعرات الهاتف'
                    : 'Exact 136.1° Kaaba heading & distance via hardware sensors'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------------------- */}
      {/* 4. VALUE & SOCIAL PROOF RIBBON (Key Authority Metrics) */}
      {/* --------------------------------------------------------------------- */}
      <section className="py-8 bg-[#091512] border-b border-[#1b382f]/60">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-4 rounded-2xl bg-[#0b1c17] border border-[#1b382f]/60">
              <span className="text-2xl sm:text-3xl font-bold font-mono text-emerald-300 block mb-1">
                114
              </span>
              <span className="text-xs text-emerald-400/80 font-medium">
                {isRtl ? 'سورة بالرسم العثماني دون إنترنت' : 'Surahs 100% Offline'}
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-[#0b1c17] border border-[#1b382f]/60">
              <span className="text-2xl sm:text-3xl font-bold font-mono text-emerald-300 block mb-1">
                24/7
              </span>
              <span className="text-xs text-emerald-400/80 font-medium">
                {isRtl ? 'بث إذاعة القرآن الكريم من القاهرة' : 'Cairo Quran Radio Stream'}
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-[#0b1c17] border border-[#1b382f]/60">
              <span className="text-2xl sm:text-3xl font-bold font-mono text-emerald-300 block mb-1">
                {isRtl ? 'لمسية' : 'Haptic'}
              </span>
              <span className="text-xs text-emerald-400/80 font-medium">
                {isRtl ? 'مسبحة إلكترونية باهتزاز حقيقي' : 'Tactile Subha Tally Counter'}
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-[#0b1c17] border border-[#1b382f]/60">
              <span className="text-2xl sm:text-3xl font-bold font-mono text-amber-300 block mb-1">
                {isRtl ? 'خفيفة جداً' : 'Minimal'}
              </span>
              <span className="text-xs text-amber-200/80 font-medium">
                {isRtl ? 'إعلانات بسيطة وغير مشتتة' : 'Light Non-Intrusive Ads'}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------------------- */}
      {/* 5. THE TWO CORE PILLARS SECTION (Rise Science Sleep Debt Model) */}
      {/* --------------------------------------------------------------------- */}
      <section id="pillars" className="py-20 md:py-28 relative border-b border-[#1b382f]/60">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="max-w-3xl mx-auto text-center mb-16 md:mb-20">
            <span className="text-xs font-mono font-semibold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 border border-emerald-500/25 px-3 py-1 rounded-full mb-3 inline-block">
              {isRtl ? 'فلسفة التطبيق الهندسية' : 'The System Architecture'}
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
              {isRtl ? 'ركيزتان متكاملتان لصلاح يوم المسلم' : 'The Two Pillars of Your Spiritual Routine'}
            </h2>
            <p className="text-emerald-200/70 text-base sm:text-lg leading-relaxed">
              {isRtl
                ? 'مثلما ينضبط الجسد بالإيقاع البيولوجي الطبيعي، تطمئن الروح بالاتصال المستمر بوحي الله والانضباط في مواقيت العبادة اليومية.'
                : 'Just as human physiology relies on circadian rhythms and biological balance, your spiritual self flourishes through continuous Quranic resonance and disciplined daily worship timings.'}
            </p>
          </div>

          {/* The 2 Pillars Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {CORE_PILLARS.map((pillar) => (
              <div
                key={pillar.number}
                className="rounded-3xl bg-[#091813] border border-emerald-500/25 p-8 sm:p-10 flex flex-col justify-between hover:border-emerald-500/50 transition-all group shadow-xl"
              >
                <div>
                  <div className="flex items-center justify-between gap-4 mb-6">
                    <span className="text-3xl font-mono font-extrabold text-emerald-400/80">
                      {pillar.number}
                    </span>
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                      {isRtl ? pillar.tag : pillar.subtitleEn}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                    {isRtl ? pillar.title : pillar.titleEn}
                  </h3>
                  <p className="text-xs font-mono text-emerald-400/80 mb-4">
                    {isRtl ? pillar.subtitle : pillar.subtitleEn}
                  </p>

                  <p className="text-emerald-100/75 text-sm sm:text-base leading-relaxed mb-8">
                    {isRtl ? pillar.description : pillar.descriptionEn}
                  </p>

                  {/* Bullet Points */}
                  <ul className="space-y-3 mb-8">
                    {pillar.points.map((pt, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-emerald-200/90">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{isRtl ? pt.ar : pt.en}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Pillar Showcase Visual Thumbnail */}
                <div className="relative rounded-2xl overflow-hidden border border-emerald-500/20 bg-black/60 aspect-[16/10] shadow-lg group-hover:border-emerald-500/40 transition-colors">
                  <img
                    src={getAssetUrl(pillar.screenshot)}
                    alt={pillar.title}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------------------- */}
      {/* 6. STEP-BY-STEP DEEP DIVES WITH REAL SCREENSHOTS (Rise Science Style) */}
      {/* --------------------------------------------------------------------- */}
      <section id="features" className="py-20 md:py-28 relative border-b border-[#1b382f]/60 bg-[#06100d]">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="text-xs font-mono font-semibold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 border border-emerald-500/25 px-3 py-1 rounded-full mb-3 inline-block">
              {isRtl ? 'تجربة استخدام واقعية' : 'Authentic Application Experience'}
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
              {isRtl ? 'لقطات حقيقية من داخل تطبيق أُفُق' : 'Inside Ufuq: Engineered for Calm Focus'}
            </h2>
            <p className="text-emerald-200/70 text-base sm:text-lg">
              {isRtl
                ? 'استعرض تفاصيل الشاشات المعتمدة وواجهات العبادة اليومية كما تظهر مباشرة على أجهزة المستخدمين.'
                : 'Inspect the authentic production screens and features shipped directly to iOS devices.'}
            </p>
          </div>

          {/* Interactive Feature Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
            {APP_MODULES.map((mod, idx) => (
              <button
                key={mod.id}
                type="button"
                onClick={() => setActiveModuleIndex(idx)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                  activeModuleIndex === idx
                    ? 'bg-emerald-500 text-black font-bold shadow-lg shadow-emerald-500/20'
                    : 'bg-[#091a14] border border-emerald-500/20 text-emerald-300 hover:text-white hover:border-emerald-500/40'
                }`}
              >
                {isRtl ? mod.arabicTitle : mod.title}
              </button>
            ))}
          </div>

          {/* Active Module Showcase Card */}
          <div className="rounded-3xl bg-[#091a14] border border-emerald-500/30 p-6 sm:p-10 lg:p-12 shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Left Column: Details & Value (7 cols) */}
              <div className="lg:col-span-7 text-start order-2 lg:order-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-mono mb-4">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{currentModule.badge}</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
                  {isRtl ? currentModule.arabicTitle : currentModule.title}
                </h3>

                <p className="text-emerald-200/80 text-base sm:text-lg leading-relaxed mb-6 font-medium">
                  {isRtl ? currentModule.arabicTagline : currentModule.tagline}
                </p>

                {/* Highlights List */}
                <div className="space-y-3 mb-8">
                  {(isRtl ? currentModule.arabicHighlights : currentModule.highlights).map((hl, i) => (
                    <div key={i} className="flex items-start gap-3 text-sm text-emerald-100/85">
                      <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0 mt-0.5 text-emerald-400">
                        <Check className="w-3 h-3" />
                      </div>
                      <span>{hl}</span>
                    </div>
                  ))}
                </div>

                {/* Metric Footnote & Quick Jump */}
                <div className="pt-6 border-t border-emerald-500/20 flex items-center justify-between">
                  <span className="text-xs font-mono text-emerald-400">
                    {currentModule.metric}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      disabled={activeModuleIndex === 0}
                      onClick={() => setActiveModuleIndex((p) => p - 1)}
                      className="p-2 rounded-lg bg-[#0d261e] border border-emerald-500/30 text-emerald-300 disabled:opacity-40 hover:bg-[#12362b] transition-colors"
                      title={isRtl ? 'السابق' : 'Previous'}
                    >
                      <ArrowLeft className="w-4 h-4" />
                    </button>
                    <span className="text-xs font-mono text-emerald-400/80">
                      {activeModuleIndex + 1} / {APP_MODULES.length}
                    </span>
                    <button
                      type="button"
                      disabled={activeModuleIndex === APP_MODULES.length - 1}
                      onClick={() => setActiveModuleIndex((p) => p + 1)}
                      className="p-2 rounded-lg bg-[#0d261e] border border-emerald-500/30 text-emerald-300 disabled:opacity-40 hover:bg-[#12362b] transition-colors"
                      title={isRtl ? 'التالي' : 'Next'}
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Column: Screen Graphic (5 cols) */}
              <div className="lg:col-span-5 flex justify-center order-1 lg:order-2">
                <div className="w-[260px] sm:w-[290px] aspect-[9/19.5] rounded-[42px] bg-gradient-to-b from-zinc-700 via-zinc-900 to-black p-3 shadow-2xl border border-emerald-500/30 relative">
                  <div className="w-full h-full rounded-[32px] overflow-hidden bg-black relative border border-zinc-800">
                    <img
                      src={getAssetUrl(currentModule.image)}
                      alt={currentModule.title}
                      className="w-full h-full object-cover object-top"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------------------- */}
      {/* 7. TRANSPARENCY & HONESTY SECTION (Addressing Ads Truthfully) */}
      {/* --------------------------------------------------------------------- */}
      <section id="transparency" className="py-20 md:py-28 relative border-b border-[#1b382f]/60 bg-[#081511]">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="text-xs font-mono font-semibold uppercase tracking-widest text-amber-300 bg-amber-500/10 border border-amber-500/25 px-3 py-1 rounded-full mb-3 inline-block">
              {isRtl ? 'شفافية وصراحة تامة' : 'Honesty & Transparency'}
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
              {isRtl
                ? 'تطبيق مجاني بإعلانات خفيفة تراعي قدسية عبادتك'
                : '100% Free with Light, Respectful Ads'}
            </h2>
            <p className="text-emerald-200/75 text-base sm:text-lg leading-relaxed">
              {isRtl
                ? 'نؤمن بالصراحة الكاملة مع كل مستخدم؛ صُمم أفق ليكون عوناً لك على طاعة الله، وإليك كيف ندير الإعلانات والتكاليف في التطبيق:'
                : 'We believe in absolute transparency with our users. Here is how advertising and sustainability work in Ufuq:'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {/* Card 1: Light & Minimal Ads */}
            <div className="p-8 rounded-3xl bg-[#091a14] border border-emerald-500/25 flex flex-col justify-between hover:border-emerald-500/45 transition-colors">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-amber-500/15 text-amber-400 flex items-center justify-center mb-6">
                  <Eye className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  {isRtl ? 'إعلانات خفيفة وغير مشتتة' : 'Light & Non-Intrusive Ads'}
                </h3>
                <p className="text-emerald-100/75 text-sm leading-relaxed">
                  {isRtl
                    ? 'يحتوي التطبيق على إعلانات بسيطة وهادئة جداً وُضعت فقط لتغطية تكاليف الخوادم ونقل البث المباشر لإذاعة القرآن الكريم من القاهرة على مدار 24 ساعة، دون المساس بتجربتك الإيمانية.'
                    : 'The app features minimal, lightweight ads intended solely to cover high-bandwidth streaming costs for 24/7 Cairo Holy Quran radio and server maintenance, without cluttering your interface.'}
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-emerald-500/15 text-xs font-mono text-amber-300">
                {isRtl ? '✓ خالية من الفوضى البصرية' : '✓ Clean & Calm Design'}
              </div>
            </div>

            {/* Card 2: Zero Interruption Popups */}
            <div className="p-8 rounded-3xl bg-[#091a14] border border-emerald-500/25 flex flex-col justify-between hover:border-emerald-500/45 transition-colors">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center mb-6">
                  <Shield className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  {isRtl ? 'لا فيديوهات تقطع خشوعك' : 'Zero Fullscreen Video Popups'}
                </h3>
                <p className="text-emerald-100/75 text-sm leading-relaxed">
                  {isRtl
                    ? 'لن تفاجأ أبداً بإعلان فيديو صوتي يظهر فجأة يملأ شاشتك وأنت تتلو القرآن أو وقت الصلاة أو أذكارك. هدوءك وقدسية عبادتك أمانة وضعناها في مقدمة أولوياتنا.'
                    : 'You will never face sudden loud video ads or intrusive popups interrupting your Quran recitation, prayer timings, or Athkar. Your spiritual peace always comes first.'}
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-emerald-500/15 text-xs font-mono text-emerald-400">
                {isRtl ? '✓ حماية تامة للخشوع' : '✓ Sacred Focus Protected'}
              </div>
            </div>

            {/* Card 3: Free Forever Without Subscriptions */}
            <div className="p-8 rounded-3xl bg-[#091a14] border border-emerald-500/25 flex flex-col justify-between hover:border-emerald-500/45 transition-colors">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-teal-500/15 text-teal-400 flex items-center justify-center mb-6">
                  <Lock className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  {isRtl ? 'مجاني بدون أي اشتراكات' : 'Free Forever, No Paywalls'}
                </h3>
                <p className="text-emerald-100/75 text-sm leading-relaxed">
                  {isRtl
                    ? 'لا نطلب منك أي اشتراك شهري أو سنوي، ولا توجد مميزات محجوبة خلف جدران دفع. كل ما يقدمه تطبيق أفق متاح لك ولكل مسلم ومسلمة مجاناً بالكامل.'
                    : 'No monthly subscriptions, no paywalls, and no hidden charges. Every single feature in Ufuq is completely free and accessible to every Muslim worldwide.'}
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-emerald-500/15 text-xs font-mono text-teal-300">
                {isRtl ? '✓ متاح للجميع بلا حواجز' : '✓ 100% Unlocked Access'}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------------------- */}
      {/* 8. ANDROID COMING SOON BANNER (Addressing Android Release) */}
      {/* --------------------------------------------------------------------- */}
      <section id="android" className="py-20 md:py-24 relative border-b border-[#1b382f]/60 bg-gradient-to-b from-[#081511] to-[#06100d]">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto rounded-3xl bg-[#0a1e17] border border-emerald-500/35 p-8 sm:p-12 shadow-2xl relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 blur-[100px] pointer-events-none rounded-full" />

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10">
              <div className="md:col-span-7 text-start">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-mono mb-4">
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>{isRtl ? 'قيد المراجعة والاختبار النهائي' : 'In Final Android Testing'}</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-3">
                  {isRtl ? 'أُفُق قريباً على متجر Google Play' : 'Ufuq is Coming Soon to Android'}
                </h2>

                <p className="text-emerald-100/80 text-sm sm:text-base leading-relaxed mb-6">
                  {isRtl
                    ? 'يعمل المهندس زياد وائل حالياً على إنهاء الاختبارات النهائية لنسخة الأندرويد لتقديم نفس السلاسة المعمارية وجودة الأداء التي يتمتع بها مستخدمو iOS. سجّل بريدك الإلكتروني لتكون أول من يعلم فور توفر التطبيق في متجر Google Play.'
                    : 'We are conducting final tests on Android to deliver the exact same unified performance and clean architecture enjoyed on iOS. Enter your email to be the first to know the moment Ufuq launches on Google Play.'}
                </p>

                {/* Email Registration Form */}
                {emailSubmitted ? (
                  <div className="p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-sm flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                    <span>
                      {isRtl
                        ? 'تم تسجيل بريدك بنجاح! سنرسل لك إشعاراً فور إطلاق التطبيق على أندرويد.'
                        : 'Your email has been saved! We will notify you the moment Ufuq drops on Google Play.'}
                    </span>
                  </div>
                ) : (
                  <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row gap-3">
                    <input
                      type="email"
                      required
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      placeholder={isRtl ? 'أدخل بريدك الإلكتروني...' : 'Enter your email address...'}
                      className="px-4 py-3 rounded-xl bg-[#06140f] border border-emerald-500/30 text-white placeholder-emerald-400/40 text-sm focus:outline-none focus:border-emerald-400 flex-1"
                    />
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-sm transition-all shadow-md active:scale-95 shrink-0"
                    >
                      <Bell className="w-4 h-4" />
                      <span>{isRtl ? 'أعلمني عند الإطلاق' : 'Notify Me'}</span>
                    </button>
                  </form>
                )}
              </div>

              {/* Visual Icon Badge */}
              <div className="md:col-span-5 flex justify-center">
                <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-3xl bg-gradient-to-br from-[#0c281e] to-[#06140f] border border-emerald-500/30 p-4 flex flex-col items-center justify-center text-center shadow-xl">
                  <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 mb-3">
                    <Smartphone className="w-8 h-8" />
                  </div>
                  <span className="text-sm font-bold text-white block">Google Play</span>
                  <span className="text-xs text-emerald-400/80 font-mono mt-1">
                    {isRtl ? 'أندرويد 8.0 وأحدث' : 'Android 8.0+'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------------------- */}
      {/* 9. TECHNICAL STACK & ARCHITECTURE DOSSIER (For Tech Reviewers) */}
      {/* --------------------------------------------------------------------- */}
      <section className="py-20 md:py-24 relative border-b border-[#1b382f]/60 bg-[#06100d]">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="text-xs font-mono font-semibold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 border border-emerald-500/25 px-3 py-1 rounded-full mb-3 inline-block">
              {isRtl ? 'المعمارية البرمجية والهندسة' : 'Engineering Specifications'}
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
              {isRtl ? 'معمارية نقية مبنية بأحدث معايير Flutter' : 'Clean Flutter Architecture & Subsystems'}
            </h2>
            <p className="text-emerald-200/70 text-base sm:text-lg">
              {isRtl
                ? 'نظرة متعمقة على الأنظمة التقنية التي قام المهندس زياد وائل بتصميمها وبنائها من الصفر.'
                : 'A technical inspection of the engineering decisions behind Ufuq.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-[#091a14] border border-emerald-500/25">
              <span className="text-xs font-mono text-emerald-400 block mb-2">01 / Frontend & Logic</span>
              <h4 className="text-base font-bold text-white mb-2">Flutter & Clean Architecture</h4>
              <p className="text-xs text-emerald-100/75 leading-relaxed">
                {isRtl
                  ? 'فصل تام بين طبقات العرض والبيانات والنطاق (Presentation, Domain, Data) لضمان سهولة التوسع واختبار الأكواد.'
                  : 'Complete decoupling between presentation, domain, and data layers with repository pattern.'}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#091a14] border border-emerald-500/25">
              <span className="text-xs font-mono text-emerald-400 block mb-2">02 / Local Storage</span>
              <h4 className="text-base font-bold text-white mb-2">SQLite Embedded Engine</h4>
              <p className="text-xs text-emerald-100/75 leading-relaxed">
                {isRtl
                  ? 'فهرسة سريعة للقرآن والأذكار مع استرجاع لحظي بزمن استجابة أقل من 4ms دون استهلاك طاقة المعالج.'
                  : 'Instant indexed queries for Quran text and Athkar with sub-4ms lookups and zero battery drain.'}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#091a14] border border-emerald-500/25">
              <span className="text-xs font-mono text-emerald-400 block mb-2">03 / Streaming Subsystem</span>
              <h4 className="text-base font-bold text-white mb-2">Background Audio Isolate</h4>
              <p className="text-xs text-emerald-100/75 leading-relaxed">
                {isRtl
                  ? 'مشغل صوتي في مسار خلفي مستقل يمنع تجمد الواجهة ويدعم شاشة القفل و Dynamic Island في iOS.'
                  : 'Independent audio handler isolate supporting uninterrupted lockscreen and Dynamic Island playback.'}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#091a14] border border-emerald-500/25">
              <span className="text-xs font-mono text-emerald-400 block mb-2">04 / Hardware Integration</span>
              <h4 className="text-base font-bold text-white mb-2">Sensors & Trigonometry</h4>
              <p className="text-xs text-emerald-100/75 leading-relaxed">
                {isRtl
                  ? 'معايرة مستمرة لمستشعر المغناطيسية مع حسابات فلكية شمسية مباشرة على الجهاز للحفاظ على الخصوصية.'
                  : 'Hardware magnetometer calibration with on-device solar trigonometry for 100% private calculations.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------------------- */}
      {/* 10. FAQ SECTION (Accordion Style in Rise Science Pattern) */}
      {/* --------------------------------------------------------------------- */}
      <section id="faq" className="py-20 md:py-28 relative border-b border-[#1b382f]/60 bg-[#081511]">
        <div className="container max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs font-mono font-semibold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 border border-emerald-500/25 px-3 py-1 rounded-full mb-3 inline-block">
              {isRtl ? 'إجابات واضحة' : 'Common Questions'}
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
              {isRtl ? 'الأسئلة الشائعة حول تطبيق أُفُق' : 'Frequently Asked Questions'}
            </h2>
            <p className="text-emerald-200/75 text-base sm:text-lg">
              {isRtl
                ? 'كل ما تود معرفته عن التطبيق، الإعلانات، استهلاك الإنترنت، ونسخة الأندرويد.'
                : 'Everything you need to know about Ufuq, ads, offline usage, and Android availability.'}
            </p>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="rounded-2xl bg-[#091a14] border border-emerald-500/25 overflow-hidden transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full p-5 sm:p-6 text-start flex items-center justify-between gap-4 font-semibold text-white hover:text-emerald-300 transition-colors"
                  >
                    <span className="text-base sm:text-lg">
                      {isRtl ? faq.qAr : faq.qEn}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-emerald-400 shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-6 pt-1 text-sm sm:text-base text-emerald-100/80 leading-relaxed border-t border-emerald-500/15">
                      {isRtl ? faq.aAr : faq.aEn}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------------------- */}
      {/* 11. FINAL DOWNLOAD CALL TO ACTION & FOOTER */}
      {/* --------------------------------------------------------------------- */}
      <section className="py-20 md:py-28 relative overflow-hidden bg-gradient-to-b from-[#081511] via-[#050e0b] to-black">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-emerald-500/15 blur-[140px] pointer-events-none rounded-full" />

        <div className="container max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 p-2 mx-auto mb-6 shadow-xl flex items-center justify-center">
            <img src={ufuqIcon} alt="Ufuq Icon" className="w-full h-full object-cover rounded-xl" />
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            {isRtl ? 'حمّل أُفُق الآن وابدأ يومك بسكينة' : 'Download Ufuq Today and Experience True Peace'}
          </h2>

          <p className="text-emerald-200/75 text-base sm:text-lg max-w-2xl mx-auto mb-8">
            {isRtl
              ? 'متاح مجاناً للتحميل الفوري على أجهزة iPhone و iPad عبر متجر App Store، وقريباً على متجر Google Play لأجهزة أندرويد.'
              : 'Available now on the App Store for iPhone & iPad. Coming soon to Google Play for Android.'}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
            <a
              href="https://apps.apple.com/id/app/ufuq/id6821979552"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-black font-bold text-base shadow-xl shadow-emerald-500/30 hover:shadow-emerald-500/40 transition-all transform active:scale-95 group"
            >
              <Apple className="w-6 h-6 transition-transform group-hover:scale-110" />
              <div className="flex flex-col text-start leading-tight">
                <span className="text-[10px] opacity-80 uppercase tracking-wider font-sans">
                  {isRtl ? 'تحميل مجاني على' : 'Download on the'}
                </span>
                <span className="text-base font-bold">App Store</span>
              </div>
            </a>

            <a
              href="#android"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-[#091a14] hover:bg-[#0e261e] border border-emerald-500/30 text-emerald-200 text-base font-semibold transition-all shadow-md"
            >
              <Smartphone className="w-5 h-5 text-emerald-400" />
              <span>{isRtl ? 'قريباً على أندرويد' : 'Coming Soon to Android'}</span>
            </a>
          </div>

          {/* Credits & Developer Footnote */}
          <div className="pt-10 border-t border-emerald-500/20 text-xs text-emerald-400/60 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p>
              {isRtl
                ? 'تصميم وبرمجة: زياد وائل — مهندس تطبيقات الهواتف الذكية'
                : 'Designed & Engineered by Zyad Wael — Mobile Systems Engineer'}
            </p>
            <div className="flex items-center gap-4">
              <Link to="/" className="hover:text-emerald-300 transition-colors">
                {isRtl ? 'الرئيسية في المعرض' : 'Portfolio Home'}
              </Link>
              <span>•</span>
              <a
                href="https://apps.apple.com/id/app/ufuq/id6821979552"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-emerald-300 transition-colors"
              >
                App Store
              </a>
              <span>•</span>
              <a
                href="https://github.com/ZyadWKhedr"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-emerald-300 transition-colors"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------------------- */}
      {/* 12. FLOATING BOTTOM BAR ON SCROLL */}
      {/* --------------------------------------------------------------------- */}
      {scrolled && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 bg-[#091a14]/90 backdrop-blur-xl border border-emerald-500/40 py-2.5 px-5 rounded-full shadow-2xl shadow-emerald-950/80 flex items-center gap-4 animate-fade-in">
          <div className="flex items-center gap-2">
            <img src={ufuqIcon} alt="Ufuq" className="w-7 h-7 rounded-lg object-cover" />
            <span className="text-xs font-bold text-white hidden sm:inline">
              {isRtl ? 'أُفُق — رفيقك الإسلامي' : 'Ufuq — Islamic Companion'}
            </span>
          </div>

          <a
            href="https://apps.apple.com/id/app/ufuq/id6821979552"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs shadow-md transition-all active:scale-95"
          >
            <Apple className="w-3.5 h-3.5" />
            <span>{isRtl ? 'تحميل مجاني' : 'Download'}</span>
          </a>
        </div>
      )}

      {/* --------------------------------------------------------------------- */}
      {/* 13. QR CODE SCAN MODAL */}
      {/* --------------------------------------------------------------------- */}
      {showQrModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="bg-[#091a14] border border-emerald-500/40 rounded-3xl p-6 sm:p-8 max-w-sm w-full text-center relative shadow-2xl">
            <button
              type="button"
              onClick={() => setShowQrModal(false)}
              className="absolute top-4 right-4 p-2 rounded-full text-emerald-400 hover:text-white hover:bg-emerald-500/20 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 flex items-center justify-center mx-auto mb-4 text-emerald-400">
              <QrCode className="w-6 h-6" />
            </div>

            <h3 className="text-lg font-bold text-white mb-2">
              {isRtl ? 'مسح رمز الاستجابة السريعة' : 'Scan to Download Ufuq'}
            </h3>
            <p className="text-xs text-emerald-200/75 mb-6">
              {isRtl
                ? 'وجه كاميرا هاتفك نحو الرمز للانتقال مباشرة إلى صفحة التحميل في App Store.'
                : 'Point your phone camera to download directly from the Apple App Store.'}
            </p>

            {/* Generated QR Code display */}
            <div className="bg-white p-4 rounded-2xl inline-block shadow-inner mb-6">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(
                  'https://apps.apple.com/id/app/ufuq/id6821979552'
                )}`}
                alt="App Store QR Code"
                className="w-44 h-44 object-contain"
              />
            </div>

            <a
              href="https://apps.apple.com/id/app/ufuq/id6821979552"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs transition-colors"
            >
              {isRtl ? 'فتح في متجر App Store' : 'Open in App Store'}
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default UfuqShowcasePage;

