import React from 'react';
import { Apple, Play, Sparkles, BookOpen, Clock, Heart, Radio, ArrowUpRight, ExternalLink } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { getAssetUrl } from '@/lib/utils';
import { scrollReveal } from '@/lib/animations';

const APP_STORE_URL = 'https://apps.apple.com/id/app/ufuq/id6821979552';
const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.ziad.ufuq';

export const UfuqShowcase: React.FC = () => {
  const { t, i18n } = useTranslation();
  const shouldReduceMotion = useReducedMotion();
  const isRtl = i18n.language === 'ar';

  return (
    <section id="ufuq" className="scroll-mt-20 py-20 md:py-28 border-b border-border-subtle bg-gradient-to-b from-canvas via-[#0D1F1A]/20 to-canvas relative overflow-hidden">
      <div className="container max-w-site mx-auto px-5 sm:px-7 lg:px-10">
        <motion.div
          variants={scrollReveal}
          initial={shouldReduceMotion ? false : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="rounded-3xl border border-[#1E4D3E]/40 bg-surface/80 p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-2xl backdrop-blur-xs"
        >
          {/* Subtle Ambient Decorative Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#164A3A]/15 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">
            {/* Left Column: Product Identity & Store CTAs (7 cols) */}
            <div className="lg:col-span-7 space-y-6 text-start">
              {/* Product Eyebrow Pill */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#164A3A]/15 border border-[#164A3A]/40 text-xs font-mono text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>{isRtl ? 'تطبيق إسلامي منشور ومستقل' : 'PUBLISHED PRODUCT SHOWCASE'}</span>
              </div>

              {/* Logo & Dual Title */}
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl overflow-hidden bg-white border border-[#164A3A]/30 p-1.5 shrink-0 shadow-lg">
                  <img
                    src={getAssetUrl('assets/images/projects/ufuq/ufuq-icon.png')}
                    alt="Ufuq App Icon"
                    width={64}
                    height={64}
                    className="w-full h-full object-contain rounded-xl"
                  />
                </div>
                <div>
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-ink tracking-tight">
                    {isRtl ? 'أُفُق — رفيق المسلم اليومي' : 'Ufuq — Islamic Companion'}
                  </h2>
                  <span className="text-xs sm:text-sm font-mono text-emerald-400 block mt-1">
                    iOS · Android · 100% Free · No Ads
                  </span>
                </div>
              </div>

              {/* Arabic-first Description */}
              <p className="text-base sm:text-lg text-ink-secondary leading-relaxed max-w-xl">
                {isRtl
                  ? 'رفيق إسلامي هادئ يجمع القرآن الكريم بالرسم العثماني للقراءة دون إنترنت، ومواقيت الصلاة الفلكية، والأذكار اليومية بمسبحة لمسية، وبث إذاعة القرآن الكريم من القاهرة على مدار الساعة.'
                  : 'An Arabic Islamic companion designed to make everyday worship accessible, featuring offline Quran reading in authentic Uthmani script, live Cairo Quran Radio, solar prayer times, and daily Athkar with a tactile Subha.'}
              </p>

              {/* Core Feature Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-surface border border-border space-y-1">
                  <BookOpen className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-bold text-ink block">
                    {isRtl ? 'المصحف الشريف' : 'Full Quran'}
                  </span>
                  <span className="text-[10px] text-ink-muted block">
                    {isRtl ? 'رسم عثماني أوفلاين' : 'Offline Uthmani'}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-surface border border-border space-y-1">
                  <Clock className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-bold text-ink block">
                    {isRtl ? 'مواقيت الصلاة' : 'Prayer Times'}
                  </span>
                  <span className="text-[10px] text-ink-muted block">
                    {isRtl ? 'حساب GPS دقيق' : 'Astronomical GPS'}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-surface border border-border space-y-1">
                  <Heart className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-bold text-ink block">
                    {isRtl ? 'المسبحة اللمسية' : 'Tactile Subha'}
                  </span>
                  <span className="text-[10px] text-ink-muted block">
                    {isRtl ? 'نبضات اهتزازية' : 'Haptic feedback'}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-surface border border-border space-y-1">
                  <Radio className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-bold text-ink block">
                    {isRtl ? 'إذاعة القاهرة' : 'Cairo Radio'}
                  </span>
                  <span className="text-[10px] text-ink-muted block">
                    {isRtl ? 'بث مباشر 24/7' : 'Live 24/7 Audio'}
                  </span>
                </div>
              </div>

              {/* Action Buttons: Stores + Landing Page Link */}
              <div className="pt-3 flex flex-wrap items-center gap-3.5">
                <a
                  href={APP_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-tactile touch-target inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-all shadow-md"
                >
                  <Apple className="w-4 h-4 fill-current" />
                  <span>App Store</span>
                </a>

                <a
                  href={PLAY_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-tactile touch-target inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-surface border border-border-strong text-ink hover:text-emerald-400 font-semibold text-xs transition-all"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>Google Play</span>
                </a>

                <Link
                  to="/ufuq/"
                  className="btn-tactile touch-target inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-border bg-surface text-ink-muted hover:text-ink text-xs font-mono transition-all"
                >
                  <span>{isRtl ? 'زيارة صفحة التطبيق الكاملة' : 'View Official Product Page'}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Right Column: Realistic Phone Mockup (5 cols) */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-[280px] sm:max-w-[300px]">
                {/* Phone Chassis */}
                <div className="relative rounded-[44px] p-2 bg-[#12241E] border-2 border-[#1E4D3E] shadow-2xl">
                  {/* Dynamic Island Notch */}
                  <div className="absolute top-3.5 left-1/2 -translate-x-1/2 w-20 h-4 bg-black rounded-full z-20 flex items-center justify-end px-2">
                    <div className="w-2 h-2 rounded-full bg-stone-900" />
                  </div>

                  {/* Inner Screen Display */}
                  <div className="relative aspect-[9/19] rounded-[34px] overflow-hidden bg-black">
                    <img
                      src={getAssetUrl('assets/images/projects/ufuq/ufuq-screen-home.webp')}
                      alt="Ufuq App Home Screen"
                      width={300}
                      height={633}
                      className="w-full h-full object-cover object-top"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default UfuqShowcase;
