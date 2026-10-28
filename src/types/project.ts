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
  screenshots: AppScreenshot[];
  interactiveDemo: InteractiveDemo;
}

export interface SecondaryProject {
  id: string;
  title: string;
  arabicTitle?: string;
  category: 'Mobile' | 'Mobile Systems' | 'Data & Analytics' | 'Wearable & Games';
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
