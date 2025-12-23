
export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  imageUrl: string;
  link: string;
}

export interface Skill {
  name: string;
  level: number; // 0-100
  category: 'Frontend' | 'Backend' | 'Design' | 'AI/ML';
}

export interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}
