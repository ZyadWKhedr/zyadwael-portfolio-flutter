import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';
import { AnimatedSection, AnimatedItem } from '@/components/AnimatedSection';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

type ArticleCategory = 'flutter' | 'ai' | 'programming';

const ArticlesSection = () => {
  const articles = [
    {
      title: "Demystifying Socket.IO: Real-Time Communication with Flutter & Riverpod",
      description: "Deep dive into implementing real-time communication in Flutter applications using Socket.IO and Riverpod state management.",
      readTime: "10 min read",
      category: "Flutter",
      group: 'flutter' as ArticleCategory,
      gradient: "from-flutter-blue to-flutter-teal",
      url: "https://medium.com/stackademic/demystifying-socket-io-real-time-communication-with-flutter-riverpod-ad942fec44c2"
    },
    {
      title: "Building a Real-Time ASL Detection App with Computer Vision and Machine Learning",
      description: "Complete guide to creating an American Sign Language detection application using computer vision and ML models.",
      readTime: "12 min read",
      category: "AI & ML",
      group: 'ai' as ArticleCategory,
      gradient: "from-flutter-teal to-flutter-purple",
      url: "https://medium.com/ai-in-plain-english/building-a-real-time-asl-detection-app-with-computer-vision-and-machine-learning-a5f93416b87f"
    },
    {
      title: "Flutter Localization: How to Build Apps That Speak Everyone's Language",
      description: "Comprehensive guide to implementing internationalization in Flutter applications for global reach and multilingual support.",
      readTime: "10 min read",
      category: "Flutter",
      group: 'flutter' as ArticleCategory,
      gradient: "from-flutter-blue to-flutter-teal"
    },
    {
      title: "Clean Architecture in Flutter: Why Your Code Needs to Be Organized",
      description: "Learn how to structure your Flutter applications using clean architecture principles for maintainable and scalable code.",
      readTime: "8 min read",
      category: "Architecture",
      group: 'flutter' as ArticleCategory,
      gradient: "from-blue-500 to-purple-500"
    },
    {
      title: "Integrating Gemini AI Chat with Flutter using Riverpod, Clean Architecture, and Dependency Injection",
      description: "Step-by-step guide to building AI-powered chat applications in Flutter with modern state management and architectural patterns.",
      readTime: "12 min read",
      category: "AI & Flutter",
      group: 'ai' as ArticleCategory,
      gradient: "from-purple-500 to-pink-500"
    },
    {
      title: "Understanding Data Structures with Java",
      description: "Comprehensive guide to implementing and understanding fundamental data structures using Java programming language.",
      readTime: "8 min read",
      category: "Programming",
      group: 'programming' as ArticleCategory,
      gradient: "from-pink-500 to-red-500"
    },
    {
      title: "Software Craftsmanship: A Guide to Design Patterns in Dart & Flutter",
      description: "A comprehensive guide to understanding and implementing design patterns in Dart and Flutter for writing clean, maintainable, and scalable code.",
      readTime: "10 min read",
      category: "Flutter",
      group: 'flutter' as ArticleCategory,
      gradient: "from-flutter-blue to-flutter-purple",
      url: "https://medium.com/stackademic/software-craftsmanship-a-guide-to-design-patterns-in-dart-flutter-6011cb0f1b12"
    },
    {
      title: "Fuzzy Logic: How Machines Think in Shades of Gray",
      description: "Exploring fuzzy logic systems and their practical applications in artificial intelligence and decision-making processes.",
      readTime: "7 min read",
      category: "AI & Logic",
      group: 'ai' as ArticleCategory,
      gradient: "from-red-500 to-orange-500"
    }
  ];

  const tabs: { id: ArticleCategory | 'all'; label: string }[] = [
    { id: 'all', label: 'All' },
    { id: 'flutter', label: 'Flutter' },
    { id: 'ai', label: 'AI & ML' },
    { id: 'programming', label: 'Programming' },
  ];

  const renderGrid = (items: typeof articles) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.slice(0, 999).map((article, index) => (
        <AnimatedItem key={article.title} delay={index * 0.06} className={index >= 2 ? 'hidden md:block' : ''}>
          <Card
            className="glass border-0 hover:scale-105 transition-all duration-300 group cursor-pointer h-full"
            onClick={() => window.open(article.url || 'https://medium.com/@ziad.w.khedr', '_blank')}
          >
            <CardHeader>
              <div className="flex items-center justify-between mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${article.gradient} bg-clip-text text-transparent bg-white/10`}>
                  {article.category}
                </span>
                <span className="text-xs text-foreground/50">{article.readTime}</span>
              </div>
              <CardTitle className="text-lg group-hover:text-flutter-light-blue transition-colors">
                {article.title}
              </CardTitle>
              <CardDescription className="text-foreground/70 line-clamp-3">
                {article.description}
              </CardDescription>
            </CardHeader>

            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-flutter-gradient rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-white">ZW</span>
                  </div>
                  <span className="text-sm text-foreground/60">Zyad Wael</span>
                </div>
                <ExternalLink className="h-4 w-4 text-foreground/40 group-hover:text-flutter-light-blue transition-colors" />
              </div>
            </CardContent>
          </Card>
        </AnimatedItem>
      ))}
      {items.length > 2 && (
        <button
          onClick={() => window.open('https://medium.com/@ziad.w.khedr', '_blank')}
          className="md:hidden flex items-center justify-center gap-2 text-flutter-light-blue font-medium text-sm py-3 rounded-xl border border-flutter-light-blue/20 bg-flutter-light-blue/5 hover:bg-flutter-light-blue/10 transition-colors"
        >
          View all {items.length} on Medium <ExternalLink className="h-4 w-4" />
        </button>
      )}
    </div>
  );

  return (
    <section id="articles" className="py-20 px-4 lg:px-8">
      <div className="container mx-auto">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-flutter-blue to-flutter-teal bg-clip-text text-transparent mb-6">
            Medium Articles
          </h2>
          <div className="w-24 h-1 bg-flutter-gradient mx-auto rounded-full"></div>
          <p className="text-muted-foreground mt-6 text-lg">
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
        </AnimatedSection>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mx-auto mb-10 flex flex-wrap justify-center gap-2 bg-transparent h-auto p-0">
            {tabs.map((t) => (
              <TabsTrigger
                key={t.id}
                value={t.id}
                className="glass-strong rounded-full px-5 py-2 text-sm data-[state=active]:bg-gradient-to-r data-[state=active]:from-flutter-blue data-[state=active]:to-flutter-teal data-[state=active]:text-white"
              >
                {t.label}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="all">{renderGrid(articles)}</TabsContent>
          {tabs.filter(t => t.id !== 'all').map((t) => (
            <TabsContent key={t.id} value={t.id}>
              {renderGrid(articles.filter(a => a.group === t.id))}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

export default ArticlesSection;
