import { useState, useEffect } from 'react';
import { Menu, X, Share2 } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

type NavItem = { name: string; href: string; route?: string };

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const location = useLocation();
  const navigate = useNavigate();

  const navItems: NavItem[] = [
    { name: 'Home', href: '#hero' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Articles', href: '#articles' },
    { name: 'Planning', href: '#planning', route: '/planning' },
    { name: 'FAQ', href: '#faq', route: '/faq' },
    { name: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    if (location.pathname !== '/') return;
    const handleScroll = () => {
      const sections = navItems
        .filter((i) => !i.route)
        .map((item) => item.href.substring(1));
      const currentSection = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (currentSection) setActiveSection(currentSection);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  const handleNavClick = (item: NavItem) => {
    setIsOpen(false);
    if (item.route) {
      navigate(item.route);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (location.pathname !== '/') {
      navigate('/' + item.href);
      return;
    }
    const element = document.querySelector(item.href);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleShare = async () => {
    const shareData = {
      title: 'Zyad Wael - Portfolio',
      text: "Check out Zyad Wael's portfolio!",
      url: window.location.href,
    };
    if (navigator.share) {
      try { await navigator.share(shareData); } catch { /* cancelled */ }
    } else {
      await navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
    }
  };

  const isItemActive = (item: NavItem) => {
    if (item.route) return location.pathname === item.route;
    return location.pathname === '/' && activeSection === item.href.substring(1);
  };

  return (
    <>
      {/* Desktop */}
      <nav className="fixed top-8 left-1/2 transform -translate-x-1/2 z-50 hidden lg:block">
        <div className="glass px-8 py-4 rounded-full">
          <ul className="flex items-center space-x-6">
            {navItems.map((item, idx) => {
              const active = isItemActive(item);
              return (
                <li key={item.name}>
                  <button
                    onClick={() => handleNavClick(item)}
                    className={`group relative flex items-center gap-1.5 text-sm font-medium transition-all duration-300 ${
                      active ? 'text-flutter-light-blue' : 'text-gray-400 hover:text-flutter-light-blue'
                    }`}
                  >
                    <span className={`text-[10px] font-mono tracking-wider ${active ? 'text-flutter-teal' : 'text-gray-500'}`}>
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <span>{item.name}</span>
                    {active && (
                      <span className="absolute -bottom-1.5 left-0 right-0 h-0.5 bg-gradient-to-r from-flutter-blue to-flutter-teal rounded-full" />
                    )}
                  </button>
                </li>
              );
            })}
            <li>
              <button
                onClick={handleShare}
                className="text-gray-400 hover:text-flutter-light-blue transition-all duration-300"
                title="Share portfolio"
              >
                <Share2 className="h-4 w-4" />
              </button>
            </li>
          </ul>
        </div>
      </nav>

      {/* Mobile */}
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
            <div className="fixed top-0 right-0 w-64 h-full glass-strong p-8 overflow-y-auto">
              <ul className="flex flex-col space-y-5 mt-16">
                {navItems.map((item) => (
                  <li key={item.name}>
                    <button
                      onClick={() => handleNavClick(item)}
                      className={`text-lg font-medium transition-all duration-300 ${
                        isItemActive(item)
                          ? 'text-flutter-light-blue'
                          : 'text-gray-400 hover:text-flutter-light-blue'
                      }`}
                    >
                      {item.name}
                    </button>
                  </li>
                ))}
                <li>
                  <button
                    onClick={handleShare}
                    className="flex items-center gap-2 text-lg font-medium text-gray-400 hover:text-flutter-light-blue transition-all duration-300"
                  >
                    <Share2 className="h-5 w-5" />
                    Share
                  </button>
                </li>
              </ul>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navigation;
