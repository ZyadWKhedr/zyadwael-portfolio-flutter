import React, { useState } from 'react';
import { Mail, Github, Linkedin, FileText, Copy, Check, ArrowUpRight, Send, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';
import { motion, useReducedMotion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { supabase } from '@/integrations/supabase/client';

const EMAIL = 'ziad.w.khedr@gmail.com';
const GITHUB_URL = 'https://github.com/ZyadWKhedr';
const LINKEDIN_URL = 'https://www.linkedin.com/in/zyad-wael-a9035a275/';
const CV_URL = '/zyadwael-portfolio-flutter/Zyad_Wael_CV.pdf';

export const ContactSection: React.FC = () => {
  const { t } = useTranslation();
  const shouldReduceMotion = useReducedMotion();
  const [copied, setCopied] = useState(false);

  // Form State
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
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Silent discard for spam bots
    if (honeypot) {
      setSubmitStatus('success');
      return;
    }

    if (!name.trim() || !email.trim() || !message.trim()) {
      setErrorMessage(t('contact.fillRequired', 'Please fill in your name, email, and message.'));
      setSubmitStatus('error');
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setErrorMessage(t('contact.validEmail', 'Please enter a valid email address.'));
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
        throw new Error(data.error || 'Failed to dispatch email.');
      }

      setSubmitStatus('success');
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
      toast.success(t('contact.successText', 'Message sent! Zyad will respond within 24–48 hours.'));
    } catch (err: any) {
      console.error('Contact email dispatch error:', err);
      setSubmitStatus('error');
      const errText = err?.message || t('contact.failed', 'Could not connect to the mail dispatch service.');
      setErrorMessage(errText);
      toast.error(t('contact.failed', 'Message delivery failed. You can use direct email below.'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleMailtoFallback = () => {
    const mailtoUrl = `mailto:${EMAIL}?subject=${encodeURIComponent(
      subject.trim() || 'Software Engineering Inquiry'
    )}&body=${encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\n${message}`
    )}`;
    window.location.href = mailtoUrl;
  };

  return (
    <section id="contact" className="scroll-mt-20 py-14 md:py-18 border-b border-border-subtle">
      <div className="container max-w-site mx-auto px-5 sm:px-7 lg:px-10">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start text-start"
        >
          {/* Left Column: Direct Outreach & Direct Channels (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="type-overline text-accent font-mono mb-2">
              {t('contact.eyebrow', 'GET IN TOUCH')}
            </div>

            <h2 className="type-h2 font-display text-ink tracking-tight">
              {t('contact.title', 'Have something interesting in mind?')}
            </h2>

            <p className="type-body text-ink-secondary leading-relaxed">
              {t('contact.subtitle', "I'm always open to discussing new Flutter products, contract roles, mobile architecture, on-device machine learning experiments, or interesting software challenges.")}
            </p>

            {/* Direct Email Action Box */}
            <div className="p-4 sm:p-5 rounded-lg bg-surface border border-border space-y-3">
              <span className="text-[11px] font-mono text-ink-muted uppercase tracking-wider block">
                {t('contact.directEmail', 'Direct Email')}
              </span>
              <a
                href={`mailto:${EMAIL}`}
                dir="ltr"
                className="font-mono text-sm sm:text-base text-ink hover:text-accent transition-colors font-medium block truncate text-start"
              >
                {EMAIL}
              </a>

              <div className="flex items-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={copyEmail}
                  className="btn-tactile touch-target inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md border border-border-subtle bg-elevated text-ink hover:border-accent hover:text-accent transition-colors"
                  aria-label={t('contact.copyEmail', 'Copy email address')}
                  title={t('contact.copyEmail', 'Copy email address')}
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-accent" />
                      <span className="text-accent font-semibold">{t('contact.copied', 'Copied')}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-ink-muted" />
                      <span>{t('contact.copyEmail', 'Copy email')}</span>
                    </>
                  )}
                </button>

                <a
                  href={`mailto:${EMAIL}?subject=Hello%20Zyad`}
                  className="btn-tactile touch-target inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md bg-accent text-accent-fg hover:bg-accent-hover transition-colors shadow-subtle"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>{t('contact.sendMail', 'Send mail')}</span>
                </a>
              </div>
            </div>

            {/* Social Channels & CV Links */}
            <div className="pt-4 border-t border-border-subtle flex flex-wrap items-center gap-2.5 text-xs font-medium text-ink-muted">
              <span className="font-mono text-[11px] uppercase tracking-wider text-ink-muted me-1">
                {t('contact.channels', 'Channels:')}
              </span>

              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-tactile touch-target inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-border-subtle bg-surface text-ink hover:text-accent hover:border-accent transition-colors"
              >
                <Github className="w-3.5 h-3.5" />
                <span>{t('contact.github', 'GitHub')}</span>
                <ArrowUpRight className="w-3 h-3 text-ink-muted" />
              </a>

              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-tactile touch-target inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-border-subtle bg-surface text-ink hover:text-accent hover:border-accent transition-colors"
              >
                <Linkedin className="w-3.5 h-3.5" />
                <span>{t('contact.linkedin', 'LinkedIn')}</span>
                <ArrowUpRight className="w-3 h-3 text-ink-muted" />
              </a>

              <a
                href={CV_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-tactile touch-target inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-border-subtle bg-surface text-ink hover:text-accent hover:border-accent transition-colors"
              >
                <FileText className="w-3.5 h-3.5 text-accent" />
                <span>{t('contact.cv', 'Curriculum Vitae')}</span>
                <ArrowUpRight className="w-3 h-3 text-ink-muted" />
              </a>
            </div>
          </div>

          {/* Right Column: Interactive Contact Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="spec-card p-6 sm:p-8 rounded-xl bg-surface border border-border shadow-subtle">
              <div className="flex items-center justify-between border-b border-border-subtle pb-3 mb-5">
                <span className="font-mono text-xs uppercase tracking-wider text-accent font-semibold flex items-center gap-2">
                  <Send className="w-3.5 h-3.5" />
                  <span>{t('contact.directMessage', 'Send a direct message')}</span>
                </span>
                <span className="text-[11px] font-mono text-ink-muted">
                  {t('contact.viaResend', 'Delivered via Resend')}
                </span>
              </div>

              {submitStatus === 'success' ? (
                <div className="py-8 text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto border border-emerald-500/20">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-lg text-ink">
                      {t('contact.successTitle', 'Message sent successfully')}
                    </h3>
                    <p className="text-xs text-ink-secondary mt-1.5 max-w-sm mx-auto leading-relaxed">
                      {t('contact.successText', "Thank you for reaching out. Your message has been delivered to Zyad's inbox, and he will respond within 24–48 hours.")}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSubmitStatus('idle')}
                    className="btn-tactile px-4 py-2 text-xs font-semibold rounded-md border border-border-strong bg-elevated hover:bg-surface text-ink transition-colors"
                  >
                    {t('contact.sendAnother', 'Send another message')}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Anti-bot honeypot field (hidden from genuine users) */}
                  <div className="hidden" aria-hidden="true">
                    <label htmlFor="website-trap">Website</label>
                    <input
                      id="website-trap"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contact-name" className="block text-xs font-mono uppercase tracking-wider text-ink-muted mb-1.5 text-start">
                        {t('contact.nameLabel', 'Your Name')} <span className="text-accent">*</span>
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder={t('contact.namePlaceholder', 'e.g. Sarah Jenkins')}
                        disabled={isSubmitting}
                        className="w-full px-3.5 py-2.5 rounded-md border border-border-subtle bg-canvas text-ink text-xs font-sans focus:outline-none focus:border-accent disabled:opacity-50 text-start"
                      />
                    </div>

                    <div>
                      <label htmlFor="contact-email" className="block text-xs font-mono uppercase tracking-wider text-ink-muted mb-1.5 text-start">
                        {t('contact.emailLabel', 'Your Email')} <span className="text-accent">*</span>
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={t('contact.emailPlaceholder', 'e.g. sarah@example.com')}
                        disabled={isSubmitting}
                        dir="ltr"
                        className="w-full px-3.5 py-2.5 rounded-md border border-border-subtle bg-canvas text-ink text-xs font-sans focus:outline-none focus:border-accent disabled:opacity-50 text-start"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-subject" className="block text-xs font-mono uppercase tracking-wider text-ink-muted mb-1.5 text-start">
                      {t('contact.subjectLabel', 'Subject / Topic')}
                    </label>
                    <input
                      id="contact-subject"
                      type="text"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder={t('contact.subjectPlaceholder', 'e.g. Flutter Application Contract / Architecture Consultation')}
                      disabled={isSubmitting}
                      className="w-full px-3.5 py-2.5 rounded-md border border-border-subtle bg-canvas text-ink text-xs font-sans focus:outline-none focus:border-accent disabled:opacity-50 text-start"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="block text-xs font-mono uppercase tracking-wider text-ink-muted mb-1.5 text-start">
                      {t('contact.messageLabel', 'Message')} <span className="text-accent">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      required
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder={t('contact.messagePlaceholder', "Outline your timeline, target platforms, requirements, or what you'd like to build...")}
                      disabled={isSubmitting}
                      className="w-full px-3.5 py-2.5 rounded-md border border-border-subtle bg-canvas text-ink text-xs font-sans focus:outline-none focus:border-accent resize-none disabled:opacity-50 text-start"
                    />
                  </div>

                  {submitStatus === 'error' && (
                    <div className="p-3 rounded-md bg-red-500/10 border border-red-500/20 text-xs text-red-500 flex items-start gap-2.5">
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                      <div className="space-y-1 text-start">
                        <div>{errorMessage || t('contact.failed', 'Failed to send message.')}</div>
                        <button
                          type="button"
                          onClick={handleMailtoFallback}
                          className="font-semibold underline hover:text-red-400 block"
                        >
                          {t('contact.mailtoFallback', 'Send via default email app instead →')}
                        </button>
                      </div>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-tactile touch-target w-full flex items-center justify-center gap-2 py-3 px-6 rounded-md bg-accent text-accent-fg font-mono text-xs uppercase tracking-wider font-semibold hover:bg-accent-hover transition-colors shadow-subtle disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>{t('contact.sending', 'Sending message...')}</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>{t('contact.submit', 'Send message')}</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
