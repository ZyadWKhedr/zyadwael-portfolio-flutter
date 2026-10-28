import React from 'react';
import { Quote, Linkedin, ExternalLink, MessageSquarePlus } from 'lucide-react';
import { TESTIMONIALS } from '@/data/testimonials';

const LINKEDIN_PROFILE = 'https://www.linkedin.com/in/zyad-wael-a9035a275/';

export const TestimonialsSection: React.FC = () => {
  return (
    <section id="testimonials" className="py-20 md:py-28 border-b border-border-subtle bg-surface/40">
      <div className="container max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-border-subtle">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-widest text-accent mb-2">
              <span className="w-2 h-2 rounded-full bg-accent" />
              <span>Colleague Endorsements</span>
            </div>
            <h2 className="font-serif fluid-3xl font-bold tracking-tight text-ink">
              Engineering Peer Reviews
            </h2>
          </div>
          <p className="text-ink-muted text-sm md:text-base max-w-md font-sans leading-relaxed">
            Direct recommendations from software engineers, UI/UX designers, and campus leadership 
            collaborators on verified LinkedIn profiles.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-12">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="spec-card p-6 rounded-xl bg-surface flex flex-col justify-between hover:shadow-card transition-all group"
            >
              <div>
                {/* Header row: Quote icon + Highlight pill */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-elevated border border-border-subtle flex items-center justify-center text-accent shrink-0">
                    <Quote className="w-4 h-4" />
                  </div>
                  <span className="px-2 py-0.5 rounded bg-accent-subtle text-accent text-[10px] font-mono font-semibold uppercase tracking-wider text-right line-clamp-1">
                    {t.highlight}
                  </span>
                </div>

                {/* Quote body */}
                <blockquote className="text-xs md:text-sm text-ink-muted font-sans leading-relaxed italic mb-6">
                  "{t.quote}"
                </blockquote>
              </div>

              {/* Attribution footer */}
              <div className="pt-4 border-t border-border-subtle flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-elevated border border-border-strong flex items-center justify-center text-xs font-mono font-bold text-ink">
                    {t.initials}
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-ink font-sans flex items-center gap-1.5">
                      <span>{t.name}</span>
                    </h3>
                    <p className="text-[11px] text-ink-faint font-mono">
                      {t.role} · {t.company}
                    </p>
                  </div>
                </div>

                {t.linkedIn && (
                  <a
                    href={t.linkedIn}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="touch-target p-2 rounded-md text-ink-faint hover:text-accent hover:bg-elevated transition-colors"
                    aria-label={`View ${t.name}'s verified profile on LinkedIn`}
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          ))}

          {/* Invitation Card for Future Collaborators */}
          <div className="spec-card p-6 rounded-xl bg-elevated/40 border-dashed border-border-strong flex flex-col justify-between">
            <div>
              <div className="w-8 h-8 rounded-lg bg-surface border border-border-subtle flex items-center justify-center text-accent mb-4">
                <MessageSquarePlus className="w-4 h-4" />
              </div>
              <h3 className="font-serif text-lg font-bold text-ink mb-2">
                Collaborated on a project?
              </h3>
              <p className="text-xs text-ink-muted font-sans leading-relaxed">
                If we have shipped software, resolved complex architecture, or led technical workshops together, 
                your endorsement on LinkedIn is always appreciated.
              </p>
            </div>

            <div className="pt-6">
              <a
                href={LINKEDIN_PROFILE}
                target="_blank"
                rel="noopener noreferrer"
                className="touch-target inline-flex items-center gap-1.5 px-4 py-2 rounded-md border border-border-strong bg-surface hover:border-accent hover:text-accent text-xs font-mono font-medium transition-colors w-full justify-center"
              >
                <span>Leave a LinkedIn Endorsement</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
