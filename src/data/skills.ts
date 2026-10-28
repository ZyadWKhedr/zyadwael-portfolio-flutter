export interface SkillEvidence {
  project: string;
  detail: string;
  link?: string;
}

export interface CapabilityGroup {
  id: string;
  title: string;
  description: string;
  skills: string[];
  evidence: SkillEvidence[];
}

export const CAPABILITIES: CapabilityGroup[] = [
  {
    id: 'mobile',
    title: 'Mobile Engineering',
    description: 'Cross-platform native-feeling applications built for long-term maintainability and battery efficiency.',
    skills: [
      'Flutter & Dart',
      'iOS (Swift & SwiftUI)',
      'Android (Java/Kotlin)',
      'Offline Caching (SQLite)',
      'Hardware Sensors & Cameras',
      'App Store & Play Store Deploy',
    ],
    evidence: [
      { project: 'Amoomy & Raval', detail: 'Shipped to commercial production on iOS and Android.' },
      { project: 'Liquid Navbar', detail: 'Custom canvas shaders & spring physics on pub.dev.' },
    ],
  },
  {
    id: 'architecture',
    title: 'Architecture & State',
    description: 'Strict separation of concerns ensuring codebases remain testable, refactorable, and bug-resilient.',
    skills: [
      'Clean Architecture (Domain/Data/UI)',
      'Riverpod & Provider',
      'BLoC / Cubit Pattern',
      'Dependency Injection',
      'Repository Pattern',
      'Unit & Widget Testing',
    ],
    evidence: [
      { project: 'Stackademic Article', detail: 'Author of "Software Craftsmanship: Design Patterns in Dart & Flutter".' },
      { project: 'freeRASP Security', detail: 'Technical guide on mobile anti-tampering and reverse-engineering protection.' },
    ],
  },
  {
    id: 'ai-ml',
    title: 'AI, ML & Real-Time',
    description: 'Integrating practical machine learning models and sub-second streaming pipelines into mobile clients.',
    skills: [
      'Gemini AI API & LLM Pipelines',
      'Google ML Kit',
      'Computer Vision (OpenCV)',
      'Real-Time WebSockets (Socket.IO)',
      'ASL Sign Language Detection',
      'On-Device Inference',
    ],
    evidence: [
      { project: 'Medium Publication', detail: 'Author of "Building a Real-Time ASL Detection App with Computer Vision".' },
      { project: 'Socket.IO Guide', detail: 'Technical architecture for real-time mobile event streaming.' },
    ],
  },
  {
    id: 'data-science',
    title: 'Data Science & Systems',
    description: 'Foundational algorithmic thinking, data modeling, and automated backend workflow pipelines.',
    skills: [
      'Python (Pandas, NumPy)',
      'Data Structures & Algorithms',
      'Supabase & PostgreSQL',
      'RESTful API Design',
      'Git & GitHub Actions CI/CD',
      'n8n Workflow Automation',
    ],
    evidence: [
      { project: 'AUFS FCDS', detail: 'Academic background in Data Science & Artificial Intelligence.' },
      { project: 'HackerRank Club', detail: 'Head of Flutter Committee & technical curriculum mentor.' },
    ],
  },
];
