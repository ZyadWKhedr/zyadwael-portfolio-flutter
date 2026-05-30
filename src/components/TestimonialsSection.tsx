
import { Card, CardContent } from '@/components/ui/card';
import { Quote } from 'lucide-react';
import { AnimatedSection, AnimatedItem } from '@/components/AnimatedSection';

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Ali Khaled",
      role: "UI/UX Designer",
      company: "Xperience Software Solutions",
      quote: "Working with Zyad has been a pleasure — his Flutter development skills are impressive, and he consistently delivers clean, maintainable, and well-structured code. His attention to detail and dedication to creating intuitive user experiences make collaboration seamless. I highly recommend him for any mobile app or software project.",
      avatar: "👨‍💻",
      linkedIn: "https://www.linkedin.com/in/alikhaled19/"
    },
    {
      name: "Ahmed Abd Alaziz",
      role: "Flutter Developer",
      company: "ZeroOneZ",
      quote: "I had the pleasure of working with Ziad, and he is a dedicated and reliable professional. He is highly motivated, open to new ideas, and approaches challenges with a positive and flexible mindset. He is also a great team player and a pleasure to work with. I highly recommend him.",
      avatar: "👨‍💻",
      linkedIn: "https://www.linkedin.com/in/ahmed-abd-alaziz/"
    },
    {
      name: "Karim Balbaa",
      role: "Head of Cyber Security Committee",
      company: "HackerRank Campus Club",
      quote: "Zyad consistently demonstrates exceptional technical skills and a strong ability to solve complex problems. His deep understanding of Flutter and mobile app development, combined with his creative approach, makes him a highly valuable asset to any team. Beyond his technical expertise, Zyad is a smart and quick learner who adapts to new challenges effortlessly.",
      avatar: "🛡️",
      linkedIn: "https://www.linkedin.com/in/karim-balbaa/"
    }
  ];

  return (
    <section id="testimonials" className="py-20 px-4 lg:px-8">
      <div className="container mx-auto">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-flutter-purple to-flutter-blue bg-clip-text text-transparent mb-6">
            Testimonials
          </h2>
          <div className="w-24 h-1 bg-flutter-gradient mx-auto rounded-full"></div>
          <p className="text-muted-foreground mt-6 text-lg">
            What people say about working with me
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <AnimatedItem key={index} delay={index * 0.1}>
              <Card className="glass border-0 hover:scale-[1.02] transition-all duration-500 group overflow-hidden relative h-full">
                <CardContent className="p-8">
                  <div className="absolute top-4 right-4 opacity-20">
                    <Quote className="h-12 w-12 text-flutter-teal" />
                  </div>
                  <p className="text-foreground/70 leading-relaxed mb-6 italic relative z-10">
                    "{testimonial.quote}"
                  </p>
                  <div
                    className={`flex items-center gap-4 ${testimonial.linkedIn ? 'cursor-pointer hover:opacity-80 transition-opacity' : ''}`}
                    onClick={() => testimonial.linkedIn && window.open(testimonial.linkedIn, '_blank')}
                  >
                    <div className="text-3xl p-2 rounded-full bg-gradient-to-r from-flutter-blue to-flutter-teal bg-opacity-20">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <h4 className="font-semibold text-flutter-light-blue">{testimonial.name}</h4>
                      <p className="text-sm text-foreground/60">{testimonial.role}</p>
                      <p className="text-xs text-flutter-teal">{testimonial.company}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </AnimatedItem>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
