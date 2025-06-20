
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';

const ArticlesSection = () => {
  const articles = [
    {
      title: "Overfitting vs Underfitting",
      description: "Deep dive into model performance optimization and finding the perfect balance in machine learning.",
      readTime: "5 min read",
      category: "Machine Learning",
      gradient: "from-blue-500 to-purple-500"
    },
    {
      title: "Data Structures with Java",
      description: "Comprehensive guide to implementing and understanding fundamental data structures using Java.",
      readTime: "8 min read",
      category: "Programming",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      title: "Fuzzy Logic (with Code)",
      description: "Practical implementation of fuzzy logic systems with real-world examples and code samples.",
      readTime: "7 min read",
      category: "AI & Logic",
      gradient: "from-pink-500 to-red-500"
    },
    {
      title: "Genetic Algorithms Simplified",
      description: "Breaking down genetic algorithms into digestible concepts with practical applications.",
      readTime: "6 min read",
      category: "Algorithms",
      gradient: "from-red-500 to-orange-500"
    },
    {
      title: "Flutter Localization (L10n)",
      description: "Complete guide to implementing internationalization in Flutter applications for global reach.",
      readTime: "10 min read",
      category: "Flutter",
      gradient: "from-flutter-blue to-flutter-teal"
    }
  ];

  return (
    <section id="articles" className="py-20 px-4 lg:px-8">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-flutter-blue to-flutter-teal bg-clip-text text-transparent mb-6">
            Medium Articles
          </h2>
          <div className="w-24 h-1 bg-flutter-gradient mx-auto rounded-full"></div>
          <p className="text-gray-400 mt-6 text-lg">
            Sharing knowledge through technical writing
          </p>
          <Button 
            variant="outline" 
            className="mt-6 border-flutter-blue text-flutter-blue hover:bg-flutter-blue hover:text-white"
            onClick={() => window.open('https://medium.com/@ziad.w.khedr', '_blank')}
          >
            <ExternalLink className="mr-2 h-4 w-4" />
            View All Articles
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article, index) => (
            <Card
              key={article.title}
              className="glass border-0 hover:scale-105 transition-all duration-300 group cursor-pointer"
              onClick={() => window.open('https://medium.com/@ziad.w.khedr', '_blank')}
            >
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${article.gradient} bg-clip-text text-transparent bg-white/10`}>
                    {article.category}
                  </span>
                  <span className="text-xs text-gray-400">{article.readTime}</span>
                </div>
                <CardTitle className="text-lg group-hover:text-flutter-light-blue transition-colors">
                  {article.title}
                </CardTitle>
                <CardDescription className="text-gray-300 line-clamp-3">
                  {article.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-flutter-gradient rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-white">ZW</span>
                    </div>
                    <span className="text-sm text-gray-400">Zyad Wael</span>
                  </div>
                  <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-flutter-light-blue transition-colors" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ArticlesSection;
