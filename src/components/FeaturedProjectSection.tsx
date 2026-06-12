import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import InteractivePhone from './InteractivePhone';
import { AnimatedSection } from './AnimatedSection';

const tags = ['Flutter', 'Dart', 'AI', 'Material 3', 'Interactive 3D'];

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
            <InteractivePhone />
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
              A live iPhone, built in{' '}
              <span className="bg-gradient-to-r from-flutter-light-blue to-flutter-teal bg-clip-text text-transparent">
                React
              </span>
              .
            </h3>

            <p className="text-gray-300 leading-relaxed">
              This isn't a screenshot — it's a real, draggable phone. Tilt it with your finger,
              open apps from the home screen, play an unbeatable <span className="text-flutter-light-blue font-medium">Tic Tac Toe</span> AI,
              test your reflexes, or jump straight into chatting with my AI assistant.
              It's a taste of how I think about mobile UX.
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
                'Drag to tilt · scroll parallax · haptic feedback',
                'Multiple in-phone apps: games, analytics, AI',
                'Unbeatable MinMax Tic Tac Toe inside',
                'Reflex test — try to beat your best ms',
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
