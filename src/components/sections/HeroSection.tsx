import React, { useState, useEffect } from 'react';
import { ArrowDown, ArrowUpRight, Github, Linkedin, Facebook, Mail } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import HeroBackground from '@/components/layout/HeroBackground';
import profileWebp from '@/assets/zyad-profile.webp';

const CV_URL = 'https://drive.google.com/file/d/1ICEIF6wW4eFgZpv2FzKn0ev8zo6XWMgi/view?usp=drive_link';

const SOCIAL_LINKS = [
  {
    name: 'GitHub',
    url: 'https://github.com/ZyadWKhedr',
    icon: Github,
    label: 'GitHub profile',
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/zyad-wael-a9035a275/',
    icon: Linkedin,
    label: 'LinkedIn profile',
  },
  {
    name: 'Medium',
    url: 'https://medium.com/@ziad.w.khedr',
    icon: () => (
      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
        <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
      </svg>
    ),
    label: 'Technical articles on Medium',
  },
  {
    name: 'Stack Overflow',
    url: 'https://stackoverflow.com/users/24248795/zyad-wael-khedr',
    icon: () => (
      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
        <path d="M15 21H3v-8h2v6h10v-6h2v8zm-1.36-9.82l-1.13-1.48 6.27-4.79 1.13 1.48-6.27 4.79zm1.45 4.56L5.82 15l.27-1.97 9.27.74-.27 1.97zm.72-3.26l-8.98-2.1.46-1.93 8.98 2.1-.46 1.93zm1.81-3.39L10.4 5.18l.96-1.76 7.22 3.92-.96 1.75z" />
      </svg>
    ),
    label: 'Stack Overflow profile',
  },
  {
    name: 'Facebook',
    url: 'https://www.facebook.com/profile.php?id=61573995256480',
    icon: Facebook,
    label: 'Facebook profile',
  },
  {
    name: 'Email',
    url: 'mailto:ziad.w.khedr@gmail.com',
    icon: Mail,
    label: 'Email Zyad directly',
  },
];

