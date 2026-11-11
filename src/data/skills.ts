export interface SkillGroup {
  id: string;
  title: string;
  skills: string[];
}

export const SKILL_GROUPS: SkillGroup[] = [
  {
    id: 'mobile-dev',
    title: 'Mobile development',
    skills: ['Flutter', 'Dart', 'Firebase', 'REST APIs', 'Google Maps'],
  },
  {
    id: 'software-eng',
    title: 'Software engineering',
    skills: ['Clean Architecture', 'Riverpod', 'Provider', 'Offline-first development', 'Testing'],
  },
  {
    id: 'machine-learning',
    title: 'Machine learning',
    skills: ['Python', 'ONNX Runtime', 'OpenCV', 'Computer vision', 'On-device inference'],
  },
  {
    id: 'tools-systems',
    title: 'Tools and systems',
    skills: ['Git', 'GitHub Actions', 'SQLite', 'PostgreSQL'],
  },
];
