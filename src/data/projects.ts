import amoomyIcon from '@/assets/amoomy-icon.png';
import wofoodiIcon from '@/assets/wofoodi-icon.png';
import ravalIcon from '@/assets/raval-icon.png';
import payssIcon from '@/assets/payss-icon.png';

export interface CommercialProject {
  id: string;
  title: string;
  arabicTitle?: string;
  category: string;
  summary: string;
  contribution: string;
  contributionDetails: string[];
  stack: string[];
  icon: string;
  links?: {
    appStore?: string;
    playStore?: string;
    github?: string;
  };
}

export interface IndependentProject {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  stack: string[];
  links: {
    github?: string;
    pubDev?: string;
    article?: string;
  };
}

export const COMMERCIAL_PROJECTS: CommercialProject[] = [
  {
    id: 'wofoodi',
    title: 'Wofoodi',
    arabicTitle: 'وفودي',
    category: 'Fuel station discovery · GCC',
    summary: 'A fuel station discovery application built for drivers in the GCC.',
    contribution: 'I worked on the Flutter application, focusing on the map experience, station discovery, and location-based functionality.',
    contributionDetails: [
      'Interactive maps with station clustering',
      'Location-based fuel grade filtering',
      'Local caching for low-connectivity sectors',
      'REST API integration with backend services',
    ],
    stack: ['Flutter', 'Dart', 'Google Maps SDK', 'SQLite', 'REST APIs'],
    icon: wofoodiIcon,
    links: {
      appStore: 'https://apps.apple.com/us/app/%D9%88%D9%81%D9%88%D8%AF%D9%8A/id6751444551',
      playStore: 'https://play.google.com/store/apps/details?id=com.wofoodi.app.sa',
    },
  },
  {
    id: 'amoomy',
    title: 'Amoomy',
    arabicTitle: 'عمومي - النقل الثقيل',
    category: 'Heavy transport & logistics',
    summary: 'A mobile application for coordinating heavy transport and equipment services.',
    contribution: 'I worked on the Flutter application and its multi-role experience.',
    contributionDetails: [
      'Role-based application flows for clients and haulers',
      'Service discovery across 100+ vehicle categories',
      'User and operational quotation negotiation workflows',
      'Offline-safe state handling in remote transit corridors',
    ],
    stack: ['Flutter', 'Dart', 'Clean Architecture', 'Provider', 'Firebase Auth'],
    icon: amoomyIcon,
    links: {
      appStore: 'https://apps.apple.com/us/app/amoomy-%D8%B9%D9%85%D9%88%D9%85%D9%8A-%D8%A7%D9%84%D9%86%D9%82%D9%84-%D8%A7%D9%84%D8%AB%D9%82%D9%8A%D9%84/id6753125564',
      playStore: 'https://play.google.com/store/apps/details?id=com.zeroonez.amoomy',
    },
  },
  {
    id: 'raval',
    title: 'Raval',
    arabicTitle: 'رافال',
    category: 'Fashion e-commerce',
    summary: 'A fashion e-commerce mobile application.',
    contribution: 'I worked on the mobile shopping experience, including product browsing and order-related functionality.',
    contributionDetails: [
      'Product catalog browsing and category filtering',
      'Reactive shopping cart calculation',
      'Multi-step checkout validation',
      'Step-by-step order tracking timeline',
    ],
    stack: ['Flutter', 'Dart', 'Clean Architecture', 'Provider', 'REST APIs'],
    icon: ravalIcon,
    links: {
      appStore: 'https://apps.apple.com/us/app/raval/id6756228964',
      playStore: 'https://play.google.com/store/apps/details?id=com.zeroonez.raval',
    },
  },
  {
    id: 'payss',
    title: 'Payss',
    category: 'Merchant & loyalty',
    summary: 'A merchant-focused application involving QR scanning and loyalty functionality.',
    contribution: 'I worked on Flutter application features related to merchant interactions.',
    contributionDetails: [
      'QR code scanning for fast customer verification',
      'Merchant loyalty and rewards tracking',
      'Transaction and activity information presentation',
      'Clean interface for daily counter workflows',
    ],
    stack: ['Flutter', 'Dart', 'Camera / QR', 'REST APIs', 'Local Cache'],
    icon: payssIcon,
    links: {
      github: 'https://github.com/ZyadWKhedr',
    },
  },
];

export const INDEPENDENT_PROJECTS: IndependentProject[] = [
  {
    id: 'boa',
    title: 'Boa',
    subtitle: 'Terminal compression toolkit & file explorer',
    description:
      'An open-source terminal compression toolkit and file explorer. Built in Go, with a command-line interface and support for compression, extraction, inspection, benchmarking, and interactive exploration.',
    stack: ['Go', 'Bubble Tea TUI', 'Zstandard', 'DEFLATE', 'Zip-Slip Protection'],
    links: {
      github: 'https://github.com/ZyadWKhedr/Boa',
    },
  },
  {
    id: 'arabic-diacritization',
    title: 'Arabic Diacritization',
    subtitle: 'Offline on-device inference with ShakkalV3 ONNX',
    description:
      'An offline Arabic text diacritization application powered by the ShakkalV3 ONNX model. The application runs inference locally, without requiring a server to process user text.',
    stack: ['ONNX Runtime', 'Python', 'Flutter', 'Arabic NLP', 'Edge ML'],
    links: {
      github: 'https://github.com/ZyadWKhedr',
    },
  },
  {
    id: 'liquid-navbar',
    title: 'Liquid Navbar',
    subtitle: 'Reusable Flutter fluid navigation component',
    description:
      'A reusable Flutter navigation component built with spring physics and custom bezier curves. Published on pub.dev with 130/140 points and zero heavy external dependencies.',
    stack: ['Flutter', 'Dart', 'CustomPainter', 'Vector Math', 'pub.dev'],
    links: {
      pubDev: 'https://pub.dev/packages/liquid_navbar',
      github: 'https://github.com/ZyadWKhedr',
    },
  },
  {
    id: 'offline-quran-recognition',
    title: 'Offline Quran Recognition',
    subtitle: 'Independent experiment in offline audio/text recognition',
    description:
      'An independent experiment exploring offline Quran audio/text recognition. Evaluates acoustic Mel spectrogram features and phonetic alignment against standardized Uthmani script text under edge memory constraints.',
    stack: ['Python', 'CTC Acoustic Model', 'Mel Spectrogram', 'Uthmani Script DB'],
    links: {
      github: 'https://github.com/ZyadWKhedr',
    },
  },
];
