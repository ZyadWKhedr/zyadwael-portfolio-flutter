
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Github, ExternalLink } from 'lucide-react';

const ProjectsSection = () => {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  const projects = [
    {
      title: "My Pharmacist App",
      description: "A comprehensive pharmacy management app with AI chat capabilities",
      technologies: ["Flutter", "Firebase Auth", "Gemini AI", "SQLite"],
      features: ["Google Sign-In", "AI-powered chat", "Local storage", "Clean Architecture"],
      gradient: "from-flutter-blue to-flutter-light-blue",
      icon: "💊"
    },
    {
      title: "Meal Recommendation App",
      description: "AI-driven meal suggestions built during internship at Cellula",
      technologies: ["Flutter", "Gemini AI", "Clean Architecture", "Git"],
      features: ["AI recommendations", "Trello workflow", "Team collaboration", "MVVM pattern"],
      gradient: "from-flutter-light-blue to-flutter-teal",
      icon: "🍽️"
    },
    {
      title: "Weather App",
      description: "Smart weather application with AI-driven safety insights",
      technologies: ["Flutter", "Weather API", "AI Integration", "Material Design"],
      features: ["Real-time weather", "Safety recommendations", "Location services", "Responsive UI"],
      gradient: "from-flutter-teal to-flutter-purple",
      icon: "🌤️"
    },
    {
      title: "To-Do & Notes Apps",
      description: "Productivity apps with local storage and clean architecture",
      technologies: ["Flutter", "Hive", "SQLite", "MVVM"],
      features: ["Local storage", "Responsive design", "MVVM architecture", "Material UI"],
      gradient: "from-flutter-purple to-flutter-blue",
      icon: "📝"
    }
  ];

  return (
    <section id="projects" className="py-20 px-4 lg:px-8">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-flutter-blue to-flutter-teal bg-clip-text text-transparent mb-6">
            Featured Projects
          </h2>
          <div className="w-24 h-1 bg-flutter-gradient mx-auto rounded-full"></div>
          <p className="text-gray-400 mt-6 text-lg">
            Mobile applications that showcase my development expertise
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <Card
              key={project.title}
              className="glass border-0 hover:scale-105 transition-all duration-500 group cursor-pointer overflow-hidden"
              onMouseEnter={() => setHoveredProject(index)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <CardHeader className="relative">
                <div className="flex items-center justify-between mb-4">
                  <div className={`text-4xl p-3 rounded-xl bg-gradient-to-r ${project.gradient} bg-opacity-20`}>
                    {project.icon}
                  </div>
                  <div className="flex space-x-2">
                    <Button size="icon" variant="ghost" className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <Github className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="ghost" className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <CardTitle className={`text-xl bg-gradient-to-r ${project.gradient} bg-clip-text text-transparent`}>
                  {project.title}
                </CardTitle>
                <CardDescription className="text-gray-300">
                  {project.description}
                </CardDescription>
              </CardHeader>

              <CardContent>
                {/* Technologies */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-flutter-light-blue mb-3">Technologies</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 glass-strong rounded-full text-xs font-mono text-gray-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Features */}
                <div className={`transition-all duration-300 ${hoveredProject === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
                  <h4 className="text-sm font-semibold text-flutter-teal mb-3">Key Features</h4>
                  <ul className="space-y-1">
                    {project.features.map((feature) => (
                      <li key={feature} className="text-sm text-gray-400 flex items-center">
                        <span className="w-1.5 h-1.5 bg-flutter-teal rounded-full mr-2"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
