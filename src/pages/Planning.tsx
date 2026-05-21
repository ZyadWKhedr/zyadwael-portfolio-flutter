import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft, MessageSquare, Search, FileText, Palette, Code2,
  TestTube2, Rocket, LifeBuoy, CheckCircle2,
} from 'lucide-react';
import MedusaeBackground from '@/components/MedusaeBackground';
import Navigation from '@/components/Navigation';

type NodeType = 'start' | 'process' | 'decision' | 'end';

interface FlowNode {
  id: string;
  type: NodeType;
  title: string;
  desc?: string;
  icon?: React.ComponentType<{ className?: string }>;
  // For decision nodes — labels of the two outgoing branches
  yesLabel?: string;
  noLabel?: string;
}

const typeStyle: Record<NodeType, { border: string; bg: string; chip: string; glow: string }> = {
  start:    { border: 'border-flutter-teal',       bg: 'bg-flutter-teal/15',       chip: 'bg-flutter-teal text-flutter-dark-blue',   glow: 'shadow-[0_0_40px_-10px_rgba(2,211,154,0.6)]' },
  process:  { border: 'border-flutter-light-blue', bg: 'bg-flutter-light-blue/10', chip: 'bg-flutter-light-blue text-flutter-dark-blue', glow: 'shadow-[0_0_30px_-12px_rgba(19,185,253,0.5)]' },
  decision: { border: 'border-amber-400',          bg: 'bg-amber-400/10',          chip: 'bg-amber-400 text-flutter-dark-blue',      glow: 'shadow-[0_0_30px_-12px_rgba(251,191,36,0.5)]' },
  end:      { border: 'border-flutter-purple',     bg: 'bg-flutter-purple/15',     chip: 'bg-flutter-purple text-white',             glow: 'shadow-[0_0_40px_-10px_rgba(92,107,192,0.6)]' },
};

const flow: FlowNode[] = [
  { id: 'inquiry',    type: 'start',    title: 'Client Inquiry',        desc: 'New project request via email, LinkedIn or referral.', icon: MessageSquare },
  { id: 'discovery',  type: 'process',  title: 'Requirements & Discovery', desc: 'Deep-dive call: goals, users, scope, success metrics.', icon: Search },
  { id: 'fit',        type: 'decision', title: 'Is the project a good fit?', desc: 'Scope, timeline, tech stack and budget alignment.', yesLabel: 'Yes', noLabel: 'No — politely decline' },
  { id: 'proposal',   type: 'process',  title: 'Proposal & Contract',   desc: 'Written brief, milestones, pricing and timeline signed-off.', icon: FileText },
  { id: 'design',     type: 'process',  title: 'UI/UX Design',          desc: 'Figma wireframes & flows — built with the design team.', icon: Palette },
  { id: 'designOk',   type: 'decision', title: 'Design approved?',      desc: 'Client signs off on visual direction & flows.', yesLabel: 'Yes', noLabel: 'No — iterate' },
  { id: 'build',      type: 'process',  title: 'Build (Mobile + Backend)', desc: 'Implemented with the mobile, backend & UI/UX team using clean architecture & Bloc/Cubit.', icon: Code2 },
  { id: 'qa',         type: 'process',  title: 'Testing & QA',          desc: 'Unit + widget tests, manual QA, performance profiling.', icon: TestTube2 },
  { id: 'qaOk',       type: 'decision', title: 'All quality gates pass?', desc: 'Tests green, no critical bugs, perf within budget.', yesLabel: 'Yes', noLabel: 'No — fix & retest' },
  { id: 'ship',       type: 'process',  title: 'Release & Deploy',      desc: 'Play Store, App Store, web — CI/CD pipelines.', icon: Rocket },
  { id: 'support',    type: 'end',      title: 'Maintenance & Support', desc: 'Monitoring, bug fixes, OS upgrades, feature iterations.', icon: LifeBuoy },
];

// Edges describe how nodes connect. Decision nodes have two outgoing edges.
// "noTarget" loops back to a previous node, drawn with a curved label arrow.
interface Edge {
  from: string;
  to: string;
  label?: string;
  loopBack?: boolean; // styled with amber/orange for "No"
}

const edges: Edge[] = [
  { from: 'inquiry',   to: 'discovery' },
  { from: 'discovery', to: 'fit' },
  { from: 'fit',       to: 'proposal',  label: 'Yes' },
  { from: 'fit',       to: 'inquiry',   label: 'No',  loopBack: true },
  { from: 'proposal',  to: 'design' },
  { from: 'design',    to: 'designOk' },
  { from: 'designOk',  to: 'build',     label: 'Yes' },
  { from: 'designOk',  to: 'design',    label: 'No',  loopBack: true },
  { from: 'build',     to: 'qa' },
  { from: 'qa',        to: 'qaOk' },
  { from: 'qaOk',      to: 'ship',      label: 'Yes' },
  { from: 'qaOk',      to: 'build',     label: 'No',  loopBack: true },
  { from: 'ship',      to: 'support' },
];

const stats = [
  { value: String(flow.length), label: 'Total Steps' },
  { value: '5', label: 'Phases' },
  { value: String(flow.filter(f => f.type === 'decision').length), label: 'Decision Gates' },
  { value: '100%', label: 'Tested' },
];

const PlanningPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen relative">
      <MedusaeBackground />
      <Navigation />

      <main className="relative z-10 pt-32 pb-20 px-4 lg:px-8">
        <div className="container mx-auto max-w-3xl">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-flutter-light-blue transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" /> Back to home
          </button>

          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.25em] text-flutter-teal uppercase mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-flutter-teal animate-pulse" />
              How I Work
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
              Software Development <span className="bg-flutter-gradient bg-clip-text text-transparent">Life Cycle.</span>
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Every gate I pass through — from first contact to production deploy. Decision points loop back when quality isn't met.
            </p>
          </div>

          {/* Stats */}
          <div className="glass rounded-2xl border border-flutter-light-blue/20 px-6 py-6 grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-b from-flutter-teal to-flutter-light-blue bg-clip-text text-transparent">
                  {s.value}
                </div>
                <div className="text-[11px] uppercase tracking-wider text-gray-500 mt-1">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-10 text-xs">
            {(['start', 'process', 'decision', 'end'] as NodeType[]).map((t) => (
              <div key={t} className="flex items-center gap-2">
                <span className={`w-3 h-3 rounded-sm border ${typeStyle[t].border} ${typeStyle[t].bg}`} />
                <span className="text-gray-400 uppercase tracking-wider font-medium">{t}</span>
              </div>
            ))}
            <div className="flex items-center gap-2">
              <span className="text-emerald-400 font-bold">→ Yes</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-amber-400 font-bold">⤴ No (loop back)</span>
            </div>
          </div>

          {/* Flow */}
          <div className="relative">
            {flow.map((node, i) => {
              const Icon = node.icon;
              const style = typeStyle[node.type];
              const outgoing = edges.filter((e) => e.from === node.id);
              const yesEdge = outgoing.find((e) => e.label === 'Yes');
              const noEdge  = outgoing.find((e) => e.label === 'No');
              const linearEdge = outgoing.find((e) => !e.label);
              const isLast = i === flow.length - 1;

              return (
                <motion.div
                  key={node.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.45, delay: i * 0.04 }}
                  className="relative"
                >
                  {/* Node card */}
                  <motion.div
                    whileHover={{ scale: 1.015, y: -3 }}
                    className={`relative mx-auto max-w-xl glass rounded-2xl border-2 ${style.border} ${style.bg} ${style.glow} p-5 backdrop-blur-md ${
                      node.type === 'decision' ? 'rotate-[0.5deg]' : ''
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${style.bg} border ${style.border} shrink-0`}>
                        {node.type === 'decision' ? (
                          <span className="text-amber-400 text-xl font-bold">?</span>
                        ) : Icon ? (
                          <Icon className="w-5 h-5 text-white" />
                        ) : (
                          <CheckCircle2 className="w-5 h-5 text-white" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className={`inline-block text-[9px] font-bold tracking-[0.2em] uppercase rounded-full px-2 py-0.5 mb-1.5 ${style.chip}`}>
                          {node.type}
                        </span>
                        <h3 className="text-lg font-bold text-white mb-1">{node.title}</h3>
                        {node.desc && <p className="text-sm text-gray-400 leading-relaxed">{node.desc}</p>}
                      </div>
                    </div>
                  </motion.div>

                  {/* Outgoing connectors */}
                  {!isLast && (
                    <div className="relative py-3">
                      {node.type === 'decision' ? (
                        <div className="flex items-center justify-center gap-12 md:gap-24">
                          {/* Yes branch — straight down */}
                          <div className="flex flex-col items-center">
                            <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider mb-1">
                              {yesEdge?.label ?? 'Yes'}
                            </span>
                            <div className="w-px h-10 bg-gradient-to-b from-emerald-400 to-emerald-400/30" />
                            <div className="w-2 h-2 rotate-45 border-r-2 border-b-2 border-emerald-400 -mt-1" />
                          </div>
                          {/* No branch — curved loop-back arrow */}
                          {noEdge && (
                            <div className="flex flex-col items-center">
                              <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider mb-1">
                                {noEdge.label} → {flow.find(f => f.id === noEdge.to)?.title}
                              </span>
                              <svg width="80" height="44" viewBox="0 0 80 44" className="text-amber-400">
                                <path
                                  d="M 10 4 Q 70 4, 70 22 Q 70 40, 40 40"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeDasharray="4 3"
                                />
                                <polygon points="40,36 32,40 40,44" fill="currentColor" />
                              </svg>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="flex flex-col items-center">
                          <div className="w-px h-8 bg-gradient-to-b from-flutter-light-blue/60 to-flutter-light-blue/20" />
                          <div className="w-2 h-2 rotate-45 border-r-2 border-b-2 border-flutter-light-blue -mt-1" />
                        </div>
                      )}
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>

          <div className="text-center mt-16">
            <button
              onClick={() => navigate('/#contact')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-flutter-gradient text-white font-semibold shadow-lg shadow-flutter-blue/30 hover:scale-105 transition-transform"
            >
              Let's start your project
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PlanningPage;
