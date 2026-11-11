import React from 'react';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/sections/HeroSection';
import SelectedWork from '@/components/sections/SelectedWork';
import ThingsIveBuilt from '@/components/sections/ThingsIveBuilt';
import WritingSection from '@/components/sections/WritingSection';
import AboutSection from '@/components/sections/AboutSection';
import SkillsSection from '@/components/sections/SkillsSection';
import ContactSection from '@/components/sections/ContactSection';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen bg-canvas text-ink transition-colors duration-200 relative selection:bg-accent selection:text-accent-fg">
      {/* Unobtrusive, Accessible Header Navigation */}
      <Navigation />

      {/* Main Content Landmark */}
      <main id="main-content" tabIndex={-1} className="outline-none">
        {/* 6.1 Hero */}
        <HeroSection />

        {/* 6.2 Selected work (Commercial mobile products) */}
        <SelectedWork />

        {/* 6.3 Things I've built (Independent engineering projects) */}
        <ThingsIveBuilt />

        {/* 6.4 Notes from building things (Technical writing) */}
        <WritingSection />

        {/* 6.5 A little about me */}
        <AboutSection />

        {/* 6.6 What I work with (Skills) */}
        <SkillsSection />

        {/* 6.7 Have something interesting in mind? (Contact) */}
        <ContactSection />
      </main>

      {/* Semantic Editorial Footer */}
      <Footer />
    </div>
  );
};

export default Index;
