
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import SkillsSection from '@/components/SkillsSection';
import ProjectsSection from '@/components/ProjectsSection';
import FeaturedProjectSection from '@/components/FeaturedProjectSection';
import PackagesSection from '@/components/PackagesSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import ArticlesSection from '@/components/ArticlesSection';
import ContactSection from '@/components/ContactSection';
import SocialLinks from '@/components/SocialLinks';
import PromoReelSection from '@/components/PromoReelSection';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen relative">
      {/* Navigation */}
      <Navigation />
      
      {/* Social Links */}
      <SocialLinks />
      
      {/* Main Content */}
      <main className="relative">
        <HeroSection />
        <PromoReelSection />
        <TestimonialsSection />
        <AboutSection />
        <SkillsSection />
        <FeaturedProjectSection />
        <ProjectsSection />
        <PackagesSection />
        <ArticlesSection />
        <ContactSection />
      </main>
      
      {/* Footer */}
      <footer className="py-12 px-4 lg:px-8 border-t border-gray-800">
        <div className="container mx-auto text-center space-y-4">
          <p className="text-sm text-flutter-teal font-medium">
            2 project slots open this month.
          </p>
          <Button
            onClick={() => window.open('https://calendly.com', '_blank')}
            size="lg"
            className="bg-flutter-gradient hover:scale-105 transition-all duration-300 text-white font-semibold px-6 py-5 rounded-full shadow-lg shadow-flutter-blue/30"
          >
            Book a Free Call
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <p className="text-gray-400 pt-4">
            Built with <span className="text-flutter-light-blue">💙</span> Flutter spirit by{' '}
            <span className="text-flutter-teal font-semibold">Zyad Wael</span>
          </p>
          <p className="text-sm text-gray-500">
            Copyright © 2025. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
