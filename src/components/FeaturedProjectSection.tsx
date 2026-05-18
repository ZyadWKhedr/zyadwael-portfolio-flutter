import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import TicTacToeGame from './TicTacToeGame';
import { AnimatedSection } from './AnimatedSection';

const tags = ['Flutter', 'Dart', 'AI', 'Material 3', 'MinMax Algorithm'];

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
      {/* Soft glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-flutter-blue/10 rounded-full blur-3xl pointer-events-none" />

      <AnimatedSection className="container mx-auto relative">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-flutter-blue/10 border border-flutter-blue/20 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-flutter-light-blue" />
            <span className="text-xs uppercase tracking-widest text-flutter-light-blue font-medium">
              Featured Project
            </span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-white">
            Try it. <span className="text-flutter-teal">Live.</span>
          </h2>
          <p className="text-gray-400 mt-3 max-w-xl mx-auto">
            A real, playable demo embedded right in the page — not a screenshot.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-6xl mx-auto">
          {/* Phone mockup */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="flex justify-center"
          >
            <div className="relative">
              {/* Phone frame */}
              <div className="relative w-[280px] h-[580px] rounded-[3rem] bg-gradient-to-b from-gray-800 to-gray-900 p-3 shadow-2xl shadow-flutter-blue/30 border border-white/10">
                {/* Screen */}
                <div className="relative w-full h-full rounded-[2.3rem] bg-gradient-to-b from-flutter-dark-blue via-[#0a1628] to-flutter-dark-blue overflow-hidden border border-white/5">
                  {/* Notch */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-gray-900 rounded-b-2xl z-10" />

                  {/* App content */}
                  <div className="pt-10 pb-6 px-6 h-full flex flex-col justify-center">
                    <TicTacToeGame />
                  </div>
                </div>
              </div>

              {/* Reflection */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-flutter-teal/20 via-transparent to-flutter-purple/20 rounded-[3.5rem] blur-2xl -z-10" />
            </div>
          </motion.div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.15 }}
            className="space-y-6"
          >
            <h3 className="text-3xl lg:text-4xl font-bold text-white leading-tight">
              Tic Tac Toe vs. an{' '}
              <span className="bg-gradient-to-r from-flutter-light-blue to-flutter-teal bg-clip-text text-transparent">
                Unbeatable AI
              </span>
            </h3>

            <p className="text-gray-300 leading-relaxed">
              A polished Flutter game built around the classic <span className="text-flutter-light-blue font-medium">MinMax</span> algorithm.
              The AI evaluates every possible future move to choose the optimal play — meaning the best you can do is draw.
              Rendered here as a real interactive demo with smooth state transitions and tactile animations.
            </p>

            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 text-xs font-medium rounded-lg border border-white/10 bg-white/5 text-flutter-light-blue backdrop-blur-sm"
                >
                  {tag}
                </span>
              ))}
            </div>

            <ul className="space-y-2 text-sm text-gray-400">
              {[
                'Recursive MinMax with full game-tree search',
                'Real-time game state with win-line highlighting',
                'Spring animations & haptic-feel interactions',
                'Material 3 design language',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-flutter-teal mt-1">▹</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </AnimatedSection>
    </section>
  );
};

export default FeaturedProjectSection;
