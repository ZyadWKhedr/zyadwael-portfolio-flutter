import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Download } from 'lucide-react';
import zyadProfile from '@/assets/zyad-profile.png';

const HeroSection = () => {
  const [currentSkill, setCurrentSkill] = useState(0);
  const skills = [
    'Flutter • Riverpod • Firebase',
    'Clean Architecture • AI • Streamlit',
    'Data Science • Mobile Development',
    'Cross-Platform • User Experience'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSkill((prev) => (prev + 1) % skills.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden px-4 lg:px-8 pt-20 md:pt-0">
      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-20 h-20 bg-flutter-blue/20 rounded-full animate-float blur-sm"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-flutter-teal/20 rounded-full animate-float delay-1000 blur-sm"></div>
        <div className="absolute bottom-40 left-20 w-24 h-24 bg-flutter-purple/20 rounded-full animate-float delay-2000 blur-sm"></div>
      </div>

      <div className="container mx-auto relative z-10">
        {/* Content grid */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
          {/* Mobile avatar - shows first on mobile */}
          <div className="md:hidden flex items-center justify-center mb-4">
            <div className="relative">
              <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-flutter-blue/30 shadow-2xl shadow-flutter-blue/20">
                <img 
                  src={zyadProfile} 
                  alt="Zyad Wael"
                  className="w-full h-full object-cover object-top scale-125"
                />
              </div>
            </div>
          </div>

          {/* Left side - Text content */}
          <div className="space-y-6 md:space-y-8 text-center md:text-left flex-1">
            <div className="space-y-3 md:space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold bg-gradient-to-r from-flutter-blue via-flutter-light-blue to-flutter-teal bg-clip-text text-transparent">
                Zyad Wael
              </h1>
              <h2 className="text-xl md:text-2xl lg:text-3xl text-gray-300 font-light">
                Flutter Developer | Data Science Student
              </h2>
            </div>

            {/* Typing animation for skills */}
            <div className="h-12 md:h-16 flex items-center justify-center md:justify-start">
              <p className="text-base md:text-lg lg:text-xl font-mono text-flutter-light-blue transition-all duration-500">
                {skills[currentSkill]}
              </p>
            </div>

            <p className="text-lg md:text-xl lg:text-2xl text-gray-400 leading-relaxed px-2 md:px-0">
              "Bridging App Performance & Intelligence with{' '}
              <span className="text-flutter-teal font-semibold">Flutter</span> and{' '}
              <span className="text-flutter-purple font-semibold">AI</span>."
            </p>

            <div className="flex justify-center md:justify-start">
              <Button 
                size="lg" 
                className="bg-flutter-gradient hover:scale-105 transition-all duration-300 text-white font-semibold px-6 md:px-8 py-3 md:py-4 text-base md:text-lg hover:shadow-flutter-blue/25"
                onClick={() => window.open('/Zyad_Wael_CV.pdf', '_blank')}
              >
                <Download className="mr-2 h-5 w-5" />
                Download My CV
              </Button>
            </div>
          </div>

          {/* Right side - Desktop avatar */}
          <div className="hidden md:flex items-center justify-center flex-shrink-0">
            <div className="relative">
              <div className="w-72 h-72 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-flutter-blue/30 shadow-2xl shadow-flutter-blue/20">
                <img 
                  src={zyadProfile} 
                  alt="Zyad Wael"
                  className="w-full h-full object-cover object-top scale-110"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
