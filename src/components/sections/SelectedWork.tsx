import React, { useState } from 'react';
import { ExternalLink, Apple, Play, Code2, Layers, CheckCircle2, ChevronRight, Smartphone, Filter } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { FEATURED_PROJECTS, SECONDARY_PROJECTS } from '@/data/projects';
import { ProjectInteractiveDemo } from '@/components/projects/ProjectInteractiveDemo';

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
    <section id="work" className="scroll-mt-24 py-20 md:py-32 border-b border-border-subtle relative bg-surface/20">
      <div className="container max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 md:mb-20 text-start">
          <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-widest text-accent mb-3">
            <span className="w-2 h-2 rounded-full bg-accent" />
            <span>{t('work.badge', 'Commercial Work & Open Source')}</span>
          </div>
          <h2 className="font-serif fluid-3xl font-bold tracking-tight text-ink mb-4">
            {t('work.title', 'Shipped mobile applications and system architectures.')}
          </h2>
          <p className="text-ink-muted text-base md:text-lg leading-relaxed font-sans">
            {t('work.subtitle', 'Real applications on the Apple App Store, Google Play Store, and pub.dev. Focused on clean domain architecture, offline resilience, and measurable production impact.')}
          </p>
        </div>

        {/* Featured Projects: Alternating Editorial Showcases */}
        <div className="space-y-24 md:space-y-32">
          {FEATURED_PROJECTS.map((project, idx) => {
            const currentTab = activeTab[project.id] || 'architecture';
            const isReversed = idx % 2 === 1;

            return (
              <article
                key={project.id}
                className="spec-card rounded-2xl bg-surface border border-border-subtle p-6 md:p-10 shadow-card hover:border-border-strong transition-all duration-300 text-start"
              >
                <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center ${
                  isReversed ? 'lg:flex-row-reverse' : ''
                }`}>
                  {/* Text & Specs Column (7 cols) */}
                  <div className={`space-y-6 ${isReversed ? 'lg:col-span-7 lg:order-2' : 'lg:col-span-7 lg:order-1'}`}>
                    {/* Header Row */}
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className="font-mono text-xs text-accent font-semibold uppercase tracking-wider">
                          0{idx + 1} · {project.category}
                        </span>
                        {project.arabicTitle && (
                          <span className="font-serif text-xs px-2 py-0.5 rounded bg-surface-subtle text-ink-muted border border-border-subtle">
                            {project.arabicTitle}
                          </span>
                        )}
                      </div>

                      <div className="flex items-start gap-3.5">
                        <div className="w-12 h-12 rounded-xl overflow-hidden bg-elevated border border-border-strong/40 shrink-0 p-1 shadow-subtle mt-1">
                          <img
                            src={project.icon}
                            alt={`${project.title} icon`}
                            className="w-full h-full object-cover rounded-lg"
                            loading="lazy"
                          />
                        </div>
                        <div>
                          <h3 className="font-serif text-2xl md:text-3xl font-bold text-ink">
                            {project.title}
                          </h3>
                          <p className="text-sm text-ink-muted mt-0.5">
                            {project.tagline}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Role & Problem Context */}
                    <div className="p-4 rounded-xl bg-canvas/60 border border-border-subtle/80 space-y-2">
                      <div className="text-xs font-mono text-ink-faint">
                        <span className="font-semibold text-accent">{t('work.roleLabel', 'Engineering Role')}:</span> {project.role}
                      </div>
                      <p className="text-xs md:text-sm text-ink-muted leading-relaxed">
                        <span className="font-semibold text-ink">{t('work.problemLabel', 'Core Problem')}:</span> {project.problem}
                      </p>
                    </div>

                    {/* Architectural Tabs */}
                    <div>
                      <div className="flex items-center gap-1.5 border-b border-border-subtle pb-2">
                        <button
                          type="button"
                          onClick={() => setTab(project.id, 'architecture')}
                          className={`touch-target px-3 py-1.5 text-xs font-mono rounded transition-colors ${
                            currentTab === 'architecture'
                              ? 'bg-accent text-white font-semibold'
                              : 'text-ink-muted hover:text-ink hover:bg-surface-subtle'
                          }`}
                        >
                          {t('work.tabArchitecture', 'Architecture')}
                        </button>
                        <button
                          type="button"
                          onClick={() => setTab(project.id, 'decisions')}
                          className={`touch-target px-3 py-1.5 text-xs font-mono rounded transition-colors ${
                            currentTab === 'decisions'
                              ? 'bg-accent text-white font-semibold'
                              : 'text-ink-muted hover:text-ink hover:bg-surface-subtle'
                          }`}
                        >
                          {t('work.tabDecisions', 'Decisions')}
                        </button>
                        <button
                          type="button"
                          onClick={() => setTab(project.id, 'outcome')}
                          className={`touch-target px-3 py-1.5 text-xs font-mono rounded transition-colors ${
                            currentTab === 'outcome'
                              ? 'bg-accent text-white font-semibold'
                              : 'text-ink-muted hover:text-ink hover:bg-surface-subtle'
                          }`}
                        >
                          {t('work.tabOutcome', 'Metrics')}
                        </button>
                      </div>

                      {/* Tab Content Display */}
                      <div className="pt-3 min-h-[96px] text-xs md:text-sm text-ink-muted leading-relaxed font-sans">
                        {currentTab === 'architecture' && (
                          <p>{project.architecture}</p>
                        )}

                        {currentTab === 'decisions' && (
                          <ul className="space-y-1.5">
                            {project.decisions.map((d, dIdx) => (
                              <li key={dIdx} className="flex items-start gap-2">
                                <ChevronRight className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" />
                                <span>{d}</span>
                              </li>
                            ))}
                          </ul>
                        )}

                        {currentTab === 'outcome' && (
                          <div className="space-y-2">
                            <p>{project.outcome}</p>
                            <div className="flex flex-wrap gap-2 pt-1">
                              {project.metrics.map((m, mIdx) => (
                                <span
                                  key={mIdx}
                                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-accent-subtle text-accent font-mono text-xs font-semibold"
                                >
                                  <CheckCircle2 className="w-3 h-3" />
                                  <span>{m}</span>
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Tech Stack Pills & Store Actions */}
                    <div className="pt-4 border-t border-border-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      {/* Stack Tags */}
                      <div className="flex flex-wrap items-center gap-1.5">
                        {project.stack.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-0.5 text-[11px] font-mono rounded bg-elevated text-ink-muted border border-border-subtle"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Store Links */}
                      <div className="flex flex-wrap items-center gap-2 shrink-0">
                        {project.links.appStore && (
                          <a
                            href={project.links.appStore}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-tactile touch-target inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-medium rounded-md border border-border-strong bg-surface hover:bg-elevated text-ink hover:text-accent transition-colors"
                            aria-label={`Open ${project.title} on Apple App Store`}
                          >
                            <Apple className="w-3.5 h-3.5" aria-hidden="true" />
                            <span>App Store</span>
                          </a>
                        )}

                        {project.links.playStore && (
                          <a
                            href={project.links.playStore}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-tactile touch-target inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-medium rounded-md border border-border-strong bg-surface hover:bg-elevated text-ink hover:text-accent transition-colors"
                            aria-label={`Open ${project.title} on Google Play Store`}
                          >
                            <Play className="w-3.5 h-3.5" aria-hidden="true" />
                            <span>Google Play</span>
                          </a>
                        )}

                        {project.links.live && (
                          <a
                            href={project.links.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-tactile touch-target inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-medium rounded-md border border-border-strong bg-surface hover:bg-elevated text-ink hover:text-accent transition-colors"
                            aria-label={`Open ${project.title} package`}
                          >
                            <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                            <span>pub.dev</span>
                          </a>
                        )}

                        {project.links.github && (
                          <a
                            href={project.links.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-tactile touch-target inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-medium rounded-md border border-border-strong bg-surface hover:bg-elevated text-ink hover:text-accent transition-colors"
                            aria-label={`View ${project.title} source code on GitHub`}
                          >
                            <Code2 className="w-3.5 h-3.5" aria-hidden="true" />
                            <span>Source</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Visual Showcase: Interactive Phone Device Frame (5 cols) */}
                  <div className={`w-full flex justify-center ${isReversed ? 'lg:col-span-5 lg:order-1' : 'lg:col-span-5 lg:order-2'}`}>
                    <div className="w-full max-w-[340px] rounded-3xl p-3 bg-elevated/70 border-2 border-border-strong shadow-card relative">
                      {/* Device Ear Speaker Notch */}
                      <div className="w-16 h-1 bg-border-strong/80 rounded-full mx-auto mb-2" />

                      {/* Screen Content Wrapper */}
                      <div className="rounded-2xl bg-canvas border border-border-subtle p-3 overflow-hidden min-h-[380px] flex flex-col justify-between">
                        <div className="flex items-center justify-between text-[10px] font-mono text-ink-faint border-b border-border-subtle pb-2 mb-3">
                          <span className="flex items-center gap-1">
                            <Smartphone className="w-3 h-3 text-accent" />
                            <span>Live Simulator</span>
                          </span>
                          <span>60 FPS</span>
                        </div>

                        {/* Interactive In-Browser Demo */}
                        {project.interactiveDemo && (
                          <div className="flex-1 flex flex-col justify-center">
                            <ProjectInteractiveDemo
                              type={project.interactiveDemo.type}
                              projectId={project.id}
                            />
                          </div>
                        )}

                        <div className="mt-3 pt-2 border-t border-border-subtle text-[10px] font-mono text-ink-faint text-center">
                          Zero external dependencies · Live in browser
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Secondary Technical Explorations Section */}
        <div className="mt-28 md:mt-36 pt-16 border-t border-border-subtle">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 text-start">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-widest text-accent mb-2">
                <span className="w-2 h-2 rounded-full bg-accent" />
                <span>Secondary Technical Portfolio</span>
              </div>
              <h3 className="font-serif fluid-2xl font-bold tracking-tight text-ink">
                Technical Packages, Explorations &amp; Freelance Work
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

          {/* Secondary Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSecondary.map((proj) => (
              <div
                key={proj.id}
                className="spec-card p-6 rounded-xl bg-surface border border-border-subtle hover:border-border-strong hover:shadow-subtle transition-all flex flex-col justify-between text-start"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-accent mb-2">
                    <span className="uppercase tracking-wider font-semibold">{proj.category}</span>
                    {proj.arabicTitle && (
                      <span className="font-serif text-[11px] text-ink-faint">{proj.arabicTitle}</span>
                    )}
                  </div>
                  <h4 className="font-serif text-xl font-bold text-ink mb-1">{proj.title}</h4>
                  <p className="text-xs text-ink-muted mb-3 font-mono">{proj.tagline}</p>
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
                          aria-label={`Live link for ${proj.title}`}
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
