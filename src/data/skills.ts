import type { SkillEvidence, CapabilityGroup } from '@/types/skill';
export type { SkillEvidence, CapabilityGroup };

export const CAPABILITIES: CapabilityGroup[] = [
  {
    id: 'flutter-core',
    title: 'Flutter & Cross-Platform (Main Framework)',
    description: 'High-concurrency, 60/120 FPS mobile interfaces built for long-term maintainability, battery efficiency, and fluid rendering.',
    skills: [
      'Flutter & Dart (Primary Core)',
      'Custom Canvas Shaders & Physics',
      'BLoC / Cubit State Architecture',
      'Provider & Riverpod Containers',
      'pub.dev Package Engineering',
      'Responsive Multi-Screen Adaptive UI',
    ],
    evidence: [
      { project: 'Amoomy & Raval', detail: 'Shipped to commercial production on Apple App Store & Google Play.' },
      { project: 'Liquid Navbar', detail: 'Custom bezier canvas shaders & spring physics on pub.dev (400+ downloads).' },
    ],
  },
  {
    id: 'native-mobile',
    title: 'Native Mobile (Beyond Flutter)',
    description: 'Direct platform engineering bridging native platform channels, sensor telemetry, and hardware APIs.',
    skills: [
      'iOS (Swift & SwiftUI)',
      'Android (Kotlin & Jetpack Compose)',
      'Platform Channels (Method & Event)',
      'BLE, Sensors & Background GPS',
      'Mobile Security (Keystore & SSL Pinning)',
      'Native Memory & CPU Profiling',
    ],
    evidence: [
      { project: 'Bluetooth Chess', detail: 'Native RFCOMM/BLE peripheral sync and hardware socket handshakes.' },
      { project: 'freeRASP Security', detail: 'Author of mobile anti-tampering and reverse-engineering protection guide.' },
    ],
  },
  {
    id: 'architecture',
    title: 'Architecture & Offline-First',
    description: 'Strict separation of concerns ensuring codebases remain testable, refactorable, and bug-resilient under scale.',
    skills: [
      'Clean Architecture (Domain/Data/UI)',
      'Offline Caching (SQLite & Isar)',
      'Real-Time WebSockets (Socket.IO)',
      'Repository & Factory Patterns',
      'Dependency Injection (GetIt)',
      'Unit, Widget & Integration Testing',
    ],
    evidence: [
      { project: 'Stackademic Publication', detail: 'Author of "Software Craftsmanship: Design Patterns in Dart & Flutter".' },
      { project: 'HackerRank Campus Club', detail: 'Head of Flutter Committee, mentoring engineers on Clean Architecture.' },
    ],
  },
  {
    id: 'devops-lifecycle',
    title: 'DevOps & Store Delivery',
    description: 'End-to-end mobile release pipelines, store compliance, automated builds, and telemetry monitoring.',
    skills: [
      'App Store Connect & TestFlight',
      'Google Play Console Management',
      'Fastlane & GitHub Actions CI/CD',
      'Firebase (Crashlytics, Auth, Messaging)',
      'Supabase & PostgreSQL Integration',
      'RESTful API Design & OpenAPI',
    ],
    evidence: [
      { project: 'Production Stores', detail: 'Verified commercial releases on Apple App Store and Google Play.' },
      { project: 'Automated CI/CD', detail: 'Zero-downtime test, code signing, and artifact distribution pipelines.' },
    ],
  },
];
