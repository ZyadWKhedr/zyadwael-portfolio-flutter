import React, { useState } from 'react';
import { Mail, Github, Linkedin, Facebook, Copy, Check, ArrowUpRight, Send, Loader2, AlertCircle, CheckCircle2, MapPin } from 'lucide-react';
import { toast } from 'sonner';

const EMAIL = 'ziad.w.khedr@gmail.com';
const GITHUB_URL = 'https://github.com/ZyadWKhedr';
const LINKEDIN_URL = 'https://www.linkedin.com/in/zyad-wael-a9035a275/';
const MEDIUM_URL = 'https://medium.com/@ziad.w.khedr';
const STACKOVERFLOW_URL = 'https://stackoverflow.com/users/24248795/zyad-wael-khedr';
const FACEBOOK_URL = 'https://www.facebook.com/profile.php?id=61573995256480';
const CV_URL = 'https://drive.google.com/file/d/1ICEIF6wW4eFgZpv2FzKn0ev8zo6XWMgi/view?usp=drive_link';

export const ContactSection: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [honeypot, setHoneypot] = useState(''); // Anti-bot trap
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      toast.success('Email copied to clipboard');
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      // Fallback
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot) {
      // Silent discard for spam bots
      setSubmitStatus('success');
      return;
    }

    if (!name.trim() || !email.trim() || !message.trim()) {
      setErrorMessage('Please fill in all required fields.');
      setSubmitStatus('error');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const fullMessage = subject.trim() 
        ? `Subject: ${subject.trim()}\n\n${message.trim()}`
        : message.trim();

      const { supabase } = await import('@/integrations/supabase/client');
      const { data, error } = await supabase.functions.invoke('send-contact-email', {
        body: {
          name: name.trim(),
          email: email.trim(),
          message: fullMessage,
        },
      });

      if (error) {
        throw error;
      }

      if (data && data.success === false) {
        throw new Error(data.error || 'Failed to dispatch email');
      }

      setSubmitStatus('success');
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
      toast.success('Message sent! Zyad will respond within 24–48 hours.');
    } catch (err: any) {
      console.error('Contact email error:', err);
      setSubmitStatus('error');
      const errText = err?.message || 'Network error occurred while connecting to the mail dispatch service.';
      setErrorMessage(errText);
      toast.error('Could not send message. You can use direct mailto link below.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleMailtoFallback = () => {
    const mailtoUrl = `mailto:${EMAIL}?subject=${encodeURIComponent(subject || 'Mobile Engineering Inquiry')}&body=${encodeURIComponent(
      `From: ${name} (${email})\n\n${message}`
    )}`;
    window.location.href = mailtoUrl;
  };

  return (
    <section id="contact" className="py-20 md:py-28 border-b border-border-subtle blueprint-grid">
      <div className="container max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Outreach & Direct Channels (6 cols) */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-widest text-accent">
              <span className="w-2 h-2 rounded-full bg-accent" />
              <span>Initiate Contact</span>
            </div>

            <h2 className="font-serif fluid-3xl font-bold tracking-tight text-ink">
              Let's build reliable software or architect your next mobile product.
            </h2>

            <p className="text-ink-muted text-sm md:text-base leading-relaxed font-sans max-w-lg">
              Whether you are hiring for a mobile engineering role, looking to architect a new Flutter app, 
              or seeking consultation on clean architecture and practical AI integration, I am directly reachable below.
            </p>

            {/* Direct Copy Email Box */}
            <div className="spec-card p-5 rounded-xl bg-surface flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-2 btn-tactile">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-elevated border border-border-subtle flex items-center justify-center text-accent">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-ink-faint block">
                    Direct Inbox
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
                type="button"
                onClick={copyEmail}
                className="btn-tactile touch-target inline-flex items-center justify-center gap-1.5 px-3.5 py-2 text-xs font-mono rounded-md border border-border-subtle bg-elevated hover:bg-surface text-ink hover:text-accent transition-colors self-start sm:self-auto"
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

            {/* Location & Verified Public Channels */}
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-ink-faint mb-3">
                <MapPin className="w-3.5 h-3.5 text-accent" />
                <span>Alexandria, Egypt · Available for Remote Worldwide Roles</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                <a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-tactile touch-target p-3 rounded-lg border border-border-subtle bg-surface hover:border-accent hover:text-accent transition-colors flex items-center justify-between text-xs font-mono text-ink"
                >
                  <span className="flex items-center gap-2">
                    <Linkedin className="w-4 h-4 text-ink-muted" />
                    <span>LinkedIn</span>
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-ink-faint" />
                </a>

                <a
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-tactile touch-target p-3 rounded-lg border border-border-subtle bg-surface hover:border-accent hover:text-accent transition-colors flex items-center justify-between text-xs font-mono text-ink"
                >
                  <span className="flex items-center gap-2">
                    <Github className="w-4 h-4 text-ink-muted" />
                    <span>GitHub</span>
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-ink-faint" />
                </a>

                <a
                  href={MEDIUM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-tactile touch-target p-3 rounded-lg border border-border-subtle bg-surface hover:border-accent hover:text-accent transition-colors flex items-center justify-between text-xs font-mono text-ink"
                >
                  <span className="flex items-center gap-2">
                    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current text-ink-muted" aria-hidden="true">
                      <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/>
                    </svg>
                    <span>Medium</span>
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-ink-faint" />
                </a>

                <a
                  href={STACKOVERFLOW_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-tactile touch-target p-3 rounded-lg border border-border-subtle bg-surface hover:border-accent hover:text-accent transition-colors flex items-center justify-between text-xs font-mono text-ink"
                >
                  <span className="flex items-center gap-2">
                    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current text-ink-muted" aria-hidden="true">
                      <path d="M15 21H3v-8h2v6h10v-6h2v8zm-1.36-9.82l-1.13-1.48 6.27-4.79 1.13 1.48-6.27 4.79zm1.45 4.56L5.82 15l.27-1.97 9.27.74-.27 1.97zm.72-3.26l-8.98-2.1.46-1.93 8.98 2.1-.46 1.93zm1.81-3.39L10.4 5.18l.96-1.76 7.22 3.92-.96 1.75z"/>
                    </svg>
                    <span>Stack Overflow</span>
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-ink-faint" />
                </a>

                <a
                  href={FACEBOOK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-tactile touch-target p-3 rounded-lg border border-border-subtle bg-surface hover:border-accent hover:text-accent transition-colors flex items-center justify-between text-xs font-mono text-ink"
                >
                  <span className="flex items-center gap-2">
                    <Facebook className="w-4 h-4 text-ink-muted" />
                    <span>Facebook</span>
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-ink-faint" />
                </a>

                <a
                  href={CV_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-tactile touch-target p-3 rounded-lg border border-border-subtle bg-surface hover:border-accent hover:text-accent transition-colors flex items-center justify-between text-xs font-mono text-ink"
                >
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-accent" />
                    <span>Resume PDF</span>
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-ink-faint" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Direct Message Composer with Resend Dispatch (6 cols) */}
          <div className="lg:col-span-6 spec-card p-6 md:p-8 rounded-2xl bg-surface shadow-subtle">
            <div className="flex items-center justify-between border-b border-border-subtle pb-4 mb-6">
              <span className="font-mono text-xs uppercase tracking-wider text-accent font-semibold flex items-center gap-2">
                <Send className="w-3.5 h-3.5" />
                <span>Send Direct Message</span>
              </span>
              <span className="text-[11px] font-mono text-ink-faint flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>Verified Resend Gateway</span>
              </span>
            </div>

            {submitStatus === 'success' ? (
              <div className="p-6 rounded-xl bg-accent-subtle border border-accent/20 text-center space-y-4 animate-in fade-in duration-300">
                <div className="w-12 h-12 rounded-full bg-accent text-white flex items-center justify-center mx-auto shadow-subtle">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold text-ink">
                    Message Dispatched Successfully
                  </h3>
                  <p className="text-xs md:text-sm text-ink-muted font-sans mt-2 max-w-sm mx-auto leading-relaxed">
                    Thank you for reaching out. Your note has landed directly in Zyad's primary inbox 
                    (<span className="font-mono font-medium text-ink">{EMAIL}</span>). 
                    Expect a response within 24 to 48 hours.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSubmitStatus('idle')}
                  className="btn-tactile px-4 py-2 text-xs font-mono rounded-md border border-border-strong bg-surface text-ink hover:border-accent hover:text-accent transition-colors"
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Honeypot field for spam prevention (hidden from users) */}
                <div style={{ display: 'none' }} aria-hidden="true">
                  <input
                    type="text"
                    name="_gotcha"
                    tabIndex={-1}
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    autoComplete="off"
                  />
                </div>

                {submitStatus === 'error' && (
                  <div className="p-4 rounded-lg bg-rose-500/10 border border-rose-500/30 text-xs text-rose-700 dark:text-rose-300 space-y-2">
                    <div className="flex items-center gap-2 font-semibold font-mono">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMessage || 'Dispatch failed'}</span>
                    </div>
                    <p className="font-sans leading-relaxed">
                      You can bypass the server gateway and launch your email client directly:
                    </p>
                    <button
                      type="button"
                      onClick={handleMailtoFallback}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-rose-500 text-white font-mono text-[11px] font-semibold hover:bg-rose-600 transition-colors"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Open Pre-filled Mail Client</span>
                    </button>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="inquiry-name" className="block text-xs font-mono uppercase tracking-wider text-ink-muted mb-1.5">
                      Your Name <span className="text-accent">*</span>
                    </label>
                    <input
                      id="inquiry-name"
                      type="text"
                      required
                      minLength={2}
                      value={name}
                      disabled={isSubmitting}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Alex Reed"
                      className="w-full px-3.5 py-2.5 rounded-md border border-border-subtle bg-canvas text-ink text-sm font-sans focus:outline-none focus:border-accent transition-colors disabled:opacity-50"
                    />
                  </div>

                  <div>
                    <label htmlFor="inquiry-email" className="block text-xs font-mono uppercase tracking-wider text-ink-muted mb-1.5">
                      Email Address <span className="text-accent">*</span>
                    </label>
                    <input
                      id="inquiry-email"
                      type="email"
                      required
                      value={email}
                      disabled={isSubmitting}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="alex@company.com"
                      className="w-full px-3.5 py-2.5 rounded-md border border-border-subtle bg-canvas text-ink text-sm font-sans focus:outline-none focus:border-accent transition-colors disabled:opacity-50"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="inquiry-subject" className="block text-xs font-mono uppercase tracking-wider text-ink-muted mb-1.5">
                    Subject / Project Scope <span className="text-accent">*</span>
                  </label>
                  <input
                    id="inquiry-subject"
                    type="text"
                    required
                    minLength={3}
                    value={subject}
                    disabled={isSubmitting}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="e.g. Flutter Contract Role / Architecture Audit"
                    className="w-full px-3.5 py-2.5 rounded-md border border-border-subtle bg-canvas text-ink text-sm font-sans focus:outline-none focus:border-accent transition-colors disabled:opacity-50"
                  />
                </div>

                <div>
                  <label htmlFor="inquiry-message" className="block text-xs font-mono uppercase tracking-wider text-ink-muted mb-1.5">
                    Project Requirements / Message <span className="text-accent">*</span>
                  </label>
                  <textarea
                    id="inquiry-message"
                    required
                    minLength={10}
                    rows={4}
                    value={message}
                    disabled={isSubmitting}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Outline your timeline, target platforms (iOS/Android), and core requirements..."
                    className="w-full px-3.5 py-2.5 rounded-md border border-border-subtle bg-canvas text-ink text-sm font-sans focus:outline-none focus:border-accent transition-colors resize-none disabled:opacity-50"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-tactile touch-target w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-md bg-accent text-white font-mono text-xs uppercase tracking-wider font-semibold hover:bg-accent-hover transition-all shadow-subtle disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Dispatching Email...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Direct to Zyad's Inbox</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
