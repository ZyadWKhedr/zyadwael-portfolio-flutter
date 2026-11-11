import React from 'react';
import { Smartphone, Layers, Cpu, Terminal, Check } from 'lucide-react';
import { SKILL_GROUPS } from '@/data/skills';

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  'mobile-dev': Smartphone,
  'software-eng': Layers,
  'machine-learning': Cpu,
  'tools-systems': Terminal,
};

export const SkillsSection: React.FC = () => {
  return (
    <section id="skills" className="scroll-mt-20 py-20 md:py-28 border-b border-border-subtle">
      <div className="container max-w-site mx-auto px-5 sm:px-7 lg:px-10">
        {/* Section Header */}
        <div className="max-w-reading mb-14 md:mb-18 text-start">
          <div className="type-overline text-accent font-mono mb-3">
            TECHNICAL TOOLBOX
          </div>
          <h2 className="type-h2 font-display text-ink mb-4 tracking-tight">
            What I work with
          </h2>
          <p className="type-body text-ink-secondary leading-relaxed">
            Technologies, libraries, and engineering methods I work with regularly across mobile development, software architecture, and machine learning experiments.
          </p>
        </div>

        {/* 4 Skill Groups Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-start">
          {SKILL_GROUPS.map((group) => {
            const Icon = ICON_MAP[group.id] || Layers;

            return (
              <div
                key={group.id}
                className="spec-card p-6 rounded-lg bg-surface border border-border flex flex-col justify-between hover:border-border-strong transition-colors"
              >
                <div>
                  <div className="w-10 h-10 rounded-md bg-elevated text-accent flex items-center justify-center mb-4 border border-border-subtle">
                    <Icon className="w-5 h-5" />
                  </div>

                  <h3 className="font-display font-semibold text-base text-ink mb-4">
                    {group.title}
                  </h3>

                  <ul className="space-y-2.5">
                    {group.skills.map((skill) => (
                      <li key={skill} className="flex items-center gap-2 text-xs text-ink-secondary font-mono">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent/80 shrink-0" />
                        <span>{skill}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6 mt-6 border-t border-border-subtle text-[11px] font-mono text-ink-muted">
                  Demonstrated in project work
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
