import React, { useState, useEffect } from 'react';
import { ArrowDown, ArrowUpRight, Github, Linkedin, FileText, MapPin, Clock, Cpu, Sparkles } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import profileWebp from '@/assets/zyad-profile.webp';
import { staggerContainer, staggerItem } from '@/lib/animations';

const CV_URL = 'https://drive.google.com/file/d/1ICEIF6wW4eFgZpv2FzKn0ev8zo6XWMgi/view?usp=drive_link';
const GITHUB_URL = 'https://github.com/ZyadWKhedr';
const LINKEDIN_URL = 'https://www.linkedin.com/in/zyad-wael-a9035a275/';

// Live Alexandria / Cairo 24-hour time formatter
const getCairoTime = (): string => {
  try {
    return new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Africa/Cairo',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    }).format(new Date());
  } catch {
    const d = new Date();
    const utc = d.getTime() + d.getTimezoneOffset() * 60000;
    const cairo = new Date(utc + 2 * 3600000);
    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${pad(cairo.getHours())}:${pad(cairo.getMinutes())}:${pad(cairo.getSeconds())}`;
  }
};

export const HeroSection: React.FC = () => {
  const { t, i18n } = useTranslation();
  const shouldReduceMotion = useReducedMotion();
  const [timeString, setTimeString] = useState<string>(getCairoTime);

  useEffect(() => {
    const update = () => setTimeString(getCairoTime());
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  const isRtl = i18n.language === 'ar';

  return (
    <section
      id="hero"
      className="scroll-mt-20 pt-14 pb-16 md:pt-20 md:pb-24 border-b border-border-subtle overflow-hidden"
    >
      <div className="container max-w-site mx-auto px-5 sm:px-7 lg:px-10">
        <motion.div
          variants={staggerContainer}
          initial={shouldReduceMotion ? 'visible' : 'hidden'}
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center"
        >
          {/* Left Column: Editorial Copy & CTAs (7-8 cols) */}
          <div className="lg:col-span-7 flex flex-col items-start text-start max-w-reading">
            {/* Introductory Eyebrow Pill */}
            <motion.div variants={staggerItem} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface border border-border text-xs font-mono text-accent mb-4 tracking-wider">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span>{t('hero.eyebrow', 'SOFTWARE DEVELOPER · DATA SCIENCE STUDENT')}</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              variants={staggerItem}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-bold text-ink leading-[1.18] tracking-tight mb-5"
            >
              {t(
                'hero.headline',
                'I build software, explore ideas, and turn interesting problems into working products.'
              )}
            </motion.h1>

            {/* Supporting Paragraph */}
            <motion.p
              variants={staggerItem}
              className="text-base sm:text-lg text-ink-secondary leading-relaxed mb-8 max-w-xl"
            >
              {t(
                'hero.bio',
                "I'm Zyad, a software developer focused on Flutter and mobile engineering. Alongside building applications, I explore machine learning, algorithms, and the engineering behind the tools we use."
              )}
            </motion.p>

            {/* Primary & Secondary Action CTAs */}
            <motion.div variants={staggerItem} className="flex flex-wrap items-center gap-3.5 mb-8">
              <a
                href="#work"
                className="btn-tactile touch-target inline-flex items-center gap-2 px-5 py-3 text-xs sm:text-sm font-semibold rounded-lg bg-accent text-accent-fg hover:bg-accent-hover transition-all shadow-subtle"
              >
                <span>{t('hero.ctaWork', 'Explore selected work')}</span>
                <ArrowDown className="w-4 h-4" />
              </a>

              <a
                href="#contact"
                className="btn-tactile touch-target inline-flex items-center gap-2 px-5 py-3 text-xs sm:text-sm font-semibold rounded-lg border border-border-strong bg-surface hover:bg-surface-hover text-ink transition-all"
              >
                <span>{t('hero.ctaContact', "Let's talk")}</span>
                <ArrowUpRight className="w-4 h-4 text-ink-muted" />
              </a>
            </motion.div>

            {/* Links Row: GitHub, LinkedIn, CV, Location */}
            <motion.div
              variants={staggerItem}
              className="flex flex-wrap items-center gap-4 pt-5 border-t border-border-subtle text-xs font-medium text-ink-muted w-full"
            >
              <div className="flex items-center gap-3">
                <a
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-ink hover:underline transition-colors inline-flex items-center gap-1.5"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>{t('hero.github', 'GitHub')}</span>
                </a>
                <span className="text-border-subtle">·</span>
                <a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-ink hover:underline transition-colors inline-flex items-center gap-1.5"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                  <span>{t('hero.linkedin', 'LinkedIn')}</span>
                </a>
                <span className="text-border-subtle">·</span>
                <a
                  href={CV_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-ink hover:underline transition-colors inline-flex items-center gap-1.5"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>{t('hero.cv', 'Download CV')}</span>
                </a>
              </div>

              <span className="text-border-subtle hidden sm:inline">|</span>

              <div className="flex items-center gap-1.5 text-ink-muted font-mono text-[11px]">
                <MapPin className="w-3 h-3 text-accent shrink-0" />
                <span>{t('topBar.location', 'Alexandria, Egypt')}</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Intentional Visual Composition (5 cols) */}
          <motion.div
            variants={staggerItem}
            className="lg:col-span-5 flex flex-col items-center sm:items-end justify-center"
          >
            <div className="relative w-full max-w-[340px] sm:max-w-[360px] space-y-4">
              {/* Profile Portrait Card */}
              <div className="relative rounded-2xl p-2.5 bg-surface border border-border shadow-card overflow-hidden group">
                <div className="aspect-[4/5] rounded-xl overflow-hidden bg-elevated relative">
                  <img
                    src={profileWebp}
                    alt="Zyad Wael portrait"
                    width={360}
                    height={450}
                    className="w-full h-full object-cover object-center filter contrast-[1.02] group-hover:scale-102 transition-transform duration-500"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-4">
                    <div className="text-start">
                      <span className="text-white font-semibold text-sm block">
                        Zyad Wael
                      </span>
                      <span className="text-white/80 text-xs font-mono">
                        Alexandria, Egypt
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Real-time Alexandria Clock Widget */}
              <div className="p-3.5 rounded-xl bg-surface border border-border flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-2 text-ink-muted">
                  <Clock className="w-4 h-4 text-accent" />
                  <span>Alexandria (UTC+2)</span>
                </div>
                <span dir="ltr" className="font-bold text-ink tabular-nums tracking-wider text-sm">
                  {timeString}
                </span>
              </div>

              {/* Technical Areas Pill Strip */}
              <div className="p-3 rounded-xl bg-surface/60 border border-border-subtle flex flex-wrap items-center justify-center gap-2 text-[11px] font-mono text-ink-muted">
                <span className="px-2 py-0.5 rounded bg-surface border border-border text-ink">
                  Flutter & Dart
                </span>
                <span className="px-2 py-0.5 rounded bg-surface border border-border text-ink">
                  On-Device ML
                </span>
                <span className="px-2 py-0.5 rounded bg-surface border border-border text-ink">
                  Go CLI
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
