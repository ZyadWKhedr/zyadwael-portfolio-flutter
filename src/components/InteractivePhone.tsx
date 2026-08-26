import { useEffect, useRef, useState } from 'react';
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useSpring,
  useScroll,
  useTransform,
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
  ShoppingBag,
  Star,
  Github,
  Droplets,
} from 'lucide-react';
import TicTacToeGame from './TicTacToeGame';
import { trackEvent } from '@/lib/analytics';
import zyadAscii from '@/assets/zyad-ascii.png';

type AppId = 'home' | 'ttt' | 'stats' | 'ai' | 'reaction' | 'github' | 'fluid';

const haptic = (pattern: number | number[] = 12) => {
  if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
    try { navigator.vibrate(pattern); } catch { /* noop */ }
  }
};

const APPS: { id: Exclude<AppId, 'home'>; label: string; icon: any; bg: string }[] = [
  { id: 'ttt',      label: 'Tic Tac Toe', icon: Gamepad2,     bg: 'from-flutter-blue to-flutter-light-blue' },
  { id: 'reaction', label: 'Reflex',       icon: Zap,          bg: 'from-amber-500 to-rose-500' },
  { id: 'stats',    label: 'Analytics',    icon: BarChart3,    bg: 'from-emerald-500 to-flutter-teal' },
  { id: 'ai',       label: 'Ask AI',       icon: Bot,          bg: 'from-flutter-purple to-flutter-blue' },
  { id: 'github',   label: 'GitHub',       icon: Github,       bg: 'from-zinc-800 to-zinc-950' },
  { id: 'fluid',    label: 'Physics',      icon: Droplets,     bg: 'from-blue-500 to-emerald-500' },
];

const InteractivePhone = () => {
  const prefersReduced = useReducedMotion();
  const isTouch = typeof window !== 'undefined' && window.matchMedia('(hover: none), (pointer: coarse)').matches;
  const wrapRef = useRef<HTMLDivElement>(null);
  const [app, setApp] = useState<AppId>('home');
  const [time, setTime] = useState(() => new Date());

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 30_000);
    return () => clearInterval(t);
  }, []);

  // Subtle scroll float only — no tilt, no drag
  const { scrollYProgress } = useScroll({ target: wrapRef, offset: ['start end', 'end start'] });
  const scrollFloat = useSpring(useTransform(scrollYProgress, [0, 1], [20, -20]), {
    stiffness: 60, damping: 18,
  });

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
    const btn = document.querySelector('[aria-label="Open AI assistant"]') as HTMLButtonElement | null;
    btn?.click();
  };

  const clock = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div
      ref={wrapRef}
      className="relative select-none"
    >
      <motion.div
        style={{
          y: prefersReduced ? 0 : scrollFloat,
        }}
        className="relative w-[280px] h-[580px] will-change-transform"
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
                {app === 'home' && <HomeScreen key="home" onOpen={openApp} time={time} />}
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
                {app === 'github' && (
                  <AppFrame key="github" title="GitHub" onBack={goHome}>
                    <GithubApp />
                  </AppFrame>
                )}
                {app === 'fluid' && (
                  <AppFrame key="fluid" title="Physics Sandbox" onBack={goHome}>
                    <FluidSandbox />
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

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 1, 0] }}
        transition={{ duration: 4, delay: 1, repeat: Infinity, repeatDelay: 6 }}
        className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-widest text-flutter-light-blue/70"
      >
        Tap an app
      </motion.div>
    </div>
  );
};

/* ---------- Sub-screens ---------- */

