import React from 'react';
import { Apple, Play, ExternalLink, CheckCircle2 } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { getAssetUrl } from '@/lib/utils';
import { scrollReveal } from '@/lib/animations';

interface CommercialProjectItem {
  id: string;
  number: string;
  title: string;
  arabicTitle: string;
  categoryEn: string;
  categoryAr: string;
  descEn: string;
  descAr: string;
  contributionEn: string[];
  contributionAr: string[];
  technologies: string[];
  icon: string;
  screenshots: string[];
  links: {
    appStore?: string;
    playStore?: string;
  };
}

const COMMERCIAL_PROJECTS_LIST: CommercialProjectItem[] = [
  {
    id: 'wofoodi',
    number: '01',
    title: 'Wofoodi',
    arabicTitle: 'وفودي',
    categoryEn: 'Fuel station discovery · GCC',
    categoryAr: 'استكشاف محطات الوقود · دول الخليج',
    descEn: 'A mobile application that helps drivers discover fuel stations, compare regional prices, and explore nearby highway locations across Saudi Arabia and the GCC.',
    descAr: 'تطبيق موبايل يساعد السائقين على اكتشاف محطات الوقود، ومقارنة الأسعار الإقليمية، واستكشاف مواقع المحطات المجاورة على الطرق السريعة.',
    contributionEn: [
      'Flutter application development across iOS and Android',
      'Interactive geospatial maps with station clustering',
      'Location-based fuel grade filtering (91, 95, Diesel)',
      'Local SQLite caching for low-connectivity desert highways',
      'REST API integration with live pricing endpoints',
    ],
    contributionAr: [
      'تطوير تطبيق فلاتر لمنصتي iOS و Android',
      'خرائط تفاعلية جغرافية مع تجميع المحطات',
      'تصفية أنواع الوقود بحسب الموقع الجغرافي (٩١، ٩٥، ديزل)',
      'تخزين محلي عبر SQLite للمناطق ضعيفة الاتصال',
      'ربط برمجيات REST API مع خوادم الأسعار اللحظية',
    ],
    technologies: ['Flutter', 'Dart', 'Google Maps SDK', 'SQLite', 'REST APIs'],
    icon: 'assets/wofoodi-icon.png',
    screenshots: [
      'assets/images/projects/wofoodi/wofoodi-screen-1.webp',
      'assets/images/projects/wofoodi/wofoodi-screen-2.webp',
    ],
    links: {
      appStore: 'https://apps.apple.com/us/app/%D9%88%D9%81%D9%88%D8%AF%D9%8A/id6751444551',
      playStore: 'https://play.google.com/store/apps/details?id=com.wofoodi.app.sa',
    },
  },
  {
    id: 'amoomy',
    number: '02',
    title: 'Amoomy',
    arabicTitle: 'عمومي - النقل الثقيل',
    categoryEn: 'Heavy transport and logistics · Saudi Arabia',
    categoryAr: 'منصة النقل الثقيل والمعدات · السعودية',
    descEn: 'A mobile platform connecting shippers and heavy equipment haulers through multi-role booking, quotation negotiations, and fleet dispatch workflows.',
    descAr: 'منصة موبايل تربط بين أصحاب البضائع وناقلي المعدات الثقيلة عبر طلبات الحجز المتعددة، والتفاوض على عروض الأسعار، وجدولة الشاحنات.',
    contributionEn: [
      'Multi-role application flows for clients and truck operators',
      'Service discovery across 100+ vehicle and hauling categories',
      'Real-time quotation negotiation and offer comparison',
      'Offline-safe state handling for remote transit corridors',
      'Clean Architecture with Provider state management',
    ],
    contributionAr: [
      'تدفقات مستخدم متعددة الأدوار للعملاء وأصحاب الشاحنات',
      'استعراض الخدمات عبر أكثر من 100 فئة للمعدات والنقل',
      'التفاوض اللحظي على عروض الأسعار ومقارنتها',
      'معالجة حالات انقطاع الاتصال في الطرق البرية البعيدة',
      'تطبيق Clean Architecture مع إدارة الحالة عبر Provider',
    ],
    technologies: ['Flutter', 'Dart', 'Clean Architecture', 'Provider', 'Firebase Auth'],
    icon: 'assets/amoomy-icon.png',
    screenshots: [
      'assets/images/projects/amoomy/amoomy-screen-1.webp',
      'assets/images/projects/amoomy/amoomy-screen-2.webp',
    ],
    links: {
      appStore: 'https://apps.apple.com/us/app/amoomy-%D8%B9%D9%85%D9%88%D9%85%D9%8A-%D8%A7%D9%84%D9%86%D9%82%D9%84-%D8%A7%D9%84%D8%AB%D9%82%D9%8A%D9%84/id6753125564',
      playStore: 'https://play.google.com/store/apps/details?id=com.zeroonez.amoomy',
    },
  },
  {
    id: 'raval',
    number: '03',
    title: 'Raval',
    arabicTitle: 'رافال',
    categoryEn: 'Fashion e-commerce',
    categoryAr: 'تطبيق تجارة إلكترونية للأزياء',
    descEn: 'A mobile retail shopping experience engineered for rapid product exploration, reactive shopping carts, step-by-step order tracking, and friction-free checkout.',
    descAr: 'تجربة تسوق إلكتروني متكاملة صُممت لتصفح سريع للمنتجات، وحساب تفاعلي لسلة المشتريات، وتتبع دقيق لمراحل الشحن والتوصيل.',
    contributionEn: [
      'Product catalog exploration with responsive category filtering',
      'Optimistic reactive shopping cart calculation with zero latency',
      'Granular step-by-step order dispatch timeline tracker',
      'Multi-step checkout validation and address management',
      'Progressive image disk caching maintaining <80MB heap footprint',
    ],
    contributionAr: [
      'تصفح كتالوج المنتجات وتصفية الأقسام بمرونة وسرعة',
      'حساب تفاعلي فوري لأسعار سلة التسوق دون تأخير',
      'متتبع تفصيلي لمراحل معالجة الطلب والشحن والتسليم',
      'التحقق من بيانات الدفع وإدارة العناوين بدقة',
      'تخزين ذكي للصور في الذاكرة المؤقتة لتقليل استهلاك الموارد',
    ],
    technologies: ['Flutter', 'Dart', 'Clean Architecture', 'Provider', 'REST APIs'],
    icon: 'assets/raval-icon.png',
    screenshots: [
      'assets/images/projects/raval/raval-screen-1.webp',
      'assets/images/projects/raval/raval-screen-2.webp',
    ],
    links: {
      appStore: 'https://apps.apple.com/us/app/raval/id6756228964',
      playStore: 'https://play.google.com/store/apps/details?id=com.zeroonez.raval',
    },
  },
  {
    id: 'payss',
    number: '04',
    title: 'Payss',
    arabicTitle: 'بيس',
    categoryEn: 'Merchant and loyalty platform',
    categoryAr: 'منصة الولاء والمدفوعات للتجار',
    descEn: 'A merchant-focused mobile application supporting instant QR-based customer verification, loyalty point redemptions, and store transaction ledgers.',
    descAr: 'تطبيق موجه للتجار وأصحاب المتاجر يدعم التحقق الفوري من العملاء عبر مسح رمز QR، وإدارة برامج الولاء ونقاط المكافآت وسجل العمليات.',
    contributionEn: [
      'Hardware-accelerated camera QR code scanner for fast customer checkout',
      'Merchant loyalty program balance management and reward redemptions',
      'Clean daily transaction ledger and counter workflow summaries',
      'Local caching for offline verification when register signals drop',
    ],
    contributionAr: [
      'مسح ضوئي فوري لرموز QR عبر الكاميرا لسرعة إتمام العمليات',
      'إدارة برامج ولاء العملاء واستبدال النقاط والمكافآت',
      'سجل مالي منظم لعمليات اليوم وملخص مبيعات الكاونتر',
      'تخزين محلي آمن للعمل على مدار اليوم دون انقطاع',
    ],
    technologies: ['Flutter', 'Dart', 'Camera / QR', 'REST APIs', 'Local Cache'],
    icon: 'assets/payss-icon.png',
    screenshots: [
      'assets/images/projects/payss/payss-screen-1.webp',
      'assets/images/projects/payss/payss-screen-2.webp',
    ],
    links: {
      appStore: 'https://apps.apple.com/eg/app/payss/id6767013931',
      playStore: 'https://play.google.com/store/apps/details?id=com.payss.app',
    },
  },
];

