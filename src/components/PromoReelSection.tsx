import { AnimatedSection } from '@/components/AnimatedSection';

const PromoReelSection = () => {
  return (
    <section id="promo-reel" className="py-20 px-4 lg:px-8">
      <div className="container mx-auto">
        <AnimatedSection className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-flutter-blue to-flutter-teal bg-clip-text text-transparent mb-6">
            Promo Reel
          </h2>
          <div className="w-24 h-1 bg-flutter-gradient mx-auto rounded-full"></div>
        </AnimatedSection>

        <div className="max-w-md mx-auto">
          <iframe
            src="/mobile_dev_promo_animatic.html"
            width="100%"
            style={{ aspectRatio: '9 / 16', maxHeight: '480px', border: 'none', borderRadius: '20px', display: 'block' }}
            title="Promo Reel"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
};

export default PromoReelSection;