const HomeScreen = ({ onOpen, time }: { onOpen: (id: AppId) => void; time: Date }) => {
  const timeString = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
  const dateString = time.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.25 }}
      className="flex-1 px-5 flex flex-col pt-1"
    >
      {/* Time and Date Widget */}
      <div className="text-center mb-3 space-y-0.5">
        <div className="text-[34px] font-light tracking-tight text-white leading-none">
          {timeString}
        </div>
        <div className="text-[9px] font-bold text-flutter-light-blue/90 uppercase tracking-wider">
          {dateString}
        </div>
      </div>

      {/* Weather Widget */}
      <div className="mb-4 rounded-2xl p-2.5 bg-white/[0.04] border border-white/5 flex items-center justify-between overflow-hidden relative group">
        <div className="flex items-center gap-2 relative z-10">
          <motion.div
            animate={{ 
              rotate: 360,
            }}
            transition={{
              repeat: Infinity,
              duration: 12,
              ease: "linear"
            }}
            className="h-8 w-8 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-500/30 text-sm select-none"
          >
            ☀️
          </motion.div>
          <div>
            <div className="text-[9px] text-gray-400 font-medium">Alexandria, Egypt</div>
            <div className="text-[10px] text-white font-semibold flex items-center gap-1">
              Sunny & Clear 
              <motion.span 
                animate={{ opacity: [0.4, 1, 0.4] }} 
                transition={{ repeat: Infinity, duration: 2 }}
                className="inline-block h-1.5 w-1.5 rounded-full bg-amber-400"
              />
            </div>
          </div>
        </div>
        <div className="text-right relative z-10">
          <div className="text-lg font-bold text-white leading-none">31°C</div>
          <div className="text-[7px] text-gray-400 mt-0.5">H: 33° L: 26°</div>
        </div>
        {/* Soft background glow pulse */}
        <motion.div 
          animate={{ opacity: [0.02, 0.08, 0.02] }}
          transition={{ repeat: Infinity, duration: 4 }}
          className="absolute -right-4 -bottom-4 w-16 h-16 rounded-full bg-amber-400 blur-xl pointer-events-none"
        />
      </div>

      {/* Apps Grid */}
      <div className="grid grid-cols-2 gap-3">
        {APPS.map((a, i) => (
          <motion.button
            key={a.id}
            onClick={() => onOpen(a.id)}
            whileTap={{ scale: 0.9 }}
            whileHover={{ y: -2 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 * i }}
            className="flex flex-col items-center gap-1"
          >
            <div className={`h-14 w-14 rounded-2xl bg-gradient-to-br ${a.bg} flex items-center justify-center shadow-md shadow-black/40 border border-white/10`}>
              <a.icon className="h-6 w-6 text-white" />
            </div>
            <span className="text-[9px] font-medium text-white/80">{a.label}</span>
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
        <div className="mt-1 text-[10px] text-white/90 leading-snug">
          Available for new mobile & AI projects this month.
        </div>
      </motion.div>
    </motion.div>
  );
};

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

const GithubApp = () => {
  return (
    <div className="px-4 pb-6 space-y-4 text-left">
      {/* Profile Header */}
      <div className="flex items-center gap-3">
        <div className="h-9 w-9 rounded-xl bg-flutter-gradient flex items-center justify-center shrink-0">
          <Github className="h-5 w-5 text-white" />
        </div>
        <div>
          <div className="text-xs font-bold text-white">ZyadWKhedr</div>
          <div className="text-[9px] text-gray-400">Software Engineer | Flutter Developer</div>
        </div>
      </div>

      {/* ASCII Image */}
      <div className="flex justify-center">
        <div className="relative w-full aspect-[3/4] max-h-52 rounded-xl overflow-hidden border border-white/10 bg-zinc-950 p-2 flex items-center justify-center shadow-inner">
          <img src={zyadAscii} alt="ASCII Portrait" className="w-full h-full object-contain" />
        </div>
      </div>

      {/* whoami Section */}
      <div className="space-y-1">
        <div className="text-[9px] uppercase tracking-wider text-flutter-light-blue font-bold flex items-center gap-1">
          <span>&gt;</span> whoami
        </div>
        <div className="rounded-xl p-2.5 bg-black/60 border border-white/10 font-mono text-[8px] text-gray-300 leading-normal overflow-x-auto whitespace-pre">
{`class ZyadWael extends FlutterDeveloper {
  final String location = "Alexandria, Egypt 🇪🇬";
  final String focus    = "Mobile · AI · Clean Arch";
  final bool available  = true;

  List<String> get building => [
    "AI-powered Flutter ecosystems",
    "Cross-platform responsive designs"
  ];
}`}
        </div>
      </div>

      {/* Skills Section */}
      <div className="space-y-1">
        <div className="text-[9px] uppercase tracking-wider text-flutter-teal font-bold">
          &gt; skills --list
        </div>
        <div className="grid grid-cols-2 gap-1.5">
          {[
            { cat: 'Mobile', items: 'Flutter · Dart · Swift' },
            { cat: 'AI & ML', items: 'Gemini · ML Kit · OpenCV' },
            { cat: 'Architecture', items: 'Clean Arch · Riverpod' },
            { cat: 'Backend/DB', items: 'Supabase · Firebase · SQL' },
          ].map((s) => (
            <div key={s.cat} className="rounded-lg p-1.5 bg-white/[0.04] border border-white/5">
              <div className="text-[8px] font-bold text-white/80">{s.cat}</div>
              <div className="text-[7px] text-gray-400 mt-0.5">{s.items}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Articles Section */}
      <div className="space-y-1">
        <div className="text-[9px] uppercase tracking-wider text-flutter-purple font-bold">
          &gt; cat articles.md
        </div>
        <div className="space-y-1">
          {[
            {
              title: "Your Flutter App Is Lying to You",
              url: "https://blog.stackademic.com/your-flutter-app-is-lying-to-you-and-you-dont-even-know-it-1c50ee4b17ef?gi=48cf46825f2b"
            },
            {
              title: "Design Patterns in Dart & Flutter",
              url: "https://medium.com/stackademic/software-craftsmanship-a-guide-to-design-patterns-in-dart-flutter-6011cb0f1b12"
            },
            {
              title: "Dependency Injection in Riverpod",
              url: "https://medium.com/@ziad.w.khedr/dependency-injection-in-flutter-using-riverpod-1118b7784893"
            },
          ].map((a) => (
            <a
              key={a.title}
              href={a.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between rounded-lg p-1.5 bg-white/[0.04] border border-white/5 hover:bg-white/[0.08] transition-colors text-[8px] text-white/90"
            >
              <span className="truncate pr-2">📝 {a.title}</span>
              <span className="text-flutter-light-blue shrink-0">➜</span>
            </a>
          ))}
        </div>
      </div>

      {/* Connect Section */}
      <div className="space-y-1">
        <div className="text-[9px] uppercase tracking-wider text-amber-400 font-bold">
          &gt; connect
        </div>
        <div className="flex gap-2">
          {[
            { label: 'GitHub', url: 'https://github.com/ZyadWKhedr' },
            { label: 'LinkedIn', url: 'https://www.linkedin.com/in/zyad-wael-a9035a275/' },
            { label: 'Medium', url: 'https://medium.com/@ziad.w.khedr' },
          ].map((link) => (
            <a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center py-1 rounded-lg bg-flutter-gradient text-white text-[8px] font-bold shadow-md hover:opacity-90 transition-opacity"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

const FluidSandbox = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = canvas.width = canvas.offsetWidth || 240;
    let height = canvas.height = canvas.offsetHeight || 220;

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;
    }

    const particles: Particle[] = [];
    const colors = ['#13B9FD', '#00D084', '#8B5CF6', '#FF6B6B', '#FFCA28'];

    const resize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth || 240;
      height = canvas.height = canvas.offsetHeight || 220;
    };
    window.addEventListener('resize', resize);

    const gravity = 0.15;
    const friction = 0.99;
    const bounce = -0.65;
    let mouse = { x: -1000, y: -1000, active: false };

    const handlePointerDown = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };

    const handlePointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      if (mouse.active) {
        for (let i = 0; i < 2; i++) {
          particles.push({
            x: mouse.x + (Math.random() - 0.5) * 6,
            y: mouse.y + (Math.random() - 0.5) * 6,
            vx: (Math.random() - 0.5) * 5,
            vy: (Math.random() - 0.5) * 5 - 1.5,
            radius: Math.random() * 3 + 2.5,
            color: colors[Math.floor(Math.random() * colors.length)],
          });
        }
      }
    };

    const handlePointerUp = () => {
      mouse.active = false;
    };

    canvas.addEventListener('pointerdown', handlePointerDown);
    canvas.addEventListener('pointermove', handlePointerMove);
    canvas.addEventListener('pointerup', handlePointerUp);
    canvas.addEventListener('pointerleave', handlePointerUp);

    for (let i = 0; i < 35; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * (height / 2),
        vx: (Math.random() - 0.5) * 2,
        vy: Math.random() * 1.5,
        radius: Math.random() * 3 + 2.5,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    const render = () => {
      ctx.fillStyle = 'rgba(10, 14, 39, 0.25)';
      ctx.fillRect(0, 0, width, height);

      particles.forEach((p) => {
        p.vy += gravity;
        p.vx *= friction;
        p.vy *= friction;
        p.x += p.vx;
        p.y += p.vy;

        if (mouse.active) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 45) {
            const force = (45 - dist) / 45;
            const angle = Math.atan2(dy, dx);
            p.vx += Math.cos(angle) * force * 1.6;
            p.vy += Math.sin(angle) * force * 1.6;
          }
        }

        if (p.x + p.radius > width) {
          p.x = width - p.radius;
          p.vx *= bounce;
        } else if (p.x - p.radius < 0) {
          p.x = p.radius;
          p.vx *= bounce;
        }

        if (p.y + p.radius > height) {
          p.y = height - p.radius;
          p.vy *= bounce;
          p.vx *= 0.85;
        } else if (p.y - p.radius < 0) {
          p.y = p.radius;
          p.vy *= bounce;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 3;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      if (particles.length > 100) {
        particles.splice(0, particles.length - 100);
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
      if (canvas) {
        canvas.removeEventListener('pointerdown', handlePointerDown);
        canvas.removeEventListener('pointermove', handlePointerMove);
        canvas.removeEventListener('pointerup', handlePointerUp);
        canvas.removeEventListener('pointerleave', handlePointerUp);
      }
    };
  }, []);

  return (
    <div className="w-full h-full relative overflow-hidden bg-[#0A0E27] flex flex-col">
      <div className="absolute top-2 left-2 text-[8px] uppercase tracking-wider text-flutter-light-blue bg-black/40 px-2 py-0.5 rounded-full border border-white/5 pointer-events-none z-10">
        Physics Active
      </div>
      <canvas ref={canvasRef} className="w-full h-[180px] cursor-crosshair touch-none" />
      <div className="p-3 flex flex-col justify-end bg-black/40 border-t border-white/5 text-left space-y-1">
        <div className="text-[10px] font-bold text-white">Liquid Sandbox</div>
        <div className="text-[8px] text-gray-400 leading-snug">
          Drag/tap on screen to spawn & repel colorful fluid particles. Uses Verlet particle integration physics.
        </div>
      </div>
    </div>
  );
};

export default InteractivePhone;
