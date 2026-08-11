export interface StatItem {
  value: string;
  labelKey: string;
}

export interface InfoItem {
  icon: 'location' | 'status' | 'availability' | 'focus';
  labelKey: string;
  valueKey: string;
}

export interface ContactCard {
  icon: "email" | "phone" | "linkedin" | "telegram";
  labelKey: string;
  value: string;
  href: string;
  external: boolean;
}

export interface SocialLink {
  labelKey: string;
  href: string;
  icon: 'linkedin' | 'github' | 'telegram' | 'globe' | 'email' | 'phone';
  external: boolean;
}

export interface NavLink {
  labelKey: string;
  href: string;
}

export interface ExperienceItem {
  key: string;
  periodStart: string;
  periodEnd: string | null;
  current: boolean;
  achievementCount: number;
}

export interface Project {
  key: string;
  title: string;
  categoryKey: string;
  icon: string;
  statusKey: string;
  link?: string;
  highlightCount: number;
  technologies: string[];
}

export interface EducationItem {
  key: string;
  institution: string;
  periodDate: string;
  highlightCount: number;
  tags: string[];
}

export interface Skill {
  name: string;
  icon: string;
  isEmoji?: boolean;
}

export interface SkillCategory {
  categoryKey: string;
  icon: 'core' | 'frameworks' | 'styling' | 'state' | 'tools' | 'soft';
  skills: Skill[];
}
