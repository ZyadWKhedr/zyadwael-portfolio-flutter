import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Sun, Moon, Download, Menu, X, ArrowUpRight, Globe, Check, Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { SUPPORTED_LANGUAGES, SupportedLanguage } from '@/i18n';

const CV_URL = 'https://drive.google.com/file/d/1ICEIF6wW4eFgZpv2FzKn0ev8zo6XWMgi/view?usp=drive_link';

export const Navigation: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const langDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize theme based on document class or localStorage
    const saved = localStorage.getItem('theme');
    if (saved === 'light' || saved === 'dark') {
      setTheme(saved);
      document.documentElement.classList.toggle('dark', saved === 'dark');
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(prefersDark ? 'dark' : 'light');
      document.documentElement.classList.toggle('dark', prefersDark);
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

  // Section observer with header offset
  useEffect(() => {
    const sections = ['hero', 'work', 'skills', 'writing', 'testimonials', 'about', 'contact'];
    const handleScroll = () => {
      const scrollPos = window.scrollY + 140;
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(id);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const currentLangCode = (i18n.language as SupportedLanguage) || 'en';
  const currentLangObj = SUPPORTED_LANGUAGES.find((l) => l.code === currentLangCode) || SUPPORTED_LANGUAGES[0];

  const navLinks = [
    { label: t('nav.work', 'Work'), href: '#work', isRouter: false },
    { label: t('nav.skills', 'Capabilities'), href: '#skills', isRouter: false },
    { label: t('nav.writing', 'Writing'), href: '#writing', isRouter: false },
    { label: t('nav.testimonials', 'Reviews'), href: '#testimonials', isRouter: false },
    { label: t('nav.about', 'About'), href: '#about', isRouter: false },
    { label: t('nav.contact', 'Contact'), href: '#contact', isRouter: false },
  ];

  return (
    <>
      {/* Accessible Skip Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:start-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-accent focus:text-white focus:rounded-md focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-white"
      >
        Skip to main content
      </a>

      {/* Main Sticky Navigation Bar */}
      <header className="sticky top-0 z-50 w-full bg-canvas/90 backdrop-blur-md border-b border-border-subtle transition-colors duration-200">
        <div className="container max-w-7xl xl:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 md:h-20">
          {/* Logo / Identity */}
          <a
            href="#hero"
            className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
          >
            <span className="font-serif text-xl md:text-2xl font-bold tracking-tight text-ink group-hover:text-accent transition-colors">
              Zyad Wael
            </span>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2" aria-label="Main navigation">
            {navLinks.map((link) => {
              if (link.isRouter) {
                return (
                  <Link
                    key={link.href}
                    to={link.href}
                    className="btn-tactile touch-target relative px-3 py-2 text-sm font-medium rounded-md text-emerald-500 dark:text-emerald-400 hover:text-emerald-600 dark:hover:text-emerald-300 font-mono transition-colors flex items-center gap-1"
                  >
                    <span>{link.label}</span>
                  </Link>
                );
              }
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={`btn-tactile touch-target relative px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    isActive
                      ? 'text-accent font-semibold'
                      : 'text-ink-muted hover:text-ink hover:bg-surface/50'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && (
                    <span className="absolute bottom-0 inset-x-2.5 h-0.5 bg-accent rounded-full animate-in fade-in duration-200" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right Controls: Language Selector + Theme + CV + Mobile Menu */}
          <div className="flex items-center gap-2 md:gap-3">
            {/* Language Selector Dropdown */}
            <div className="relative" ref={langDropdownRef}>
              <button
                type="button"
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="touch-target flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-mono font-medium rounded-md border border-border-subtle bg-surface hover:bg-elevated text-ink hover:text-accent transition-colors"
                aria-expanded={langMenuOpen}
                aria-haspopup="listbox"
                aria-label="Select language"
              >
                <Globe className="w-3.5 h-3.5 text-accent" aria-hidden="true" />
                <span>{currentLangObj.name}</span>
              </button>

              {langMenuOpen && (
                <div
                  role="listbox"
                  aria-label="Supported languages"
                  className="absolute end-0 mt-2 w-36 rounded-md shadow-xl border border-border-strong bg-surface py-1 z-50 text-xs font-sans animate-in fade-in zoom-in-95 duration-150"
                >
                  {SUPPORTED_LANGUAGES.map((lang) => {
                    const isSelected = lang.code === currentLangCode;
                    return (
                      <button
                        key={lang.code}
                        type="button"
                        role="option"
                        aria-selected={isSelected}
                        onClick={() => handleLanguageChange(lang.code)}
                        className={`w-full flex items-center justify-between px-3 py-2 text-start transition-colors ${
                          isSelected
                            ? 'bg-accent/10 text-accent font-semibold'
                            : 'text-ink hover:bg-surface-subtle'
                        }`}
                      >
                        <span>{lang.name}</span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-accent" aria-hidden="true" />}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Theme Toggle */}
            <button
              type="button"
              onClick={toggleTheme}
              className="touch-target p-2 rounded-md border border-border-subtle bg-surface text-ink hover:text-accent hover:border-border-strong transition-colors"
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-accent" /> : <Moon className="w-4 h-4 text-ink-muted" />}
            </button>

            {/* Resume Button */}
            <a
              href={CV_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="touch-target hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-xs font-mono font-medium uppercase tracking-wider rounded-md border border-border-strong bg-surface hover:bg-elevated text-ink hover:text-accent hover:border-accent transition-colors"
            >
              <span>{t('nav.resume', 'CV')}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            {/* Mobile Menu Trigger */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="touch-target md:hidden p-2 rounded-md border border-border-subtle bg-surface text-ink hover:text-accent"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Accessible Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation"
          className="fixed inset-0 z-50 md:hidden bg-canvas/98 backdrop-blur-xl flex flex-col justify-between p-6 overflow-y-auto animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
        >
          <div className="flex items-center justify-between border-b border-border-subtle pb-4">
            <span className="font-serif text-xl font-bold text-ink">Zyad Wael</span>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="touch-target p-2 rounded-md border border-border-subtle bg-surface text-ink"
              aria-label="Close navigation menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <nav className="flex flex-col gap-3 my-6" aria-label="Mobile links">
            {navLinks.map((link) => {
              if (link.isRouter) {
                return (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="touch-target text-xl font-serif font-medium text-emerald-500 dark:text-emerald-400 hover:text-emerald-600 dark:hover:text-emerald-300 py-2 border-b border-border-subtle/50 text-start flex items-center justify-between"
                  >
                    <span>{link.label}</span>
                    <Sparkles className="w-4 h-4 text-emerald-400" />
                  </Link>
                );
              }
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="touch-target text-xl font-serif font-medium text-ink hover:text-accent py-2 border-b border-border-subtle/50 text-start"
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Mobile Language Selector */}
          <div className="py-4 border-t border-border-subtle">
            <div className="text-xs font-mono uppercase tracking-wider text-ink-muted mb-2">Language / اللغة</div>
            <div className="grid grid-cols-2 gap-2">
              {SUPPORTED_LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => {
                    handleLanguageChange(lang.code);
                    setMobileMenuOpen(false);
                  }}
                  className={`px-3 py-2 rounded-md text-xs font-medium text-start transition-colors border ${
                    lang.code === currentLangCode
                      ? 'border-accent bg-accent/10 text-accent font-semibold'
                      : 'border-border-subtle bg-surface text-ink hover:bg-elevated'
                  }`}
                >
                  {lang.name}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3 pt-4 border-t border-border-subtle">
            <a
              href={CV_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="touch-target flex items-center justify-center gap-2 w-full py-3 text-sm font-mono uppercase tracking-wider font-semibold rounded-md bg-accent text-white hover:bg-accent-hover transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Download CV (PDF)</span>
            </a>
            <div className="text-center text-xs text-ink-faint font-mono">
              Available for select mobile engineering roles
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;
