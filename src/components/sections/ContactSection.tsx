import React, { useState } from 'react';
import { Mail, Github, Linkedin, FileText, Copy, Check, ArrowUpRight } from 'lucide-react';

const EMAIL = 'ziad.w.khedr@gmail.com';
const GITHUB_URL = 'https://github.com/ZyadWKhedr';
const LINKEDIN_URL = 'https://www.linkedin.com/in/zyad-wael-a9035a275/';
const CV_URL = '/zyadwael-portfolio-flutter/Zyad_Wael_CV.pdf';

export const ContactSection: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <section id="contact" className="scroll-mt-20 py-20 md:py-28 border-b border-border-subtle">
      <div className="container max-w-site mx-auto px-5 sm:px-7 lg:px-10">
        <div className="max-w-reading text-start space-y-6">
          <div className="type-overline text-accent font-mono mb-3">
            GET IN TOUCH
          </div>

          <h2 className="type-h2 font-display text-ink tracking-tight">
            Have something interesting in mind?
          </h2>

          <p className="type-body text-ink-secondary leading-relaxed">
            I'm always interested in interesting software projects, technical discussions, and opportunities to build useful products.
          </p>

          {/* Direct Email Action Box */}
          <div className="pt-4">
            <div className="p-5 sm:p-6 rounded-lg bg-surface border border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-[11px] font-mono text-ink-muted uppercase tracking-wider block">
                  Direct Email
                </span>
                <a
                  href={`mailto:${EMAIL}`}
                  className="font-mono text-base sm:text-lg text-ink hover:text-accent transition-colors font-medium"
                >
                  {EMAIL}
                </a>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={copyEmail}
                  className="btn-tactile touch-target inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium rounded-md border border-border-subtle bg-elevated text-ink hover:border-accent hover:text-accent transition-colors"
                  aria-label="Copy email address"
                  title="Copy email address to clipboard"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-accent" />
                      <span className="text-accent font-semibold">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-ink-muted" />
                      <span>Copy email</span>
                    </>
                  )}
                </button>

                <a
                  href={`mailto:${EMAIL}?subject=Hello%20Zyad`}
                  className="btn-tactile touch-target inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-md bg-accent text-accent-fg hover:bg-accent-hover transition-colors shadow-subtle"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Send mail</span>
                </a>
              </div>
            </div>
          </div>

          {/* Social Channels & CV Links */}
          <div className="pt-6 border-t border-border-subtle flex flex-wrap items-center gap-4 text-xs font-medium text-ink-muted">
            <span className="font-mono text-[11px] uppercase tracking-wider text-ink-muted">Channels:</span>

            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-tactile touch-target inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-border-subtle bg-surface text-ink hover:text-accent hover:border-accent transition-colors"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub</span>
              <ArrowUpRight className="w-3 h-3 text-ink-muted" />
            </a>

            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-tactile touch-target inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-border-subtle bg-surface text-ink hover:text-accent hover:border-accent transition-colors"
            >
              <Linkedin className="w-3.5 h-3.5" />
              <span>LinkedIn</span>
              <ArrowUpRight className="w-3 h-3 text-ink-muted" />
            </a>

            <a
              href={CV_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-tactile touch-target inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-border-subtle bg-surface text-ink hover:text-accent hover:border-accent transition-colors"
            >
              <FileText className="w-3.5 h-3.5 text-accent" />
              <span>Curriculum Vitae</span>
              <ArrowUpRight className="w-3 h-3 text-ink-muted" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
