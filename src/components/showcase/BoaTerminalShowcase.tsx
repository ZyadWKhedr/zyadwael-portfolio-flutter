import React, { useState } from 'react';
import {
  Terminal,
  Copy,
  Check,
  ExternalLink,
  BookOpen,
  Shield,
  Zap,
  HardDrive,
  Cpu,
  Layers,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

type BoaCommand = 'tui' | 'compress' | 'list' | 'bench';

interface CommandSpec {
  id: BoaCommand;
  cmd: string;
  label: string;
  description: string;
  badge: string;
}

const COMMANDS: CommandSpec[] = [
  {
    id: 'tui',
    cmd: 'bo',
    label: 'Interactive TUI',
    description: 'Full-screen Bubble Tea terminal interface with keyboard navigation & file picker',
    badge: 'Bubble Tea TUI',
  },
  {
    id: 'compress',
    cmd: 'bo compress ./assets -o bundle.zip --algo zstd',
    label: 'Streaming Compression',
    description: 'Real-time multi-threaded streaming compression with progress bar and throughput',
    badge: 'Streaming I/O',
  },
  {
    id: 'list',
    cmd: 'bo list bundle.zip --tree',
    label: 'Archive Explorer',
    description: 'Inspect archive contents, file trees, and compression ratios without extracting',
    badge: 'Zero Extraction',
  },
  {
    id: 'bench',
    cmd: 'bo bench ./dataset',
    label: 'Algorithm Benchmark',
    description: 'Head-to-head performance benchmarks: DEFLATE vs Zstandard vs Store',
    badge: 'Benchmark Engine',
  },
];

export const BoaTerminalShowcase: React.FC = () => {
  const { t } = useTranslation();
  const [activeCmd, setActiveCmd] = useState<BoaCommand>('tui');
  const [copiedInstall, setCopiedInstall] = useState(false);

  const installCommand = 'go install github.com/ZyadWKhedr/Boa@latest';

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedInstall(true);
    setTimeout(() => setCopiedInstall(false), 2000);
  };

  return (
    <div className="spec-card rounded-2xl bg-canvas border border-border-strong overflow-hidden shadow-2xl">
      {/* Top Banner Header: Project Identity & Badges */}
      <div className="p-6 md:p-8 bg-surface/80 border-b border-border-subtle flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs font-semibold">
              <span className="text-base leading-none">🐍</span>
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
          </div>

          <h3 className="font-serif text-2xl md:text-3xl font-bold text-ink tracking-tight flex items-center gap-2">
            <span>Boa — Interactive Terminal Toolkit</span>
          </h3>

          <p className="text-sm md:text-base text-ink-muted max-w-3xl leading-relaxed font-sans">
            A fast, interactive terminal toolkit for compressing files, exploring archives, benchmarking compression performance, and extracting files safely.
          </p>
        </div>

        {/* Action Buttons & Install Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
          <a
            href="https://github.com/ZyadWKhedr/Boa"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-tactile touch-target inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-ink text-canvas text-xs font-mono font-semibold hover:bg-accent transition-colors shadow-sm"
          >
            <span>View on GitHub</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <a
            href="https://github.com/ZyadWKhedr/Boa#readme"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-tactile touch-target inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-surface border border-border-strong text-ink text-xs font-mono font-semibold hover:bg-elevated hover:text-accent transition-colors"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Documentation</span>
          </a>
        </div>
      </div>

      {/* Main Terminal Window Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        {/* Left Control Rail: Command Selectors & Architecture Specs (5 cols) */}
        <div className="lg:col-span-5 p-6 border-b lg:border-b-0 lg:border-e border-border-subtle bg-surface/40 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs font-mono text-ink-muted">
              <span className="uppercase tracking-wider font-semibold">Executable Commands</span>
              <span>Click to test output</span>
            </div>

            {/* Interactive Command Tabs */}
            <div className="space-y-2">
              {COMMANDS.map((cmd) => {
                const isActive = activeCmd === cmd.id;
                return (
                  <button
                    key={cmd.id}
                    type="button"
                    onClick={() => setActiveCmd(cmd.id)}
                    className={`touch-target w-full text-start p-3.5 rounded-xl border transition-all text-xs font-mono ${
                      isActive
                        ? 'bg-elevated border-accent text-ink shadow-md translate-x-1'
                        : 'bg-surface border-border-subtle text-ink-muted hover:border-border-strong hover:text-ink'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-accent flex items-center gap-1.5">
                        <Terminal className="w-3.5 h-3.5 text-accent" />
                        <span>$ {cmd.cmd.split(' ')[0]} {cmd.cmd.split(' ')[1] || ''}</span>
                      </span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-surface border border-border-subtle text-ink-faint">
                        {cmd.badge}
                      </span>
                    </div>
                    <div className="font-sans text-[11px] text-ink-muted mt-1 leading-snug">
                      {cmd.description}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Install Bar with One-Click Copy */}
          <div className="p-3.5 rounded-xl bg-canvas border border-border-subtle space-y-2">
            <div className="flex items-center justify-between text-[11px] font-mono text-ink-faint">
              <span>Go Installation</span>
              <span className="text-accent font-semibold">Single Static Binary</span>
            </div>
            <div className="flex items-center justify-between gap-2 p-2 rounded-lg bg-surface border border-border-subtle/80 font-mono text-xs">
              <span className="truncate text-ink-muted selection:bg-accent/30 selection:text-ink">
                $ {installCommand}
              </span>
              <button
                type="button"
                onClick={() => copyToClipboard(installCommand)}
                className="touch-target p-1.5 rounded hover:bg-elevated text-ink hover:text-accent transition-colors shrink-0"
                aria-label="Copy install command"
                title="Copy install command"
              >
                {copiedInstall ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <Copy className="w-3.5 h-3.5 text-ink-muted" />
                )}
              </button>
            </div>
          </div>

          {/* Security & Architecture Highlights */}
          <div className="grid grid-cols-2 gap-2 text-start">
            <div className="p-2.5 rounded-lg bg-canvas/60 border border-border-subtle">
              <div className="flex items-center gap-1.5 text-xs font-mono text-ink font-semibold mb-1">
                <Shield className="w-3.5 h-3.5 text-emerald-400" />
                <span>Zip-Slip Safe</span>
              </div>
              <p className="text-[10px] text-ink-muted leading-tight">
                Sanitizes file extraction targets to strictly block directory traversal exploits.
              </p>
            </div>

            <div className="p-2.5 rounded-lg bg-canvas/60 border border-border-subtle">
              <div className="flex items-center gap-1.5 text-xs font-mono text-ink font-semibold mb-1">
                <HardDrive className="w-3.5 h-3.5 text-sky-400" />
                <span>Streaming I/O</span>
              </div>
              <p className="text-[10px] text-ink-muted leading-tight">
                Constant memory footprint regardless of multi-gigabyte archive payload sizes.
              </p>
            </div>
          </div>
        </div>

        {/* Right Terminal Output Screen (7 cols) */}
        <div className="lg:col-span-7 bg-[#0c1017] p-5 md:p-6 font-mono text-xs text-zinc-300 flex flex-col justify-between overflow-x-auto min-h-[460px]">
          {/* Authentic Terminal Header */}
          <div className="flex items-center justify-between pb-4 border-b border-zinc-800/80 mb-4 select-none">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
              <span className="text-zinc-500 text-[11px] ms-2">boa — zsh — 84×24</span>
            </div>
            <div className="flex items-center gap-2 text-[10px] text-zinc-500">
              <span>arch: x86_64 / arm64</span>
              <span>os: multi-platform</span>
            </div>
          </div>

          {/* Prompt Line */}
          <div className="flex items-center gap-2 text-zinc-400 mb-4">
            <span className="text-emerald-400 font-bold">zyad@developer</span>
            <span className="text-zinc-600">:</span>
            <span className="text-sky-400">~/projects/boa</span>
            <span className="text-zinc-400">$</span>
            <span className="text-white font-semibold">{COMMANDS.find((c) => c.id === activeCmd)?.cmd}</span>
          </div>

          {/* Dynamic Command Screen Output */}
          <div className="flex-1 space-y-3 font-mono leading-relaxed select-text">
            {activeCmd === 'tui' && (
              <div className="space-y-2 text-[11px]">
                <div className="text-emerald-400 font-bold flex items-center gap-2">
                  <span>🐍 BOA — Interactive Terminal Toolkit (Bubble Tea)</span>
                </div>
                <div className="text-zinc-500">Use [↑/↓] or [j/k] to navigate, [Enter] to select, [q] to quit</div>
                
                <div className="p-3 rounded bg-zinc-900/90 border border-zinc-800 space-y-1.5 mt-2">
                  <div className="text-zinc-400 font-bold">Select Operation:</div>
                  <div className="text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded flex items-center justify-between">
                    <span>▸ [1] Compress Directory or Files (DEFLATE / Zstd / Store)</span>
                    <span className="text-[10px] font-mono text-emerald-300">Active</span>
                  </div>
                  <div className="text-zinc-400 px-2 py-1 flex items-center justify-between">
                    <span>  [2] Explore Archive Contents (Tree & Ratios)</span>
                    <span className="text-[10px] text-zinc-600">Enter</span>
                  </div>
                  <div className="text-zinc-400 px-2 py-1 flex items-center justify-between">
                    <span>  [3] Benchmark Compression Algorithms</span>
                    <span className="text-[10px] text-zinc-600">Enter</span>
                  </div>
                  <div className="text-zinc-400 px-2 py-1 flex items-center justify-between">
                    <span>  [4] Extract Safely with Zip-Slip Neutralization</span>
                    <span className="text-[10px] text-zinc-600">Enter</span>
                  </div>
                </div>

                <div className="p-2.5 rounded bg-zinc-950 border border-zinc-800 text-[10px] text-zinc-400 space-y-1">
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Target Path:</span>
                    <span className="text-zinc-300">./assets/production_build</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Selected Algorithm:</span>
                    <span className="text-sky-400 font-semibold">Zstandard (Level 3 - Fast & Balanced)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Memory Allocation:</span>
                    <span className="text-emerald-400 font-semibold">Streaming buffer (16 MB heap cap)</span>
                  </div>
                </div>
              </div>
            )}

            {activeCmd === 'compress' && (
              <div className="space-y-3 text-[11px]">
                <div className="text-sky-400 font-semibold">
                  [INFO] Initializing streaming compressor with algorithm: Zstandard
                </div>
                <div className="text-zinc-400">
                  Scanning target directory: <span className="text-white">./assets (1,482 files, 342.8 MB)</span>
                </div>

                {/* Progress Bar Display */}
                <div className="p-3 rounded bg-zinc-900 border border-zinc-800 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-zinc-300 font-bold">Compressing: bundle.zip</span>
                    <span className="text-emerald-400 font-bold">100% COMPLETE</span>
                  </div>
                  <div className="w-full bg-zinc-800 h-2.5 rounded-full overflow-hidden flex">
                    <div className="bg-gradient-to-r from-emerald-500 to-sky-400 h-full w-full" />
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-zinc-400">
                    <span>Speed: 148.6 MB/s</span>
                    <span>Elapsed: 2.31s</span>
                    <span>ETA: 0.00s</span>
                  </div>
                </div>

                {/* Compression Metrics Summary */}
                <div className="grid grid-cols-3 gap-2 text-[10px]">
                  <div className="p-2 rounded bg-zinc-900/60 border border-zinc-800">
                    <span className="text-zinc-500 block">Original Size</span>
                    <span className="text-white font-bold text-xs">342.8 MB</span>
                  </div>
                  <div className="p-2 rounded bg-zinc-900/60 border border-zinc-800">
                    <span className="text-zinc-500 block">Archive Size</span>
                    <span className="text-emerald-400 font-bold text-xs">96.4 MB</span>
                  </div>
                  <div className="p-2 rounded bg-zinc-900/60 border border-zinc-800">
                    <span className="text-zinc-500 block">Space Saved</span>
                    <span className="text-sky-400 font-bold text-xs">71.8%</span>
                  </div>
                </div>

                <div className="text-emerald-400 text-[10px]">
                  ✓ Archive written safely to ./bundle.zip with SHA-256 integrity checksum verification.
                </div>
              </div>
            )}

            {activeCmd === 'list' && (
              <div className="space-y-2 text-[11px]">
                <div className="text-purple-400 font-semibold">
                  Archive: bundle.zip (96.4 MB · 1,482 total entries)
                </div>

                <div className="p-2.5 rounded bg-zinc-900 border border-zinc-800 font-mono text-[10px] space-y-1 text-zinc-300">
                  <div className="text-zinc-500">SIZE     RATIO  METHOD   PATH</div>
                  <div className="text-zinc-400">----------------------------------------------------</div>
                  <div>42.1 MB   74.2%  Zstandard  ├── src/bin/client_engine</div>
                  <div>18.4 MB   68.5%  Zstandard  ├── assets/textures/atlas.bin</div>
                  <div>8.2 MB    82.1%  Zstandard  ├── data/lexicon_index.db</div>
                  <div>1.2 MB    61.4%  DEFLATE    ├── config/app_manifest.json</div>
                  <div>512 KB    0.0%   Store      └── certificates/root_ca.crt</div>
                </div>

                <div className="flex items-center justify-between text-[10px] text-zinc-400 px-1">
                  <span>Total Uncompressed: 342.8 MB</span>
                  <span className="text-emerald-400 font-semibold">Ratio: 2.82x (71.8% reduction)</span>
                </div>
              </div>
            )}

            {activeCmd === 'bench' && (
              <div className="space-y-3 text-[11px]">
                <div className="text-amber-400 font-semibold">
                  [BENCHMARK] Comparing algorithms on 100MB standard corpus:
                </div>

                {/* Benchmark Comparison Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-start text-[10px] border-collapse">
                    <thead>
                      <tr className="border-b border-zinc-800 text-zinc-500">
                        <th className="py-1.5 pe-3 text-start">ALGORITHM</th>
                        <th className="py-1.5 pe-3 text-start">COMPRESS SPEED</th>
                        <th className="py-1.5 pe-3 text-start">DECOMPRESS SPEED</th>
                        <th className="py-1.5 pe-3 text-start">RATIO</th>
                        <th className="py-1.5 text-start">PEAK MEMORY</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-900 text-zinc-300">
                      <tr className="bg-emerald-500/10 font-bold text-emerald-300">
                        <td className="py-1.5 pe-3">Zstandard (L3)</td>
                        <td className="py-1.5 pe-3">154.2 MB/s</td>
                        <td className="py-1.5 pe-3">480.1 MB/s</td>
                        <td className="py-1.5 pe-3 text-emerald-400">72.4%</td>
                        <td className="py-1.5">14.2 MB</td>
                      </tr>
                      <tr>
                        <td className="py-1.5 pe-3 text-sky-400">DEFLATE (Fast)</td>
                        <td className="py-1.5 pe-3">68.4 MB/s</td>
                        <td className="py-1.5 pe-3">295.6 MB/s</td>
                        <td className="py-1.5 pe-3">64.1%</td>
                        <td className="py-1.5">9.8 MB</td>
                      </tr>
                      <tr>
                        <td className="py-1.5 pe-3 text-zinc-400">Store (Copy)</td>
                        <td className="py-1.5 pe-3">1,240.0 MB/s</td>
                        <td className="py-1.5 pe-3">1,420.0 MB/s</td>
                        <td className="py-1.5 pe-3 text-zinc-500">0.0%</td>
                        <td className="py-1.5">4.1 MB</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="text-[10px] text-zinc-400 bg-zinc-900/40 p-2 rounded border border-zinc-800">
                  <span className="text-amber-400 font-semibold">Recommendation:</span> For high-throughput server pipelines or CLI tooling, Zstandard yields 2.2x faster compression speed than standard DEFLATE while saving an extra 8.3% disk space.
                </div>
              </div>
            )}
          </div>

          {/* Terminal Status Line */}
          <div className="pt-3 border-t border-zinc-800/80 mt-4 flex items-center justify-between text-[10px] text-zinc-500 select-none">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Daemon Ready</span>
            </span>
            <span className="font-mono">github.com/ZyadWKhedr/Boa</span>
          </div>
        </div>
      </div>
    </div>
  );
};
