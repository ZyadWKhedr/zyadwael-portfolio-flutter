export interface Article {
  title: string;
  publication: string;
  url: string;
  readTime: string;
  topic: string;
  summary: string;
  date: string;
}

export const ARTICLES: Article[] = [
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
