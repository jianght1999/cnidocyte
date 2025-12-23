
import React from 'react';

interface SidebarProps {
  currentSection: string;
  setSection: (section: string) => void;
  isAdmin: boolean;
  onLoginClick: () => void;
  onLogout: () => void;
}

const SidebarIcon = ({ icon }: { icon: React.ReactNode }) => (
  <div className="w-6 h-6 flex items-center justify-center">
    {icon}
  </div>
);

export const Sidebar: React.FC<SidebarProps> = ({ 
  currentSection, 
  setSection, 
  isAdmin, 
  onLoginClick,
  onLogout 
}) => {
  const navItems = [
    { id: 'home', label: '主页', icon: <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /> },
    { id: 'Tech', label: '技术', icon: <path d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /> },
    { id: 'Design', label: '设计', icon: <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h14a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /> },
    { id: 'Life', label: '生活', icon: <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /> },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen z-50 group">
      <div className="h-full w-16 group-hover:w-60 bg-white border-r border-slate-100 transition-all duration-300 ease-in-out flex flex-col items-center py-8">
        <div className="mb-12">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-indigo-100">A</div>
        </div>

        <nav className="flex-1 w-full px-3 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setSection(item.id)}
              className={`w-full flex items-center rounded-xl px-3 py-3 transition-all ${
                currentSection === item.id 
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100 scale-[1.02]' 
                  : 'text-slate-400 hover:bg-slate-50 hover:text-indigo-600'
              }`}
            >
              <SidebarIcon icon={
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                  {item.icon}
                </svg>
              } />
              <span className="ml-4 font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap overflow-hidden">
                {item.label}
              </span>
            </button>
          ))}
        </nav>

        <div className="w-full px-3 mt-auto space-y-2">
          <button 
            onClick={isAdmin ? onLogout : onLoginClick}
            className={`w-full flex items-center px-3 py-3 transition-all rounded-xl ${
              isAdmin ? 'text-indigo-600 bg-indigo-50' : 'text-slate-400 hover:text-indigo-600 hover:bg-slate-50'
            }`}
          >
            <SidebarIcon icon={
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                {isAdmin ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                )}
              </svg>
            } />
            <span className="ml-4 font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              {isAdmin ? '退出系统' : '管理员'}
            </span>
          </button>
        </div>
      </div>
    </aside>
  );
};
