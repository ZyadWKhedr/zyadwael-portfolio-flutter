import React, { createContext, useContext, useState, useEffect } from 'react';
import enTranslations from '@/i18n/en.json';
import arTranslations from '@/i18n/ar.json';

export type Language = 'en' | 'ar';
export type Theme = 'dark' | 'light';

interface AppContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
  theme: Theme;
  toggleTheme: () => void;
  t: (keyPath: string) => string;
  isAr: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('portfolio_lang');
      if (saved === 'en' || saved === 'ar') return saved;
      if (navigator.language.startsWith('ar')) return 'ar';
    }
    return 'en';
  });

  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('portfolio_theme');
      if (saved === 'dark' || saved === 'light') return saved;
      if (window.matchMedia('(prefers-color-scheme: light)').matches) return 'light';
    }
    return 'dark';
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    localStorage.setItem('portfolio_lang', lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';

    document.title =
      lang === 'ar'
        ? 'زياد وائل — مطور تطبيقات هواتف فلاتر'
        : 'Zyad Wael — Flutter Mobile Developer';
  }, [lang]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    localStorage.setItem('portfolio_theme', theme);
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
    }
  }, [theme]);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
  };

  const toggleLang = () => {
    setLangState((prev) => (prev === 'en' ? 'ar' : 'en'));
  };

  const toggleTheme = () => {
    setThemeState((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const t = (keyPath: string): string => {
    const dict = lang === 'ar' ? arTranslations : enTranslations;
    const parts = keyPath.split('.');
    let current: any = dict;
    for (const part of parts) {
      if (current && typeof current === 'object' && part in current) {
        current = current[part];
      } else {
        return keyPath;
      }
    }
    return typeof current === 'string' ? current : keyPath;
  };

  return (
    <AppContext.Provider
      value={{
        lang,
        setLang,
        toggleLang,
        theme,
        toggleTheme,
        t,
        isAr: lang === 'ar',
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
