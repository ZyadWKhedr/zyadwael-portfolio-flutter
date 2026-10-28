import React, { useState } from 'react';
import {
  ExternalLink,
  Apple,
  Play,
  Code2,
  Layers,
  CheckCircle2,
  ChevronRight,
  Smartphone,
  Filter,
  ArrowRight,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { MOBILE_APPS } from '@/data/mobileShowcase';
import { SECONDARY_PROJECTS } from '@/data/projects';
import { InteractiveSmartphone } from '@/components/showcase/InteractiveSmartphone';

type TabKey = 'architecture' | 'decisions' | 'outcome';
type CategoryFilter = 'All' | 'Mobile' | 'Mobile Systems' | 'Data & Analytics' | 'Wearable & Games';

export const SelectedWork: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [selectedAppId, setSelectedAppId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<TabKey>('architecture');
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('All');

  const selectedApp = MOBILE_APPS.find((a) => a.id === selectedAppId) || null;

  const filteredSecondary = SECONDARY_PROJECTS.filter((p) => {
    if (selectedCategory === 'All') return true;
    return p.category === selectedCategory;
  });

  const isRtl = i18n.language === 'ar';

  return (
    <section
      id="work"
      className="scroll-mt-24 py-20 md:py-32 border-b border-border-subtle relative bg-surface/20"
    >
      <div className="container max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 md:mb-16 text-start">
          <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-widest text-accent mb-3">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span>{t('work.badge', 'Inside My Mobile World')}</span>
          </div>
          <h2 className="font-serif fluid-3xl font-bold tracking-tight text-ink mb-4">
            {t('work.title', 'Shipped mobile applications in one interactive device.')}
          </h2>
          <p className="text-ink-muted text-base md:text-lg leading-relaxed font-sans">
            {t(
              'work.subtitle',
              'Explore commercial Flutter applications, real-time dispatch systems, and reactive mobile flows inside one interactive smartphone. Tap any app icon or select a project below to inspect its architecture.'
            )}
          </p>
        </div>

        {/* ========================================================================= */}
        {/* MAIN CENTERPIECE: ONE INTERACTIVE SMARTPHONE + COMPANION INSPECTOR */}
        {/* ========================================================================= */}
        <div className="spec-card rounded-3xl bg-surface border border-border-subtle p-6 md:p-10 shadow-card hover:border-border-strong transition-all duration-300 mb-20 md:mb-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Column A: The Single Realistic Smartphone Mockup (5 cols on lg) */}
            <div className="lg:col-span-5 flex justify-center w-full">
              <InteractiveSmartphone
                apps={MOBILE_APPS}
                activeAppId={selectedAppId}
                onSelectApp={setSelectedAppId}
              />
            </div>

            {/* Column B: Companion Architectural Dossier (7 cols on lg) */}
            <div className="lg:col-span-7 flex flex-col gap-6 text-start w-full">
              {selectedApp === null ? (
                /* ------------------------------------------------------------- */
                /* VIEW 1: HOME STATE COMPANION (Quick Launcher & Benchmarks) */
                /* ------------------------------------------------------------- */
                <div className="space-y-6 animate-fade-in">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-mono text-xs text-accent font-semibold uppercase tracking-wider">
                        {t('work.deviceOverview', 'Interactive Mobile Experience')}
                      </span>
                    </div>
                    <h3 className="font-serif text-2xl md:text-3xl font-bold text-ink">
                      {t('work.allApplications', 'Commercial & Open Source Portfolio')}
                    </h3>
                    <p className="text-sm text-ink-muted leading-relaxed font-sans mt-2">
                      {t(
                        'work.deviceOverviewDesc',
                        'Tap any app icon directly on the smartphone screen to inspect its curated interface screens, telemetry flows, and store releases. You can also select a project from the directory below.'
                      )}
                    </p>
                  </div>

                  {/* Quick-Launch Application Ledger */}
                  <div className="space-y-2.5">
                    <span className="text-xs font-mono uppercase tracking-wider text-ink-faint block">
                      Featured Production Applications:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {MOBILE_APPS.filter((a) => !a.isSystem).map((app) => (
                        <button
                          key={app.id}
                          type="button"
                          onClick={() => setSelectedAppId(app.id)}
                          className="touch-target group p-3 rounded-xl bg-canvas/70 border border-border-subtle hover:border-accent hover:bg-elevated transition-all flex items-center justify-between text-start focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                          aria-label={`Inspect ${app.title} in phone simulator`}
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="w-9 h-9 rounded-lg bg-surface border border-border-subtle overflow-hidden shrink-0 p-0.5">
                              {app.icon ? (
                                <img
                                  src={app.icon}
                                  alt={app.title}
                                  className="w-full h-full object-cover rounded-md"
                                />
                              ) : (
                                <div className="w-full h-full bg-accent/20 rounded-md flex items-center justify-center text-accent">
                                  <Sparkles className="w-4 h-4" />
                                </div>
                              )}
                            </div>
                            <div className="truncate">
                              <div className="flex items-center gap-1.5">
                                <span className="font-serif font-bold text-ink text-sm group-hover:text-accent transition-colors truncate">
                                  {app.title}
                                </span>
                                {app.arabicTitle && (
                                  <span className="text-[10px] font-serif text-ink-muted hidden sm:inline">
                                    {app.arabicTitle}
                                  </span>
                                )}
                              </div>
                              <span className="text-[11px] font-mono text-ink-muted truncate block">
                                {app.category}
                              </span>
                            </div>
                          </div>

                          <div className="w-7 h-7 rounded-lg bg-surface border border-border-subtle group-hover:border-accent group-hover:bg-accent group-hover:text-white flex items-center justify-center text-ink-muted shrink-0 ms-2 transition-all">
                            <ChevronRight className="w-3.5 h-3.5" />
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Engineering Standards Highlights */}
                  <div className="p-4 rounded-xl bg-canvas/60 border border-border-subtle/80 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
                    <div className="p-2">
                      <span className="text-accent font-bold block text-sm">20+ Shipped</span>
                      <span className="text-ink-muted">iOS & Android Apps</span>
                    </div>
                    <div className="p-2 border-t sm:border-t-0 sm:border-s border-border-subtle">
                      <span className="text-accent font-bold block text-sm">99.8% Uptime</span>
                      <span className="text-ink-muted">Crash-Free Rate</span>
                    </div>
                    <div className="p-2 border-t sm:border-t-0 sm:border-s border-border-subtle">
                      <span className="text-accent font-bold block text-sm">400+ Downloads</span>
                      <span className="text-ink-muted">pub.dev Open Source</span>
                    </div>
                  </div>
                </div>
              ) : (
                /* ------------------------------------------------------------- */
                /* VIEW 2: ACTIVE APP ARCHITECTURAL INSPECTOR */
                /* ------------------------------------------------------------- */
                <div className="space-y-6 animate-fade-in">
                  {/* Active App Header & Back Action */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border-subtle">
                    <div className="flex items-start gap-3.5 min-w-0">
                      <div className="w-12 h-12 rounded-xl bg-elevated border border-border-strong/40 shrink-0 p-1 shadow-subtle overflow-hidden">
                        {selectedApp.icon ? (
                          <img
                            src={selectedApp.icon}
                            alt={`${selectedApp.title} icon`}
                            className="w-full h-full object-cover rounded-lg"
                          />
                        ) : (
                          <div className="w-full h-full rounded-lg bg-accent/20 flex items-center justify-center text-accent">
                            <Smartphone className="w-5 h-5" />
                          </div>
                        )}
                      </div>
                      <div className="truncate">
                        <div className="flex items-center gap-2">
                          <h3 className="font-serif text-2xl font-bold text-ink truncate">
                            {selectedApp.title}
                          </h3>
                          {selectedApp.arabicTitle && (
                            <span className="font-serif text-xs px-2 py-0.5 rounded bg-surface-subtle text-ink-muted border border-border-subtle shrink-0">
                              {selectedApp.arabicTitle}
                            </span>
                          )}
                        </div>
                        <p className="text-xs font-mono text-accent font-medium mt-0.5">
                          {selectedApp.category} · {selectedApp.badge}
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setSelectedAppId(null)}
                      className="btn-tactile touch-target inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-medium rounded-md border border-border-strong bg-surface hover:bg-elevated text-ink hover:text-accent transition-colors self-start sm:self-auto shrink-0"
                      aria-label="Return to phone home screen"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>{t('work.backHome', 'Device Home')}</span>
                    </button>
                  </div>

                  {/* Role & Problem Context */}
                  <div className="p-4 rounded-xl bg-canvas/60 border border-border-subtle/80 space-y-2">
                    <div className="text-xs font-mono text-ink-faint">
                      <span className="font-semibold text-ink">{t('work.roleLabel', 'Engineering Role')}:</span>{' '}
                      {selectedApp.role}
                    </div>
                    <div className="text-xs md:text-sm text-ink-muted font-sans leading-relaxed">
                      <span className="font-semibold text-ink font-mono text-xs block mb-1">
                        {t('work.problemLabel', 'Core Problem')}:
                      </span>
                      {selectedApp.description}
                    </div>
                  </div>

                  {/* 3 Engineering Dossier Tabs */}
                  <div>
                    <div className="flex items-center gap-2 border-b border-border-subtle pb-2">
                      <button
                        type="button"
                        onClick={() => setActiveTab('architecture')}
                        className={`touch-target text-xs font-mono px-3 py-1.5 rounded-md transition-colors ${
                          activeTab === 'architecture'
                            ? 'bg-ink text-canvas font-semibold shadow-sm'
                            : 'text-ink-muted hover:text-ink hover:bg-surface-subtle'
                        }`}
                      >
                        {t('work.tabArchitecture', 'System Architecture')}
                      </button>
                      <button
                        type="button"
                        onClick={() => setActiveTab('decisions')}
                        className={`touch-target text-xs font-mono px-3 py-1.5 rounded-md transition-colors ${
                          activeTab === 'decisions'
                            ? 'bg-ink text-canvas font-semibold shadow-sm'
                            : 'text-ink-muted hover:text-ink hover:bg-surface-subtle'
                        }`}
                      >
                        {t('work.tabDecisions', 'Decisions & Trade-offs')}
                      </button>
                      <button
                        type="button"
                        onClick={() => setActiveTab('outcome')}
                        className={`touch-target text-xs font-mono px-3 py-1.5 rounded-md transition-colors ${
                          activeTab === 'outcome'
                            ? 'bg-ink text-canvas font-semibold shadow-sm'
                            : 'text-ink-muted hover:text-ink hover:bg-surface-subtle'
                        }`}
                      >
                        {t('work.tabOutcome', 'Production Impact')}
                      </button>
                    </div>

                    <div className="pt-3 min-h-[96px] text-xs md:text-sm text-ink-muted leading-relaxed font-sans">
                      {activeTab === 'architecture' && (
                        <p>{selectedApp.architecture}</p>
                      )}
                      {activeTab === 'decisions' && (
                        <ul className="space-y-1.5">
                          {selectedApp.decisions.map((decision, dIdx) => (
                            <li key={dIdx} className="flex items-start gap-2">
                              <CheckCircle2 className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" />
                              <span>{decision}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                      {activeTab === 'outcome' && (
                        <div className="space-y-3">
                          <p>{selectedApp.tagline}</p>
                          <div className="flex flex-wrap gap-2 pt-1">
                            {selectedApp.metrics.map((m) => (
                              <span
                                key={m}
                                className="px-2.5 py-1 text-xs font-mono rounded bg-accent/10 text-accent font-semibold border border-accent/20"
                              >
                                {m}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Tech Stack Pills & Official Store Actions */}
                  <div className="pt-4 border-t border-border-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex flex-wrap items-center gap-1.5">
                      {selectedApp.stack.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 text-[11px] font-mono rounded bg-elevated text-ink-muted border border-border-subtle"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex flex-wrap items-center gap-2 shrink-0">
                      {selectedApp.links.appStore && (
                        <a
                          href={selectedApp.links.appStore}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-tactile touch-target inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-medium rounded-md border border-border-strong bg-surface hover:bg-elevated text-ink hover:text-accent transition-colors"
                          aria-label={`Open ${selectedApp.title} on Apple App Store`}
                        >
                          <Apple className="w-3.5 h-3.5" aria-hidden="true" />
                          <span>App Store</span>
                        </a>
                      )}

                      {selectedApp.links.playStore && (
                        <a
                          href={selectedApp.links.playStore}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-tactile touch-target inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-medium rounded-md border border-border-strong bg-surface hover:bg-elevated text-ink hover:text-accent transition-colors"
                          aria-label={`Open ${selectedApp.title} on Google Play Store`}
                        >
                          <Play className="w-3.5 h-3.5" aria-hidden="true" />
                          <span>Google Play</span>
                        </a>
                      )}

                      {selectedApp.links.github && (
                        <a
                          href={selectedApp.links.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-tactile touch-target inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-medium rounded-md border border-border-strong bg-surface hover:bg-elevated text-ink hover:text-accent transition-colors"
                          aria-label={`View ${selectedApp.title} source code on GitHub`}
                        >
                          <Code2 className="w-3.5 h-3.5" aria-hidden="true" />
                          <span>Source</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* SECONDARY PROJECTS: TECHNICAL LEDGER */}
        {/* ========================================================================= */}
        <div className="pt-8 text-start">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-border-subtle">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-widest text-ink-muted mb-2">
                <Layers className="w-3.5 h-3.5 text-accent" />
                <span>{t('work.categoryOpenSource', 'Extended Technical Ledger')}</span>
              </div>
              <h3 className="font-serif fluid-2xl font-bold tracking-tight text-ink">
                Specialized mobile client systems & experiments.
              </h3>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono text-ink-faint flex items-center gap-1 me-1">
                <Filter className="w-3 h-3" />
                <span>Filter:</span>
              </span>
              {(['All', 'Mobile', 'Mobile Systems', 'Data & Analytics', 'Wearable & Games'] as CategoryFilter[]).map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`touch-target px-3 py-1 text-xs font-mono rounded-md border transition-all ${
                    selectedCategory === cat
                      ? 'border-accent bg-accent/10 text-accent font-semibold shadow-sm'
                      : 'border-border-subtle bg-surface text-ink-muted hover:border-border-strong hover:text-ink'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Ledger Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-8">
            {filteredSecondary.map((proj) => (
              <div
                key={proj.id}
                className="spec-card p-6 rounded-xl bg-surface border border-border-subtle flex flex-col justify-between hover:shadow-card hover:border-border-strong transition-all group"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <span className="px-2 py-0.5 rounded bg-elevated border border-border-subtle text-[11px] font-mono text-accent">
                      {proj.category}
                    </span>
                    {proj.arabicTitle && (
                      <span className="text-[11px] font-serif text-ink-muted">
                        {proj.arabicTitle}
                      </span>
                    )}
                  </div>

                  <h4 className="font-serif text-lg font-bold text-ink group-hover:text-accent transition-colors mb-1">
                    {proj.title}
                  </h4>
                  <p className="text-xs font-mono text-ink-muted mb-3">{proj.tagline}</p>
                  <p className="text-sm text-ink-muted leading-relaxed font-sans mb-4">{proj.problem}</p>
                </div>

                <div className="pt-4 border-t border-border-subtle space-y-3">
                  <div className="flex flex-wrap gap-1">
                    {proj.stack.map((st) => (
                      <span
                        key={st}
                        className="px-1.5 py-0.5 text-[10px] font-mono rounded bg-elevated text-ink-muted border border-border-subtle"
                      >
                        {st}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-xs font-mono pt-1">
                    <span className="text-[11px] text-ink-faint truncate max-w-[180px]">
                      {proj.role}
                    </span>

                    {proj.links.live && (
                      <a
                        href={proj.links.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="touch-target inline-flex items-center gap-1 text-accent hover:underline font-semibold"
                        aria-label={`View ${proj.title} portfolio link`}
                      >
                        <span>Details</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
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

export default SelectedWork;
