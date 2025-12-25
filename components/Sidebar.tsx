
import React, { useRef } from 'react';

interface SidebarProps {
  currentSection: string;
  setSection: (section: string) => void;
  isAdmin: boolean;
  avatarUrl: string;
  onAvatarUpdate: (url: string) => void;
  onLoginClick: () => void;
  onLogout: () => void;
}

const SidebarIcon = ({ icon }: { icon: React.ReactNode }) => (
  <div className="w-5 h-5 flex items-center justify-center flex-shrink-0">
    {icon}
  </div>
);

export const Sidebar: React.FC<SidebarProps> = ({ 
  currentSection, 
  setSection, 
  isAdmin, 
  avatarUrl,
  onAvatarUpdate,
  onLoginClick,
  onLogout 
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarClick = () => {
    if (isAdmin) {
      fileInputRef.current?.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onAvatarUpdate(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const navItems = [
    { id: 'home', label: 'HOME', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /> },
    { id: 'Tech', label: 'TECH', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /> },
    { id: 'Standards', label: 'STANDARDS', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" /> },
    { id: 'Craft', label: 'CRAFT', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" /> },
    { id: 'Notes', label: 'NOTES', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /> },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen z-50 group">
      <div className="h-full w-20 group-hover:w-60 bg-white border-r border-slate-100 transition-all duration-500 flex flex-col items-start py-10">
        <div className="mb-16 pl-6 relative">
          <input 
            type="file" 
            ref={fileInputRef} 
            className="hidden" 
            accept="image/*" 
            onChange={handleFileChange}
          />
          <div 
            onClick={handleAvatarClick}
            className={`w-10 h-10 bg-slate-100 overflow-hidden ring-1 ring-slate-200 transition-all group-hover:w-12 group-hover:h-12 relative overflow-hidden ${isAdmin ? 'cursor-pointer hover:ring-black' : ''}`}
          >
            <img 
              src={avatarUrl} 
              alt="Avatar" 
              className="w-full h-full object-cover grayscale brightness-110"
            />
            {isAdmin && (
              <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
            )}
          </div>
        </div>

        <nav className="flex-1 w-full space-y-4 pr-4">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setSection(item.id)}
              className={`w-full flex items-center pl-7 pr-12 py-4 transition-all duration-300 ${
                currentSection === item.id 
                  ? 'bg-black text-white translate-x-0' 
                  : 'text-slate-300 hover:text-black hover:bg-slate-50'
              }`}
            >
              <SidebarIcon icon={
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                  {item.icon}
                </svg>
              } />
              <span className="ml-6 font-black text-[10px] tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-all duration-500 whitespace-nowrap overflow-hidden">
                {item.label}
              </span>
            </button>
          ))}
        </nav>

        <div className="w-full mt-auto pr-4">
          <button 
            onClick={isAdmin ? onLogout : onLoginClick}
            className={`w-full flex items-center pl-7 pr-12 py-5 transition-all duration-300 ${
              isAdmin ? 'text-black' : 'text-slate-200 hover:text-black hover:bg-slate-50'
            }`}
          >
            <SidebarIcon icon={
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            } />
            <span className="ml-6 font-black text-[10px] tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-all duration-500">
              {isAdmin ? 'OUT' : 'ADMIN'}
            </span>
          </button>
        </div>
      </div>
    </aside>
  );
};
