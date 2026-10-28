import React from 'react';
import { Terminal, Users, CheckCircle, Code2, Smartphone, Cpu } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const AboutSection: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section id="about" className="scroll-mt-24 py-20 md:py-28 border-b border-border-subtle bg-surface/30">
      <div className="container max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Engineering Story & Focus (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-6 text-start">
            <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-widest text-accent">
              <span className="w-2 h-2 rounded-full bg-accent" />
              <span>{t('about.badge', 'Background & Philosophy')}</span>
            </div>

            <h2 className="font-serif fluid-3xl font-bold tracking-tight text-ink">
              {t('about.title', 'Software craftsmanship with deep cross-platform mobile rigor.')}
            </h2>

            <div className="space-y-4 text-ink-muted text-sm md:text-base leading-relaxed font-sans">
              <p>
                {t('about.p1', 'Based in Alexandria, Egypt, I am a software engineer focused on mobile development. While Flutter is my primary framework for cross-platform delivery, my engineering spans the broader mobile spectrum—including native iOS (Swift), native Android (Kotlin), hardware sensor bridging, and platform-specific performance profiling.')}
              </p>
              <p>
                {t('about.p2', 'Over the past several years, I have architected and deployed high-demand commercial mobile applications across logistics, e-commerce, and FinTech—serving thousands of daily active users with stringent requirements for offline durability, sub-second socket telemetry, and smooth 60 FPS transitions.')}
              </p>
              <p>
                {t('about.p3', 'I lead the Flutter Committee at HackerRank Campus Club, where I mentor aspiring engineers on Clean Architecture, BLoC state management, dependency injection, and test-driven mobile development.')}
              </p>
              <p>
                {t('about.p4', 'My engineering approach is grounded in three principles: strict separation of business logic from UI rendering, bulletproof offline caching with SQLite, and relentless performance profiling.')}
              </p>
            </div>

            {/* Specialization & Leadership Ledger */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-border-subtle">
              <div className="p-4 rounded-lg bg-surface border border-border-subtle btn-tactile">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-accent uppercase tracking-wider mb-1">
                  <Smartphone className="w-4 h-4" />
                  <span>Core Specialization</span>
                </div>
                <div className="text-sm font-semibold text-ink">Mobile Software Engineering</div>
                <div className="text-xs text-ink-muted mt-0.5">Flutter · Native iOS (Swift) · Android (Kotlin)</div>
                <div className="text-[11px] font-mono text-ink-faint mt-2">
                  Production-grade offline-first architecture
                </div>
              </div>

              <div className="p-4 rounded-lg bg-surface border border-border-subtle btn-tactile">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-accent uppercase tracking-wider mb-1">
                  <Users className="w-4 h-4" />
                  <span>Community Leadership</span>
                </div>
                <div className="text-sm font-semibold text-ink">Head of Flutter Committee</div>
                <div className="text-xs text-ink-muted mt-0.5">HackerRank Campus Club</div>
                <div className="text-[11px] font-mono text-ink-faint mt-2">
                  Mentorship, Clean Architecture &amp; BLoC
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Engineering Manifesto & Principles (5 cols) */}
          <div className="lg:col-span-5 spec-card p-6 md:p-8 rounded-2xl bg-surface text-start">
            <div className="font-mono text-xs uppercase tracking-wider text-accent font-semibold mb-4 flex items-center justify-between border-b border-border-subtle pb-3">
              <span className="flex items-center gap-2">
                <Terminal className="w-4 h-4" />
                <span>Engineering Standards</span>
              </span>
              <span className="text-[11px] font-mono text-ink-faint">Architecture</span>
            </div>

            <div className="space-y-4 text-xs md:text-sm text-ink-muted">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                <div>
                  <strong className="text-ink font-semibold block">{t('about.pillar1Title', 'Clean Architecture & Separation of Concerns')}</strong>
                  <span>{t('about.pillar1Desc', 'Strict boundary isolation between presentation, domain, and data layers. UI widgets remain dumb consumers of immutable state streams.')}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                <div>
                  <strong className="text-ink font-semibold block">{t('about.pillar2Title', 'Real-time & Cross-platform Reliability')}</strong>
                  <span>{t('about.pillar2Desc', 'Fault-tolerant WebSocket streams, background sync, and offline-first SQLite caching designed for hostile network conditions.')}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                <div>
                  <strong className="text-ink font-semibold block">{t('about.pillar3Title', 'Hardware & Native Platform Depth')}</strong>
                  <span>{t('about.pillar3Desc', 'Bridging native platform channels in Swift and Kotlin for camera sensors, Bluetooth Low Energy (BLE), background geofencing, and NFC.')}</span>
                </div>
              </div>
            </div>

            {/* Performance Ledger Bar */}
            <div className="mt-6 pt-4 border-t border-border-subtle/80 flex items-center justify-between text-xs font-mono text-ink-faint">
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
