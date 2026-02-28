
import { useEffect } from 'react';
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
import RamadanDecorations, { isRamadan } from '@/components/RamadanDecorations';
import RamadanBanner from '@/components/RamadanBanner';
import FloatingParticles from '@/components/FloatingParticles';
import SectionDivider from '@/components/SectionDivider';

const Index = () => {
  const ramadan = isRamadan();

  useEffect(() => {
    if (ramadan) {
      document.body.classList.add('ramadan-theme');
    } else {
      document.body.classList.remove('ramadan-theme');
    }
    return () => document.body.classList.remove('ramadan-theme');
  }, [ramadan]);

  return (
    <div className="min-h-screen relative">
      {/* Global floating particles */}
      <FloatingParticles />

      {/* Ramadan Decorations — only render during Ramadan */}
      <RamadanDecorations />
      <RamadanBanner />

      {/* Navigation */}
      <Navigation />
      
      {/* Social Links */}
      <SocialLinks />
      
      {/* Main Content */}
      <main className="relative z-10">
        <HeroSection />
        <SectionDivider />
        <AboutSection />
        <SectionDivider />
        <SkillsSection />
        <SectionDivider />
        <ProjectsSection />
        <SectionDivider />
        <PackagesSection />
        <SectionDivider />
        <TestimonialsSection />
        <SectionDivider />
        <ArticlesSection />
        <SectionDivider />
        <ContactSection />
      </main>
      
      {/* Footer */}
      <footer className="py-12 px-4 lg:px-8 border-t border-gray-800">
        <div className="container mx-auto text-center">
          {ramadan && (
            <p className="text-ramadan-gold/60 mb-4">
              ✦ رمضان كريم ✦
            </p>
          )}
          <p className="text-gray-400 mb-4">
            {ramadan ? (
              <>Built with <span className="text-ramadan-gold">🌙</span> by{' '}
              <span className="text-ramadan-amber font-semibold">Zyad Wael</span></>
            ) : (
              <>Built with <span className="text-flutter-light-blue">💙</span> Flutter spirit by{' '}
              <span className="text-flutter-teal font-semibold">Zyad Wael</span></>
            )}
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
