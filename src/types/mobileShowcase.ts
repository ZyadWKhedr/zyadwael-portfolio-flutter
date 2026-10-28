export interface AppScreen {
  id: string;
  title: string;
  subtitle: string;
  flow: string;
  accent: string;
  features: string[];
  image?: string;
  placeholderLabel?: string;
}

export interface MobileAppItem {
  id: string;
  title: string;
  arabicTitle?: string;
  category: string;
  tagline: string;
  icon: string;
  badge?: string;
  isSystem?: boolean;
  description: string;
  role: string;
  architecture: string;
  decisions: string[];
  stack: string[];
  metrics: string[];
  links: {
    appStore?: string;
    playStore?: string;
    github?: string;
    live?: string;
  };
  screens: AppScreen[];
}
