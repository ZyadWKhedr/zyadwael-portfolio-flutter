import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, Download, Package } from 'lucide-react';
import RiveIcon from './RiveIcon';

const PackagesSection = () => {
  const packages = [
    {
      title: "Liquid Navbar",
      description: "A Flutter package that mimics iOS Liquid Glass effects in a custom navigation bar with smooth animations and easy customization.",
      stats: "400+ downloads",
      features: [
        "iOS Liquid Glass effects",
        "Smooth animations",
        "Easy customization",
        "Active community usage"
      ],
      pubDevUrl: "https://pub.dev/packages/liquid_navbar",
      gradient: "from-flutter-blue to-flutter-teal"
    }
  ];

  return (
    <section id="packages" className="py-20 px-4 lg:px-8">
      <div className="container mx-auto">
        <div className="text-center mb-16 relative">
          <div className="absolute left-1/2 -translate-x-1/2 -top-8 opacity-60">
            <RiveIcon 
              src="https://public.rive.app/community/runtime-files/4770-9445-animated-icon-loading.riv"
              className="w-24 h-24"
            />
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-flutter-teal to-flutter-purple bg-clip-text text-transparent mb-6 pt-16">
            Flutter Packages
          </h2>
          <div className="w-24 h-1 bg-flutter-gradient mx-auto rounded-full"></div>
          <p className="text-gray-400 mt-6 text-lg">
            Open-source packages published on pub.dev
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          {packages.map((pkg) => (
            <Card
              key={pkg.title}
              className="glass border-0 hover:scale-[1.02] transition-all duration-500 group overflow-hidden relative"
            >
              <div className="absolute top-4 right-4 opacity-50">
                <RiveIcon 
                  src="https://public.rive.app/community/runtime-files/1044-2062-rocket.riv"
                  className="w-16 h-16"
                  playOnHover
                />
              </div>
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-4 rounded-xl bg-gradient-to-r ${pkg.gradient} bg-opacity-20`}>
                    <Package className="h-8 w-8 text-flutter-light-blue" />
                  </div>
                  <div className="flex items-center gap-2 text-flutter-teal">
                    <Download className="h-4 w-4" />
                    <span className="text-sm font-semibold">{pkg.stats}</span>
                  </div>
                </div>
                <CardTitle className={`text-2xl bg-gradient-to-r ${pkg.gradient} bg-clip-text text-transparent`}>
                  {pkg.title}
                </CardTitle>
                <CardDescription className="text-gray-300 text-base">
                  {pkg.description}
                </CardDescription>
              </CardHeader>

              <CardContent>
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-flutter-light-blue mb-3">Highlights</h4>
                  <ul className="grid grid-cols-2 gap-2">
                    {pkg.features.map((feature) => (
                      <li key={feature} className="text-sm text-gray-400 flex items-center">
                        <span className="w-1.5 h-1.5 bg-flutter-teal rounded-full mr-2"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <Button
                  className="w-full bg-gradient-to-r from-flutter-blue to-flutter-teal hover:opacity-90 transition-opacity group/btn"
                  onClick={() => window.open(pkg.pubDevUrl, '_blank')}
                >
                  <ExternalLink className="h-4 w-4 mr-2 group-hover/btn:animate-bounce" />
                  View on pub.dev
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PackagesSection;
