
import { BlogPost } from '../types.ts';

// 在 Vercel 部署后，/api 路由是自动生效的
const API_BASE_URL = '/api';

class DataService {
  private async safeFetch(url: string, options?: RequestInit) {
    try {
      const res = await fetch(`${API_BASE_URL}${url}`, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        }
      });
      if (!res.ok) {
        const error = await res.text();
        console.error('API Error:', error);
        return null;
      }
      return await res.json();
    } catch (e) {
      console.error('Fetch Error:', e);
      return null;
    }
  }

  async getPosts(): Promise<BlogPost[]> {
    const data = await this.safeFetch('/posts');
    return data || [];
  }

  async savePost(post: BlogPost): Promise<void> {
    await this.safeFetch('/posts', {
      method: 'POST',
      body: JSON.stringify(post)
    });
  }

  async deletePost(id: string): Promise<void> {
    await this.safeFetch(`/posts?id=${id}`, { method: 'DELETE' });
  }

  async getConfig() {
    const data = await this.safeFetch('/config');
    return data || { avatarUrl: '', galleryImages: [] };
  }

  async updateConfig(data: any): Promise<void> {
    await this.safeFetch('/config', {
      method: 'PATCH',
      body: JSON.stringify(data)
    });
  }

  getGalleryImages(fallback: string[]): string[] {
    // 初始加载由 App.tsx 的 getConfig 完成，这里提供一个简易缓存逻辑
    const cached = localStorage.getItem('v3_gallery');
    return cached ? JSON.parse(cached) : fallback;
  }

  async saveGalleryImages(images: string[]): Promise<void> {
    localStorage.setItem('v3_gallery', JSON.stringify(images));
    await this.updateConfig({ galleryImages: images });
  }

  async uploadImage(base64: string): Promise<string> {
    // 简单起见，图片仍返回 base64 或通过 API 处理
    // 实际生产环境建议对接 Cloudinary 或 OSS
    return base64;
  }
}

export const dataService = new DataService();
