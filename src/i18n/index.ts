import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './locales/en.json';
import ar from './locales/ar.json';
import fr from './locales/fr.json';
import de from './locales/de.json';
import tr from './locales/tr.json';

export type SupportedLanguage = 'en' | 'ar' | 'fr' | 'de' | 'tr';

export interface LanguageOption {
  code: SupportedLanguage;
  name: string;
  dir: 'ltr' | 'rtl';
}

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: 'en', name: 'English', dir: 'ltr' },
  { code: 'ar', name: 'العربية', dir: 'rtl' },
  { code: 'fr', name: 'Français', dir: 'ltr' },
  { code: 'de', name: 'Deutsch', dir: 'ltr' },
  { code: 'tr', name: 'Türkçe', dir: 'ltr' },
];

const STORAGE_KEY = 'portfolio_lang';

/**
 * Detects visitor language on initial visit from browser preferences.
 * Safe for SSR and fallback environments.
 */
export function detectInitialLanguage(): SupportedLanguage {
  if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
    return 'en';
  }

  try {
    const saved = localStorage.getItem(STORAGE_KEY) as SupportedLanguage | null;
    if (saved && SUPPORTED_LANGUAGES.some((l) => l.code === saved)) {
      return saved;
    }

    const browserLangs = navigator.languages || [navigator.language || 'en'];
    for (const bLang of browserLangs) {
      const lower = bLang.toLowerCase();
      if (lower.startsWith('ar')) return 'ar';
      if (lower.startsWith('fr')) return 'fr';
      if (lower.startsWith('de')) return 'de';
      if (lower.startsWith('tr')) return 'tr';
      if (lower.startsWith('en')) return 'en';
    }
  } catch (e) {
    console.warn('[i18n] Error detecting browser language:', e);
  }

  return 'en';
}

/**
 * Updates document direction and lang attributes when language changes.
 */
export function applyDocumentLanguage(lang: SupportedLanguage) {
  if (typeof document === 'undefined') return;

  const isRtl = lang === 'ar';
  document.documentElement.setAttribute('dir', isRtl ? 'rtl' : 'ltr');
  document.documentElement.setAttribute('lang', lang);
  document.documentElement.classList.toggle('rtl', isRtl);
}

const initialLang = detectInitialLanguage();

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    ar: { translation: ar },
    fr: { translation: fr },
    de: { translation: de },
    tr: { translation: tr },
  },
  lng: initialLang,
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false, // React already escapes values
  },
  react: {
    useSuspense: false, // Prevent SSR hydration suspension mismatch
  },
});

// Apply document attributes on initial client startup
if (typeof window !== 'undefined') {
  applyDocumentLanguage(initialLang);

  i18n.on('languageChanged', (lng) => {
    const code = (lng as SupportedLanguage) || 'en';
    applyDocumentLanguage(code);
    try {
      localStorage.setItem(STORAGE_KEY, code);
    } catch {
      // Ignore localStorage write errors (e.g. incognito quota)
    }
  });
}

export default i18n;
