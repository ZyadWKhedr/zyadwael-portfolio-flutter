import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUp, Github, Linkedin, Facebook, Mail, MapPin, Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';

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
    name: 'Stack Overflow',
    url: 'https://stackoverflow.com/users/24248795/zyad-wael-khedr',
    icon: () => (
      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current" aria-hidden="true">
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
    label: 'Email Zyad',
  },
];

export const Footer: React.FC = () => {
  const { t } = useTranslation();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 md:py-16 bg-canvas border-t border-border-subtle transition-colors duration-200">
      <div className="container max-w-7xl xl:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6 text-xs font-mono text-ink-muted">
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-start">
          <span className="font-serif font-bold text-ink text-sm">Zyad Wael</span>
          <span>·</span>
          <span>{t('footer.tagline', 'Software Engineer specializing in Flutter & mobile development from Alexandria, Egypt.')}</span>
        </div>

        {/* Social channels */}
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
            className="btn-tactile touch-target p-2 rounded-md border border-border-subtle bg-surface text-ink-muted hover:text-accent hover:border-accent transition-colors ms-2"
            aria-label={t('footer.backToTop', 'Back to top')}
            title={t('footer.backToTop', 'Back to top')}
          >
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="container max-w-7xl xl:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 mt-6 pt-6 border-t border-border-subtle/50 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] font-mono text-ink-faint">
        <div className="flex items-center gap-1.5">
          <MapPin className="w-3 h-3 text-accent" />
          <span>{t('footer.location', 'Alexandria, Egypt')} · UTC+2</span>
        </div>
        <div className="flex items-center gap-3">
          <Link
            to="/ufuq"
            className="inline-flex items-center gap-1.5 text-emerald-500 hover:text-emerald-400 font-semibold transition-colors"
          >
            <Sparkles className="w-3 h-3 text-emerald-500" />
            <span>Ufuq App Showcase</span>
          </Link>
          <span>·</span>
          <span>© {new Date().getFullYear()} Zyad Wael. {t('footer.rights', 'All rights reserved.')}</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
