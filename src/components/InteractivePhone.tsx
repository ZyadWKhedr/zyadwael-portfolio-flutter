import { useEffect, useRef, useState } from 'react';
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useScroll,
  useTransform,
  type PanInfo,
} from 'framer-motion';
import {
  Gamepad2,
  BarChart3,
  Bot,
  Mail,
  Zap,
  Wifi,
  BatteryFull,
  ChevronLeft,
  Sparkles,
  Trophy,
  Target,
  Timer,
} from 'lucide-react';
import TicTacToeGame from './TicTacToeGame';
import { trackEvent } from '@/lib/analytics';

type AppId = 'home' | 'ttt' | 'stats' | 'ai' | 'reaction';

const haptic = (pattern: number | number[] = 12) => {
  if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
    try { navigator.vibrate(pattern); } catch { /* noop */ }
  }
};

const APPS: { id: Exclude<AppId, 'home'>; label: string; icon: any; bg: string }[] = [
  { id: 'ttt',      label: 'Tic Tac Toe', icon: Gamepad2, bg: 'from-flutter-blue to-flutter-light-blue' },
  { id: 'reaction', label: 'Reflex',       icon: Zap,      bg: 'from-amber-500 to-rose-500' },
  { id: 'stats',    label: 'Analytics',    icon: BarChart3,bg: 'from-emerald-500 to-flutter-teal' },
  { id: 'ai',       label: 'Ask AI',       icon: Bot,      bg: 'from-flutter-purple to-flutter-blue' },
];

