import React from 'react';
import { ArrowUp, Github, Linkedin, Mail, MapPin } from 'lucide-react';

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
      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current" aria-hidden="true">
        <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
      </svg>
    ),
    label: 'Medium publication',
  },
  {
    name: 'Email',
    url: 'mailto:ziad.w.khedr@gmail.com',
    icon: Mail,
    label: 'Email Zyad',
  },
];

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 md:py-16 bg-canvas border-t border-border-subtle transition-colors duration-200">
      <div className="container max-w-site mx-auto px-5 sm:px-7 lg:px-10 flex flex-col md:flex-row items-center justify-between gap-6 text-xs font-mono text-ink-muted">
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 text-center sm:text-start">
          <span className="font-display font-semibold text-ink text-sm">Zyad Wael</span>
          <span className="text-border-subtle hidden sm:inline">·</span>
          <span>Flutter Developer &amp; Data Science Student</span>
        </div>

        {/* Social Channels & Back to Top */}
        <div className="flex items-center gap-2">
          {SOCIAL_LINKS.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-tactile touch-target p-2 rounded-md border border-border-subtle bg-surface text-ink-muted hover:text-accent hover:border-accent transition-colors"
                aria-label={link.label}
                title={link.name}
              >
                <Icon />
              </a>
            );
          })}

          <button
            type="button"
            onClick={scrollToTop}
            className="btn-tactile touch-target p-2 rounded-md border border-border-subtle bg-surface text-ink-muted hover:text-accent hover:border-accent transition-colors ml-2"
            aria-label="Back to top of page"
            title="Back to top"
          >
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="container max-w-site mx-auto px-5 sm:px-7 lg:px-10 mt-6 pt-6 border-t border-border-subtle/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] font-mono text-ink-muted">
        <div className="flex items-center gap-1.5">
          <MapPin className="w-3 h-3 text-accent" />
          <span>Alexandria, Egypt</span>
        </div>
        <div>
          © {new Date().getFullYear()} Zyad Wael. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
