import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Copy, Check, ExternalLink, Cpu, BookOpen, Layers, Play, Sparkles, Volume2, Shield } from 'lucide-react';
import { INDEPENDENT_PROJECTS } from '@/data/projects';

type BoaCommand = 'list' | 'compress' | 'bench' | 'tui';

interface ArabicSample {
  id: string;
  label: string;
  raw: string;
  diacritized: string;
  translation: string;
}

const ARABIC_SAMPLES: ArabicSample[] = [
  {
    id: 'sample-1',
    label: 'Standard Sentence',
    raw: 'ذهب الطالب الى المدرسة صباحا بنشاط',
    diacritized: 'ذَهَبَ الطَّالِبُ إِلَى الْمَدْرَسَةِ صَبَاحًا بِنَشَاطٍ',
    translation: 'The student went to school in the morning with enthusiasm.',
  },
  {
    id: 'sample-2',
    label: 'Literature Proverb',
    raw: 'العلم نور والجهل ظلام يسود العقول',
    diacritized: 'الْعِلْمُ نُورٌ وَالْجَهْلُ ظَلَامٌ يَسُودُ الْعُقُولَ',
    translation: 'Knowledge is light, and ignorance is darkness that overwhelms minds.',
  },
  {
    id: 'sample-3',
    label: 'Modern Prose',
    raw: 'يعمل النموذج على معالجة النصوص محليا دون خادم',
    diacritized: 'يَعْمَلُ النَّمُوذَجُ عَلَى مُعَالَجَةِ النُّصُوصِ مَحَلِّيًّا دُونَ خَادِمٍ',
    translation: 'The model processes text locally without requiring a remote server.',
  },
];

