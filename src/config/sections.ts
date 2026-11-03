export interface SectionItem {
  id: string;
  nameKey: string;
  href: string;
}

export const SECTIONS: SectionItem[] = [
  { id: 'hero', nameKey: 'nav.name', href: '#hero' },
  { id: 'work', nameKey: 'nav.work', href: '#work' },
  { id: 'opensource', nameKey: 'nav.opensource', href: '#opensource' },
  { id: 'writing', nameKey: 'nav.writing', href: '#writing' },
  { id: 'experience', nameKey: 'nav.experience', href: '#experience' },
  { id: 'about', nameKey: 'nav.about', href: '#about' },
  { id: 'contact', nameKey: 'nav.contact', href: '#contact' },
];
