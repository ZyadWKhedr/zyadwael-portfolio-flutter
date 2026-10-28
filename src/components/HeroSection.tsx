import React from 'react';
import { ArrowDown, ArrowUpRight, ShieldCheck, Smartphone, Terminal, Layers } from 'lucide-react';
import profileWebp from '@/assets/zyad-profile.webp';

const CV_URL = 'https://drive.google.com/file/d/1ICEIF6wW4eFgZpv2FzKn0ev8zo6XWMgi/view?usp=drive_link';

export const HeroSection: React.FC = () => {
  return (
    <section id="hero" className="relative pt-12 pb-16 md:pt-20 md:pb-24 border-b border-border-subtle">
      <div className="container max-w-6xl mx-auto">
        {/* Top Metadata Strip */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-6 md:pb-8 border-b border-border-subtle text-xs font-mono text-ink-muted">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" aria-hidden="true" />
            <span className="font-semibold uppercase tracking-wider text-ink">Availability</span>
            <span className="text-ink-faint">/</span>
            <span>Open for mobile engineering roles &amp; high-impact contracts</span>
          </div>
          <div className="hidden sm:flex items-center gap-3 text-ink-faint">
            <span>Cairo, Egypt · Remote Worldwide</span>
            <span>UTC+2</span>
          </div>
        </div>

        {/* Main Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center pt-8 md:pt-12">
          {/* Left Column: Heading, Positioning & Actions (7 cols) */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            <span className="font-mono text-xs font-semibold uppercase tracking-widest text-accent mb-3">
              Mobile Application Engineer · Data Science Student
            </span>

            <h1 className="font-serif fluid-display font-bold tracking-tight text-ink mb-6">
              I build mobile products that feel native, ship clean, and endure.
            </h1>

            <p className="text-ink-muted fluid-lg max-w-2xl leading-relaxed mb-8">
              Specialized in cross-platform engineering with <strong className="font-semibold text-ink">Flutter &amp; Dart</strong>, 
              strict <strong className="font-semibold text-ink">Clean Architecture</strong>, offline-first reliability, 
              and practical on-device <strong className="font-semibold text-ink">AI integration</strong>.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 w-full sm:w-auto">
              <a
                href="#work"
                className="touch-target inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-mono uppercase tracking-wider font-semibold rounded-md bg-accent text-white hover:bg-accent-hover shadow-subtle hover:shadow transition-all"
              >
                <span>View Selected Work</span>
                <ArrowDown className="w-4 h-4" />
              </a>

              <a
                href={CV_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="touch-target inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-mono uppercase tracking-wider font-semibold rounded-md border border-border-strong bg-surface hover:bg-elevated text-ink hover:text-accent transition-all"
              >
                <span>Download CV</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>

            {/* Verification Specs Ledger */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full mt-10 pt-8 border-t border-border-subtle">
              <div>
                <div className="font-serif text-2xl lg:text-3xl font-bold text-ink">4+</div>
                <div className="text-xs font-mono text-ink-muted mt-1">Shipped Store Apps</div>
              </div>
              <div>
                <div className="font-serif text-2xl lg:text-3xl font-bold text-ink">400+</div>
                <div className="text-xs font-mono text-ink-muted mt-1">Package Downloads</div>
              </div>
              <div>
                <div className="font-serif text-2xl lg:text-3xl font-bold text-ink">4</div>
                <div className="text-xs font-mono text-ink-muted mt-1">Technical Articles</div>
              </div>
              <div>
                <div className="font-serif text-2xl lg:text-3xl font-bold text-ink">Lead</div>
                <div className="text-xs font-mono text-ink-muted mt-1">AUFS Flutter Comm.</div>
              </div>
            </div>
          </div>

          {/* Right Column: Portrait & Specimen Card (5 cols) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[380px] spec-card p-3 rounded-2xl bg-surface shadow-card">
              <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-elevated border border-border-subtle">
                <img
                  src={profileWebp}
                  alt="Zyad Wael, Mobile Engineer"
                  width="380"
                  height="475"
                  fetchpriority="high"
                  className="w-full h-full object-cover object-top filter contrast-[1.02]"
                />
                
                {/* Architectural Overlay Label */}
                <div className="absolute bottom-3 left-3 right-3 p-3 rounded-lg bg-canvas/92 backdrop-blur-sm border border-border-subtle">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="font-bold text-ink">Zyad Wael</span>
                    <span className="text-accent font-semibold">Flutter / Data Science</span>
                  </div>
                  <div className="text-[11px] text-ink-muted mt-1">
                    Focused on architectural integrity &amp; tangible outcomes.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
