import React from 'react';
import TopBar from '@/components/layout/TopBar';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/sections/HeroSection';
import SelectedWork from '@/components/sections/SelectedWork';
import SkillsSection from '@/components/sections/SkillsSection';
import WritingSection from '@/components/sections/WritingSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import AboutSection from '@/components/sections/AboutSection';
import ContactSection from '@/components/sections/ContactSection';
import AiAssistant from '@/components/chatbot/AiAssistant';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen bg-canvas text-ink transition-colors duration-200 relative selection:bg-accent selection:text-white">
      {/* Top Utility Bar with Live Alexandria Local Time */}
      <TopBar />

      {/* Accessible Sticky Header Navigation */}
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
