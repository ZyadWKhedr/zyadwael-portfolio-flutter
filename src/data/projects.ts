import amoomyIcon from '@/assets/amoomy-icon.png';
import wofoodiIcon from '@/assets/wofoodi-icon.png';
import ravalIcon from '@/assets/raval-icon.png';
import payssIcon from '@/assets/payss-icon.png';
import chessIcon from '@/assets/chess-icon.png';

export interface FeaturedProject {
  id: string;
  title: string;
  arabicTitle?: string;
  category: string;
  tagline: string;
  icon: string;
  problem: string;
  role: string;
  architecture: string;
  decisions: string[];
  stack: string[];
  outcome: string;
  metrics: string[];
  links: {
    appStore?: string;
    playStore?: string;
    github?: string;
    live?: string;
  };
}

export interface SecondaryProject {
  id: string;
  title: string;
  arabicTitle?: string;
  category: 'Mobile' | 'Applied AI' | 'Data & Analytics' | 'Wearable & Games';
  tagline: string;
  problem: string;
  role: string;
  stack: string[];
  icon?: string;
  links: {
    github?: string;
    live?: string;
    store?: string;
  };
  evidence: string;
  statusNotes?: string;
}

export const FEATURED_PROJECTS: FeaturedProject[] = [
  {
    id: 'amoomy',
    title: 'Amoomy',
    arabicTitle: 'عمومي - النقل الثقيل',
    category: 'Heavy Logistics & Dispatch Platform',
    tagline: 'Multi-role freight & heavy equipment transport coordination across Saudi Arabia.',
    icon: amoomyIcon,
    problem:
      'Heavy freight, vehicle recovery, and construction equipment transport suffered from manual dispatching, opaque pricing, and fragmented communication between clients and truck operators.',
    role:
      'Lead Mobile Engineer — Architected the client and provider mobile applications from domain logic to production deployment on iOS and Android.',
    architecture:
      'Engineered with strict Clean Architecture layers (Domain / Data / Presentation). Decoupled the scheduling engine from UI rendering using Provider state containers with repository patterns.',
    decisions: [
      'Implemented role-based OAuth (Apple, Google, Phone OTP) with instantaneous role context switching.',
      'Designed an offline-safe dispatch queue that buffers order proposals locally when network drops occur in remote transport corridors.',
      'Created a modular quotation negotiation view enabling real-time offer comparisons between truck owners.',
    ],
    stack: ['Flutter', 'Dart', 'Provider', 'Firebase Auth', 'REST APIs', 'Clean Architecture', 'Google Maps'],
    outcome:
      'Shipped to production on Apple App Store (ID: 6753125564) and Google Play (com.zeroonez.amoomy), coordinating freight requests across 100+ vehicle and equipment categories.',
    metrics: ['Shipped iOS & Android', 'Multi-role Dispatch', '100+ Categories Supported'],
    links: {
      appStore: 'https://apps.apple.com/us/app/amoomy-%D8%B9%D9%85%D9%88%D9%85%D9%8A-%D8%A7%D9%84%D9%86%D9%82%D9%84-%D8%A7%D9%84%D8%AB%D9%82%D9%8A%D9%84/id6753125564',
      playStore: 'https://play.google.com/store/apps/details?id=com.zeroonez.amoomy',
    },
  },
  {
    id: 'wofoodi',
    title: 'Wofoodi',
    arabicTitle: 'وفودي',
    category: 'Real-Time Fuel Discovery & Regional Pricing',
    tagline: 'Live location-based fuel intelligence and route navigation in two GCC markets.',
    icon: wofoodiIcon,
    problem:
      'Drivers navigating high-density highways frequently faced unexpected station fuel shortages and price discrepancies, with no fast way to identify the closest verified station offering specific fuel grades.',
    role:
      'Mobile Engineer — Built the interactive geospatial station map, location caching pipeline, and real-time station details interface.',
    architecture:
      'Custom geospatial clustering layer over Google Maps SDK paired with an offline SQLite cache. Synchronizes regional fuel price updates via background debounce without locking the 60fps UI thread.',
    decisions: [
      'Engineered sub-meter radius filtering to prioritize stations along the driver’s current travel trajectory rather than simple radial distance.',
      'Integrated resilient local persistence for offline route recall in low-signal desert highway sectors.',
      'Optimized custom map pin rendering using compiled SVG markers to prevent GPU memory spikes.',
    ],
    stack: ['Flutter', 'Dart', 'Google Maps SDK', 'Firebase Auth', 'RESTful API', 'SQLite Caching'],
    outcome:
      'Live on Apple App Store (ID: 6751444551) and Google Play (com.wofoodi.app.sa), serving daily motorists across Saudi Arabia and the GCC.',
    metrics: ['2 GCC Markets Live', 'Sub-second Map Clustering', 'Offline Price Sync'],
    links: {
      appStore: 'https://apps.apple.com/us/app/%D9%88%D9%81%D9%88%D8%AF%D9%8A/id6751444551',
      playStore: 'https://play.google.com/store/apps/details?id=com.wofoodi.app.sa',
    },
  },
  {
    id: 'raval',
    title: 'Raval',
    arabicTitle: 'رافال',
    category: 'High-Conversion Fashion E-Commerce',
    tagline: 'Streamlined retail app engineered for rapid browsing, smart carting, and step-by-step order tracking.',
    icon: ravalIcon,
    problem:
      'E-commerce shoppers abandon carts when mobile catalogs suffer from laggy category filtering, slow image hydration, or clumsy multi-step checkout processes.',
    role:
      'Mobile Engineer — Spearheaded the client application architecture, stateful shopping cart pipeline, and real-time order lifecycle tracking.',
    architecture:
      'Separated presentation from business rules via Clean Architecture domain entities. Used an optimistic reactive state container for cart updates that immediately reflects price changes with zero spinner latency.',
    decisions: [
      'Implemented an intelligent progressive image loader with memory-managed disk caching, keeping app heap usage below 80MB on older Android devices.',
      'Designed a visual order status tracker providing granular, step-by-step dispatch updates (Received → Processing → Dispatched → Delivered).',
      'Integrated comprehensive checkout validation with instant card format sanitization.',
    ],
    stack: ['Flutter', 'Dart', 'Clean Architecture', 'Provider', 'REST APIs', 'Secure Payment SDK'],
    outcome:
      'Active commercial retail application shipping daily customer orders on Apple App Store (ID: 6756228964) and Google Play (com.zeroonez.raval).',
    metrics: ['Daily Commercial Orders', '<80MB Heap Footprint', 'Sub-3-tap Checkout'],
    links: {
      appStore: 'https://apps.apple.com/us/app/raval/id6756228964',
      playStore: 'https://play.google.com/store/apps/details?id=com.zeroonez.raval',
    },
  },
  {
    id: 'payss',
    title: 'Payss',
    category: 'Social Loyalty & Instant Rewards',
    tagline: 'Consumer mobile client connecting shoppers, merchant QR scans, and instant reward points.',
    icon: payssIcon,
    problem:
      'Traditional customer loyalty cards are routinely forgotten or lost, leaving merchants without direct customer retention channels and shoppers without immediate gratification.',
    role:
      'Flutter Mobile Engineer — Developed the consumer client application, hardware camera QR scanner integration, and live merchant activity feed.',
    architecture:
      'Combined real-time WebSocket event listeners with REST fallbacks. Packaged local point balances into encrypted secure storage for tamper-proof offline confirmation.',
    decisions: [
      'Engineered an ultra-fast QR scanning overlay with custom camera frame throttling to preserve battery health.',
      'Built interactive merchant discovery with category filters, dynamic distance recalculations, and guest mode onboarding.',
      'Implemented Dark/Light theme parity adhering to iOS Human Interface Guidelines.',
    ],
    stack: ['Flutter', 'Dart', 'WebSockets', 'QR Scanner SDK', 'Google Maps', 'Secure Storage'],
    outcome:
      'Shipped on Apple App Store (ID: 6767013931) and Google Play (com.payss.app) supporting merchants and active consumer reward redemption.',
    metrics: ['Shipped iOS & Android', 'Sub-100ms QR Recognition', 'Real-time WebSocket Sync'],
    links: {
      appStore: 'https://apps.apple.com/eg/app/payss/id6767013931',
      playStore: 'https://play.google.com/store/apps/details?id=com.payss.app',
    },
  },
  {
    id: 'liquid-navbar',
    title: 'Liquid Navbar',
    category: 'Open Source Flutter Package',
    tagline: 'Physics-based iOS Liquid Glass navigation bar component published on pub.dev.',
    icon: '',
    problem:
      'Flutter developers seeking iOS 18-style dynamic fluid navigation bars were forced to compromise with clunky third-party web views or complex custom shader code that crashed on lower-end devices.',
    role: 'Author & Sole Maintainer — Conceptualized, mathematically modeled, and packaged the library for the open source Flutter ecosystem.',
    architecture:
      'Built strictly using Flutter’s native `CustomPainter` and canvas matrix math with zero heavy external dependencies. Spring physics calculations run in 60fps render cycles with zero frame drops.',
    decisions: [
      'Engineered custom bezier curve interpolation that responds to finger velocity and tap coordinates.',
      'Provided full support for both Material 3 and Cupertino design palettes through simple declarative configuration.',
      'Added extensive automated widget tests and documentation adhering to strict Dart package scoring standards.',
    ],
    stack: ['Flutter', 'Dart', 'Canvas API', 'CustomPainter', 'Vector Math', 'pub.dev'],
    outcome:
      'Published on the official Dart package repository (pub.dev/packages/liquid_navbar) with 400+ downloads, 130/140 pub points, and active community adoption.',
    metrics: ['400+ pub.dev Downloads', '130/140 Pub Points', 'Zero External Dependencies'],
    links: {
      live: 'https://pub.dev/packages/liquid_navbar',
      github: 'https://github.com/ZyadWKhedr',
    },
  },
];

