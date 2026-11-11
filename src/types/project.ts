export interface AppScreenshot {
  id: string;
  url?: string;
  caption: string;
  placeholderLabel: string;
}

export interface InteractiveDemo {
  type: 'dispatch_queue' | 'station_radar' | 'reactive_cart' | 'qr_scanner' | 'liquid_canvas';
  title: string;
  subtitle: string;
  summary: string;
}

export interface FeaturedProject {
  id: string;
  title: string;
  arabicTitle?: string;
  category: string;
  arabicCategory?: string;
  tagline: string;
  arabicTagline?: string;
  icon: string;
  problem: string;
  arabicProblem?: string;
  role: string;
  arabicRole?: string;
  architecture: string;
  arabicArchitecture?: string;
  decisions: string[];
  arabicDecisions?: string[];
  stack: string[];
  outcome: string;
  arabicOutcome?: string;
  metrics: string[];
  links: {
    appStore?: string;
    playStore?: string;
    github?: string;
    live?: string;
  };
  screenshots: AppScreenshot[];
  interactiveDemo: InteractiveDemo;
}

export interface SecondaryProject {
  id: string;
  title: string;
  arabicTitle?: string;
  category: 'Mobile' | 'Mobile Systems' | 'Data & Analytics' | 'Wearable & Games';
  arabicCategory?: string;
  tagline: string;
  arabicTagline?: string;
  problem: string;
  arabicProblem?: string;
  role: string;
  arabicRole?: string;
  stack: string[];
  icon?: string;
  image?: string;
  features?: string[];
  arabicFeatures?: string[];
  metrics?: string[];
  detailedDescription?: string;
  arabicDetailedDescription?: string;
  links: {
    github?: string;
    live?: string;
    store?: string;
    playStore?: string;
    appStore?: string;
    article?: string;
  };
  evidence: string;
  arabicEvidence?: string;
  statusNotes?: string;
}

