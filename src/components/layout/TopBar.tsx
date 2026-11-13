import React, { useState, useEffect } from 'react';
import { MapPin, Clock } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const getCairoTime = (): string => {
  try {
    return new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Africa/Cairo',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    }).format(new Date());
  } catch {
    const d = new Date();
    const utc = d.getTime() + d.getTimezoneOffset() * 60000;
    const cairo = new Date(utc + 2 * 3600000);
    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${pad(cairo.getHours())}:${pad(cairo.getMinutes())}:${pad(cairo.getSeconds())}`;
  }
};

export const TopBar: React.FC = () => {
  const { t } = useTranslation();
  const [timeString, setTimeString] = useState<string>(getCairoTime);

  useEffect(() => {
    const update = () => setTimeString(getCairoTime());
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <aside
      aria-label={t('topBar.localTimeLabel', 'Local time in Alexandria, Egypt')}
      className="w-full bg-surface border-b border-border-subtle py-2 px-5 text-xs font-mono text-ink-muted relative z-40 transition-colors duration-200"
    >
      <div className="container max-w-site mx-auto flex items-center justify-between gap-3 flex-wrap">
        {/* Left: Location & Alexandria Local Time */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-ink font-medium">
            <MapPin className="w-3.5 h-3.5 text-accent shrink-0" aria-hidden="true" />
            <span>{t('topBar.location', 'Alexandria, Egypt')}</span>
            <span className="text-ink-muted text-[11px] opacity-75">{t('topBar.timezone', '(UTC+2 / EET)')}</span>
          </div>

          <span className="text-border-subtle" aria-hidden="true">·</span>

          {/* Clock: dir="ltr" ensures standard HH:mm:ss ordering */}
          <div
            className="flex items-center gap-1.5 text-accent font-semibold"
            aria-live="off"
            aria-label={t('topBar.localTimeLabel', 'Local Alexandria 24-hour time')}
          >
            <Clock className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
            <span dir="ltr" className="tabular-nums tracking-wider">
              {timeString}
            </span>
          </div>
        </div>

        {/* Right: Availability Status */}
        <div className="flex items-center gap-2 text-ink-muted text-[11px]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
          </span>
          <span className="font-sans font-medium text-ink-secondary">
            {t('topBar.available', 'Available for Mobile & AI Engineering')}
          </span>
        </div>
      </div>
    </aside>
  );
};

export default TopBar;
