
import { Github, Linkedin, Facebook, Mail } from 'lucide-react';

const SocialLinks = () => {
  const socialLinks = [
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/zyad-wael-a9035a275',
      icon: Linkedin,
      color: 'hover:text-blue-400'
    },
    {
      name: 'GitHub',
      url: 'https://github.com/ZyadWKhedr',
      icon: Github,
      color: 'hover:text-gray-300'
    },
    {
      name: 'Medium',
      url: 'https://medium.com/@ziad.w.khedr',
      icon: () => (
        <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
          <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/>
        </svg>
      ),
      color: 'hover:text-green-400'
    },
    {
      name: 'Facebook',
      url: 'https://www.facebook.com/profile.php?id=61573995256480',
      icon: Facebook,
      color: 'hover:text-blue-500'
    },
    {
      name: 'Email',
      url: 'mailto:ziad.w.khedr@gmail.com',
      icon: Mail,
      color: 'hover:text-red-400'
    }
  ];

  return (
    <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50 hidden lg:flex flex-col space-y-4">
      {socialLinks.map((link) => {
        const IconComponent = link.icon;
        return (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`glass p-3 rounded-xl text-gray-400 ${link.color} transition-all duration-300 hover:scale-110 group`}
            aria-label={link.name}
          >
            <IconComponent />
          </a>
        );
      })}
      
      {/* Vertical line */}
      <div className="w-px h-20 bg-gradient-to-b from-flutter-blue to-transparent mx-auto"></div>
    </div>
  );
};

export default SocialLinks;
