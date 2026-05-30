import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import TicTacToeGame from './TicTacToeGame';
import SnakeGame from './SnakeGame';
import PhoneFrame from './PhoneFrame';
import { AnimatedSection } from './AnimatedSection';

const tags = ['Flutter', 'Dart', 'AI', 'Material 3', 'MinMax Algorithm', 'Supabase'];

const FeaturedProjectSection = () => {
  return (
    <section className="relative py-20 px-4 lg:px-8 overflow-hidden">
      {/* Dotted grid background */}
      <div
        className="absolute inset-0 opacity-[0.15] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, hsl(var(--flutter-light-blue)) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-flutter-blue/10 rounded-full blur-3xl pointer-events-none" />

      <AnimatedSection className="container mx-auto relative">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-flutter-blue/10 border border-flutter-blue/20 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-flutter-light-blue" />
            <span className="text-xs uppercase tracking-widest text-flutter-light-blue font-medium">
              Featured Projects
            </span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-white">
            Try them. <span className="text-flutter-teal">Live.</span>
          </h2>
          <p className="text-gray-400 mt-3 max-w-xl mx-auto">
            Two real Flutter-inspired games, embedded right here — stats are saved globally.
          </p>
        </div>

        {/* Two phones side by side */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-20 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <PhoneFrame accent="blue" label="Tic Tac Toe">
              <TicTacToeGame />
            </PhoneFrame>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.15 }}
          >
            <PhoneFrame accent="teal" label="Snake">
              <SnakeGame />
            </PhoneFrame>
          </motion.div>
        </div>

        {/* Details below */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
          className="max-w-3xl mx-auto text-center space-y-6"
        >
          <h3 className="text-3xl lg:text-4xl font-bold text-white leading-tight">
            Play vs. an{' '}
            <span className="bg-gradient-to-r from-flutter-light-blue to-flutter-teal bg-clip-text text-transparent">
              Unbeatable AI
            </span>
          </h3>

          <p className="text-gray-300 leading-relaxed">
            <span className="text-flutter-light-blue font-medium">Tic Tac Toe</span> powered by the MinMax algorithm,
            and a smooth <span className="text-flutter-teal font-medium">Snake</span> classic.
            Every play is saved globally — your stats follow you across devices and visits.
          </p>

          <div className="flex flex-wrap gap-2 justify-center">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1.5 text-xs font-medium rounded-lg border border-white/10 bg-white/5 text-flutter-light-blue backdrop-blur-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      </AnimatedSection>
    </section>
  );
};

export default FeaturedProjectSection;
