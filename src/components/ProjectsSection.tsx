import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription } from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { Github, Apple, ArrowUpRight, Plus, Brain, Cog, TrendingUp } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useIsMobile } from '@/hooks/use-mobile';
import payssIcon from '@/assets/payss-icon.png';
import wofoodiIcon from '@/assets/wofoodi-icon.jpg';
import amoomyIcon from '@/assets/amoomy-icon.png';
import ravalIcon from '@/assets/raval-icon.png';
import chessIcon from '@/assets/chess-icon.png';
import clipflowIcon from '@/assets/clipflow-icon.png';

type ProjectCategory = 'mobile' | 'desktop' | 'ai';

type Project = {
  title: string;
  problem: string;
  description: string;
  technologies: string[];
  features: string[];
  bullets: { edge: string; tech: string; impact: string };
  result?: string;
  gradient: string;
  icon: string;
  iconImage?: string;
  category: ProjectCategory;
  storeLinks?: { playStore?: string; appStore?: string };
  githubUrl?: string;
};

const ProjectsSection = () => {
  const [active, setActive] = useState<Project | null>(null);
  const [showAll, setShowAll] = useState<Record<string, boolean>>({});
  const isMobile = useIsMobile();

  const projects: Project[] = [
    {
      title: 'Payss',
      problem: 'Turning everyday purchases into instant, social rewards.',
      description:
        "Consumer Flutter app for a social loyalty platform — connecting shoppers, merchants and a web dashboard with real-time rewards and discovery.",
      technologies: ['Flutter', 'REST APIs', 'Realtime', 'QR Scanner', 'Google Maps'],
      features: [
        "Social feed with live merchant 'vibes'",
        'QR scanner for instant points',
        'Smart map with filtering',
        'Guest Mode, OTP login & Dark Mode',
      ],
      bullets: {
        edge: 'Loyalty that feels social — instant rewards from every scan.',
        tech: 'Flutter + Realtime APIs, QR + Google Maps with offline-safe caching.',
        impact: 'Connects shoppers and merchants in one tap.',
      },
      gradient: 'from-flutter-purple to-flutter-teal',
      icon: '💳',
      iconImage: payssIcon,
      category: 'mobile',
      storeLinks: {
        playStore: 'https://play.google.com/store/apps/details?id=com.payss.app',
        appStore: 'https://apps.apple.com/eg/app/payss/id6767013931',
      },
    },
    {
      title: 'Wofoodi',
      problem: 'Helping drivers find the nearest fuel at the right price — fast.',
      description: 'Live location tracking app for nearest fuel stations with real-time pricing.',
      technologies: ['Flutter', 'Google Maps', 'Firebase Auth', 'REST API'],
      features: ['Live location tracking', 'Route navigation', 'Real-time fuel prices', 'Offline caching'],
      bullets: {
        edge: 'Finds the cheapest fuel within seconds of opening the app.',
        tech: 'Flutter, Google Maps SDK, Firebase Auth, live REST sync.',
        impact: 'Live in two GCC markets with growing daily usage.',
      },
      gradient: 'from-flutter-blue to-flutter-light-blue',
      icon: '⛽',
      iconImage: wofoodiIcon,
      category: 'mobile',
      storeLinks: {
        appStore: 'https://apps.apple.com/eg/app/%D9%88%D9%81%D9%88%D8%AF%D9%8A/id6751444551',
        playStore: 'https://play.google.com/store/apps/details?id=com.wofoodi.app.sa&hl=en',
      },
    },
    {
      title: 'Amoomy',
      problem: 'Simplifying heavy-transport logistics for clients & providers.',
      description: 'Full-featured logistics app with multi-role authentication system.',
      technologies: ['Flutter', 'Firebase Auth', 'REST APIs', 'Provider'],
      features: ['Apple & Google sign-in', 'Order management', 'Provider scheduling', 'Clean Architecture'],
      bullets: {
        edge: 'One app for clients, drivers and ops — no friction.',
        tech: 'Flutter + Provider, Apple/Google sign-in, Clean Architecture.',
        impact: 'Streamlined heavy-transport bookings end-to-end.',
      },
      gradient: 'from-flutter-teal to-flutter-purple',
      icon: '🚚',
      iconImage: amoomyIcon,
      category: 'mobile',
      storeLinks: {
        appStore:
          'https://apps.apple.com/eg/app/amoomy-%D8%B9%D9%85%D9%88%D9%85%D9%8A-%D8%A7%D9%84%D9%86%D9%82%D9%84-%D8%A7%D9%84%D8%AB%D9%82%D9%8A%D9%84/id6753125564',
        playStore: 'https://play.google.com/store/apps/details?id=com.zeroonez.amoomy&hl=en',
      },
    },
    {
      title: 'Raval',
      problem: 'Making clothes shopping effortless from browse to delivery.',
      description: 'E-commerce app for easy and fast clothing shopping with order tracking.',
      technologies: ['Flutter', 'REST API', 'Clean Architecture', 'Provider'],
      features: ['Category filtering', 'Smart cart', 'Order tracking', 'Real-time order status'],
      bullets: {
        edge: 'Browse → checkout → track in under three taps.',
        tech: 'Flutter + REST, Provider state, Clean Architecture layers.',
        impact: 'Live retail app shipping orders daily.',
      },
      gradient: 'from-flutter-purple to-flutter-blue',
      icon: '👕',
      iconImage: ravalIcon,
      category: 'mobile',
      storeLinks: {
        appStore: 'https://apps.apple.com/us/app/raval/id6756228964',
        playStore: 'https://play.google.com/store/apps/details?id=com.zeroonez.raval',
      },
    },
    {
      title: 'ClipFlow',
      problem: 'Bringing order to chaotic copy-paste workflows on macOS.',
      description: 'macOS clipboard manager that organizes your copy history into smart, searchable flows.',
      technologies: ['Swift', 'macOS', 'AppKit', 'SwiftUI'],
      features: ['Clipboard history', 'Smart search', 'Quick paste shortcuts', 'Native macOS experience'],
      bullets: {
        edge: 'Never lose a copied snippet — searchable, organized history.',
        tech: 'Native Swift + SwiftUI on macOS with AppKit hooks.',
        impact: 'Shipped on the Mac App Store.',
      },
      gradient: 'from-flutter-blue to-flutter-purple',
      icon: '📋',
      iconImage: clipflowIcon,
      category: 'desktop',
      storeLinks: { appStore: 'https://apps.apple.com/eg/app/clipflow-clipboard-manager/id6767848683?mt=12' },
    },
    {
      title: 'Grandmaster Chess',
      problem: 'A polished, tournament-grade chess experience on mobile.',
      description: 'Professional tournament-style chess app with complete rules and move validation.',
      technologies: ['Flutter', 'Clean Architecture', 'Game Logic', 'State Management'],
      features: ['Move validation', 'Check/checkmate detection', 'Real-time board updates', 'Tournament-style UI'],
      bullets: {
        edge: 'Tournament-grade chess with full rule validation.',
        tech: 'Flutter with custom game-logic engine and reactive state.',
        impact: 'Polished mobile experience on Google Play.',
      },
      gradient: 'from-flutter-teal to-flutter-purple',
      icon: '♟️',
      iconImage: chessIcon,
      category: 'mobile',
      storeLinks: { playStore: 'https://play.google.com/store/apps/details?id=com.zyadkhidr.grandmaster_chess' },
    },
    {
      title: 'MazoMirror Photobooth',
      problem: 'Delivering an event-ready photobooth on any desktop.',
      description: 'Desktop photobooth app with interactive filters and high-quality photo capture.',
      technologies: ['Flutter Desktop', 'Multimedia', 'Cross-platform', 'Image Processing'],
      features: ['Photo capture', 'Interactive filters', 'Real-time effects', 'Intuitive UI'],
      bullets: {
        edge: 'Event-ready photobooth that runs on any laptop.',
        tech: 'Flutter Desktop with real-time image processing pipeline.',
        impact: 'Deployed live at events with zero crash reports.',
      },
      gradient: 'from-flutter-blue to-flutter-purple',
      icon: '📸',
      category: 'desktop',
    },
    {
      title: 'Gesture Volume Control',
      problem: 'Controlling devices hands-free using just a camera.',
      description: 'Innovative app controlling phone volume using hand gestures via PC camera.',
      technologies: ['Flutter', 'Computer Vision', 'Gesture Recognition', 'Custom Package'],
      features: ['Hand gesture detection', 'Distance mapping', 'Reusable package', 'Volume control'],
      bullets: {
        edge: 'Hands-free device control using only a webcam.',
        tech: 'Flutter + computer vision pipeline, packaged as reusable plugin.',
        impact: 'Open-source package adopted by other developers.',
      },
      gradient: 'from-flutter-light-blue to-flutter-teal',
      icon: '👋',
      category: 'desktop',
    },
    {
      title: 'Meal Recommendation App',
      problem: 'Personalized meal plans powered by generative AI.',
      description: 'AI-powered meal planner developed during internship at Cellula Technologies.',
      technologies: ['Flutter', 'Gemini AI', 'Clean Architecture', 'Git'],
      features: ['Personalized meal plans', 'Team collaboration', 'Trello workflow', 'API integration'],
      bullets: {
        edge: 'Personalized meal plans generated by Gemini AI.',
        tech: 'Flutter + Gemini API integrated via Clean Architecture.',
        impact: 'Built during internship at Cellula Technologies.',
      },
      gradient: 'from-flutter-purple to-flutter-blue',
      icon: '🍽️',
      category: 'ai',
    },
    {
      title: 'Realtime Chat App',
      problem: 'Real-time messaging with sub-second delivery.',
      description: 'Real-time messaging application built with WebSocket technology.',
      technologies: ['WebSocket', 'Socket.io', 'JavaScript', 'Realtime'],
      features: ['Live messaging', 'Real-time communication', 'Socket connections', 'Instant messaging'],
      bullets: {
        edge: 'Sub-second delivery — chat that actually feels live.',
        tech: 'WebSocket + Socket.io with reconnection and presence.',
        impact: 'Reference architecture for real-time apps.',
      },
      gradient: 'from-flutter-blue to-flutter-light-blue',
      icon: '💬',
      category: 'ai',
      githubUrl: 'https://github.com/ZyadWKhedr/Chat-App',
    },
    {
      title: 'Flappy Bird Clone',
      problem: 'Game development with monetization, end-to-end.',
      description: 'High-performance game clone with monetization via Google AdMob.',
      technologies: ['Flutter', 'Flame Engine', 'Google AdMob', 'Local Storage'],
      features: ['60 FPS gameplay', 'Banner & interstitial ads', 'High-score tracking', 'Smooth animations'],
      bullets: {
        edge: '60 FPS gameplay with monetization baked in.',
        tech: 'Flutter Flame engine with Google AdMob integration.',
        impact: 'End-to-end shipped game, AdMob-verified.',
      },
      gradient: 'from-flutter-light-blue to-flutter-teal',
      icon: '🐦',
      category: 'mobile',
      githubUrl: 'https://github.com/ZyadWKhedr/Flapper-Bird',
    },
  ];

  const categories: { id: ProjectCategory | 'all'; label: string }[] = [
    { id: 'all', label: 'All' },
    { id: 'mobile', label: 'iOS & Android' },
    { id: 'desktop', label: 'macOS & Desktop' },
    { id: 'ai', label: 'AI & Realtime' },
  ];

  const INITIAL = 6;

  const renderGrid = (items: Project[], tabId: string) => {
    const expanded = !!showAll[tabId];
    const visible = expanded ? items : items.slice(0, INITIAL);
    const remaining = items.length - visible.length;

    return (
      <>
        <motion.div
          layout
          className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5 md:gap-6"
        >
          <AnimatePresence mode="popLayout">
            {visible.map((project, index) => {
              const isAI = project.category === 'ai';
              return (
              <motion.button
                layout
                key={project.title}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35, delay: Math.min(index, 6) * 0.05, ease: 'easeOut' }}
                whileHover={{ y: -6 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setActive(project)}
                className={`relative group text-left glass rounded-2xl overflow-hidden border transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-flutter-light-blue/50 ${
                  isAI
                    ? 'border-flutter-purple/30 hover:border-flutter-purple/60 shadow-[0_0_24px_-8px_rgba(168,85,247,0.4)]'
                    : 'border-white/5 hover:border-flutter-light-blue/30'
                }`}
              >
                {/* AI neural glow */}
                {isAI && (
                  <div className="pointer-events-none absolute -inset-px rounded-2xl opacity-50 group-hover:opacity-100 transition-opacity duration-500"
                       style={{ background: 'radial-gradient(120% 60% at 50% 0%, rgba(168,85,247,0.25), transparent 60%)' }} />
                )}

                {/* Thumbnail */}
                <div className={`relative aspect-[16/11] bg-gradient-to-br ${project.gradient} overflow-hidden`}>
                  <div
                    className="absolute inset-0 opacity-20"
                    style={{
                      backgroundImage:
                        'radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1px)',
                      backgroundSize: '18px 18px',
                    }}
                  />
                  <motion.div
                    whileHover={{ scale: 1.08, rotate: -2 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 18 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    {project.iconImage ? (
                      <img
                        src={project.iconImage}
                        alt={`${project.title} logo`}
                        className="h-14 w-14 sm:h-20 sm:w-20 md:h-24 md:w-24 rounded-2xl object-cover shadow-2xl shadow-black/40 ring-1 ring-white/20"
                      />
                    ) : (
                      <span className="text-4xl sm:text-6xl md:text-7xl drop-shadow-lg">{project.icon}</span>
                    )}
                  </motion.div>

                  {/* AI badge with pulse */}
                  {isAI && (
                    <span className="absolute top-2 left-2 inline-flex items-center gap-1 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-gradient-to-r from-flutter-purple to-flutter-blue text-white shadow-lg shadow-flutter-purple/40">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white" />
                      </span>
                      AI
                    </span>
                  )}
                  {!isAI && (
                    <span className="absolute top-2 left-2 text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-black/40 backdrop-blur-sm text-white/90 border border-white/10">
                      {project.category === 'mobile' ? 'Mobile' : 'Desktop'}
                    </span>
                  )}

                  {/* Hover arrow — hidden on mobile */}
                  <div className="hidden sm:flex absolute top-3 right-3 h-8 w-8 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 items-center justify-center opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300">
                    <ArrowUpRight className="h-4 w-4 text-white" />
                  </div>
                </div>

                {/* Body — ultra compact on mobile */}
                <div className="p-3 sm:p-4 md:p-5">
                  <h3 className="text-sm sm:text-base md:text-lg font-semibold text-white group-hover:text-flutter-light-blue transition-colors line-clamp-1">
                    {project.title}
                  </h3>
                  <p className="mt-1 sm:mt-1.5 text-[11px] sm:text-sm text-gray-400 leading-snug line-clamp-2 sm:min-h-[2.5rem]">
                    {project.problem}
                  </p>
                  <div className="mt-2 sm:mt-3 hidden sm:flex flex-wrap gap-1.5">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded-full text-[10px] font-mono text-flutter-light-blue/90 bg-flutter-light-blue/10 border border-flutter-light-blue/20"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-mono text-gray-400 bg-white/5">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </motion.button>
            );})}
          </AnimatePresence>
        </motion.div>

        {remaining > 0 && (
          <div className="flex justify-center mt-10">
            <Button
              variant="outline"
              onClick={() => setShowAll((s) => ({ ...s, [tabId]: true }))}
              className="rounded-full border-flutter-light-blue/30 bg-white/5 hover:bg-flutter-light-blue/10 text-white px-6"
            >
              <Plus className="h-4 w-4 mr-2" />
              Show {remaining} more project{remaining > 1 ? 's' : ''}
            </Button>
          </div>
        )}
        {expanded && items.length > INITIAL && (
          <div className="flex justify-center mt-10">
            <Button
              variant="ghost"
              onClick={() => setShowAll((s) => ({ ...s, [tabId]: false }))}
              className="rounded-full text-gray-400 hover:text-white"
            >
              Show less
            </Button>
          </div>
        )}
      </>
    );
  };

  return (
    <section id="projects" className="py-20 px-4 lg:px-8 relative">
      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="inline-block text-[11px] font-semibold tracking-[0.2em] uppercase text-flutter-teal mb-3">
            What I Build
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-flutter-blue to-flutter-teal bg-clip-text text-transparent mb-4">
            Problems I Solve
          </h2>
          <div className="w-24 h-1 bg-flutter-gradient mx-auto rounded-full" />
          <p className="text-muted-foreground mt-6 text-base md:text-lg max-w-2xl mx-auto">
            Shipped products across mobile, desktop & AI — each built to solve a real,
            human problem with clean architecture and craft.
          </p>
        </motion.div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mx-auto mb-10 flex flex-wrap justify-center gap-2 bg-transparent h-auto p-0">
            {categories.map((cat) => (
              <TabsTrigger
                key={cat.id}
                value={cat.id}
                className="glass-strong rounded-full px-5 py-2 text-sm data-[state=active]:bg-gradient-to-r data-[state=active]:from-flutter-blue data-[state=active]:to-flutter-teal data-[state=active]:text-white"
              >
                {cat.label}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="all">{renderGrid(projects, 'all')}</TabsContent>
          {categories
            .filter((c) => c.id !== 'all')
            .map((cat) => (
              <TabsContent key={cat.id} value={cat.id}>
                {renderGrid(projects.filter((p) => p.category === cat.id), cat.id)}
              </TabsContent>
            ))}
        </Tabs>
      </div>

      {/* Detail — Drawer on mobile, Dialog on desktop */}
      {active && !isMobile && (
        <Dialog open={!!active} onOpenChange={(o) => !o && setActive(null)}>
          <DialogContent className="glass-strong border-flutter-light-blue/20 max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className={`relative -mx-6 -mt-6 aspect-[16/8] bg-gradient-to-br ${active.gradient} rounded-t-lg overflow-hidden`}>
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1px)',
                  backgroundSize: '18px 18px',
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                {active.iconImage ? (
                  <img src={active.iconImage} alt={active.title} className="h-28 w-28 rounded-2xl object-cover shadow-2xl ring-1 ring-white/20" />
                ) : (
                  <span className="text-7xl">{active.icon}</span>
                )}
              </div>
            </div>
            <DialogHeader className="mt-4">
              <DialogTitle className="text-2xl bg-gradient-to-r from-white to-flutter-light-blue bg-clip-text text-transparent">
                {active.title}
              </DialogTitle>
              <DialogDescription className="text-flutter-teal font-medium">
                {active.problem}
              </DialogDescription>
            </DialogHeader>
            <ProjectBody project={active} />
          </DialogContent>
        </Dialog>
      )}

      {active && isMobile && (
        <Drawer open={!!active} onOpenChange={(o) => !o && setActive(null)}>
          <DrawerContent className="glass-strong border-flutter-light-blue/20 max-h-[92vh]">
            <div className={`relative aspect-[16/7] bg-gradient-to-br ${active.gradient} overflow-hidden`}>
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1px)',
                  backgroundSize: '18px 18px',
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                {active.iconImage ? (
                  <img src={active.iconImage} alt={active.title} className="h-20 w-20 rounded-2xl object-cover shadow-2xl ring-1 ring-white/20" />
                ) : (
                  <span className="text-6xl">{active.icon}</span>
                )}
              </div>
            </div>
            <DrawerHeader className="text-left">
              <DrawerTitle className="text-xl bg-gradient-to-r from-white to-flutter-light-blue bg-clip-text text-transparent">
                {active.title}
              </DrawerTitle>
              <DrawerDescription className="text-flutter-teal font-medium text-sm">
                {active.problem}
              </DrawerDescription>
            </DrawerHeader>
            <div className="px-4 pb-6 overflow-y-auto">
              <ProjectBody project={active} />
            </div>
          </DrawerContent>
        </Drawer>
      )}
    </section>
  );
};

const ProjectBody = ({ project }: { project: Project }) => (
  <div className="space-y-5">
    {/* 3-bullet formula */}
    <div className="space-y-2.5">
      <BulletRow icon={Brain} color="text-flutter-purple" label="AI Edge" text={project.bullets.edge} />
      <BulletRow icon={Cog} color="text-flutter-light-blue" label="Tech Engine" text={project.bullets.tech} />
      <BulletRow icon={TrendingUp} color="text-flutter-teal" label="Impact" text={project.bullets.impact} />
    </div>

    <div>
      <h4 className="text-[10px] font-semibold uppercase tracking-wider text-flutter-light-blue mb-2">
        Stack
      </h4>
      <div className="flex flex-wrap gap-1.5">
        {project.technologies.map((t) => (
          <span
            key={t}
            className="px-2.5 py-0.5 rounded-full text-[11px] font-mono text-flutter-light-blue/90 bg-flutter-light-blue/10 border border-flutter-light-blue/20"
          >
            {t}
          </span>
        ))}
      </div>
    </div>

    <div className="flex flex-wrap gap-2 pt-1">
      {project.githubUrl && (
        <Button variant="outline" size="sm" onClick={() => window.open(project.githubUrl, '_blank')}>
          <Github className="h-4 w-4 mr-2" /> GitHub
        </Button>
      )}
      {project.storeLinks?.playStore && (
        <Button variant="outline" size="sm" onClick={() => window.open(project.storeLinks!.playStore, '_blank')}>
          <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.5,12.92 20.16,13.19L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
          </svg>
          Google Play
        </Button>
      )}
      {project.storeLinks?.appStore && (
        <Button variant="outline" size="sm" onClick={() => window.open(project.storeLinks!.appStore, '_blank')}>
          <Apple className="h-4 w-4 mr-2" /> App Store
        </Button>
      )}
    </div>
  </div>
);

const BulletRow = ({
  icon: Icon,
  color,
  label,
  text,
}: {
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  label: string;
  text: string;
}) => (
  <div className="flex gap-3 items-start rounded-xl border border-white/5 bg-white/[0.02] p-3">
    <div className={`shrink-0 h-8 w-8 rounded-lg bg-white/5 flex items-center justify-center ${color}`}>
      <Icon className="h-4 w-4" />
    </div>
    <div className="min-w-0">
      <div className={`text-[10px] font-bold uppercase tracking-wider ${color}`}>{label}</div>
      <p className="text-sm text-gray-300 leading-snug mt-0.5">{text}</p>
    </div>
  </div>
);

export default ProjectsSection;
