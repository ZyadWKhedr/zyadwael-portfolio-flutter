import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { AnimatedSection } from '@/components/AnimatedSection';
import { Github, MapPin, GraduationCap, Briefcase, ArrowRight } from 'lucide-react';
import zyadProfile from '@/assets/zyad-profile.png';

/* ─── Analog Clock ─── */
const AnalogClock = () => {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const s = time.getSeconds();
  const m = time.getMinutes() + s / 60;
  const h = (time.getHours() % 12) + m / 60;
  const sDeg = s * 6;
  const mDeg = m * 6;
  const hDeg = h * 30;

  const ticks = Array.from({ length: 60 }, (_, i) => i);

  return (
    <div className="relative w-48 h-48 mx-auto select-none">
      {/* Outer ring */}
      <div className="absolute inset-0 rounded-full border border-white/10 bg-gradient-to-br from-zinc-900 to-black shadow-[0_0_40px_-10px_rgba(19,185,253,0.3)]" />

      {/* Tick marks */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 200">
        {ticks.map((i) => {
          const angle = (i * 6 - 90) * (Math.PI / 180);
          const isHour = i % 5 === 0;
          const r1 = isHour ? 82 : 88;
          const r2 = 92;
          return (
            <line
              key={i}
              x1={100 + r1 * Math.cos(angle)}
              y1={100 + r1 * Math.sin(angle)}
              x2={100 + r2 * Math.cos(angle)}
              y2={100 + r2 * Math.sin(angle)}
              stroke={isHour ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.15)'}
              strokeWidth={isHour ? 2 : 1}
              strokeLinecap="round"
            />
          );
        })}

        {/* Hour hand */}
        <line
          x1="100" y1="100"
          x2={100 + 45 * Math.cos((hDeg - 90) * Math.PI / 180)}
          y2={100 + 45 * Math.sin((hDeg - 90) * Math.PI / 180)}
          stroke="white" strokeWidth="4" strokeLinecap="round"
          style={{ transition: 'all 0.5s cubic-bezier(0.4,2.08,0.55,0.44)' }}
        />
        {/* Minute hand */}
        <line
          x1="100" y1="100"
          x2={100 + 62 * Math.cos((mDeg - 90) * Math.PI / 180)}
          y2={100 + 62 * Math.sin((mDeg - 90) * Math.PI / 180)}
          stroke="white" strokeWidth="2.5" strokeLinecap="round"
          style={{ transition: 'all 0.5s cubic-bezier(0.4,2.08,0.55,0.44)' }}
        />
        {/* Second hand */}
        <line
          x1="100" y1="100"
          x2={100 + 70 * Math.cos((sDeg - 90) * Math.PI / 180)}
          y2={100 + 70 * Math.sin((sDeg - 90) * Math.PI / 180)}
          stroke="#13B9FD" strokeWidth="1.5" strokeLinecap="round"
          style={{ transition: 'all 0.2s cubic-bezier(0.4,2.08,0.55,0.44)' }}
        />
        {/* Counter weight */}
        <line
          x1="100" y1="100"
          x2={100 + 15 * Math.cos((sDeg + 90) * Math.PI / 180)}
          y2={100 + 15 * Math.sin((sDeg + 90) * Math.PI / 180)}
          stroke="#13B9FD" strokeWidth="2" strokeLinecap="round"
          style={{ transition: 'all 0.2s cubic-bezier(0.4,2.08,0.55,0.44)' }}
        />
        {/* Center dot */}
        <circle cx="100" cy="100" r="4" fill="white" />
        <circle cx="100" cy="100" r="2" fill="#13B9FD" />
      </svg>

      {/* Date + city label */}
      <div className="absolute bottom-6 left-0 right-0 flex flex-col items-center gap-0.5">
        <span className="text-[9px] uppercase tracking-widest text-white/40">Cairo</span>
        <span className="text-[10px] font-bold text-white/60">
          {time.toLocaleDateString('en-US', { weekday: 'short', day: '2-digit', month: 'short' })}
        </span>
      </div>
    </div>
  );
};

/* ─── GitHub Contributions ─── */
const ContributionGraph = () => {
  const weeks = 26;
  const days = 7;
  const data = Array.from({ length: weeks * days }, () => Math.floor(Math.random() * 5));
  const colors = [
    'bg-white/5',
    'bg-flutter-blue/30',
    'bg-flutter-blue/50',
    'bg-flutter-light-blue/70',
    'bg-flutter-light-blue',
  ];

  return (
    <div className="overflow-x-auto scrollbar-hide">
      <div className="flex gap-[3px] min-w-max">
        {Array.from({ length: weeks }, (_, w) => (
          <div key={w} className="flex flex-col gap-[3px]">
            {Array.from({ length: days }, (_, d) => {
              const val = data[w * days + d];
              return (
                <motion.div
                  key={d}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: (w * days + d) * 0.002, duration: 0.3 }}
                  className={`w-[10px] h-[10px] rounded-sm ${colors[val]} border border-white/5`}
                />
              );
            })}
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2 mt-3 text-[10px] text-gray-500">
        <span>Less</span>
        {colors.map((c, i) => (
          <div key={i} className={`w-[10px] h-[10px] rounded-sm ${c} border border-white/5`} />
        ))}
        <span>More</span>
      </div>
    </div>
  );
};

/* ─── Bento Card wrapper ─── */
const Card = ({
  children,
  className = '',
  hover = true,
}: {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}) => (
  <motion.div
    whileHover={hover ? { y: -4, scale: 1.01 } : undefined}
    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    className={`relative rounded-3xl border border-white/8 bg-white/[0.03] backdrop-blur-xl overflow-hidden ${className}`}
  >
    {children}
  </motion.div>
);

/* ─── Main Component ─── */
const AboutSection = () => {
  const scrollTo = (href: string) =>
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="about" className="py-20 px-4 lg:px-8">
      <div className="container mx-auto">
        <AnimatedSection className="text-center mb-12">
          <span className="inline-block text-[11px] font-semibold tracking-[0.2em] uppercase text-flutter-teal mb-3">
            Who I Am
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-flutter-blue to-flutter-teal bg-clip-text text-transparent mb-4">
            About Me
          </h2>
          <div className="w-24 h-1 bg-flutter-gradient mx-auto rounded-full" />
        </AnimatedSection>

        {/* ── Bento Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 auto-rows-auto gap-4">

          {/* Profile card — large */}
          <Card className="md:col-span-3 lg:col-span-4 p-6 flex flex-col gap-5">
            <div className="flex items-center gap-4">
              <div className="relative shrink-0">
                <div className="absolute inset-0 rounded-2xl bg-flutter-gradient blur-xl opacity-40" />
                <img
                  src={zyadProfile}
                  alt="Zyad Wael"
                  className="relative h-16 w-16 rounded-2xl object-cover object-top ring-2 ring-flutter-light-blue/30"
                />
              </div>
              <div>
                <div className="text-lg font-bold text-white">Zyad Wael</div>
                <div className="text-sm text-flutter-light-blue font-medium">Flutter Developer</div>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              I help startups and product teams launch Flutter apps with{' '}
              <span className="text-flutter-teal font-semibold">clean code</span>,{' '}
              <span className="text-flutter-purple font-semibold">AI features</span>, and zero mess.
              My data-science background means I can build the ML layer too — one developer, full stack.
            </p>
            <div className="flex flex-col gap-2 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <span className="text-flutter-teal">🎯</span>
                <span><span className="text-flutter-teal font-medium">Head of Flutter Committee</span> · HackerRank Campus Club</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-flutter-purple">📚</span>
                <span><span className="text-flutter-purple font-medium">Academic Committee</span> · SAFWA, FCDS</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-flutter-light-blue">💻</span>
                <span><span className="text-flutter-light-blue font-medium">Flutter Coordinator</span> · HackerRank Campus Club</span>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3 pt-2 border-t border-white/5">
              {[
                { v: '20+', l: 'Apps' },
                { v: '1+',  l: 'Years' },
                { v: '3',   l: 'Articles' },
              ].map((s) => (
                <div key={s.l} className="text-center">
                  <div className="text-xl font-bold bg-gradient-to-b from-white to-flutter-light-blue bg-clip-text text-transparent">{s.v}</div>
                  <div className="text-[10px] uppercase tracking-wider text-gray-500 mt-0.5">{s.l}</div>
                </div>
              ))}
            </div>
          </Card>

          {/* Timezone + Clock card */}
          <Card className="md:col-span-3 lg:col-span-4 p-6 flex flex-col items-center justify-between gap-4">
            <div className="w-full flex items-center justify-between">
              <div>
                <div className="text-[10px] uppercase tracking-widest text-gray-500 mb-1">Timezone</div>
                <div className="text-sm font-bold text-white flex items-center gap-2">
                  <MapPin className="h-3.5 w-3.5 text-flutter-teal" />
                  Cairo, Egypt (GMT+3)
                </div>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-400/20">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                </span>
                <span className="text-[10px] font-bold text-emerald-300 uppercase tracking-wider">Available</span>
              </div>
            </div>
            <AnalogClock />
            <div className="text-[10px] text-gray-500 uppercase tracking-widest">Flexible with timezones</div>
          </Card>

          {/* Education card */}
          <Card className="md:col-span-3 lg:col-span-4 p-6 flex flex-col gap-4">
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-flutter-light-blue">
              <GraduationCap className="h-3.5 w-3.5" />
              Education
            </div>
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-sm font-bold text-white">Faculty of Computer & Data Science</div>
                  <div className="text-[11px] text-gray-400 mt-0.5">Alexandria University</div>
                  <div className="text-[10px] text-gray-500 mt-1">2022 – 2026</div>
                </div>
                <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded-full bg-flutter-blue/20 text-flutter-light-blue border border-flutter-blue/30">
                  Student
                </span>
              </div>
              <div className="border-t border-white/5 pt-4">
                <div className="text-[10px] uppercase tracking-widest text-gray-500 mb-3">Internships</div>
                <div className="flex items-start gap-3">
                  <Briefcase className="h-4 w-4 text-flutter-purple shrink-0 mt-0.5" />
                  <div>
                    <div className="text-sm font-semibold text-white">Flutter Developer Intern</div>
                    <div className="text-[11px] text-flutter-purple">Cellula Technologies</div>
                    <div className="text-[10px] text-gray-500 mt-0.5">Built AI meal recommendation app with Gemini</div>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* CTA card */}
          <Card className="md:col-span-3 lg:col-span-5 p-6 flex flex-col justify-between gap-6 bg-gradient-to-br from-flutter-blue/10 to-flutter-purple/10 border-flutter-blue/20">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-300">Available for work</span>
            </div>
            <div>
              <div className="text-2xl font-bold text-white leading-tight">
                Have a vision?
              </div>
              <div className="text-2xl font-bold bg-gradient-to-r from-flutter-light-blue to-flutter-teal bg-clip-text text-transparent">
                Let's build it
              </div>
              <div className="text-gray-400 text-sm mt-1">together.</div>
            </div>
            <button
              onClick={() => scrollTo('#contact')}
              className="group flex items-center gap-2 px-5 py-2.5 rounded-full bg-flutter-gradient text-white text-sm font-semibold w-fit shadow-lg shadow-flutter-blue/30 hover:scale-105 transition-transform"
            >
              Contact Me
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </Card>

          {/* Quote card */}
          <Card className="md:col-span-3 lg:col-span-3 p-6 flex flex-col justify-between gap-4">
            <div className="text-4xl text-flutter-light-blue/20 font-serif leading-none">"</div>
            <p className="text-white font-semibold text-base leading-snug italic">
              Real artists ship.
            </p>
            <div className="text-[10px] uppercase tracking-widest text-gray-500">— Steve Jobs</div>
          </Card>

          {/* GitHub contributions */}
          <Card className="md:col-span-6 lg:col-span-12 p-6" hover={false}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-flutter-light-blue mb-1">
                  <Github className="h-3.5 w-3.5" />
                  Code & Contributions
                </div>
                <div className="text-white font-semibold text-sm">GitHub Activity — Last 6 months</div>
              </div>
              <a
                href="https://github.com/ZyadWKhedr"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-[11px] text-gray-400 hover:text-white hover:border-flutter-light-blue/30 transition-colors"
              >
                <Github className="h-3 w-3" /> View Profile
              </a>
            </div>
            <ContributionGraph />
          </Card>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;