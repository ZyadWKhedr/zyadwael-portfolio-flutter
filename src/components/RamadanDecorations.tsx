
import { motion } from 'framer-motion';

const RAMADAN_START = new Date('2026-02-20');
const RAMADAN_END = new Date(RAMADAN_START.getTime() + 30 * 24 * 60 * 60 * 1000);

export const isRamadan = () => {
  const now = new Date();
  return now >= RAMADAN_START && now <= RAMADAN_END;
};

const Star = ({ className, delay = 0, size = 'text-xs' }: { className?: string; delay?: number; size?: string }) => (
  <motion.div
    className={`${size} ${className}`}
    animate={{ opacity: [0.2, 1, 0.2], scale: [0.7, 1.2, 0.7] }}
    transition={{ duration: 2.5 + delay, repeat: Infinity, ease: 'easeInOut' }}
  >
    ✦
  </motion.div>
);

const Lantern = ({ className, delay = 0, size = 'text-2xl md:text-3xl' }: { className?: string; delay?: number; size?: string }) => (
  <motion.div
    className={`absolute ${size} ${className}`}
    initial={{ y: -40, opacity: 0 }}
    animate={{ y: [0, -10, 0], rotate: [-4, 4, -4], opacity: 1 }}
    transition={{ y: { duration: 3.5 + delay, repeat: Infinity, ease: 'easeInOut' }, rotate: { duration: 4 + delay, repeat: Infinity, ease: 'easeInOut' }, opacity: { duration: 1 } }}
  >
    🏮
  </motion.div>
);

/** Ornamental Islamic-style divider using CSS */
export const RamadanDivider = () => {
  if (!isRamadan()) return null;
  return (
    <div className="flex items-center justify-center gap-3 my-8 select-none">
      <div className="h-px w-16 bg-gradient-to-r from-transparent to-ramadan-gold/40" />
      <span className="text-ramadan-gold/60 text-lg">✦</span>
      <span className="text-ramadan-gold/40 text-sm">☪</span>
      <span className="text-ramadan-gold/60 text-lg">✦</span>
      <div className="h-px w-16 bg-gradient-to-l from-transparent to-ramadan-gold/40" />
    </div>
  );
};

/** Mosque silhouette at the bottom of the page */
const MosqueSilhouette = () => (
  <div className="fixed bottom-0 left-0 right-0 z-20 pointer-events-none select-none overflow-hidden">
    <svg
      viewBox="0 0 1440 120"
      className="w-full h-16 md:h-24 opacity-20"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="mosque-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#D4A017" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#D4A017" stopOpacity="0.1" />
        </linearGradient>
      </defs>
      {/* Mosque domes and minarets */}
      <path
        d="M0,120 L0,90 L60,90 L60,50 L65,30 L70,50 L70,70 
           Q120,30 170,70 L170,50 L175,30 L180,50 L180,90
           L300,90 Q360,40 420,90 L420,60 L425,35 L430,60 L430,90
           L550,90 L550,55 L555,25 L560,55 L560,75 Q610,35 660,75 L660,90
           L780,90 Q840,30 900,90 L900,55 L905,30 L910,55 L910,90
           L1020,90 L1020,60 L1025,35 L1030,60 L1030,75 Q1080,40 1130,75 L1130,90
           L1250,90 Q1310,45 1370,90 L1370,55 L1375,30 L1380,55 L1380,90
           L1440,90 L1440,120 Z"
        fill="url(#mosque-grad)"
      />
    </svg>
  </div>
);

/** Floating golden particles */
const GoldenParticles = () => (
  <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden select-none">
    {Array.from({ length: 12 }).map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-1 h-1 rounded-full bg-ramadan-gold/30"
        style={{
          left: `${8 + (i * 7.5)}%`,
          top: `${10 + (i % 4) * 22}%`,
        }}
        animate={{
          y: [0, -30, 0],
          opacity: [0.1, 0.5, 0.1],
        }}
        transition={{
          duration: 4 + (i % 3),
          repeat: Infinity,
          delay: i * 0.4,
          ease: 'easeInOut',
        }}
      />
    ))}
  </div>
);

const RamadanDecorations = () => {
  if (!isRamadan()) return null;

  return (
    <>
      {/* Floating crescent moon */}
      <motion.div
        className="fixed top-6 left-6 z-40 text-4xl md:text-5xl pointer-events-none select-none"
        animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      >
        🌙
      </motion.div>

      {/* Scattered stars — more of them */}
      <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden select-none">
        <Star className="absolute top-[6%] left-[12%] text-ramadan-gold" delay={0} size="text-xs" />
        <Star className="absolute top-[10%] right-[18%] text-ramadan-gold" delay={0.5} size="text-sm" />
        <Star className="absolute top-[22%] left-[6%] text-ramadan-gold/70" delay={1} size="text-xs" />
        <Star className="absolute top-[16%] right-[8%] text-ramadan-gold/50" delay={1.5} size="text-[10px]" />
        <Star className="absolute top-[4%] left-[42%] text-ramadan-gold/60" delay={0.8} size="text-xs" />
        <Star className="absolute top-[28%] right-[32%] text-ramadan-gold/40" delay={2} size="text-[10px]" />
        <Star className="absolute top-[14%] left-[55%] text-ramadan-amber/50" delay={0.3} size="text-xs" />
        <Star className="absolute top-[8%] right-[50%] text-ramadan-gold/30" delay={1.8} size="text-[10px]" />
        <Star className="absolute top-[20%] left-[75%] text-ramadan-amber/40" delay={1.2} size="text-xs" />
        <Star className="absolute top-[3%] left-[30%] text-ramadan-gold/50" delay={0.6} size="text-sm" />
        <Star className="absolute top-[35%] right-[15%] text-ramadan-gold/30" delay={2.2} size="text-[10px]" />
        <Star className="absolute top-[32%] left-[88%] text-ramadan-amber/40" delay={1.6} size="text-xs" />
      </div>

      {/* Lanterns */}
      <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden select-none">
        <Lantern className="top-2 right-[10%]" delay={0} />
        <Lantern className="top-0 left-[22%]" delay={1.2} />
        <Lantern className="top-4 right-[38%] hidden md:block" delay={0.6} />
        <Lantern className="top-1 left-[65%] hidden lg:block" delay={0.9} size="text-xl md:text-2xl" />
        <Lantern className="top-3 right-[60%] hidden lg:block" delay={1.5} size="text-xl md:text-2xl" />
      </div>

      {/* Golden floating particles */}
      <GoldenParticles />

      {/* Mosque silhouette at bottom */}
      <MosqueSilhouette />

  {/* Ornamental top border glow */}
      <div className="fixed top-0 left-0 right-0 h-px z-40 pointer-events-none bg-gradient-to-r from-transparent via-ramadan-gold/40 to-transparent" />
    </>
  );
};

export default RamadanDecorations;
