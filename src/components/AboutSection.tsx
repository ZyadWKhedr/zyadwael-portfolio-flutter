import React from 'react';
import { Terminal, GraduationCap, Users, HeartHandshake, CheckCircle } from 'lucide-react';
import profileWebp from '@/assets/zyad-profile.webp';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20 md:py-28 border-b border-border-subtle bg-surface/30">
      <div className="container max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Human Story & Philosophy (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-widest text-accent">
              <span className="w-2 h-2 rounded-full bg-accent" />
              <span>Background &amp; Philosophy</span>
            </div>

            <h2 className="font-serif fluid-3xl font-bold tracking-tight text-ink">
              Bridging mobile craftsmanship with data science rigor.
            </h2>

            <div className="space-y-4 text-ink-muted text-sm md:text-base leading-relaxed font-sans">
              <p>
                I am a mobile software engineer and currently a third-year Data Science &amp; Artificial Intelligence 
                student. My primary technical focus is building cross-platform mobile applications with{' '}
                <strong className="text-ink font-semibold">Flutter &amp; Dart</strong> that achieve the fluidity, 
                responsiveness, and tactile finish of first-party native software.
              </p>
              <p>
                Because I study data science alongside mobile development, I approach application development with 
                a systems mindset: strict state separation through <strong className="text-ink font-semibold">Clean Architecture</strong>, 
                resilient offline-first data caching, and purposeful integration of on-device machine learning models 
                rather than decorative AI gimmicks.
              </p>
              <p>
                Beyond writing code, I actively lead and mentor technical communities. I serve as the{' '}
                <strong className="text-ink font-semibold">Head of the Flutter Committee</strong> at the HackerRank Campus Club (AUFS), 
                and as an Academic Committee Member at SAFWA (Faculty of Computers &amp; Data Science), helping peers master 
                state management, architectural boundaries, and mobile best practices.
              </p>
            </div>

            {/* Academic & Leadership Ledger */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-border-subtle">
              <div className="p-4 rounded-lg bg-surface border border-border-subtle">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-accent uppercase tracking-wider mb-1">
                  <GraduationCap className="w-4 h-4" />
                  <span>Education</span>
                </div>
                <div className="text-sm font-semibold text-ink">B.Sc. Data Science &amp; AI</div>
                <div className="text-xs text-ink-muted mt-0.5">AUFS / FCDS · [Expected: 2027]</div>
              </div>

              <div className="p-4 rounded-lg bg-surface border border-border-subtle">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-accent uppercase tracking-wider mb-1">
                  <Users className="w-4 h-4" />
                  <span>Leadership</span>
                </div>
                <div className="text-sm font-semibold text-ink">Head of Flutter Committee</div>
                <div className="text-xs text-ink-muted mt-0.5">HackerRank Campus Club (AUFS)</div>
              </div>
            </div>
          </div>

          {/* Right Column: Grounded Principles Spec Box (5 cols) */}
          <div className="lg:col-span-5 spec-card p-6 md:p-8 rounded-2xl bg-surface">
            <div className="font-mono text-xs uppercase tracking-wider text-accent font-semibold mb-3 flex items-center gap-2">
              <Terminal className="w-4 h-4" />
              <span>Engineering Manifesto</span>
            </div>

            <div className="space-y-4 text-xs md:text-sm text-ink-muted">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                <div>
                  <strong className="text-ink font-semibold block">Separation of Concerns</strong>
                  <span>UI code never talks to the database. Business rules stay isolated in pure Dart domain entities.</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                <div>
                  <strong className="text-ink font-semibold block">Offline-First by Default</strong>
                  <span>Mobile networks drop. Reliable local persistence and background queues make apps resilient everywhere.</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                <div>
                  <strong className="text-ink font-semibold block">Measurable Performance</strong>
                  <span>Zero unnecessary widget rebuilds, strictly profiled image caches, and 60fps render consistency.</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                <div>
                  <strong className="text-ink font-semibold block">Practical Intelligence</strong>
                  <span>AI features should solve friction points (smart search, classification, CV), not act as superficial chatbots.</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-border-subtle flex items-center justify-between text-xs font-mono text-ink-faint">
              <span>Codebase Integrity</span>
              <span>100% Typed Dart</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
