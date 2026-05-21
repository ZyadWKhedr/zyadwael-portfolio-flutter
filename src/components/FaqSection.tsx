import { AnimatedSection } from './AnimatedSection';
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from '@/components/ui/accordion';
import { HelpCircle } from 'lucide-react';

const faqs = [
  {
    q: 'What kind of projects do you take on?',
    a: 'I build cross-platform mobile apps with Flutter (iOS & Android), native macOS apps with SwiftUI, and AI-powered features. I handle everything from idea validation and architecture to App Store / Play Store deployment.',
  },
  {
    q: 'How long does a typical project take?',
    a: 'An MVP usually ships in 4–8 weeks depending on scope. A full production-grade app with backend integration, authentication and polished UI typically takes 2–4 months.',
  },
  {
    q: 'Do you work solo or with a team?',
    a: 'Both. I can own a project end-to-end as a solo engineer, or integrate into your existing team and follow your processes, code review and sprint cadence.',
  },
  {
    q: 'What is your tech stack?',
    a: 'Flutter & Dart for mobile, SwiftUI for macOS, Bloc/Cubit/Riverpod for state management, Supabase / REST APIs / Firebase for backend, and Python for AI / data science work.',
  },
  {
    q: 'Do you provide design or only development?',
    a: 'I design the UI/UX in Figma when needed (Material 3 / Apple HIG aligned), but I also work great with designs you already have or with your own designer.',
  },
  {
    q: 'What about post-launch support?',
    a: 'Yes — I offer maintenance retainers for bug fixes, performance monitoring, OS upgrades and incremental feature work after launch.',
  },
  {
    q: 'How do you handle pricing?',
    a: 'Fixed-price for well-scoped MVPs, milestone-based for larger projects, and hourly for ongoing maintenance. You always know the cost before we start.',
  },
  {
    q: 'How can I get in touch?',
    a: 'Drop me a message via the contact form below or reach out on LinkedIn / email. I usually reply within 24 hours.',
  },
];

const FaqSection = () => {
  return (
    <section id="faq" className="py-24 px-4 lg:px-8 relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(2,211,154,0.7) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />
      <div className="absolute top-1/3 left-10 w-80 h-80 bg-flutter-teal/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-flutter-blue/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto relative z-10 max-w-3xl">
        <AnimatedSection className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.25em] text-flutter-teal uppercase mb-4">
            <HelpCircle className="w-3.5 h-3.5" />
            FAQ
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
            Common <span className="bg-flutter-gradient bg-clip-text text-transparent">Questions.</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Everything you might want to know before we start working together.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((f, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="glass rounded-2xl border border-flutter-light-blue/20 px-5 hover:border-flutter-light-blue/40 transition-colors data-[state=open]:border-flutter-teal/50"
              >
                <AccordionTrigger className="text-left text-white hover:no-underline hover:text-flutter-light-blue text-base font-semibold py-5">
                  <span className="flex items-start gap-3">
                    <span className="text-flutter-teal font-mono text-sm shrink-0 mt-0.5">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    {f.q}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-gray-400 leading-relaxed pl-9 pb-5">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default FaqSection;
