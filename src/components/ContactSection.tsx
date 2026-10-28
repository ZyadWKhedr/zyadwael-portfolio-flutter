import React, { useState } from 'react';
import { Mail, Github, Linkedin, Copy, Check, ArrowUpRight, Send, Terminal } from 'lucide-react';

const EMAIL = 'ziad.w.khedr@gmail.com';
const GITHUB_URL = 'https://github.com/ZyadWKhedr';
const LINKEDIN_URL = 'https://www.linkedin.com/in/ziad-wael-728b7a242/';
const MEDIUM_URL = 'https://medium.com/@ziad.w.khedr';
const CV_URL = 'https://drive.google.com/file/d/1ICEIF6wW4eFgZpv2FzKn0ev8zo6XWMgi/view?usp=drive_link';

export const ContactSection: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      // Fallback
    }
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoUrl = `mailto:${EMAIL}?subject=${encodeURIComponent(subject || 'Mobile Engineering Inquiry')}&body=${encodeURIComponent(message)}`;
    window.location.href = mailtoUrl;
  };

  return (
    <section id="contact" className="py-20 md:py-28 border-b border-border-subtle">
      <div className="container max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Outreach & Direct Channels (6 cols) */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-widest text-accent">
              <span className="w-2 h-2 rounded-full bg-accent" />
              <span>Initiate Contact</span>
            </div>

            <h2 className="font-serif fluid-3xl font-bold tracking-tight text-ink">
              Let's talk architecture, mobile products, or collaboration.
            </h2>

            <p className="text-ink-muted text-sm md:text-base leading-relaxed font-sans max-w-lg">
              Whether you are hiring for a mobile engineering role, looking to architect a new Flutter app, 
              or seeking a technical speaker for an engineering event, I am directly reachable below.
            </p>

            {/* Direct Copy Email Box */}
            <div className="spec-card p-5 rounded-xl bg-surface flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-elevated border border-border-subtle flex items-center justify-center text-accent">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-ink-faint block">
                    Direct Email
                  </span>
                  <a
                    href={`mailto:${EMAIL}`}
                    className="text-sm md:text-base font-mono font-semibold text-ink hover:text-accent transition-colors"
                  >
                    {EMAIL}
                  </a>
                </div>
              </div>

              <button
                onClick={copyEmail}
                className="touch-target inline-flex items-center justify-center gap-1.5 px-3.5 py-2 text-xs font-mono rounded-md border border-border-subtle bg-elevated hover:bg-surface text-ink hover:text-accent transition-colors self-start sm:self-auto"
                aria-label="Copy email address to clipboard"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                    <span className="text-emerald-500 font-semibold">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>

            {/* Verified Public Channels */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="touch-target p-3.5 rounded-lg border border-border-subtle bg-surface hover:border-accent hover:text-accent transition-colors flex items-center justify-between text-xs font-mono text-ink"
              >
                <span className="flex items-center gap-2">
                  <Github className="w-4 h-4 text-ink-muted" />
                  <span>GitHub</span>
                </span>
                <ArrowUpRight className="w-3.5 h-3.5 text-ink-faint" />
              </a>

              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="touch-target p-3.5 rounded-lg border border-border-subtle bg-surface hover:border-accent hover:text-accent transition-colors flex items-center justify-between text-xs font-mono text-ink"
              >
                <span className="flex items-center gap-2">
                  <Linkedin className="w-4 h-4 text-ink-muted" />
                  <span>LinkedIn</span>
                </span>
                <ArrowUpRight className="w-3.5 h-3.5 text-ink-faint" />
              </a>

              <a
                href={CV_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="touch-target p-3.5 rounded-lg border border-border-subtle bg-surface hover:border-accent hover:text-accent transition-colors flex items-center justify-between text-xs font-mono text-ink col-span-2 sm:col-span-1"
              >
                <span className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-ink-muted" />
                  <span>Resume PDF</span>
                </span>
                <ArrowUpRight className="w-3.5 h-3.5 text-ink-faint" />
              </a>
            </div>
          </div>

          {/* Right Column: Direct Message Composer (6 cols) */}
          <div className="lg:col-span-6 spec-card p-6 md:p-8 rounded-2xl bg-surface">
            <div className="flex items-center justify-between border-b border-border-subtle pb-4 mb-6">
              <span className="font-mono text-xs uppercase tracking-wider text-accent font-semibold flex items-center gap-2">
                <Send className="w-3.5 h-3.5" />
                <span>Compose Message</span>
              </span>
              <span className="text-[11px] font-mono text-ink-faint">Direct Mailto Dispatch</span>
            </div>

            <form onSubmit={handleSend} className="space-y-4">
              <div>
                <label htmlFor="inquiry-subject" className="block text-xs font-mono uppercase tracking-wider text-ink-muted mb-1.5">
                  Subject / Topic
                </label>
                <input
                  id="inquiry-subject"
                  type="text"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="e.g. Flutter Contract Role / Project Consultation"
                  className="w-full px-3.5 py-2.5 rounded-md border border-border-subtle bg-canvas text-ink text-sm font-sans focus:outline-none focus:border-accent"
                />
              </div>

              <div>
                <label htmlFor="inquiry-message" className="block text-xs font-mono uppercase tracking-wider text-ink-muted mb-1.5">
                  Project Details / Message
                </label>
                <textarea
                  id="inquiry-message"
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Outline your timeline, target platforms, or engineering requirements..."
                  className="w-full px-3.5 py-2.5 rounded-md border border-border-subtle bg-canvas text-ink text-sm font-sans focus:outline-none focus:border-accent resize-none"
                />
              </div>

              <button
                type="submit"
                className="touch-target w-full flex items-center justify-center gap-2 py-3 px-6 rounded-md bg-accent text-white font-mono text-xs uppercase tracking-wider font-semibold hover:bg-accent-hover transition-colors shadow-subtle"
              >
                <Send className="w-4 h-4" />
                <span>Send to ziad.w.khedr@gmail.com</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
