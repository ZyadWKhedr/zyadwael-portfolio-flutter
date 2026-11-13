import React, { useState } from 'react';
import { Compass, BookOpen, Clock, Bookmark, Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface NavItem {
  id: string;
  labelKey: string;
  defaultLabel: string;
  defaultDesc: string;
  descKey: string;
  icon: React.ComponentType<{ className?: string }>;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'explore', labelKey: 'explore', defaultLabel: 'Explore', descKey: 'descExplore', defaultDesc: 'Exploring Discoveries & Feeds', icon: Compass },
  { id: 'recitations', labelKey: 'recitations', defaultLabel: 'Recitations', descKey: 'descRecitations', defaultDesc: 'Listening to Audio Streams', icon: BookOpen },
  { id: 'prayer', labelKey: 'prayer', defaultLabel: 'Prayer', descKey: 'descPrayer', defaultDesc: 'Tracking Prayer Times', icon: Clock },
  { id: 'bookmarks', labelKey: 'bookmarks', defaultLabel: 'Bookmarks', descKey: 'descBookmarks', defaultDesc: 'Saved Verses & Notes', icon: Bookmark },
];

export const LiquidNavbarInteractive: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  const [activeIndex, setActiveIndex] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleSelect = (index: number) => {
    if (index === activeIndex) return;
    setIsAnimating(true);
    setActiveIndex(index);
    setTimeout(() => setIsAnimating(false), 450);
  };

  const getLabel = (item: NavItem) => {
    if (isArabic) {
      switch (item.id) {
        case 'explore': return 'استكشاف';
        case 'recitations': return 'تلاوات';
        case 'prayer': return 'الصلاة';
        case 'bookmarks': return 'المحفوظات';
      }
    }
    return item.defaultLabel;
  };

  const getDesc = (item: NavItem) => {
    if (isArabic) {
      switch (item.id) {
        case 'explore': return 'تصفح الخلاصات والمستجدات';
        case 'recitations': return 'الاستماع إلى البث الصوتي المباشر';
        case 'prayer': return 'متابعة مواقيت الصلاة والقبلة';
        case 'bookmarks': return 'الآيات والملاحظات المحفوظة';
      }
    }
    return item.defaultDesc;
  };

  const activeItem = NAV_ITEMS[activeIndex];

  return (
    <div className="w-full flex flex-col justify-between rounded-lg bg-surface/90 border border-border-subtle p-4 font-mono text-xs select-none">
      {/* Top Bar / Status */}
      <div className="flex items-center justify-between pb-3 border-b border-border-subtle text-[11px] text-ink-muted">
        <span className="flex items-center gap-1.5 text-accent font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{t('thingsIveBuilt.liquidNavbar.interactiveSandbox', 'Interactive Package Sandbox')}</span>
        </span>
        <span className="text-emerald-500 font-medium font-mono">pub.dev v2.0.7</span>
      </div>

      {/* Contained Mock Device Screen */}
      <div className="my-4 py-8 px-4 rounded-lg bg-canvas/60 border border-border-subtle/70 flex flex-col items-center justify-center text-center relative overflow-hidden min-h-[130px]">
        {/* Subtle Ambient Radial Glow */}
        <div
          className="absolute w-32 h-32 rounded-full bg-accent/10 blur-2xl pointer-events-none transition-all duration-500"
          style={{
            transform: `translateX(${(activeIndex - 1.5) * (isArabic ? -60 : 60)}px)`,
          }}
        />

        <div className="relative z-10 space-y-1">
          <div className="text-[10px] uppercase font-mono tracking-widest text-ink-muted">
            {t('thingsIveBuilt.liquidNavbar.activeDestination', 'Active Destination')}
          </div>
          <div className="font-display text-sm font-bold text-ink">
            {getLabel(activeItem)}
          </div>
          <div className="text-xs text-ink-secondary font-sans">
            {getDesc(activeItem)}
          </div>
        </div>
      </div>

      {/* Realistic Liquid Navigation Bar Container */}
      <div className="relative w-full h-14 rounded-full bg-elevated border border-border-strong px-1.5 flex items-center shadow-inner" dir={isArabic ? 'rtl' : 'ltr'}>
        {/* Dynamic Liquid Spring Indicator Pill */}
        <div
          className={`absolute top-1.5 bottom-1.5 rounded-full bg-accent shadow-md transition-all duration-400 ease-[cubic-bezier(0.34,1.56,0.64,1)] pointer-events-none ${
            isAnimating ? 'scale-x-110 scale-y-95 opacity-90' : 'scale-100 opacity-100'
          }`}
          style={{
            width: `calc(25% - 6px)`,
            [isArabic ? 'right' : 'left']: `calc(${activeIndex * 25}% + 3px)`,
          }}
        >
          {/* Subtle liquid refraction droplet highlight */}
          <div className="absolute top-1 left-1/2 -translate-x-1/2 w-6 h-1 rounded-full bg-white/40 blur-[0.5px]" />
        </div>

        {/* Navigation Items (Clickable) */}
        {NAV_ITEMS.map((item, idx) => {
          const Icon = item.icon;
          const isActive = idx === activeIndex;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => handleSelect(idx)}
              className={`relative z-10 flex-1 h-full flex flex-col items-center justify-center transition-colors duration-200 cursor-pointer ${
                isActive ? 'text-accent-fg font-bold' : 'text-ink-muted hover:text-ink'
              }`}
              aria-label={`Select ${getLabel(item)} tab`}
            >
              <Icon className={`w-4 h-4 transition-transform duration-200 ${isActive ? 'scale-110' : 'scale-95'}`} />
              <span className="text-[10px] mt-0.5 leading-none tracking-tight">
                {getLabel(item)}
              </span>
            </button>
          );
        })}
      </div>

      {/* Instruction Note */}
      <div className="mt-3 text-center text-[10px] text-ink-muted font-sans">
        {t('thingsIveBuilt.liquidNavbar.testWave', 'Tap any icon to test the liquid spring glide animation.')}
      </div>
    </div>
  );
};

export default LiquidNavbarInteractive;
