
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const navItems = [
    { name: 'Home', href: '#hero' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Articles', href: '#articles' },
    { name: 'Contact', href: '#contact' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => item.href.substring(1));
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="fixed top-8 left-1/2 transform -translate-x-1/2 z-50 hidden lg:block">
        <div className="glass px-8 py-4 rounded-full">
          <ul className="flex space-x-8">
            {navItems.map((item) => (
              <li key={item.name}>
                <button
                  onClick={() => handleNavClick(item.href)}
                  className={`text-sm font-medium transition-all duration-300 ${
                    activeSection === item.href.substring(1)
                      ? 'text-flutter-light-blue'
                      : 'text-gray-400 hover:text-flutter-light-blue'
                  }`}
                >
                  {item.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="lg:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="fixed top-6 right-6 z-50 glass p-3 rounded-xl"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        {isOpen && (
          <div className="fixed inset-0 z-40 lg:hidden">
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
            <div className="fixed top-0 right-0 w-64 h-full glass-strong p-8">
              <ul className="flex flex-col space-y-6 mt-16">
                {navItems.map((item) => (
                  <li key={item.name}>
                    <button
                      onClick={() => handleNavClick(item.href)}
                      className={`text-lg font-medium transition-all duration-300 ${
                        activeSection === item.href.substring(1)
                          ? 'text-flutter-light-blue'
                          : 'text-gray-400 hover:text-flutter-light-blue'
                      }`}
                    >
                      {item.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navigation;
