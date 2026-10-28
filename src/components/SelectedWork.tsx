import React, { useState } from 'react';
import { ExternalLink, Github, Apple, Play, Code2, Layers, CheckCircle2, Cpu } from 'lucide-react';
import amoomyIcon from '@/assets/amoomy-icon.png';
import wofoodiIcon from '@/assets/wofoodi-icon.png';
import ravalIcon from '@/assets/raval-icon.png';
import payssIcon from '@/assets/payss-icon.png';

interface ProjectSpec {
  id: string;
  title: string;
  arabicTitle?: string;
  category: string;
  tagline: string;
  icon: string;
  problem: string;
  role: string;
  architecture: string;
  decisions: string[];
  stack: string[];
  outcome: string;
  metrics: string[];
  links: {
    appStore?: string;
    playStore?: string;
    github?: string;
    live?: string;
  };
}

const projects: ProjectSpec[] = [
  {
    id: 'amoomy',
    title: 'Amoomy',
    arabicTitle: 'عمومي - النقل الثقيل',
    category: 'Heavy Logistics & Dispatch Platform',
    tagline: 'Multi-role freight & heavy equipment transport coordination across Saudi Arabia.',
    icon: amoomyIcon,
    problem:
      'Heavy freight, vehicle recovery, and construction equipment transport suffered from manual dispatching, opaque pricing, and fragmented communication between clients and truck operators.',
    role:
      'Lead Mobile Engineer — Architected the client and provider mobile applications from domain logic to production deployment on iOS and Android.',
    architecture:
      'Engineered with strict Clean Architecture layers (Domain / Data / Presentation). Decoupled the scheduling engine from UI rendering using Provider state containers with repository patterns.',
    decisions: [
      'Implemented role-based OAuth (Apple, Google, Phone OTP) with instantaneous role context switching.',
      'Designed an offline-safe dispatch queue that buffers order proposals locally when network drops occur in remote transport corridors.',
      'Created a modular quotation negotiation view enabling real-time offer comparisons between truck owners.',
    ],
    stack: ['Flutter', 'Dart', 'Provider', 'Firebase Auth', 'REST APIs', 'Clean Architecture', 'Google Maps'],
    outcome:
      'Shipped to production on Apple App Store (ID: 6753125564) and Google Play (com.zeroonez.amoomy), coordinating freight requests across 100+ vehicle and equipment categories.',
    metrics: ['Shipped iOS & Android', 'Multi-role Dispatch', '100+ Categories Supported'],
    links: {
      appStore: 'https://apps.apple.com/us/app/amoomy-%D8%B9%D9%85%D9%88%D9%85%D9%8A-%D8%A7%D9%84%D9%86%D9%82%D9%84-%D8%A7%D9%84%D8%AB%D9%82%D9%8A%D9%84/id6753125564',
      playStore: 'https://play.google.com/store/apps/details?id=com.zeroonez.amoomy',
    },
  },
  {
    id: 'wofoodi',
    title: 'Wofoodi',
    arabicTitle: 'وفودي',
    category: 'Real-Time Fuel Discovery & Regional Pricing',
    tagline: 'Live location-based fuel intelligence and route navigation in two GCC markets.',
    icon: wofoodiIcon,
    problem:
      'Drivers navigating high-density highways frequently faced unexpected station fuel shortages and price discrepancies, with no fast way to identify the closest verified station offering specific fuel grades.',
    role:
      'Mobile Engineer — Built the interactive geospatial station map, location caching pipeline, and real-time station details interface.',
    architecture:
      'Custom geospatial clustering layer over Google Maps SDK paired with an offline SQLite cache. Synchronizes regional fuel price updates via background debounce without locking the 60fps UI thread.',
    decisions: [
      'Engineered sub-meter radius filtering to prioritize stations along the driver’s current travel trajectory rather than simple radial distance.',
      'Integrated resilient local persistence for offline route recall in low-signal desert highway sectors.',
      'Optimized custom map pin rendering using compiled SVG markers to prevent GPU memory spikes.',
    ],
    stack: ['Flutter', 'Dart', 'Google Maps SDK', 'Firebase Auth', 'RESTful API', 'SQLite Caching'],
    outcome:
      'Live on Apple App Store (ID: 6751444551) and Google Play (com.wofoodi.app.sa), serving daily motorists across Saudi Arabia and the GCC.',
    metrics: ['2 GCC Markets Live', 'Sub-second Map Clustering', 'Offline Price Sync'],
    links: {
      appStore: 'https://apps.apple.com/us/app/%D9%88%D9%81%D9%88%D8%AF%D9%8A/id6751444551',
      playStore: 'https://play.google.com/store/apps/details?id=com.wofoodi.app.sa',
    },
  },
  {
    id: 'raval',
    title: 'Raval',
    arabicTitle: 'رافال',
    category: 'High-Conversion Fashion E-Commerce',
    tagline: 'Streamlined retail app engineered for rapid browsing, smart carting, and step-by-step order tracking.',
    icon: ravalIcon,
    problem:
      'E-commerce shoppers abandon carts when mobile catalogs suffer from laggy category filtering, slow image hydration, or clumsy multi-step checkout processes.',
    role:
      'Mobile Engineer — Spearheaded the client application architecture, stateful shopping cart pipeline, and real-time order lifecycle tracking.',
    architecture:
      'Separated presentation from business rules via Clean Architecture domain entities. Used an optimistic reactive state container for cart updates that immediately reflects price changes with zero spinner latency.',
    decisions: [
      'Implemented an intelligent progressive image loader with memory-managed disk caching, keeping app heap usage below 80MB on older Android devices.',
      'Designed a visual order status tracker providing granular, step-by-step dispatch updates (Received → Processing → Dispatched → Delivered).',
      'Integrated comprehensive checkout validation with instant card format sanitization.',
    ],
    stack: ['Flutter', 'Dart', 'Clean Architecture', 'Provider', 'REST APIs', 'Secure Payment SDK'],
    outcome:
      'Active commercial retail application shipping daily customer orders on Apple App Store (ID: 6756228964) and Google Play (com.zeroonez.raval).',
    metrics: ['Daily Commercial Orders', '<80MB Heap Footprint', 'Sub-3-tap Checkout'],
    links: {
      appStore: 'https://apps.apple.com/us/app/raval/id6756228964',
      playStore: 'https://play.google.com/store/apps/details?id=com.zeroonez.raval',
    },
  },
  {
    id: 'payss',
    title: 'Payss',
    category: 'Social Loyalty & Instant Rewards',
    tagline: 'Consumer mobile client connecting shoppers, merchant QR scans, and instant reward points.',
    icon: payssIcon,
    problem:
      'Traditional customer loyalty cards are routinely forgotten or lost, leaving merchants without direct customer retention channels and shoppers without immediate gratification.',
    role:
      'Flutter Mobile Engineer — Developed the consumer client application, hardware camera QR scanner integration, and live merchant activity feed.',
    architecture:
      'Combined real-time WebSocket event listeners with REST fallbacks. Packaged local point balances into encrypted secure storage for tamper-proof offline confirmation.',
    decisions: [
      'Engineered an ultra-fast QR scanning overlay with custom camera frame throttling to preserve battery health.',
      'Built interactive merchant discovery with category filters, dynamic distance recalculations, and guest mode onboarding.',
      'Implemented Dark/Light theme parity adhering to iOS Human Interface Guidelines.',
    ],
    stack: ['Flutter', 'Dart', 'WebSockets', 'QR Scanner SDK', 'Google Maps', 'Secure Storage'],
    outcome:
      'Shipped on Apple App Store (ID: 6767013931) and Google Play (com.payss.app) supporting merchants and active consumer reward redemption.',
    metrics: ['Shipped iOS & Android', 'Sub-100ms QR Recognition', 'Real-time WebSocket Sync'],
    links: {
      appStore: 'https://apps.apple.com/eg/app/payss/id6767013931',
      playStore: 'https://play.google.com/store/apps/details?id=com.payss.app',
    },
  },
  {
    id: 'liquid-navbar',
    title: 'Liquid Navbar',
    category: 'Open Source Flutter Package',
    tagline: 'Physics-based iOS Liquid Glass navigation bar component published on pub.dev.',
    icon: '',
    problem:
      'Flutter developers seeking iOS 18-style dynamic fluid navigation bars were forced to compromise with clunky third-party web views or complex custom shader code that crashed on lower-end devices.',
    role: 'Author & Sole Maintainer — Conceptualized, mathematically modeled, and packaged the library for the open source Flutter ecosystem.',
    architecture:
      'Built strictly using Flutter’s native `CustomPainter` and canvas matrix math with zero heavy external dependencies. Spring physics calculations run in 60fps render cycles with zero frame drops.',
    decisions: [
      'Engineered custom bezier curve interpolation that responds to finger velocity and tap coordinates.',
      'Provided full support for both Material 3 and Cupertino design palettes through simple declarative configuration.',
      'Added extensive automated widget tests and documentation adhering to strict Dart package scoring standards.',
    ],
    stack: ['Flutter', 'Dart', 'Canvas API', 'CustomPainter', 'Vector Math', 'pub.dev'],
    outcome:
      'Published on the official Dart package repository (pub.dev/packages/liquid_navbar) with 400+ downloads, 130/140 pub points, and active community adoption.',
    metrics: ['400+ pub.dev Downloads', '130/140 Pub Points', 'Zero External Dependencies'],
    links: {
      live: 'https://pub.dev/packages/liquid_navbar',
      github: 'https://github.com/ZyadWKhedr',
    },
  },
];

