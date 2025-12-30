import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
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
        {/* Avatar positioned on the right - desktop */}
        <div className="absolute right-20 top-1/2 transform -translate-y-1/2 hidden md:block">
          <Avatar className="w-80 h-80 lg:w-96 lg:h-96 border-4 border-flutter-blue/30 shadow-2xl shadow-flutter-blue/20">
            <AvatarImage
              src="lovable-uploads/5f538683-3c1f-4efe-aa04-e55406896eb7.png"
              alt="Zyad Wael"
              className="object-cover"
            />
          </Avatar>
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
              className="bg-flutter-gradient hover:scale-105 transition-all duration-300 text-white font-semibold px-8 py-4 text-lg hover:shadow-flutter-blue/25"
              onClick={() => window.open('Zyad_Wael_CV.pdf', '_blank')}
            >
              <Download className="mr-2 h-5 w-5" />
              Download My CV
            </Button>
          </div>

          {/* Right side - Mobile avatar for smaller screens */}
          <div className="relative md:hidden flex items-center justify-center">
            <Avatar className="w-64 h-64 border-4 border-flutter-blue/30 shadow-2xl shadow-flutter-blue/20">
              <AvatarImage
                src="lovable-uploads/5f538683-3c1f-4efe-aa04-e55406896eb7.png"
                alt="Zyad Wael"
                className="object-cover"
              />
            </Avatar>
          </div>

          {/* Spacer for desktop layout */}
          <div className="hidden lg:block"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
