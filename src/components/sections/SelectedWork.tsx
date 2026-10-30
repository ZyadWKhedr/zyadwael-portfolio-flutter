import React, { useState, useEffect } from 'react';
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
  RotateCcw,
  X,
  BookOpen,
  Package,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { MOBILE_APPS } from '@/data/mobileShowcase';
import { SECONDARY_PROJECTS } from '@/data/projects';
import type { SecondaryProject } from '@/types/project';
import { InteractiveSmartphone } from '@/components/showcase/InteractiveSmartphone';

type TabKey = 'architecture' | 'decisions' | 'outcome';
type CategoryFilter = 'All' | 'Mobile' | 'Mobile Systems' | 'Data & Analytics' | 'Wearable & Games';

export const SelectedWork: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [selectedAppId, setSelectedAppId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<TabKey>('architecture');
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('All');
  const [modalProject, setModalProject] = useState<SecondaryProject | null>(null);

  const selectedApp = MOBILE_APPS.find((a) => a.id === selectedAppId) || null;

  const filteredSecondary = SECONDARY_PROJECTS.filter((p) => {
    if (selectedCategory === 'All') return true;
    return p.category === selectedCategory;
  });

  // Handle escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && modalProject) {
        setModalProject(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [modalProject]);

  return (
    <section
      id="work"
      className="scroll-mt-24 py-20 md:py-28 border-b border-border-subtle relative bg-surface/20"
    >
      <div className="container max-w-7xl xl:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
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
        {/* UNIFIED INTERACTIVE MOBILE SHOWCASE */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center pb-14">
          {/* Left Column: The Interactive Smartphone (5 cols) */}
          <div className="lg:col-span-5 flex justify-center order-1 lg:order-1">
            <InteractiveSmartphone
              apps={MOBILE_APPS}
              activeAppId={selectedAppId}
              onSelectApp={setSelectedAppId}
            />
          </div>

          {/* Right Column: Architectural Dossier & Deep Inspection (7 cols) */}
          <div className="lg:col-span-7 order-2 lg:order-2 text-start">
            <div className="spec-card p-6 md:p-8 rounded-2xl bg-surface border border-border-strong/60 shadow-xl transition-all">
              {!selectedApp ? (
                /* ------------------------------------------------------------- */
                /* VIEW 1: DEFAULT STATE (Device Overview & Direct App Directory) */
                /* ------------------------------------------------------------- */
                <div className="space-y-6">
                  <div className="flex items-center justify-between pb-4 border-b border-border-subtle">
                    <div className="flex items-center gap-2">
                      <Smartphone className="w-5 h-5 text-accent" />
                      <h3 className="font-serif text-xl font-bold text-ink">
                        {t('work.deviceConsoleTitle', 'Interactive Device Console')}
                      </h3>
                    </div>
                    <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-accent/10 text-accent font-semibold border border-accent/20">
                      Live Mockup Active
                    </span>
                  </div>

                  <p className="text-sm md:text-base text-ink-muted leading-relaxed font-sans">
                    {t(
                      'work.deviceConsoleDescription',
                      'Tap any app on the smartphone screen to launch its interactive simulation, or select an application from the architectural ledger below to inspect its domain layer, offline data contracts, and store credentials.'
                    )}
                  </p>

                  {/* App Quick Launcher Pills */}
                  <div className="space-y-2.5 pt-2">
                    <span className="text-xs font-mono font-semibold uppercase tracking-wider text-ink-muted block">
                      Installed Applications
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {MOBILE_APPS.filter((a) => !a.isSystem).map((app) => (
                        <button
                          key={app.id}
                          type="button"
                          onClick={() => setSelectedAppId(app.id)}
                          className="touch-target flex items-center justify-between p-3 rounded-xl bg-canvas border border-border-subtle hover:border-accent hover:bg-elevated transition-all group text-start"
                        >
                          <div className="flex items-center gap-3 truncate">
                            <div className="w-8 h-8 rounded-lg bg-zinc-800 p-0.5 border border-white/10 shrink-0 overflow-hidden">
                              {app.icon ? (
                                <img
                                  src={app.icon}
                                  alt={app.title}
                                  className="w-full h-full object-cover rounded-md"
                                />
                              ) : (
                                <div className="w-full h-full bg-accent/20 rounded-md" />
                              )}
                            </div>
                            <div className="truncate">
                              <span className="font-serif text-sm font-bold text-ink block group-hover:text-accent transition-colors truncate">
                                {app.title}
                              </span>
                              <span className="text-[10px] font-mono text-ink-muted block truncate">
                                {app.category}
                              </span>
                            </div>
                          </div>
                          <ChevronRight className="w-4 h-4 text-ink-faint group-hover:text-accent group-hover:translate-x-0.5 transition-all shrink-0" />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Engineering Standards Highlights */}
                  <div className="p-4 rounded-xl bg-canvas/60 border border-border-subtle/80 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
                    <div className="p-2">
                      <span className="text-accent font-bold block text-sm">6+ Shipped</span>
                      <span className="text-ink-muted">Production Apps</span>
                    </div>
                    <div className="p-2 border-t sm:border-t-0 sm:border-s border-border-subtle">
                      <span className="text-accent font-bold block text-sm">99.8% Uptime</span>
                      <span className="text-ink-muted">Crash-Free Rate</span>
                    </div>
                    <div className="p-2 border-t sm:border-t-0 sm:border-s border-border-subtle">
                      <span className="text-accent font-bold block text-sm">4+ Articles</span>
                      <span className="text-ink-muted">Technical Publications</span>
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
                      {activeTab === 'architecture' && <p>{selectedApp.architecture}</p>}
                      {activeTab === 'decisions' && (
                        <ul className="space-y-1.5">
                          {selectedApp.decisions.map((dec, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="font-mono text-accent text-xs font-bold mt-0.5">
                                [0{i + 1}]
                              </span>
                              <span>{dec}</span>
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
                                className="px-2.5 py-1 rounded bg-elevated border border-border-subtle text-ink font-mono text-xs font-semibold"
                              >
                                {m}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Tech Stack Chips & Store Action Footer */}
                  <div className="pt-4 border-t border-border-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex flex-wrap gap-1.5">
                      {selectedApp.stack.map((st) => (
                        <span
                          key={st}
                          className="px-2 py-0.5 text-[11px] font-mono rounded bg-elevated text-ink-muted border border-border-subtle"
                        >
                          {st}
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
        {/* OPEN-SOURCE & DEVELOPER TOOLS (Minimal, Clean, Built by Zyad) */}
        {/* ========================================================================= */}
        <div className="pt-12 pb-14 text-start border-t border-border-subtle/80">
          <div className="max-w-3xl mb-8">
            <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-widest text-accent mb-2">
              <Package className="w-3.5 h-3.5" />
              <span>{t('work.openSourceBadge', 'Open Source & Developer Tools')}</span>
            </div>
            <h3 className="font-serif fluid-2xl font-bold tracking-tight text-ink">
              {t('work.openSourceHeading', 'Packages & tools built by Zyad.')}
            </h3>
            <p className="text-sm md:text-base text-ink-muted leading-relaxed font-sans mt-2">
              {t(
                'work.openSourceSubheading',
                'Production libraries and command-line utilities I authored and open-sourced for the developer community.'
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Liquid Navbar Card */}
            <div className="spec-card p-6 md:p-7 rounded-2xl bg-surface border border-border-subtle hover:border-border-strong hover:shadow-card transition-all flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between gap-3 mb-3">
                  <span className="px-2.5 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent font-mono text-xs font-semibold">
                    Flutter / Dart Package
                  </span>
                  <a
                    href="https://pub.dev/packages/liquid_navbar"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono text-emerald-400 font-semibold bg-emerald-500/10 px-2.5 py-0.5 rounded border border-emerald-500/20 hover:bg-emerald-500/20 transition-colors"
                  >
                    pub.dev · 130/140 pts ↗
                  </a>
                </div>

                <h4 className="font-serif text-xl font-bold text-ink group-hover:text-accent transition-colors mb-1">
                  Liquid Navbar
                </h4>
                <div className="text-xs font-mono text-ink-faint mb-3">
                  Built &amp; maintained by Zyad Wael
                </div>

                <p className="text-sm text-ink-muted leading-relaxed font-sans mb-5">
                  A fluid, physics-based navigation bar package for Flutter featuring custom bezier spring curves, 60fps CustomPainter rendering, and zero external dependencies. Published on pub.dev.
                </p>

                <div className="flex flex-wrap gap-1.5 mb-6">
                  {['Flutter', 'Dart', 'CustomPainter', 'Vector Math', 'pub.dev'].map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 text-xs font-mono rounded bg-elevated text-ink-muted border border-border-subtle"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-border-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <code className="text-xs font-mono text-ink-muted bg-canvas px-2.5 py-1 rounded border border-border-subtle select-all">
                  flutter pub add liquid_navbar
                </code>
                <div className="flex items-center gap-2">
                  <a
                    href="https://pub.dev/packages/liquid_navbar"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="touch-target inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface border border-border-strong hover:bg-elevated text-ink hover:text-accent text-xs font-mono font-medium transition-colors"
                    aria-label="View Liquid Navbar on pub.dev"
                  >
                    <span>pub.dev</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href="https://github.com/ZyadWKhedr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="touch-target inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface border border-border-strong hover:bg-elevated text-ink hover:text-accent text-xs font-mono font-medium transition-colors"
                    aria-label="View Liquid Navbar source on GitHub"
                  >
                    <Code2 className="w-3.5 h-3.5" />
                    <span>GitHub</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Boa CLI Card */}
            <div className="spec-card p-6 md:p-7 rounded-2xl bg-surface border border-border-subtle hover:border-border-strong hover:shadow-card transition-all flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between gap-3 mb-3">
                  <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-xs font-semibold">
                    CLI &amp; Systems Tool
                  </span>
                  <span className="text-xs font-mono text-ink-muted bg-surface-subtle px-2.5 py-0.5 rounded border border-border-subtle">
                    Go 1.21+
                  </span>
                </div>

                <h4 className="font-serif text-xl font-bold text-ink group-hover:text-accent transition-colors mb-1">
                  Boa CLI
                </h4>
                <div className="text-xs font-mono text-ink-faint mb-3">
                  Built &amp; maintained by Zyad Wael
                </div>

                <p className="text-sm text-ink-muted leading-relaxed font-sans mb-5">
                  A fast, concurrent archive explorer and compression CLI engine written in Go. Supports multi-threaded streaming compression, in-memory archive inspection without extraction, and Zip-Slip exploit protection.
                </p>

                <div className="flex flex-wrap gap-1.5 mb-6">
                  {['Go (Golang)', 'CLI Tooling', 'Streaming Compression', 'Security', 'TUI'].map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 text-xs font-mono rounded bg-elevated text-ink-muted border border-border-subtle"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-border-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <code className="text-xs font-mono text-ink-muted bg-canvas px-2.5 py-1 rounded border border-border-subtle select-all">
                  go install github.com/zyadkhidr/boa@latest
                </code>
                <div className="flex items-center gap-2">
                  <a
                    href="https://github.com/ZyadWKhedr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="touch-target inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface border border-border-strong hover:bg-elevated text-ink hover:text-accent text-xs font-mono font-medium transition-colors"
                    aria-label="View Boa CLI on GitHub"
                  >
                    <Code2 className="w-3.5 h-3.5" />
                    <span>GitHub</span>
                    <ExternalLink className="w-3 h-3 text-ink-faint" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* SECONDARY PROJECTS: MORE PROJECTS & TECHNICAL SYSTEMS */}
        {/* ========================================================================= */}
        <div className="pt-8 text-start border-t border-border-subtle/80">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-border-subtle">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-widest text-ink-muted mb-2">
                <Layers className="w-3.5 h-3.5 text-accent" />
                <span>{t('work.moreProjectsBadge', 'Additional Work')}</span>
              </div>
              <h3 className="font-serif fluid-2xl font-bold tracking-tight text-ink">
                {t('work.moreProjectsHeading', 'More projects & mobile client systems.')}
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
                className="spec-card p-6 rounded-2xl bg-surface border border-border-subtle flex flex-col justify-between hover:shadow-card hover:border-border-strong transition-all group"
              >
                <div>
                  {/* Project Screenshot / Visual Thumbnail */}
                  {proj.image && (
                    <div className="aspect-[16/10] rounded-xl overflow-hidden border border-border-subtle bg-zinc-950 mb-4 group-hover:border-border-strong transition-colors relative">
                      <img
                        src={proj.image}
                        alt={proj.title}
                        className="w-full h-full object-cover object-top filter contrast-[1.02] group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                    </div>
                  )}

                  <div className="flex items-start justify-between gap-3 mb-2">
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
                    {/* Store & GitHub Action Buttons */}
                    <div className="flex items-center gap-1.5">
                      {proj.links.playStore && (
                        <a
                          href={proj.links.playStore}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="touch-target p-1.5 rounded hover:bg-elevated text-ink hover:text-accent transition-colors"
                          title="Google Play Store"
                          aria-label={`Open ${proj.title} on Google Play`}
                        >
                          <Play className="w-3.5 h-3.5" />
                        </a>
                      )}
                      {proj.links.appStore && (
                        <a
                          href={proj.links.appStore}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="touch-target p-1.5 rounded hover:bg-elevated text-ink hover:text-accent transition-colors"
                          title="Apple App Store"
                          aria-label={`Open ${proj.title} on App Store`}
                        >
                          <Apple className="w-3.5 h-3.5" />
                        </a>
                      )}
                      {proj.links.github && (
                        <a
                          href={proj.links.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="touch-target p-1.5 rounded hover:bg-elevated text-ink hover:text-accent transition-colors"
                          title="View Source on GitHub"
                          aria-label={`View ${proj.title} source on GitHub`}
                        >
                          <Code2 className="w-3.5 h-3.5" />
                        </a>
                      )}
                      {proj.links.article && (
                        <a
                          href={proj.links.article}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="touch-target p-1.5 rounded hover:bg-elevated text-ink hover:text-accent transition-colors"
                          title="Read Technical Article"
                          aria-label={`Read article about ${proj.title}`}
                        >
                          <BookOpen className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>

                    {/* In-Depth Details Modal Launcher */}
                    <button
                      type="button"
                      onClick={() => setModalProject(proj)}
                      className="touch-target inline-flex items-center gap-1 text-accent hover:underline font-semibold text-xs font-mono"
                      aria-label={`Inspect ${proj.title} details`}
                    >
                      <span>Details</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* LOCALIZED PROJECT DOSSIER MODAL */}
      {/* ========================================================================= */}
      {modalProject && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-fade-in"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-project-title"
          onClick={() => setModalProject(null)}
        >
          <div
            className="w-full max-w-2xl bg-canvas border border-border-strong rounded-2xl p-6 md:p-8 shadow-2xl relative space-y-6 text-start my-8 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-border-subtle">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2 py-0.5 rounded bg-accent/10 border border-accent/20 text-accent font-mono text-xs font-semibold">
                    {modalProject.category}
                  </span>
                  {modalProject.arabicTitle && (
                    <span className="font-serif text-xs text-ink-muted px-2 py-0.5 rounded bg-surface border border-border-subtle">
                      {modalProject.arabicTitle}
                    </span>
                  )}
                </div>
                <h3 id="modal-project-title" className="font-serif text-2xl font-bold text-ink">
                  {modalProject.title}
                </h3>
                <p className="text-xs font-mono text-ink-muted mt-0.5">
                  {modalProject.tagline}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setModalProject(null)}
                className="touch-target p-2 rounded-lg bg-surface border border-border-subtle text-ink hover:text-accent hover:bg-elevated transition-colors"
                aria-label="Close project details"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* High-res Image Preview if available */}
            {modalProject.image && (
              <div className="aspect-[16/9] rounded-xl overflow-hidden border border-border-subtle bg-zinc-950 shadow-inner">
                <img
                  src={modalProject.image}
                  alt={modalProject.title}
                  className="w-full h-full object-cover object-top filter contrast-[1.02]"
                />
              </div>
            )}

            {/* Problem & Role */}
            <div className="p-4 rounded-xl bg-surface/70 border border-border-subtle space-y-2 text-xs font-mono">
              <div>
                <span className="text-ink font-bold">Engineering Role:</span>{' '}
                <span className="text-ink-muted">{modalProject.role}</span>
              </div>
              <div>
                <span className="text-ink font-bold">Verification:</span>{' '}
                <span className="text-emerald-400 font-semibold">{modalProject.evidence}</span>
              </div>
            </div>

            {/* In-Depth Description */}
            <div className="space-y-2">
              <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-ink-muted">
                System Overview
              </h4>
              <p className="text-sm text-ink-muted leading-relaxed font-sans">
                {modalProject.detailedDescription || modalProject.problem}
              </p>
            </div>

            {/* Features Checklist */}
            {modalProject.features && modalProject.features.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-ink-muted">
                  Key Capabilities
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono text-ink-muted">
                  {modalProject.features.map((feat) => (
                    <div key={feat} className="flex items-center gap-2 p-2 rounded-lg bg-surface border border-border-subtle">
                      <CheckCircle2 className="w-3.5 h-3.5 text-accent shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tech Stack Chips */}
            <div className="space-y-2">
              <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-ink-muted">
                Technology Stack
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {modalProject.stack.map((st) => (
                  <span
                    key={st}
                    className="px-2 py-0.5 text-xs font-mono rounded bg-elevated text-ink border border-border-subtle"
                  >
                    {st}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Footer */}
            <div className="pt-4 border-t border-border-subtle flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                {modalProject.links.playStore && (
                  <a
                    href={modalProject.links.playStore}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-tactile touch-target inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-surface border border-border-strong text-ink hover:text-accent font-mono text-xs font-semibold transition-colors"
                  >
                    <Play className="w-3.5 h-3.5" />
                    <span>Google Play</span>
                  </a>
                )}
                {modalProject.links.appStore && (
                  <a
                    href={modalProject.links.appStore}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-tactile touch-target inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-surface border border-border-strong text-ink hover:text-accent font-mono text-xs font-semibold transition-colors"
                  >
                    <Apple className="w-3.5 h-3.5" />
                    <span>App Store</span>
                  </a>
                )}
                {modalProject.links.github && (
                  <a
                    href={modalProject.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-tactile touch-target inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-surface border border-border-strong text-ink hover:text-accent font-mono text-xs font-semibold transition-colors"
                  >
                    <Code2 className="w-3.5 h-3.5" />
                    <span>GitHub Repository</span>
                  </a>
                )}
                {modalProject.links.article && (
                  <a
                    href={modalProject.links.article}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-tactile touch-target inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-surface border border-border-strong text-ink hover:text-accent font-mono text-xs font-semibold transition-colors"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Read Article</span>
                  </a>
                )}
              </div>

              <button
                type="button"
                onClick={() => setModalProject(null)}
                className="btn-tactile touch-target px-4 py-2 rounded-lg bg-ink text-canvas font-mono text-xs font-semibold hover:bg-accent transition-colors ms-auto"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default SelectedWork;
