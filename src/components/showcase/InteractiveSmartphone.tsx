import React, { useState, useEffect } from 'react';
import {
  Wifi,
  BatteryCharging,
  ChevronLeft,
  ExternalLink,
  Apple,
  Play,
  Code2,
  Sparkles,
  MapPin,
  Clock,
  Layers,
  CheckCircle2,
  Smartphone,
  Mail,
  User,
  BookOpen,
  ArrowRight,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { MobileAppItem } from '@/types/mobileShowcase';
import { getAssetUrl } from '@/lib/utils';

interface InteractiveSmartphoneProps {
  apps: MobileAppItem[];
  activeAppId: string | null;
  onSelectApp: (appId: string | null) => void;
}

export const InteractiveSmartphone: React.FC<InteractiveSmartphoneProps> = ({
  apps,
  activeAppId,
  onSelectApp,
}) => {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === 'ar';
  const [activeScreenIndex, setActiveScreenIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState('9:41');

  // Interactive micro-states inside phone demos
  const [wofoodiGrade, setWofoodiGrade] = useState<'91' | '95' | 'diesel'>('91');
  const [amoomyCategory, setAmoomyCategory] = useState<'heavy' | 'flatbed' | 'crane'>('heavy');
  const [ravalQty, setRavalQty] = useState(2);
  const [ufuqCounter, setUfuqCounter] = useState(33);
  const [ufuqRadioPlaying, setUfuqRadioPlaying] = useState(true);

  const activeApp = apps.find((a) => a.id === activeAppId) || null;

  useEffect(() => {
    // Reset screen index on app change
    setActiveScreenIndex(0);
  }, [activeAppId]);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  const triggerHaptic = () => {
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate(10);
      } catch {
        // Safe fallback
      }
    }
  };

  const handleOpenApp = (id: string) => {
    triggerHaptic();
    onSelectApp(id);
  };

  const handleBackHome = () => {
    triggerHaptic();
    onSelectApp(null);
  };

  // 4 Primary apps for the bottom dock
  const dockApps = apps.filter((a) => ['amoomy', 'ufuq', 'wofoodi', 'raval'].includes(a.id));

  return (
    <div className="relative mx-auto select-none transition-all duration-300">
      {/* Outer Smartphone Hardware Chassis */}
      <div className="relative w-[310px] sm:w-[350px] h-[670px] rounded-[50px] p-[10px] bg-gradient-to-b from-zinc-700 via-zinc-800 to-zinc-900 border-4 border-zinc-600/60 shadow-2xl shadow-black/50">
        {/* Hardware Side Buttons */}
        {/* Left Side: Mute Switch & Volume Up/Down */}
        <div className="absolute -start-[7px] top-[105px] w-[3px] h-[26px] bg-zinc-600 rounded-s-sm" />
        <div className="absolute -start-[7px] top-[145px] w-[3px] h-[45px] bg-zinc-600 rounded-s-sm" />
        <div className="absolute -start-[7px] top-[200px] w-[3px] h-[45px] bg-zinc-600 rounded-s-sm" />
        {/* Right Side: Power Button */}
        <div className="absolute -end-[7px] top-[160px] w-[3px] h-[65px] bg-zinc-600 rounded-e-sm" />

        {/* Inner Screen Bezel */}
        <div className="relative w-full h-full rounded-[40px] bg-zinc-950 overflow-hidden flex flex-col justify-between border border-zinc-800/80 text-white">
          {/* Subtle Screen Glare Reflection */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.03] to-transparent pointer-events-none z-40" />

          {/* Top Dynamic Island & Status Bar */}
          <div className="relative z-30 pt-2 px-5 pb-1 flex items-center justify-between text-[11px] font-mono text-zinc-300">
            {/* Clock */}
            <span className="font-semibold tracking-tight">{currentTime}</span>

            {/* Dynamic Island Pill */}
            <div className="w-[100px] h-[22px] bg-black rounded-full flex items-center justify-between px-2.5 shadow-inner border border-zinc-800/60">
              <span className="w-2.5 h-2.5 rounded-full bg-zinc-900 flex items-center justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-950" />
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-500/80 animate-pulse" />
            </div>

            {/* Cellular, Wi-Fi & Battery */}
            <div className="flex items-center gap-1.5 text-zinc-300">
              <span className="text-[9px] font-bold">5G</span>
              <Wifi className="w-3 h-3" />
              <div className="flex items-center gap-0.5">
                <BatteryCharging className="w-3.5 h-3.5 text-emerald-400" />
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* MAIN SCREEN VIEWPORT: HOME SCREEN OR APP PREVIEW */}
          {/* ========================================================================= */}
          <div className="relative flex-1 flex flex-col overflow-hidden z-20">
            {activeApp === null ? (
              /* ------------------------------------------------------------- */
              /* STATE A: SMARTPHONE HOME SCREEN */
              /* ------------------------------------------------------------- */
              <div className="flex-1 flex flex-col justify-between p-4 pt-2 animate-fade-in">
                {/* Upper Glance / Status Widget */}
                <div className="rounded-2xl p-3.5 bg-gradient-to-br from-zinc-800/90 to-zinc-900/90 border border-white/10 shadow-lg backdrop-blur-md text-start">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-accent font-semibold flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping" />
                      Flutter Engineer
                    </span>
                    <span className="text-[10px] font-mono text-zinc-400">Alexandria, EG</span>
                  </div>
                  <h4 className="font-serif text-sm font-bold text-white tracking-tight">
                    Zyad Wael · Mobile OS
                  </h4>
                  <p className="text-[11px] text-zinc-400 leading-snug mt-1 font-sans">
                    6+ Shipped Apps · 4+ Technical Articles · Tap an app icon below to explore.
                  </p>
                </div>

                {/* Main App Icons Grid (4 columns) */}
                <div className="grid grid-cols-4 gap-y-4 gap-x-2 my-auto px-1 py-2">
                  {apps.map((app) => (
                    <button
                      key={app.id}
                      type="button"
                      onClick={() => handleOpenApp(app.id)}
                      className="group flex flex-col items-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-xl p-1 transition-transform active:scale-90"
                      aria-label={`Open ${app.title} preview`}
                    >
                      {/* App Icon Container */}
                      <div className="relative w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-zinc-800 border border-white/15 p-1 shadow-md group-hover:scale-105 group-hover:border-accent transition-all duration-200 overflow-hidden flex items-center justify-center">
                        {app.icon ? (
                          <img
                            src={app.icon}
                            alt={`${app.title} icon`}
                            className="w-full h-full object-cover rounded-xl"
                            loading="lazy"
                          />
                        ) : (
                          <div className="w-full h-full rounded-xl bg-gradient-to-br from-accent/80 to-accent flex items-center justify-center text-white">
                            {app.id === 'contact' ? (
                              <Mail className="w-6 h-6" />
                            ) : (
                              <Sparkles className="w-6 h-6" />
                            )}
                          </div>
                        )}
                        {app.badge && (
                          <span className="absolute top-0.5 end-0.5 w-2 h-2 rounded-full bg-accent ring-1 ring-black" />
                        )}
                      </div>

                      {/* App Name Label */}
                      <span className="text-[10px] font-sans font-medium text-zinc-200 group-hover:text-white truncate max-w-[62px] text-center tracking-tight">
                        {isAr && app.arabicTitle ? app.arabicTitle.split(' - ')[0] : app.title}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Bottom Dock (Glassmorphism Pill) */}
                <div className="rounded-3xl bg-white/10 border border-white/15 p-2 backdrop-blur-md flex items-center justify-around shadow-lg">
                  {dockApps.map((dApp) => (
                    <button
                      key={dApp.id}
                      type="button"
                      onClick={() => handleOpenApp(dApp.id)}
                      className="w-11 h-11 rounded-xl bg-zinc-800 border border-white/10 p-0.5 shadow group hover:scale-110 active:scale-95 transition-transform overflow-hidden flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                      aria-label={`Launch ${dApp.title} from dock`}
                      title={dApp.title}
                    >
                      {dApp.icon ? (
                        <img
                          src={dApp.icon}
                          alt={dApp.title}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      ) : (
                        <Mail className="w-5 h-5 text-accent" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              /* ------------------------------------------------------------- */
              /* STATE B: ACTIVE APP PREVIEW INSIDE THE PHONE */
              /* ------------------------------------------------------------- */
              <div className="flex-1 flex flex-col justify-between p-3.5 bg-zinc-950 text-start animate-fade-in overflow-hidden">
                {/* In-App Navigation Bar */}
                <div className="flex items-center justify-between pb-2.5 border-b border-zinc-800">
                  <button
                    type="button"
                    onClick={handleBackHome}
                    className="touch-target inline-flex items-center gap-1 px-2.5 py-1 text-xs font-mono font-medium rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-700 transition-colors"
                    aria-label="Return to phone home screen"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                    <span>{isAr ? 'الرئيسية' : 'Home'}</span>
                  </button>

                  <div className="text-center truncate px-2">
                    <span className="text-xs font-bold text-white block truncate">
                      {isAr && activeApp.arabicTitle ? activeApp.arabicTitle : activeApp.title}
                    </span>
                    <span className="text-[9px] font-mono text-zinc-400 block truncate">
                      {isAr && activeApp.arabicCategory ? activeApp.arabicCategory : activeApp.category}
                    </span>
                  </div>

                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-accent/20 text-accent font-semibold border border-accent/30">
                    {isAr ? 'حي' : 'Live'}
                  </span>
                </div>

                {/* App Screen Carousel / Tabs */}
                {activeApp.screens.length > 1 && (
                  <div className="flex items-center gap-1.5 py-2 overflow-x-auto no-scrollbar">
                    {activeApp.screens.map((scr, sIdx) => (
                      <button
                        key={scr.id}
                        type="button"
                        onClick={() => {
                          triggerHaptic();
                          setActiveScreenIndex(sIdx);
                        }}
                        className={`touch-target px-2.5 py-1 text-[10px] font-mono rounded-md whitespace-nowrap transition-colors ${
                          activeScreenIndex === sIdx
                            ? 'bg-accent text-white font-semibold shadow-sm'
                            : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
                        }`}
                      >
                        {isAr && scr.arabicTitle ? scr.arabicTitle : scr.title}
                      </button>
                    ))}
                  </div>
                )}

                {/* Current Screen Preview Card */}
                {activeApp.screens[activeScreenIndex] && (
                  activeApp.screens[activeScreenIndex].image ? (
                    <div className="relative flex-1 my-1 rounded-2xl overflow-hidden border border-zinc-800 bg-black flex flex-col justify-between shadow-2xl group animate-fade-in">
                      {/* Real App Screenshot */}
                      <img
                        src={getAssetUrl(activeApp.screens[activeScreenIndex].image)}
                        alt={activeApp.screens[activeScreenIndex].title}
                        className="absolute inset-0 w-full h-full object-cover object-top"
                        loading="lazy"
                      />
                      {/* Gradient vignette */}
                      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black via-black/75 to-transparent pointer-events-none" />

                      {/* Top Action Pill */}
                      <div className="relative z-10 p-2.5 flex items-center justify-between">
                        <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-md text-emerald-400 font-bold border border-white/10 shadow">
                          Live iOS Screen
                        </span>
                        {activeApp.id === 'ufuq' && (
                          <button
                            type="button"
                            onClick={() => {
                              triggerHaptic();
                              setUfuqRadioPlaying(!ufuqRadioPlaying);
                            }}
                            className={`text-[9px] font-mono px-2 py-0.5 rounded-full backdrop-blur-md transition-colors ${
                              ufuqRadioPlaying
                                ? 'bg-emerald-600/90 text-white font-bold'
                                : 'bg-black/70 text-zinc-300'
                            }`}
                          >
                            {ufuqRadioPlaying ? '▶ Live FM 94.7' : '❚❚ Radio Muted'}
                          </button>
                        )}
                      </div>

                      {/* Bottom Floating Info Pill */}
                      <div className="relative z-10 p-3 pt-0 text-start flex items-end justify-between gap-2">
                        <div className="truncate">
                          <span className="text-xs font-serif font-bold text-white block truncate">
                            {isAr && activeApp.screens[activeScreenIndex].arabicTitle
                              ? activeApp.screens[activeScreenIndex].arabicTitle
                              : activeApp.screens[activeScreenIndex].title}
                          </span>
                          <span className="text-[10px] font-mono text-emerald-400 block truncate">
                            {isAr && activeApp.screens[activeScreenIndex].arabicSubtitle
                              ? activeApp.screens[activeScreenIndex].arabicSubtitle
                              : activeApp.screens[activeScreenIndex].subtitle}
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0">
                          {activeApp.links.appStore && (
                            <a
                              href={activeApp.links.appStore}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="touch-target inline-flex items-center gap-1 px-2.5 py-1 text-[10px] font-mono rounded bg-white text-zinc-950 font-bold hover:bg-zinc-200 transition-colors shadow"
                            >
                              <Apple className="w-3 h-3" />
                              <span>Store</span>
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex-1 my-1 p-3.5 rounded-2xl bg-zinc-900/90 border border-zinc-800 flex flex-col justify-between overflow-y-auto shadow-inner text-start">
                      <div>
                        {/* Screen Title & Subtitle */}
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[10px] font-mono text-accent font-semibold uppercase tracking-wider">
                            {isAr ? `شاشة 0${activeScreenIndex + 1}` : `Screen 0${activeScreenIndex + 1}`}
                          </span>
                          <span className="text-[10px] font-mono text-zinc-400">
                            {isAr && activeApp.screens[activeScreenIndex].arabicSubtitle
                              ? activeApp.screens[activeScreenIndex].arabicSubtitle
                              : activeApp.screens[activeScreenIndex].subtitle}
                          </span>
                        </div>

                        <h5 className="font-serif text-base font-bold text-white mb-1.5">
                          {isAr && activeApp.screens[activeScreenIndex].arabicTitle
                            ? activeApp.screens[activeScreenIndex].arabicTitle
                            : activeApp.screens[activeScreenIndex].title}
                        </h5>

                        <p className="text-xs text-zinc-300 leading-relaxed font-sans mb-3">
                          {isAr && activeApp.screens[activeScreenIndex].arabicFlow
                            ? activeApp.screens[activeScreenIndex].arabicFlow
                            : activeApp.screens[activeScreenIndex].flow}
                        </p>

                        {/* Interactive Micro-Demos inside preview */}
                        {activeApp.id === 'wofoodi' && (
                          <div className="p-2.5 rounded-xl bg-black/60 border border-zinc-800 mb-3 space-y-2">
                            <span className="text-[10px] font-mono text-zinc-400 block">
                              Select Grade to Simulate Radar:
                            </span>
                            <div className="grid grid-cols-3 gap-1.5">
                              {(['91', '95', 'diesel'] as const).map((g) => (
                                <button
                                  key={g}
                                  type="button"
                                  onClick={() => setWofoodiGrade(g)}
                                  className={`py-1 text-[10px] font-mono rounded uppercase font-semibold transition-colors ${
                                    wofoodiGrade === g
                                      ? 'bg-teal-600 text-white'
                                      : 'bg-zinc-800 text-zinc-400 hover:text-white'
                                  }`}
                                >
                                  {g}
                                </button>
                              ))}
                            </div>
                            <div className="text-[11px] font-mono text-teal-400 flex items-center justify-between pt-1">
                              <span>Aramco Station ({wofoodiGrade})</span>
                              <span>{wofoodiGrade === '91' ? '2.18 SAR/L' : wofoodiGrade === '95' ? '2.33 SAR/L' : '1.15 SAR/L'}</span>
                            </div>
                          </div>
                        )}

                        {activeApp.id === 'amoomy' && (
                          <div className="p-2.5 rounded-xl bg-black/60 border border-zinc-800 mb-3 space-y-2">
                            <span className="text-[10px] font-mono text-zinc-400 block">
                              Heavy Equipment Dispatch Queue:
                            </span>
                            <div className="grid grid-cols-3 gap-1.5">
                              {(['heavy', 'flatbed', 'crane'] as const).map((c) => (
                                <button
                                  key={c}
                                  type="button"
                                  onClick={() => setAmoomyCategory(c)}
                                  className={`py-1 text-[9px] font-mono rounded capitalize transition-colors ${
                                    amoomyCategory === c
                                      ? 'bg-orange-600 text-white font-semibold'
                                      : 'bg-zinc-800 text-zinc-400 hover:text-white'
                                  }`}
                                >
                                  {c}
                                </button>
                              ))}
                            </div>
                            <div className="text-[10px] font-mono text-orange-400 flex items-center justify-between pt-1">
                              <span>Bids Received: 4 Carriers</span>
                              <span>Verified Fleet</span>
                            </div>
                          </div>
                        )}

                        {activeApp.id === 'raval' && (
                          <div className="p-2.5 rounded-xl bg-black/60 border border-zinc-800 mb-3 flex items-center justify-between">
                            <div>
                              <span className="text-[10px] font-mono text-zinc-400 block">
                                Reactive Cart State
                              </span>
                              <span className="text-xs font-bold text-white">
                                Total: ${(ravalQty * 48).toFixed(2)}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                onClick={() => setRavalQty((q) => Math.max(1, q - 1))}
                                className="w-6 h-6 rounded bg-zinc-800 text-white font-bold text-xs"
                              >
                                -
                              </button>
                              <span className="font-mono text-xs text-white">{ravalQty}</span>
                              <button
                                type="button"
                                onClick={() => setRavalQty((q) => q + 1)}
                                className="w-6 h-6 rounded bg-zinc-800 text-white font-bold text-xs"
                              >
                                +
                              </button>
                            </div>
                          </div>
                        )}

                        {/* Feature Highlights Checklist */}
                        <div className="space-y-1.5 pt-1">
                          {(isAr && activeApp.screens[activeScreenIndex].arabicFeatures
                            ? activeApp.screens[activeScreenIndex].arabicFeatures
                            : activeApp.screens[activeScreenIndex].features
                          ).map((feat) => (
                            <div
                              key={feat}
                              className="flex items-center gap-2 text-[11px] font-mono text-zinc-300"
                            >
                              <CheckCircle2 className="w-3 h-3 text-accent shrink-0" />
                              <span>{feat}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Direct Store / Repository Action inside phone */}
                      <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between gap-2 mt-2">
                        <span className="text-[10px] font-mono text-zinc-400">
                          {isAr && activeApp.arabicMetrics ? activeApp.arabicMetrics[0] : activeApp.metrics[0]}
                        </span>

                        {activeApp.links.appStore && (
                          <a
                            href={activeApp.links.appStore}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="touch-target inline-flex items-center gap-1 px-2.5 py-1 text-[10px] font-mono rounded bg-white text-zinc-950 font-bold hover:bg-zinc-200 transition-colors"
                          >
                            <Apple className="w-3 h-3" />
                            <span>App Store</span>
                          </a>
                        )}

                        {activeApp.links.playStore && (
                          <a
                            href={activeApp.links.playStore}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="touch-target inline-flex items-center gap-1 px-2.5 py-1 text-[10px] font-mono rounded bg-white text-zinc-950 font-bold hover:bg-zinc-200 transition-colors"
                          >
                            <Play className="w-3 h-3" />
                            <span>Google Play</span>
                          </a>
                        )}

                        {activeApp.links.github &&
                          activeApp.links.github !== 'https://github.com/ZyadWKhedr' &&
                          !activeApp.links.github.endsWith('/ZyadWKhedr') && (
                            <a
                              href={activeApp.links.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="touch-target inline-flex items-center gap-1 px-2.5 py-1 text-[10px] font-mono rounded bg-white text-zinc-950 font-bold hover:bg-zinc-200 transition-colors"
                            >
                              <Code2 className="w-3 h-3" />
                              <span>{isAr ? 'الكود' : 'Source'}</span>
                            </a>
                        )}
                      </div>
                    </div>
                  )
                )}
              </div>
            )}
          </div>

          {/* ========================================================================= */}
          {/* BOTTOM HOME GESTURE INDICATOR BAR */}
          {/* ========================================================================= */}
          <div className="relative z-30 pb-2 pt-1 flex justify-center">
            <button
              type="button"
              onClick={handleBackHome}
              className="group py-2 px-6 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-full"
              aria-label="Swipe or tap home bar to return to home screen"
              title="Return to Home Screen"
            >
              <div className="w-28 h-1 bg-white/40 group-hover:bg-white rounded-full transition-all group-hover:w-32" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveSmartphone;
