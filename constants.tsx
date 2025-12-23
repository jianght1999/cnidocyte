
import { Project, Skill, BlogPost } from './types.ts';

export const USER_INFO = {
  name: "Alex Chen",
  title: "Fullstack Engineer & Minimalist",
  bio: "专注于构建纯粹、高效且具有美感的数字产品。在这里分享关于技术、设计与生活的思考。",
  email: "alex.chen.dev@example.com",
  github: "https://github.com/alexchen",
  linkedin: "https://linkedin.com/in/alexchen",
  location: "Shanghai, China"
};

export const BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    title: '为什么极简主义是开发的终极形式',
    excerpt: '在代码日益复杂的今天，我们如何通过削减冗余来提高系统的健壮性？',
    date: '2024-03-20',
    category: 'Design',
    readTime: '5 min'
  },
  {
    id: '2',
    title: '深入浅出 Gemini API：构建你的第一个 AI 助手',
    excerpt: '手把手教你如何利用 Google 的最新模型为你的网页添加智能交互。',
    date: '2024-03-15',
    category: 'Tech',
    readTime: '8 min'
  },
  {
    id: '3',
    title: '数字游民的真实生活状态',
    excerpt: '离开办公室的这一年，我学到的关于自由与自律的十件事。',
    date: '2024-03-10',
    category: 'Life',
    readTime: '12 min'
  },
  {
    id: '4',
    title: 'React 19 新特性前瞻',
    excerpt: '编译器革命即将来临，我们的开发习惯将发生怎样的变化？',
    date: '2024-03-05',
    category: 'Tech',
    readTime: '6 min'
  }
];

export const SKILLS: Skill[] = [
  { name: 'React / Next.js', level: 95, category: 'Frontend' },
  { name: 'TypeScript', level: 90, category: 'Frontend' },
  { name: 'Node.js', level: 85, category: 'Backend' },
  { name: 'Gemini AI', level: 80, category: 'AI/ML' }
];

// Added PROJECTS export to resolve the compilation error in geminiService.ts
export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Minimalist Portfolio',
    description: 'A personal portfolio built with React, Tailwind and Gemini API focusing on high performance.',
    tags: ['React', 'Tailwind', 'AI'],
    imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97',
    link: '#'
  },
  {
    id: '2',
    title: 'AI Task Manager',
    description: 'Smart task management system that prioritizes work using Google GenAI models.',
    tags: ['Next.js', 'PostgreSQL', 'Gemini'],
    imageUrl: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b',
    link: '#'
  }
];
