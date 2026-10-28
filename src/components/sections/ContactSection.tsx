import React, { useState } from 'react';
import { Mail, Github, Linkedin, Facebook, Copy, Check, ArrowUpRight, Send, Loader2, AlertCircle, CheckCircle2, MapPin } from 'lucide-react';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';
import { sendContactMessage } from '@/services/contactService';

const EMAIL = 'ziad.w.khedr@gmail.com';
const GITHUB_URL = 'https://github.com/ZyadWKhedr';
const LINKEDIN_URL = 'https://www.linkedin.com/in/zyad-wael/';
const MEDIUM_URL = 'https://medium.com/@ziad.w.khedr';
const STACKOVERFLOW_URL = 'https://stackoverflow.com/users/24248795/zyad-wael-khedr';
const FACEBOOK_URL = 'https://www.facebook.com/profile.php?id=61573995256480';
const CV_URL = 'https://drive.google.com/file/d/1ICEIF6wW4eFgZpv2FzKn0ev8zo6XWMgi/view?usp=drive_link';

export const ContactSection: React.FC = () => {
  const { t } = useTranslation();
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
      toast.success(t('contact.copied', 'Copied to clipboard!'));
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
      const result = await sendContactMessage({ name, email, subject, message });
      if (!result.success) {
        throw new Error(result.error || 'Failed to dispatch email');
      }

      setSubmitStatus('success');
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
      toast.success(t('contact.successTitle', 'Message Delivered'));
    } catch (err) {
      console.error('Contact email error:', err);
      setSubmitStatus('error');
      const errText = err instanceof Error ? err.message : 'Network error occurred while connecting to the mail dispatch service.';
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
    <section id="contact" className="scroll-mt-24 py-20 md:py-28 border-b border-border-subtle bg-surface/20 relative">
      <div className="container max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start text-start">
          {/* Left Column: Direct Outreach & Direct Channels (6 cols) */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-widest text-accent">
              <span className="w-2 h-2 rounded-full bg-accent" />
              <span>{t('contact.badge', 'Start a Conversation')}</span>
            </div>

            <h2 className="font-serif fluid-3xl font-bold tracking-tight text-ink">
              {t('contact.title', "Let's build something exceptional together.")}
            </h2>

            <p className="text-ink-muted text-sm md:text-base leading-relaxed font-sans max-w-lg">
              {t('contact.subtitle', 'I am open to full-time mobile engineering roles, high-impact freelance mobile contracts, and technical leadership opportunities.')}
            </p>

            {/* Direct Copy Email Box */}
            <div className="spec-card p-5 rounded-xl bg-surface flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-2 btn-tactile">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-elevated border border-border-subtle flex items-center justify-center text-accent">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-ink-faint block">
                    {t('contact.directEmail', 'Direct Email')}
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
                    <span className="text-emerald-500 font-semibold">{t('contact.copied', 'Copied!')}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>{t('contact.copyEmail', 'Copy')}</span>
                  </>
                )}
              </button>
            </div>

            {/* Location & Verified Public Channels */}
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-ink-faint mb-3">
                <MapPin className="w-3.5 h-3.5 text-accent" />
                <span>{t('contact.locationVal', 'Alexandria, Egypt (UTC+2 / EET)')}</span>
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
                      <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
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
                      <path d="M15 21H3v-8h2v6h10v-6h2v8zm-1.36-9.82l-1.13-1.48 6.27-4.79 1.13 1.48-6.27 4.79zm1.45 4.56L5.82 15l.27-1.97 9.27.74-.27 1.97zm.72-3.26l-8.98-2.1.46-1.93 8.98 2.1-.46 1.93zm1.81-3.39L10.4 5.18l.96-1.76 7.22 3.92-.96 1.75z" />
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
                    <span className="w-4 h-4 rounded font-mono font-bold text-[10px] bg-accent/15 text-accent flex items-center justify-center">CV</span>
                    <span>Resume</span>
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-ink-faint" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Live Working Contact Form (6 cols) */}
          <div className="lg:col-span-6 spec-card p-6 md:p-8 rounded-2xl bg-surface">
            {submitStatus === 'success' ? (
              <div className="py-8 text-center flex flex-col items-center justify-center gap-4 animate-in fade-in duration-300">
                <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-ink">
                  {t('contact.successTitle', 'Message Delivered')}
                </h3>
                <p className="text-ink-muted text-sm max-w-md font-sans leading-relaxed">
                  {t('contact.successText', "Thank you! Your message was dispatched directly to Zyad's inbox. He will review your inquiry and reply within 24–48 hours.")}
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitStatus('idle')}
                  className="btn-tactile touch-target mt-4 px-6 py-2.5 text-xs font-mono uppercase tracking-wider font-semibold rounded-md border border-border-strong bg-elevated hover:bg-surface text-ink hover:text-accent transition-colors"
                >
                  {t('contact.sendAnother', 'Send another message')}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                {/* Honeypot Spam Trap */}
                <input
                  type="text"
                  name="_hp_company"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                  className="hidden"
                  aria-hidden="true"
                />

                {/* Name */}
                <div>
                  <label htmlFor="contact-name" className="block text-xs font-mono uppercase tracking-wider text-ink-muted mb-1.5 font-semibold">
                    {t('contact.nameLabel', 'Your Name')} <span className="text-accent">*</span>
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t('contact.namePlaceholder', 'Jane Doe')}
                    className="w-full px-3.5 py-2.5 rounded-md border border-border-subtle bg-surface-subtle text-ink text-sm font-sans focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all placeholder:text-ink-faint"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="contact-email" className="block text-xs font-mono uppercase tracking-wider text-ink-muted mb-1.5 font-semibold">
                    {t('contact.emailLabel', 'Email Address')} <span className="text-accent">*</span>
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t('contact.emailPlaceholder', 'jane@example.com')}
                    className="w-full px-3.5 py-2.5 rounded-md border border-border-subtle bg-surface-subtle text-ink text-sm font-sans focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all placeholder:text-ink-faint"
                  />
                </div>

                {/* Subject */}
                <div>
                  <label htmlFor="contact-subject" className="block text-xs font-mono uppercase tracking-wider text-ink-muted mb-1.5 font-semibold">
                    {t('contact.subjectLabel', 'Subject')}
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder={t('contact.subjectPlaceholder', 'Mobile App Project / Mobile Engineering Role')}
                    className="w-full px-3.5 py-2.5 rounded-md border border-border-subtle bg-surface-subtle text-ink text-sm font-sans focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all placeholder:text-ink-faint"
                  />
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="contact-message" className="block text-xs font-mono uppercase tracking-wider text-ink-muted mb-1.5 font-semibold">
                    {t('contact.messageLabel', 'Project or Role Details')} <span className="text-accent">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={t('contact.messagePlaceholder', 'Tell me about your mobile application, timeline, technical requirements, or role...')}
                    className="w-full px-3.5 py-2.5 rounded-md border border-border-subtle bg-surface-subtle text-ink text-sm font-sans focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all placeholder:text-ink-faint resize-y"
                  />
                </div>

                {/* Error Banner */}
                {submitStatus === 'error' && (
                  <div className="p-3 rounded-md bg-rose-500/10 border border-rose-500/20 text-rose-500 text-xs font-mono flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <span>{errorMessage}</span>
                      <button
                        type="button"
                        onClick={handleMailtoFallback}
                        className="block mt-1 underline hover:text-rose-400 font-semibold"
                      >
                        Click to send via your local email client instead
                      </button>
                    </div>
                  </div>
                )}

                {/* Submit Action */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-tactile touch-target w-full flex items-center justify-center gap-2 py-3 px-6 rounded-md bg-accent text-white font-mono text-xs uppercase tracking-wider font-semibold hover:bg-accent-hover shadow-subtle hover:shadow transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>{t('contact.sending', 'Dispatching email...')}</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>{t('contact.submit', 'Send Message')}</span>
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
