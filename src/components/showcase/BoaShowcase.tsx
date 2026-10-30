import React, { useState } from 'react';
import {
  Terminal,
  ExternalLink,
  Code2,
  Copy,
  Check,
  Shield,
  Zap,
  HardDrive,
  Cpu,
  Layers,
  Sparkles,
} from 'lucide-react';

export const BoaShowcase: React.FC = () => {
  const [copiedInstall, setCopiedInstall] = useState(false);
  const installCmd = 'go install github.com/ZyadWKhedr/Boa@latest';

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedInstall(true);
    setTimeout(() => setCopiedInstall(false), 2000);
  };

  return (
    <div className="spec-card rounded-2xl bg-canvas border border-border-strong overflow-hidden shadow-2xl">
      {/* Top Banner Header: Project Identity & Badges */}
      <div className="p-6 md:p-8 bg-surface/80 border-b border-border-subtle flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs font-semibold">
              <span className="text-sm">🐍</span>
              <span>BOA v1.2</span>
            </span>
            <span className="px-2.5 py-1 rounded-md bg-sky-500/10 border border-sky-500/30 text-sky-400 font-mono text-xs">
              Go 1.21+ CLI
            </span>
            <span className="px-2.5 py-1 rounded-md bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono text-xs">
              Zip-Slip Protected
            </span>
            <span className="px-2.5 py-1 rounded-md bg-purple-500/10 border border-purple-500/30 text-purple-400 font-mono text-xs">
              Bubble Tea TUI
            </span>
            <span className="px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs">
              Zstandard &amp; DEFLATE
            </span>
          </div>

          <h3 className="font-serif text-2xl md:text-3xl font-bold text-ink tracking-tight flex items-center gap-2">
            <span>Boa — Archive Explorer &amp; Compression Engine</span>
          </h3>

          <p className="text-sm md:text-base text-ink-muted max-w-3xl leading-relaxed font-sans">
            A fast, secure command-line tool and terminal archive explorer written in Go. Features streaming multi-threaded compression (DEFLATE &amp; Zstandard), archive inspection without extraction, performance benchmarking, and built-in sanitizer preventing Zip-Slip path traversal exploits.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 shrink-0">
          <a
            href="https://github.com/ZyadWKhedr/Boa"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-tactile touch-target inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-surface border border-border-strong text-ink hover:text-accent font-mono text-xs font-semibold shadow-md transition-colors"
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>GitHub Repository</span>
            <ExternalLink className="w-3 h-3 text-ink-muted" />
          </a>
        </div>
      </div>

      {/* Static Split: Features Ledger & CLI Usage Syntax */}
      <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-border-subtle">
        {/* Left Column: 4 Core Capabilities (7 cols) */}
        <div className="lg:col-span-7 p-6 md:p-8 space-y-6">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-emerald-400" />
            <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-ink">
              Engineered Capabilities &amp; Security Specs
            </h4>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Feature 1 */}
            <div className="p-4 rounded-xl bg-surface border border-border-subtle space-y-2">
              <div className="flex items-center gap-2 text-ink font-mono text-xs font-bold">
                <Zap className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Streaming Compression</span>
              </div>
              <p className="text-xs text-ink-muted leading-relaxed font-sans">
                Real-time multi-threaded streaming I/O with live throughput calculation. Zero memory spikes on multi-gigabyte archives.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-4 rounded-xl bg-surface border border-border-subtle space-y-2">
              <div className="flex items-center gap-2 text-ink font-mono text-xs font-bold">
                <Shield className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Zip-Slip Protection</span>
              </div>
              <p className="text-xs text-ink-muted leading-relaxed font-sans">
                Strict path lexical normalization rejecting <code className="text-accent text-[11px] font-mono">../</code> path traversal sequences during extraction to safeguard target filesystems.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-4 rounded-xl bg-surface border border-border-subtle space-y-2">
              <div className="flex items-center gap-2 text-ink font-mono text-xs font-bold">
                <HardDrive className="w-4 h-4 text-sky-400 shrink-0" />
                <span>Zero-Extraction Explorer</span>
              </div>
              <p className="text-xs text-ink-muted leading-relaxed font-sans">
                Interactive terminal UI built with Charm’s Bubble Tea framework to browse directory trees and read file metadata without unzipping.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="p-4 rounded-xl bg-surface border border-border-subtle space-y-2">
              <div className="flex items-center gap-2 text-ink font-mono text-xs font-bold">
                <Cpu className="w-4 h-4 text-purple-400 shrink-0" />
                <span>Algorithm Benchmark Engine</span>
              </div>
              <p className="text-xs text-ink-muted leading-relaxed font-sans">
                Automated head-to-head benchmarking comparing DEFLATE vs Zstandard vs Store across speed, ratio, and CPU utilization.
              </p>
            </div>
          </div>

          {/* Install Command Snippet */}
          <div className="p-3.5 rounded-xl bg-surface border border-border-subtle flex items-center justify-between gap-3 font-mono text-xs">
            <div className="flex items-center gap-2 overflow-x-auto">
              <span className="text-emerald-400 font-bold">$</span>
              <span className="text-ink font-semibold">{installCmd}</span>
            </div>
            <button
              type="button"
              onClick={() => copyToClipboard(installCmd)}
              className="touch-target shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-elevated hover:bg-surface border border-border-subtle text-ink-muted hover:text-ink transition-colors font-mono text-xs"
              title="Copy Go install command"
            >
              {copiedInstall ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400 font-bold">Copied!</span>
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

        {/* Right Column: Static CLI Usage Syntax (5 cols) */}
        <div className="lg:col-span-5 p-6 md:p-8 space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-emerald-400" />
              <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-ink">
                Command Syntax &amp; Usage
              </h4>
            </div>

            <p className="text-xs text-ink-muted font-sans">
              Clean, ergonomic CLI interface compiled to single zero-dependency static binaries:
            </p>

            {/* Static Code Syntax Block */}
            <div className="rounded-xl bg-[#0D1117] border border-border-strong/50 p-4 font-mono text-xs leading-relaxed text-slate-300 overflow-x-auto shadow-inner space-y-3">
              <div>
                <span className="text-slate-500 block"># Launch full-screen TUI archive explorer</span>
                <span className="text-emerald-400">$ </span>
                <span className="text-white">bo</span>
              </div>

              <div>
                <span className="text-slate-500 block"># High-throughput streaming compression</span>
                <span className="text-emerald-400">$ </span>
                <span className="text-white">bo compress ./data -o bundle.zip --algo zstd</span>
              </div>

              <div>
                <span className="text-slate-500 block"># Inspect file tree without extraction</span>
                <span className="text-emerald-400">$ </span>
                <span className="text-white">bo list bundle.zip --tree</span>
              </div>

              <div>
                <span className="text-slate-500 block"># Benchmark DEFLATE vs Zstandard algorithms</span>
                <span className="text-emerald-400">$ </span>
                <span className="text-white">bo bench ./sample-dataset</span>
              </div>
            </div>
          </div>

          {/* Footer Verification */}
          <div className="pt-4 border-t border-border-subtle flex items-center justify-between font-mono text-xs text-ink-muted">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Open-Source Go Tooling</span>
            </span>
            <a
              href="https://github.com/ZyadWKhedr/Boa"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-500 dark:text-emerald-400 hover:underline flex items-center gap-1"
            >
              <span>View Source</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoaShowcase;
