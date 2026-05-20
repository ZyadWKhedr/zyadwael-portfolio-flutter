import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Download, Mail, ArrowRight, Sparkles } from 'lucide-react';
import zyadProfile from '@/assets/zyad-profile.png';

const HeroSection = () => {
  const [currentSkill, setCurrentSkill] = useState(0);
  const skills = [
    'Flutter Developer',
    'Data Science Student',
    'AI Enthusiast',
    'Mobile Engineer',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSkill((prev) => (prev + 1) % skills.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const stats = [
    { value: '20+', label: 'Projects' },
    { value: '1+', label: 'Years exp.' },
    { value: '10+', label: 'Happy users' },
  ];

  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center relative overflow-hidden px-4 lg:px-8 pt-24 md:pt-20"
    >
      {/* Dotted background */}
      <div
        className="absolute inset-0 opacity-[0.15] pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle, hsl(var(--flutter-light-blue) / 0.4) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      {/* Ambient glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-flutter-blue/15 rounded-full animate-float blur-3xl" />
        <div className="absolute top-40 right-20 w-80 h-80 bg-flutter-teal/10 rounded-full animate-float delay-1000 blur-3xl" />
        <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-flutter-purple/15 rounded-full animate-float delay-2000 blur-3xl" />
      </div>

      {/* Corner brackets */}
      <div className="hidden md:block absolute top-24 left-8 w-10 h-10 border-l-2 border-t-2 border-flutter-light-blue/40 rounded-tl-md" />
      <div className="hidden md:block absolute top-24 right-8 w-10 h-10 border-r-2 border-t-2 border-flutter-light-blue/40 rounded-tr-md" />
      <div className="hidden md:block absolute bottom-8 left-8 w-10 h-10 border-l-2 border-b-2 border-flutter-light-blue/40 rounded-bl-md" />
      <div className="hidden md:block absolute bottom-8 right-8 w-10 h-10 border-r-2 border-b-2 border-flutter-light-blue/40 rounded-br-md" />

      <div className="container mx-auto relative z-10">
        <div className="grid md:grid-cols-2 items-center gap-10 md:gap-16">
          {/* Left side */}
          <div className="space-y-7 text-center md:text-left">
            {/* Welcome pill */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-flutter-light-blue/30"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-flutter-teal opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-flutter-teal" />
              </span>
              <Sparkles className="w-3.5 h-3.5 text-flutter-teal" />
              <span className="text-[11px] font-semibold tracking-[0.15em] uppercase text-flutter-light-blue">
                Welcome to my portfolio
              </span>
            </motion.div>

            {/* Heading */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="space-y-3"
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight">
                <span className="block text-white">Hi, I'm</span>
                <span className="block bg-gradient-to-r from-flutter-blue via-flutter-light-blue to-flutter-teal bg-clip-text text-transparent">
                  Zyad Wael
                </span>
              </h1>

              {/* Rotating subtitle with underline */}
              <div className="relative inline-block h-9 md:h-11 overflow-hidden">
                <motion.p
                  key={currentSkill}
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -30, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-2xl md:text-3xl font-semibold text-flutter-light-blue"
                >
                  {skills[currentSkill]}
                </motion.p>
                <span className="block h-[3px] w-16 md:w-24 mt-1 bg-gradient-to-r from-flutter-teal to-flutter-blue rounded-full" />
              </div>
            </motion.div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="text-base md:text-lg text-gray-400 leading-relaxed max-w-lg mx-auto md:mx-0"
            >
              I engineer scalable mobile & AI-powered solutions.<br className="hidden sm:block" />
              From architecture to deployment — I build with purpose.
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="flex items-center justify-center md:justify-start gap-6 md:gap-8 pt-2"
            >
              {stats.map((s, i) => (
                <div key={s.label} className={`${i > 0 ? 'pl-6 md:pl-8 border-l border-flutter-light-blue/15' : ''}`}>
                  <div className="text-2xl md:text-3xl font-bold bg-gradient-to-b from-white to-flutter-light-blue bg-clip-text text-transparent">
                    {s.value}
                  </div>
                  <div className="text-[11px] uppercase tracking-wider text-gray-500 mt-0.5">{s.label}</div>
                </div>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45 }}
              className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-2"
            >
              <Button
                size="lg"
                onClick={() => scrollTo('#projects')}
                className="group bg-flutter-gradient hover:scale-105 transition-all duration-300 text-white font-semibold px-6 py-5 rounded-full shadow-lg shadow-flutter-blue/30"
              >
                View My Work
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => scrollTo('#contact')}
                className="border-white/20 bg-white/5 backdrop-blur-sm hover:bg-white/10 text-white font-semibold px-6 py-5 rounded-full"
              >
                <Mail className="mr-2 h-4 w-4" />
                Contact Me
              </Button>
              <Button
                size="lg"
                variant="ghost"
                onClick={() =>
                  window.open(
                    'https://drive.google.com/file/d/1ICEIF6wW4eFgZpv2FzKn0ev8zo6XWMgi/view?usp=drive_link',
                    '_blank',
                  )
                }
                className="text-flutter-light-blue hover:bg-flutter-light-blue/10 rounded-full px-4"
              >
                <Download className="mr-2 h-4 w-4" />
                CV
              </Button>
            </motion.div>
          </div>

          {/* Right side — portrait card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 30 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative flex items-center justify-center"
          >
            <div className="relative w-[280px] h-[340px] md:w-[360px] md:h-[440px] lg:w-[400px] lg:h-[480px]">
              {/* Decorative offset frame */}
              <div className="absolute -top-4 -right-4 w-full h-full rounded-3xl border border-flutter-teal/30 bg-flutter-teal/5 backdrop-blur-sm" />
              <div className="absolute -bottom-4 -left-4 w-full h-full rounded-3xl border border-flutter-purple/30 bg-flutter-purple/5 backdrop-blur-sm" />

              {/* Image card */}
              <div className="relative w-full h-full rounded-3xl overflow-hidden border border-white/15 shadow-2xl shadow-flutter-blue/30 bg-gradient-to-br from-flutter-blue/30 to-flutter-purple/30">
                <img
                  src={zyadProfile}
                  alt="Zyad Wael"
                  className="w-full h-full object-cover object-top"
                />

                {/* Corner brackets inside */}
                <div className="absolute top-3 left-3 w-6 h-6 border-l-2 border-t-2 border-white/60" />
                <div className="absolute top-3 right-3 w-6 h-6 border-r-2 border-t-2 border-white/60" />
                <div className="absolute bottom-3 left-3 w-6 h-6 border-l-2 border-b-2 border-white/60" />
                <div className="absolute bottom-3 right-3 w-6 h-6 border-r-2 border-b-2 border-white/60" />
              </div>

              {/* Floating badges */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-4 left-2 md:-left-6 glass px-3 py-1.5 rounded-full border border-emerald-400/30 flex items-center gap-2"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                </span>
                <span className="text-[10px] font-bold tracking-wider uppercase text-white">Available</span>
              </motion.div>

              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
                className="absolute top-16 -right-3 md:-right-8 glass px-3 py-1.5 rounded-full border border-flutter-light-blue/40 flex items-center gap-1.5"
              >
                <span className="text-flutter-light-blue text-sm">◆</span>
                <span className="text-[11px] font-bold text-white">Flutter</span>
              </motion.div>

              <motion.div
                animate={{ y: [0, -7, 0] }}
                transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
                className="absolute bottom-20 -right-4 md:-right-10 glass px-3 py-1.5 rounded-full border border-flutter-teal/40 flex items-center gap-1.5"
              >
                <span className="text-flutter-teal text-sm">●</span>
                <span className="text-[11px] font-bold text-white">Dart</span>
              </motion.div>

              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
                className="absolute -bottom-3 left-4 md:left-8 glass px-3 py-1.5 rounded-full border border-flutter-purple/40 flex items-center gap-1.5"
              >
                <span className="text-flutter-purple text-sm">▲</span>
                <span className="text-[11px] font-bold text-white">1+ YEAR</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
