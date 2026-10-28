import React, { useState } from 'react';
import { ExternalLink, Apple, Play, Code2, Layers, CheckCircle2, ChevronRight, Filter, Smartphone, Sparkles, Image as ImageIcon } from 'lucide-react';
import { FEATURED_PROJECTS, SECONDARY_PROJECTS, SecondaryProject } from '@/data/projects';
import ProjectInteractiveDemo from './ProjectInteractiveDemo';

type TabKey = 'decisions' | 'architecture' | 'demo' | 'screenshots' | 'outcome';
type CategoryFilter = 'All' | 'Mobile' | 'Applied AI' | 'Data & Analytics' | 'Wearable & Games';

export const SelectedWork: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Record<string, TabKey>>({
    amoomy: 'decisions',
    wofoodi: 'decisions',
    raval: 'decisions',
    payss: 'decisions',
    'liquid-navbar': 'decisions',
  });

  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('All');

  const setTab = (projectId: string, tab: TabKey) => {
    setActiveTab((prev) => ({ ...prev, [projectId]: tab }));
  };

  const filteredSecondary = SECONDARY_PROJECTS.filter((p) => {
    if (selectedCategory === 'All') return true;
    return p.category === selectedCategory;
  });

  return (
    <section id="work" className="py-20 md:py-28 border-b border-border-subtle blueprint-grid">
      <div className="container max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-border-subtle">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-widest text-accent mb-2">
              <span className="w-2 h-2 rounded-full bg-accent" />
              <span>Evidence of Work</span>
            </div>
            <h2 className="font-serif fluid-3xl font-bold tracking-tight text-ink">
              Selected Engineering Case Studies
            </h2>
          </div>
          <p className="text-ink-muted text-sm md:text-base max-w-md font-sans leading-relaxed">
            Production Flutter applications shipped to the Apple App Store and Google Play. 
            Real users, real constraints, clean architecture, and interactive in-browser simulators.
          </p>
        </div>

        {/* Primary Case Studies List */}
        <div className="divide-y divide-border-subtle">
          {FEATURED_PROJECTS.map((project, idx) => {
            const currentTab = activeTab[project.id] || 'decisions';
            return (
              <article
                key={project.id}
                className="py-16 md:py-20 first:pt-12 last:pb-16 flex flex-col gap-8"
              >
                {/* Project Header Bar */}
                <div className="flex flex-wrap items-baseline justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-bold text-accent uppercase tracking-wider">
                      Spec 0{idx + 1}
                    </span>
                    <span className="text-border-strong">/</span>
                    <span className="font-mono text-xs uppercase tracking-wider text-ink-muted">
                      {project.category}
                    </span>
                  </div>

                  {/* Links Row */}
                  <div className="flex flex-wrap items-center gap-2">
                    {project.links.appStore && (
                      <a
                        href={project.links.appStore}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-tactile touch-target inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded border border-border-subtle bg-surface hover:border-accent hover:text-accent transition-colors"
                        aria-label={`App Store: View ${project.title} on Apple App Store`}
                      >
                        <Apple className="w-3.5 h-3.5" />
                        <span>App Store</span>
                        <ExternalLink className="w-3 h-3 text-ink-faint" />
                      </a>
                    )}
                    {project.links.playStore && (
                      <a
                        href={project.links.playStore}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-tactile touch-target inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded border border-border-subtle bg-surface hover:border-accent hover:text-accent transition-colors"
                        aria-label={`Google Play: View ${project.title} on Google Play`}
                      >
                        <Play className="w-3.5 h-3.5" />
                        <span>Google Play</span>
                        <ExternalLink className="w-3 h-3 text-ink-faint" />
                      </a>
                    )}
                    {project.links.live && (
                      <a
                        href={project.links.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-tactile touch-target inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded border border-border-subtle bg-surface hover:border-accent hover:text-accent transition-colors"
                        aria-label={`pub.dev Package: View ${project.title} on pub.dev`}
                      >
                        <Code2 className="w-3.5 h-3.5" />
                        <span>pub.dev Package</span>
                        <ExternalLink className="w-3 h-3 text-ink-faint" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Main Case Study Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                  {/* Left Column: Title, Identity & Problem (5 cols) */}
                  <div className="lg:col-span-5 flex flex-col gap-4">
                    <div className="flex items-center gap-4">
                      {project.icon ? (
                        <img
                          src={project.icon}
                          alt={`${project.title} icon`}
                          width="56"
                          height="56"
                          loading="lazy"
                          className="w-14 h-14 rounded-xl border border-border-subtle object-cover shadow-subtle"
                        />
                      ) : (
                        <div className="w-14 h-14 rounded-xl border border-border-subtle bg-elevated flex items-center justify-center text-accent font-mono font-bold text-lg">
                          LN
                        </div>
                      )}
                      <div>
                        <h3 className="font-serif text-2xl lg:text-3xl font-bold text-ink">
                          {project.title}
                        </h3>
                        {project.arabicTitle && (
                          <div className="text-xs text-ink-muted font-sans font-medium" dir="rtl">
                            {project.arabicTitle}
                          </div>
                        )}
                      </div>
                    </div>

                    <p className="text-sm md:text-base text-ink-muted font-medium leading-snug pt-1">
                      {project.tagline}
                    </p>

                    {/* Role Block */}
                    <div className="p-4 rounded-lg bg-surface border border-border-subtle text-xs font-sans mt-2">
                      <span className="font-mono font-bold uppercase text-accent tracking-wider block mb-1">
                        My Direct Contribution
                      </span>
                      <p className="text-ink leading-relaxed">{project.role}</p>
                    </div>

                    {/* Verified Metrics Chips */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      {project.metrics.map((metric) => (
                        <span
                          key={metric}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-elevated border border-border-subtle text-[11px] font-mono text-ink-muted"
                        >
                          <CheckCircle2 className="w-3 h-3 text-accent" />
                          <span>{metric}</span>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right Column: Architectural Inspector Tabs (7 cols) */}
                  <div className="lg:col-span-7 spec-card p-3.5 sm:p-6 rounded-xl bg-surface overflow-hidden shadow-subtle">
                    {/* Inspection Toggle Bar */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border-subtle pb-3 mb-5">
                      <span className="font-mono text-xs uppercase tracking-wider text-ink-muted flex items-center gap-2">
                        <Layers className="w-3.5 h-3.5 text-accent" />
                        <span>Technical Ledger</span>
                      </span>

                      {/* Tab Selector Buttons */}
                      <div className="flex items-center w-full sm:w-auto bg-elevated p-1 rounded-md border border-border-subtle overflow-x-auto scrollbar-hide gap-1">
                        <button
                          type="button"
                          onClick={() => setTab(project.id, 'decisions')}
                          className={`btn-tactile touch-target shrink-0 sm:shrink px-2.5 sm:px-3 py-1 text-[11px] sm:text-xs font-mono rounded transition-colors ${
                            currentTab === 'decisions'
                              ? 'bg-surface text-accent font-semibold shadow-subtle'
                              : 'text-ink-muted hover:text-ink'
                          }`}
                        >
                          Decisions
                        </button>
                        <button
                          type="button"
                          onClick={() => setTab(project.id, 'architecture')}
                          className={`btn-tactile touch-target shrink-0 sm:shrink px-2.5 sm:px-3 py-1 text-[11px] sm:text-xs font-mono rounded transition-colors ${
                            currentTab === 'architecture'
                              ? 'bg-surface text-accent font-semibold shadow-subtle'
                              : 'text-ink-muted hover:text-ink'
                          }`}
                        >
                          Architecture
                        </button>
                        <button
                          type="button"
                          onClick={() => setTab(project.id, 'demo')}
                          className={`btn-tactile touch-target shrink-0 sm:shrink px-2.5 sm:px-3 py-1 text-[11px] sm:text-xs font-mono rounded transition-colors flex items-center gap-1 ${
                            currentTab === 'demo'
                              ? 'bg-surface text-accent font-bold shadow-subtle'
                              : 'text-ink-muted hover:text-ink'
                          }`}
                        >
                          <Sparkles className="w-3 h-3 text-accent" />
                          <span>Live Demo</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setTab(project.id, 'screenshots')}
                          className={`btn-tactile touch-target shrink-0 sm:shrink px-2.5 sm:px-3 py-1 text-[11px] sm:text-xs font-mono rounded transition-colors flex items-center gap-1 ${
                            currentTab === 'screenshots'
                              ? 'bg-surface text-accent font-semibold shadow-subtle'
                              : 'text-ink-muted hover:text-ink'
                          }`}
                        >
                          <ImageIcon className="w-3 h-3" />
                          <span>Screenshots</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setTab(project.id, 'outcome')}
                          className={`btn-tactile touch-target shrink-0 sm:shrink px-2.5 sm:px-3 py-1 text-[11px] sm:text-xs font-mono rounded transition-colors ${
                            currentTab === 'outcome'
                              ? 'bg-surface text-accent font-semibold shadow-subtle'
                              : 'text-ink-muted hover:text-ink'
                          }`}
                        >
                          Outcome
                        </button>
                      </div>
                    </div>

                    {/* Tab Panels */}
                    <div className="min-h-[180px] flex flex-col justify-between">
                      {/* 1. DECISIONS PANEL */}
                      {currentTab === 'decisions' && (
                        <div className="space-y-3">
                          <div className="text-xs font-mono uppercase tracking-wider text-ink-faint">
                            Key Architectural &amp; Engineering Decisions
                          </div>
                          <ul className="space-y-2.5">
                            {project.decisions.map((dec, i) => (
                              <li key={i} className="flex items-start gap-2 text-xs md:text-sm text-ink leading-relaxed">
                                <span className="font-mono text-accent text-xs font-bold pt-0.5">0{i + 1}.</span>
                                <span>{dec}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* 2. ARCHITECTURE PANEL */}
                      {currentTab === 'architecture' && (
                        <div className="space-y-3">
                          <div className="text-xs font-mono uppercase tracking-wider text-ink-faint">
                            System Architecture &amp; Layer Boundary
                          </div>
                          <p className="text-xs md:text-sm text-ink leading-relaxed font-sans">
                            {project.architecture}
                          </p>
                          <div className="pt-2">
                            <span className="text-[11px] font-mono text-ink-faint uppercase block mb-1.5">
                              Problem Addressed:
                            </span>
                            <p className="text-xs text-ink-muted leading-relaxed italic bg-elevated p-3 rounded border border-border-subtle">
                              "{project.problem}"
                            </p>
                          </div>
                        </div>
                      )}

                      {/* 3. LIVE SIMULATION DEMO PANEL */}
                      {currentTab === 'demo' && (
                        <div className="space-y-3">
                          <div className="flex items-center justify-between text-xs font-mono uppercase tracking-wider text-ink-faint">
                            <span>Interactive In-Browser Simulation</span>
                            <span className="text-accent font-semibold">{project.interactiveDemo.title}</span>
                          </div>
                          <ProjectInteractiveDemo type={project.interactiveDemo.type} projectId={project.id} />
                          <p className="text-[11px] text-ink-muted font-sans">
                            {project.interactiveDemo.summary}
                          </p>
                        </div>
                      )}

                      {/* 4. STRUCTURED SCREENSHOTS PANEL */}
                      {currentTab === 'screenshots' && (
                        <div className="space-y-3">
                          <div className="flex items-center justify-between text-xs font-mono uppercase tracking-wider text-ink-faint">
                            <span>Mobile Screen Mockup Slots</span>
                            <span className="text-[10px] text-accent">Extensible Schema</span>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                            {project.screenshots.map((s) => (
                              <div
                                key={s.id}
                                className="p-2.5 rounded-lg bg-canvas border border-border-subtle flex flex-col justify-between"
                              >
                                <div className="aspect-[9/16] rounded-md bg-elevated border border-dashed border-border-strong flex flex-col items-center justify-center p-2 text-center overflow-hidden">
                                  {s.url ? (
                                    <img src={s.url} alt={s.caption} className="w-full h-full object-cover rounded" />
                                  ) : (
                                    <div className="space-y-2 p-1">
                                      <Smartphone className="w-6 h-6 text-accent mx-auto opacity-70" />
                                      <span className="text-[10px] font-mono font-bold text-ink block leading-tight">
                                        {s.placeholderLabel}
                                      </span>
                                      <span className="text-[9px] font-mono text-ink-faint block">
                                        [Asset slot ready]
                                      </span>
                                    </div>
                                  )}
                                </div>
                                <p className="text-[10px] text-ink-muted mt-2 font-sans leading-tight line-clamp-2">
                                  {s.caption}
                                </p>
                              </div>
                            ))}
                          </div>
                          <div className="text-[10px] font-mono text-ink-faint italic text-right">
                            * Structured data ready in src/data/projects.ts for incoming app screenshots.
                          </div>
                        </div>
                      )}

                      {/* 5. OUTCOME PANEL */}
                      {currentTab === 'outcome' && (
                        <div className="space-y-3">
                          <div className="text-xs font-mono uppercase tracking-wider text-ink-faint">
                            Measurable Production Outcome
                          </div>
                          <p className="text-xs md:text-sm text-ink leading-relaxed font-sans">
                            {project.outcome}
                          </p>
                          <div className="p-3 rounded bg-accent-subtle border border-accent/20 mt-3">
                            <div className="text-xs font-mono font-semibold text-accent flex items-center gap-1.5">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>Live Status Verified</span>
                            </div>
                            <div className="text-xs text-ink-muted mt-1">
                              App Store review passed, daily production telemetry active.
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Stack Tags Footer */}
                      <div className="pt-5 mt-4 border-t border-border-subtle flex flex-wrap items-center gap-1.5">
                        <span className="text-[11px] font-mono uppercase tracking-wider text-ink-faint mr-1">
                          Stack:
                        </span>
                        {project.stack.map((item) => (
                          <span
                            key={item}
                            className="px-2 py-0.5 text-[11px] font-mono rounded bg-elevated border border-border-subtle text-ink-muted"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Secondary Work Section: Additional Engineering & Applied AI */}
        <div id="secondary-work" className="pt-16 mt-8 border-t border-border-subtle">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-widest text-accent mb-2">
                <span className="w-2 h-2 rounded-full bg-accent" />
                <span>Secondary Index</span>
              </div>
              <h3 className="font-serif fluid-2xl font-bold tracking-tight text-ink">
                Additional Engineering &amp; Applied AI Work
              </h3>
            </div>
            <p className="text-ink-muted text-xs md:text-sm max-w-md font-sans leading-relaxed">
              Algorithmic prototypes, client projects, and machine learning pipelines across mobile, game AI, WearOS, and computer vision.
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2 pb-8">
            <span className="text-xs font-mono text-ink-faint uppercase mr-2 flex items-center gap-1">
              <Filter className="w-3 h-3 text-accent" />
              <span>Filter:</span>
            </span>
            {(['All', 'Mobile', 'Applied AI', 'Data & Analytics', 'Wearable & Games'] as CategoryFilter[]).map(
              (category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={`btn-tactile touch-target px-3 py-1.5 text-xs font-mono rounded-md border transition-colors ${
                    selectedCategory === category
                      ? 'bg-accent text-white border-accent font-semibold shadow-subtle'
                      : 'bg-surface text-ink-muted border-border-subtle hover:border-border-strong hover:text-ink'
                  }`}
                >
                  {category}
                </button>
              )
            )}
          </div>

          {/* Secondary Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSecondary.map((item: SecondaryProject) => (
              <div
                key={item.id}
                className="spec-card p-4 sm:p-6 rounded-xl bg-surface overflow-hidden flex flex-col justify-between hover:shadow-card transition-all btn-tactile"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="px-2 py-0.5 rounded bg-elevated border border-border-subtle text-[10px] font-mono uppercase tracking-wider text-accent font-semibold">
                      {item.category}
                    </span>
                    {item.links.live && (
                      <a
                        href={item.links.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-ink-faint hover:text-accent transition-colors p-1"
                        aria-label={`View ${item.title} project details`}
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>

                  <h4 className="font-serif text-lg font-bold text-ink mb-1">
                    {item.title}
                  </h4>
                  {item.arabicTitle && (
                    <div className="text-xs text-ink-muted font-sans mb-2" dir="rtl">
                      {item.arabicTitle}
                    </div>
                  )}

                  <p className="text-xs text-ink-muted font-medium leading-relaxed font-sans mb-3">
                    {item.tagline}
                  </p>

                  <div className="text-[11px] text-ink-faint font-sans bg-elevated p-2.5 rounded border border-border-subtle mb-4">
                    <span className="font-semibold text-ink block font-mono text-[10px] uppercase tracking-wider mb-0.5">
                      Problem Solved
                    </span>
                    {item.problem}
                  </div>
                </div>

                <div className="pt-3 border-t border-border-subtle">
                  <div className="text-[11px] font-mono text-ink-muted mb-2">
                    <span className="text-ink-faint">Role: </span>
                    <span className="text-ink font-medium">{item.role}</span>
                  </div>

                  {/* Stack Chips */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {item.stack.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="px-1.5 py-0.5 text-[10px] font-mono rounded bg-elevated text-ink-muted border border-border-subtle"
                      >
                        {tech}
                      </span>
                    ))}
                    {item.stack.length > 4 && (
                      <span className="px-1.5 py-0.5 text-[10px] font-mono text-ink-faint">
                        +{item.stack.length - 4}
                      </span>
                    )}
                  </div>

                  {/* Evidence Source Pill */}
                  <div className="flex items-center justify-between text-[10px] font-mono text-ink-faint">
                    <span>Source: {item.evidence.split(' ')[0]}</span>
                    {item.links.live && (
                      <a
                        href={item.links.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-accent hover:underline font-semibold"
                      >
                        <span>Inspect</span>
                        <ChevronRight className="w-3 h-3" />
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
