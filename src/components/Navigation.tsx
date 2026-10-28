import React, { useState, useEffect } from 'react';
import { Sun, Moon, Download, Menu, X, ArrowUpRight } from 'lucide-react';

const CV_URL = 'https://drive.google.com/file/d/1ICEIF6wW4eFgZpv2FzKn0ev8zo6XWMgi/view?usp=drive_link';

export const Navigation: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

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

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  // Section observer
  useEffect(() => {
    const sections = ['hero', 'work', 'skills', 'writing', 'about', 'contact'];
    const handleScroll = () => {
      const scrollPos = window.scrollY + 180;
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

  const navLinks = [
    { label: 'Work', href: '#work' },
    { label: 'Skills', href: '#skills' },
    { label: 'Writing', href: '#writing' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <>
      {/* Skip to Content */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-accent focus:text-white focus:rounded-md focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-white"
      >
        Skip to main content
      </a>

      {/* Main Navigation Bar */}
      <header className="sticky top-0 z-40 w-full bg-canvas/90 backdrop-blur-md border-b border-border-subtle transition-colors duration-200">
        <div className="container max-w-6xl mx-auto flex items-center justify-between h-16 md:h-20">
          {/* Logo / Identity */}
          <a
            href="#hero"
            className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
          >
            <span className="font-serif text-xl md:text-2xl font-bold tracking-tight text-ink group-hover:text-accent transition-colors">
              Zyad Wael
            </span>
            <span className="hidden sm:inline-flex items-center text-[11px] font-mono tracking-wider uppercase px-2 py-0.5 rounded border border-border-subtle text-ink-muted bg-surface">
              Flutter · AI
            </span>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2" aria-label="Main navigation">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={`touch-target px-3.5 py-2 text-sm font-medium rounded-md transition-colors ${
                    isActive
                      ? 'text-accent font-semibold'
                      : 'text-ink-muted hover:text-ink hover:bg-surface/50'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Right Controls: Theme + CV + Mobile Menu */}
          <div className="flex items-center gap-2 md:gap-3">
            {/* Theme Toggle */}
            <button
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
              <span>Download CV</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            {/* Mobile Menu Trigger */}
            <button
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
          className="fixed inset-0 z-50 md:hidden bg-canvas/98 backdrop-blur-xl flex flex-col justify-between p-6 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
        >
          <div className="flex items-center justify-between border-b border-border-subtle pb-4">
            <span className="font-serif text-xl font-bold text-ink">Zyad Wael</span>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="touch-target p-2 rounded-md border border-border-subtle bg-surface text-ink"
              aria-label="Close navigation menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <nav className="flex flex-col gap-3 my-8" aria-label="Mobile links">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="touch-target text-xl font-serif font-medium text-ink hover:text-accent py-2 border-b border-border-subtle/50"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex flex-col gap-3 pt-6 border-t border-border-subtle">
            <a
              href={CV_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="touch-target flex items-center justify-center gap-2 w-full py-3 text-sm font-mono uppercase tracking-wider font-semibold rounded-md bg-accent text-white hover:bg-accent-hover transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Download CV (PDF)</span>
            </a>
            <div className="text-center text-xs text-ink-faint font-mono mt-2">
              Available for select mobile engineering roles
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;
