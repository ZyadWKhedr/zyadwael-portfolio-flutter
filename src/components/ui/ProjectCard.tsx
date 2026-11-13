import React from 'react';
import { Apple, Play, Code2, ArrowUpRight, Sparkles, Check } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { getAssetUrl } from '@/lib/utils';

export interface ProjectCardLinks {
  appStore?: string;
  playStore?: string;
  landingPage?: string;
  github?: string;
  pubDev?: string;
  article?: string;
}

export interface ProjectCardProps {
  id: string;
  title: string;
  arabicTitle?: string;
  category: string;
  summary: string;
  contribution?: string;
  contributionDetails?: string[];
  stack: string[];
  icon?: string;
  links?: ProjectCardLinks;
  media?: React.ReactNode;
  reversed?: boolean;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  arabicTitle,
  category,
  summary,
  contribution,
  contributionDetails,
  stack,
  icon,
  links,
  media,
  reversed = false,
}) => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  const displayTitle = isArabic && arabicTitle ? arabicTitle : title;

  return (
    <article className="spec-card rounded-xl bg-surface border border-border p-6 sm:p-8 transition-all duration-200 hover:border-border-strong text-start shadow-subtle">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Content Column (7 cols) */}
        <div className={`lg:col-span-7 space-y-5 ${reversed ? 'order-1 lg:order-2' : 'order-1'}`}>
          {/* Header Row: App Icon + Titles + Category */}
          <div className="flex items-center gap-3.5">
            {icon && (
              <div className="w-12 h-12 rounded-xl overflow-hidden bg-elevated border border-border-subtle p-1 shrink-0 flex items-center justify-center shadow-sm">
                <img
                  src={icon.startsWith('http') || icon.startsWith('data:') || icon.startsWith('/') ? getAssetUrl(icon) : icon}
                  alt={`${displayTitle} icon`}
                  width="48"
                  height="48"
                  className="w-full h-full object-contain rounded-lg"
                  loading="lazy"
                />
              </div>
            )}
            <div>
              <div className="flex items-baseline gap-2 flex-wrap">
                <h3 className="type-h3 font-display font-bold text-ink">
                  {displayTitle}
                </h3>
                {/* Secondary subtitle in opposite language if available */}
                {arabicTitle && (
                  <span className="text-xs text-ink-muted opacity-80" dir={isArabic ? 'ltr' : 'rtl'}>
                    {isArabic ? title : arabicTitle}
                  </span>
                )}
              </div>
              <div className="text-xs font-mono text-accent mt-0.5">
                {category}
              </div>
            </div>
          </div>

          {/* Summary */}
          <p className="type-body text-ink-secondary leading-relaxed">
            {summary}
          </p>

          {/* Contribution Statement */}
          {contribution && (
            <div className="p-3.5 rounded-md bg-elevated border-s-2 border-accent text-xs leading-relaxed">
              <span className="font-semibold text-ink block mb-0.5">
                {t('work.myContribution', 'My contribution:')}
              </span>
              <span className="text-ink-secondary">{contribution}</span>
            </div>
          )}

          {/* Key Implementation Highlights */}
          {contributionDetails && contributionDetails.length > 0 && (
            <div>
              <div className="type-overline text-ink-muted mb-2">
                {t('work.highlights', 'Key implementation highlights')}
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-ink-secondary">
                {contributionDetails.map((detail) => (
                  <li key={detail} className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Technology Badges & Links Row */}
          <div className="pt-3 border-t border-border-subtle flex flex-wrap items-center justify-between gap-3">
            {/* Tech Stack Pills */}
            <div className="flex flex-wrap items-center gap-1.5">
              {stack.map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-0.5 text-[11px] font-mono rounded bg-elevated border border-border-subtle text-ink-secondary"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Action Buttons */}
            {links && (
              <div className="flex flex-wrap items-center gap-2">
                {links.landingPage && (
                  <a
                    href={getAssetUrl(links.landingPage)}
                    className="btn-tactile touch-target inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md bg-accent text-accent-fg hover:bg-accent-hover transition-colors shadow-subtle"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{t('work.viewProductPage', 'View Product Page')}</span>
                  </a>
                )}

                {links.pubDev && (
                  <a
                    href={links.pubDev}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-tactile touch-target inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md border border-border-strong bg-surface hover:bg-elevated text-ink hover:text-accent transition-colors"
                  >
                    <span>{t('work.pubDev', 'pub.dev (130 pts)')}</span>
                    <ArrowUpRight className="w-3 h-3 text-ink-muted" />
                  </a>
                )}

                {links.playStore && (
                  <a
                    href={links.playStore}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-tactile touch-target inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md border border-border-strong bg-surface hover:bg-elevated text-ink hover:text-accent transition-colors"
                    aria-label={`${displayTitle} on Google Play`}
                  >
                    <Play className="w-3.5 h-3.5" />
                    <span>{t('work.playStore', 'Google Play')}</span>
                  </a>
                )}

                {links.appStore && (
                  <a
                    href={links.appStore}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-tactile touch-target inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md border border-border-strong bg-surface hover:bg-elevated text-ink hover:text-accent transition-colors"
                    aria-label={`${displayTitle} on App Store`}
                  >
                    <Apple className="w-3.5 h-3.5" />
                    <span>{t('work.appStore', 'App Store')}</span>
                  </a>
                )}

                {links.github && (
                  <a
                    href={links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-tactile touch-target inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md border border-border-strong bg-surface hover:bg-elevated text-ink hover:text-accent transition-colors"
                    aria-label={`${displayTitle} on GitHub`}
                  >
                    <Code2 className="w-3.5 h-3.5" />
                    <span>{t('work.github', 'GitHub')}</span>
                    <ArrowUpRight className="w-3 h-3 text-ink-muted" />
                  </a>
                )}

                {links.article && (
                  <a
                    href={links.article}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-tactile touch-target inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md border border-border-strong bg-surface hover:bg-elevated text-ink hover:text-accent transition-colors"
                    aria-label={`${displayTitle} article`}
                  >
                    <span>{t('work.readArticle', 'Read Article')}</span>
                    <ArrowUpRight className="w-3 h-3 text-ink-muted" />
                  </a>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Media / Screenshot / Interactive Preview Column (5 cols) */}
        <div className={`lg:col-span-5 w-full ${reversed ? 'order-2 lg:order-1' : 'order-2'}`}>
          <div className="w-full rounded-lg bg-elevated/80 border border-border-subtle p-3.5 sm:p-4 overflow-hidden">
            {media}
          </div>
        </div>
      </div>
    </article>
  );
};

export default ProjectCard;
