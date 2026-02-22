
import { motion } from 'framer-motion';
import { isRamadan } from './RamadanDecorations';

const RamadanBanner = () => {
  if (!isRamadan()) return null;

  const ramadanStart = new Date('2026-02-20');
  const now = new Date();
  const dayNumber = Math.min(30, Math.ceil((now.getTime() - ramadanStart.getTime()) / (24 * 60 * 60 * 1000)));

  return (
    <motion.div
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 glass-strong px-6 py-3 rounded-full border border-ramadan-gold/30 bg-ramadan-deep/80 backdrop-blur-xl shadow-lg shadow-ramadan-gold/10"
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1.5, duration: 0.8, type: 'spring' }}
    >
      <p className="text-sm md:text-base font-semibold text-center">
        <span className="text-ramadan-gold">🌙</span>{' '}
        <span className="bg-gradient-to-r from-ramadan-gold to-ramadan-amber bg-clip-text text-transparent">
          Ramadan Mubarak
        </span>{' '}
        <span className="text-muted-foreground">— Day {dayNumber} of 30</span>{' '}
        <span className="text-ramadan-gold">✦</span>
      </p>
    </motion.div>
  );
};

export default RamadanBanner;