export const SECONDARY_PROJECTS: SecondaryProject[] = [
  {
    id: 'grandmaster-chess',
    title: 'Grandmaster Chess AI',
    category: 'Applied AI',
    tagline: 'Tournament chess engine featuring minimax evaluation with alpha-beta pruning.',
    problem: 'Demonstrates algorithmic board state representation, bitboard move generation, and minimax AI decision heuristics on mobile devices.',
    role: 'Solo Developer & Algorithmic Engineer',
    stack: ['Flutter', 'Dart', 'Minimax Algorithm', 'Alpha-Beta Pruning', 'Custom Vector Assets'],
    icon: chessIcon,
    links: {
      live: 'https://mostaql.com/u/zyad_waell/portfolio',
      github: 'https://github.com/ZyadWKhedr',
    },
    evidence: 'Mostaql portfolio listing and verified local assets.',
  },
  {
    id: 'savora',
    title: 'Savora Food Logistics',
    category: 'Mobile',
    tagline: 'Multi-brand restaurant ordering and live kitchen dispatch mobile system.',
    problem: 'Multi-brand food operators required consolidated customer carting and branch dispatch without splitting orders into disparate apps.',
    role: 'Mobile App Developer (Freelance Client Contract)',
    stack: ['Flutter', 'Dart', 'REST API', 'Provider', 'Branch Dispatch Pipeline'],
    links: {
      live: 'https://mostaql.com/u/zyad_waell/portfolio',
    },
    evidence: 'Mostaql completed client contract and project portfolio.',
    statusNotes: '[TODO: confirm restaurant brand names and live store links]',
  },
  {
    id: 're3o',
    title: 'Re3o (ريعو)',
    arabicTitle: 'ريعو - صيانة بلايستيشن',
    category: 'Mobile',
    tagline: 'On-demand console service and PlayStation repair booking platform.',
    problem: 'Console gamers and gaming center operators needed verified hardware repair estimates, technician pickup scheduling, and status tracking.',
    role: 'Mobile App Developer (Freelance Client Contract)',
    stack: ['Flutter', 'Dart', 'Firebase Auth', 'Push Notifications', 'Order Tracking UI'],
    links: {
      live: 'https://mostaql.com/u/zyad_waell/portfolio',
    },
    evidence: 'Mostaql completed client contract and project portfolio.',
    statusNotes: '[TODO: confirm whether app is distributed via direct APK or store]',
  },
  {
    id: 'claquette',
    title: 'Claquette (كلاكيت)',
    arabicTitle: 'كلاكيت - لعبة تمثيل',
    category: 'Wearable & Games',
    tagline: 'Interactive Arabic acting party game with round timers and team scorekeeping.',
    problem: 'Arabic social gatherings lacked culturally tailored charades and acting party games featuring offline round timers and group scoring.',
    role: 'Mobile App Developer (Solo Build)',
    stack: ['Flutter', 'Dart', 'Game Loop Timer', 'Local Asset Deck Parsing', 'Custom Animation'],
    links: {
      live: 'https://mostaql.com/u/zyad_waell/portfolio',
    },
    evidence: 'Mostaql completed project showcase.',
    statusNotes: '[TODO: confirm store availability or APK release]',
  },
  {
    id: 'ben10-wearos',
    title: 'Omnitrix Watch Simulator',
    category: 'Wearable & Games',
    tagline: 'WearOS and smartwatch simulator recreating mechanical dial interactions and sound synthesis.',
    problem: 'Wearable project exploring circular display constraints, rotary crown inputs, and high-fidelity haptic feedback.',
    role: 'Wearable & Mobile Developer',
    stack: ['Flutter', 'Dart', 'WearOS API', 'Rotary Scroll', 'Haptics SDK', 'Canvas Dial'],
    links: {
      live: 'https://mostaql.com/u/zyad_waell/portfolio',
    },
    evidence: 'Mostaql completed portfolio project.',
    statusNotes: '[TODO: confirm targeted WearOS API level]',
  },
  {
    id: 'apex-pharma',
    title: 'Apex Pharma Sales Intelligence',
    category: 'Data & Analytics',
    tagline: 'Executive Power BI business intelligence dashboard tracking regional pharmaceutical sales.',
    problem: 'Commercial pharma leaders needed centralized visibility to monitor territory sales variances, field rep quotas, and product margins.',
    role: 'Data Analyst & BI Developer',
    stack: ['Power BI', 'DAX Expressions', 'Power Query ETL', 'Star Schema Data Modeling'],
    links: {
      live: 'https://mostaql.com/u/zyad_waell/portfolio',
    },
    evidence: 'Mostaql completed data science and analytics showcase.',
    statusNotes: '[TODO: confirm dataset size or anonymized case study summary]',
  },
  {
    id: 'asl-detection',
    title: 'Real-Time ASL Alphabet Recognition',
    category: 'Applied AI',
    tagline: 'Computer vision pipeline detecting 26 American Sign Language hand gestures via webcam.',
    problem: 'Assistive vision prototype built to translate sign language gestures into text on commodity webcam hardware without specialized sensors.',
    role: 'Author & Machine Learning Engineer',
    stack: ['Python', 'OpenCV', 'MediaPipe Hands (21 Landmarks)', 'TensorFlow', 'NumPy'],
    links: {
      github: 'https://github.com/ZyadWKhedr',
      live: 'https://stackademic.com',
    },
    evidence: 'Published technical research article on Stackademic / Medium.',
    statusNotes: '[TODO: confirm test dataset validation accuracy]',
  },
];
