import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Download, Mail, ArrowRight, Sparkles, Zap, Brain, Smartphone } from 'lucide-react';
import zyadProfile from '@/assets/zyad-profile.png';
import { useTranslation } from 'react-i18next';
import i18n from '@/i18n/index';

import { trackEvent, AnalyticsEvents } from '@/lib/analytics';

const CV_URL =
  'https://drive.google.com/file/d/1ICEIF6wW4eFgZpv2FzKn0ev8zo6XWMgi/view?usp=drive_link';

const openCv = (location: string) => {
  trackEvent(AnalyticsEvents.CvDownload, { location });
  window.open(CV_URL, '_blank');
};

const HeroSection = () => {
  const [currentSkill, setCurrentSkill] = useState(0);
  const skills = [
    'Mobile Application Developer',
    'Software Engineer',
    'Clean Architecture · iOS & Android',
    'Flutter · Dart · AI-Native',
  ];

  useEffect(() => {
    const id = setInterval(() => setCurrentSkill((p) => (p + 1) % skills.length), 2500);
    return () => clearInterval(id);
  }, []);

  const scrollTo = (href: string) =>
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  const { t } = useTranslation();
  const isAr = i18n.language === 'ar';

  const toggleLang = () => {
    const next = isAr ? 'en' : 'ar';
    i18n.changeLanguage(next);
    document.documentElement.dir = next === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = next;
  };

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
        {/* Mobile Bento Layout */}
        <div className="md:hidden flex flex-col gap-4 max-w-[340px] mx-auto">
          {/* Main Profile Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative rounded-3xl overflow-hidden border border-white/10 bg-white/[0.03] backdrop-blur-xl p-5 flex flex-col items-center text-center shadow-xl"
          >
            {/* Ambient glow behind avatar */}
            <div className="absolute top-0 w-32 h-32 bg-flutter-blue/20 rounded-full blur-2xl pointer-events-none" />
            
            <div className="relative mb-3">
              <div className="absolute inset-0 rounded-2xl bg-flutter-gradient blur-md opacity-40" />
              <img
                src={zyadProfile}
                alt="Zyad Wael"
                className="relative h-24 w-24 rounded-2xl object-cover object-top ring-2 ring-flutter-light-blue/40 shadow-2xl"
              />
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/90 border border-emerald-400/30 shadow-lg">
                <span className="relative flex h-1 w-1">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                  <span className="relative inline-flex rounded-full h-1 w-1 bg-white" />
                </span>
                <span className="text-[8px] font-extrabold uppercase tracking-wider text-white">
                  Available
                </span>
              </div>
            </div>

            <h1 className="text-2xl font-bold tracking-tight">
              <span className="text-white">Zyad </span>
              <span className="bg-gradient-to-r from-flutter-light-blue to-flutter-teal bg-clip-text text-transparent">
                Wael
              </span>
            </h1>

            <div className="h-6 overflow-hidden mt-1 flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.p
                  key={currentSkill}
                  initial={{ y: 12, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -12, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-xs font-semibold text-flutter-light-blue"
                >
                  {skills[currentSkill]}
                </motion.p>
              </AnimatePresence>
            </div>

            <p className="text-[11px] text-gray-400 mt-2 max-w-xs leading-relaxed">
              I build fast, scalable Flutter apps that feel native on iOS and Android — shipped clean, on time.
            </p>
          </motion.div>

          {/* Stats and Info Side-by-Side Cards */}
          <div className="grid grid-cols-2 gap-3">
            {/* Shipped Apps Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-4 flex flex-col justify-between relative overflow-hidden h-28 text-left"
            >
              <Smartphone className="absolute -bottom-2 -right-2 h-12 w-12 text-flutter-blue/5" />
              <span className="text-[9px] font-bold uppercase tracking-wider text-gray-500">
                Shipped
              </span>
              <div>
                <div className="text-3xl font-bold bg-gradient-to-br from-white to-flutter-light-blue bg-clip-text text-transparent">
                  20+
                </div>
                <div className="text-[10px] text-gray-400">Production apps</div>
              </div>
            </motion.div>

            {/* AI Native Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="rounded-2xl border border-flutter-purple/30 bg-gradient-to-br from-flutter-purple/10 to-flutter-blue/5 backdrop-blur-xl p-4 flex flex-col justify-between relative overflow-hidden h-28 shadow-lg shadow-flutter-purple/5 text-left"
            >
              <Brain className="absolute -bottom-1 -right-1 h-10 w-10 text-flutter-purple/10" />
              <span className="text-[9px] font-bold uppercase tracking-wider text-flutter-purple/75">
                AI Native
              </span>
              <div>
                <div className="text-[11px] font-bold text-white leading-tight">
                  Gemini · ML Kit · OpenCV
                </div>
                <div className="text-[9px] text-gray-400 mt-1">Computer Vision</div>
              </div>
            </motion.div>
          </div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="flex gap-2"
          >
            <Button
              onClick={() => scrollTo('#contact')}
              className="flex-1 bg-flutter-gradient text-white font-semibold rounded-2xl shadow-lg shadow-flutter-blue/30 h-11 text-xs"
            >
              Hire Me
              <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
            </Button>
            <Button
              onClick={() => scrollTo('#projects')}
              variant="outline"
              className="rounded-2xl border-white/15 bg-white/5 text-white px-4 text-xs h-11"
            >
              See Work
            </Button>
            <Button
              onClick={() => openCv('hero_mobile')}
              variant="outline"
              className="rounded-2xl border-white/15 bg-white/5 text-white px-3 h-11"
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
              <div className="relative inline-block h-8 md:h-10 overflow-hidden w-full">
                <motion.p
                  key={currentSkill}
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -30, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-lg md:text-xl font-semibold text-flutter-light-blue leading-tight"
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
              className="text-base md:text-lg text-gray-300 leading-relaxed max-w-lg"
            >
              I build <span className="text-flutter-light-blue font-semibold">fast, scalable Flutter apps</span> that feel native on iOS and Android — shipped clean, on time.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-sm text-gray-400 flex flex-wrap items-center gap-x-2 gap-y-1"
            >
              <span><span className="text-white font-semibold">5+</span> apps shipped</span>
              <span className="text-flutter-light-blue/40">·</span>
              <span><span className="text-white font-semibold">1+</span> year experience</span>
              <span className="text-flutter-light-blue/40">·</span>
              <span className="text-emerald-400 font-medium">Available for freelance</span>
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
                onClick={() => scrollTo('#contact')}
                className="group bg-flutter-gradient hover:scale-105 transition-all duration-300 text-white font-semibold px-6 py-5 rounded-full shadow-lg shadow-flutter-blue/30"
              >
                Hire Me
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => scrollTo('#projects')}
                className="border-white/20 bg-white/5 backdrop-blur-sm hover:bg-white/10 text-white font-semibold px-6 py-5 rounded-full"
              >
                See My Work
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
