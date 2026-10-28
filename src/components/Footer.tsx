import React from 'react';
import { ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 md:py-16 bg-canvas border-t border-border-subtle transition-colors duration-200">
      <div className="container max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs font-mono text-ink-muted">
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
          <span className="font-serif font-bold text-ink text-sm">Zyad Wael</span>
          <span className="hidden sm:inline text-border-strong">/</span>
          <span>Art-directed engineering portfolio. Built with clean code &amp; intention.</span>
        </div>

        <div className="flex items-center gap-6">
          <span>© {new Date().getFullYear()} Zyad Wael</span>
          <button
            onClick={scrollToTop}
            className="touch-target inline-flex items-center gap-1.5 px-3 py-1.5 rounded border border-border-subtle bg-surface hover:border-accent hover:text-accent transition-colors"
            aria-label="Back to top"
          >
            <span>Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
