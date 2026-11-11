import React, { useState } from 'react';
import {
  Sparkles,
  ExternalLink,
  Code2,
  Copy,
  Check,
  Star,
  CheckCircle2,
  Layers,
} from 'lucide-react';

export const LiquidNavbarShowcase: React.FC = () => {
  const [copiedInstall, setCopiedInstall] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  const installCmd = 'flutter pub add liquid_navbar';

  const sampleUsage = `import 'package:flutter/material.dart';
import 'package:liquid_navbar/liquid_navbar.dart';

LiquidNavbar(
  currentIndex: _selectedIndex,
  onTap: (index) => setState(() => _selectedIndex = index),
  curve: Curves.elasticOut,
  glassEffect: true,
  items: [
    LiquidNavItem(icon: Icons.explore_rounded, label: 'Explore'),
    LiquidNavItem(icon: Icons.graphic_eq_rounded, label: 'Recitations'),
    LiquidNavItem(icon: Icons.access_time_rounded, label: 'Prayer'),
    LiquidNavItem(icon: Icons.bookmark_rounded, label: 'Bookmarks'),
  ],
);`;

  const copyToClipboard = (text: string, isCode = false) => {
    navigator.clipboard.writeText(text);
    if (isCode) {
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    } else {
      setCopiedInstall(true);
      setTimeout(() => setCopiedInstall(false), 2000);
    }
  };

  return (
    <div className="spec-card rounded-2xl bg-canvas border border-border-strong overflow-hidden shadow-2xl">
      {/* Top Banner Header: Package Identity & Pub Score */}
      <div className="p-6 md:p-8 bg-surface/80 border-b border-border-subtle flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-accent/10 border border-accent/30 text-accent font-mono text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>liquid_navbar</span>
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 dark:text-emerald-400 font-mono text-xs font-bold">
              <Star className="w-3 h-3 fill-current" />
              <span>130/140 Pub Points</span>
            </span>
            <span className="px-2.5 py-1 rounded-md bg-sky-500/10 border border-sky-500/30 text-sky-500 dark:text-sky-400 font-mono text-xs">
              Flutter 3 · Dart 3
            </span>
            <span className="px-2.5 py-1 rounded-md bg-purple-500/10 border border-purple-500/30 text-purple-500 dark:text-purple-400 font-mono text-xs">
              Zero External Deps
            </span>
          </div>

          <h3 className="font-serif text-2xl md:text-3xl font-bold text-ink tracking-tight flex items-center gap-2">
            <span>Liquid Navbar — Physics-Based Navigation for Flutter</span>
          </h3>

          <p className="text-sm md:text-base text-ink-muted max-w-3xl leading-relaxed font-sans">
            An open-source Flutter navigation component published on pub.dev, engineered strictly with native <code className="text-accent font-mono text-xs">CustomPainter</code> and matrix vector math for 60fps fluid spring wave transitions without heavy external webviews or unstable shaders.
          </p>
        </div>

        {/* Action Buttons: pub.dev & GitHub */}
        <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 shrink-0">
          <a
            href="https://pub.dev/packages/liquid_navbar"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-tactile touch-target inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-accent text-white font-mono text-xs font-semibold hover:bg-accent-hover shadow-md transition-colors"
          >
            <span>pub.dev Package</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <a
            href="https://github.com/ZyadWKhedr"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-tactile touch-target inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-surface border border-border-strong text-ink hover:text-accent font-mono text-xs font-semibold transition-colors"
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>GitHub Repository</span>
          </a>
        </div>
      </div>

      {/* Static Visual Preview & Code Split (Non-interactive) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-border-subtle">
        {/* Left Column: Static Visual Display & Specs (7 cols) */}
        <div className="lg:col-span-7 p-6 md:p-8 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-accent" />
              <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-ink">
                Visual Architecture &amp; Component Layout
              </h4>
            </div>
            <span className="font-mono text-xs text-ink-muted">
              60 FPS CustomPainter Rendering
            </span>
          </div>

          {/* Static Visual Presentation of the Component */}
          <div className="relative py-10 px-6 rounded-2xl bg-gradient-to-b from-surface/40 to-elevated/40 border border-border-subtle flex flex-col items-center justify-center min-h-[190px] overflow-hidden">
            {/* Subtle Static Accent Glow */}
            <div className="absolute w-44 h-44 rounded-full bg-accent/15 blur-3xl pointer-events-none" />

            {/* Static Liquid Navbar Render */}
            <div className="relative w-full max-w-md h-16 rounded-full px-2 border border-border-strong/70 bg-surface/90 backdrop-blur-md flex items-center justify-around shadow-lg">
              {/* Highlight Indicator Pill */}
              <div
                className="absolute top-2 bottom-2 rounded-full bg-accent shadow-md pointer-events-none"
                style={{
                  width: 'calc(25% - 8px)',
                  left: 'calc(25% + 4px)',
                }}
              >
                <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-4 h-1.5 bg-accent rounded-full blur-[1px] opacity-70" />
              </div>

              {/* Static Destination Tabs */}
              <div className="relative z-10 flex-1 flex flex-col items-center justify-center py-1 text-center">
                <span className="text-base text-ink-muted">✦</span>
                <span className="text-[11px] font-mono text-ink-muted mt-0.5">Explore</span>
              </div>
              <div className="relative z-10 flex-1 flex flex-col items-center justify-center py-1 text-center">
                <span className="text-base text-white font-bold scale-110">♫</span>
                <span className="text-[11px] font-mono text-white font-bold mt-0.5">Recitations</span>
              </div>
              <div className="relative z-10 flex-1 flex flex-col items-center justify-center py-1 text-center">
                <span className="text-base text-ink-muted">◐</span>
                <span className="text-[11px] font-mono text-ink-muted mt-0.5">Prayer</span>
              </div>
              <div className="relative z-10 flex-1 flex flex-col items-center justify-center py-1 text-center">
                <span className="text-base text-ink-muted">★</span>
                <span className="text-[11px] font-mono text-ink-muted mt-0.5">Bookmarks</span>
              </div>
            </div>

            {/* Component Specs Ribbon */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-ink-muted">
              <span>Framework: <strong className="text-ink">Flutter &amp; Dart</strong></span>
              <span>Vector Math: <strong className="text-accent">Bezier Cubic</strong></span>
              <span>Render Cycle: <strong className="text-emerald-500 font-semibold">16.6ms (60 FPS)</strong></span>
            </div>
          </div>

          {/* Quick Terminal Install Bar */}
          <div className="p-3.5 rounded-xl bg-surface border border-border-subtle flex items-center justify-between gap-3 font-mono text-xs">
            <div className="flex items-center gap-2 overflow-x-auto">
              <span className="text-accent font-bold">$</span>
              <span className="text-ink font-semibold">{installCmd}</span>
            </div>
            <button
              type="button"
              onClick={() => copyToClipboard(installCmd)}
              className="touch-target shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-elevated hover:bg-surface border border-border-subtle text-ink-muted hover:text-ink transition-colors font-mono text-xs"
              title="Copy install command"
            >
              {copiedInstall ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                  <span className="text-emerald-500 font-bold">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Column: Code Snippet & Architectural Highlights (5 cols) */}
        <div className="lg:col-span-5 p-6 md:p-8 space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Code2 className="w-4 h-4 text-accent" />
                <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-ink">
                  Dart API &amp; Implementation
                </h4>
              </div>
              <button
                type="button"
                onClick={() => copyToClipboard(sampleUsage, true)}
                className="font-mono text-xs text-ink-muted hover:text-accent transition-colors flex items-center gap-1"
              >
                {copiedCode ? (
                  <span className="text-emerald-500 font-bold">Copied Code!</span>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>Copy Dart</span>
                  </>
                )}
              </button>
            </div>

            {/* Code Block */}
            <div className="rounded-xl bg-[#0D1117] border border-border-strong/50 p-4 font-mono text-[11px] leading-relaxed text-slate-300 overflow-x-auto shadow-inner">
              <pre>
                <code>{sampleUsage}</code>
              </pre>
            </div>

            {/* Engineering Highlights */}
            <div className="space-y-2.5 pt-2">
              <h5 className="font-mono text-xs font-bold uppercase tracking-wider text-ink-muted">
                Architectural Highlights
              </h5>
              <div className="space-y-2 font-mono text-xs text-ink-muted">
                <div className="flex items-start gap-2 p-2 rounded-lg bg-surface border border-border-subtle">
                  <CheckCircle2 className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" />
                  <span>CustomPainter bezier matrix interpolation with zero rasterizer lag.</span>
                </div>
                <div className="flex items-start gap-2 p-2 rounded-lg bg-surface border border-border-subtle">
                  <CheckCircle2 className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" />
                  <span>Spring dynamics respond naturally to finger drag velocity and tap coordinates.</span>
                </div>
                <div className="flex items-start gap-2 p-2 rounded-lg bg-surface border border-border-subtle">
                  <CheckCircle2 className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" />
                  <span>Tested across iOS, Android, macOS, and Web with 100% test coverage.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Verification Badge */}
          <div className="pt-4 border-t border-border-subtle flex items-center justify-between font-mono text-xs text-ink-muted">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Published &amp; Verified on pub.dev</span>
            </span>
            <a
              href="https://pub.dev/packages/liquid_navbar"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline flex items-center gap-1"
            >
              <span>Inspect Package</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiquidNavbarShowcase;
