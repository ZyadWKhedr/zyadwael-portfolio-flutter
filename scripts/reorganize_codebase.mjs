import fs from 'fs';
import path from 'path';

const rootDir = process.cwd();
const srcDir = path.join(rootDir, 'src');

// Create new directories
const newDirs = [
  'src/components/layout',
  'src/components/sections',
  'src/components/projects',
  'src/components/chatbot',
  'src/components/legacy',
];

for (const d of newDirs) {
  const full = path.join(rootDir, d);
  if (!fs.existsSync(full)) {
    fs.mkdirSync(full, { recursive: true });
  }
}

// 1. Move Layout components
fs.copyFileSync(
  path.join(srcDir, 'components', 'Navigation.tsx'),
  path.join(srcDir, 'components', 'layout', 'Navigation.tsx')
);
fs.copyFileSync(
  path.join(srcDir, 'components', 'Footer.tsx'),
  path.join(srcDir, 'components', 'layout', 'Footer.tsx')
);

// 2. Move Projects component
fs.copyFileSync(
  path.join(srcDir, 'components', 'ProjectInteractiveDemo.tsx'),
  path.join(srcDir, 'components', 'projects', 'ProjectInteractiveDemo.tsx')
);

// 3. Move Chatbot component
fs.copyFileSync(
  path.join(srcDir, 'components', 'AiAssistant.tsx'),
  path.join(srcDir, 'components', 'chatbot', 'AiAssistant.tsx')
);

// 4. Move Sections components
const sectionFiles = [
  'HeroSection.tsx',
  'SelectedWork.tsx',
  'SkillsSection.tsx',
  'WritingSection.tsx',
  'TestimonialsSection.tsx',
  'AboutSection.tsx',
  'ContactSection.tsx',
];

for (const sf of sectionFiles) {
  fs.copyFileSync(
    path.join(srcDir, 'components', sf),
    path.join(srcDir, 'components', 'sections', sf)
  );
}

// 5. Update SelectedWork.tsx to reference @/components/projects/ProjectInteractiveDemo
const selectedWorkPath = path.join(srcDir, 'components', 'sections', 'SelectedWork.tsx');
let selectedWorkContent = fs.readFileSync(selectedWorkPath, 'utf-8');
selectedWorkContent = selectedWorkContent.replace(
  "import ProjectInteractiveDemo from './ProjectInteractiveDemo';",
  "import ProjectInteractiveDemo from '@/components/projects/ProjectInteractiveDemo';"
);
fs.writeFileSync(selectedWorkPath, selectedWorkContent, 'utf-8');

// 6. Update ContactSection.tsx to use contactService
const contactSectionPath = path.join(srcDir, 'components', 'sections', 'ContactSection.tsx');
let contactContent = fs.readFileSync(contactSectionPath, 'utf-8');
// Replace supabase invoke with contactService
if (contactContent.includes("await import('@/integrations/supabase/client')")) {
  contactContent = contactContent.replace(
    "import { toast } from 'sonner';",
    "import { toast } from 'sonner';\nimport { sendContactMessage } from '@/services/contactService';"
  );
  // Replace the inner supabase function call with sendContactMessage
  contactContent = contactContent.replace(
    /const \{ supabase \} = await import\('@\/integrations\/supabase\/client'\);[\s\S]*?if \(error\) throw error;/,
    `const result = await sendContactMessage({ name, email, subject, message });
      if (!result.success) {
        throw new Error(result.error || 'Failed to dispatch email');
      }`
  );
  fs.writeFileSync(contactSectionPath, contactContent, 'utf-8');
}

// 7. Update AiAssistant.tsx to use assistantService
const aiAssistantPath = path.join(srcDir, 'components', 'chatbot', 'AiAssistant.tsx');
let aiContent = fs.readFileSync(aiAssistantPath, 'utf-8');
if (aiContent.includes("await import('@/integrations/supabase/client')")) {
  aiContent = aiContent.replace(
    "import { toast } from 'sonner';",
    "import { toast } from 'sonner';\nimport { queryAssistant } from '@/services/assistantService';"
  );
  aiContent = aiContent.replace(
    /const \{ supabase \} = await import\('@\/integrations\/supabase\/client'\);[\s\S]*?const assistantReply = data\?\.reply[\s\S]*?;\s*if \(!assistantReply\) throw new Error\('Empty response'\);/,
    `const assistantHistory = messages.map(m => ({ role: m.role, content: m.content }));
      const { reply: assistantReply } = await queryAssistant(userText, assistantHistory);`
  );
  fs.writeFileSync(aiAssistantPath, aiContent, 'utf-8');
}

// 8. Archive legacy components into src/components/legacy/
const legacyFiles = [
  'ArticlesSection.tsx',
  'ProjectsSection.tsx',
  'FeaturedProjectSection.tsx',
  'PackagesSection.tsx',
  'InteractivePhone.tsx',
  'Phone3D.tsx',
  'TicTacToeGame.tsx',
  'SocialLinks.tsx',
  'AnimatedSection.tsx',
];

for (const lf of legacyFiles) {
  const p = path.join(srcDir, 'components', lf);
  if (fs.existsSync(p)) {
    fs.copyFileSync(p, path.join(srcDir, 'components', 'legacy', lf));
    fs.unlinkSync(p);
  }
}

// 9. Remove old flat component copies now that they are organized
const activeFlatFiles = [
  'Navigation.tsx',
  'Footer.tsx',
  'ProjectInteractiveDemo.tsx',
  'AiAssistant.tsx',
  ...sectionFiles,
];

for (const af of activeFlatFiles) {
  const p = path.join(srcDir, 'components', af);
  if (fs.existsSync(p)) {
    fs.unlinkSync(p);
  }
}

// 10. Write legacy README.md
fs.writeFileSync(
  path.join(srcDir, 'components', 'legacy', 'README.md'),
  `# Legacy Template Components Archive

These components were preserved from earlier iterations of the portfolio template prior to the editorial redesign. They are retained for reference and code reuse (e.g. 3D phone canvas, tic-tac-toe logic, legacy article cards) but are NOT imported or rendered in the active production site.

Active components are organized cleanly under:
- \`src/components/layout/\` (Navigation, Footer)
- \`src/components/sections/\` (Hero, SelectedWork, Skills, Writing, Testimonials, About, Contact)
- \`src/components/projects/\` (ProjectInteractiveDemo)
- \`src/components/chatbot/\` (AiAssistant)
- \`src/components/ui/\` (Radix & shadcn primitives)
`
);

console.log('Source code reorganization script completed successfully.');
