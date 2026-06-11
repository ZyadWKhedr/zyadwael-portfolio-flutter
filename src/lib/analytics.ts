// Lightweight analytics helper.
// Sends events to window.dataLayer (GTM/GA4), window.gtag if present,
// and always emits a CustomEvent + console.info for debugging / custom listeners.

type EventParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackEvent(name: string, params: EventParams = {}) {
  const payload = { event: name, ...params, ts: Date.now() };

  try {
    if (typeof window === 'undefined') return;

    // GTM-style dataLayer
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(payload);

    // GA4 / gtag.js
    if (typeof window.gtag === 'function') {
      window.gtag('event', name, params);
    }

    // Custom listeners
    window.dispatchEvent(new CustomEvent(`analytics:${name}`, { detail: params }));

    if (import.meta.env.DEV) {
      // eslint-disable-next-line no-console
      console.info('[analytics]', name, params);
    }
  } catch (err) {
    // never let analytics break the app
    // eslint-disable-next-line no-console
    console.warn('[analytics] failed', err);
  }
}

export const AnalyticsEvents = {
  CvDownload: 'cv_download',
  ContactSubmit: 'contact_submit',
  ContactSuccess: 'contact_success',
  ContactError: 'contact_error',
  ProjectOpen: 'project_open',
} as const;
