
import { AnimatedSection, AnimatedItem } from '@/components/AnimatedSection';

const SkillsSection = () => {
  const skillCategories = [
    {
      title: "Programming Languages",
      color: "from-flutter-blue to-flutter-light-blue",
      skills: ["Dart", "Java", "Python"]
    },
    {
      title: "Frameworks & Libraries",
      color: "from-flutter-light-blue to-flutter-teal",
      skills: ["Flutter", "Flame Game Engine"]
    },
    {
      title: "State Management",
      color: "from-flutter-teal to-flutter-purple",
      skills: ["Riverpod", "Provider"]
    },
    {
      title: "Databases & Backend",
      color: "from-flutter-purple to-flutter-blue",
      skills: ["Firebase", "Supabase", "SQLite", "RESTful APIs"]
    },
    {
      title: "Version Control",
      color: "from-blue-500 to-purple-500",
      skills: ["Git", "GitHub"]
    },
    {
      title: "Other Skills",
      color: "from-purple-500 to-pink-500",
      skills: ["Machine Learning Integration", "Computer Vision", "Google Maps API", "Google AdMob", "n8n Automation"]
    }
  ];

  return (
    <section id="skills" className="py-20 px-4 lg:px-8">
      <div className="container mx-auto">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-flutter-blue to-flutter-teal bg-clip-text text-transparent mb-6">
            Technical Skills
          </h2>
          <div className="w-24 h-1 bg-flutter-gradient mx-auto rounded-full"></div>
          <p className="text-muted-foreground mt-6 text-lg">
            Technologies I work with to bring ideas to life
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <AnimatedItem key={category.title} delay={categoryIndex * 0.08}>
              <div className="glass p-6 rounded-2xl hover:scale-105 transition-all duration-300 group h-full">
                <h3 className={`text-xl font-semibold mb-6 bg-gradient-to-r ${category.color} bg-clip-text text-transparent`}>
                  {category.title}
                </h3>
                <div className="flex flex-wrap gap-3">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className={`px-4 py-2 glass-strong rounded-full text-sm font-mono hover:scale-110 transition-transform duration-200 bg-gradient-to-r ${category.color} bg-clip-text text-transparent hover:shadow-lg`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </AnimatedItem>
          ))}
        </div>

        {/* Floating skill icons */}
        <AnimatedSection delay={0.3} className="relative mt-16 h-32 overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center space-x-8 animate-float">
            <div className="w-16 h-16 glass rounded-xl flex items-center justify-center text-2xl">📱</div>
            <div className="w-16 h-16 glass rounded-xl flex items-center justify-center text-2xl delay-500">🔥</div>
            <div className="w-16 h-16 glass rounded-xl flex items-center justify-center text-2xl delay-1000">🚀</div>
            <div className="w-16 h-16 glass rounded-xl flex items-center justify-center text-2xl delay-1500">💎</div>
            <div className="w-16 h-16 glass rounded-xl flex items-center justify-center text-2xl delay-2000">🎯</div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default SkillsSection;
