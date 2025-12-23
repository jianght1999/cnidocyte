
import React, { useState, useEffect, useRef } from 'react';
import { Sidebar } from './components/Sidebar.tsx';
import { AIChat } from './components/AIChat.tsx';
import { USER_INFO, BLOG_POSTS, SKILLS } from './constants.tsx';
import { BlogPost } from './types.ts';

const App: React.FC = () => {
  const [currentSection, setSection] = useState('home');
  const [posts, setPosts] = useState<BlogPost[]>(() => {
    const saved = localStorage.getItem('blog_posts');
    return saved ? JSON.parse(saved) : BLOG_POSTS;
  });
  const [isAdmin, setIsAdmin] = useState(() => localStorage.getItem('isAdmin') === 'true');
  const [showLogin, setShowLogin] = useState(false);
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [isEditing, setIsEditing] = useState<BlogPost | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  
  // Profile Image State - Updated default to a natural, aesthetic landscape (non-face)
  const [profileImage, setProfileImage] = useState<string>(() => {
    return localStorage.getItem('profile_image') || 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?q=80&w=1000&auto=format&fit=crop';
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    localStorage.setItem('blog_posts', JSON.stringify(posts));
  }, [posts]);

  useEffect(() => {
    localStorage.setItem('isAdmin', isAdmin.toString());
  }, [isAdmin]);

  useEffect(() => {
    localStorage.setItem('profile_image', profileImage);
  }, [profileImage]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginData.username === 'admin' && loginData.password === '123456') {
      setIsAdmin(true);
      setShowLogin(false);
      setLoginData({ username: '', password: '' });
    } else {
      alert('凭证错误');
    }
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm('确定要删除这篇博客吗？')) {
      setPosts(prev => prev.filter(p => p.id !== id));
    }
  };

  const handleSavePost = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const postData: Partial<BlogPost> = {
      title: formData.get('title') as string,
      excerpt: formData.get('excerpt') as string,
      category: formData.get('category') as any,
      date: new Date().toISOString().split('T')[0],
      readTime: formData.get('readTime') as string || '5 min',
    };

    if (isEditing) {
      setPosts(prev => prev.map(p => p.id === isEditing.id ? { ...p, ...postData } : p));
    } else {
      const newPost: BlogPost = {
        id: Math.random().toString(36).substr(2, 9),
        ...postData as BlogPost
      };
      setPosts(prev => [newPost, ...prev]);
    }
    setShowEditModal(false);
    setIsEditing(null);
  };

  const renderContent = () => {
    if (currentSection === 'home') {
      return (
        <div className="max-w-5xl mx-auto py-20 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-16 mb-24">
            <header className="flex-1 text-center lg:text-left">
              <div className="inline-block px-3 py-1 bg-indigo-50 border border-indigo-100 rounded-full text-indigo-600 text-xs font-bold tracking-widest uppercase mb-6">
                Welcome to my space
              </div>
              <h1 className="text-7xl font-black tracking-tighter mb-8 text-slate-900 leading-none">
                {USER_INFO.name}
              </h1>
              <p className="text-2xl text-slate-500 font-light leading-relaxed max-w-2xl italic border-l-4 border-indigo-200 pl-8 mb-8">
                "{USER_INFO.bio}"
              </p>
              <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                <button 
                  onClick={() => setSection('Tech')}
                  className="px-8 py-3 bg-indigo-600 text-white rounded-full font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all hover:-translate-y-1"
                >
                  浏览博客
                </button>
                <button className="px-8 py-3 bg-white border border-slate-200 text-slate-700 rounded-full font-bold hover:bg-slate-50 transition-all">
                  联系我
                </button>
              </div>
            </header>
            
            <div className="relative group">
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-2xl overflow-hidden shadow-2xl transition-transform duration-500 group-hover:scale-[1.02] bg-slate-100 ring-8 ring-slate-50">
                <img 
                  src={profileImage} 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
                {isAdmin && (
                  <div className="absolute inset-0 bg-indigo-600/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button 
                      onClick={() => fileInputRef.current?.click()}
                      className="bg-white text-indigo-600 px-4 py-2 rounded-full text-sm font-bold shadow-xl"
                    >
                      更换照片
                    </button>
                  </div>
                )}
              </div>
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handlePhotoUpload} 
                className="hidden" 
                accept="image/*"
              />
              {/* Decorative elements */}
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-indigo-50 rounded-full -z-10 animate-pulse"></div>
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-purple-50 rounded-full -z-10"></div>
            </div>
          </div>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-16 border-t border-slate-100">
            <div className="space-y-6">
              <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-400">About Me</h2>
              <p className="text-slate-600 leading-relaxed text-lg">
                我是一名全栈工程师，痴迷于创造极简且具有情感共鸣的交互。目前专注于 AI 与 Web 前端的深度融合，探索人类与智能代理之间的未来。
              </p>
            </div>
            <div className="space-y-6">
              <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-400">Toolbox</h2>
              <div className="flex flex-wrap gap-2">
                {SKILLS.map(skill => (
                  <span key={skill.name} className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:border-indigo-300 hover:text-indigo-600 transition-colors">
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          </section>
        </div>
      );
    }

    const filteredPosts = posts.filter(post => post.category === currentSection);
    return (
      <div className="max-w-4xl mx-auto py-20 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex items-center justify-between mb-16">
          <div className="flex items-center space-x-4">
            <button onClick={() => setSection('home')} className="text-slate-400 hover:text-indigo-600 flex items-center transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              主页
            </button>
            <span className="text-slate-200">/</span>
            <h2 className="text-2xl font-bold uppercase tracking-widest text-slate-900 border-b-4 border-indigo-600/20">{currentSection}</h2>
          </div>
          {isAdmin && (
            <button 
              onClick={() => { setIsEditing(null); setShowEditModal(true); }}
              className="text-xs bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-100"
            >
              + 新建博客
            </button>
          )}
        </div>

        <div className="grid gap-16">
          {filteredPosts.length > 0 ? (
            filteredPosts.map(post => (
              <article key={post.id} className="group pb-12 border-b border-slate-50 last:border-0 relative">
                <div className="flex flex-col">
                  <div className="flex items-center space-x-3 mb-4 text-xs font-mono text-slate-400">
                    <span className="px-2 py-0.5 bg-slate-50 rounded text-indigo-500">{post.category}</span>
                    <span>•</span>
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>{post.readTime} read</span>
                    {isAdmin && (
                      <div className="flex space-x-3 ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => { setIsEditing(post); setShowEditModal(true); }} className="text-slate-400 hover:text-indigo-600 transition-colors">编辑</button>
                        <button onClick={() => handleDelete(post.id)} className="text-slate-400 hover:text-red-500 transition-colors">删除</button>
                      </div>
                    )}
                  </div>
                  <h3 className="text-3xl font-bold mb-6 text-slate-900 group-hover:text-indigo-600 transition-colors leading-tight cursor-pointer">
                    {post.title}
                  </h3>
                  <p className="text-lg text-slate-500 leading-relaxed mb-8">
                    {post.excerpt}
                  </p>
                  <button className="w-fit text-sm font-bold text-indigo-600 border-b-2 border-indigo-100 hover:border-indigo-600 transition-all pb-1">
                    READ ARTICLE
                  </button>
                </div>
              </article>
            ))
          ) : (
            <div className="text-center py-20 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
              <p className="text-slate-400 italic">正在整理中，稍后再来瞧瞧...</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white flex text-slate-900 selection:bg-indigo-100 selection:text-indigo-700">
      <Sidebar 
        currentSection={currentSection} 
        setSection={setSection} 
        isAdmin={isAdmin}
        onLoginClick={() => setShowLogin(true)}
        onLogout={() => setIsAdmin(false)}
      />
      
      <main className="flex-1 ml-16 p-8 md:p-12 lg:p-24 overflow-x-hidden">
        {renderContent()}
      </main>

      {/* Login Modal */}
      {showLogin && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-slate-900/10 backdrop-blur-sm p-6">
          <div className="bg-white border border-slate-200 rounded-3xl shadow-2xl p-8 w-full max-w-md animate-in zoom-in-95 duration-200">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <span className="w-8 h-8 bg-indigo-600 rounded-lg mr-3 flex items-center justify-center text-white text-sm">A</span>
              管理员登录
            </h2>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">用户名</label>
                <input 
                  type="text" 
                  value={loginData.username}
                  onChange={e => setLoginData({...loginData, username: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500 transition-colors"
                  placeholder="admin"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">密码</label>
                <input 
                  type="password" 
                  value={loginData.password}
                  onChange={e => setLoginData({...loginData, password: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500 transition-colors"
                  placeholder="123456"
                />
              </div>
              <div className="flex space-x-3 pt-4">
                <button type="submit" className="flex-1 bg-indigo-600 text-white font-bold py-3 rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100">进入系统</button>
                <button type="button" onClick={() => setShowLogin(false)} className="px-6 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors">取消</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Post Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-slate-900/10 backdrop-blur-sm p-6 overflow-y-auto">
          <div className="bg-white border border-slate-200 rounded-3xl shadow-2xl p-8 w-full max-w-2xl my-auto animate-in fade-in slide-in-from-bottom-4 duration-300">
            <h2 className="text-2xl font-bold mb-8">{isEditing ? '编辑博客' : '发布新文章'}</h2>
            <form onSubmit={handleSavePost} className="space-y-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">标题</label>
                <input 
                  name="title"
                  defaultValue={isEditing?.title || ''}
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500 transition-colors text-lg font-bold"
                  placeholder="输入文章标题"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">分类</label>
                  <select 
                    name="category"
                    defaultValue={isEditing?.category || 'Tech'}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500 transition-colors"
                  >
                    <option value="Tech">技术</option>
                    <option value="Design">设计</option>
                    <option value="Life">生活</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">预计阅读时长</label>
                  <input 
                    name="readTime"
                    defaultValue={isEditing?.readTime || '5 min'}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500 transition-colors"
                    placeholder="e.g. 5 min"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">文章摘要</label>
                <textarea 
                  name="excerpt"
                  defaultValue={isEditing?.excerpt || ''}
                  required
                  rows={4}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500 transition-colors resize-none"
                  placeholder="简短描述..."
                />
              </div>
              <div className="flex space-x-3 pt-6 border-t border-slate-100">
                <button type="submit" className="flex-1 bg-indigo-600 text-white font-bold py-3 rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100">
                  {isEditing ? '更新文章' : '立即发布'}
                </button>
                <button type="button" onClick={() => { setShowEditModal(false); setIsEditing(null); }} className="px-8 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors">
                  取消
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <AIChat />
    </div>
  );
};

export default App;
