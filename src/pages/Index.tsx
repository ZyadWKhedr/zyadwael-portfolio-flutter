import React from 'react';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import SelectedWork from '@/components/SelectedWork';
import SkillsSection from '@/components/SkillsSection';
import WritingSection from '@/components/WritingSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import AboutSection from '@/components/AboutSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import AiAssistant from '@/components/AiAssistant';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen bg-canvas text-ink transition-colors duration-200 relative selection:bg-accent selection:text-white">
      {/* Accessible Header Navigation */}
      <Navigation />

      {/* Main Content Landmark */}
      <main id="main-content" tabIndex={-1} className="outline-none">
        <HeroSection />
        <SelectedWork />
        <SkillsSection />
        <WritingSection />
        <TestimonialsSection />
        <AboutSection />
        <ContactSection />
      </main>

      {/* Semantic Footer */}
      <Footer />

      {/* Interactive AI Portfolio Concierge (Launcher & Drawer) */}
      <AiAssistant />
    </div>
  );
};

export default Index;
