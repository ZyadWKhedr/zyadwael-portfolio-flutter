import React, { useState, useEffect } from 'react';
import { MapPin, Clock } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const TopBar: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [mounted, setMounted] = useState(false);
  const [timeString, setTimeString] = useState<string>('');

  useEffect(() => {
    setMounted(true);

    const updateClock = () => {
      try {
        const now = new Date();
        const formatted = new Intl.DateTimeFormat(i18n.language || 'en', {
          timeZone: 'Africa/Cairo',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        }).format(now);
        setTimeString(formatted);
      } catch (err) {
        // Fallback for edge cases
        const now = new Date();
        setTimeString(now.toLocaleTimeString('en-GB', { timeZone: 'Africa/Cairo', hour12: false }));
      }
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, [i18n.language]);

  return (
    <aside
      aria-label={t('topBar.localTimeLabel', 'Local time in Alexandria, Egypt')}
      className="w-full bg-surface-subtle/90 border-b border-border-subtle py-1.5 px-4 text-xs font-mono text-ink-muted backdrop-blur-md relative z-40 transition-colors duration-200"
    >
      <div className="container max-w-6xl mx-auto flex items-center justify-between gap-3 flex-wrap">
        {/* Left: Location & Alexandria Local Time */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-ink font-medium">
            <MapPin className="w-3.5 h-3.5 text-accent flex-shrink-0" aria-hidden="true" />
            <span>{t('topBar.location', 'Alexandria, Egypt')}</span>
            <span className="text-ink-muted text-[11px] opacity-75">({t('topBar.timezone', 'UTC+2 / EET')})</span>
          </div>

          <span className="text-border-subtle" aria-hidden="true">|</span>

          {/* Clock: dir="ltr" ensures standard HH:mm:ss ordering in both LTR and Arabic RTL */}
          <div 
            className="flex items-center gap-1.5 text-accent font-semibold"
            aria-live="off"
            aria-label={t('topBar.localTimeLabel', 'Local time in Alexandria, Egypt')}
          >
            <Clock className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true" />
            <span dir="ltr" className="tabular-nums tracking-wider">
              {mounted && timeString ? timeString : '--:--:--'}
            </span>
          </div>
        </div>

        {/* Right: Availability Status Badge */}
        <div className="hidden sm:flex items-center gap-2 text-ink-muted text-[11px]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="font-sans font-medium text-ink-subtle">
            {t('topBar.available', 'Available for Mobile Engineering Roles')}
          </span>
        </div>
      </div>
    </aside>
  );
};

export default TopBar;
