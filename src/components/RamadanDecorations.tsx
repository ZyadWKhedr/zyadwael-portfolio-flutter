
import { motion } from 'framer-motion';

const RAMADAN_START = new Date('2026-02-20'); // Ramadan 2026 start
const RAMADAN_END = new Date(RAMADAN_START.getTime() + 30 * 24 * 60 * 60 * 1000);

export const isRamadan = () => {
  const now = new Date();
  return now >= RAMADAN_START && now <= RAMADAN_END;
};

const Star = ({ className, delay = 0 }: { className?: string; delay?: number }) => (
  <motion.div
    className={className}
    animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.1, 0.8] }}
    transition={{ duration: 2 + delay, repeat: Infinity, ease: 'easeInOut' }}
  >
    ✦
  </motion.div>
);

const Lantern = ({ className, delay = 0 }: { className?: string; delay?: number }) => (
  <motion.div
    className={`absolute text-2xl md:text-3xl ${className}`}
    animate={{ y: [0, -8, 0], rotate: [-3, 3, -3] }}
    transition={{ duration: 3 + delay, repeat: Infinity, ease: 'easeInOut' }}
  >
    🏮
  </motion.div>
);

const RamadanDecorations = () => {
  if (!isRamadan()) return null;

  return (
    <>
      {/* Floating crescent moon */}
      <motion.div
        className="fixed top-6 left-6 z-40 text-4xl md:text-5xl pointer-events-none select-none"
        animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.05, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      >
        🌙
      </motion.div>

      {/* Scattered stars */}
      <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden select-none">
        <Star className="absolute top-[8%] left-[15%] text-ramadan-gold text-xs" delay={0} />
        <Star className="absolute top-[12%] right-[20%] text-ramadan-gold text-sm" delay={0.5} />
        <Star className="absolute top-[25%] left-[8%] text-ramadan-gold/70 text-xs" delay={1} />
        <Star className="absolute top-[18%] right-[10%] text-ramadan-gold/50 text-[10px]" delay={1.5} />
        <Star className="absolute top-[5%] left-[45%] text-ramadan-gold/60 text-xs" delay={0.8} />
        <Star className="absolute top-[30%] right-[35%] text-ramadan-gold/40 text-[10px]" delay={2} />
      </div>

      {/* Lanterns */}
      <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden select-none">
        <Lantern className="top-2 right-[12%]" delay={0} />
        <Lantern className="top-0 left-[25%]" delay={1.2} />
        <Lantern className="top-4 right-[40%] hidden md:block" delay={0.6} />
      </div>
    </>
  );
};

export default RamadanDecorations;
