
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Send } from 'lucide-react';
import { toast } from 'sonner';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to a backend
    toast.success('Message sent! I\'ll get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="py-20 px-4 lg:px-8">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-flutter-blue to-flutter-teal bg-clip-text text-transparent mb-6">
            Let's Build Together
          </h2>
          <div className="w-24 h-1 bg-flutter-gradient mx-auto rounded-full"></div>
          <p className="text-gray-400 mt-6 text-lg">
            Have a project in mind? Let's create something amazing!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="glass p-8 rounded-2xl">
              <h3 className="text-2xl font-semibold text-flutter-light-blue mb-6">Get In Touch</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-flutter-gradient rounded-xl flex items-center justify-center">
                    <Mail className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Email</p>
                    <a 
                      href="mailto:ziad.w.khedr@gmail.com"
                      className="text-flutter-light-blue hover:text-flutter-teal transition-colors"
                    >
                      ziad.w.khedr@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass p-8 rounded-2xl">
              <h3 className="text-xl font-semibold text-flutter-teal mb-4">What I Can Help With</h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-flutter-blue rounded-full mr-3"></span>
                  Flutter Mobile App Development
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-flutter-light-blue rounded-full mr-3"></span>
                  AI Integration in Mobile Apps
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-flutter-teal rounded-full mr-3"></span>
                  Data Science Projects
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-flutter-purple rounded-full mr-3"></span>
                  Technical Consulting
                </li>
              </ul>
            </div>
          </div>

          {/* Contact Form */}
          <div className="glass p-8 rounded-2xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                  Your Name
                </label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="glass border-gray-600 focus:border-flutter-blue"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="glass border-gray-600 focus:border-flutter-blue"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleInputChange}
                  className="glass border-gray-600 focus:border-flutter-blue min-h-[120px]"
                  placeholder="Tell me about your project..."
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-flutter-gradient hover:scale-105 transition-all duration-300 text-white font-semibold py-3"
              >
                <Send className="mr-2 h-4 w-4" />
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