export const SelectedWork: React.FC = () => {
  const { t, i18n } = useTranslation();
  const shouldReduceMotion = useReducedMotion();
  const isRtl = i18n.language === 'ar';

  return (
    <section id="work" className="scroll-mt-20 py-16 md:py-24 border-b border-border-subtle">
      <div className="container max-w-site mx-auto px-5 sm:px-7 lg:px-10">
        {/* Section Header */}
        <motion.div
          variants={scrollReveal}
          initial={shouldReduceMotion ? false : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          className="max-w-reading mb-14 md:mb-20 text-start"
        >
          <div className="type-overline text-accent font-mono mb-2.5">
            {t('work.eyebrow', 'COMMERCIAL APPLICATIONS')}
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-ink mb-3 tracking-tight">
            {t('work.title', 'Selected work')}
          </h2>
          <p className="text-base sm:text-lg text-ink-secondary leading-relaxed">
            {t(
              'work.subtitle',
              "Mobile applications I've contributed to, built for real products and everyday use."
            )}
          </p>
        </motion.div>

        {/* Editorial Project Entries */}
        <div className="space-y-20 md:space-y-28">
          {COMMERCIAL_PROJECTS_LIST.map((project, idx) => {
            const isReversed = idx % 2 !== 0;

            return (
              <motion.article
                key={project.id}
                variants={scrollReveal}
                initial={shouldReduceMotion ? false : 'hidden'}
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center"
              >
                {/* Content Column (6 cols) */}
                <div
                  className={`lg:col-span-6 space-y-5 text-start ${
                    isReversed ? 'order-1 lg:order-2' : 'order-1'
                  }`}
                >
                  {/* Metadata Row: Number + Category */}
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-bold text-accent px-2 py-0.5 rounded bg-surface border border-border">
                      {project.number}
                    </span>
                    <span className="text-xs font-mono text-ink-muted">
                      {isRtl ? project.categoryAr : project.categoryEn}
                    </span>
                  </div>

                  {/* Project Title & Icon */}
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-xl overflow-hidden bg-surface border border-border-strong p-1 shrink-0 flex items-center justify-center shadow-sm">
                      <img
                        src={getAssetUrl(project.icon)}
                        alt={`${project.title} icon`}
                        width={48}
                        height={48}
                        className="w-full h-full object-contain rounded-lg"
                        loading="lazy"
                      />
                    </div>
                    <div>
                      <h3 className="text-2xl sm:text-3xl font-bold font-display text-ink">
                        {isRtl ? project.arabicTitle : project.title}
                      </h3>
                      {project.arabicTitle && (
                        <span className="text-xs text-ink-muted block mt-0.5" dir={isRtl ? 'ltr' : 'rtl'}>
                          {isRtl ? project.title : project.arabicTitle}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Short Description */}
                  <p className="text-sm sm:text-base text-ink-secondary leading-relaxed">
                    {isRtl ? project.descAr : project.descEn}
                  </p>

                  {/* Actual Contribution Highlights */}
                  <div className="p-4 rounded-xl bg-surface border border-border space-y-2.5">
                    <div className="text-xs font-bold font-mono text-ink uppercase tracking-wider">
                      {isRtl ? 'مساهمتي في المشروع:' : 'My Contribution:'}
                    </div>
                    <ul className="space-y-1.5 text-xs text-ink-secondary">
                      {(isRtl ? project.contributionAr : project.contributionEn).map(
                        (detail, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" />
                            <span>{detail}</span>
                          </li>
                        )
                      )}
                    </ul>
                  </div>

                  {/* Tech Stack Chips */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded text-[11px] font-mono bg-surface border border-border-subtle text-ink-muted"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* App Store / Play Store Links */}
                  <div className="pt-2 flex flex-wrap items-center gap-3">
                    {project.links.appStore && (
                      <a
                        href={project.links.appStore}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-tactile touch-target inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg bg-surface border border-border-strong text-ink hover:text-accent hover:border-accent transition-all"
                      >
                        <Apple className="w-3.5 h-3.5 fill-current" />
                        <span>App Store</span>
                      </a>
                    )}
                    {project.links.playStore && (
                      <a
                        href={project.links.playStore}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-tactile touch-target inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg bg-surface border border-border-strong text-ink hover:text-accent hover:border-accent transition-all"
                      >
                        <Play className="w-3.5 h-3.5 fill-current" />
                        <span>Google Play</span>
                      </a>
                    )}
                  </div>
                </div>

                {/* Screenshots Gallery Column (6 cols) */}
                <div
                  className={`lg:col-span-6 flex justify-center ${
                    isReversed ? 'order-2 lg:order-1' : 'order-2'
                  }`}
                >
                  <div className="relative w-full max-w-[480px] grid grid-cols-2 gap-4">
                    {project.screenshots.map((shot, sIndex) => (
                      <div
                        key={sIndex}
                        className="relative rounded-[28px] sm:rounded-[34px] p-2 bg-surface border border-border-strong shadow-card group overflow-hidden"
                      >
                        <div className="relative aspect-[525/1136] rounded-[22px] sm:rounded-[26px] overflow-hidden bg-black/90">
                          <img
                            src={getAssetUrl(shot)}
                            alt={`${project.title} screenshot ${sIndex + 1}`}
                            width={240}
                            height={520}
                            className="w-full h-full object-cover object-top group-hover:scale-103 transition-transform duration-500"
                            loading="lazy"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SelectedWork;
