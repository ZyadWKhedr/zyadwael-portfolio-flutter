import React from 'react';
import { Terminal, Users, CheckCircle, Smartphone, Award, Cpu } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const AboutSection: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section id="about" className="scroll-mt-24 py-20 md:py-28 border-b border-border-subtle bg-surface/30">
      <div className="container max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 text-start">
          <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-widest text-accent mb-3">
            <span className="w-2 h-2 rounded-full bg-accent" />
            <span>{t('about.badge', 'Background & Philosophy')}</span>
          </div>
          <h2 className="font-serif fluid-3xl font-bold tracking-tight text-ink">
            {t('about.title', 'Software craftsmanship with deep cross-platform mobile rigor.')}
          </h2>
        </div>

        {/* 2-Column Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start text-start">
          {/* Left Column: Narrative & Focus (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="space-y-5 text-ink-muted text-base leading-relaxed font-sans">
              <p className="text-lg text-ink font-medium leading-relaxed">
                {t(
                  'about.p1',
                  'Based in Alexandria, Egypt, I am a mobile software engineer dedicated to building resilient client systems with Flutter & Dart. I focus on domain separation, deterministic state, and buttery 60 FPS rendering.'
                )}
              </p>
              <p>
                {t(
                  'about.p2',
                  'Over the past several years, I have architected and deployed high-demand commercial mobile applications across logistics, e-commerce, and FinTech—serving thousands of daily active users with stringent requirements for offline durability, sub-second socket telemetry, and smooth transitions.'
                )}
              </p>
              <p>
                {t(
                  'about.p3',
                  'I actively mentor aspiring engineers in the Flutter Committee at HackerRank Campus Club, leading sessions on Clean Architecture, BLoC state management, dependency injection, and test-driven mobile development.'
                )}
              </p>
              <p>
                {t(
                  'about.p4',
                  'My engineering approach is grounded in three principles: strict separation of business logic from UI rendering, bulletproof offline caching with SQLite, and relentless performance profiling.'
                )}
              </p>
            </div>

            {/* Specialization & Leadership Highlight Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-border-subtle">
              <div className="p-5 rounded-xl bg-surface border border-border-subtle btn-tactile">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-accent uppercase tracking-wider mb-2">
                  <Smartphone className="w-4 h-4" />
                  <span>Core Specialization</span>
                </div>
                <div className="text-base font-bold text-ink">Flutter &amp; Mobile Systems</div>
                <div className="text-xs text-ink-muted mt-1 font-mono">Clean Architecture · BLoC · SQLite</div>
                <div className="text-[11px] font-mono text-ink-faint mt-3 pt-2 border-t border-border-subtle/60">
                  Offline-first production architecture
                </div>
              </div>

              <div className="p-5 rounded-xl bg-surface border border-border-subtle btn-tactile">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-accent uppercase tracking-wider mb-2">
                  <Users className="w-4 h-4" />
                  <span>Community Mentorship</span>
                </div>
                <div className="text-base font-bold text-ink">HackerRank Campus Club</div>
                <div className="text-xs text-ink-muted mt-1 font-mono">Flutter Committee Mentor</div>
                <div className="text-[11px] font-mono text-ink-faint mt-3 pt-2 border-t border-border-subtle/60">
                  Architecture workshops &amp; code reviews
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Engineering Manifesto & Principles (5 cols) */}
          <div className="lg:col-span-5 spec-card p-6 md:p-8 rounded-2xl bg-surface border border-border-subtle shadow-card">
            <div className="font-mono text-xs uppercase tracking-wider text-accent font-semibold mb-6 flex items-center justify-between border-b border-border-subtle pb-3">
              <span className="flex items-center gap-2">
                <Terminal className="w-4 h-4" />
                <span>Engineering Standards</span>
              </span>
              <span className="text-[11px] font-mono text-ink-faint">Pillars</span>
            </div>

            <div className="space-y-6 text-sm text-ink-muted">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                <div>
                  <strong className="text-ink font-semibold block text-base mb-1">
                    {t('about.pillar1Title', 'Clean Architecture & Separation of Concerns')}
                  </strong>
                  <span className="leading-relaxed">
                    {t(
                      'about.pillar1Desc',
                      'Strict boundary isolation between presentation, domain, and data layers. UI widgets remain dumb consumers of immutable state streams.'
                    )}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                <div>
                  <strong className="text-ink font-semibold block text-base mb-1">
                    {t('about.pillar2Title', 'Real-time & Cross-platform Reliability')}
                  </strong>
                  <span className="leading-relaxed">
                    {t(
                      'about.pillar2Desc',
                      'Fault-tolerant WebSocket streams, background sync, and offline-first SQLite caching designed for hostile network conditions.'
                    )}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                <div>
                  <strong className="text-ink font-semibold block text-base mb-1">
                    {t('about.pillar3Title', 'Custom Rendering & Motion Physics')}
                  </strong>
                  <span className="leading-relaxed">
                    {t(
                      'about.pillar3Desc',
                      'Custom canvas shaders, spring physics curves, and platform channels bridging hardware sensors and telemetry.'
                    )}
                  </span>
                </div>
              </div>
            </div>

            {/* Performance Ledger Bar */}
            <div className="mt-8 pt-4 border-t border-border-subtle flex items-center justify-between text-xs font-mono text-ink-faint">
              <span>Profiling Benchmark</span>
              <span className="text-accent font-bold">60 FPS · &lt;80MB Heap</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
