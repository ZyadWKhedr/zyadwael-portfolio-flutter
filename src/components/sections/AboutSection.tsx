import React from 'react';
import { GraduationCap, Users, Terminal, Cpu } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="scroll-mt-20 py-20 md:py-28 border-b border-border-subtle bg-surface/20">
      <div className="container max-w-site mx-auto px-5 sm:px-7 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start text-start">
          {/* Main Content Column (7 cols) */}
          <div className="lg:col-span-7 space-y-6 max-w-reading">
            <div className="type-overline text-accent font-mono mb-3">
              BACKGROUND &amp; INTERESTS
            </div>

            <h2 className="type-h2 font-display text-ink mb-6 tracking-tight">
              A little about me
            </h2>

            <div className="space-y-4 type-body text-ink-secondary leading-relaxed">
              <p>
                I'm a Data Science student who started building Flutter applications and gradually became interested in the engineering behind them.
              </p>
              <p>
                Outside mobile development, I enjoy exploring machine learning, algorithms, computer vision, and building tools that solve problems I encounter.
              </p>
              <p>
                I like understanding how things work, experimenting with unfamiliar technologies, and sharing what I learn along the way.
              </p>
            </div>

            {/* Verified Education & Community Points */}
            <div className="pt-6 border-t border-border-subtle grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-md bg-surface border border-border space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-mono font-semibold text-accent">
                  <GraduationCap className="w-4 h-4" />
                  <span>Education</span>
                </div>
                <div className="text-sm font-semibold text-ink">Data Science Student</div>
                <div className="text-xs text-ink-muted">
                  Focusing on statistical modeling, algorithms, and practical machine learning applications.
                </div>
              </div>

              <div className="p-4 rounded-md bg-surface border border-border space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-mono font-semibold text-accent">
                  <Users className="w-4 h-4" />
                  <span>Community Mentorship</span>
                </div>
                <div className="text-sm font-semibold text-ink">HackerRank Campus Club</div>
                <div className="text-xs text-ink-muted">
                  Flutter Committee mentor, sharing Clean Architecture patterns and state management practices.
                </div>
              </div>
            </div>
          </div>

          {/* Side Column: What I Value / Focus Areas (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="spec-card p-6 rounded-lg bg-surface border border-border space-y-5">
              <div className="type-overline text-ink-muted pb-3 border-b border-border-subtle">
                Technical Focus &amp; Curiosity
              </div>

              <div className="space-y-4 text-xs">
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded bg-elevated text-accent flex items-center justify-center shrink-0 mt-0.5">
                    <Terminal className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="font-semibold text-ink block text-sm mb-0.5">Mobile Engineering</span>
                    <span className="text-ink-secondary leading-relaxed">
                      Building production Flutter applications with Clean Architecture, dependable state handling, and offline caching.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded bg-elevated text-accent flex items-center justify-center shrink-0 mt-0.5">
                    <Cpu className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="font-semibold text-ink block text-sm mb-0.5">On-Device Machine Learning</span>
                    <span className="text-ink-secondary leading-relaxed">
                      Exploring lightweight model deployment with ONNX Runtime, OpenCV pipelines, and edge inference.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded bg-elevated text-accent flex items-center justify-center shrink-0 mt-0.5">
                    <Users className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="font-semibold text-ink block text-sm mb-0.5">Knowledge Sharing</span>
                    <span className="text-ink-secondary leading-relaxed">
                      Writing clear technical breakdowns of real engineering patterns rather than buzzword tutorials.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
