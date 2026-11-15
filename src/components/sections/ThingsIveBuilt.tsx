import React, { useState } from 'react';
import {
  Terminal,
  Copy,
  Check,
  ExternalLink,
  Cpu,
  Sparkles,
  ArrowUpRight,
  Code2,
  FileCode,
  ShieldCheck,
  Layers,
  Activity,
  Mic,
  AlignLeft,
} from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { getAssetUrl } from '@/lib/utils';
import { scrollReveal } from '@/lib/animations';
import LiquidNavbarInteractive from '@/components/showcase/LiquidNavbarInteractive';

type BoaCommand = 'list' | 'compress' | 'bench' | 'tui';

export const ThingsIveBuilt: React.FC = () => {
  const { t, i18n } = useTranslation();
  const shouldReduceMotion = useReducedMotion();
  const isRtl = i18n.language === 'ar';

  // Boa Terminal Interactive State
  const [boaCmd, setBoaCmd] = useState<BoaCommand>('list');
  const [copiedBoa, setCopiedBoa] = useState(false);

  // Tashkeel Interactive Before/After State
  const [isTashkeelVocalized, setIsTashkeelVocalized] = useState(true);

  const copyBoaInstall = () => {
    navigator.clipboard.writeText('go install github.com/ZyadWKhedr/Boa@latest');
    setCopiedBoa(true);
    setTimeout(() => setCopiedBoa(false), 2000);
  };

  return (
    <section id="projects" className="scroll-mt-20 py-16 md:py-24 border-b border-border-subtle bg-surface/30">
      <div className="container max-w-site mx-auto px-5 sm:px-7 lg:px-10">
        {/* Section Header */}
        <motion.div
          variants={scrollReveal}
          initial={shouldReduceMotion ? false : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          className="max-w-reading mb-14 md:mb-20 text-start"
        >
          <div className="type-overline text-accent font-mono mb-2.5">
            {t('thingsIveBuilt.eyebrow', 'INDEPENDENT ENGINEERING & OPEN SOURCE')}
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-ink mb-3 tracking-tight">
            {t('thingsIveBuilt.title', "Things I've built")}
          </h2>
          <p className="text-base sm:text-lg text-ink-secondary leading-relaxed">
            {t(
              'thingsIveBuilt.subtitle',
              'Independent projects, open-source tools, and experiments driven by engineering problems I wanted to understand or solve.'
            )}
          </p>
        </motion.div>

        {/* 4 Dedicated Independent Project Showcases */}
        <div className="space-y-16 md:space-y-24">
          {/* ========================================================================= */}
          {/* 01 · BOA: GO CLI & TUI TOOLKIT */}
          {/* ========================================================================= */}
          <motion.div
            variants={scrollReveal}
            initial={shouldReduceMotion ? false : 'hidden'}
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="rounded-2xl border border-border bg-surface p-6 sm:p-10 shadow-card"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Left Column: Description & Metadata (5 cols) */}
              <div className="lg:col-span-5 space-y-4 text-start">
                <div className="flex items-center gap-2 text-xs font-mono text-accent">
                  <Terminal className="w-4 h-4" />
                  <span>GO CLI & TUI TOOLKIT · OPEN SOURCE</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold font-display text-ink">
                  Boa — Terminal Compression Engine
                </h3>

                <p className="text-sm sm:text-base text-ink-secondary leading-relaxed">
                  {isRtl
                    ? 'أداة سطر أوامر ومستكشف ملفات مفتوح المصدر كُتب بلغة Go. تتيح ضغط واستعراض الأرشيف دون فك الضغط، ومقارنة سرعة الخوارزميات، مع حماية مدمجة من ثغرات مسار Zip-Slip.'
                    : 'An open-source terminal compression toolkit and file explorer built in Go. Supports streaming multi-threaded Zstandard & DEFLATE compression, archive inspection without extraction, filesystem benchmarking, and Zip-Slip protection.'}
                </p>

                <div className="p-3.5 rounded-xl bg-elevated border border-border-subtle space-y-1.5 text-xs font-mono text-ink-secondary">
                  <div className="flex items-center gap-2 text-ink font-semibold">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Zip-Slip Path Traversal Protection</span>
                  </div>
                  <div className="flex items-center gap-2 text-ink font-semibold">
                    <Activity className="w-3.5 h-3.5 text-accent" />
                    <span>Multi-threaded Streaming I/O Engine</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-1.5">
                  {['Go', 'Bubble Tea TUI', 'Zstandard', 'DEFLATE', 'CLI'].map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded text-[11px] font-mono bg-surface border border-border-subtle text-ink-muted"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <a
                    href="https://github.com/ZyadWKhedr/Boa"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-tactile touch-target inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg bg-accent text-accent-fg hover:bg-accent-hover transition-all"
                  >
                    <Code2 className="w-3.5 h-3.5" />
                    <span>GitHub Repository</span>
                  </a>

                  <button
                    type="button"
                    onClick={copyBoaInstall}
                    className="btn-tactile touch-target inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-mono rounded-lg border border-border bg-surface text-ink hover:border-accent transition-all"
                  >
                    {copiedBoa ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-ink-muted" />
                        <span>go install</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Right Column: Realistic Interactive Terminal (7 cols) */}
              <div className="lg:col-span-7">
                <div className="w-full rounded-xl bg-[#0B0D12] border border-[#232938] overflow-hidden shadow-2xl font-mono text-xs text-start" dir="ltr">
                  {/* Title Bar */}
                  <div className="bg-[#121620] px-4 py-2.5 border-b border-[#232938] flex items-center justify-between text-zinc-400">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
                      <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 inline-block" />
                      <span className="w-2.5 h-2.5 rounded-full bg-green-500/80 inline-block" />
                      <span className="ml-2 text-[11px] text-zinc-300 font-mono">boa — interactive terminal</span>
                    </div>
                    <span className="text-[10px] text-accent/80 font-mono">v1.2.0</span>
                  </div>

                  {/* Command Tabs */}
                  <div className="bg-[#0E1119] px-3.5 py-2 border-b border-[#232938] flex items-center gap-1.5 overflow-x-auto">
                    <span className="text-[10px] text-zinc-500 uppercase tracking-wider mr-1">
                      Command:
                    </span>
                    {(['list', 'compress', 'bench', 'tui'] as BoaCommand[]).map((cmd) => (
                      <button
                        key={cmd}
                        type="button"
                        onClick={() => setBoaCmd(cmd)}
                        className={`px-2.5 py-1 text-[11px] rounded transition-all ${
                          boaCmd === cmd
                            ? 'bg-accent text-accent-fg font-semibold shadow-xs'
                            : 'bg-[#181D29] text-zinc-400 hover:text-zinc-200'
                        }`}
                      >
                        bo {cmd}
                      </button>
                    ))}
                  </div>

                  {/* Terminal Display */}
                  <div className="p-4 sm:p-5 text-[#E0E5F0] space-y-2 min-h-[200px] overflow-x-auto text-[11px] leading-relaxed">
                    {boaCmd === 'list' && (
                      <div className="space-y-1.5">
                        <div className="text-zinc-400">$ bo list release.zip --tree</div>
                        <div className="text-emerald-400">Archive: release.zip (18.4 MB)</div>
                        <div className="text-zinc-300 whitespace-pre">
{`├── cmd/boa/main.go       (3.2 KB, deflated 62%)
├── internal/compress/
│   ├── zstd.go           (8.4 KB, deflated 71%)
│   └── deflate.go        (6.1 KB, deflated 68%)
└── internal/extractor/
    └── safe_zip.go       (4.9 KB, Zip-Slip sanitized)

Total: 4 files, 22.6 KB -> 7.4 KB stored`}
                        </div>
                      </div>
                    )}

                    {boaCmd === 'compress' && (
                      <div className="space-y-1.5">
                        <div className="text-zinc-400">$ bo compress ./dataset -o bundle.tar.zst --algo zstd</div>
                        <div className="text-accent">[INFO] Algorithm: Zstandard (level 3, 4 threads)</div>
                        <div className="text-zinc-300">Scanning directory: 1,420 files (482.1 MB)</div>
                        <div className="text-emerald-400">Compressing: [====================] 100% (78.4 MB/s)</div>
                        <div className="text-zinc-300">Saved: bundle.tar.zst (114.6 MB, ratio 4.2:1)</div>
                      </div>
                    )}

                    {boaCmd === 'bench' && (
                      <div className="space-y-1.5">
                        <div className="text-zinc-400">$ bo bench ./sample-data --rounds 5</div>
                        <div className="text-accent">Benchmarking algorithms on 100MB corpus:</div>
                        <div className="text-zinc-300 whitespace-pre">
{`Algorithm    Throughput     Ratio    Peak RAM
DEFLATE      28.4 MB/s      3.1:1    14.2 MB
Zstandard    94.8 MB/s      4.4:1    22.8 MB  (Winner)
Store       480.2 MB/s      1.0:1     2.1 MB`}
                        </div>
                      </div>
                    )}

                    {boaCmd === 'tui' && (
                      <div className="space-y-1.5">
                        <div className="text-zinc-400">$ bo tui</div>
                        <div className="text-emerald-400">Bubble Tea Terminal UI initialized</div>
                        <div className="text-zinc-300 whitespace-pre">
{`[Explorer] Select an archive or directory to inspect:
▸ assets/data.tar.gz    [Press Enter to inspect tree]
  build/release.zip
  docs/manual.pdf
[Keys: ↑/↓ navigate · Enter inspect · q quit]`}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ========================================================================= */}
          {/* 02 · TASHKEEL: ON-DEVICE ARABIC DIACRITIZATION APP */}
          {/* ========================================================================= */}
          <motion.div
            variants={scrollReveal}
            initial={shouldReduceMotion ? false : 'hidden'}
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="rounded-2xl border border-border bg-surface p-6 sm:p-10 shadow-card"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Left Column: Description & Model Details (6 cols) */}
              <div className="lg:col-span-6 space-y-4 text-start">
                <div className="flex items-center gap-2 text-xs font-mono text-accent">
                  <Cpu className="w-4 h-4" />
                  <span>MOBILE APP · ON-DEVICE NEURAL INFERENCE</span>
                </div>

                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-xl overflow-hidden bg-surface border border-border p-1 shrink-0">
                    <img
                      src={getAssetUrl('assets/images/projects/tashkeel/tashkeel-icon.webp')}
                      alt="Tashkeel icon"
                      width={44}
                      height={44}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-bold font-display text-ink">
                      Tashkeel — تَشْكِيل
                    </h3>
                    <span className="text-xs font-mono text-ink-muted">
                      iOS & iPadOS · App Store ID: 6827159466
                    </span>
                  </div>
                </div>

                <p className="text-sm sm:text-base text-ink-secondary leading-relaxed">
                  {isRtl
                    ? 'تطبيق موبايل لنظام iOS قمت ببنائه لتشكيل النصوص العربية محلياً بالكامل. يدمج التطبيق نموذج Shakkala v3 المدرب مسبقاً عبر ONNX Runtime لمعالجة النصوص وإضافة الحركات الإعرابية دون رفع أي نصوص إلى خوادم خارجية.'
                    : 'A consumer iOS mobile application built for offline Arabic text diacritization. Integrates the pretrained Shakkala v3 neural model via on-device ONNX runtime to restore Arabic Harakat locally with zero server uploads and total privacy.'}
                </p>

                <div className="grid grid-cols-2 gap-3 text-xs font-mono text-ink-secondary">
                  <div className="p-3 rounded-lg bg-elevated border border-border-subtle">
                    <span className="text-ink font-semibold block mb-0.5">Shakkala v3 ONNX</span>
                    <span className="text-[11px] text-ink-muted">Pretrained Context Model</span>
                  </div>
                  <div className="p-3 rounded-lg bg-elevated border border-border-subtle">
                    <span className="text-ink font-semibold block mb-0.5">100% Offline</span>
                    <span className="text-[11px] text-ink-muted">Zero Cloud Telemetry</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  {['Flutter', 'Dart', 'ONNX Runtime', 'Shakkala v3', 'Edge ML', 'Arabic NLP'].map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded text-[11px] font-mono bg-surface border border-border-subtle text-ink-muted"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <Link
                    to="/tashkeel/"
                    className="btn-tactile touch-target inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg bg-accent text-accent-fg hover:bg-accent-hover transition-all"
                  >
                    <span>View Product Landing Page</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>

                  <a
                    href="https://apps.apple.com/us/app/tashkeel-%D8%AA-%D8%B4-%D9%83-%D9%8A%D9%84/id6827159466"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-tactile touch-target inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium rounded-lg border border-border bg-surface text-ink hover:border-accent transition-all"
                  >
                    <span>App Store</span>
                    <ExternalLink className="w-3 h-3 text-ink-muted" />
                  </a>
                </div>
              </div>

              {/* Right Column: Live Before/After Diacritization Demonstration (6 cols) */}
              <div className="lg:col-span-6 space-y-4">
                <div className="rounded-xl border border-border bg-elevated p-5 sm:p-6 text-start space-y-4">
                  <div className="flex items-center justify-between border-b border-border-subtle pb-3">
                    <span className="text-xs font-mono font-semibold text-accent uppercase tracking-wider">
                      Interactive Text Demonstration
                    </span>
                    <div className="inline-flex p-0.5 rounded-lg bg-surface border border-border text-[11px] font-mono">
                      <button
                        type="button"
                        onClick={() => setIsTashkeelVocalized(false)}
                        className={`px-2.5 py-1 rounded transition-colors ${
                          !isTashkeelVocalized
                            ? 'bg-ink text-canvas font-semibold'
                            : 'text-ink-muted hover:text-ink'
                        }`}
                      >
                        Raw
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsTashkeelVocalized(true)}
                        className={`px-2.5 py-1 rounded transition-colors ${
                          isTashkeelVocalized
                            ? 'bg-accent text-accent-fg font-semibold'
                            : 'text-ink-muted hover:text-ink'
                        }`}
                      >
                        Vocalized
                      </button>
                    </div>
                  </div>

                  {/* Display Area */}
                  <div className="min-h-[100px] flex items-center justify-center p-4 rounded-lg bg-surface border border-border-subtle">
                    <p
                      dir="rtl"
                      className={`text-xl sm:text-2xl font-serif text-center leading-[2] transition-colors duration-200 ${
                        isTashkeelVocalized ? 'text-accent font-bold' : 'text-ink-secondary'
                      }`}
                    >
                      {isTashkeelVocalized
                        ? 'ذَهَبَ الطَّالِبُ إِلَى الْمَدْرَسَةِ صَبَاحًا بِنَشَاطٍ'
                        : 'ذهب الطالب الى المدرسة صباحا بنشاط'}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-[11px] font-mono text-ink-muted pt-1">
                    <span>{isTashkeelVocalized ? '✓ Full Harakat Inferred' : '• Unvocalized Arabic'}</span>
                    <span>100% Local Inference</span>
                  </div>
                </div>

                {/* Real App Screenshot Thumbnail Preview */}
                <div className="relative rounded-xl border border-border overflow-hidden aspect-[16/7] bg-black">
                  <img
                    src={getAssetUrl('assets/images/projects/tashkeel/tashkeel-preview.webp')}
                    alt="Tashkeel App Output Preview"
                    width={500}
                    height={218}
                    className="w-full h-full object-cover object-top filter contrast-[1.03]"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* ========================================================================= */}
          {/* 03 · LIQUID NAVBAR: FLUTTER PACKAGE ON PUB.DEV */}
          {/* ========================================================================= */}
          <motion.div
            variants={scrollReveal}
            initial={shouldReduceMotion ? false : 'hidden'}
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="rounded-2xl border border-border bg-surface p-6 sm:p-10 shadow-card"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Left Column: Package Info (5 cols) */}
              <div className="lg:col-span-5 space-y-4 text-start">
                <div className="flex items-center gap-2 text-xs font-mono text-accent">
                  <Layers className="w-4 h-4" />
                  <span>FLUTTER PACKAGE · PUB.DEV</span>
                </div>

                <div className="flex items-baseline gap-3">
                  <h3 className="text-2xl sm:text-3xl font-bold font-display text-ink">
                    Liquid Navbar
                  </h3>
                  <span className="px-2 py-0.5 rounded text-xs font-mono font-bold bg-accent/15 text-accent border border-accent/30">
                    pub.dev 130/140
                  </span>
                </div>

                <p className="text-sm sm:text-base text-ink-secondary leading-relaxed">
                  {isRtl
                    ? 'حزمة فلاتر مفتوحة المصدر ومنشورة على pub.dev لإنشاء شريط تنقل انسيابي بتأثيرات الزجاج السائل وفيزياء النوابض. كُتبت بالكامل عبر CustomPainter ورياضيات Bezier لضمان 60 إطاراً في الثانية دون أي مكتبات خارجية.'
                    : 'A reusable Flutter navigation component package published on pub.dev. Engineered strictly with native CustomPainter and cubic bezier matrix math for fluid spring transitions at 60fps without heavy external animation dependencies.'}
                </p>

                <div className="flex flex-wrap items-center gap-1.5">
                  {['Flutter', 'Dart', 'CustomPainter', 'Bezier Curves', 'Spring Physics', 'pub.dev'].map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded text-[11px] font-mono bg-surface border border-border-subtle text-ink-muted"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <a
                    href="https://pub.dev/packages/liquid_navbar"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-tactile touch-target inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg bg-accent text-accent-fg hover:bg-accent-hover transition-all"
                  >
                    <span>View on pub.dev</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>

                  <a
                    href="https://github.com/ZyadWKhedr/Liquid_NavBar"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-tactile touch-target inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium rounded-lg border border-border bg-surface text-ink hover:border-accent transition-all"
                  >
                    <Code2 className="w-3.5 h-3.5" />
                    <span>GitHub</span>
                  </a>
                </div>
              </div>

              {/* Right Column: Contained Interactive Preview (7 cols) */}
              <div className="lg:col-span-7">
                <div className="rounded-xl border border-border bg-elevated p-6 text-center space-y-3 overflow-hidden">
                  <div className="flex items-center justify-between text-xs font-mono text-ink-muted pb-2 border-b border-border-subtle">
                    <span>Interactive Physics Canvas</span>
                    <span className="text-accent font-semibold">Tap tabs to test spring curves</span>
                  </div>
                  {/* Strictly Contained Interactive Liquid Navbar */}
                  <div className="py-6 flex justify-center">
                    <LiquidNavbarInteractive />
                  </div>
                  <p className="text-[11px] font-mono text-ink-muted">
                    Contained canvas rendering vector cubic bezier curvature with simulated spring damping.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ========================================================================= */}
          {/* 04 · OFFLINE QURAN RECOGNITION: ACTIVE RESEARCH PROTOTYPE */}
          {/* ========================================================================= */}
          <motion.div
            variants={scrollReveal}
            initial={shouldReduceMotion ? false : 'hidden'}
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="rounded-2xl border border-border bg-surface p-6 sm:p-10 shadow-card"
          >
            <div className="space-y-6 text-start">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2 text-xs font-mono text-accent">
                  <Mic className="w-4 h-4" />
                  <span>AUDIO RECOGNITION & PHONETICS</span>
                </div>
                <span className="px-2.5 py-1 rounded text-xs font-mono font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30">
                  ACTIVE RESEARCH PROTOTYPE
                </span>
              </div>

              <div className="max-w-2xl space-y-2">
                <h3 className="text-2xl sm:text-3xl font-bold font-display text-ink">
                  Offline Quran Audio Recognition
                </h3>
                <p className="text-sm sm:text-base text-ink-secondary leading-relaxed">
                  {isRtl
                    ? 'تجربة بحثية مستقلة تستكشف التعرف الصوتي على تلاوات القرآن ومطابقتها أوفلاين مع نص المصحف بالرسم العثماني. تُقيّم التجربة معالجة الصوت بتردد 16 كيلوهرتز، واستخراج طيف Mel، والمطابقة الصوتية تحت قيود ذاكرة أجهزة الموبايل.'
                    : 'An independent research experiment exploring offline Quran audio recognition and phonetic alignment against standardized Uthmani text. Evaluates 16 kHz audio preprocessing, Mel spectrogram / MFCC feature extraction, and lightweight CTC alignment under mobile memory budgets.'}
                </p>
              </div>

              {/* Research Pipeline Architecture Diagram */}
              <div className="p-6 rounded-xl bg-elevated border border-border space-y-3">
                <div className="text-xs font-mono font-semibold text-ink uppercase tracking-wider mb-2">
                  Acoustic Pipeline Flow
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-center">
                  <div className="p-3 rounded-lg bg-surface border border-border-subtle space-y-1">
                    <span className="text-[10px] font-mono text-accent block">STAGE 01</span>
                    <span className="text-xs font-bold text-ink block">Audio Input</span>
                    <span className="text-[11px] text-ink-muted block">16 kHz PCM stream</span>
                  </div>
                  <div className="p-3 rounded-lg bg-surface border border-border-subtle space-y-1">
                    <span className="text-[10px] font-mono text-accent block">STAGE 02</span>
                    <span className="text-xs font-bold text-ink block">Signal Processing</span>
                    <span className="text-[11px] text-ink-muted block">Mel Spectrogram / MFCC</span>
                  </div>
                  <div className="p-3 rounded-lg bg-surface border border-border-subtle space-y-1">
                    <span className="text-[10px] font-mono text-accent block">STAGE 03</span>
                    <span className="text-xs font-bold text-ink block">Acoustic Model</span>
                    <span className="text-[11px] text-ink-muted block">Lightweight CTC network</span>
                  </div>
                  <div className="p-3 rounded-lg bg-surface border border-border-subtle space-y-1">
                    <span className="text-[10px] font-mono text-accent block">STAGE 04</span>
                    <span className="text-xs font-bold text-ink block">Verse Alignment</span>
                    <span className="text-[11px] text-ink-muted block">Uthmani phoneme match</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-1.5">
                {['Python', 'CTC Acoustic Model', 'Mel Spectrogram', 'Uthmani Text DB', 'NumPy'].map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 rounded text-[11px] font-mono bg-surface border border-border-subtle text-ink-muted"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ThingsIveBuilt;
