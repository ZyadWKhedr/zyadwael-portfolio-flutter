import React from 'react';
import { Smartphone, Layers, Cpu, Database, Check } from 'lucide-react';
import { CAPABILITIES } from '@/data/skills';

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  mobile: Smartphone,
  architecture: Layers,
  'ai-ml': Cpu,
  'data-science': Database,
};

export const SkillsSection: React.FC = () => {
  return (
    <section id="skills" className="py-20 md:py-28 border-b border-border-subtle bg-surface/30">
      <div className="container max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-border-subtle">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-widest text-accent mb-2">
              <span className="w-2 h-2 rounded-full bg-accent" />
              <span>Technical Capabilities</span>
            </div>
            <h2 className="font-serif fluid-3xl font-bold tracking-tight text-ink">
              Skills Anchored in Execution
            </h2>
          </div>
          <p className="text-ink-muted text-sm md:text-base max-w-md font-sans leading-relaxed">
            No arbitrary percentage bars or technology logo dumps. Every capability is grounded 
            in delivered commercial products or published technical research.
          </p>
        </div>

        {/* 4-Column Capability Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-12">
          {CAPABILITIES.map((group) => {
            const Icon = ICON_MAP[group.id] || Layers;
            return (
              <div
                key={group.id}
                className="spec-card p-4 sm:p-6 overflow-hidden flex flex-col justify-between rounded-xl bg-surface hover:shadow-card transition-all"
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
                  <div className="space-y-1.5 pb-6 border-b border-border-subtle">
                    {group.skills.map((skill) => (
                      <div key={skill} className="flex items-center gap-2 text-xs text-ink font-mono">
                        <Check className="w-3 h-3 text-accent shrink-0" />
                        <span>{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Evidence Proof Strip */}
                <div className="pt-4 mt-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-ink-faint block mb-2">
                    Verified Execution
                  </span>
                  <div className="space-y-2">
                    {group.evidence.map((ev, i) => (
                      <div key={i} className="p-2.5 rounded bg-elevated border border-border-subtle text-[11px]">
                        <span className="font-semibold text-ink block">{ev.project}</span>
                        <span className="text-ink-muted leading-tight block mt-0.5">{ev.detail}</span>
                      </div>
                    ))}
                  </div>
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
