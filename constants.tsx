
import { Project, Skill, BlogPost } from './types.ts';

export const USER_INFO = {
  name: "FUZZYEEE",
  title: "Fullstack Engineer & Designer",
  bio: "这个网站目前还非常简陋，也没做什么设计，不过我会慢慢往里面填东西。",
  email: "alex.chen.dev@example.com",
  github: "https://github.com/alexchen",
  linkedin: "https://linkedin.com/in/alexchen",
  twitter: "https://twitter.com/alexchen",
  instagram: "https://instagram.com/alexchen",
  location: "Shanghai, China",
  avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop"
};

export const CAROUSEL_IMAGES = [
  "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?q=80&w=2000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1518005020951-eccb494ad742?q=80&w=2000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1451187530230-b23b995163c9?q=80&w=2000&auto=format&fit=crop"
];

// Removed default blog posts as requested. Admin can still add them via the dashboard.
export const BLOG_POSTS: BlogPost[] = [];

export const SKILLS: Skill[] = [
  { name: 'React', level: 95, category: 'Frontend' },
  { name: 'TypeScript', level: 90, category: 'Frontend' },
  { name: 'Node.js', level: 85, category: 'Backend' },
  { name: 'Gemini AI', level: 80, category: 'AI/ML' },
  { name: 'UI/UX', level: 85, category: 'Design' }
];

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Minimalist Portfolio',
    description: 'A personal portfolio built with React, Tailwind and Gemini API.',
    tags: ['React', 'AI'],
    imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97',
    link: '#'
  }
];
