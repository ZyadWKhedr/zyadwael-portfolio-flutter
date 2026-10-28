import React from 'react';
import { Smartphone, Layers, Terminal, Cpu, Check, Briefcase, Calendar, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { CAPABILITIES, EXPERIENCE_MILESTONES } from '@/data/skills';

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  'flutter-core': Smartphone,
  architecture: Layers,
  'platform-hardware': Cpu,
  'devops-stores': Terminal,
};

export const SkillsSection: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section id="skills" className="scroll-mt-24 py-20 md:py-28 border-b border-border-subtle bg-surface/20">
      <div className="container max-w-7xl xl:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {/* Section 1: Technical Capabilities Matrix */}
        <div>
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-border-subtle text-start">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-widest text-accent mb-2">
                <span className="w-2 h-2 rounded-full bg-accent" />
                <span>{t('skills.badge', 'Technical Capabilities')}</span>
              </div>
              <h2 className="font-serif fluid-3xl font-bold tracking-tight text-ink">
                {t('skills.title', 'Engineered for durability, maintainability, and scale.')}
              </h2>
            </div>
            <p className="text-ink-muted text-sm md:text-base max-w-md font-sans leading-relaxed">
              {t('skills.subtitle', 'Every capability is backed by production code shipped to commercial stores or open-source packages.')}
            </p>
          </div>

          {/* 4-Column Capability Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-12">
            {CAPABILITIES.map((group) => {
              const Icon = ICON_MAP[group.id] || Layers;
              return (
                <div
                  key={group.id}
                  className="spec-card p-6 overflow-hidden flex flex-col justify-between rounded-xl bg-surface hover:border-border-strong hover:shadow-card transition-all text-start"
                >
                  <div>
                    <div className="w-10 h-10 rounded-lg bg-elevated border border-border-subtle flex items-center justify-center text-accent mb-4">
                      <Icon className="w-5 h-5" />
                    </div>

                    <h3 className="font-serif text-lg font-bold text-ink mb-2">
                      {group.title}
                    </h3>

                    <p className="text-xs text-ink-muted leading-relaxed font-sans mb-5">
                      {group.description}
                    </p>

                    {/* Skills Tag List */}
                    <div className="space-y-2 pb-6 border-b border-border-subtle">
                      {group.skills.map((skill) => (
                        <div key={skill} className="flex items-center gap-2 text-xs text-ink font-mono">
                          <Check className="w-3.5 h-3.5 text-accent shrink-0" />
                          <span>{skill}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Evidence Callout */}
                  <div className="pt-4">
                    <div className="text-[10px] font-mono uppercase tracking-wider text-accent font-semibold mb-2">
                      {t('skills.evidenceLabel', 'Production Evidence')}
                    </div>
                    <div className="space-y-1.5">
                      {group.evidence.map((ev, eIdx) => (
                        <div key={eIdx} className="text-xs text-ink-muted leading-snug">
                          <span className="font-semibold text-ink font-mono text-[11px] block">{ev.project}</span>
                          <span className="text-ink-faint text-[11px]">{ev.detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section 2: Experience & Engineering Journey Timeline */}
        <div className="pt-8 border-t border-border-subtle">
          <div className="max-w-3xl mb-12 text-start">
            <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-widest text-accent mb-2">
              <Briefcase className="w-3.5 h-3.5" />
              <span>Career Milestones &amp; Track Record</span>
            </div>
            <h3 className="font-serif fluid-2xl font-bold tracking-tight text-ink mb-3">
              Hands-on engineering across startups, community &amp; open source.
            </h3>
            <p className="text-sm md:text-base text-ink-muted leading-relaxed">
              A chronology of commercial product shipments, technical curriculum leadership, and community package authoring.
            </p>
          </div>

          {/* Timeline Stream */}
          <div className="relative pl-6 sm:pl-8 border-l border-border-strong/60 space-y-10 text-start">
            {EXPERIENCE_MILESTONES.map((item, idx) => (
              <div key={idx} className="relative group">
                {/* Timeline Node Dot */}
                <span
                  className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-3.5 h-3.5 rounded-full border-2 border-accent bg-canvas transition-transform duration-200 group-hover:scale-125"
                  aria-hidden="true"
                />

                <div className="spec-card p-6 rounded-xl bg-surface border border-border-subtle hover:border-border-strong transition-all">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-3 border-b border-border-subtle">
                    <div>
                      <h4 className="font-serif text-lg font-bold text-ink">
                        {item.role}
                      </h4>
                      <div className="text-xs font-mono font-semibold text-accent mt-0.5">
                        {item.organization}
                      </div>
                    </div>
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-surface-subtle border border-border-subtle text-xs font-mono text-ink-muted shrink-0 w-fit">
                      <Calendar className="w-3 h-3 text-accent" />
                      <span>{item.period}</span>
                    </div>
                  </div>

                  <p className="text-sm text-ink-muted leading-relaxed mb-4 font-sans">
                    {item.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-1.5">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 text-[11px] font-mono rounded bg-elevated text-ink-muted border border-border-subtle"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
