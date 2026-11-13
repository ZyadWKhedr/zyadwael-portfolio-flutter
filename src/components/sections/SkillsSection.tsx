import React from 'react';
import { Smartphone, Layers, Cpu, Terminal } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { SKILL_GROUPS } from '@/data/skills';

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  'mobile-dev': Smartphone,
  'software-eng': Layers,
  'machine-learning': Cpu,
  'tools-systems': Terminal,
};

export const SkillsSection: React.FC = () => {
  const { t, i18n } = useTranslation();
  const shouldReduceMotion = useReducedMotion();
  const isArabic = i18n.language === 'ar';

  const getGroupTitle = (id: string, defaultTitle: string) => {
    switch (id) {
      case 'mobile-dev':
        return t('skills.groups.mobileDev', defaultTitle);
      case 'software-eng':
        return t('skills.groups.softwareEng', defaultTitle);
      case 'machine-learning':
        return t('skills.groups.machineLearning', defaultTitle);
      case 'tools-systems':
        return t('skills.groups.toolsSystems', defaultTitle);
      default:
        return defaultTitle;
    }
  };

  const getSkillLabel = (skill: string) => {
    if (isArabic) {
      switch (skill) {
        case 'Offline-first development':
          return 'تطوير يعمل بدون إنترنت';
        case 'Testing':
          return 'اختبارات البرمجيات (Unit & Integration)';
        case 'Computer vision':
          return 'الرؤية الحاسوبية';
        case 'On-device inference':
          return 'استدلال على الأجهزة (Edge ML)';
        default:
          return skill;
      }
    }
    return skill;
  };

  return (
    <section id="skills" className="scroll-mt-20 py-14 md:py-18 border-b border-border-subtle">
      <div className="container max-w-site mx-auto px-5 sm:px-7 lg:px-10">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          {/* Section Header */}
          <div className="max-w-reading mb-10 md:mb-12 text-start">
            <div className="type-overline text-accent font-mono mb-2.5">
              {t('skills.eyebrow', 'TECHNICAL TOOLBOX')}
            </div>
            <h2 className="type-h2 font-display text-ink mb-3 tracking-tight">
              {t('skills.title', 'What I work with')}
            </h2>
            <p className="type-body text-ink-secondary leading-relaxed">
              {t('skills.subtitle', 'Technologies, libraries, and engineering methods I work with regularly across mobile development, software architecture, and machine learning experiments.')}
            </p>
          </div>

          {/* 4 Skill Groups Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 text-start">
            {SKILL_GROUPS.map((group, idx) => {
              const Icon = ICON_MAP[group.id] || Layers;
              const title = getGroupTitle(group.id, group.title);

              return (
                <motion.div
                  key={group.id}
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
                  whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.4, delay: idx * 0.05, ease: 'easeOut' }}
                  className="spec-card p-5 sm:p-6 rounded-lg bg-surface border border-border flex flex-col justify-between hover:border-border-strong transition-colors"
                >
                  <div>
                    <div className="w-9 h-9 rounded-md bg-elevated text-accent flex items-center justify-center mb-3.5 border border-border-subtle">
                      <Icon className="w-4 h-4" />
                    </div>

                    <h3 className="font-display font-semibold text-sm sm:text-base text-ink mb-3.5">
                      {title}
                    </h3>

                    <ul className="space-y-2">
                      {group.skills.map((skill) => (
                        <li key={skill} className="flex items-center gap-2 text-xs text-ink-secondary font-mono">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent/80 shrink-0" />
                          <span>{getSkillLabel(skill)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 mt-5 border-t border-border-subtle text-[11px] font-mono text-ink-muted">
                    {t('skills.demonstrated', 'Demonstrated in project work')}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;
