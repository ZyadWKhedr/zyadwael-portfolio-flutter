import React from 'react';
import { Smartphone, Layers, Cpu, Database, Check } from 'lucide-react';

interface CapabilityGroup {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  skills: string[];
  evidence: {
    project: string;
    detail: string;
    link?: string;
  }[];
}

const capabilities: CapabilityGroup[] = [
  {
    id: 'mobile',
    title: 'Mobile Engineering',
    icon: Smartphone,
    description: 'Cross-platform native-feeling applications built for long-term maintainability and battery efficiency.',
    skills: [
      'Flutter & Dart',
      'iOS (Swift & SwiftUI)',
      'Android (Java/Kotlin)',
      'Offline Caching (SQLite)',
      'Hardware Sensors & Cameras',
      'App Store & Play Store Deploy',
    ],
    evidence: [
      { project: 'Amoomy & Raval', detail: 'Shipped to commercial production on iOS and Android.' },
      { project: 'Liquid Navbar', detail: 'Custom canvas shaders & spring physics on pub.dev.' },
    ],
  },
  {
    id: 'architecture',
    title: 'Architecture & State',
    icon: Layers,
    description: 'Strict separation of concerns ensuring codebases remain testable, refactorable, and bug-resilient.',
    skills: [
      'Clean Architecture (Domain/Data/UI)',
      'Riverpod & Provider',
      'BLoC / Cubit Pattern',
      'Dependency Injection',
      'Repository Pattern',
      'Unit & Widget Testing',
    ],
    evidence: [
      { project: 'Stackademic Article', detail: 'Author of "Software Craftsmanship: Design Patterns in Dart & Flutter".' },
      { project: 'freeRASP Security', detail: 'Technical guide on mobile anti-tampering and reverse-engineering protection.' },
    ],
  },
  {
    id: 'ai-ml',
    title: 'AI, ML & Real-Time',
    icon: Cpu,
    description: 'Integrating practical machine learning models and sub-second streaming pipelines into mobile clients.',
    skills: [
      'Gemini AI API & LLM Pipelines',
      'Google ML Kit',
      'Computer Vision (OpenCV)',
      'Real-Time WebSockets (Socket.IO)',
      'ASL Sign Language Detection',
      'On-Device Inference',
    ],
    evidence: [
      { project: 'Medium Publication', detail: 'Author of "Building a Real-Time ASL Detection App with Computer Vision".' },
      { project: 'Socket.IO Guide', detail: 'Technical architecture for real-time mobile event streaming.' },
    ],
  },
  {
    id: 'data-science',
    title: 'Data Science & Systems',
    icon: Database,
    description: 'Foundational algorithmic thinking, data modeling, and automated backend workflow pipelines.',
    skills: [
      'Python (Pandas, NumPy)',
      'Data Structures & Algorithms',
      'Supabase & PostgreSQL',
      'RESTful API Design',
      'Git & GitHub Actions CI/CD',
      'n8n Workflow Automation',
    ],
    evidence: [
      { project: 'AUFS FCDS', detail: 'Academic background in Data Science & Artificial Intelligence.' },
      { project: 'HackerRank Club', detail: 'Head of Flutter Committee & technical curriculum mentor.' },
    ],
  },
];

export const SkillsSection: React.FC = () => {
  return (
    <section id="skills" className="py-20 md:py-28 border-b border-border-subtle bg-surface/30">
      <div className="container max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-border-subtle">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-widest text-accent mb-2">
              <span className="w-2 h-2 rounded-full bg-accent" />
              <span>Technical Capabilities</span>
            </div>
            <h2 className="font-serif fluid-3xl font-bold tracking-tight text-ink">
              Skills Anchored in Execution
            </h2>
          </div>
          <p className="text-ink-muted text-sm md:text-base max-w-md font-sans leading-relaxed">
            No arbitrary percentage bars or technology logo dumps. Every capability is grounded 
            in delivered commercial products or published technical research.
          </p>
        </div>

        {/* 4-Column Capability Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-12">
          {capabilities.map((group) => {
            const Icon = group.icon;
            return (
              <div
                key={group.id}
                className="spec-card p-6 flex flex-col justify-between rounded-xl bg-surface hover:shadow-card transition-all"
              >
                <div>
                  <div className="w-10 h-10 rounded-lg bg-elevated border border-border-subtle flex items-center justify-center text-accent mb-4">
                    <Icon className="w-5 h-5" />
                  </div>

                  <h3 className="font-serif text-lg font-bold text-ink mb-2">
                    {group.title}
                  </h3>

                  <p className="text-xs text-ink-muted leading-relaxed font-sans mb-5">
                    {group.description}
                  </p>

                  {/* Skills Tag List */}
                  <div className="space-y-1.5 pb-6 border-b border-border-subtle">
                    {group.skills.map((skill) => (
                      <div key={skill} className="flex items-center gap-2 text-xs text-ink font-mono">
                        <Check className="w-3 h-3 text-accent shrink-0" />
                        <span>{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Evidence Proof Strip */}
                <div className="pt-4 mt-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-ink-faint block mb-2">
                    Verified Execution
                  </span>
                  <div className="space-y-2">
                    {group.evidence.map((ev, i) => (
                      <div key={i} className="p-2.5 rounded bg-elevated border border-border-subtle text-[11px]">
                        <span className="font-semibold text-ink block">{ev.project}</span>
                        <span className="text-ink-muted leading-tight block mt-0.5">{ev.detail}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
