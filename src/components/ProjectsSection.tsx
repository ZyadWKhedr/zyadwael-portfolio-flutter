
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Github, ExternalLink } from 'lucide-react';
import { Apple } from 'lucide-react';

const ProjectsSection = () => {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  const projects = [
    {
      title: "Wofoodi – Fuel & Services Locator",
      description: "Live location tracking app for nearest fuel stations with real-time pricing",
      technologies: ["Flutter", "Google Maps API", "Firebase Auth", "RESTful API"],
      features: ["Live location tracking", "Route navigation", "Real-time fuel prices", "Offline caching"],
      gradient: "from-flutter-blue to-flutter-light-blue",
      icon: "⛽",
      storeLinks: { 
        appStore: "https://apps.apple.com/eg/app/%D9%88%D9%81%D9%88%D8%AF%D9%8A/id6751444551", 
        playStore: "https://play.google.com/store/apps/details?id=com.wofoodi.app.sa&hl=en" 
      }
    },
    {
      title: "Flappy Bird Clone",
      description: "High-performance game clone with monetization via Google AdMob",
      technologies: ["Flutter", "Flame Engine", "Google AdMob", "Local Storage"],
      features: ["60 FPS gameplay", "Banner & interstitial ads", "High-score tracking", "Smooth animations"],
      gradient: "from-flutter-light-blue to-flutter-teal",
      icon: "🐦",
      storeLinks: { appStore: "#", playStore: "#" }
    },
    {
      title: "Amoomy – Transportation & Logistics",
      description: "Full-featured logistics app with multi-role authentication system",
      technologies: ["Flutter", "Firebase Auth", "RESTful APIs", "Provider"],
      features: ["Apple & Google sign-in", "Order management", "Provider scheduling", "Clean Architecture"],
      gradient: "from-flutter-teal to-flutter-purple",
      icon: "🚚",
      storeLinks: { 
        appStore: "https://apps.apple.com/eg/app/amoomy-%D8%B9%D9%85%D9%88%D9%85%D9%8A-%D8%A7%D9%84%D9%86%D9%82%D9%84-%D8%A7%D9%84%D8%AB%D9%82%D9%8A%D9%84/id6753125564", 
        playStore: "https://play.google.com/store/apps/details?id=com.zeroonez.amoomy&hl=en" 
      }
    },
    {
      title: "Meal Recommendation App",
      description: "AI-powered meal planner developed during internship at Cellula Technologies",
      technologies: ["Flutter", "Gemini AI", "Clean Architecture", "Git"],
      features: ["Personalized meal plans", "Team collaboration", "Trello workflow", "API integration"],
      gradient: "from-flutter-purple to-flutter-blue",
      icon: "🍽️",
      storeLinks: { playStore: "#" }
    },
    {
      title: "Realtime Chat App",
      description: "Real-time messaging application built with WebSocket technology",
      technologies: ["WebSocket", "Socket.io", "JavaScript", "Real-time"],
      features: ["Live messaging", "Real-time communication", "Socket connections", "Instant messaging"],
      gradient: "from-flutter-blue to-flutter-light-blue",
      icon: "💬",
      githubUrl: "https://github.com/ZyadWKhedr/Chat-App"
    },
    {
      title: "Gesture Volume Control",
      description: "Innovative app controlling phone volume using hand gestures via PC camera",
      technologies: ["Flutter", "Computer Vision", "Gesture Recognition", "Custom Package"],
      features: ["Hand gesture detection", "Distance mapping", "Reusable package", "Volume control"],
      gradient: "from-flutter-light-blue to-flutter-teal",
      icon: "👋"
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
                    {project.githubUrl && (
                      <Button 
                        size="icon" 
                        variant="ghost" 
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(project.githubUrl, '_blank');
                        }}
                      >
                        <Github className="h-4 w-4" />
                      </Button>
                    )}
                    {project.storeLinks?.playStore && project.storeLinks.playStore !== "#" && (
                      <Button 
                        size="icon" 
                        variant="ghost" 
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(project.storeLinks.playStore, '_blank');
                        }}
                        title="Google Play"
                      >
                        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.5,12.92 20.16,13.19L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                        </svg>
                      </Button>
                    )}
                    {project.storeLinks?.appStore && project.storeLinks.appStore !== "#" && (
                      <Button 
                        size="icon" 
                        variant="ghost" 
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(project.storeLinks.appStore, '_blank');
                        }}
                        title="App Store"
                      >
                        <Apple className="h-4 w-4" />
                      </Button>
                    )}
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
