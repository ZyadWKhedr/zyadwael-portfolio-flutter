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
      { project: 'Liquid Navbar', detail: 'Custom bezier canvas shaders & spring physics on pub.dev (400+ downloads).' },
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
      { project: 'Stackademic Publication', detail: 'Author of "Software Craftsmanship: Design Patterns in Dart & Flutter".' },
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
      { project: 'Commercial Stores', detail: 'Shipped and maintained multiple commercial apps on iOS & Android app stores.' },
      { project: 'Automated CI/CD', detail: 'Zero-downtime test, code signing, and artifact distribution pipelines.' },
    ],
  },
];

export const EXPERIENCE_MILESTONES: ExperienceMilestone[] = [
  {
    period: '2024 — Present',
    role: 'Mobile Software Engineer',
    organization: 'ZeroOneZ',
    description: 'Architecting and deploying commercial cross-platform mobile applications including Amoomy (logistics transport dispatch) and Raval (fashion e-commerce) across Apple App Store and Google Play.',
    tags: ['Flutter', 'Clean Architecture', 'Provider', 'App Store', 'Google Play', 'Google Maps'],
  },
  {
    period: '2023 — Present',
    role: 'Flutter Committee Mentor',
    organization: 'HackerRank Campus Club',
    description: 'Guiding student engineers through Clean Architecture, BLoC state management, test-driven mobile development, and professional Git workflows.',
    tags: ['Technical Mentorship', 'BLoC Pattern', 'Clean Architecture', 'Code Reviews'],
  },
  {
    period: '2023 — 2024',
    role: 'Open-Source Package Author',
    organization: 'pub.dev Community',
    description: 'Authored and published liquid_navbar on the official Dart package repository. Engineered custom canvas shaders and spring physics curves with zero external dependencies (400+ downloads, 130/140 points).',
    tags: ['Dart Package', 'CustomPainter', 'Canvas Shaders', 'Spring Physics', 'pub.dev'],
  },
  {
    period: '2023 — Present',
    role: 'Freelance Mobile Developer',
    organization: 'Mostaql & Direct Clients',
    description: 'Delivered client mobile projects across food logistics (Savora), console repair booking (Re3o), and interactive mobile entertainment with 100% five-star client satisfaction.',
    tags: ['Client Delivery', 'Firebase Auth', 'Offline-First', 'Payment Gateways'],
  },
];
