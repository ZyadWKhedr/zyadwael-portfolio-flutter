import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Download, Mail, ArrowRight, Sparkles, Zap, Brain, Smartphone } from 'lucide-react';
import zyadProfile from '@/assets/zyad-profile.png';

import { trackEvent, AnalyticsEvents } from '@/lib/analytics';

const CV_URL =
  'https://drive.google.com/file/d/1ICEIF6wW4eFgZpv2FzKn0ev8zo6XWMgi/view?usp=drive_link';

const openCv = (location: string) => {
  trackEvent(AnalyticsEvents.CvDownload, { location });
  window.open(CV_URL, '_blank');
};

const HeroSection = () => {
  const [currentSkill, setCurrentSkill] = useState(0);
  const skills = ['Flutter Developer', 'AI Engineer', 'Mobile Architect', 'Problem Solver'];

  useEffect(() => {
    const id = setInterval(() => setCurrentSkill((p) => (p + 1) % skills.length), 2500);
    return () => clearInterval(id);
  }, []);

  const scrollTo = (href: string) =>
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center relative overflow-hidden px-4 lg:px-8 pt-24 md:pt-20 pb-12"
    >
      {/* Dotted background */}
      <div
        className="absolute inset-0 opacity-[0.18] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(19,185,253,0.5) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />
      {/* Ambient glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-flutter-blue/15 rounded-full animate-float blur-3xl" />
        <div className="absolute top-40 right-20 w-80 h-80 bg-flutter-teal/10 rounded-full animate-float delay-1000 blur-3xl" />
        <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-flutter-purple/15 rounded-full animate-float delay-2000 blur-3xl" />
      </div>

      <div className="container mx-auto relative z-10">
        {/* ────────────  MOBILE BENTO  ──────────── */}
        <div className="md:hidden grid grid-cols-4 auto-rows-[88px] gap-3">
          {/* Hero block — col-span-4 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="col-span-4 row-span-3 relative rounded-3xl overflow-hidden border border-white/10 bg-white/[0.03] backdrop-blur-xl p-5 flex gap-4"
          >
            <div className="relative shrink-0">
              <div className="absolute inset-0 rounded-2xl bg-flutter-gradient blur-xl opacity-40" />
              <img
                src={zyadProfile}
                alt="Zyad Wael"
                className="relative h-24 w-24 rounded-2xl object-cover object-top ring-2 ring-flutter-light-blue/40 shadow-2xl"
              />
            </div>
            <div className="flex-1 min-w-0 flex flex-col justify-center">
              <div className="inline-flex w-fit items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-400/30 mb-2">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
                </span>
                <span className="text-[9px] font-bold uppercase tracking-wider text-emerald-300">
                  Available
                </span>
              </div>
              <h1 className="text-2xl font-bold leading-tight">
                <span className="text-white">Zyad </span>
                <span className="bg-gradient-to-r from-flutter-light-blue to-flutter-teal bg-clip-text text-transparent">
                  Wael
                </span>
              </h1>
              <div className="h-5 overflow-hidden mt-0.5">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={currentSkill}
                    initial={{ y: 16, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -16, opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="text-xs font-semibold text-flutter-light-blue"
                  >
                    {skills[currentSkill]}
                  </motion.p>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

          {/* Stats widget — col-span-2 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="col-span-2 row-span-2 rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-4 flex flex-col justify-between relative overflow-hidden"
          >
            <Smartphone className="absolute -bottom-2 -right-2 h-16 w-16 text-flutter-blue/10" />
            <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">
              Shipped
            </span>
            <div>
              <div className="text-3xl font-bold bg-gradient-to-br from-white to-flutter-light-blue bg-clip-text text-transparent">
                20+
              </div>
              <div className="text-[11px] text-gray-400">Production apps</div>
            </div>
          </motion.div>

          {/* AI capabilities widget — col-span-2, neon ring */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="col-span-2 row-span-2 rounded-3xl border border-flutter-purple/40 bg-gradient-to-br from-flutter-purple/15 to-flutter-blue/10 backdrop-blur-xl p-4 flex flex-col justify-between relative overflow-hidden shadow-[0_0_24px_-8px_rgba(168,85,247,0.5)]"
          >
            <div className="absolute -top-6 -right-6 h-24 w-24 rounded-full bg-flutter-purple/20 blur-2xl" />
            <div className="flex items-center justify-between relative">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-flutter-light-blue">
                AI Native
              </span>
              <Brain className="h-4 w-4 text-flutter-purple animate-pulse" />
            </div>
            <div className="relative">
              <div className="text-sm font-bold text-white leading-tight">
                Gemini · ML Kit · Computer Vision
              </div>
            </div>
          </motion.div>

          {/* Tagline strip — col-span-4 */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="col-span-4 row-span-1 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl px-4 flex items-center gap-2"
          >
            <Zap className="h-4 w-4 text-flutter-teal shrink-0" />
            <p className="text-xs text-gray-300 leading-snug">
              I ship <span className="text-flutter-light-blue font-semibold">scalable mobile apps</span> with{' '}
              <span className="text-flutter-teal font-semibold">AI inside</span>.
            </p>
          </motion.div>

          {/* CTA row — col-span-4 */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="col-span-4 row-span-1 flex gap-2"
          >
            <Button
              onClick={() => scrollTo('#projects')}
              className="flex-1 bg-flutter-gradient text-white font-semibold rounded-2xl shadow-lg shadow-flutter-blue/30"
            >
              View Work
              <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
            <Button
              onClick={() => scrollTo('#contact')}
              variant="outline"
              className="rounded-2xl border-white/15 bg-white/5 text-white"
            >
              <Mail className="h-4 w-4" />
            </Button>
            <Button
              onClick={() => openCv('hero_mobile')}
              variant="outline"
              className="rounded-2xl border-white/15 bg-white/5 text-white"
            >
              <Download className="h-4 w-4" />
            </Button>
          </motion.div>
        </div>

        {/* ────────────  DESKTOP LAYOUT (unchanged grid)  ──────────── */}
        <div className="hidden md:grid md:grid-cols-2 items-center gap-10 md:gap-16">
          <div className="space-y-7 text-center md:text-left">
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
                Available for projects
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="space-y-3"
            >
              <h1 className="text-5xl lg:text-7xl font-bold leading-[1.05] tracking-tight">
                <span className="block text-white">Hi, I'm</span>
                <span className="block bg-gradient-to-r from-flutter-blue via-flutter-light-blue to-flutter-teal bg-clip-text text-transparent">
                  Zyad Wael
                </span>
              </h1>
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

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="text-base md:text-lg text-gray-400 leading-relaxed max-w-lg"
            >
              I engineer scalable mobile & AI-powered solutions.<br />
              From architecture to deployment — I build with purpose.
            </motion.p>

            {/* Desktop bento stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="grid grid-cols-3 gap-3 max-w-lg"
            >
              {[
                { v: '20+', l: 'Apps shipped', icon: Smartphone, ring: 'border-white/10' },
                { v: 'AI', l: 'Gemini · ML Kit', icon: Brain, ring: 'border-flutter-purple/40 shadow-[0_0_24px_-8px_rgba(168,85,247,0.5)]' },
                { v: '1+', l: 'Years building', icon: Zap, ring: 'border-white/10' },
              ].map((s) => (
                <div
                  key={s.l}
                  className={`relative rounded-2xl border bg-white/[0.03] backdrop-blur-xl p-4 ${s.ring}`}
                >
                  <s.icon className="absolute top-3 right-3 h-4 w-4 text-flutter-light-blue/60" />
                  <div className="text-2xl font-bold bg-gradient-to-b from-white to-flutter-light-blue bg-clip-text text-transparent">
                    {s.v}
                  </div>
                  <div className="text-[10px] uppercase tracking-wider text-gray-500 mt-1">{s.l}</div>
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45 }}
              className="flex flex-wrap items-center gap-3 pt-2"
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
                onClick={() => openCv('hero_desktop')}
                className="text-flutter-light-blue hover:bg-flutter-light-blue/10 rounded-full px-4"
              >
                <Download className="mr-2 h-4 w-4" />
                CV
              </Button>
            </motion.div>
          </div>

          {/* Portrait card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 30 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative flex items-center justify-center"
          >
            <div className="relative w-[360px] h-[440px] lg:w-[400px] lg:h-[480px]">
              <div className="absolute -top-4 -right-4 w-full h-full rounded-3xl border border-flutter-teal/30 bg-flutter-teal/5 backdrop-blur-sm" />
              <div className="absolute -bottom-4 -left-4 w-full h-full rounded-3xl border border-flutter-purple/30 bg-flutter-purple/5 backdrop-blur-sm" />
              <div className="relative w-full h-full rounded-3xl overflow-hidden border border-white/15 shadow-2xl shadow-flutter-blue/30 bg-gradient-to-br from-flutter-blue/30 to-flutter-purple/30">
                <img src={zyadProfile} alt="Zyad Wael" className="w-full h-full object-cover object-top" />
                <div className="absolute top-3 left-3 w-6 h-6 border-l-2 border-t-2 border-white/60" />
                <div className="absolute top-3 right-3 w-6 h-6 border-r-2 border-t-2 border-white/60" />
                <div className="absolute bottom-3 left-3 w-6 h-6 border-l-2 border-b-2 border-white/60" />
                <div className="absolute bottom-3 right-3 w-6 h-6 border-r-2 border-b-2 border-white/60" />
              </div>
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-4 -left-6 glass px-3 py-1.5 rounded-full border border-emerald-400/30 flex items-center gap-2"
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
                className="absolute top-16 -right-8 glass px-3 py-1.5 rounded-full border border-flutter-light-blue/40 flex items-center gap-1.5"
              >
                <span className="text-flutter-light-blue text-sm">◆</span>
                <span className="text-[11px] font-bold text-white">Flutter</span>
              </motion.div>
              <motion.div
                animate={{ y: [0, -7, 0] }}
                transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
                className="absolute bottom-20 -right-10 glass px-3 py-1.5 rounded-full border border-flutter-teal/40 flex items-center gap-1.5"
              >
                <span className="text-flutter-teal text-sm">●</span>
                <span className="text-[11px] font-bold text-white">Dart</span>
              </motion.div>
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
                className="absolute -bottom-3 left-8 glass px-3 py-1.5 rounded-full border border-flutter-purple/40 flex items-center gap-1.5"
              >
                <span className="text-flutter-purple text-sm">▲</span>
                <span className="text-[11px] font-bold text-white">AI-Native</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
