import React from 'react';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import SelectedWork from '@/components/SelectedWork';
import SkillsSection from '@/components/SkillsSection';
import WritingSection from '@/components/WritingSection';
import AboutSection from '@/components/AboutSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen bg-canvas text-ink transition-colors duration-200">
      {/* Accessible Header Navigation */}
      <Navigation />

      {/* Main Content Landmark */}
      <main id="main-content" tabIndex={-1} className="outline-none">
        <HeroSection />
        <SelectedWork />
        <SkillsSection />
        <WritingSection />
        <AboutSection />
        <ContactSection />
      </main>

      {/* Semantic Footer */}
      <Footer />
    </div>
  );
};

export default Index;
