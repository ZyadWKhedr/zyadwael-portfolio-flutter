
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

      <div className="container mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left side - Text content */}
        <div className="space-y-8 lg:pr-8">
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

        {/* Right side - Photo as design element */}
        <div className="relative lg:h-screen flex items-center justify-center">
          <div className="relative">
            {/* Glowing background effect */}
            <div className="absolute inset-0 bg-flutter-gradient rounded-full blur-3xl opacity-20 scale-110 animate-glow"></div>
            
            {/* Main photo */}
            <div className="relative">
              <img
                src="/lovable-uploads/5f538683-3c1f-4efe-aa04-e55406896eb7.png"
                alt="Zyad Wael"
                className="w-80 h-80 lg:w-96 lg:h-96 object-cover rounded-full opacity-90 relative z-10 hover:scale-105 transition-transform duration-500"
              />
              
              {/* Overlay gradient effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-flutter-blue/30 via-transparent to-flutter-teal/30 rounded-full z-20"></div>
            </div>

            {/* Floating tech icons around the photo */}
            <div className="absolute -top-8 -right-8 w-16 h-16 glass rounded-xl flex items-center justify-center animate-float">
              <span className="text-2xl">📱</span>
            </div>
            <div className="absolute -bottom-8 -left-8 w-16 h-16 glass rounded-xl flex items-center justify-center animate-float delay-1000">
              <span className="text-2xl">🤖</span>
            </div>
            <div className="absolute top-1/2 -left-12 w-16 h-16 glass rounded-xl flex items-center justify-center animate-float delay-2000">
              <span className="text-2xl">📊</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
