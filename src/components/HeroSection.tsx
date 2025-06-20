
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

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
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden px-4 lg:px-8">
      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-20 h-20 bg-flutter-blue/20 rounded-full animate-float blur-sm"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-flutter-teal/20 rounded-full animate-float delay-1000 blur-sm"></div>
        <div className="absolute bottom-40 left-20 w-24 h-24 bg-flutter-purple/20 rounded-full animate-float delay-2000 blur-sm"></div>
      </div>

      <div className="container mx-auto relative z-10">
        {/* Background image positioned on the right */}
        <div className="absolute right-0 top-0 h-full w-1/2 lg:w-2/5 hidden lg:block">
          <img
            src="/lovable-uploads/5f538683-3c1f-4efe-aa04-e55406896eb7.png"
            alt=""
            className="w-full h-full object-cover object-center opacity-85"
            style={{
              maskImage: 'linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 70%, rgba(0,0,0,0) 100%)',
              WebkitMaskImage: 'linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 70%, rgba(0,0,0,0) 100%)'
            }}
          />
        </div>

        {/* Content grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Text content */}
          <div className="space-y-8 lg:pr-8 relative z-20">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-7xl font-bold bg-gradient-to-r from-flutter-blue via-flutter-light-blue to-flutter-teal bg-clip-text text-transparent">
                Zyad Wael
              </h1>
              <h2 className="text-2xl lg:text-3xl text-gray-300 font-light">
                Flutter Developer | Data Science Student
              </h2>
            </div>

            {/* Typing animation for skills */}
            <div className="h-16 flex items-center">
              <p className="text-lg lg:text-xl font-mono text-flutter-light-blue transition-all duration-500">
                {skills[currentSkill]}
              </p>
            </div>

            <p className="text-xl lg:text-2xl text-gray-400 leading-relaxed">
              "Bridging App Performance & Intelligence with{' '}
              <span className="text-flutter-teal font-semibold">Flutter</span> and{' '}
              <span className="text-flutter-purple font-semibold">AI</span>."
            </p>

            <Button 
              size="lg" 
              className="bg-flutter-gradient hover:scale-105 transition-all duration-300 text-white font-semibold px-8 py-4 text-lg shadow-lg hover:shadow-flutter-blue/25"
            >
              <Download className="mr-2 h-5 w-5" />
              Download My CV
            </Button>
          </div>

          {/* Right side - Mobile photo for smaller screens */}
          <div className="relative lg:hidden flex items-center justify-center">
            <img
              src="/lovable-uploads/5f538683-3c1f-4efe-aa04-e55406896eb7.png"
              alt="Zyad Wael"
              className="w-80 h-80 object-cover rounded-2xl opacity-90"
              style={{
                maskImage: 'radial-gradient(circle, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 100%)',
                WebkitMaskImage: 'radial-gradient(circle, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 100%)'
              }}
            />
          </div>

          {/* Spacer for desktop layout */}
          <div className="hidden lg:block"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
