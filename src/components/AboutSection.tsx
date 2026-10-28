import React from 'react';
import { Terminal, GraduationCap, Users, MapPin, CheckCircle, Code2, Cpu, Sparkles } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20 md:py-28 border-b border-border-subtle bg-surface/30">
      <div className="container max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Human Story & Engineering Focus (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-widest text-accent">
              <span className="w-2 h-2 rounded-full bg-accent" />
              <span>Background &amp; Philosophy</span>
            </div>

            <h2 className="font-serif fluid-3xl font-bold tracking-tight text-ink">
              Bridging mobile craftsmanship with data science rigor from Alexandria, Egypt.
            </h2>

            <div className="space-y-4 text-ink-muted text-sm md:text-base leading-relaxed font-sans">
              <p>
                Based in <strong className="text-ink font-semibold">Alexandria, Egypt</strong>, I am a mobile application engineer 
                and a third-year Data Science &amp; Artificial Intelligence student at the 
                Faculty of Computers and Data Science (AUFS).
              </p>
              <p>
                My dual discipline shapes how I write software: instead of viewing mobile frontends as decorative 
                screens, I architect them as deterministic data pipelines. Using <strong className="text-ink font-semibold">Flutter &amp; Dart</strong>, 
                I implement strict <strong className="text-ink font-semibold">Clean Architecture</strong> that isolates domain rules 
                from volatile UI frameworks, ensures offline-first resilience through SQLite caching, and delivers the 60fps fluidity expected of first-party software.
              </p>
              <p>
                On the machine learning side, I focus on practical on-device intelligence—whether that is real-time 
                computer vision for sign language landmark detection (MediaPipe/TensorFlow), on-device inference, 
                or sub-second WebSocket event synchronization.
              </p>
              <p>
                Beyond individual engineering, I invest heavily in peer education. As the{' '}
                <strong className="text-ink font-semibold">Head of the Flutter Committee</strong> at the HackerRank Campus Club (AUFS), 
                I design technical roadmaps, mentor peers through architectural patterns, and lead hands-on workshops on state management.
              </p>
            </div>

            {/* Academic & Leadership Ledger */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-border-subtle">
              <div className="p-4 rounded-lg bg-surface border border-border-subtle btn-tactile">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-accent uppercase tracking-wider mb-1">
                  <GraduationCap className="w-4 h-4" />
                  <span>Education</span>
                </div>
                <div className="text-sm font-semibold text-ink">B.Sc. Data Science &amp; AI</div>
                <div className="text-xs text-ink-muted mt-0.5">Alexandria University (AUFS FCDS)</div>
                <div className="text-[11px] font-mono text-ink-faint mt-2 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-accent" />
                  <span>Alexandria, Egypt · [Exp. 2027]</span>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-surface border border-border-subtle btn-tactile">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-accent uppercase tracking-wider mb-1">
                  <Users className="w-4 h-4" />
                  <span>Community Leadership</span>
                </div>
                <div className="text-sm font-semibold text-ink">Head of Flutter Committee</div>
                <div className="text-xs text-ink-muted mt-0.5">HackerRank Campus Club (AUFS)</div>
                <div className="text-[11px] font-mono text-ink-faint mt-2">
                  Curriculum design &amp; student mentorship
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Engineering Manifesto & Principles (5 cols) */}
          <div className="lg:col-span-5 spec-card p-6 md:p-8 rounded-2xl bg-surface">
            <div className="font-mono text-xs uppercase tracking-wider text-accent font-semibold mb-4 flex items-center justify-between border-b border-border-subtle pb-3">
              <span className="flex items-center gap-2">
                <Terminal className="w-4 h-4" />
                <span>Engineering Specimen</span>
              </span>
              <span className="text-[11px] font-mono text-ink-faint">Core Standards</span>
            </div>

            <div className="space-y-4 text-xs md:text-sm text-ink-muted">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                <div>
                  <strong className="text-ink font-semibold block">Separation of Concerns</strong>
                  <span>UI code never talks directly to network or storage. Pure Dart domain entities encapsulate business logic.</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                <div>
                  <strong className="text-ink font-semibold block">Offline-First Resilience</strong>
                  <span>Mobile devices experience connectivity drops. Local SQLite caching and request queues guarantee reliable user actions.</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                <div>
                  <strong className="text-ink font-semibold block">Performance Profiling</strong>
                  <span>Strict memory budgets (&lt;80MB heap on budget Android), compiled SVG pins, and 60fps CustomPainter canvas rendering.</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                <div>
                  <strong className="text-ink font-semibold block">Purposeful Machine Learning</strong>
                  <span>AI features must solve real friction points (sign recognition, route intelligence), not act as superficial decorations.</span>
                </div>
              </div>
            </div>

            {/* Quick Tech Tag Ledger */}
            <div className="pt-6 mt-6 border-t border-border-subtle">
              <span className="text-[10px] font-mono uppercase tracking-wider text-ink-faint block mb-2.5">
                Primary Tooling &amp; Paradigms
              </span>
              <div className="flex flex-wrap gap-1.5">
                {['Flutter', 'Dart', 'Riverpod', 'Provider', 'Clean Architecture', 'Python', 'OpenCV', 'TensorFlow', 'SQLite', 'WebSockets'].map((tool) => (
                  <span
                    key={tool}
                    className="px-2 py-0.5 rounded bg-elevated border border-border-subtle text-[11px] font-mono text-ink-muted"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
