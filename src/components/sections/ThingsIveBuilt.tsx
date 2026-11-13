import React, { useState } from 'react';
import { Terminal, Copy, Check, Volume2, Eye } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { INDEPENDENT_PROJECTS } from '@/data/projects';
import { ProjectCard } from '@/components/ui/ProjectCard';
import LiquidNavbarInteractive from '@/components/showcase/LiquidNavbarInteractive';

type BoaCommand = 'list' | 'compress' | 'bench' | 'tui';

export const ThingsIveBuilt: React.FC = () => {
  const { t, i18n } = useTranslation();
  const shouldReduceMotion = useReducedMotion();
  const isArabic = i18n.language === 'ar';

  // Boa Terminal Interactive State
  const [boaCmd, setBoaCmd] = useState<BoaCommand>('list');
  const [copiedBoa, setCopiedBoa] = useState(false);

  // ASL Detection Interactive Preview State
  const [aslGesture, setAslGesture] = useState<'A' | 'B' | 'L' | 'Y'>('Y');

  const copyBoaInstall = () => {
    navigator.clipboard.writeText('go install github.com/ZyadWKhedr/Boa@latest');
    setCopiedBoa(true);
    setTimeout(() => setCopiedBoa(false), 2000);
  };

  // Render project-specific visual media inside consistent container
  const renderMedia = (projectId: string) => {
    if (projectId === 'liquid-navbar') {
      return <LiquidNavbarInteractive />;
    }

    if (projectId === 'boa') {
      return (
        <div className="w-full rounded-lg bg-[#0D0F0D] border border-[#262A24] overflow-hidden shadow-xl font-mono text-xs text-start" dir="ltr">
          {/* Terminal Title Bar */}
          <div className="bg-[#151814] px-3.5 py-2 border-b border-[#262A24] flex items-center justify-between text-zinc-400">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-500/80 inline-block" />
              <span className="ml-2 text-[11px] text-zinc-300">boa — term</span>
            </div>
            <button
              type="button"
              onClick={copyBoaInstall}
              className="text-[10px] text-accent hover:underline flex items-center gap-1"
              title={t('thingsIveBuilt.copyInstall', 'Copy install command')}
            >
              {copiedBoa ? <Check className="w-3 h-3 text-accent" /> : <Copy className="w-3 h-3" />}
              <span>{copiedBoa ? t('thingsIveBuilt.copied', 'Copied') : t('thingsIveBuilt.goInstall', 'go install')}</span>
            </button>
          </div>

          {/* Interactive Command Switcher */}
          <div className="bg-[#111310] px-3 py-2 border-b border-[#262A24] flex items-center gap-1.5 overflow-x-auto">
            <span className="text-[10px] text-zinc-500 uppercase tracking-wider mr-1">
              {t('thingsIveBuilt.commandLabel', 'Command:')}
            </span>
            {(['list', 'compress', 'bench', 'tui'] as BoaCommand[]).map((cmd) => (
              <button
                key={cmd}
                type="button"
                onClick={() => setBoaCmd(cmd)}
                className={`px-2 py-0.5 text-[11px] rounded transition-colors ${
                  boaCmd === cmd
                    ? 'bg-accent text-accent-fg font-semibold'
                    : 'bg-[#1D211A] text-zinc-400 hover:text-zinc-200'
                }`}
              >
                bo {cmd}
              </button>
            ))}
          </div>

          {/* Terminal Body */}
          <div className="p-3.5 sm:p-4 text-[#E0E2D8] space-y-2 min-h-[190px] overflow-x-auto text-[11px] leading-relaxed">
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
    └── safe_zip.go       (4.9 KB, sanitized)

Total: 4 files, 22.6 KB -> 7.4 KB stored`}
                </div>
              </div>
            )}

            {boaCmd === 'compress' && (
              <div className="space-y-1.5">
                <div className="text-zinc-400">$ bo compress ./dataset -o dataset.tar.zst --algo zstd</div>
                <div className="text-accent">[INFO] Algorithm: Zstandard (level 3, 4 threads)</div>
                <div className="text-zinc-300">Scanning directory: 1,420 files found (148.6 MB)</div>
                <div className="text-emerald-400">
                  ✓ Created dataset.tar.zst: 42.1 MB (3.53x ratio, 312 MB/s)
                </div>
              </div>
            )}

            {boaCmd === 'bench' && (
              <div className="space-y-2">
                <div className="text-zinc-400">$ bo bench ./corpus</div>
                <div className="text-zinc-300">Benchmarking algorithms on 50 MB sample corpus:</div>
                <div className="space-y-1.5 pt-0.5">
                  <div>
                    <div className="flex justify-between text-[10px] text-zinc-400">
                      <span>Zstandard (Level 3)</span>
                      <span className="text-accent font-semibold">4.2x ratio · 340 MB/s</span>
                    </div>
                    <div className="w-full bg-[#1F241D] rounded-full h-1.5 mt-0.5">
                      <div className="bg-accent h-1.5 rounded-full" style={{ width: '85%' }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[10px] text-zinc-400">
                      <span>DEFLATE (Gzip Level 6)</span>
                      <span className="text-zinc-300">3.1x ratio · 95 MB/s</span>
                    </div>
                    <div className="w-full bg-[#1F241D] rounded-full h-1.5 mt-0.5">
                      <div className="bg-zinc-500 h-1.5 rounded-full" style={{ width: '62%' }} />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {boaCmd === 'tui' && (
              <div className="space-y-1.5">
                <div className="text-zinc-400">$ bo</div>
                <div className="text-accent">╭── Boa Interactive Archive Explorer (Bubble Tea) ───╮</div>
                <div className="text-zinc-300 whitespace-pre">
{`│ > [dir]  internal/
│   [file] README.md        (4.1 KB)
│   [file] go.mod           (240 B)
│
│ [↑/k] Up  [↓/j] Down  [Enter] Open  [c] Compress  [q] Quit`}
                </div>
                <div className="text-accent">╰────────────────────────────────────────────────────╯</div>
              </div>
            )}
          </div>
        </div>
      );
    }

    if (projectId === 'offline-quran-recognition') {
      return (
        <div className="w-full rounded-lg bg-canvas border border-border-subtle p-3.5 sm:p-4 space-y-3 font-mono text-xs text-start">
          <div className="flex items-center justify-between pb-2 border-b border-border-subtle text-ink-muted">
            <span className="text-ink font-semibold flex items-center gap-1.5">
              <Volume2 className="w-3.5 h-3.5 text-accent" />
              <span>{t('thingsIveBuilt.offlineQuran.pipelineLabel', 'Offline Recognition Pipeline')}</span>
            </span>
            <span className="text-[10px] text-accent font-mono">Edge Acoustic</span>
          </div>

          <div className="space-y-2 pt-1">
            <div className="p-2.5 rounded bg-surface border border-border-subtle flex items-start gap-2.5">
              <span className="w-5 h-5 rounded bg-elevated text-accent font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                1
              </span>
              <div>
                <div className="text-ink font-semibold text-[11px]">
                  {t('thingsIveBuilt.offlineQuran.step1Title', 'Acoustic Signal Preprocessing')}
                </div>
                <div className="text-ink-muted text-[10px] font-sans mt-0.5">
                  {t('thingsIveBuilt.offlineQuran.step1Desc', '16kHz sampling, noise reduction, and Mel spectrogram / MFCC feature extraction.')}
                </div>
              </div>
            </div>

            <div className="p-2.5 rounded bg-surface border border-border-subtle flex items-start gap-2.5">
              <span className="w-5 h-5 rounded bg-elevated text-accent font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                2
              </span>
              <div>
                <div className="text-ink font-semibold text-[11px]">
                  {t('thingsIveBuilt.offlineQuran.step2Title', 'Lightweight CTC Acoustic Classifier')}
                </div>
                <div className="text-ink-muted text-[10px] font-sans mt-0.5">
                  {t('thingsIveBuilt.offlineQuran.step2Desc', 'Character probability matrices evaluated across temporal speech frames.')}
                </div>
              </div>
            </div>

            <div className="p-2.5 rounded bg-surface border border-border-subtle flex items-start gap-2.5">
              <span className="w-5 h-5 rounded bg-elevated text-accent font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                3
              </span>
              <div>
                <div className="text-ink font-semibold text-[11px]">
                  {t('thingsIveBuilt.offlineQuran.step3Title', 'Uthmani Phonetic Alignment')}
                </div>
                <div className="text-ink-muted text-[10px] font-sans mt-0.5">
                  {t('thingsIveBuilt.offlineQuran.step3Desc', 'Phoneme matching against standardized Quranic verse indices in local SQLite cache.')}
                </div>
              </div>
            </div>
          </div>

          <div className="p-2 rounded bg-elevated border border-border-subtle text-[10px] text-ink-secondary font-sans leading-relaxed">
            <span className="font-mono text-accent font-semibold block mb-0.5">
              {t('thingsIveBuilt.offlineQuran.researchFocus', 'Research Focus:')}
            </span>
            {t('thingsIveBuilt.offlineQuran.researchFocusText', 'Overcoming Tajweed recitation acoustic variations (Ghunnah, Madd elongation) within strict mobile RAM constraints.')}
          </div>
        </div>
      );
    }

    if (projectId === 'asl-detection') {
      return (
        <div className="w-full rounded-lg bg-[#0F110F] border border-[#252A22] p-3.5 sm:p-4 space-y-3 font-mono text-xs text-start">
          <div className="flex items-center justify-between pb-2 border-b border-[#252A22] text-zinc-400">
            <span className="text-zinc-200 font-semibold flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5 text-accent" />
              <span>{t('thingsIveBuilt.aslDetection.landmarksLabel', 'MediaPipe 3D Landmark Tracking')}</span>
            </span>
            <span className="text-[10px] text-emerald-400">30+ FPS · Local</span>
          </div>

          {/* Interactive Gesture Switcher */}
          <div className="flex items-center gap-1.5 pt-1">
            <span className="text-[10px] text-zinc-400">
              {t('thingsIveBuilt.aslDetection.testSign', 'Test Sign:')}
            </span>
            {(['Y', 'A', 'B', 'L'] as const).map((letter) => (
              <button
                key={letter}
                type="button"
                onClick={() => setAslGesture(letter)}
                className={`px-2 py-0.5 rounded text-[10px] transition-colors ${
                  aslGesture === letter
                    ? 'bg-accent text-accent-fg font-bold'
                    : 'bg-[#1E231A] text-zinc-300 hover:text-white'
                }`}
              >
                Sign "{letter}"
              </button>
            ))}
          </div>

          {/* Wireframe Landmark Visualizer */}
          <div className="relative aspect-[16/9] rounded bg-[#090A09] border border-[#20251C] flex items-center justify-center p-3 overflow-hidden" dir="ltr">
            <svg viewBox="0 0 200 130" className="w-full h-full max-h-[130px] stroke-accent fill-accent/10">
              {/* Wrist to palm landmarks */}
              <circle cx="100" cy="115" r="3" className="fill-accent stroke-accent" />
              <line x1="100" y1="115" x2="80" y2="85" strokeWidth="1.5" className="stroke-accent/70" />
              <line x1="100" y1="115" x2="95" y2="80" strokeWidth="1.5" className="stroke-accent/70" />
              <line x1="100" y1="115" x2="110" y2="80" strokeWidth="1.5" className="stroke-accent/70" />
              <line x1="100" y1="115" x2="125" y2="88" strokeWidth="1.5" className="stroke-accent/70" />

              {/* Fingers wireframe */}
              <circle cx="80" cy="85" r="2.5" />
              <circle cx="65" cy="70" r="2.5" />
              <circle cx="55" cy="55" r="3" className="fill-emerald-400 stroke-emerald-400" />
              <line x1="80" y1="85" x2="65" y2="70" strokeWidth="1.5" className="stroke-accent/70" />
              <line x1="65" y1="70" x2="55" y2="55" strokeWidth="1.5" className="stroke-accent/70" />

              <circle cx="95" cy="80" r="2.5" />
              <circle cx="92" cy="55" r="2.5" />
              <circle cx="90" cy="35" r="3" className="fill-emerald-400 stroke-emerald-400" />
              <line x1="95" y1="80" x2="92" y2="55" strokeWidth="1.5" className="stroke-accent/70" />
              <line x1="92" y1="55" x2="90" y2="35" strokeWidth="1.5" className="stroke-accent/70" />

              <circle cx="110" cy="80" r="2.5" />
              <circle cx="112" cy="55" r="2.5" />
              <circle cx="115" cy="38" r="3" className="fill-emerald-400 stroke-emerald-400" />
              <line x1="110" y1="80" x2="112" y2="55" strokeWidth="1.5" className="stroke-accent/70" />
              <line x1="112" y1="55" x2="115" y2="38" strokeWidth="1.5" className="stroke-accent/70" />

              <circle cx="125" cy="88" r="2.5" />
              <circle cx="138" cy="75" r="2.5" />
              <circle cx="148" cy="65" r="3" className="fill-emerald-400 stroke-emerald-400" />
              <line x1="125" y1="88" x2="138" y2="75" strokeWidth="1.5" className="stroke-accent/70" />
              <line x1="138" y1="75" x2="148" y2="65" strokeWidth="1.5" className="stroke-accent/70" />
            </svg>

            {/* Inference overlay tag */}
            <div className="absolute top-2 end-2 px-2 py-0.5 rounded bg-black/80 border border-emerald-500/50 text-[10px] text-emerald-400 font-mono">
              Classified: <span className="font-bold text-white text-xs">"{aslGesture}"</span> (98.4%)
            </div>
            <div className="absolute bottom-2 start-2 text-[9px] text-zinc-500 font-mono">
              21 3D Cartesian coordinates (X, Y, Z)
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-center text-[10px]">
            <div className="p-1.5 rounded bg-[#171A15] border border-[#262B22] text-zinc-300">
              <span className="text-zinc-500 block text-[9px]">{isArabic ? 'النموذج' : 'Model'}</span>
              <span>MediaPipe + MLP</span>
            </div>
            <div className="p-1.5 rounded bg-[#171A15] border border-[#262B22] text-zinc-300">
              <span className="text-zinc-500 block text-[9px]">{isArabic ? 'الحساس' : 'Sensor'}</span>
              <span>{isArabic ? 'كاميرا قياسية' : 'Commodity Webcam'}</span>
            </div>
          </div>
        </div>
      );
    }

    return null;
  };

  // Map independent projects to localized keys
  const getLocalizedProject = (id: string) => {
    switch (id) {
      case 'liquid-navbar':
        return {
          title: t('thingsIveBuilt.liquidNavbar.title', 'Liquid Navbar'),
          category: t('thingsIveBuilt.liquidNavbar.category', 'Open-Source Flutter Package · pub.dev'),
          summary: t('thingsIveBuilt.liquidNavbar.summary', 'A physics-based fluid navigation bar component package published on pub.dev.'),
          contribution: t('thingsIveBuilt.liquidNavbar.contribution', 'Author & package maintainer.'),
          details: [
            t('thingsIveBuilt.liquidNavbar.h1', 'pub.dev verified score: 130/140'),
            t('thingsIveBuilt.liquidNavbar.h2', '0 external dependencies (pure Flutter framework)'),
            t('thingsIveBuilt.liquidNavbar.h3', 'Fluid wave deformation via CustomPainter'),
            t('thingsIveBuilt.liquidNavbar.h4', 'Tested across iOS, Android, macOS, and Web'),
          ],
        };
      case 'boa':
        return {
          title: t('thingsIveBuilt.boa.title', 'Boa'),
          category: t('thingsIveBuilt.boa.category', 'Developer Tool · Go Systems & CLI'),
          summary: t('thingsIveBuilt.boa.summary', 'An open-source terminal compression toolkit and file explorer in Go.'),
          contribution: t('thingsIveBuilt.boa.contribution', 'Author. Architected streaming pipelines and TUI.'),
          details: [
            t('thingsIveBuilt.boa.h1', 'Multi-threaded Zstandard & DEFLATE streaming'),
            t('thingsIveBuilt.boa.h2', 'Zip-Slip path traversal vulnerability protection'),
            t('thingsIveBuilt.boa.h3', 'Bubble Tea interactive keyboard-driven TUI'),
            t('thingsIveBuilt.boa.h4', 'Built-in compression ratio & throughput benchmarks'),
          ],
        };
      case 'offline-quran-recognition':
        return {
          title: t('thingsIveBuilt.offlineQuran.title', 'Offline Quran Recognition'),
          category: t('thingsIveBuilt.offlineQuran.category', 'Independent Applied AI Research'),
          summary: t('thingsIveBuilt.offlineQuran.summary', 'An independent research prototype exploring edge-device offline speech recognition.'),
          contribution: t('thingsIveBuilt.offlineQuran.contribution', 'Independent researcher.'),
          details: [
            t('thingsIveBuilt.offlineQuran.h1', 'Edge Mel spectrogram & MFCC feature extraction'),
            t('thingsIveBuilt.offlineQuran.h2', 'Lightweight CTC acoustic classification'),
            t('thingsIveBuilt.offlineQuran.h3', 'Uthmani text alignment with phoneme matching'),
            t('thingsIveBuilt.offlineQuran.h4', '100% Offline execution without cloud APIs'),
          ],
        };
      case 'asl-detection':
        return {
          title: t('thingsIveBuilt.aslDetection.title', 'Real-Time ASL Alphabet Recognition'),
          category: t('thingsIveBuilt.aslDetection.category', 'Computer Vision & Applied AI'),
          summary: t('thingsIveBuilt.aslDetection.summary', 'A real-time computer vision pipeline utilizing MediaPipe hand tracking.'),
          contribution: t('thingsIveBuilt.aslDetection.contribution', 'Author & ML engineer.'),
          details: [
            t('thingsIveBuilt.aslDetection.h1', '21 3D hand landmark tracking via MediaPipe'),
            t('thingsIveBuilt.aslDetection.h2', 'Real-time webcam inference at 30+ FPS'),
            t('thingsIveBuilt.aslDetection.h3', 'Feature engineering & landmark normalization'),
            t('thingsIveBuilt.aslDetection.h4', 'Published research writeup on Medium / Stackademic'),
          ],
        };
      default:
        return { title: '', category: '', summary: '', contribution: '', details: [] };
    }
  };

  return (
    <section id="projects" className="scroll-mt-20 py-14 md:py-18 border-b border-border-subtle bg-surface/30">
      <div className="container max-w-site mx-auto px-5 sm:px-7 lg:px-10">
        {/* Section Header */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="max-w-reading mb-10 md:mb-12 text-start"
        >
          <div className="type-overline text-accent font-mono mb-2.5">
            {t('thingsIveBuilt.eyebrow', 'INDEPENDENT ENGINEERING & EXPERIMENTS')}
          </div>
          <h2 className="type-h2 font-display text-ink mb-3 tracking-tight">
            {t('thingsIveBuilt.title', "Things I've built")}
          </h2>
          <p className="type-body text-ink-secondary leading-relaxed">
            {t('thingsIveBuilt.subtitle', 'Projects that started with a technical question, an interesting problem, or something I wanted to understand better — spanning open-source packages, systems tools, and applied computer vision.')}
          </p>
        </motion.div>

        {/* Unified Independent Project Cards List */}
        <div className="space-y-8 md:space-y-10">
          {INDEPENDENT_PROJECTS.map((project, idx) => {
            const isReversed = idx % 2 !== 0;
            const loc = getLocalizedProject(project.id);

            return (
              <motion.div
                key={project.id}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
                whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.45, delay: idx * 0.05, ease: 'easeOut' }}
              >
                <ProjectCard
                  id={project.id}
                  title={loc.title}
                  category={loc.category}
                  summary={loc.summary}
                  contribution={loc.contribution}
                  contributionDetails={loc.details}
                  stack={project.stack}
                  links={project.links}
                  media={renderMedia(project.id)}
                  reversed={isReversed}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ThingsIveBuilt;
