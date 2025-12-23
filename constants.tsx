
import { Project, Skill } from './types.ts';

export const USER_INFO = {
  name: "Alex Chen",
  title: "Senior Frontend Engineer & AI Enthusiast",
  bio: "I build exceptional digital experiences that live on the internet. My focus is on creating high-performance, accessible, and AI-enhanced web applications.",
  email: "alex.chen.dev@example.com",
  github: "https://github.com",
  linkedin: "https://linkedin.com",
  location: "San Francisco, CA"
};

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Nexus AI Dashboard',
    description: 'A real-time data visualization platform integrated with custom LLM agents for predictive analytics.',
    tags: ['React', 'D3.js', 'TypeScript', 'Gemini API'],
    imageUrl: 'https://picsum.photos/seed/nexus/800/450',
    link: '#'
  },
  {
    id: '2',
    title: 'Quantum CMS',
    description: 'A headless CMS optimized for static site generation with built-in asset optimization and multi-tenant support.',
    tags: ['Next.js', 'PostgreSQL', 'Tailwind'],
    imageUrl: 'https://picsum.photos/seed/cms/800/450',
    link: '#'
  },
  {
    id: '3',
    title: 'Lumina Design System',
    description: 'A comprehensive, accessible design system utilized by 50+ enterprise engineering teams.',
    tags: ['Storybook', 'Figma', 'React'],
    imageUrl: 'https://picsum.photos/seed/lumina/800/450',
    link: '#'
  }
];

export const SKILLS: Skill[] = [
  { name: 'React / Next.js', level: 95, category: 'Frontend' },
  { name: 'TypeScript', level: 90, category: 'Frontend' },
  { name: 'Tailwind CSS', level: 95, category: 'Frontend' },
  { name: 'Node.js', level: 85, category: 'Backend' },
  { name: 'Gemini API Integration', level: 80, category: 'AI/ML' },
  { name: 'Python', level: 75, category: 'Backend' },
  { name: 'Figma', level: 85, category: 'Design' }
];