export const SelectedWork: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Record<string, 'decisions' | 'architecture' | 'outcome'>>({
    amoomy: 'decisions',
    wofoodi: 'decisions',
    raval: 'decisions',
    payss: 'decisions',
    'liquid-navbar': 'decisions',
  });

  const setTab = (projectId: string, tab: 'decisions' | 'architecture' | 'outcome') => {
    setActiveTab((prev) => ({ ...prev, [projectId]: tab }));
  };

  return (
    <section id="work" className="py-20 md:py-28 border-b border-border-subtle">
      <div className="container max-w-6xl mx-auto">
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
            Real users, real constraints, clean architecture.
          </p>
        </div>

        {/* Project Case Studies List (Alternating Layouts) */}
        <div className="divide-y divide-border-subtle">
          {projects.map((project, idx) => {
            const currentTab = activeTab[project.id] || 'decisions';
            return (
              <article
                key={project.id}
                className="py-16 md:py-20 first:pt-12 last:pb-8 flex flex-col gap-8"
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
                        className="touch-target inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded border border-border-subtle bg-surface hover:border-accent hover:text-accent transition-colors"
                        aria-label={`View ${project.title} on Apple App Store`}
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
                        className="touch-target inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded border border-border-subtle bg-surface hover:border-accent hover:text-accent transition-colors"
                        aria-label={`View ${project.title} on Google Play`}
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
                        className="touch-target inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded border border-border-subtle bg-surface hover:border-accent hover:text-accent transition-colors"
                        aria-label={`View ${project.title} on pub.dev`}
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
                  <div className="lg:col-span-7 spec-card p-6 rounded-xl bg-surface">
                    {/* Inspection Toggle Bar */}
                    <div className="flex items-center justify-between border-b border-border-subtle pb-3 mb-5">
                      <span className="font-mono text-xs uppercase tracking-wider text-ink-muted flex items-center gap-2">
                        <Layers className="w-3.5 h-3.5 text-accent" />
                        <span>Technical Ledger</span>
                      </span>

                      <div className="flex items-center gap-1 bg-elevated p-1 rounded-md border border-border-subtle">
                        <button
                          onClick={() => setTab(project.id, 'decisions')}
                          className={`touch-target px-3 py-1 text-xs font-mono rounded transition-colors ${
                            currentTab === 'decisions'
                              ? 'bg-surface text-accent font-semibold shadow-subtle'
                              : 'text-ink-muted hover:text-ink'
                          }`}
                        >
                          Decisions
                        </button>
                        <button
                          onClick={() => setTab(project.id, 'architecture')}
                          className={`touch-target px-3 py-1 text-xs font-mono rounded transition-colors ${
                            currentTab === 'architecture'
                              ? 'bg-surface text-accent font-semibold shadow-subtle'
                              : 'text-ink-muted hover:text-ink'
                          }`}
                        >
                          Architecture
                        </button>
                        <button
                          onClick={() => setTab(project.id, 'outcome')}
                          className={`touch-target px-3 py-1 text-xs font-mono rounded transition-colors ${
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
                    <div className="min-h-[160px] flex flex-col justify-between">
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
      </div>
    </section>
  );
};

export default SelectedWork;
