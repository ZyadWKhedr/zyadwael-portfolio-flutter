import type { SkillEvidence, CapabilityGroup, ExperienceMilestone } from '@/types/skill';
export type { SkillEvidence, CapabilityGroup, ExperienceMilestone };

export const CAPABILITIES: CapabilityGroup[] = [
  {
    id: 'flutter-core',
    title: 'Flutter & Dart Mastery',
    description: 'High-concurrency, 60/120 FPS mobile interfaces built for long-term maintainability, battery efficiency, and fluid rendering.',
    skills: [
      'Flutter SDK & Dart 3+',
      'Custom Canvas Shaders & Physics',
      'BLoC / Cubit State Architecture',
      'Provider & Riverpod State Trees',
      'pub.dev Package Engineering',
      'Responsive Multi-Screen Adaptive Layouts',
    ],
    evidence: [
      { project: 'Amoomy & Raval', detail: 'Shipped to commercial production on Apple App Store & Google Play.' },
      { project: 'Liquid Navbar', detail: 'Custom bezier canvas shaders & spring physics on pub.dev (130/140 pub points).' },
    ],
  },
  {
    id: 'architecture',
    title: 'Clean Architecture & Offline Systems',
    description: 'Strict separation of concerns ensuring codebases remain testable, refactorable, and bug-resilient under scale.',
    skills: [
      'Clean Architecture (Domain/Data/UI)',
      'Offline Caching (SQLite, Hive & Isar)',
      'Repository & Factory Patterns',
      'Dependency Injection (GetIt & Injectable)',
      'Unit, Widget & Integration Testing',
      'Immutable State Stream Modeling',
    ],
    evidence: [
      { project: 'Technical Publications', detail: 'Author of 4+ in-depth architecture articles on Medium & Stackademic.' },
      { project: 'Amoomy Dispatch', detail: 'Offline order queue buffering with auto-sync recovery upon reconnection.' },
    ],
  },
  {
    id: 'platform-hardware',
    title: 'Hardware, Sensors & Security',
    description: 'Direct platform integration bridging device capabilities, hardware telemetry, and client security hardening.',
    skills: [
      'Platform Channels (Method & Event Channels)',
      'Bluetooth Low Energy (BLE) & Peripheral Sync',
      'Geofencing & Background Location Services',
      'Mobile Client Security (Keystore & SSL Pinning)',
      'Anti-Tampering & RASP (freeRASP Guide)',
      'CameraX & Sensor Data Pipelines',
    ],
    evidence: [
      { project: 'Bluetooth Chess', detail: 'Native RFCOMM/BLE peripheral sync and hardware socket handshakes.' },
      { project: 'freeRASP Security Guide', detail: 'Author of mobile reverse-engineering protection and integrity verification guide.' },
    ],
  },
  {
    id: 'devops-stores',
    title: 'DevOps & Store Distribution',
    description: 'End-to-end mobile release pipelines, store compliance, automated builds, and telemetry monitoring.',
    skills: [
      'App Store Connect & TestFlight',
      'Google Play Console Release Tracks',
      'Fastlane & GitHub Actions CI/CD',
      'Firebase Suite (Crashlytics, Auth, Messaging)',
      'Real-Time WebSockets (Socket.IO)',
      'Supabase & PostgreSQL Integration',
    ],
    evidence: [
      { project: 'Commercial Stores', detail: 'Shipped 6+ commercial applications to Apple App Store & Google Play.' },
      { project: 'Automated CI/CD', detail: 'Zero-downtime test, code signing, and artifact distribution pipelines.' },
    ],
  },
];

export const EXPERIENCE_MILESTONES: ExperienceMilestone[] = [
  {
    period: 'Jul 2026 — Oct 2026',
    role: 'Mobile Application Developer',
    organization: 'Vee Tech · Part-time (Remote · Cairo, Egypt)',
    description: 'Engineered high-performance Flutter mobile client systems, architected reactive state management with clean separation of concerns, and integrated REST APIs and CI/CD pipelines.',
    tags: ['Flutter', 'Dart', 'Clean Architecture', 'REST APIs', 'Remote', 'CI/CD'],
  },
  {
    period: 'Jul 2026 — Sep 2026',
    role: 'Mobile Application Developer',
    organization: 'Rockai Dev · Freelance (On-site · Alexandria, Egypt)',
    description: 'Delivered production mobile features, smooth 60fps animations, hardware integration, and performance optimization for commercial client applications.',
    tags: ['Flutter', 'Mobile Architecture', 'Client Delivery', 'On-site', 'Performance Profiling'],
  },
  {
    period: 'Jun 2025 — May 2026',
    role: 'Flutter Developer',
    organization: 'ZeroOneZ · Full-time (Hybrid · Alexandria, Egypt)',
    description: 'Architected and shipped commercial applications including Amoomy (heavy freight dispatch) and Raval (retail e-commerce) to App Store and Google Play with Clean Architecture and 99.8% crash-free rate. Awarded Certificate of Appreciation.',
    tags: ['Flutter', 'Clean Architecture', 'Provider', 'App Store', 'Google Play', 'Certificate of Appreciation'],
  },
  {
    period: 'Feb 2025 — Apr 2025',
    role: 'Flutter Developer Intern',
    organization: 'Cellula Technologies · Internship (Remote · Cairo, Egypt)',
    description: 'Contributed to enterprise Flutter client codebases, UI component modularization, state refactoring, and integration testing under agile delivery sprints. Awarded Official Recommendation Letter.',
    tags: ['Flutter', 'Dart', 'Agile Sprints', 'Widget Testing', 'Recommendation Letter'],
  },
];