const InteractivePhone = () => {
  const prefersReduced = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);
  const [app, setApp] = useState<AppId>('home');
  const [time, setTime] = useState(() => new Date());

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 30_000);
    return () => clearInterval(t);
  }, []);

  // Drag tilt
  const rotY = useMotionValue(-8);
  const rotX = useMotionValue(4);
  const springY = useSpring(rotY, { stiffness: 120, damping: 14, mass: 0.5 });
  const springX = useSpring(rotX, { stiffness: 120, damping: 14, mass: 0.5 });

  // Scroll parallax (mobile-friendly)
  const { scrollYProgress } = useScroll({ target: wrapRef, offset: ['start end', 'end start'] });
  const scrollFloat = useSpring(useTransform(scrollYProgress, [0, 1], [30, -30]), {
    stiffness: 60, damping: 18,
  });

  const onPan = (_: unknown, info: PanInfo) => {
    if (prefersReduced) return;
    rotY.set(Math.max(-25, Math.min(25, -8 + info.offset.x * 0.15)));
    rotX.set(Math.max(-20, Math.min(20, 4 - info.offset.y * 0.12)));
  };
  const onPanEnd = () => {
    rotY.set(-8);
    rotX.set(4);
    haptic(8);
  };

  // Pointer tilt for fine desktop hover
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (prefersReduced || e.pointerType === 'touch') return;
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    rotY.set(px * 22 - 4);
    rotX.set(-py * 16);
  };

  const openApp = (id: AppId) => {
    haptic([8, 30, 14]);
    setApp(id);
    trackEvent('phone_app_open', { app: id });
  };

  const goHome = () => {
    haptic(10);
    setApp('home');
  };

  const goContact = () => {
    haptic(15);
    trackEvent('phone_route_contact', {});
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const openAiAssistant = () => {
    haptic(15);
    trackEvent('phone_open_ai_assistant', {});
    // Try clicking the floating launcher
    const btn = document.querySelector('[aria-label="Open AI assistant"]') as HTMLButtonElement | null;
    btn?.click();
  };

  const clock = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div
      ref={wrapRef}
      className="relative select-none"
      style={{ perspective: 1400 }}
    >
      <motion.div
        drag={!prefersReduced}
        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
        dragElastic={0.18}
        onPan={onPan}
        onPanEnd={onPanEnd}
        onPointerMove={onPointerMove}
        onPointerLeave={onPanEnd}
        style={{
          rotateY: springY,
          rotateX: springX,
          y: prefersReduced ? 0 : scrollFloat,
          transformStyle: 'preserve-3d',
          touchAction: 'pan-y',
        }}
        className="relative w-[280px] h-[580px] cursor-grab active:cursor-grabbing will-change-transform"
      >
        {/* Floor glow */}
        <div
          className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-3/4 h-12 rounded-full blur-2xl bg-flutter-purple/40"
          style={{ transform: 'rotateX(80deg) translateZ(-30px)' }}
        />

        {/* Phone frame */}
        <div className="absolute inset-0 rounded-[3rem] bg-gradient-to-br from-zinc-800 via-zinc-900 to-black border border-white/10 p-3 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.7),0_0_60px_-10px_rgba(19,185,253,0.35)]">
          {/* Side highlight */}
          <div className="absolute inset-y-10 left-0 w-[2px] bg-gradient-to-b from-white/30 via-white/5 to-transparent rounded-full" />
          <div className="absolute -left-[3px] top-24 h-6 w-[3px] rounded-l bg-zinc-700" />
          <div className="absolute -left-[3px] top-36 h-12 w-[3px] rounded-l bg-zinc-700" />
          <div className="absolute -right-[3px] top-32 h-14 w-[3px] rounded-r bg-zinc-700" />

          {/* Screen */}
          <div className="relative w-full h-full rounded-[2.3rem] bg-gradient-to-b from-[#0A0E27] via-[#101535] to-[#0A0E27] overflow-hidden border border-white/5">
            {/* Dynamic island */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 h-6 w-24 rounded-full bg-black z-20" />

            {/* Status bar */}
            <div className="absolute top-0 inset-x-0 h-9 flex items-center justify-between px-6 text-[10px] font-semibold text-white/80 z-10">
              <span>{clock}</span>
              <div className="flex items-center gap-1.5">
                <Wifi className="h-3 w-3" />
                <BatteryFull className="h-3.5 w-3.5" />
              </div>
            </div>

            {/* App surface */}
            <div className="absolute inset-0 pt-10 pb-6 flex flex-col">
              <AnimatePresence mode="wait">
                {app === 'home' && <HomeScreen key="home" onOpen={openApp} />}
                {app === 'ttt' && (
                  <AppFrame key="ttt" title="Tic Tac Toe" onBack={goHome}>
                    <div className="px-4"><TicTacToeGame /></div>
                  </AppFrame>
                )}
                {app === 'reaction' && (
                  <AppFrame key="reaction" title="Reflex" onBack={goHome}>
                    <ReactionGame />
                  </AppFrame>
                )}
                {app === 'stats' && (
                  <AppFrame key="stats" title="Analytics" onBack={goHome}>
                    <StatsApp onContact={goContact} />
                  </AppFrame>
                )}
                {app === 'ai' && (
                  <AppFrame key="ai" title="Ask AI" onBack={goHome}>
                    <AiApp onOpenChat={openAiAssistant} />
                  </AppFrame>
                )}
              </AnimatePresence>
            </div>

            {/* Home indicator */}
            <button
              onClick={app === 'home' ? undefined : goHome}
              aria-label="Home"
              className="absolute bottom-1.5 left-1/2 -translate-x-1/2 h-1 w-24 rounded-full bg-white/70 hover:bg-white transition-colors z-20"
            />

            {/* Screen sheen */}
            <motion.div
              animate={{ x: ['-120%', '220%'] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', repeatDelay: 2 }}
              className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/8 to-transparent skew-x-12 pointer-events-none"
            />
          </div>
        </div>
      </motion.div>

      {/* Drag hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 1, 0] }}
        transition={{ duration: 4, delay: 1, repeat: Infinity, repeatDelay: 6 }}
        className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-widest text-flutter-light-blue/70"
      >
        Drag · Tap apps
      </motion.div>
    </div>
  );
};

/* ---------- Sub-screens ---------- */

const HomeScreen = ({ onOpen }: { onOpen: (id: AppId) => void }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.96 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.96 }}
    transition={{ duration: 0.25 }}
    className="flex-1 px-6 flex flex-col"
  >
    <div className="text-center mb-5">
      <div className="text-[10px] uppercase tracking-[0.2em] text-flutter-light-blue/70">Zyad OS</div>
      <div className="text-xs text-white/60 mt-1">Pick an app</div>
    </div>
    <div className="grid grid-cols-2 gap-4">
      {APPS.map((a, i) => (
        <motion.button
          key={a.id}
          onClick={() => onOpen(a.id)}
          whileTap={{ scale: 0.9 }}
          whileHover={{ y: -2 }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 * i }}
          className="flex flex-col items-center gap-1.5"
        >
          <div className={`h-16 w-16 rounded-2xl bg-gradient-to-br ${a.bg} flex items-center justify-center shadow-lg shadow-black/40 border border-white/15`}>
            <a.icon className="h-7 w-7 text-white" />
          </div>
          <span className="text-[10px] font-medium text-white/85">{a.label}</span>
        </motion.button>
      ))}
    </div>

    {/* Widget */}
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="mt-auto mb-2 rounded-2xl p-3 bg-white/[0.06] border border-white/10"
    >
      <div className="flex items-center gap-2 text-[10px] text-flutter-light-blue uppercase tracking-wider">
        <Sparkles className="h-3 w-3" /> Live
      </div>
      <div className="mt-1 text-[11px] text-white/90 leading-snug">
        Available for new mobile & AI projects this month.
      </div>
    </motion.div>
  </motion.div>
);

const AppFrame = ({
  title, onBack, children,
}: { title: string; onBack: () => void; children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, scale: 1.04 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.96 }}
    transition={{ duration: 0.22 }}
    className="flex-1 flex flex-col overflow-hidden"
  >
    <div className="px-3 pb-2 flex items-center gap-2">
      <button
        onClick={onBack}
        className="flex items-center gap-0.5 text-flutter-light-blue text-xs font-medium hover:opacity-80"
      >
        <ChevronLeft className="h-4 w-4" /> Back
      </button>
      <div className="flex-1 text-center text-xs font-semibold text-white/90 -ml-10">{title}</div>
    </div>
    <div className="flex-1 overflow-y-auto scrollbar-hide">{children}</div>
  </motion.div>
);

const StatsApp = ({ onContact }: { onContact: () => void }) => {
  const bars = [62, 78, 55, 90, 70, 95, 82];
  return (
    <div className="px-4 space-y-3">
      <div className="grid grid-cols-2 gap-2">
        {[
          { l: 'Apps shipped', v: '20+', i: Trophy, c: 'text-flutter-light-blue' },
          { l: 'AI features',  v: '12',  i: Sparkles,c: 'text-flutter-purple' },
          { l: 'Avg rating',   v: '4.8', i: Target, c: 'text-emerald-400' },
          { l: 'Years',        v: '1+',  i: Timer,  c: 'text-amber-400' },
        ].map((s) => (
          <div key={s.l} className="rounded-xl p-2.5 bg-white/[0.05] border border-white/10">
            <s.i className={`h-3.5 w-3.5 ${s.c}`} />
            <div className="text-lg font-bold text-white leading-none mt-1">{s.v}</div>
            <div className="text-[9px] uppercase tracking-wider text-gray-400 mt-0.5">{s.l}</div>
          </div>
        ))}
      </div>
      <div className="rounded-xl p-3 bg-white/[0.05] border border-white/10">
        <div className="text-[10px] uppercase tracking-wider text-gray-400 mb-2">Velocity · 7w</div>
        <div className="flex items-end gap-1.5 h-20">
          {bars.map((h, i) => (
            <motion.div
              key={i}
              initial={{ height: 0 }}
              animate={{ height: `${h}%` }}
              transition={{ delay: i * 0.06, type: 'spring', stiffness: 120, damping: 14 }}
              className="flex-1 rounded-sm bg-gradient-to-t from-flutter-blue to-flutter-light-blue"
            />
          ))}
        </div>
      </div>
      <button
        onClick={onContact}
        className="w-full rounded-xl py-2.5 bg-flutter-gradient text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-lg shadow-flutter-blue/30"
      >
        <Mail className="h-3.5 w-3.5" /> Start a project
      </button>
    </div>
  );
};

const AiApp = ({ onOpenChat }: { onOpenChat: () => void }) => (
  <div className="px-4 space-y-3">
    <div className="rounded-xl p-3 bg-gradient-to-br from-flutter-purple/30 to-flutter-blue/20 border border-flutter-purple/40">
      <div className="flex items-center gap-2 mb-1.5">
        <Bot className="h-4 w-4 text-flutter-purple" />
        <span className="text-[10px] font-bold uppercase tracking-wider text-white">Zyad AI</span>
      </div>
      <p className="text-[11px] text-white/90 leading-snug">
        Ask anything about Zyad's work — projects, tech stack, pricing, or fit for your idea.
      </p>
    </div>
    {[
      "What kind of apps does he build?",
      "Has he integrated Gemini before?",
      "I have a project — connect me.",
    ].map((q) => (
      <button
        key={q}
        onClick={onOpenChat}
        className="w-full text-left rounded-xl p-2.5 bg-white/[0.05] border border-white/10 text-[11px] text-white/85 hover:bg-white/[0.08] transition-colors"
      >
        {q}
      </button>
    ))}
    <button
      onClick={onOpenChat}
      className="w-full rounded-xl py-2.5 bg-flutter-gradient text-white text-xs font-semibold flex items-center justify-center gap-2"
    >
      <Sparkles className="h-3.5 w-3.5" /> Open chat
    </button>
  </div>
);

const ReactionGame = () => {
  const [state, setState] = useState<'idle' | 'waiting' | 'go' | 'done' | 'early'>('idle');
  const [ms, setMs] = useState<number>(0);
  const [best, setBest] = useState<number>(() => {
    const v = Number(localStorage.getItem('reflex-best') || 0);
    return Number.isFinite(v) ? v : 0;
  });
  const startRef = useRef(0);
  const tRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const start = () => {
    haptic(8);
    setState('waiting');
    const delay = 800 + Math.random() * 2200;
    tRef.current = setTimeout(() => {
      startRef.current = performance.now();
      setState('go');
      haptic(20);
    }, delay);
  };

  const tap = () => {
    if (state === 'waiting') {
      if (tRef.current) clearTimeout(tRef.current);
      setState('early');
      haptic([20, 40, 20]);
      return;
    }
    if (state === 'go') {
      const took = Math.round(performance.now() - startRef.current);
      setMs(took);
      setState('done');
      haptic([15, 30, 30]);
      if (!best || took < best) {
        setBest(took);
        try { localStorage.setItem('reflex-best', String(took)); } catch { /* noop */ }
      }
      return;
    }
    start();
  };

  useEffect(() => () => { if (tRef.current) clearTimeout(tRef.current); }, []);

  const color =
    state === 'go' ? 'from-emerald-500 to-emerald-400' :
    state === 'waiting' ? 'from-rose-600 to-rose-500' :
    state === 'early' ? 'from-amber-500 to-rose-500' :
    'from-flutter-blue to-flutter-light-blue';

  const label =
    state === 'idle' ? 'Tap to start' :
    state === 'waiting' ? 'Wait for green…' :
    state === 'go' ? 'TAP NOW!' :
    state === 'early' ? 'Too early — tap to retry' :
    `${ms} ms — tap to retry`;

  return (
    <div className="px-4 flex flex-col items-center gap-3">
      <div className="w-full flex justify-between text-[10px] uppercase tracking-wider text-gray-400">
        <span>Last: <span className="text-white">{ms ? `${ms} ms` : '—'}</span></span>
        <span>Best: <span className="text-flutter-teal">{best ? `${best} ms` : '—'}</span></span>
      </div>
      <motion.button
        whileTap={{ scale: 0.94 }}
        onClick={tap}
        className={`mt-1 h-44 w-44 rounded-full bg-gradient-to-br ${color} text-white font-bold text-sm shadow-2xl border border-white/20`}
      >
        {label}
      </motion.button>
      <p className="text-[10px] text-gray-400 text-center max-w-[220px] leading-snug">
        Mobile devs ship snappy UIs. How snappy are you?
      </p>
    </div>
  );
};

export default InteractivePhone;
