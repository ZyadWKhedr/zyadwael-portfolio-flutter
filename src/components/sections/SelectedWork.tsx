import React, { useState } from 'react';
import { ExternalLink, Apple, Play, Code2, Layers, CheckCircle2, ChevronRight, Filter, Sparkles, ShieldCheck } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { FEATURED_PROJECTS, SECONDARY_PROJECTS } from '@/data/projects';

type TabKey = 'architecture' | 'decisions' | 'outcome';
type CategoryFilter = 'All' | 'Mobile' | 'Mobile Systems' | 'Data & Analytics' | 'Wearable & Games';

export const SelectedWork: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [activeTab, setActiveTab] = useState<Record<string, TabKey>>({
    amoomy: 'architecture',
    wofoodi: 'architecture',
    raval: 'architecture',
    payss: 'architecture',
    'liquid-navbar': 'architecture',
  });

  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('All');

  const setTab = (projectId: string, tab: TabKey) => {
    setActiveTab((prev) => ({ ...prev, [projectId]: tab }));
  };

  const filteredSecondary = SECONDARY_PROJECTS.filter((p) => {
    if (selectedCategory === 'All') return true;
    return p.category === selectedCategory;
  });

  const isRtl = i18n.language === 'ar';

  return (
    <section id="work" className="scroll-mt-24 py-20 md:py-28 border-b border-border-subtle blueprint-grid relative">
      <div className="container max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 text-start">
          <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-widest text-accent mb-3">
            <span className="w-2 h-2 rounded-full bg-accent" />
            <span>{t('work.badge', 'Commercial Work & Open Source')}</span>
          </div>
          <h2 className="font-serif fluid-3xl font-bold tracking-tight text-ink mb-4">
            {t('work.title', 'Shipped mobile applications and system architectures.')}
          </h2>
          <p className="text-ink-muted text-base md:text-lg leading-relaxed">
            {t('work.subtitle', 'Real applications on the Apple App Store, Google Play Store, and pub.dev. Focused on clean domain architecture, offline resilience, and measurable production impact.')}
          </p>
        </div>

        {/* Featured Projects Stack */}
        <div className="space-y-16">
          {FEATURED_PROJECTS.map((project, idx) => {
            const currentTab = activeTab[project.id] || 'architecture';

            return (
              <article
                key={project.id}
                className="spec-card rounded-2xl bg-surface border border-border-subtle p-6 md:p-10 shadow-card transition-all duration-300 hover:border-border-strong text-start"
              >
                {/* Project Header Row */}
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-8 border-b border-border-subtle">
                  <div className="flex items-start gap-4">
                    {/* App Icon */}
                    <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl overflow-hidden bg-elevated border border-border-strong/40 shrink-0 p-1 shadow-subtle">
                      <img
                        src={project.icon}
                        alt={`${project.title} icon`}
                        className="w-full h-full object-cover rounded-xl"
                        loading="lazy"
                      />
                    </div>

                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="font-mono text-xs text-accent font-semibold uppercase tracking-wider">
                          0{idx + 1} · {project.category}
                        </span>
                        {project.arabicTitle && (
                          <span className="font-serif text-xs px-2 py-0.5 rounded bg-surface-subtle text-ink-muted border border-border-subtle">
                            {project.arabicTitle}
                          </span>
                        )}
                      </div>
                      <h3 className="font-serif text-2xl md:text-3xl font-bold text-ink">
                        {project.title}
                      </h3>
                      <p className="text-sm md:text-base text-ink-muted mt-1 max-w-2xl">
                        {project.tagline}
                      </p>
                    </div>
                  </div>

                  {/* External Store & Repo Actions */}
                  <div className="flex flex-wrap items-center gap-2 shrink-0">
                    {project.links.appStore && (
                      <a
                        href={project.links.appStore}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-tactile touch-target inline-flex items-center gap-2 px-3.5 py-2 text-xs font-mono font-medium rounded-md border border-border-strong bg-surface hover:bg-elevated text-ink hover:text-accent transition-colors"
                        aria-label={`Open ${project.title} on Apple App Store`}
                      >
                        <Apple className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>{t('work.viewAppStore', 'App Store')}</span>
                      </a>
                    )}

                    {project.links.playStore && (
                      <a
                        href={project.links.playStore}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-tactile touch-target inline-flex items-center gap-2 px-3.5 py-2 text-xs font-mono font-medium rounded-md border border-border-strong bg-surface hover:bg-elevated text-ink hover:text-accent transition-colors"
                        aria-label={`Open ${project.title} on Google Play Store`}
                      >
                        <Play className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>{t('work.viewPlayStore', 'Google Play')}</span>
                      </a>
                    )}

                    {project.links.github && (
                      <a
                        href={project.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-tactile touch-target inline-flex items-center gap-2 px-3.5 py-2 text-xs font-mono font-medium rounded-md border border-border-strong bg-surface hover:bg-elevated text-ink hover:text-accent transition-colors"
                        aria-label={`View ${project.title} source code on GitHub`}
                      >
                        <Code2 className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>{t('work.viewGithub', 'Source Code')}</span>
                      </a>
                    )}

                    {project.links.live && (
                      <a
                        href={project.links.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-tactile touch-target inline-flex items-center gap-2 px-3.5 py-2 text-xs font-mono font-medium rounded-md border border-accent/40 bg-accent/10 hover:bg-accent/20 text-accent transition-colors"
                        aria-label={`Open ${project.title} on pub.dev`}
                      >
                        <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>{t('work.viewPubDev', 'pub.dev Package')}</span>
                      </a>
                    )}
                  </div>
                </div>

                {/* Core Problem & Engineering Role Ledger */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 py-6 border-b border-border-subtle text-xs font-mono">
                  <div className="md:col-span-6">
                    <span className="text-accent uppercase tracking-wider font-semibold block mb-1">
                      {t('work.problemLabel', 'Core Problem')}
                    </span>
                    <p className="text-ink-muted leading-relaxed font-sans text-sm">
                      {project.problem}
                    </p>
                  </div>
                  <div className="md:col-span-6">
                    <span className="text-accent uppercase tracking-wider font-semibold block mb-1">
                      {t('work.roleLabel', 'Engineering Role')}
                    </span>
                    <p className="text-ink-muted leading-relaxed font-sans text-sm">
                      {project.role}
                    </p>
                  </div>
                </div>

                {/* Technical Inspection Tabs */}
                <div className="pt-6">
                  <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                    {/* Tab Navigation Buttons */}
                    <div className="inline-flex items-center p-1 rounded-lg bg-surface-subtle border border-border-subtle" role="tablist">
                      <button
                        type="button"
                        role="tab"
                        aria-selected={currentTab === 'architecture'}
                        onClick={() => setTab(project.id, 'architecture')}
                        className={`touch-target px-3.5 py-1.5 text-xs font-mono font-medium rounded-md transition-all ${
                          currentTab === 'architecture'
                            ? 'bg-accent text-white shadow-sm font-semibold'
                            : 'text-ink-muted hover:text-ink'
                        }`}
                      >
                        <span className="flex items-center gap-1.5">
                          <Layers className="w-3.5 h-3.5" aria-hidden="true" />
                          <span>{t('work.tabArchitecture', 'System Architecture')}</span>
                        </span>
                      </button>

                      <button
                        type="button"
                        role="tab"
                        aria-selected={currentTab === 'decisions'}
                        onClick={() => setTab(project.id, 'decisions')}
                        className={`touch-target px-3.5 py-1.5 text-xs font-mono font-medium rounded-md transition-all ${
                          currentTab === 'decisions'
                            ? 'bg-accent text-white shadow-sm font-semibold'
                            : 'text-ink-muted hover:text-ink'
                        }`}
                      >
                        <span className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" />
                          <span>{t('work.tabDecisions', 'Decisions & Trade-offs')}</span>
                        </span>
                      </button>

                      <button
                        type="button"
                        role="tab"
                        aria-selected={currentTab === 'outcome'}
                        onClick={() => setTab(project.id, 'outcome')}
                        className={`touch-target px-3.5 py-1.5 text-xs font-mono font-medium rounded-md transition-all ${
                          currentTab === 'outcome'
                            ? 'bg-accent text-white shadow-sm font-semibold'
                            : 'text-ink-muted hover:text-ink'
                        }`}
                      >
                        <span className="flex items-center gap-1.5">
                          <ShieldCheck className="w-3.5 h-3.5" aria-hidden="true" />
                          <span>{t('work.tabOutcome', 'Production Impact')}</span>
                        </span>
                      </button>
                    </div>

                    {/* Stack Badges */}
                    <div className="flex flex-wrap items-center gap-1.5">
                      {project.stack.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 text-[11px] font-mono rounded bg-surface-subtle text-ink border border-border-subtle"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Tab Panels */}
                  <div className="mt-4">
                    {/* Tab 1: Architecture */}
                    {currentTab === 'architecture' && (
                      <div className="space-y-4 animate-in fade-in duration-200">
                        <div className="p-4 rounded-xl bg-surface-subtle border border-border-subtle">
                          <div className="text-xs font-mono text-accent uppercase tracking-wider font-semibold mb-2">
                            {t('work.architectureLabel', 'Architectural Foundation')}
                          </div>
                          <p className="text-sm text-ink leading-relaxed font-sans">
                            {project.architecture}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Tab 2: Decisions & Trade-offs */}
                    {currentTab === 'decisions' && (
                      <div className="space-y-3 animate-in fade-in duration-200">
                        {project.decisions.map((dec, dIdx) => (
                          <div
                            key={dIdx}
                            className="flex items-start gap-3 p-3.5 rounded-lg bg-surface-subtle/70 border border-border-subtle text-sm text-ink-muted"
                          >
                            <span className="w-5 h-5 rounded-full bg-accent/15 text-accent font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                              {dIdx + 1}
                            </span>
                            <span className="font-sans leading-relaxed text-ink">
                              {dec}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Tab 3: Outcome & Metrics */}
                    {currentTab === 'outcome' && (
                      <div className="space-y-4 animate-in fade-in duration-200">
                        <div className="p-4 rounded-xl bg-surface-subtle border border-border-subtle">
                          <p className="text-sm text-ink leading-relaxed font-sans mb-4">
                            {project.outcome}
                          </p>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-border-subtle">
                            {project.metrics.map((metric, mIdx) => (
                              <div
                                key={mIdx}
                                className="p-3 rounded-lg bg-surface border border-border-subtle text-center"
                              >
                                <div className="font-serif text-lg font-bold text-accent">
                                  {metric}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Secondary Technical Explorations Section */}
        <div className="mt-20 pt-16 border-t border-border-subtle text-start">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-accent font-semibold mb-2">
                Systems &amp; Wearables
              </div>
              <h3 className="font-serif text-2xl md:text-3xl font-bold text-ink">
                Technical Packages &amp; Wearable Explorations
              </h3>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-lg bg-surface border border-border-subtle" role="radiogroup">
              {(['All', 'Mobile', 'Mobile Systems', 'Data & Analytics', 'Wearable & Games'] as CategoryFilter[]).map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`touch-target px-3 py-1 text-xs font-mono rounded transition-colors ${
                    selectedCategory === cat
                      ? 'bg-accent text-white font-semibold'
                      : 'text-ink-muted hover:text-ink'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredSecondary.map((proj) => (
              <div
                key={proj.id}
                className="spec-card p-6 rounded-xl bg-surface border border-border-subtle hover:border-border-strong transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-accent mb-2">
                    <span className="uppercase tracking-wider font-semibold">{proj.category}</span>
                    {proj.arabicTitle && (
                      <span className="font-serif text-[11px] text-ink-faint">{proj.arabicTitle}</span>
                    )}
                  </div>
                  <h4 className="font-serif text-xl font-bold text-ink mb-1">{proj.title}</h4>
                  <p className="text-xs text-ink-muted mb-4 font-mono">{proj.tagline}</p>
                  <p className="text-sm text-ink-muted leading-relaxed font-sans mb-4">{proj.problem}</p>
                </div>

                <div>
                  <div className="flex flex-wrap items-center gap-1.5 mb-4">
                    {proj.stack.map((t) => (
                      <span key={t} className="px-2 py-0.5 text-[10px] font-mono rounded bg-surface-subtle text-ink border border-border-subtle">
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="pt-3 border-t border-border-subtle flex items-center justify-between">
                    <span className="text-[11px] font-mono text-ink-faint">{proj.evidence}</span>
                    <div className="flex items-center gap-2">
                      {proj.links.github && (
                        <a
                          href={proj.links.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded text-ink-muted hover:text-accent transition-colors"
                          aria-label={`GitHub source for ${proj.title}`}
                        >
                          <Code2 className="w-4 h-4" />
                        </a>
                      )}
                      {proj.links.live && (
                        <a
                          href={proj.links.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded text-ink-muted hover:text-accent transition-colors"
                          aria-label={`Live package for ${proj.title}`}
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
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