export const HeroSection: React.FC = () => {
  const { t } = useTranslation();
  const [roleIndex, setRoleIndex] = useState(0);
  const [roleFade, setRoleFade] = useState(true);

  const roles = [
    t('hero.role1', 'Software Engineer — Mobile Development'),
    t('hero.role2', 'Flutter & Cross-Platform Architecture'),
    t('hero.role3', 'Clean Architecture & BLoC Specialist'),
    t('hero.role4', 'Offline-First & Reactive Systems'),
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setRoleFade(false);
      setTimeout(() => {
        setRoleIndex((prev) => (prev + 1) % roles.length);
        setRoleFade(true);
      }, 250);
    }, 3800);
    return () => clearInterval(timer);
  }, [roles.length]);

  return (
    <section id="hero" className="scroll-mt-24 relative pt-10 pb-16 md:pt-16 md:pb-24 border-b border-border-subtle overflow-hidden">
      {/* Architectural Atelier Hero Background (Concept 1) */}
      <HeroBackground />

      <div className="container max-w-7xl xl:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Metadata Strip */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-6 md:pb-8 border-b border-border-subtle text-xs font-mono text-ink-muted">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" aria-hidden="true" />
            <span className="font-semibold uppercase tracking-wider text-ink">Availability</span>
            <span className="text-ink-faint">/</span>
            <span>{t('topBar.available', 'Available for Mobile Engineering Roles')}</span>
          </div>
          <div className="flex items-center gap-3 text-ink-faint">
            <span className="font-medium text-ink-muted">Alexandria, Egypt</span>
            <span>·</span>
            <span>Remote Worldwide</span>
            <span className="hidden sm:inline">· UTC+2</span>
          </div>
        </div>

        {/* Main Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center pt-8 md:pt-12">
          {/* Left Column: Heading, Positioning & Actions (7 cols) */}
          <div className="lg:col-span-7 flex flex-col items-start text-start">
            {/* Animated Rotating Role Capsule */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-surface border border-border-strong mb-4 shadow-subtle min-h-[32px]">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" aria-hidden="true" />
              <span
                className={`font-mono text-xs font-bold uppercase tracking-wider text-accent transition-all duration-300 ${
                  roleFade ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-1'
                }`}
              >
                {roles[roleIndex]}
              </span>
            </div>

            <h1 className="font-serif fluid-display font-bold tracking-tight text-ink mb-6">
              {t('hero.headline', 'Engineering resilient, native-grade mobile applications.')}
            </h1>

            <p className="text-ink-muted fluid-lg max-w-2xl leading-relaxed mb-8">
              {t('hero.subheadline', 'Software Engineer specializing in mobile development with Flutter as my primary framework. Architecting high-concurrency dispatch systems, reactive commerce, and offline-first mobile apps from Alexandria, Egypt.')}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 w-full sm:w-auto">
              <a
                href="#work"
                className="btn-tactile touch-target inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-mono uppercase tracking-wider font-semibold rounded-md bg-accent text-white hover:bg-accent-hover shadow-subtle hover:shadow transition-all"
              >
                <span>{t('hero.ctaWork', 'Explore Shipped Apps')}</span>
                <ArrowDown className="w-4 h-4" />
              </a>

              <a
                href="#contact"
                className="btn-tactile touch-target inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-mono uppercase tracking-wider font-semibold rounded-md border border-border-strong bg-surface hover:bg-elevated text-ink hover:text-accent transition-all"
              >
                <span>{t('hero.ctaContact', 'Get in Touch')}</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>

            {/* Social Channels Quick Dock */}
            <div className="flex flex-wrap items-center gap-2 pt-6 mt-2">
              <span className="text-[11px] font-mono uppercase tracking-wider text-ink-faint mr-1">
                Channels:
              </span>
              {SOCIAL_LINKS.map((link) => {
                const IconComponent = link.icon;
                return (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-tactile p-2 rounded-md border border-border-subtle bg-surface text-ink-muted hover:text-accent hover:border-accent hover:shadow-subtle transition-all"
                    aria-label={link.label}
                    title={link.name}
                  >
                    <IconComponent />
                  </a>
                );
              })}
            </div>

            {/* Verification Specs Ledger */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full mt-8 pt-6 border-t border-border-subtle">
              <div>
                <div className="font-serif text-2xl lg:text-3xl font-bold text-ink">6+</div>
                <div className="text-xs font-mono text-ink-muted mt-1">{t('hero.statsClients', 'Production Apps Shipped')}</div>
              </div>
              <div>
                <div className="font-serif text-2xl lg:text-3xl font-bold text-ink">99.8%</div>
                <div className="text-xs font-mono text-ink-muted mt-1">{t('hero.statsUptime', 'Crash-Free Rate')}</div>
              </div>
              <div>
                <div className="font-serif text-2xl lg:text-3xl font-bold text-ink">4+</div>
                <div className="text-xs font-mono text-ink-muted mt-1">{t('hero.statsArticles', 'Technical Articles')}</div>
              </div>
              <div>
                <div className="font-serif text-2xl lg:text-3xl font-bold text-ink">1+</div>
                <div className="text-xs font-mono text-ink-muted mt-1">{t('hero.statsExperience', 'Years Commercial Exp.')}</div>
              </div>
            </div>
          </div>

          {/* Right Column: Portrait & Specimen Card (5 cols) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[380px] spec-card p-3 rounded-2xl bg-surface shadow-card btn-tactile">
              <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-elevated border border-border-subtle">
                <img
                  src={profileWebp}
                  alt="Zyad Wael, Mobile Software Engineer"
                  width="380"
                  height="475"
                  fetchpriority="high"
                  className="w-full h-full object-cover object-top filter contrast-[1.02]"
                />
                
                {/* Architectural Overlay Label */}
                <div className="absolute bottom-3 left-3 right-3 p-3 rounded-lg bg-canvas/92 backdrop-blur-sm border border-border-subtle">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="font-bold text-ink">Zyad Wael</span>
                    <span className="text-accent font-semibold">Mobile Software Engineer</span>
                  </div>
                  <div className="text-[11px] text-ink-muted mt-1 flex items-center justify-between">
                    <span>Alexandria, Egypt</span>
                    <span className="font-mono text-[10px] text-ink-faint">Flutter &amp; Dart Specialist</span>
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
