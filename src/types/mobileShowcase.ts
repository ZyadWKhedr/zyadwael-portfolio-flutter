export interface AppScreen {
  id: string;
  title: string;
  arabicTitle?: string;
  subtitle: string;
  arabicSubtitle?: string;
  flow: string;
  arabicFlow?: string;
  accent: string;
  features: string[];
  arabicFeatures?: string[];
  image?: string;
  placeholderLabel?: string;
}

export interface MobileAppItem {
  id: string;
  title: string;
  arabicTitle?: string;
  category: string;
  arabicCategory?: string;
  tagline: string;
  arabicTagline?: string;
  icon: string;
  badge?: string;
  arabicBadge?: string;
  isSystem?: boolean;
  description: string;
  arabicDescription?: string;
  role: string;
  arabicRole?: string;
  architecture: string;
  arabicArchitecture?: string;
  decisions: string[];
  arabicDecisions?: string[];
  stack: string[];
  metrics: string[];
  arabicMetrics?: string[];
  links: {
    appStore?: string;
    playStore?: string;
    github?: string;
    live?: string;
  };
  screens: AppScreen[];
}
