import React, { useState, useEffect, useRef } from 'react';
import { Sun, Moon, Menu, X, ArrowUpRight, FileText, Globe, Check } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { SUPPORTED_LANGUAGES, SupportedLanguage } from '@/i18n';

const CV_URL = '/zyadwael-portfolio-flutter/Zyad_Wael_CV.pdf';

export const Navigation: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [scrolled, setScrolled] = useState(false);
  const langDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check initial theme from localStorage or document element
    const saved = localStorage.getItem('theme');
    if (saved === 'light' || saved === 'dark') {
      setTheme(saved);
      document.documentElement.classList.toggle('dark', saved === 'dark');
    } else {
      const isDark = document.documentElement.classList.contains('dark') ||
        window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(isDark ? 'dark' : 'light');
      document.documentElement.classList.toggle('dark', isDark);
    }
  }, []);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    localStorage.setItem('theme', next);
    document.documentElement.classList.toggle('dark', next === 'dark');
  };

  const handleLanguageChange = (code: SupportedLanguage) => {
    i18n.changeLanguage(code);
    setLangMenuOpen(false);
  };

  // Close menus on Escape or outside click
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (mobileMenuOpen) setMobileMenuOpen(false);
        if (langMenuOpen) setLangMenuOpen(false);
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(e.target as Node)) {
        setLangMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [mobileMenuOpen, langMenuOpen]);

  // Track active section and scroll state
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sectionIds = ['hero', 'work', 'projects', 'writing', 'about', 'skills', 'contact'];
      const scrollPos = window.scrollY + 120;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const currentLangCode = (i18n.language as SupportedLanguage) || 'en';
  const currentLangObj = SUPPORTED_LANGUAGES.find((l) => l.code === currentLangCode) || SUPPORTED_LANGUAGES[0];

  const navItems = [
    { label: t('nav.work', 'Work'), href: '#work' },
    { label: t('nav.projects', 'Projects'), href: '#projects' },
    { label: t('nav.writing', 'Writing'), href: '#writing' },
    { label: t('nav.about', 'About'), href: '#about' },
    { label: t('nav.skills', 'Skills'), href: '#skills' },
    { label: t('nav.contact', 'Contact'), href: '#contact' },
  ];

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-colors duration-200 ${
        scrolled
          ? 'bg-canvas/90 backdrop-blur-md border-b border-border-subtle shadow-subtle'
          : 'bg-canvas/80 backdrop-blur-sm border-b border-transparent'
      }`}
    >
      <div className="container max-w-site mx-auto px-5 sm:px-7 lg:px-10 h-[68px] flex items-center justify-between">
        {/* Brand / Logo */}
        <a
          href="#hero"
          className="group flex items-center gap-2.5 text-ink hover:text-accent transition-colors font-display font-semibold tracking-tight"
          aria-label="Zyad Wael - Home"
        >
          <span className="w-8 h-8 rounded-md bg-surface border border-border-strong flex items-center justify-center font-mono text-xs font-bold text-accent group-hover:border-accent transition-colors">
            ZW
          </span>
          <span className="text-sm font-semibold tracking-tight text-ink hidden sm:inline">
            Zyad Wael
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
          {navItems.map((item) => {
            const isActive = activeSection === item.href.replace('#', '');
            return (
              <a
                key={item.href}
                href={item.href}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                  isActive
                    ? 'text-accent font-semibold bg-accent-muted/40'
                    : 'text-ink-muted hover:text-ink hover:bg-surface'
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Action Controls: Language Switcher, CV & Theme Toggle */}
        <div className="flex items-center gap-2">
          {/* Language Switcher Dropdown */}
          <div className="relative" ref={langDropdownRef}>
            <button
              type="button"
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className="touch-target px-2.5 py-1.5 rounded-md border border-border-subtle bg-surface hover:bg-elevated text-ink-muted hover:text-ink flex items-center gap-1.5 text-xs font-mono transition-colors"
              aria-expanded={langMenuOpen}
              aria-label={t('nav.language', 'Language')}
              title={t('nav.language', 'Language')}
            >
              <Globe className="w-3.5 h-3.5 text-accent" />
              <span className="font-sans font-medium hidden sm:inline">{currentLangObj.name}</span>
              <span className="font-mono uppercase text-[11px] sm:hidden">{currentLangCode}</span>
            </button>

            {langMenuOpen && (
              <div
                className="absolute end-0 mt-2 w-36 rounded-md bg-surface border border-border shadow-card py-1 z-50 animate-in fade-in zoom-in-95 duration-150"
                role="menu"
                aria-label="Select language"
              >
                {SUPPORTED_LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    type="button"
                    onClick={() => handleLanguageChange(lang.code)}
                    className={`w-full px-3 py-1.5 text-xs flex items-center justify-between text-start transition-colors ${
                      lang.code === currentLangCode
                        ? 'bg-accent/10 text-accent font-semibold'
                        : 'text-ink-secondary hover:text-ink hover:bg-elevated'
                    }`}
                    role="menuitem"
                  >
                    <span>{lang.name}</span>
                    {lang.code === currentLangCode && <Check className="w-3.5 h-3.5 text-accent" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* CV Download Link */}
          <a
            href={CV_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-tactile touch-target hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md border border-border-strong bg-surface hover:bg-elevated text-ink hover:text-accent transition-colors"
            aria-label={t('nav.downloadCv', "Download Zyad Wael's CV")}
          >
            <FileText className="w-3.5 h-3.5 text-accent" />
            <span>{t('nav.resume', 'CV')}</span>
            <ArrowUpRight className="w-3 h-3 text-ink-muted" />
          </a>

          {/* Theme Switcher Button */}
          <button
            type="button"
            onClick={toggleTheme}
            className="touch-target p-2 rounded-md border border-border-subtle bg-surface hover:bg-elevated text-ink-muted hover:text-accent transition-colors"
            aria-label={t('nav.toggleTheme', `Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`)}
            title={t('nav.toggleTheme', `Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`)}
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-accent" />
            ) : (
              <Moon className="w-4 h-4 text-accent" />
            )}
          </button>

          {/* Mobile Menu Hamburger Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="touch-target md:hidden p-2 rounded-md border border-border-subtle bg-surface text-ink-muted hover:text-ink transition-colors"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
            aria-label={mobileMenuOpen ? t('nav.closeMenu', 'Close menu') : t('nav.openMenu', 'Open menu')}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Accessible Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation"
          className="md:hidden border-b border-border bg-surface px-5 py-4 shadow-card animate-in fade-in duration-200"
        >
          <nav className="flex flex-col gap-1" aria-label="Mobile navigation">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.replace('#', '');
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-colors text-start ${
                    isActive
                      ? 'text-accent font-semibold bg-accent-muted/40'
                      : 'text-ink-secondary hover:text-ink hover:bg-elevated'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}

            {/* Mobile Language Switcher */}
            <div className="pt-3 mt-2 border-t border-border-subtle">
              <div className="text-[11px] font-mono uppercase tracking-wider text-ink-muted mb-2 text-start">
                {t('nav.language', 'Language')}
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                {SUPPORTED_LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    type="button"
                    onClick={() => {
                      handleLanguageChange(lang.code);
                      setMobileMenuOpen(false);
                    }}
                    className={`px-2.5 py-1.5 rounded-md text-xs font-medium text-start transition-colors border ${
                      lang.code === currentLangCode
                        ? 'border-accent bg-accent/10 text-accent font-semibold'
                        : 'border-border-subtle bg-elevated text-ink hover:bg-surface'
                    }`}
                  >
                    {lang.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-3 mt-2 border-t border-border-subtle flex items-center justify-between">
              <a
                href={CV_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-md border border-border bg-elevated text-ink"
              >
                <FileText className="w-3.5 h-3.5 text-accent" />
                <span>{t('nav.downloadCv', 'Download CV')}</span>
                <ArrowUpRight className="w-3 h-3 text-ink-muted" />
              </a>

              <span className="text-xs font-mono text-ink-muted">{t('topBar.location', 'Alexandria, Egypt')}</span>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navigation;
