export interface SkillEvidence {
  project: string;
  detail: string;
  link?: string;
}

export interface CapabilityGroup {
  id: string;
  title: string;
  description: string;
  skills: string[];
  evidence: SkillEvidence[];
}

export interface ExperienceMilestone {
  period: string;
  role: string;
  organization: string;
  description: string;
  tags: string[];
}
