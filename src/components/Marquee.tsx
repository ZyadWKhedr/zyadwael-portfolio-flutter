import { motion } from 'framer-motion';
import { ReactNode, useState } from 'react';

interface MarqueeProps {
  children: ReactNode;
  /** seconds for one full loop */
  duration?: number;
  /** gap between items in px */
  gap?: number;
  className?: string;
}

/**
 * Infinite auto-scrolling horizontal marquee.
 * Duplicates children once and animates -50% so the loop is seamless.
 * Pauses on hover.
 */
const Marquee = ({ children, duration = 40, gap = 24, className = '' }: MarqueeProps) => {
  const [paused, setPaused] = useState(false);

  return (
    <div
      className={`overflow-hidden ${className}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
      onTouchEnd={() => setPaused(false)}
    >
      <motion.div
        className="flex w-max"
        style={{ gap }}
        animate={{ x: paused ? undefined : ['0%', '-50%'] }}
        transition={{
          duration,
          ease: 'linear',
          repeat: Infinity,
        }}
      >
        <div className="flex shrink-0" style={{ gap }}>
          {children}
        </div>
        <div className="flex shrink-0" aria-hidden="true" style={{ gap }}>
          {children}
        </div>
      </motion.div>
    </div>
  );
};

export default Marquee;
