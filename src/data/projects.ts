import amoomyIcon from '@/assets/amoomy-icon.png';
import wofoodiIcon from '@/assets/wofoodi-icon.png';
import ravalIcon from '@/assets/raval-icon.png';
import payssIcon from '@/assets/payss-icon.png';
import ufuqIcon from '@/assets/ufuq-icon.png';

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
  previewImage?: string;
  links?: {
    appStore?: string;
    playStore?: string;
    landingPage?: string;
    github?: string;
  };
}

export interface IndependentProject {
  id: string;
  title: string;
  category: string;
  subtitle: string;
  description: string;
  stack: string[];
  links: {
    github?: string;
    pubDev?: string;
    article?: string;
  };
  interactiveType?: 'liquid_navbar' | 'boa' | 'quran_rec' | 'asl';
}

export const COMMERCIAL_PROJECTS: CommercialProject[] = [
  {
    id: 'ufuq',
    title: 'Ufuq',
    arabicTitle: 'أُفُق',
    category: 'Mobile Application · iOS & Android',
    summary:
      'A calm, distraction-free Arabic Islamic companion featuring Holy Quran reading in authentic Uthmani script, live Cairo Quran radio stream, GPS solar prayer times, digital Subha with tactile haptics, and Qibla compass.',
    contribution:
      'I built the mobile application, background audio streaming isolates, sensor-calibrated Qibla magnetometer, and 100% offline Quran reading.',
    contributionDetails: [
      '100% Offline Holy Quran reading in authentic Uthmani script',
      'Live 24/7 background audio streaming for Cairo Quran Radio',
      'Astronomical GPS solar prayer calculations with countdown timer',
      'Digital Subha with tactile haptics & daily Athkar repetition tracker',
    ],
    stack: ['Flutter', 'Dart', 'Audio Streaming', 'Sensors API', 'SQLite', 'Clean Architecture'],
    icon: ufuqIcon,
    previewImage: 'assets/images/projects/ufuq/ufuq-screen-home.webp',
    links: {
      appStore: 'https://apps.apple.com/id/app/ufuq/id6821979552',
      playStore: 'https://play.google.com/store/apps/details?id=com.ziad.ufuq',
      landingPage: '/ufuq',
    },
  },
  {
    id: 'tashkeel',
    title: 'Tashkeel',
    arabicTitle: 'تَشْكِيل',
    category: 'Mobile Application · iOS / iPadOS',
    summary:
      'An on-device Arabic text diacritization mobile application that runs completely offline with zero external data tracking.',
    contribution:
      'I built the mobile application, integrating the pretrained ShakkalV3 ONNX model to perform 100% offline Arabic diacritization on-device without sending user text to external servers.',
    contributionDetails: [
      '100% On-device neural inference via ONNX Runtime without server requests',
      'Integrated existing ShakkalV3 ONNX pretrained model for contextual diacritization',
      'Single-tap text and .txt file import, processing, and export',
      'Clean Arabic typography with local history and privacy-first storage',
    ],
    stack: ['Flutter', 'Dart', 'ONNX Runtime', 'Edge ML', 'Arabic NLP', 'File I/O'],
    icon: 'assets/images/projects/tashkeel/tashkeel-icon.webp',
    previewImage: 'assets/images/projects/tashkeel/tashkeel-preview.webp',
    links: {
      appStore: 'https://apps.apple.com/br/app/tashkeel-%D8%AA-%D8%B4-%D9%83-%D9%8A%D9%84/id6827159466',
    },
  },
  {
    id: 'wofoodi',
    title: 'Wofoodi',
    arabicTitle: 'وفودي',
    category: 'Commercial Mobile Application · GCC',
    summary: 'A real-time fuel station discovery and regional pricing application built for motorists across Saudi Arabia and the GCC.',
    contribution:
      'I worked on the Flutter mobile application, focusing on the geospatial station map, location-based filtering, and local caching layer.',
    contributionDetails: [
      'Interactive maps with station clustering',
      'Location-based fuel grade filtering',
      'Local SQLite caching for low-connectivity sectors',
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
    category: 'Commercial Mobile Application · Saudi Arabia',
    summary: 'A mobile coordination platform for heavy freight, vehicle towing, and construction equipment transport across Saudi Arabia.',
    contribution:
      'I worked on the Flutter application and its multi-role experience for shippers and heavy truck haulers.',
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
    category: 'Commercial Mobile Application',
    summary: 'A fashion e-commerce mobile application with rapid catalog exploration and step-by-step order tracking.',
    contribution:
      'I worked on the mobile shopping experience, reactive stateful shopping cart calculations, disk-cached image loader, and checkout flow.',
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
    category: 'Commercial Mobile Application',
    summary: 'A merchant-focused application involving QR scanning and loyalty functionality.',
    contribution:
      'I worked on Flutter application features related to merchant interactions, camera QR scanning, and activity ledgers.',
    contributionDetails: [
      'QR code scanning for fast customer verification',
      'Merchant loyalty and rewards tracking',
      'Transaction and activity information presentation',
      'Clean interface for daily counter workflows',
    ],
    stack: ['Flutter', 'Dart', 'Camera / QR', 'REST APIs', 'Local Cache'],
    icon: payssIcon,
    links: {
      playStore: 'https://play.google.com/store/apps/details?id=com.payss.app',
      appStore: 'https://apps.apple.com/eg/app/payss/id6767013931',
    },
  },
];

export const INDEPENDENT_PROJECTS: IndependentProject[] = [
  {
    id: 'liquid-navbar',
    title: 'Liquid Navbar',
    category: 'Open-Source Flutter Package · pub.dev',
    subtitle: 'Reusable Flutter fluid navigation component',
    description:
      'A physics-based fluid navigation bar component package published on pub.dev. Engineered strictly with native CustomPainter and cubic bezier matrix math for 60fps spring transitions without heavy external dependencies.',
    stack: ['Flutter', 'Dart', 'CustomPainter', 'Vector Math', 'pub.dev'],
    links: {
      pubDev: 'https://pub.dev/packages/liquid_navbar',
      github: 'https://github.com/ZyadWKhedr/Liquid_NavBar',
    },
    interactiveType: 'liquid_navbar',
  },
  {
    id: 'boa',
    title: 'Boa',
    category: 'Developer Tool · CLI & Systems',
    subtitle: 'Terminal compression toolkit & archive explorer in Go',
    description:
      'An open-source terminal compression toolkit and file explorer. Built in Go, with support for streaming multi-threaded Zstandard and DEFLATE compression, safe extraction with Zip-Slip path traversal protection, archive inspection, and performance benchmarking.',
    stack: ['Go', 'Bubble Tea TUI', 'Zstandard', 'DEFLATE', 'Zip-Slip Protection'],
    links: {
      github: 'https://github.com/ZyadWKhedr/Boa',
    },
    interactiveType: 'boa',
  },
  {
    id: 'offline-quran-recognition',
    title: 'Offline Quran Recognition',
    category: 'Independent Applied AI Research',
    subtitle: 'Independent experiment in offline audio/text recognition',
    description:
      'An independent experiment exploring offline Quran audio/text recognition. Evaluates acoustic Mel spectrogram features and phonetic alignment against standardized Uthmani script text under mobile memory constraints.',
    stack: ['Python', 'CTC Acoustic Model', 'Mel Spectrogram', 'Uthmani Script DB'],
    links: {
      github: 'https://github.com/ZyadWKhedr',
    },
    interactiveType: 'quran_rec',
  },
  {
    id: 'asl-detection',
    title: 'Real-Time ASL Alphabet Recognition',
    category: 'Computer Vision & Applied AI',
    subtitle: 'Real-time sign language alphabet detection via webcam',
    description:
      'A real-time computer vision pipeline utilizing MediaPipe hand tracking (21 3D landmarks) and a deep neural classifier to detect and translate 26 American Sign Language finger gestures in real time without specialized sensors.',
    stack: ['Python', 'OpenCV', 'MediaPipe Hands', 'TensorFlow', 'NumPy'],
    links: {
      article: 'https://medium.com/ai-in-plain-english/building-a-real-time-asl-detection-app-with-computer-vision-and-machine-learning-a5f93416b87f',
      github: 'https://github.com/ZyadWKhedr/Sign-language-cv',
    },
    interactiveType: 'asl',
  },
];
