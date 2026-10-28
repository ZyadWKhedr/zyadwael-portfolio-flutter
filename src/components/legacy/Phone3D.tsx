import { useRef } from 'react';
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import { Smartphone, Brain, Zap, Sparkles } from 'lucide-react';

/**
 * Pure CSS-3D animated phone mockup.
 * - Idle float + rotation loop.
 * - Pointer-driven tilt (desktop hover).
 * - Scroll-driven parallax tilt (works on mobile without expensive listeners).
 * - Respects prefers-reduced-motion.
 */
type Props = {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
};

const SIZES = {
  sm: { w: 140, h: 280, scale: 0.85 },
  md: { w: 200, h: 400, scale: 1 },
  lg: { w: 240, h: 480, scale: 1 },
};

const Phone3D = ({ className = '', size = 'md' }: Props) => {
  const s = SIZES[size];
  const wrapRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  // Pointer tilt (desktop) — raw values, smoothed with springs
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const tiltY = useSpring(pointerX, { stiffness: 120, damping: 18, mass: 0.4 });
  const tiltX = useSpring(pointerY, { stiffness: 120, damping: 18, mass: 0.4 });

  // Scroll parallax — uses passive scroll listener inside framer-motion.
  // Tracks the phone's offset within the viewport.
  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ['start end', 'end start'],
  });
  const scrollTiltY = useTransform(scrollYProgress, [0, 1], [-18, 18]);
  const scrollFloatY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const smoothScrollTiltY = useSpring(scrollTiltY, { stiffness: 80, damping: 20 });
  const smoothScrollFloatY = useSpring(scrollFloatY, { stiffness: 60, damping: 20 });

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (prefersReduced || e.pointerType === 'touch') return;
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5; // -0.5..0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    pointerX.set(px * 30); // rotateY
    pointerY.set(-py * 20); // rotateX
  };

  const handlePointerLeave = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  return (
    <div
      ref={wrapRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={`relative ${className}`}
      style={{ perspective: '1400px', width: s.w, height: s.h }}
      aria-hidden="true"
    >
      <motion.div
        initial={{ rotateY: -15, rotateX: 6 }}
        animate={
          prefersReduced
            ? undefined
            : {
                rotateY: [-15, -5, -15],
                rotateX: [6, -2, 6],
              }
        }
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          transformStyle: 'preserve-3d',
          width: s.w,
          height: s.h,
          rotateY: prefersReduced ? 0 : (tiltY as unknown as number),
          rotateX: prefersReduced ? 0 : (tiltX as unknown as number),
          y: prefersReduced ? 0 : (smoothScrollFloatY as unknown as number),
        }}
        className="relative will-change-transform"
      >
        {/* Inner layer carries scroll-driven extra rotation (additive) */}
        <motion.div
          style={{
            transformStyle: 'preserve-3d',
            width: '100%',
            height: '100%',
            rotateY: prefersReduced ? 0 : (smoothScrollTiltY as unknown as number),
          }}
          className="relative"
        >

        {/* Soft floor glow */}
        <div
          className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-3/4 h-10 rounded-full blur-2xl bg-flutter-purple/40"
          style={{ transform: 'rotateX(80deg) translateZ(-30px)' }}
        />

        {/* Phone frame */}
        <div
          className="absolute inset-0 rounded-[2.2rem] bg-gradient-to-br from-zinc-800 via-zinc-900 to-black border border-white/15 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.7),0_0_40px_-10px_rgba(19,185,253,0.4)]"
          style={{ transform: 'translateZ(0)' }}
        >
          {/* Side highlight */}
          <div className="absolute inset-y-6 left-0 w-[2px] bg-gradient-to-b from-white/30 to-transparent rounded-full" />

          {/* Volume / power buttons */}
          <div className="absolute -left-[3px] top-20 h-6 w-[3px] rounded-l bg-zinc-700" />
          <div className="absolute -left-[3px] top-32 h-10 w-[3px] rounded-l bg-zinc-700" />
          <div className="absolute -right-[3px] top-28 h-12 w-[3px] rounded-r bg-zinc-700" />

          {/* Screen */}
          <div className="absolute inset-[8px] rounded-[1.8rem] overflow-hidden bg-gradient-to-br from-[#0A0E27] via-[#1A1B3A] to-[#2D3561]">
            {/* Dynamic island */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 h-5 w-20 rounded-full bg-black z-20" />

            {/* App content */}
            <div className="absolute inset-0 pt-10 px-3 flex flex-col gap-2">
              {/* App header */}
              <div className="flex items-center justify-between">
                <div className="text-[9px] font-bold text-white/90 tracking-wider">
                  ZW · APP
                </div>
                <div className="flex gap-1">
                  <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <div className="h-1.5 w-1.5 rounded-full bg-flutter-light-blue" />
                </div>
              </div>

              {/* AI card */}
              <motion.div
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                className="rounded-xl p-2 bg-gradient-to-br from-flutter-purple/40 to-flutter-blue/30 border border-flutter-purple/50"
              >
                <div className="flex items-center gap-1.5">
                  <Brain className="h-3 w-3 text-flutter-purple" />
                  <span className="text-[8px] font-bold text-white tracking-wider">
                    AI ASSISTANT
                  </span>
                </div>
                <div className="mt-1 h-1 w-3/4 rounded-full bg-white/30" />
                <div className="mt-1 h-1 w-1/2 rounded-full bg-white/20" />
              </motion.div>

              {/* Stat tiles */}
              <div className="grid grid-cols-2 gap-1.5">
                <motion.div
                  animate={{ scale: [1, 1.04, 1] }}
                  transition={{ duration: 2.8, repeat: Infinity, delay: 0.2 }}
                  className="rounded-lg p-1.5 bg-white/5 border border-white/10"
                >
                  <Zap className="h-2.5 w-2.5 text-flutter-teal" />
                  <div className="mt-0.5 text-[9px] font-bold text-white">60fps</div>
                </motion.div>
                <motion.div
                  animate={{ scale: [1, 1.04, 1] }}
                  transition={{ duration: 2.8, repeat: Infinity, delay: 0.6 }}
                  className="rounded-lg p-1.5 bg-white/5 border border-white/10"
                >
                  <Sparkles className="h-2.5 w-2.5 text-flutter-light-blue" />
                  <div className="mt-0.5 text-[9px] font-bold text-white">Native</div>
                </motion.div>
              </div>

              {/* Chart-like rows */}
              <div className="rounded-lg p-2 bg-white/5 border border-white/10 flex-1">
                <div className="flex items-end justify-between h-full gap-1">
                  {[40, 65, 35, 80, 55, 95, 70].map((h, i) => (
                    <motion.div
                      key={i}
                      animate={{ height: [`${h}%`, `${Math.min(100, h + 15)}%`, `${h}%`] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.15,
                        ease: 'easeInOut',
                      }}
                      className="flex-1 rounded-sm bg-gradient-to-t from-flutter-blue to-flutter-light-blue"
                    />
                  ))}
                </div>
              </div>

              {/* Bottom nav */}
              <div className="flex items-center justify-around py-1.5 rounded-xl bg-white/5 border border-white/10">
                <Smartphone className="h-3 w-3 text-flutter-light-blue" />
                <Brain className="h-3 w-3 text-white/50" />
                <Zap className="h-3 w-3 text-white/50" />
                <Sparkles className="h-3 w-3 text-white/50" />
              </div>
            </div>

            {/* Screen sheen */}
            <motion.div
              animate={{ x: ['-120%', '220%'] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', repeatDelay: 1.5 }}
              className="absolute top-0 bottom-0 w-1/3 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 pointer-events-none"
            />
          </div>
        </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Phone3D;
