
import { motion } from 'framer-motion';

const FloatingParticles = () => {
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 1,
    duration: Math.random() * 20 + 15,
    delay: Math.random() * 10,
    opacity: Math.random() * 0.3 + 0.05,
  }));

  const lines = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    width: Math.random() * 150 + 50,
    duration: Math.random() * 30 + 20,
    delay: Math.random() * 15,
    rotation: Math.random() * 360,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Floating dots */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-flutter-light-blue"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
          }}
          animate={{
            y: [0, -80, 0],
            x: [0, Math.random() * 40 - 20, 0],
            opacity: [p.opacity, p.opacity * 2, p.opacity],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Subtle moving gradient lines */}
      {lines.map((l) => (
        <motion.div
          key={`line-${l.id}`}
          className="absolute h-px opacity-[0.06]"
          style={{
            left: `${l.x}%`,
            top: '50%',
            width: l.width,
            background: 'linear-gradient(90deg, transparent, #13B9FD, transparent)',
            transform: `rotate(${l.rotation}deg)`,
          }}
          animate={{
            y: ['-50vh', '50vh'],
            opacity: [0, 0.08, 0],
          }}
          transition={{
            duration: l.duration,
            repeat: Infinity,
            delay: l.delay,
            ease: 'linear',
          }}
        />
      ))}

      {/* Large ambient glow orbs */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(1,117,194,0.06) 0%, transparent 70%)',
          left: '-10%',
          top: '20%',
        }}
        animate={{ x: [0, 100, 0], y: [0, -50, 0] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(2,211,154,0.05) 0%, transparent 70%)',
          right: '-5%',
          top: '60%',
        }}
        animate={{ x: [0, -80, 0], y: [0, 60, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute w-[350px] h-[350px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(105,48,195,0.05) 0%, transparent 70%)',
          left: '50%',
          top: '10%',
        }}
        animate={{ x: [0, -60, 0], y: [0, 80, 0] }}
        transition={{ duration: 35, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
};

export default FloatingParticles;
