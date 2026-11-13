import React from 'react';
import { ArrowUpRight, Clock } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ARTICLES } from '@/data/articles';

export const WritingSection: React.FC = () => {
  const { t, i18n } = useTranslation();
  const shouldReduceMotion = useReducedMotion();
  const isArabic = i18n.language === 'ar';

  return (
    <section id="writing" className="scroll-mt-20 py-14 md:py-18 border-b border-border-subtle">
      <div className="container max-w-site mx-auto px-5 sm:px-7 lg:px-10">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 md:mb-12 text-start">
            <div className="max-w-reading">
              <div className="type-overline text-accent font-mono mb-2.5">
                {t('writing.eyebrow', 'TECHNICAL WRITING & PUBLICATIONS')}
              </div>
              <h2 className="type-h2 font-display text-ink mb-3 tracking-tight">
                {t('writing.title', 'Notes from building things')}
              </h2>
              <p className="type-body text-ink-secondary leading-relaxed">
                {t('writing.subtitle', 'I occasionally write about algorithms, machine learning, mobile development, and the engineering details behind projects.')}
              </p>
            </div>

            <a
              href="https://medium.com/@ziad.w.khedr"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-tactile touch-target inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium rounded-md border border-border-strong bg-surface hover:bg-surface-hover text-ink transition-colors self-start md:self-auto shrink-0"
              aria-label="View Zyad Wael's profile on Medium"
            >
              <span>{t('writing.allArticles', 'All articles on Medium')}</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-ink-muted" />
            </a>
          </div>

          {/* Editorial Articles Ledger */}
          <div className="divide-y divide-border-subtle border-y border-border-subtle">
            {ARTICLES.map((article) => {
              const displayTitle = isArabic && article.title_ar ? article.title_ar : article.title;
              const displaySummary = isArabic && article.summary_ar ? article.summary_ar : article.summary;
              const displayReadTime = isArabic && article.readTime_ar ? article.readTime_ar : article.readTime;
              const displayTopic = isArabic && article.topic_ar ? article.topic_ar : article.topic;

              return (
                <article
                  key={article.url}
                  className="py-6 sm:py-8 group flex flex-col md:flex-row md:items-baseline justify-between gap-6 transition-colors text-start"
                >
                  <div className="md:w-3/4 space-y-2">
                    {/* Metadata Row */}
                    <div className="flex flex-wrap items-center gap-2.5 text-xs font-mono text-ink-muted">
                      <span className="text-accent font-semibold">{article.publication}</span>
                      <span className="text-border-subtle">·</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-ink-muted" />
                        <span>{displayReadTime}</span>
                      </span>
                      <span className="text-border-subtle">·</span>
                      <span className="px-2 py-0.5 rounded bg-elevated text-[11px] text-ink-secondary border border-border-subtle">
                        {displayTopic}
                      </span>
                    </div>

                    {/* Article Title */}
                    <h3 className="type-h3 font-display font-semibold text-ink group-hover:text-accent transition-colors pt-1">
                      <a
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="focus:outline-none focus-visible:underline inline-flex items-center gap-2"
                      >
                        <span>{displayTitle}</span>
                        <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 text-accent" />
                      </a>
                    </h3>

                    {/* Short Explanation */}
                    <p className="type-body-sm text-ink-secondary leading-relaxed pt-1 max-w-reading">
                      {displaySummary}
                    </p>
                  </div>

                  {/* Action Button */}
                  <div className="shrink-0 pt-2 md:pt-0">
                    <a
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-tactile touch-target inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md border border-border-subtle bg-surface hover:bg-surface-hover hover:border-accent text-ink hover:text-accent transition-colors"
                      aria-label={`${t('writing.readPiece', 'Read publication')}: ${displayTitle}`}
                    >
                      <span>{t('writing.readPiece', 'Read publication')}</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WritingSection;
