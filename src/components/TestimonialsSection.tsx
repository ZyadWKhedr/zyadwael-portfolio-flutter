import { Card, CardContent } from '@/components/ui/card';
import { Quote } from 'lucide-react';

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
      name: "Mohamed Hassan",
      role: "Senior Software Engineer",
      company: "TechVision Labs",
      quote: "Zyad is one of the most talented Flutter developers I've worked with. His ability to translate complex UI designs into pixel-perfect, performant mobile apps is remarkable. He's a great team player who always goes the extra mile.",
      avatar: "🧑‍💻"
    },
    {
      name: "Sarah Ahmed",
      role: "Project Manager",
      company: "Digital Solutions Co.",
      quote: "Zyad's technical expertise combined with his excellent communication skills made our project a huge success. He delivered ahead of schedule and the quality of his code exceeded our expectations. Would absolutely work with him again.",
      avatar: "👩‍💼"
    }
  ];

  return (
    <section id="testimonials" className="py-20 px-4 lg:px-8">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-flutter-purple to-flutter-blue bg-clip-text text-transparent mb-6">
            Testimonials
          </h2>
          <div className="w-24 h-1 bg-flutter-gradient mx-auto rounded-full"></div>
          <p className="text-gray-400 mt-6 text-lg">
            What people say about working with me
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="glass border-0 hover:scale-[1.02] transition-all duration-500 group overflow-hidden relative"
            >
              <CardContent className="p-8">
                {/* Quote Icon */}
                <div className="absolute top-4 right-4 opacity-20">
                  <Quote className="h-12 w-12 text-flutter-teal" />
                </div>

                {/* Quote Text */}
                <p className="text-gray-300 leading-relaxed mb-6 italic relative z-10">
                  "{testimonial.quote}"
                </p>

                {/* Author */}
                <div 
                  className={`flex items-center gap-4 ${testimonial.linkedIn ? 'cursor-pointer hover:opacity-80 transition-opacity' : ''}`}
                  onClick={() => testimonial.linkedIn && window.open(testimonial.linkedIn, '_blank')}
                >
                  <div className="text-3xl p-2 rounded-full bg-gradient-to-r from-flutter-blue to-flutter-teal bg-opacity-20">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <h4 className="font-semibold text-flutter-light-blue">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-gray-400">
                      {testimonial.role}
                    </p>
                    <p className="text-xs text-flutter-teal">
                      {testimonial.company}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
