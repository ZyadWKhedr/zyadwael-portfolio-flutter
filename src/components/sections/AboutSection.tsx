import React from 'react';
import { GraduationCap, Users, Terminal, Cpu } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export const AboutSection: React.FC = () => {
  const { t } = useTranslation();
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="about" className="scroll-mt-20 py-14 md:py-18 border-b border-border-subtle bg-surface/20">
      <div className="container max-w-site mx-auto px-5 sm:px-7 lg:px-10">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start text-start"
        >
          {/* Main Content Column (7 cols) */}
          <div className="lg:col-span-7 space-y-5 max-w-reading">
            <div className="type-overline text-accent font-mono mb-2.5">
              {t('about.eyebrow', 'BACKGROUND & INTERESTS')}
            </div>

            <h2 className="type-h2 font-display text-ink mb-4 tracking-tight">
              {t('about.title', 'A little about me')}
            </h2>

            <div className="space-y-3.5 type-body text-ink-secondary leading-relaxed">
              <p>
                {t('about.p1', "I'm a Data Science student who started building Flutter applications and gradually became interested in the engineering behind them.")}
              </p>
              <p>
                {t('about.p2', 'Outside mobile development, I enjoy exploring machine learning, algorithms, computer vision, and building tools that solve problems I encounter.')}
              </p>
              <p>
                {t('about.p3', 'I like understanding how things work, experimenting with unfamiliar technologies, and sharing what I learn along the way.')}
              </p>
            </div>

            {/* Verified Education & Community Points */}
            <div className="pt-5 border-t border-border-subtle grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="p-4 rounded-md bg-surface border border-border space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-mono font-semibold text-accent">
                  <GraduationCap className="w-4 h-4" />
                  <span>{t('about.educationTitle', 'Education')}</span>
                </div>
                <div className="text-sm font-semibold text-ink">
                  {t('about.educationDegree', 'Data Science Student')}
                </div>
                <div className="text-xs text-ink-muted leading-relaxed">
                  {t('about.educationDesc', 'Focusing on statistical modeling, algorithms, and practical machine learning applications.')}
                </div>
              </div>

              <div className="p-4 rounded-md bg-surface border border-border space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-mono font-semibold text-accent">
                  <Users className="w-4 h-4" />
                  <span>{t('about.communityTitle', 'Community Mentorship')}</span>
                </div>
                <div className="text-sm font-semibold text-ink">
                  {t('about.communityRole', 'HackerRank Campus Club')}
                </div>
                <div className="text-xs text-ink-muted leading-relaxed">
                  {t('about.communityDesc', 'Flutter Committee mentor, sharing Clean Architecture patterns and state management practices.')}
                </div>
              </div>
            </div>
          </div>

          {/* Side Column: What I Value / Focus Areas (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="spec-card p-6 rounded-lg bg-surface border border-border space-y-5">
              <div className="type-overline text-ink-muted pb-3 border-b border-border-subtle">
                {t('about.focusTitle', 'Technical Focus & Curiosity')}
              </div>

              <div className="space-y-4 text-xs">
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded bg-elevated text-accent flex items-center justify-center shrink-0 mt-0.5">
                    <Terminal className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="font-semibold text-ink block text-sm mb-0.5">
                      {t('about.focus1Title', 'Mobile Engineering')}
                    </span>
                    <span className="text-ink-secondary leading-relaxed">
                      {t('about.focus1Desc', 'Building production Flutter applications with Clean Architecture, dependable state handling, and offline caching.')}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded bg-elevated text-accent flex items-center justify-center shrink-0 mt-0.5">
                    <Cpu className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="font-semibold text-ink block text-sm mb-0.5">
                      {t('about.focus2Title', 'On-Device Machine Learning')}
                    </span>
                    <span className="text-ink-secondary leading-relaxed">
                      {t('about.focus2Desc', 'Exploring lightweight model deployment with ONNX Runtime, OpenCV pipelines, and edge inference.')}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded bg-elevated text-accent flex items-center justify-center shrink-0 mt-0.5">
                    <Users className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="font-semibold text-ink block text-sm mb-0.5">
                      {t('about.focus3Title', 'Knowledge Sharing')}
                    </span>
                    <span className="text-ink-secondary leading-relaxed">
                      {t('about.focus3Desc', 'Writing clear technical breakdowns of real engineering patterns rather than buzzword tutorials.')}
                    </span>
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

export default AboutSection;
