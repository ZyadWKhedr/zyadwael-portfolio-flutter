import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { COMMERCIAL_PROJECTS } from '@/data/projects';
import { ProjectCard } from '@/components/ui/ProjectCard';
import { getAssetUrl } from '@/lib/utils';

export const SelectedWork: React.FC = () => {
  const { t, i18n } = useTranslation();
  const shouldReduceMotion = useReducedMotion();
  const isArabic = i18n.language === 'ar';

  return (
    <section id="work" className="scroll-mt-20 py-14 md:py-18 border-b border-border-subtle">
      <div className="container max-w-site mx-auto px-5 sm:px-7 lg:px-10">
        {/* Section Header */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="max-w-reading mb-10 md:mb-12 text-start"
        >
          <div className="type-overline text-accent font-mono mb-2.5">
            {t('work.eyebrow', 'PRODUCTION APPLICATIONS')}
          </div>
          <h2 className="type-h2 font-display text-ink mb-3 tracking-tight">
            {t('work.title', 'Selected work')}
          </h2>
          <p className="type-body text-ink-secondary leading-relaxed">
            {t('work.subtitle', "A selection of production mobile applications I've engineered — spanning offline-first Islamic tools, on-device neural inference, enterprise logistics dispatch, and reactive commerce.")}
          </p>
        </motion.div>

        {/* Unified Project Cards List */}
        <div className="space-y-8 md:space-y-10">
          {COMMERCIAL_PROJECTS.map((project, idx) => {
            const isReversed = idx % 2 !== 0;

            // Localized project content
            const title = t(`work.${project.id}.title`, project.title);
            const category = t(`work.${project.id}.category`, project.category);
            const summary = t(`work.${project.id}.summary`, project.summary);
            const contribution = t(`work.${project.id}.contribution`, project.contribution);
            const contributionDetails = [
              t(`work.${project.id}.h1`, project.contributionDetails[0]),
              t(`work.${project.id}.h2`, project.contributionDetails[1]),
              t(`work.${project.id}.h3`, project.contributionDetails[2]),
              t(`work.${project.id}.h4`, project.contributionDetails[3]),
            ];

            // Render project-specific visual media inside consistent container
            const renderMedia = () => {
              if (project.id === 'ufuq') {
                return (
                  <div className="space-y-3 font-mono text-xs">
                    <div className="relative aspect-[16/10] sm:aspect-[16/9] rounded-md overflow-hidden bg-canvas border border-border-subtle group">
                      <img
                        src={getAssetUrl('assets/images/projects/ufuq/ufuq-screen-home.webp')}
                        alt="Ufuq App Interface"
                        width="600"
                        height="338"
                        className="w-full h-full object-cover object-top filter contrast-[1.02] group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-3">
                        <span className="text-[11px] text-white font-sans font-medium text-start">
                          {t('work.ufuq.mediaLabel', 'Ufuq Home Screen · Cairo Radio Live & Prayer Times')}
                        </span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-center text-[11px]">
                      <div className="p-2 rounded bg-surface border border-border-subtle">
                        <span className="text-ink-muted block text-[10px]">
                          {t('work.ufuq.stat1Label', 'Quran Reading')}
                        </span>
                        <span className="text-ink font-semibold">
                          {t('work.ufuq.stat1Val', '100% Offline Uthmani')}
                        </span>
                      </div>
                      <div className="p-2 rounded bg-surface border border-border-subtle">
                        <span className="text-ink-muted block text-[10px]">
                          {t('work.ufuq.stat2Label', 'Audio Stream')}
                        </span>
                        <span className="text-ink font-semibold">
                          {t('work.ufuq.stat2Val', 'Live Cairo 24/7')}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              }

              if (project.id === 'tashkeel') {
                return (
                  <div className="space-y-3 font-mono text-xs">
                    <div className="relative aspect-[16/10] sm:aspect-[16/9] rounded-md overflow-hidden bg-canvas border border-border-subtle group">
                      <img
                        src={getAssetUrl('assets/images/projects/tashkeel/tashkeel-preview.webp')}
                        alt="Tashkeel App Interface"
                        width="600"
                        height="338"
                        className="w-full h-full object-cover object-top filter contrast-[1.02] group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-3">
                        <span className="text-[11px] text-white font-sans font-medium text-start">
                          {t('work.tashkeel.mediaLabel', 'Tashkeel Mobile Interface · On-Device ONNX Diacritization')}
                        </span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-center text-[11px]">
                      <div className="p-2 rounded bg-surface border border-border-subtle">
                        <span className="text-ink-muted block text-[10px]">
                          {t('work.tashkeel.stat1Label', 'Model Integration')}
                        </span>
                        <span className="text-ink font-semibold">
                          {t('work.tashkeel.stat1Val', 'ShakkalV3 Pretrained')}
                        </span>
                      </div>
                      <div className="p-2 rounded bg-surface border border-border-subtle">
                        <span className="text-ink-muted block text-[10px]">
                          {t('work.tashkeel.stat2Label', 'Execution')}
                        </span>
                        <span className="text-ink font-semibold">
                          {t('work.tashkeel.stat2Val', 'ONNX Runtime Local')}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              }

              if (project.id === 'wofoodi') {
                return (
                  <div className="space-y-3 font-mono text-xs">
                    <div className="p-4 rounded bg-surface border border-border-subtle space-y-2.5 text-start">
                      <div className="flex items-center justify-between text-[11px] text-ink-muted">
                        <span className="flex items-center gap-1.5 text-accent font-semibold">
                          <span>{isArabic ? 'خريطة المحطات اللحظية' : 'Live Station Mapping'}</span>
                        </span>
                        <span>{isArabic ? 'السعودية والخليج' : 'KSA / GCC'}</span>
                      </div>
                      <div className="p-3 rounded bg-canvas border border-border-subtle space-y-1">
                        <div className="text-ink font-medium">{isArabic ? 'الموقع الأقرب: طريق الملك فهد' : 'Nearest: King Fahd Rd Station'}</div>
                        <div className="text-[11px] text-ink-secondary">{isArabic ? 'بنزين 91، بنزين 95، ديزل متوفر' : 'Gasoline 91, 95 & Diesel Available'}</div>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-center text-[10px]">
                        <div className="p-1.5 rounded bg-elevated border border-border-subtle">
                          <span className="text-ink-muted block">{isArabic ? 'المزامنة' : 'Sync'}</span>
                          <span className="text-ink font-medium">{isArabic ? 'تخزين SQLite محلي' : 'SQLite Local Buffer'}</span>
                        </div>
                        <div className="p-1.5 rounded bg-elevated border border-border-subtle">
                          <span className="text-ink-muted block">{isArabic ? 'الخريطة' : 'Map'}</span>
                          <span className="text-ink font-medium">Google Maps SDK</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }

              if (project.id === 'amoomy') {
                return (
                  <div className="space-y-3 font-mono text-xs">
                    <div className="p-4 rounded bg-surface border border-border-subtle space-y-2.5 text-start">
                      <div className="flex items-center justify-between text-[11px] text-ink-muted">
                        <span className="flex items-center gap-1.5 text-accent font-semibold">
                          <span>{isArabic ? 'نظام الشحن الثقيل' : 'Heavy Dispatch Flow'}</span>
                        </span>
                        <span>100+ {isArabic ? 'فئة' : 'Categories'}</span>
                      </div>
                      <div className="p-3 rounded bg-canvas border border-border-subtle space-y-1">
                        <div className="text-ink font-medium">{isArabic ? 'حالة الطلب: مسار الرياض - الدمام' : 'Corridor: Riyadh - Dammam'}</div>
                        <div className="text-[11px] text-ink-secondary">{isArabic ? 'مفاوضة الأسعار والعروض لحظياً' : 'Live Multi-Carrier Bidding'}</div>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-center text-[10px]">
                        <div className="p-1.5 rounded bg-elevated border border-border-subtle">
                          <span className="text-ink-muted block">{isArabic ? 'المعمارية' : 'Architecture'}</span>
                          <span className="text-ink font-medium">Clean Architecture</span>
                        </div>
                        <div className="p-1.5 rounded bg-elevated border border-border-subtle">
                          <span className="text-ink-muted block">{isArabic ? 'الأمان' : 'Auth'}</span>
                          <span className="text-ink font-medium">Role-Based OAuth</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }

              if (project.id === 'raval') {
                return (
                  <div className="space-y-3 font-mono text-xs">
                    <div className="p-4 rounded bg-surface border border-border-subtle space-y-2.5 text-start">
                      <div className="flex items-center justify-between text-[11px] text-ink-muted">
                        <span className="flex items-center gap-1.5 text-accent font-semibold">
                          <span>{isArabic ? 'محرك التجارة والتسوق' : 'E-Commerce Engine'}</span>
                        </span>
                        <span>{isArabic ? 'سلة تفاعلية' : 'Reactive Cart'}</span>
                      </div>
                      <div className="p-3 rounded bg-canvas border border-border-subtle space-y-1">
                        <div className="text-ink font-medium">{isArabic ? 'تتبع مسار وحالة الطلب' : 'Multi-Step Order Lifecycle'}</div>
                        <div className="text-[11px] text-ink-secondary">{isArabic ? 'مقبول -> قيد التجهيز -> تم الشحن' : 'Placed -> Packing -> Out for Delivery'}</div>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-center text-[10px]">
                        <div className="p-1.5 rounded bg-elevated border border-border-subtle">
                          <span className="text-ink-muted block">{isArabic ? 'الصور' : 'Image Loader'}</span>
                          <span className="text-ink font-medium">{isArabic ? 'تخزين مؤقت بالقرص' : 'Disk Cached'}</span>
                        </div>
                        <div className="p-1.5 rounded bg-elevated border border-border-subtle">
                          <span className="text-ink-muted block">{isArabic ? 'الحالة' : 'State'}</span>
                          <span className="text-ink font-medium">Provider / Clean Arch</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }

              if (project.id === 'payss') {
                return (
                  <div className="space-y-3 font-mono text-xs">
                    <div className="p-4 rounded bg-surface border border-border-subtle space-y-2.5 text-start">
                      <div className="flex items-center justify-between text-[11px] text-ink-muted">
                        <span className="flex items-center gap-1.5 text-accent font-semibold">
                          <span>{isArabic ? 'مسح QR ونقاط الولاء' : 'QR Scanner & Loyalty'}</span>
                        </span>
                        <span>{isArabic ? 'واجهة التاجر' : 'Merchant View'}</span>
                      </div>
                      <div className="p-3 rounded bg-canvas border border-border-subtle space-y-1">
                        <div className="text-ink font-medium">{isArabic ? 'تحقق لحظي وسجل المعاملات' : 'Instant Counter Verification'}</div>
                        <div className="text-[11px] text-ink-secondary">{isArabic ? 'مسح سريع بنقاط فورية عبر الكاميرا' : 'Hardware Camera Scanner Pipeline'}</div>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-center text-[11px]">
                        <div className="p-2 rounded bg-surface border border-border-subtle">
                          <span className="text-ink-muted block text-[10px]">{isArabic ? 'التحقق' : 'Verification'}</span>
                          <span className="text-ink font-semibold">{isArabic ? 'مسح QR فوري' : 'Instant QR Read'}</span>
                        </div>
                        <div className="p-2 rounded bg-surface border border-border-subtle">
                          <span className="text-ink-muted block text-[10px]">{isArabic ? 'واجهة التاجر' : 'Merchant View'}</span>
                          <span className="text-ink font-semibold">{isArabic ? 'سجل النقاط' : 'Points Ledger'}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }

              return null;
            };

            return (
              <motion.div
                key={project.id}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
                whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.45, delay: idx * 0.05, ease: 'easeOut' }}
              >
                <ProjectCard
                  id={project.id}
                  title={title}
                  arabicTitle={project.arabicTitle}
                  category={category}
                  summary={summary}
                  contribution={contribution}
                  contributionDetails={contributionDetails}
                  stack={project.stack}
                  icon={project.icon}
                  links={project.links}
                  media={renderMedia()}
                  reversed={isReversed}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SelectedWork;
