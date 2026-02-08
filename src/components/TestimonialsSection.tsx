import { Card, CardContent } from '@/components/ui/card';
import { Quote } from 'lucide-react';

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Add Name",
      role: "Role / Position",
      company: "Company Name",
      quote: "Add your testimonial quote here. This could be a LinkedIn recommendation or a brief endorsement from a coworker, mentor, or client.",
      avatar: "👤"
    },
    {
      name: "Add Name",
      role: "Role / Position", 
      company: "Company Name",
      quote: "Add another testimonial quote here. Share what colleagues or clients have said about working with you.",
      avatar: "👤"
    },
    {
      name: "Add Name",
      role: "Role / Position",
      company: "Company Name", 
      quote: "Add a third testimonial quote here. Highlight feedback about your skills, work ethic, or collaboration.",
      avatar: "👤"
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
                <div className="flex items-center gap-4">
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
