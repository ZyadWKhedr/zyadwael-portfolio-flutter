import React from 'react';
import { ArrowDown, ArrowUpRight, Github, Linkedin, FileText, Mail, MapPin } from 'lucide-react';
import profileWebp from '@/assets/zyad-profile.webp';

const CV_URL = '/zyadwael-portfolio-flutter/Zyad_Wael_CV.pdf';

export const HeroSection: React.FC = () => {
  return (
    <section
      id="hero"
      className="scroll-mt-20 pt-16 pb-20 md:pt-24 md:pb-28 border-b border-border-subtle"
    >
      <div className="container max-w-site mx-auto px-5 sm:px-7 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Main Content Column (7-8 cols on desktop) */}
          <div className="lg:col-span-8 flex flex-col items-start text-start max-w-reading">
            {/* Eyebrow */}
            <div className="type-overline text-accent font-mono mb-4 tracking-wider">
              SOFTWARE DEVELOPER · DATA SCIENCE STUDENT
            </div>

            {/* Main Heading */}
            <h1 className="type-h1 font-display text-ink tracking-tight mb-6 text-balance">
              I build Flutter apps, experiment with machine learning, and enjoy figuring out how things work.
            </h1>

            {/* Introduction */}
            <p className="type-body-lg text-ink-secondary mb-8 leading-relaxed">
              I'm Zyad, a software developer and Data Science student. I've worked on production mobile
              applications, published Flutter packages, and built independent projects exploring on-device machine
              learning.
            </p>

            {/* Primary & Secondary Actions */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-8">
              <a
                href="#work"
                className="btn-tactile touch-target inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold rounded-md bg-accent text-accent-fg hover:bg-accent-hover transition-colors shadow-subtle"
              >
                <span>Explore my work</span>
                <ArrowDown className="w-3.5 h-3.5" />
              </a>

              <a
                href="#contact"
                className="btn-tactile touch-target inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold rounded-md border border-border-strong bg-surface hover:bg-surface-hover text-ink transition-colors"
              >
                <span>Get in touch</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-ink-muted" />
              </a>
            </div>

            {/* Text Links & Location */}
            <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-border-subtle text-xs font-medium text-ink-muted">
              <div className="flex items-center gap-3">
                <a
                  href="https://github.com/ZyadWKhedr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-ink hover:underline transition-colors inline-flex items-center gap-1"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                </a>
                <span className="text-border-subtle">·</span>
                <a
                  href="https://www.linkedin.com/in/zyad-wael-a9035a275/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-ink hover:underline transition-colors inline-flex items-center gap-1"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                  <span>LinkedIn</span>
                </a>
                <span className="text-border-subtle">·</span>
                <a
                  href={CV_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-ink hover:underline transition-colors inline-flex items-center gap-1"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>CV</span>
                </a>
              </div>

              <span className="text-border-subtle hidden sm:inline">|</span>

              <div className="flex items-center gap-1.5 text-ink-muted font-mono text-[11px]">
                <MapPin className="w-3 h-3 text-accent" />
                <span>Based in Egypt.</span>
              </div>
            </div>
          </div>

          {/* Right Column: Authentic Portrait */}
          <div className="lg:col-span-4 flex justify-start lg:justify-end">
            <div className="w-48 sm:w-56 md:w-64 rounded-lg bg-surface border border-border p-2 shadow-subtle">
              <div className="aspect-[4/5] rounded overflow-hidden bg-elevated">
                <img
                  src={profileWebp}
                  alt="Zyad Wael"
                  width="256"
                  height="320"
                  fetchpriority="high"
                  className="w-full h-full object-cover object-top filter grayscale hover:grayscale-0 transition-all duration-300"
                />
              </div>
              <div className="pt-2 px-1 text-start">
                <div className="font-display text-xs font-semibold text-ink">Zyad Wael</div>
                <div className="font-mono text-[11px] text-ink-muted">Software Developer</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
