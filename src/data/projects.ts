import amoomyIcon from '@/assets/amoomy-icon.png';
import wofoodiIcon from '@/assets/wofoodi-icon.png';
import ravalIcon from '@/assets/raval-icon.png';
import ufuqIcon from '@/assets/ufuq-icon.png';
import chessIcon from '@/assets/chess-icon.png';

import type { AppScreenshot, InteractiveDemo, FeaturedProject, SecondaryProject } from '@/types/project';
export type { AppScreenshot, InteractiveDemo, FeaturedProject, SecondaryProject };

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
    screenshots: [
      { id: 'am-1', caption: 'Role-based driver dispatch and vehicle category selection', placeholderLabel: 'Driver Dispatch Screen' },
      { id: 'am-2', caption: 'Real-time quotation bids comparison and operator negotiation', placeholderLabel: 'Quotation Matrix Screen' },
      { id: 'am-3', caption: 'Offline corridor request buffer with auto-sync', placeholderLabel: 'Corridor Route Tracking Screen' },
    ],
    interactiveDemo: {
      type: 'dispatch_queue',
      title: 'Real-Time Dispatch Bid Simulator',
      subtitle: 'Simulate live heavy-equipment bid negotiations between client and operators',
      summary: 'Demonstrates offline-safe order state dispatch and multi-role context switching.',
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
    screenshots: [
      { id: 'wo-1', caption: 'Geospatial radar with fuel grade availability filter', placeholderLabel: 'Highway Station Map Screen' },
      { id: 'wo-2', caption: 'Station detailed intelligence: diesel, 91, 95 prices', placeholderLabel: 'Station Price Details Screen' },
      { id: 'wo-3', caption: 'Turn-by-turn route navigation with offline price fallback', placeholderLabel: 'Route Navigation Screen' },
    ],
    interactiveDemo: {
      type: 'station_radar',
      title: 'Geospatial Fuel Radar Simulation',
      subtitle: 'Simulate trajectory-based station clustering and live price filtering',
      summary: 'Demonstrates sub-meter route radius filtering and compile-time SVG map markers.',
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
    screenshots: [
      { id: 'ra-1', caption: 'High-speed catalog browse with zero layout-shift progressive loader', placeholderLabel: 'Product Catalog Screen' },
      { id: 'ra-2', caption: 'Optimistic reactive cart calculation and coupon engine', placeholderLabel: 'Cart & Checkout Screen' },
      { id: 'ra-3', caption: 'Real-time order dispatch lifecycle timeline tracker', placeholderLabel: 'Order Lifecycle Tracking Screen' },
    ],
    interactiveDemo: {
      type: 'reactive_cart',
      title: 'Optimistic State Cart Calculation',
      subtitle: 'Experience instant UI state recomputation with zero spinner delay',
      summary: 'Demonstrates Clean Architecture domain entities with reactive price calculation.',
    },
  },
  {
    id: 'ufuq',
    title: 'Ufuq',
    arabicTitle: 'أفق - أذكار وقرآن وإذاعة',
    category: 'Islamic Companion & Audio Streaming',
    tagline: 'Comprehensive spiritual companion featuring GPS prayer calculation, audio recitations, and live radio.',
    icon: ufuqIcon,
    problem:
      'Muslims seeking a unified, distraction-free companion app frequently faced ad-cluttered interfaces, inaccurate prayer timing algorithms, and separate tools for Quran reading, daily Athkar, and live audio broadcasting.',
    role:
      'Solo Mobile Engineer — Built the end-to-end iOS application, streaming audio architecture, SQLite local database, and sensor-calibrated Qibla compass.',
    architecture:
      'Engineered using Clean Architecture with BLoC and Provider state management. Decoupled audio playback service running in background isolates from the UI presentation layer with lock-screen control support.',
    decisions: [
      'Designed an offline-first SQLite cache for complete Quranic text, Athkar, and Hisn al-Muslim with instant search.',
      'Implemented a low-latency audio streaming pipeline with lock-screen media controls and background audio playback.',
      'Integrated hardware magnetometer calibration for accurate Qibla heading with tilt compensation.',
    ],
    stack: ['Flutter', 'Dart', 'Clean Architecture', 'Audio Streaming', 'SQLite', 'Sensors API', 'Local Notifications'],
    outcome:
      'Shipped on Apple App Store (ID: 6821979552), featuring offline Holy Quran, daily Hisn al-Muslim Athkar, 24/7 Islamic radio stations, and GPS astronomical prayer times.',
    metrics: ['Shipped iOS App Store', 'Offline-First SQLite', '24/7 Audio Radio'],
    links: {
      appStore: 'https://apps.apple.com/us/app/ufuq/id6821979552',
      github: 'https://github.com/ZyadWKhedr',
    },
    screenshots: [
      { id: 'uf-1', caption: 'Categorized Hisn al-Muslim daily Athkar with haptic Subha counter', placeholderLabel: 'Daily Athkar Screen' },
      { id: 'uf-2', caption: 'Complete Holy Quran with verse bookmarking and 24/7 live audio radio stream', placeholderLabel: 'Holy Quran & Audio Screen' },
      { id: 'uf-3', caption: 'Astronomical GPS prayer times countdown with magnetic Qibla compass', placeholderLabel: 'Prayer Times Screen' },
    ],
    interactiveDemo: {
      type: 'dispatch_queue',
      title: 'Digital Subha & Quran Audio Simulator',
      subtitle: 'Simulate tactile prayer counter and background radio streaming',
      summary: 'Demonstrates offline-first SQLite persistence and background audio isolate management.',
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
      'Published on the official Dart package repository (pub.dev/packages/liquid_navbar) with 130/140 pub points and active community adoption.',
    metrics: ['Official Dart Package', '130/140 Pub Points', 'Zero External Dependencies'],
    links: {
      live: 'https://pub.dev/packages/liquid_navbar',
      github: 'https://github.com/ZyadWKhedr',
    },
    screenshots: [
      { id: 'ln-1', caption: 'Fluid spring physics curve reacting to tap coordinates', placeholderLabel: 'Fluid Bezier Matrix Spec' },
      { id: 'ln-2', caption: 'Declarative Cupertino & Material 3 palette configuration', placeholderLabel: 'Theme Configuration Spec' },
      { id: 'ln-3', caption: 'pub.dev package score ledger (130/140 points)', placeholderLabel: 'Package Quality Scorecard' },
    ],
    interactiveDemo: {
      type: 'liquid_canvas',
      title: 'Interactive Spring Physics Canvas',
      subtitle: 'Tap the navigation buttons below to test the fluid bezier wave in real time',
      summary: 'Runs custom canvas matrix calculations directly in the browser replicating Flutter CustomPainter.',
    },
  },
];

export const SECONDARY_PROJECTS: SecondaryProject[] = [
  {
    id: 'ufuq',
    title: 'Ufuq (أفق) — Islamic Companion & Audio',
    arabicTitle: 'أفق - أذكار وقرآن وإذاعة',
    category: 'Mobile',
    tagline: 'Comprehensive spiritual companion featuring GPS prayer calculation, offline Quran, and 24/7 radio.',
    problem: 'Muslims seeking a unified, distraction-free companion app frequently faced ad-cluttered interfaces, inaccurate prayer timing algorithms, and separate apps for Quran reading and live radio broadcasting.',
    role: 'Solo Mobile Engineer — Built the end-to-end iOS application, streaming audio architecture, SQLite local database, and sensor-calibrated Qibla compass.',
    stack: ['Flutter', 'Dart', 'Clean Architecture', 'Audio Streaming', 'SQLite', 'Sensors API', 'WidgetKit'],
    icon: ufuqIcon,
    image: '/assets/images/projects/ufuq/ufuq-preview.png',
    features: ['100% Offline Holy Quran with Uthmani script', '24/7 Live Holy Quran Radio streaming', 'Astronomical GPS prayer times countdown', 'Hardware magnetometer Qibla compass', 'Ad-free & zero tracking'],
    metrics: ['Shipped iOS App Store', 'Offline-First SQLite', '24/7 Audio Radio'],
    detailedDescription: 'High-fidelity spiritual companion delivering offline Athkar, Holy Quran reading in authentic Uthmani script, GPS astronomical prayer times, and live 24/7 Islamic radio stations with background playback.',
    links: {
      appStore: 'https://apps.apple.com/id/app/ufuq/id6821979552',
      github: 'https://github.com/ZyadWKhedr',
      live: '/ufuq',
    },
    evidence: 'Verified store release on Apple App Store (ID: 6821979552).',
  },
  {
    id: 'grandmaster-chess',
    title: 'Grandmaster Mobile Chess Engine',
    arabicTitle: 'شطرنج جراند ماستر',
    category: 'Mobile Systems',
    tagline: 'Tournament chess engine featuring minimax evaluation with alpha-beta pruning.',
    problem: 'Engineered an offline tournament chess client demonstrating algorithmic board state representation, bitboard move generation, and minimax evaluation heuristics on mobile devices.',
    role: 'Solo Developer & Algorithmic Mobile Engineer',
    stack: ['Flutter', 'Dart', 'Minimax Algorithm', 'Alpha-Beta Pruning', 'Custom Vector Assets'],
    icon: chessIcon,
    image: '/assets/images/projects/chess/chess-preview.png',
    features: ['Minimax search with alpha-beta pruning', 'Bitboard move validation matrix', 'Algebraic notation (SAN) match recorder', 'Sub-50ms search computation'],
    metrics: ['Shipped iOS & Android', 'Minimax Alpha-Beta', 'Sub-50ms Evaluation'],
    detailedDescription: 'High-performance offline chess client featuring bitboard move generation, heuristic board evaluation, and adaptive depth search. Evaluates thousands of positions per second without UI frame drops.',
    links: {
      playStore: 'https://play.google.com/store/apps/details?id=com.zyadkhidr.grandmaster_chess',
      appStore: 'https://apps.apple.com/us/app/grandmaster-chess/id6774163012',
      github: 'https://github.com/ZyadWKhedr',
    },
    evidence: 'Verified commercial store releases on Apple App Store & Google Play.',
  },
  {
    id: 'apex-pharma',
    title: 'Apex Pharma Sales Intelligence',
    arabicTitle: 'لوحة معلومات واستخبارات مبيعات أبيكس فارما',
    category: 'Data & Analytics',
    tagline: 'Executive Power BI business intelligence dashboard tracking regional pharmaceutical sales.',
    problem: 'Commercial pharmaceutical leadership needed centralized visibility to monitor regional territory sales variances, field representative quota attainment, and product gross margin decomposition.',
    role: 'Data Analyst & BI Developer',
    stack: ['Power BI', 'DAX Expressions', 'Power Query ETL', 'Star Schema Data Modeling', 'KPI Decomposition'],
    image: '/assets/images/projects/powerbi/powerbi-dashboard.png',
    features: ['Star-schema transaction data model', 'Custom DAX sales variance measures', 'Medical rep quota attainment tracking', 'Territory heatmaps & margin decomposition'],
    metrics: ['Multi-Territory Coverage', 'Real-Time DAX Measures', 'Executive KPI Cards'],
    detailedDescription: 'Executive Business Intelligence dashboard developed for pharmaceutical sales management. Consolidates multi-region transaction logs, tracks medical representative quota attainment, identifies territory growth variances, and delivers interactive product gross margin decomposition.',
    links: {
      github: 'https://github.com/ZyadWKhedr',
    },
    evidence: 'Verified executive BI sales analytics implementation.',
  },
  {
    id: 'savora',
    title: 'Savora Food Logistics',
    arabicTitle: 'سافورا - تطبيق طلب طعام وإدارة فروع',
    category: 'Mobile',
    tagline: 'Multi-brand restaurant ordering and live kitchen dispatch mobile system.',
    problem: 'Multi-brand food operators required consolidated customer carting and branch dispatch without splitting orders into disparate apps.',
    role: 'Mobile App Developer (Freelance Client Contract)',
    stack: ['Flutter', 'Dart', 'REST API', 'Provider', 'Branch Dispatch Pipeline'],
    image: '/assets/images/projects/savora/savora-preview.png',
    features: ['Multi-brand menu aggregation', 'Custom crepe & meal toppings builder', 'Live kitchen dispatch timeline', 'Branch geofencing'],
    metrics: ['Multi-Brand Ordering', 'Real-Time Kitchen Dispatch', '60 FPS Carting'],
    detailedDescription: 'Multi-brand restaurant ordering and live kitchen dispatch mobile system engineered for fast carting, customized ingredient modifications (crepes, meals, toppings), branch geofencing, and automated kitchen ticket printing.',
    links: {
      github: 'https://github.com/ZyadWKhedr',
    },
    evidence: 'Verified commercial freelance client contract and mobile architecture delivery.',
  },
  {
    id: 're3o',
    title: 'Re3o (ريعو)',
    arabicTitle: 'ريعو - منصة صيانة بلايستيشن',
    category: 'Mobile',
    tagline: 'On-demand console service and PlayStation repair booking platform.',
    problem: 'Console gamers and gaming center operators needed verified hardware repair estimates, technician pickup scheduling, and status tracking.',
    role: 'Mobile App Developer (Freelance Client Contract)',
    stack: ['Flutter', 'Dart', 'Firebase Auth', 'Push Notifications', 'Order Tracking UI'],
    image: '/assets/images/projects/re3o/re3o-preview.png',
    features: ['Console hardware repair estimator', 'Technician pickup & delivery scheduler', 'Step-by-step diagnostic milestones', 'Push notification status alerts'],
    metrics: ['On-Demand Repair Booking', 'Instant Diagnostics', 'End-to-End Tracking'],
    detailedDescription: 'Specialized on-demand maintenance booking mobile app connecting console gamers and gaming centers with certified PlayStation technicians, featuring device pickup scheduling, instant diagnostic pricing, and live status progress milestones.',
    links: {
      github: 'https://github.com/ZyadWKhedr',
    },
    evidence: 'Verified commercial freelance client contract and mobile service platform delivery.',
  },
  {
    id: 'claquette',
    title: 'Claquette (كلاكيت)',
    arabicTitle: 'كلاكيت - لعبة تمثيل وتحدي جماعي',
    category: 'Wearable & Games',
    tagline: 'Interactive Arabic acting party game with round timers and team scorekeeping.',
    problem: 'Arabic social gatherings lacked culturally tailored charades and acting party games featuring offline round timers and group scoring.',
    role: 'Mobile App Developer (Solo Build)',
    stack: ['Flutter', 'Dart', 'Game Loop Timer', 'Local Asset Deck Parsing', 'Custom Animation'],
    image: '/assets/images/projects/claquette/claquette-preview.png',
    features: ['Culturally tailored Arabic cinema clue decks', 'Customizable round timers & buzzer', 'Team score tracker & leaderboards', '100% offline local asset parsing'],
    metrics: ['100% Offline Gameplay', 'Zero Network Dependency', 'Dynamic Game Loop'],
    detailedDescription: 'High-energy Arabic social party game for charades and improv acting, featuring customizable Egyptian and Arab cinema card decks, round countdown timers, team scorekeeping, and offline game loop execution with zero network dependency.',
    links: {
      github: 'https://github.com/ZyadWKhedr',
    },
    evidence: 'Solo interactive game architecture and release.',
  },
  {
    id: 'ben10-wearos',
    title: 'Omnitrix Watch Simulator',
    arabicTitle: 'محاكي ساعة أومنيتريكس',
    category: 'Wearable & Games',
    tagline: 'WearOS and smartwatch simulator recreating mechanical dial interactions and sound synthesis.',
    problem: 'Wearable project exploring circular display constraints, rotary crown inputs, and high-fidelity haptic feedback.',
    role: 'Wearable & Mobile Developer',
    stack: ['Flutter', 'Dart', 'WearOS API', 'Rotary Scroll', 'Haptics SDK', 'Canvas Dial'],
    image: '/assets/images/projects/ben10/ben10-logo.png',
    features: ['Rotary bezel & crown input handling', 'Circular Canvas dial matrix calculation', 'Tactile haptic vibration triggers', 'Zero-latency audio synthesis'],
    metrics: ['WearOS Rotary Input', 'Canvas Matrix Dial', 'Tactile Haptics'],
    detailedDescription: 'Wearable simulation prototype engineered for circular smartwatch displays and rotary crown input, recreating mechanical dial scrolling, alien selector animations, sound synthesis playback, and high-fidelity haptic feedback.',
    links: {
      github: 'https://github.com/ZyadWKhedr',
    },
    evidence: 'WearOS rotary and canvas simulation project.',
  },
  {
    id: 'asl-detection',
    title: 'Real-Time ASL Alphabet Recognition',
    arabicTitle: 'نظام التعرف الفوري على لغة الإشارة',
    category: 'Mobile Systems',
    tagline: 'Computer vision pipeline detecting 26 American Sign Language hand gestures via webcam.',
    problem: 'Assistive vision prototype built to translate sign language gestures into text on commodity webcam hardware without specialized sensors.',
    role: 'Author & Computer Vision Engineer',
    stack: ['Python', 'OpenCV', 'MediaPipe Hands (21 Landmarks)', 'TensorFlow', 'NumPy'],
    features: ['21 3D hand landmark tracking', 'Real-time gesture normalization', '26-class alphabet classification', 'Sub-30ms latency on CPU'],
    metrics: ['26 Hand Gestures', 'Sub-30ms CPU Latency', 'Published Research'],
    detailedDescription: 'Real-time computer vision pipeline utilizing MediaPipe hand tracking (21 3D landmarks) and deep learning classifier to detect 26 American Sign Language finger gestures in real time via standard webcam.',
    links: {
      github: 'https://github.com/ZyadWKhedr',
      article: 'https://medium.com/@zyadkhedr',
    },
    evidence: 'Published technical research article on Medium.',
  },
];