export const ThingsIveBuilt: React.FC = () => {
  // Boa Terminal State
  const [boaCmd, setBoaCmd] = useState<BoaCommand>('list');
  const [copiedBoa, setCopiedBoa] = useState(false);

  // Arabic Diacritization State
  const [selectedArabicSample, setSelectedArabicSample] = useState<ArabicSample>(ARABIC_SAMPLES[0]);
  const [showDiacritics, setShowDiacritics] = useState(true);

  // Liquid Navbar Interactive Canvas State
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeNavIndex, setActiveNavIndex] = useState(1);
  const animRef = useRef<number | null>(null);
  const currentPosRef = useRef({ x: 120, targetX: 120 });

  // Canvas Wave Animation Loop for Liquid Navbar
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let startTime = performance.now();

    const render = (time: number) => {
      const elapsed = (time - startTime) / 1000;
      // Spring lerp towards target
      currentPosRef.current.x += (currentPosRef.current.targetX - currentPosRef.current.x) * 0.15;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const w = canvas.width;
      const h = canvas.height;
      const waveCenter = currentPosRef.current.x;
      const baseHeight = 40;

      // Draw fluid bezier liquid curve
      ctx.beginPath();
      ctx.moveTo(0, baseHeight);

      for (let x = 0; x <= w; x += 4) {
        const dist = Math.abs(x - waveCenter);
        const influence = Math.max(0, 1 - dist / 60);
        // Sinusoidal ripple with spring damping
        const ripple = Math.sin(dist * 0.1 - elapsed * 5) * 4 * influence;
        const dip = Math.sin(influence * Math.PI) * 22;
        ctx.lineTo(x, baseHeight + dip + ripple);
      }

      ctx.lineTo(w, h);
      ctx.lineTo(0, h);
      ctx.closePath();

      // Muted accent fill
      ctx.fillStyle = document.documentElement.classList.contains('dark') ? '#252817' : '#EFF0D9';
      ctx.fill();

      // Border stroke
      ctx.beginPath();
      ctx.moveTo(0, baseHeight);
      for (let x = 0; x <= w; x += 4) {
        const dist = Math.abs(x - waveCenter);
        const influence = Math.max(0, 1 - dist / 60);
        const ripple = Math.sin(dist * 0.1 - elapsed * 5) * 4 * influence;
        const dip = Math.sin(influence * Math.PI) * 22;
        ctx.lineTo(x, baseHeight + dip + ripple);
      }
      ctx.strokeStyle = document.documentElement.classList.contains('dark') ? '#B5B730' : '#74771E';
      ctx.lineWidth = 2;
      ctx.stroke();

      animRef.current = requestAnimationFrame(render);
    };

    animRef.current = requestAnimationFrame(render);
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, []);

  const handleNavClick = (idx: number, xPos: number) => {
    setActiveNavIndex(idx);
    currentPosRef.current.targetX = xPos;
  };

  const copyInstall = () => {
    navigator.clipboard.writeText('go install github.com/ZyadWKhedr/Boa@latest');
    setCopiedBoa(true);
    setTimeout(() => setCopiedBoa(false), 2000);
  };

  return (
    <section id="projects" className="scroll-mt-20 py-20 md:py-28 border-b border-border-subtle bg-surface/30">
      <div className="container max-w-site mx-auto px-5 sm:px-7 lg:px-10">
        {/* Section Header */}
        <div className="max-w-reading mb-14 md:mb-18 text-start">
          <div className="type-overline text-accent font-mono mb-3">
            INDEPENDENT ENGINEERING &amp; EXPERIMENTS
          </div>
          <h2 className="type-h2 font-display text-ink mb-4 tracking-tight">
            Things I've built
          </h2>
          <p className="type-body text-ink-secondary leading-relaxed">
            Projects that started with a technical question, an interesting problem, or something I wanted to understand better.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* PROJECT 1: BOA (Terminal Compression Toolkit) */}
        {/* ========================================================================= */}
        <div className="mb-16 md:mb-20 spec-card p-6 sm:p-8 md:p-10 rounded-lg bg-surface border border-border text-start">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-5 space-y-5">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-elevated border border-border-subtle font-mono text-xs text-accent">
                <Terminal className="w-3.5 h-3.5" />
                <span>Go CLI &amp; TUI Toolkit</span>
              </div>

              <div>
                <h3 className="type-h3 font-display font-bold text-ink">Boa</h3>
                <p className="text-xs font-mono text-ink-muted mt-1">Open-source terminal compression toolkit and file explorer</p>
              </div>

              <p className="type-body text-ink-secondary leading-relaxed">
                Built in Go, with a command-line interface and support for compression, extraction, inspection, benchmarking, and interactive exploration.
              </p>

              {/* Safety & Architecture Highlights */}
              <div className="space-y-2 text-xs text-ink-secondary font-mono pt-2">
                <div className="flex items-center gap-2">
                  <Shield className="w-3.5 h-3.5 text-accent shrink-0" />
                  <span>Zip-Slip path traversal protection</span>
                </div>
                <div className="flex items-center gap-2">
                  <Cpu className="w-3.5 h-3.5 text-accent shrink-0" />
                  <span>Streaming multi-threaded I/O pipeline</span>
                </div>
                <div className="flex items-center gap-2">
                  <Layers className="w-3.5 h-3.5 text-accent shrink-0" />
                  <span>Bubble Tea terminal UI with keybindings</span>
                </div>
              </div>

              {/* Command Quick Launcher */}
              <div className="pt-2">
                <div className="type-overline text-ink-muted mb-2">Inspect CLI Output:</div>
                <div className="flex flex-wrap gap-1.5">
                  {(['list', 'compress', 'bench', 'tui'] as BoaCommand[]).map((cmd) => (
                    <button
                      key={cmd}
                      type="button"
                      onClick={() => setBoaCmd(cmd)}
                      className={`px-2.5 py-1 text-xs font-mono rounded transition-colors ${
                        boaCmd === cmd
                          ? 'bg-accent text-accent-fg font-semibold'
                          : 'bg-elevated border border-border-subtle text-ink hover:border-accent'
                      }`}
                    >
                      bo {cmd}
                    </button>
                  ))}
                </div>
              </div>

              {/* Links & Install */}
              <div className="pt-4 border-t border-border-subtle flex flex-wrap items-center gap-3">
                <a
                  href="https://github.com/ZyadWKhedr/Boa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-tactile touch-target inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md border border-border-strong bg-surface hover:bg-surface-hover text-ink transition-colors"
                >
                  <span>GitHub Repository</span>
                  <ExternalLink className="w-3.5 h-3.5 text-ink-muted" />
                </a>

                <button
                  type="button"
                  onClick={copyInstall}
                  className="btn-tactile touch-target inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded-md bg-elevated border border-border-subtle text-ink hover:border-accent transition-colors"
                  title="Copy go install command"
                >
                  {copiedBoa ? <Check className="w-3 h-3 text-accent" /> : <Copy className="w-3 h-3" />}
                  <span>go install</span>
                </button>
              </div>
            </div>

            {/* Terminal Window (7 cols) */}
            <div className="lg:col-span-7">
              <div className="rounded-lg bg-[#0D0F0D] border border-[#262A24] overflow-hidden shadow-2xl font-mono text-xs">
                {/* Terminal Title Bar */}
                <div className="bg-[#151814] px-4 py-2.5 border-b border-[#262A24] flex items-center justify-between text-zinc-400">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-zinc-600 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-zinc-600 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-zinc-600 inline-block" />
                    <span className="ml-2 text-[11px] text-zinc-300">boa — term</span>
                  </div>
                  <span className="text-[10px] text-accent">v1.2</span>
                </div>

                {/* Terminal Body */}
                <div className="p-4 sm:p-5 text-[#E0E2D8] space-y-3 min-h-[260px] overflow-x-auto">
                  {boaCmd === 'list' && (
                    <div className="space-y-2">
                      <div className="text-zinc-400">$ bo list release.zip --tree</div>
                      <div className="text-[#82B58A]">Archive: release.zip (18.4 MB)</div>
                      <div className="text-zinc-300 whitespace-pre">
{`├── cmd/
│   └── boa/
│       └── main.go       (3.2 KB, deflated 62%)
├── internal/
│   ├── compress/
│   │   ├── zstd.go       (8.4 KB, deflated 71%)
│   │   └── deflate.go    (6.1 KB, deflated 68%)
│   ├── extractor/
│   │   └── safe_zip.go   (4.9 KB, sanitized)
└── benchmarks/
    └── corpus_test.go    (12.1 KB)

Total: 5 files, 34.7 KB uncompressed -> 11.2 KB stored`}
                      </div>
                    </div>
                  )}

                  {boaCmd === 'compress' && (
                    <div className="space-y-2">
                      <div className="text-zinc-400">$ bo compress ./dataset -o dataset.tar.zst --algo zstd</div>
                      <div className="text-accent">[INFO] Algorithm: Zstandard (level 3, 4 threads)</div>
                      <div className="text-zinc-300">Scanning directory: 1,420 files found (148.6 MB)</div>
                      <div className="text-zinc-400">Streaming: [========================] 100% (148.6 MB / 148.6 MB)</div>
                      <div className="text-[#82B58A]">
                        ✓ Created dataset.tar.zst: 42.1 MB (3.53x ratio, 312 MB/s)
                      </div>
                    </div>
                  )}

                  {boaCmd === 'bench' && (
                    <div className="space-y-3">
                      <div className="text-zinc-400">$ bo bench ./corpus</div>
                      <div className="text-zinc-300">Benchmarking algorithms on 50 MB sample corpus:</div>
                      <div className="space-y-2 pt-1">
                        <div>
                          <div className="flex justify-between text-[11px] text-zinc-400">
                            <span>Zstandard (Level 3)</span>
                            <span className="text-accent">4.2x ratio · 340 MB/s</span>
                          </div>
                          <div className="w-full bg-[#1F241D] rounded-full h-2 mt-1">
                            <div className="bg-accent h-2 rounded-full" style={{ width: '85%' }} />
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between text-[11px] text-zinc-400">
                            <span>DEFLATE (Gzip Level 6)</span>
                            <span className="text-zinc-300">3.1x ratio · 95 MB/s</span>
                          </div>
                          <div className="w-full bg-[#1F241D] rounded-full h-2 mt-1">
                            <div className="bg-zinc-500 h-2 rounded-full" style={{ width: '62%' }} />
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between text-[11px] text-zinc-400">
                            <span>Store (No compression)</span>
                            <span className="text-zinc-400">1.0x ratio · 1,420 MB/s</span>
                          </div>
                          <div className="w-full bg-[#1F241D] rounded-full h-2 mt-1">
                            <div className="bg-zinc-700 h-2 rounded-full" style={{ width: '20%' }} />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {boaCmd === 'tui' && (
                    <div className="space-y-2">
                      <div className="text-zinc-400">$ bo</div>
                      <div className="text-accent">╭── Boa Interactive Archive Explorer (Bubble Tea) ────╮</div>
                      <div className="text-zinc-300 whitespace-pre">
{`│ > [dir]  assets/
│   [dir]  internal/
│   [file] README.md        (4.1 KB)
│   [file] go.mod           (240 B)
│
│ [↑/k] Up  [↓/j] Down  [Enter] Open  [c] Compress  [q] Quit`}
                      </div>
                      <div className="text-accent">╰─────────────────────────────────────────────────────╯</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* PROJECT 2: ARABIC DIACRITIZATION (Offline ShakkalV3 ONNX) */}
        {/* ========================================================================= */}
        <div className="mb-16 md:mb-20 spec-card p-6 sm:p-8 md:p-10 rounded-lg bg-surface border border-border text-start">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-5 space-y-5">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-elevated border border-border-subtle font-mono text-xs text-accent">
                <Cpu className="w-3.5 h-3.5" />
                <span>On-Device Machine Learning</span>
              </div>

              <div>
                <h3 className="type-h3 font-display font-bold text-ink">Arabic Diacritization</h3>
                <p className="text-xs font-mono text-ink-muted mt-1">Offline on-device inference powered by ShakkalV3 ONNX</p>
              </div>

              <p className="type-body text-ink-secondary leading-relaxed">
                An offline Arabic text diacritization application powered by the ShakkalV3 ONNX model.
                The application runs inference locally, without requiring a server to process user text.
              </p>

              {/* Architectural Workflow Steps */}
              <div className="space-y-2 text-xs font-mono text-ink-secondary pt-1">
                <div className="flex items-start gap-2">
                  <span className="w-4 h-4 rounded-full bg-accent/20 text-accent flex items-center justify-center text-[10px] shrink-0 mt-0.5">1</span>
                  <span>Character &amp; word tokenization pipeline</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-4 h-4 rounded-full bg-accent/20 text-accent flex items-center justify-center text-[10px] shrink-0 mt-0.5">2</span>
                  <span>ShakkalV3 ONNX runtime inference</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-4 h-4 rounded-full bg-accent/20 text-accent flex items-center justify-center text-[10px] shrink-0 mt-0.5">3</span>
                  <span>Character-level diacritic probability mapping</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-4 h-4 rounded-full bg-accent/20 text-accent flex items-center justify-center text-[10px] shrink-0 mt-0.5">4</span>
                  <span>Accurate Tashkeel recombination without network overhead</span>
                </div>
              </div>

              {/* Sample Selector */}
              <div className="pt-2">
                <div className="type-overline text-ink-muted mb-2">Select Arabic phrase:</div>
                <div className="flex flex-wrap gap-1.5">
                  {ARABIC_SAMPLES.map((sample) => (
                    <button
                      key={sample.id}
                      type="button"
                      onClick={() => setSelectedArabicSample(sample)}
                      className={`px-2.5 py-1 text-xs rounded transition-colors ${
                        selectedArabicSample.id === sample.id
                          ? 'bg-accent text-accent-fg font-semibold'
                          : 'bg-elevated border border-border-subtle text-ink hover:border-accent'
                      }`}
                    >
                      {sample.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-border-subtle">
                <a
                  href="https://github.com/ZyadWKhedr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-tactile touch-target inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md border border-border-strong bg-surface hover:bg-surface-hover text-ink transition-colors"
                >
                  <span>Explore on GitHub</span>
                  <ExternalLink className="w-3.5 h-3.5 text-ink-muted" />
                </a>
              </div>
            </div>

            {/* Arabic Diacritization Live Preview (7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              <div className="p-5 rounded-lg bg-canvas border border-border-subtle space-y-4">
                <div className="flex items-center justify-between text-xs font-mono text-ink-muted pb-2 border-b border-border-subtle">
                  <span>ONNX Inference Specimen</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px]">Tashkeel:</span>
                    <button
                      type="button"
                      onClick={() => setShowDiacritics(!showDiacritics)}
                      className="px-2 py-0.5 rounded bg-surface border border-border-strong text-accent text-xs font-semibold"
                    >
                      {showDiacritics ? 'Diacritized' : 'Raw Text'}
                    </button>
                  </div>
                </div>

                {/* Input Text Box */}
                <div className="p-4 rounded bg-surface border border-border-subtle space-y-1.5">
                  <div className="text-[11px] font-mono text-ink-muted flex items-center justify-between">
                    <span>Input (Undiacritized Arabic):</span>
                    <span className="text-[10px]">dir="rtl"</span>
                  </div>
                  <div
                    dir="rtl"
                    className="font-arabic text-xl sm:text-2xl text-ink leading-relaxed py-1"
                  >
                    {selectedArabicSample.raw}
                  </div>
                </div>

                {/* Output Text Box */}
                <div className="p-4 rounded bg-surface border border-accent/40 space-y-1.5">
                  <div className="text-[11px] font-mono text-accent flex items-center justify-between">
                    <span>ONNX Output (With Diacritics / التشكيل الكامل):</span>
                    <span className="text-[10px]">100% Offline</span>
                  </div>
                  <div
                    dir="rtl"
                    className={`font-arabic text-xl sm:text-2xl text-ink leading-loose py-1 transition-all ${
                      showDiacritics ? 'text-ink' : 'text-ink-secondary'
                    }`}
                  >
                    {showDiacritics ? selectedArabicSample.diacritized : selectedArabicSample.raw}
                  </div>
                </div>

                {/* Translation & Latency */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-ink-muted pt-1">
                  <div className="italic font-sans">
                    "{selectedArabicSample.translation}"
                  </div>
                  <div className="font-mono text-[11px] text-accent shrink-0">
                    Local Inference · 0 Server Requests
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* PROJECT 3: LIQUID NAVBAR (Flutter pub.dev Component) */}
        {/* ========================================================================= */}
        <div className="mb-16 md:mb-20 spec-card p-6 sm:p-8 md:p-10 rounded-lg bg-surface border border-border text-start">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-5 space-y-5">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-elevated border border-border-subtle font-mono text-xs text-accent">
                <Layers className="w-3.5 h-3.5" />
                <span>Flutter Package · pub.dev</span>
              </div>

              <div>
                <h3 className="type-h3 font-display font-bold text-ink">Liquid Navbar</h3>
                <p className="text-xs font-mono text-ink-muted mt-1">Reusable fluid navigation component with spring physics</p>
              </div>

              <p className="type-body text-ink-secondary leading-relaxed">
                A reusable Flutter navigation component built with spring physics and custom bezier curves.
                Calculates fluid wave deformations directly via Flutter's CustomPainter with zero heavy external dependencies.
              </p>

              {/* Package Quality Specs */}
              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="p-3 rounded bg-elevated border border-border-subtle">
                  <span className="text-ink font-bold text-lg font-mono">130/140</span>
                  <span className="text-[11px] font-mono text-ink-muted block mt-0.5">pub.dev Score</span>
                </div>
                <div className="p-3 rounded bg-elevated border border-border-subtle">
                  <span className="text-ink font-bold text-lg font-mono">0 Depts</span>
                  <span className="text-[11px] font-mono text-ink-muted block mt-0.5">Zero Bloat</span>
                </div>
              </div>

              {/* Links */}
              <div className="pt-4 border-t border-border-subtle flex flex-wrap items-center gap-3">
                <a
                  href="https://pub.dev/packages/liquid_navbar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-tactile touch-target inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md border border-border-strong bg-surface hover:bg-surface-hover text-ink transition-colors"
                >
                  <span>pub.dev Package</span>
                  <ExternalLink className="w-3.5 h-3.5 text-ink-muted" />
                </a>

                <a
                  href="https://github.com/ZyadWKhedr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-tactile touch-target inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md bg-elevated border border-border-subtle text-ink hover:border-accent transition-colors"
                >
                  <span>GitHub</span>
                  <ExternalLink className="w-3.5 h-3.5 text-ink-muted" />
                </a>
              </div>
            </div>

            {/* Interactive Canvas Demonstration (7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              <div className="p-6 rounded-lg bg-canvas border border-border-subtle space-y-4">
                <div className="flex items-center justify-between text-xs font-mono text-ink-muted pb-2 border-b border-border-subtle">
                  <span className="text-ink font-semibold">Interactive Bezier Canvas</span>
                  <span className="text-accent text-[11px]">Click items to test wave</span>
                </div>

                {/* Canvas Container */}
                <div className="relative rounded-lg overflow-hidden bg-surface border border-border-subtle p-4 flex flex-col items-center justify-center min-h-[160px]">
                  <canvas
                    ref={canvasRef}
                    width={380}
                    height={70}
                    className="w-full max-w-[380px] h-[70px]"
                  />

                  {/* Interactive Tab Buttons */}
                  <div className="flex items-center justify-around w-full max-w-[360px] pt-3">
                    {[
                      { idx: 0, label: 'Feed', x: 50 },
                      { idx: 1, label: 'Search', x: 120 },
                      { idx: 2, label: 'Saved', x: 200 },
                      { idx: 3, label: 'Profile', x: 280 },
                    ].map((btn) => (
                      <button
                        key={btn.label}
                        type="button"
                        onClick={() => handleNavClick(btn.idx, btn.x)}
                        className={`px-3 py-1.5 text-xs font-mono rounded transition-colors ${
                          activeNavIndex === btn.idx
                            ? 'text-accent font-bold'
                            : 'text-ink-muted hover:text-ink'
                        }`}
                      >
                        {btn.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="text-[11px] font-mono text-ink-muted leading-relaxed">
                  Real-time HTML5 canvas rendering reproducing the vector bezier matrix math used in Flutter's CustomPainter.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* PROJECT 4: OFFLINE QURAN RECOGNITION (Independent Research Experiment) */}
        {/* ========================================================================= */}
        <div className="spec-card p-6 sm:p-8 md:p-10 rounded-lg bg-surface border border-border text-start">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-5 space-y-5">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-elevated border border-border-subtle font-mono text-xs text-accent">
                <Volume2 className="w-3.5 h-3.5" />
                <span>Audio Research Prototype</span>
              </div>

              <div>
                <h3 className="type-h3 font-display font-bold text-ink">Offline Quran Recognition</h3>
                <p className="text-xs font-mono text-ink-muted mt-1">Independent experiment in offline audio/text recognition</p>
              </div>

              <p className="type-body text-ink-secondary leading-relaxed">
                An independent experiment exploring offline Quran audio and text recognition without server reliance.
                Focuses on edge device feasibility, Mel spectrogram feature extraction, and phonetic alignment against standardized Uthmani text.
              </p>

              {/* Research Status & Limitations */}
              <div className="p-3.5 rounded bg-elevated border-l-2 border-accent text-xs space-y-1 font-mono">
                <div className="font-bold text-ink">Implementation Status &amp; Scope:</div>
                <div className="text-ink-secondary font-sans leading-relaxed">
                  Active research prototype. Investigates lightweight CTC acoustic models to recognize recited verses locally.
                </div>
              </div>

              <div className="pt-2">
                <a
                  href="https://github.com/ZyadWKhedr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-tactile touch-target inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md border border-border-strong bg-surface hover:bg-surface-hover text-ink transition-colors"
                >
                  <span>View Research Notes on GitHub</span>
                  <ExternalLink className="w-3.5 h-3.5 text-ink-muted" />
                </a>
              </div>
            </div>

            {/* Pipeline Workflow Diagram (7 cols) */}
            <div className="lg:col-span-7">
              <div className="p-5 rounded-lg bg-canvas border border-border-subtle space-y-4 font-mono text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-border-subtle text-ink-muted">
                  <span className="text-ink font-semibold">Offline Recognition Pipeline</span>
                  <span className="text-[11px] text-accent">Local Edge Inference</span>
                </div>

                <div className="space-y-3 pt-1">
                  {/* Step 1 */}
                  <div className="p-3 rounded bg-surface border border-border-subtle flex items-start gap-3">
                    <span className="w-6 h-6 rounded bg-elevated text-accent font-bold flex items-center justify-center shrink-0">1</span>
                    <div>
                      <div className="text-ink font-semibold">Acoustic Signal Preprocessing</div>
                      <div className="text-ink-muted text-[11px] font-sans mt-0.5">
                        Raw audio sampling at 16kHz, noise reduction, and Mel Spectrogram / MFCC feature extraction.
                      </div>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="p-3 rounded bg-surface border border-border-subtle flex items-start gap-3">
                    <span className="w-6 h-6 rounded bg-elevated text-accent font-bold flex items-center justify-center shrink-0">2</span>
                    <div>
                      <div className="text-ink font-semibold">Lightweight CTC Acoustic Classifier</div>
                      <div className="text-ink-muted text-[11px] font-sans mt-0.5">
                        Compact neural network evaluating character probability matrices across temporal speech frames.
                      </div>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="p-3 rounded bg-surface border border-border-subtle flex items-start gap-3">
                    <span className="w-6 h-6 rounded bg-elevated text-accent font-bold flex items-center justify-center shrink-0">3</span>
                    <div>
                      <div className="text-ink font-semibold">Uthmani Phonetic Alignment</div>
                      <div className="text-ink-muted text-[11px] font-sans mt-0.5">
                        String similarity match against standardized Quranic verse indices stored in local SQLite cache.
                      </div>
                    </div>
                  </div>

                  {/* Limitations Card */}
                  <div className="p-3 rounded bg-elevated border border-border-subtle text-[11px] text-ink-secondary font-sans leading-relaxed">
                    <span className="font-mono text-accent font-semibold block mb-0.5">Technical Challenges:</span>
                    Handling varied Tajweed recitation styles (Ghunnah, Madd rules, elongation) and acoustic reverberation within low mobile RAM constraints.
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

export default ThingsIveBuilt;

