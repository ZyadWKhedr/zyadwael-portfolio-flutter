import React from 'react';
import { ArrowUpRight, BookOpen, Clock, Tag } from 'lucide-react';

interface Article {
  title: string;
  publication: string;
  url: string;
  readTime: string;
  topic: string;
  summary: string;
  date: string;
}

const articles: Article[] = [
  {
    title: "Your Flutter App Is Lying to You — And You Don't Even Know It",
    publication: "Stackademic",
    url: "https://blog.stackademic.com/your-flutter-app-is-lying-to-you-and-you-dont-even-know-it-1c50ee4b17ef?gi=48cf46825f2b",
    readTime: "9 min read",
    topic: "Mobile Security",
    summary:
      "A deep architectural dive into mobile client vulnerability, explaining how to implement freeRASP in Flutter to protect against runtime tampering, rooting, hooked debuggers, and reverse engineering.",
    date: "Security Engineering",
  },
  {
    title: "Demystifying Socket.IO: Real-Time Communication with Flutter & Riverpod",
    publication: "Stackademic",
    url: "https://medium.com/stackademic/demystifying-socket-io-real-time-communication-with-flutter-riverpod-ad942fec44c2",
    readTime: "10 min read",
    topic: "Real-Time Systems",
    summary:
      "Hands-on architectural pattern for managing bi-directional WebSocket connections, reconnection resilience, and reactive UI updates using Riverpod state providers.",
    date: "State Architecture",
  },
  {
    title: "Building a Real-Time ASL Detection App with Computer Vision and Machine Learning",
    publication: "AI in Plain English",
    url: "https://medium.com/ai-in-plain-english/building-a-real-time-asl-detection-app-with-computer-vision-and-machine-learning-a5f93416b87f",
    readTime: "12 min read",
    topic: "Computer Vision & ML",
    summary:
      "End-to-end implementation of an American Sign Language recognition pipeline combining OpenCV frame extraction with trained ML classification models on mobile.",
    date: "Machine Learning",
  },
  {
    title: "Software Craftsmanship: A Guide to Design Patterns in Dart & Flutter",
    publication: "Stackademic",
    url: "https://medium.com/stackademic/software-craftsmanship-a-guide-to-design-patterns-in-dart-flutter-6011cb0f1b12",
    readTime: "10 min read",
    topic: "Software Craftsmanship",
    summary:
      "Translating classic Gang of Four design patterns into idiomatic modern Dart. How factory, singleton, observer, and strategy patterns prevent mobile state spaghetti.",
    date: "Design Patterns",
  },
];

export const WritingSection: React.FC = () => {
  return (
    <section id="writing" className="py-20 md:py-28 border-b border-border-subtle">
      <div className="container max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-border-subtle">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-widest text-accent mb-2">
              <span className="w-2 h-2 rounded-full bg-accent" />
              <span>Technical Notes &amp; Publications</span>
            </div>
            <h2 className="font-serif fluid-3xl font-bold tracking-tight text-ink">
              Writing &amp; Architectural Field Notes
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <p className="text-ink-muted text-sm max-w-sm font-sans leading-relaxed">
              Published engineering articles on mobile security, real-time networking, and clean code.
            </p>
            <a
              href="https://medium.com/@ziad.w.khedr"
              target="_blank"
              rel="noopener noreferrer"
              className="touch-target inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-mono rounded border border-border-strong bg-surface hover:border-accent hover:text-accent transition-colors self-start sm:self-auto"
            >
              <span>Medium Profile</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Editorial Articles Ledger */}
        <div className="divide-y divide-border-subtle pt-6">
          {articles.map((article, index) => (
            <article
              key={article.url}
              className="py-8 group flex flex-col md:flex-row md:items-baseline justify-between gap-6 transition-colors"
            >
              <div className="md:w-3/4 flex flex-col gap-2">
                <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-ink-muted">
                  <span className="text-accent font-semibold uppercase tracking-wider">
                    {article.publication}
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-ink-faint" />
                    <span>{article.readTime}</span>
                  </span>
                  <span>·</span>
                  <span className="px-2 py-0.5 rounded bg-elevated border border-border-subtle text-[11px] text-ink-muted">
                    {article.topic}
                  </span>
                </div>

                <h3 className="font-serif text-xl md:text-2xl font-bold text-ink group-hover:text-accent transition-colors pt-1">
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="focus:outline-none focus-visible:underline"
                  >
                    {article.title}
                  </a>
                </h3>

                <p className="text-sm text-ink-muted leading-relaxed font-sans max-w-2xl mt-1">
                  {article.summary}
                </p>
              </div>

              <div className="md:w-1/4 flex md:justify-end items-center">
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="touch-target inline-flex items-center gap-1.5 px-4 py-2 text-xs font-mono font-medium rounded-md border border-border-subtle bg-surface group-hover:border-accent group-hover:text-accent transition-colors"
                >
                  <span>Read Article</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WritingSection;
