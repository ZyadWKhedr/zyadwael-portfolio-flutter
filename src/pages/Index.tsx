
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import SkillsSection from '@/components/SkillsSection';
import ProjectsSection from '@/components/ProjectsSection';
import PackagesSection from '@/components/PackagesSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import ArticlesSection from '@/components/ArticlesSection';
import ContactSection from '@/components/ContactSection';
import SocialLinks from '@/components/SocialLinks';
import RamadanDecorations from '@/components/RamadanDecorations';
import RamadanBanner from '@/components/RamadanBanner';

const Index = () => {
  return (
    <div className="min-h-screen relative">
      {/* Ramadan Decorations */}
      <RamadanDecorations />
      <RamadanBanner />

      {/* Navigation */}
      <Navigation />
      
      {/* Social Links */}
      <SocialLinks />
      
      {/* Main Content */}
      <main className="relative">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <PackagesSection />
        <TestimonialsSection />
        <ArticlesSection />
        <ContactSection />
      </main>
      
      {/* Footer */}
      <footer className="py-12 px-4 lg:px-8 border-t border-gray-800">
        <div className="container mx-auto text-center">
          <p className="text-ramadan-gold/60 mb-4">
            ✦ رمضان كريم ✦
          </p>
          <p className="text-gray-400 mb-4">
            Built with <span className="text-ramadan-gold">🌙</span> by{' '}
            <span className="text-ramadan-amber font-semibold">Zyad Wael</span>
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
