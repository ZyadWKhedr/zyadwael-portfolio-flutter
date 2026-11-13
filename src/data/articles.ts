import type { Article } from '@/types/article';
export type { Article };

export const ARTICLES: Article[] = [
  {
    title: "Your Flutter App Is Lying to You — And You Don't Even Know It",
    title_ar: "تطبيقك في فلاتر يخدعك — دون أن تدري بذلك!",
    publication: "Stackademic",
    url: "https://blog.stackademic.com/your-flutter-app-is-lying-to-you-and-you-dont-even-know-it-1c50ee4b17ef?gi=48cf46825f2b",
    readTime: "9 min read",
    readTime_ar: "٩ دقائق قراءة",
    topic: "Mobile Security",
    topic_ar: "أمن تطبيقات الموبايل",
    summary:
      "A deep architectural dive into mobile client vulnerability, explaining how to implement freeRASP in Flutter to protect against runtime tampering, rooting, hooked debuggers, and reverse engineering.",
    summary_ar:
      "تحليل معماري عميق لنقاط ضعف تطبيق الموبايل، يشرح كيفية تطبيق حزمة freeRASP في فلاتر للحماية من التلاعب وقت التشغيل، والروت، ومصححات الأخطاء المتسللة، والهندسة العكسية.",
    date: "Security Engineering",
  },
  {
    title: "Demystifying Socket.IO: Real-Time Communication with Flutter & Riverpod",
    title_ar: "فهم Socket.IO: الاتصال اللحظي في فلاتر باستخدام Riverpod",
    publication: "Stackademic",
    url: "https://medium.com/stackademic/demystifying-socket-io-real-time-communication-with-flutter-riverpod-ad942fec44c2",
    readTime: "10 min read",
    readTime_ar: "١٠ دقائق قراءة",
    topic: "Real-Time Systems",
    topic_ar: "الأنظمة اللحظية",
    summary:
      "Hands-on architectural pattern for managing bi-directional WebSocket connections, reconnection resilience, and reactive UI updates using Riverpod state providers.",
    summary_ar:
      "نمط معماري تطبيقي لإدارة اتصالات WebSocket ثنائية الاتجاه، ومرونة إعادة الاتصال التلقائي، وتحديثات الواجهة التفاعلية باستخدام مزودي حالة Riverpod.",
    date: "State Architecture",
  },
  {
    title: "Building a Real-Time ASL Detection App with Computer Vision and Machine Learning",
    title_ar: "بناء تطبيق فوري للتعرف على لغة الإشارة بالرؤية الحاسوبية وتعلّم الآلة",
    publication: "AI in Plain English",
    url: "https://medium.com/ai-in-plain-english/building-a-real-time-asl-detection-app-with-computer-vision-and-machine-learning-a5f93416b87f",
    readTime: "12 min read",
    readTime_ar: "١٢ دقيقة قراءة",
    topic: "Computer Vision & ML",
    topic_ar: "رؤية حاسوبية وتعلّم آلة",
    summary:
      "End-to-end implementation of an American Sign Language recognition pipeline combining OpenCV frame extraction with trained ML classification models on mobile.",
    summary_ar:
      "شرح تطبيقي شامل لخط أنابيب التعرف على لغة الإشارة الأمريكية يجمع بين استخراج إطارات الفيديو عبر OpenCV ونماذج التصنيف العصبية على الموبايل.",
    date: "Machine Learning",
  },
  {
    title: "Software Craftsmanship: A Guide to Design Patterns in Dart & Flutter",
    title_ar: "حِرفية البرمجيات: دليل أنماط التصميم المعمارية في Dart وفلاتر",
    publication: "Stackademic",
    url: "https://medium.com/stackademic/software-craftsmanship-a-guide-to-design-patterns-in-dart-flutter-6011cb0f1b12",
    readTime: "10 min read",
    readTime_ar: "١٠ دقائق قراءة",
    topic: "Software Craftsmanship",
    topic_ar: "حِرفية البرمجيات",
    summary:
      "Translating classic Gang of Four design patterns into idiomatic modern Dart. How factory, singleton, observer, and strategy patterns prevent mobile state spaghetti.",
    summary_ar:
      "تطبيق أنماط تصميم Gang of Four الكلاسيكية بلغة Dart الحديثة. كيف تمنع أنماط Factory و Singleton و Observer و Strategy تشابك وتعقيد إدارة الحالة في الموبايل.",
    date: "Design Patterns",
  },
];
