
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const SectionDivider = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <div ref={ref} className="flex items-center justify-center py-4">
      <motion.div
        className="flex items-center gap-3"
        initial={{ opacity: 0, scaleX: 0 }}
        animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <div className="h-px w-16 md:w-32 bg-gradient-to-r from-transparent to-flutter-blue/40" />
        <motion.div
          className="w-2 h-2 rounded-full bg-flutter-light-blue/60"
          animate={{ scale: [1, 1.5, 1], opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <div className="h-px w-8 md:w-16 bg-flutter-teal/30" />
        <motion.div
          className="w-1.5 h-1.5 rounded-full bg-flutter-teal/60"
          animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
        />
        <div className="h-px w-16 md:w-32 bg-gradient-to-l from-transparent to-flutter-purple/40" />
      </motion.div>
    </div>
  );
};

export default SectionDivider;
