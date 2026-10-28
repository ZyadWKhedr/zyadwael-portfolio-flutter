export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  relationship: string;
  quote: string;
  initials: string;
  linkedIn?: string;
  highlight: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'ali-khaled',
    name: 'Ali Khaled',
    role: 'UI/UX Designer',
    company: 'Xperience Software Solutions',
    relationship: 'Collaborated on mobile client user experiences and cross-platform design systems',
    quote:
      'Working with Zyad has been a pleasure — his Flutter development skills are impressive, and he consistently delivers clean, maintainable, and well-structured code. His attention to detail and dedication to creating intuitive user experiences make collaboration seamless. I highly recommend him for any mobile app or software project.',
    initials: 'AK',
    linkedIn: 'https://www.linkedin.com/in/alikhaled19/',
    highlight: 'Clean, maintainable, and well-structured code',
  },
  {
    id: 'ahmed-abd-alaziz',
    name: 'Ahmed Abd Alaziz',
    role: 'Flutter Developer',
    company: 'ZeroOneZ',
    relationship: 'Engineering colleague on commercial production apps (Amoomy & Raval)',
    quote:
      'I had the pleasure of working with Ziad, and he is a dedicated and reliable professional. He is highly motivated, open to new ideas, and approaches challenges with a positive and flexible mindset. He is also a great team player and a pleasure to work with. I highly recommend him.',
    initials: 'AA',
    linkedIn: 'https://www.linkedin.com/in/ahmed-abd-alaziz/',
    highlight: 'Dedicated, reliable, and positive engineering mindset',
  },
  {
    id: 'karim-balbaa',
    name: 'Karim Balbaa',
    role: 'Head of Cyber Security Committee',
    company: 'HackerRank Campus Club',
    relationship: 'Fellow campus club leadership member at AUFS',
    quote:
      'Zyad consistently demonstrates exceptional technical skills and a strong ability to solve complex problems. His deep understanding of Flutter and mobile app development, combined with his creative approach, makes him a highly valuable asset to any team. Beyond his technical expertise, Zyad is a smart and quick learner who adapts to new challenges effortlessly.',
    initials: 'KB',
    linkedIn: 'https://www.linkedin.com/in/karim-balbaa/',
    highlight: 'Deep understanding of Flutter and complex problem solving',
  },
];
