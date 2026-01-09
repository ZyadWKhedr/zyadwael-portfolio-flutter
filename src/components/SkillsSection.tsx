import RiveIcon from './RiveIcon';

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
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-flutter-blue to-flutter-teal bg-clip-text text-transparent mb-6">
            Technical Skills
          </h2>
          <div className="w-24 h-1 bg-flutter-gradient mx-auto rounded-full"></div>
          <p className="text-gray-400 mt-6 text-lg">
            Technologies I work with to bring ideas to life
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <div
              key={category.title}
              className="glass p-6 rounded-2xl hover:scale-105 transition-all duration-300 group"
              style={{ animationDelay: `${categoryIndex * 200}ms` }}
            >
              <h3 className={`text-xl font-semibold mb-6 bg-gradient-to-r ${category.color} bg-clip-text text-transparent`}>
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill, skillIndex) => (
                  <span
                    key={skill}
                    className={`px-4 py-2 glass-strong rounded-full text-sm font-mono hover:scale-110 transition-transform duration-200 bg-gradient-to-r ${category.color} bg-clip-text text-transparent hover:shadow-lg`}
                    style={{ animationDelay: `${(categoryIndex * 3 + skillIndex) * 100}ms` }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Floating Rive animations */}
        <div className="relative mt-16 h-32 overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center space-x-8">
            <div className="animate-float">
              <RiveIcon 
                src="https://public.rive.app/community/runtime-files/2244-4463-animated-send-button.riv"
                className="w-16 h-16"
              />
            </div>
            <div className="animate-float" style={{ animationDelay: '500ms' }}>
              <RiveIcon 
                src="https://public.rive.app/community/runtime-files/1044-2062-rocket.riv"
                className="w-16 h-16"
              />
            </div>
            <div className="animate-float" style={{ animationDelay: '1000ms' }}>
              <RiveIcon 
                src="https://public.rive.app/community/runtime-files/1187-2327-light-bulb.riv"
                className="w-16 h-16"
              />
            </div>
            <div className="animate-float" style={{ animationDelay: '1500ms' }}>
              <RiveIcon 
                src="https://public.rive.app/community/runtime-files/2195-4346-avatar-pack-use-case.riv"
                className="w-16 h-16"
              />
            </div>
            <div className="animate-float" style={{ animationDelay: '2000ms' }}>
              <RiveIcon 
                src="https://public.rive.app/community/runtime-files/4770-9445-animated-icon-loading.riv"
                className="w-16 h-16"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
