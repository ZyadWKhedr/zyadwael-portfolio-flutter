import { motion } from 'framer-motion';
import { AnimatedSection } from './AnimatedSection';
import {
  MessageSquare, Search, FileText, Palette, Code2, TestTube2,
  Rocket, LifeBuoy, CheckCircle2,
} from 'lucide-react';

type StepType = 'start' | 'process' | 'decision' | 'end';

interface Step {
  phase: string;
  title: string;
  desc: string;
  icon: React.ComponentType<{ className?: string }>;
  type: StepType;
}

const steps: Step[] = [
  { phase: 'Intake',     title: 'Client Inquiry',      desc: 'New project request via email, LinkedIn or referral.', icon: MessageSquare, type: 'start' },
  { phase: 'Discovery',  title: 'Requirements Call',   desc: 'Deep-dive on goals, users, scope and success metrics.', icon: Search,        type: 'process' },
  { phase: 'Discovery',  title: 'Scope & Proposal',    desc: 'Written brief, milestones, timeline & pricing options.', icon: FileText,      type: 'decision' },
  { phase: 'Design',     title: 'UI/UX Wireframes',    desc: 'Figma flows aligned to Material 3 + brand identity.',   icon: Palette,       type: 'process' },
  { phase: 'Build',      title: 'Architecture & Code', desc: 'Clean architecture, Bloc/Cubit, REST/Supabase layer.',  icon: Code2,         type: 'process' },
  { phase: 'Quality',    title: 'Testing & QA',        desc: 'Unit + widget tests, manual QA, performance profiling.',icon: TestTube2,     type: 'decision' },
  { phase: 'Ship',       title: 'Release & Deploy',    desc: 'Play Store, App Store, web — automated CI/CD.',         icon: Rocket,        type: 'process' },
  { phase: 'Support',    title: 'Maintenance',         desc: 'Monitoring, bug-fixes, feature iterations.',            icon: LifeBuoy,      type: 'end' },
];

const typeStyles: Record<StepType, { border: string; bg: string; label: string; ring: string }> = {
  start:    { border: 'border-flutter-teal',       bg: 'bg-flutter-teal/15',       label: 'START',    ring: 'shadow-[0_0_40px_-10px_rgba(2,211,154,0.6)]' },
  process:  { border: 'border-flutter-light-blue', bg: 'bg-flutter-light-blue/10', label: 'PROCESS',  ring: 'shadow-[0_0_30px_-12px_rgba(19,185,253,0.5)]' },
  decision: { border: 'border-flutter-purple',     bg: 'bg-flutter-purple/15',     label: 'DECISION', ring: 'shadow-[0_0_30px_-12px_rgba(92,107,192,0.5)]' },
  end:      { border: 'border-flutter-blue',       bg: 'bg-flutter-blue/15',       label: 'END',      ring: 'shadow-[0_0_40px_-10px_rgba(1,117,194,0.6)]' },
};

const stats = [
  { value: '8',    label: 'Total Steps' },
  { value: '5',    label: 'Phases' },
  { value: '4',    label: 'Quality Gates' },
  { value: '100%', label: 'Tested' },
];

const PlanningSection = () => {
  return (
    <section id="planning" className="py-24 px-4 lg:px-8 relative overflow-hidden">
      {/* Dotted bg */}
      <div
        className="absolute inset-0 opacity-[0.08] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(19,185,253,0.7) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />
      <div className="absolute top-40 right-10 w-96 h-96 bg-flutter-blue/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-flutter-purple/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto relative z-10 max-w-5xl">
        <AnimatedSection className="text-center mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.25em] text-flutter-teal uppercase mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-flutter-teal animate-pulse" />
            How I Work
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
            Engineering <span className="bg-flutter-gradient bg-clip-text text-transparent">Process.</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-base md:text-lg">
            From first contact to production deploy — every gate I pass through to ship reliable, well-crafted software.
          </p>
        </AnimatedSection>

        {/* Stats */}
        <AnimatedSection delay={0.1}>
          <div className="glass rounded-2xl border border-flutter-light-blue/20 px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-b from-flutter-teal to-flutter-light-blue bg-clip-text text-transparent">
                  {s.value}
                </div>
                <div className="text-[11px] uppercase tracking-wider text-gray-500 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </AnimatedSection>

        {/* Legend */}
        <AnimatedSection delay={0.15}>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-10 text-xs">
            {(['start', 'process', 'decision', 'end'] as StepType[]).map((t) => (
              <div key={t} className="flex items-center gap-2">
                <span className={`w-3 h-3 rounded-sm border ${typeStyles[t].border} ${typeStyles[t].bg}`} />
                <span className="text-gray-400 uppercase tracking-wider font-medium">{typeStyles[t].label}</span>
              </div>
            ))}
          </div>
        </AnimatedSection>

        {/* Flow */}
        <div className="relative">
          {/* Vertical connector line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-flutter-teal/40 via-flutter-light-blue/30 to-flutter-purple/40 -translate-x-1/2 hidden md:block" />

          <div className="space-y-6">
            {steps.map((step, i) => {
              const Icon = step.icon;
              const style = typeStyles[step.type];
              const showPhase = i === 0 || steps[i - 1].phase !== step.phase;
              return (
                <div key={i}>
                  {showPhase && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      className="flex justify-center mb-4"
                    >
                      <div className="px-4 py-1.5 rounded-full bg-flutter-gradient text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-flutter-blue/30">
                        {step.phase}
                      </div>
                    </motion.div>
                  )}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.5, delay: i * 0.05 }}
                    whileHover={{ scale: 1.02, y: -4 }}
                    className={`relative mx-auto max-w-xl glass rounded-2xl border-2 ${style.border} ${style.bg} ${style.ring} p-5 backdrop-blur-md`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${style.bg} border ${style.border} shrink-0`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[10px] font-bold tracking-[0.2em] text-flutter-light-blue uppercase mb-1">
                          {style.label}
                        </div>
                        <h3 className="text-lg font-bold text-white mb-1">{step.title}</h3>
                        <p className="text-sm text-gray-400 leading-relaxed">{step.desc}</p>
                      </div>
                      <CheckCircle2 className="w-5 h-5 text-flutter-teal shrink-0 opacity-60" />
                    </div>
                  </motion.div>
                  {i < steps.length - 1 && (
                    <div className="flex justify-center py-2">
                      <div className="w-px h-6 bg-gradient-to-b from-flutter-light-blue/60 to-flutter-light-blue/10" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlanningSection;
