import type {
  StatItem,
  InfoItem,
  ContactCard,
  SocialLink,
  NavLink,
  ExperienceItem,
  Project,
  EducationItem,
  SkillCategory
} from '~/types';
import smartlifeImg from '~/assets/images/smartlife.png';
import notimageImg from '~/assets/images/notimage.jpg';
import dnkImg from '~/assets/images/dnk.png';
import tolaBotImg from '~/assets/images/tolaBot.png';
import autoQuizImg from '~/assets/images/autoQuiz.png';
import vocabAppImg from '~/assets/images/vocabApp.png';

export const stats: StatItem[] = [
  { value: '4+', labelKey: 'about.stats.projects' },
  { value: '1+', labelKey: 'about.stats.experience' },
  { value: '100%', labelKey: 'about.stats.remote' },
];

export const quickInfo: InfoItem[] = [
  { icon: 'location', labelKey: 'about.info.location', valueKey: 'hero.location' },
  { icon: 'status', labelKey: 'about.info.status', valueKey: 'about.info.open_to_work' },
  { icon: 'availability', labelKey: 'about.info.availability', valueKey: 'about.info.remote_onsite' },
  { icon: 'focus', labelKey: 'about.info.focus', valueKey: 'about.info.focus_value' },
];

export const contacts: ContactCard[] = [
  { icon: 'email', labelKey: 'contact.cards.email', value: 'asadbekumarov922@gmail.com', href: 'mailto:asadbekumarov922@gmail.com', external: true },
  { icon: 'phone', labelKey: 'contact.cards.phone', value: '+998 77 268 7865', href: 'tel:+998772687865', external: false },
  { icon: 'linkedin', labelKey: 'contact.cards.linkedin', value: 'asadbek-umarov-ab9385376', href: 'https://www.linkedin.com/in/asadbek-umarov-ab9385376', external: true },
  { icon: 'telegram', labelKey: 'contact.cards.telegram', value: '@Asad_umarov', href: 'https://t.me/Asad_umarov', external: true }
];

export const navLinks: NavLink[] = [
  { labelKey: 'nav.about', href: '#about' },
  { labelKey: 'nav.skills', href: '#skills' },
  { labelKey: 'nav.experience', href: '#experience' },
  { labelKey: 'nav.projects', href: '#projects' },
  { labelKey: 'nav.education', href: '#education' },
  { labelKey: 'nav.contact', href: '#contact' },
];

export const socialLinks: SocialLink[] = [
  { labelKey: 'footer.social.linkedin', href: 'https://www.linkedin.com/in/asadbek-umarov-ab9385376', icon: 'linkedin', external: true },
  { labelKey: 'footer.social.github', href: 'https://github.com/asadbekumarov', icon: 'github', external: true },
  { labelKey: 'footer.social.telegram', href: 'https://t.me/asadbek_umarov', icon: 'telegram', external: true },
  { labelKey: 'footer.social.portfolio', href: 'https://portfolio-umarov-asadbek.vercel.app/', icon: 'globe', external: true },
];

export const experiences: ExperienceItem[] = [
  { key: 'soft_turtkul', periodStart: 'Aug 2025', periodEnd: 'Nov 2025', current: false, achievementCount: 3 },
  { key: 'najot_talim_teacher', periodStart: 'Feb 2024', periodEnd: 'Jun 2024', current: false, achievementCount: 4 },
];

export const projects: Project[] = [
  {
    key: 'smart_life',
    title: 'Smart Life',
    categoryKey: 'web_app',
    icon: '📱',
    link: 'https://www.smartlife.uz/uz',
    github: 'https://github.com/asadbekumarov',
    image: smartlifeImg,
    statusKey: 'projects.status.completed',
    highlightCount: 3,
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'RTK Query'],
  },
  {
    key: 'darrow',
    title: 'Darrow',
    categoryKey: 'telegram_app',
    icon: '✈️',
    link: 'https://t.me/darrov_bot',
    github: 'https://github.com/asadbekumarov',
    image: notimageImg,
    statusKey: 'projects.status.completed',
    highlightCount: 3,
    technologies: ['React.js', 'TypeScript', 'Tailwind CSS', 'Telegram API'],
  },
  {
    key: 'dna_technology',
    title: 'DNA-Technology',
    categoryKey: 'web_app',
    icon: '🧬',
    link: 'https://dnk-expert.vercel.app/uz',
    github: 'https://github.com/asadbekumarov',
    image: dnkImg,
    statusKey: 'projects.status.completed',
    highlightCount: 3,
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'REST API'],
  },
  {
    key: 'tola_bot',
    title: "To'la Bot",
    categoryKey: 'telegram_app',
    icon: '🔔',
    link: 'https://tola-bot.vercel.app/',
    github: 'https://github.com/asadbekumarov',
    image: tolaBotImg,
    statusKey: 'projects.status.development',
    highlightCount: 3,
    technologies: ['Next.js', 'TypeScript', 'Supabase', 'Telegram API'],
  },
  {
    key: 'auto_quiz',
    title: 'AutoQuiz',
    categoryKey: 'web_app',
    icon: '📝',
    github: 'https://github.com/asadbekumarov',
    image: autoQuizImg,
    statusKey: 'projects.status.development',
    highlightCount: 3,
    technologies: ['React 19', 'Vite', 'Tailwind CSS', 'jsPDF'],
  },
  {
    key: 'vocab_app',
    title: 'VocabApp',
    categoryKey: 'mobile_app',
    icon: '📚',
    github: 'https://github.com/asadbekumarov',
    image: vocabAppImg,
    statusKey: 'projects.status.development',
    highlightCount: 3,
    technologies: ['React Native', 'Expo', 'TypeScript', 'AsyncStorage'],
  }
];

export const education: EducationItem[] = [
  {
    key: 'najot_talim',
    institution: 'Najot Ta\'lim',
    periodDate: 'Mar 2024',
    highlightCount: 6,
    tags: ['JavaScript', 'TypeScript', 'React.js', 'Tailwind CSS', 'Git', 'HTML5', 'CSS3'],
  }
];

export const skillCategories: SkillCategory[] = [
  {
    categoryKey: 'skills.categories.core',
    icon: 'core',
    skills: [
      { name: 'JavaScript (ES6+)', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
      { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
      { name: 'HTML5', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
      { name: 'CSS3', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
    ],
  },
  {
    categoryKey: 'skills.categories.frameworks',
    icon: 'frameworks',
    skills: [
      { name: 'React.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
      { name: 'Next.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg' },
      { name: 'React Native', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
    ],
  },
  {
    categoryKey: 'skills.categories.styling',
    icon: 'styling',
    skills: [
      { name: 'Tailwind CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
      { name: 'CSS Modules', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
      { name: 'Responsive Design', icon: '📐', isEmoji: true },
      { name: 'Mobile-First', icon: '📲', isEmoji: true },
    ],
  },
  {
    categoryKey: 'skills.categories.state',
    icon: 'state',
    skills: [
      { name: 'RTK Query', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg' },
      { name: 'Redux Toolkit', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg' },
      { name: 'REST APIs', icon: '🌐', isEmoji: true },
      { name: 'Async/Await', icon: '⏳', isEmoji: true },
    ],
  },
  {
    categoryKey: 'skills.categories.tools',
    icon: 'tools',
    skills: [
      { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
      { name: 'GitHub', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg' },
      { name: 'VS Code', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg' },
      { name: 'Figma', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg' },
      { name: 'npm / yarn', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/npm/npm-original-wordmark.svg' },
    ],
  },
];

