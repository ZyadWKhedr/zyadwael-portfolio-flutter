
import { AnimatedSection, AnimatedItem } from '@/components/AnimatedSection';

const AboutSection = () => {
  return (
    <section id="about" className="py-20 px-4 lg:px-8">
      <div className="container mx-auto">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-flutter-blue to-flutter-teal bg-clip-text text-transparent mb-6">
            About Me
          </h2>
          <div className="w-24 h-1 bg-flutter-gradient mx-auto rounded-full"></div>
        </AnimatedSection>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <AnimatedItem delay={0.1}>
              <div className="glass p-8 rounded-2xl">
                <h3 className="text-2xl font-semibold text-flutter-light-blue mb-4">Flutter Developer</h3>
                <p className="text-gray-300 leading-relaxed">
                  Experienced in building cross-platform apps using{' '}
                  <span className="text-flutter-teal font-semibold">Clean Architecture</span>,{' '}
                  <span className="text-flutter-teal font-semibold">Riverpod</span>,{' '}
                  <span className="text-flutter-teal font-semibold">Firebase</span>, and smooth animations.
                  I focus on creating scalable and maintainable mobile applications.
                </p>
              </div>
            </AnimatedItem>

            <AnimatedItem delay={0.2}>
              <div className="glass p-8 rounded-2xl">
                <h3 className="text-2xl font-semibold text-flutter-purple mb-4">Data Science Student & Community Leader</h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Currently studying Data Science at{' '}
                  <span className="text-flutter-purple font-semibold">Alexandria University</span> with a passion for{' '}
                  <span className="text-flutter-purple font-semibold">AI-powered applications</span>.
                  I love exploring the intersection of mobile development and artificial intelligence.
                </p>
                <div className="mt-4 space-y-2 text-sm text-gray-400">
                  <p>🎯 <span className="text-flutter-teal">Head of Flutter Committee</span> – HackerRank Campus Club, AUFS</p>
                  <p>📚 <span className="text-flutter-teal">Member of Academic Committee</span> – SAFWA, FCDS</p>
                  <p>💻 <span className="text-flutter-teal">Flutter Coordinator</span> – HackerRank Campus Club, AUFS</p>
                </div>
              </div>
            </AnimatedItem>
          </div>

          <AnimatedItem delay={0.3}>
            <div className="glass p-8 rounded-2xl">
              <h3 className="text-2xl font-semibold text-flutter-light-blue mb-6">My Mission</h3>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                I build <span className="text-flutter-teal font-semibold">scalable</span> and{' '}
                <span className="text-flutter-teal font-semibold">user-friendly</span> mobile apps that blend{' '}
                <span className="text-flutter-blue font-semibold">art</span> and{' '}
                <span className="text-flutter-blue font-semibold">logic</span>.
              </p>
              <p className="text-gray-300 leading-relaxed">
                My goal is to create mobile experiences that not only look beautiful but also solve real-world problems
                through the power of Flutter and AI integration. Every app I build is a step towards making technology
                more accessible and intelligent.
              </p>

              <div className="grid grid-cols-3 gap-4 mt-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-flutter-blue">10+</div>
                  <div className="text-sm text-gray-400">Projects</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-flutter-teal">3+</div>
                  <div className="text-sm text-gray-400">Years Learning</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-flutter-purple">5+</div>
                  <div className="text-sm text-gray-400">Technologies</div>
                </div>
              </div>
            </div>
          </AnimatedItem>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
