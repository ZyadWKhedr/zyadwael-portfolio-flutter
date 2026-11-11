import React from 'react';
import { ExternalLink, Apple, Play, MapPin, Check, Layers, ShoppingBag, Truck, Fuel, QrCode, ArrowUpRight } from 'lucide-react';
import { COMMERCIAL_PROJECTS, CommercialProject } from '@/data/projects';
import ufuqIcon from '@/assets/ufuq-icon.png';

export const SelectedWork: React.FC = () => {
  return (
    <section id="work" className="scroll-mt-20 py-20 md:py-28 border-b border-border-subtle">
      <div className="container max-w-site mx-auto px-5 sm:px-7 lg:px-10">
        {/* Section Header */}
        <div className="max-w-reading mb-14 md:mb-18 text-start">
          <div className="type-overline text-accent font-mono mb-3">
            COMMERCIAL MOBILE APPLICATIONS
          </div>
          <h2 className="type-h2 font-display text-ink mb-4 tracking-tight">
            Selected work
          </h2>
          <p className="type-body text-ink-secondary leading-relaxed">
            A selection of applications I've worked on, from commercial mobile products to independent developer tools.
          </p>
        </div>

        {/* Project Layouts List */}
        <div className="space-y-16 md:space-y-20">
          {COMMERCIAL_PROJECTS.map((project, idx) => {
            const isEven = idx % 2 === 0;

            return (
              <article
                key={project.id}
                className="spec-card p-6 sm:p-8 md:p-10 rounded-lg bg-surface border border-border transition-colors hover:border-border-strong text-start"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  {/* Content Column (7 cols) */}
                  <div className={`lg:col-span-7 space-y-6 ${isEven ? 'order-1' : 'order-1 lg:order-2'}`}>
                    {/* Header Row: Icon + Title + Category */}
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-xl overflow-hidden bg-elevated border border-border-subtle p-1.5 shrink-0 flex items-center justify-center shadow-subtle">
                        <img
                          src={project.icon}
                          alt={`${project.title} app icon`}
                          width="56"
                          height="56"
                          className="w-full h-full object-contain rounded-lg"
                        />
                      </div>
                      <div>
                        <div className="flex items-baseline gap-2.5">
                          <h3 className="type-h3 font-display font-bold text-ink">
                            {project.title}
                          </h3>
                          {project.arabicTitle && (
                            <span className="text-xs font-arabic text-ink-muted" dir="rtl">
                              {project.arabicTitle}
                            </span>
                          )}
                        </div>
                        <div className="text-xs font-mono text-accent mt-0.5">
                          {project.category}
                        </div>
                      </div>
                    </div>

                    {/* Summary */}
                    <p className="type-body text-ink-secondary leading-relaxed">
                      {project.summary}
                    </p>

                    {/* Role & Contribution Statement */}
                    <div className="p-4 rounded-md bg-elevated border-l-2 border-accent text-xs leading-relaxed">
                      <span className="font-semibold text-ink block mb-1">My contribution:</span>
                      <span className="text-ink-secondary">{project.contribution}</span>
                    </div>

                    {/* Verified Contribution Details */}
                    <div>
                      <div className="type-overline text-ink-muted mb-2.5">
                        Key implementation areas
                      </div>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-ink-secondary">
                        {project.contributionDetails.map((detail) => (
                          <li key={detail} className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Tech Stack & Store Links */}
                    <div className="pt-4 border-t border-border-subtle flex flex-wrap items-center justify-between gap-4">
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
                      {project.links && (
                        <div className="flex items-center gap-2">
                          {project.links.appStore && (
                            <a
                              href={project.links.appStore}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn-tactile touch-target inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md border border-border-strong bg-surface hover:bg-surface-hover text-ink transition-colors"
                              aria-label={`View ${project.title} on Apple App Store`}
                            >
                              <Apple className="w-3.5 h-3.5" />
                              <span>App Store</span>
                              <ExternalLink className="w-3 h-3 text-ink-muted" />
                            </a>
                          )}
                          {project.links.playStore && (
                            <a
                              href={project.links.playStore}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn-tactile touch-target inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md border border-border-strong bg-surface hover:bg-surface-hover text-ink transition-colors"
                              aria-label={`View ${project.title} on Google Play`}
                            >
                              <Play className="w-3.5 h-3.5 fill-current" />
                              <span>Google Play</span>
                              <ExternalLink className="w-3 h-3 text-ink-muted" />
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Visual Specimen Column (5 cols) */}
                  <div className={`lg:col-span-5 ${isEven ? 'order-2' : 'order-2 lg:order-1'}`}>
                    <div className="p-4 sm:p-5 rounded-lg bg-canvas border border-border-subtle space-y-4">
                      <div className="flex items-center justify-between text-xs font-mono text-ink-muted pb-2 border-b border-border-subtle">
                        <span className="font-semibold text-ink uppercase tracking-wider">Feature Specimen</span>
                        <span className="text-[11px]">Flutter Client</span>
                      </div>

                      {/* Tailored Visual Specimen by Project */}
                      {project.id === 'wofoodi' && (
                        <div className="space-y-3 font-mono text-xs">
                          <div className="p-3 rounded bg-surface border border-border-subtle space-y-2">
                            <div className="flex items-center justify-between text-[11px] text-ink-muted">
                              <span className="flex items-center gap-1 text-accent">
                                <MapPin className="w-3 h-3" />
                                Geospatial Station Clustering
                              </span>
                              <span>GCC Corridor</span>
                            </div>
                            <div className="text-ink font-sans text-xs">
                              Dynamic map marker layer clustering verified fuel stations with real-time 91, 95 & diesel grades.
                            </div>
                          </div>
                          <div className="grid grid-cols-3 gap-2 text-center text-[11px]">
                            <div className="p-2 rounded bg-surface border border-border-subtle">
                              <span className="text-ink-muted block text-[10px]">Grade 91</span>
                              <span className="text-ink font-semibold">Verified</span>
                            </div>
                            <div className="p-2 rounded bg-surface border border-border-subtle">
                              <span className="text-ink-muted block text-[10px]">Grade 95</span>
                              <span className="text-ink font-semibold">Verified</span>
                            </div>
                            <div className="p-2 rounded bg-surface border border-border-subtle">
                              <span className="text-ink-muted block text-[10px]">Diesel</span>
                              <span className="text-ink font-semibold">Available</span>
                            </div>
                          </div>
                        </div>
                      )}

                      {project.id === 'amoomy' && (
                        <div className="space-y-3 font-mono text-xs">
                          <div className="p-3 rounded bg-surface border border-border-subtle space-y-2">
                            <div className="flex items-center justify-between text-[11px] text-ink-muted">
                              <span className="flex items-center gap-1 text-accent">
                                <Truck className="w-3 h-3" />
                                Multi-Role Dispatch
                              </span>
                              <span>Saudi Logistics</span>
                            </div>
                            <div className="text-ink font-sans text-xs">
                              Dual client/provider role routing with structured quotation negotiations and transit corridor route buffering.
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-center text-[11px]">
                            <div className="p-2 rounded bg-surface border border-border-subtle">
                              <span className="text-ink-muted block text-[10px]">Client Flow</span>
                              <span className="text-ink font-semibold">Order Dispatch</span>
                            </div>
                            <div className="p-2 rounded bg-surface border border-border-subtle">
                              <span className="text-ink-muted block text-[10px]">Hauler Flow</span>
                              <span className="text-ink font-semibold">Quotation Bids</span>
                            </div>
                          </div>
                        </div>
                      )}

                      {project.id === 'raval' && (
                        <div className="space-y-3 font-mono text-xs">
                          <div className="p-3 rounded bg-surface border border-border-subtle space-y-2">
                            <div className="flex items-center justify-between text-[11px] text-ink-muted">
                              <span className="flex items-center gap-1 text-accent">
                                <ShoppingBag className="w-3 h-3" />
                                Reactive Commerce
                              </span>
                              <span>Retail Mobile</span>
                            </div>
                            <div className="text-ink font-sans text-xs">
                              Optimistic local cart state calculations with structured step-by-step dispatch order tracking.
                            </div>
                          </div>
                          <div className="flex items-center justify-between p-2 rounded bg-surface border border-border-subtle text-[11px]">
                            <span className="text-ink-muted">Order Flow:</span>
                            <span className="text-ink font-semibold">Browse → Cart → Checkout → Track</span>
                          </div>
                        </div>
                      )}

                      {project.id === 'payss' && (
                        <div className="space-y-3 font-mono text-xs">
                          <div className="p-3 rounded bg-surface border border-border-subtle space-y-2">
                            <div className="flex items-center justify-between text-[11px] text-ink-muted">
                              <span className="flex items-center gap-1 text-accent">
                                <QrCode className="w-3 h-3" />
                                Merchant Terminal
                              </span>
                              <span>Loyalty Pipeline</span>
                            </div>
                            <div className="text-ink font-sans text-xs">
                              Camera-driven QR scanning paired with customer loyalty ledger and counter activity review.
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-center text-[11px]">
                            <div className="p-2 rounded bg-surface border border-border-subtle">
                              <span className="text-ink-muted block text-[10px]">Verification</span>
                              <span className="text-ink font-semibold">Instant QR Read</span>
                            </div>
                            <div className="p-2 rounded bg-surface border border-border-subtle">
                              <span className="text-ink-muted block text-[10px]">Merchant View</span>
                              <span className="text-ink font-semibold">Points Ledger</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Standalone Product Spotlight: Ufuq */}
        <div className="mt-14 sm:mt-18 p-6 sm:p-8 rounded-lg bg-surface border border-border flex flex-col md:flex-row md:items-center justify-between gap-6 text-start">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl overflow-hidden bg-elevated border border-border-subtle p-1 shrink-0 flex items-center justify-center">
              <img src={ufuqIcon} alt="Ufuq App Icon" width="48" height="48" className="w-full h-full object-contain rounded-lg" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display font-bold text-base text-ink">Ufuq (أُفُق)</span>
                <span className="px-2 py-0.5 rounded bg-accent/15 text-accent font-mono text-[10px] uppercase font-semibold">Product Release</span>
              </div>
              <p className="text-xs text-ink-secondary mt-1">
                A calm Arabic Islamic companion featuring offline Quran reading, prayer times, daily Athkar, and live Cairo radio stream.
              </p>
            </div>
          </div>

          <a
            href="/zyadwael-portfolio-flutter/ufuq/"
            className="btn-tactile touch-target inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-md bg-accent text-accent-fg hover:bg-accent-hover transition-colors shrink-0"
          >
            <span>Visit Ufuq Website</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default SelectedWork;
