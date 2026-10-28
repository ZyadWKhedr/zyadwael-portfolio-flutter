import React from 'react';
import { Quote, Linkedin, ExternalLink } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { TESTIMONIALS } from '@/data/testimonials';

const LINKEDIN_PROFILE = 'https://www.linkedin.com/in/zyad-wael-a9035a275/';

export const TestimonialsSection: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section id="testimonials" className="scroll-mt-24 py-20 md:py-28 border-b border-border-subtle bg-surface/40">
      <div className="container max-w-7xl xl:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-border-subtle text-start">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-widest text-accent mb-2">
              <span className="w-2 h-2 rounded-full bg-accent" />
              <span>{t('testimonials.badge', 'Peer & Client Endorsements')}</span>
            </div>
            <h2 className="font-serif fluid-3xl font-bold tracking-tight text-ink">
              {t('testimonials.title', 'Verified recommendations from engineering colleagues.')}
            </h2>
          </div>
          <p className="text-ink-muted text-sm md:text-base max-w-md font-sans leading-relaxed">
            {t('testimonials.subtitle', 'Unedited feedback from software engineers, designers, and team leads who have worked alongside me on production mobile codebases.')}
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-12">
          {TESTIMONIALS.map((testimonial) => (
            <div
              key={testimonial.id}
              className="spec-card p-6 rounded-xl bg-surface flex flex-col justify-between hover:shadow-card transition-all group text-start"
            >
              <div>
                {/* Header row: Quote icon + Highlight pill */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-elevated border border-border-subtle flex items-center justify-center text-accent shrink-0">
                    <Quote className="w-4 h-4" />
                  </div>
                  <span className="px-2 py-0.5 rounded bg-accent/10 text-accent text-[10px] font-mono font-semibold uppercase tracking-wider text-end line-clamp-1">
                    {testimonial.highlight}
                  </span>
                </div>

                {/* Quote body */}
                <blockquote className="text-xs md:text-sm text-ink-muted font-sans leading-relaxed italic mb-6">
                  "{testimonial.quote}"
                </blockquote>
              </div>

              {/* Attribution footer */}
              <div className="pt-4 border-t border-border-subtle flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-elevated border border-border-strong flex items-center justify-center text-xs font-mono font-bold text-ink">
                    {testimonial.initials}
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-ink font-sans flex items-center gap-1.5">
                      <span>{testimonial.name}</span>
                    </h3>
                    <div className="text-[11px] text-ink-muted leading-tight font-mono">
                      {testimonial.role} · {testimonial.company}
                    </div>
                  </div>
                </div>

                {testimonial.linkedIn && (
                  <a
                    href={testimonial.linkedIn}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-md border border-border-subtle text-ink-muted hover:text-accent hover:border-accent transition-colors shrink-0"
                    aria-label={`Verify recommendation from ${testimonial.name} on LinkedIn`}
                    title="Verify recommendation on LinkedIn"
                  >
                    <Linkedin className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* LinkedIn Verification Callout */}
        <div className="mt-12 p-4 rounded-xl bg-surface border border-border-subtle flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
          <div className="flex items-center gap-2 text-ink-muted">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>{t('testimonials.verified', 'Verified LinkedIn Recommendation')}</span>
          </div>
          <a
            href={LINKEDIN_PROFILE}
            target="_blank"
            rel="noopener noreferrer"
            className="touch-target inline-flex items-center gap-1.5 text-accent hover:underline font-semibold"
          >
            <span>linkedin.com/in/zyad-wael-a9035a275</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
