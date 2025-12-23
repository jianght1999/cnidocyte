
import React from 'react';
import { Layout } from './components/Layout.tsx';
import { AIChat } from './components/AIChat.tsx';
import { USER_INFO, PROJECTS, SKILLS } from './constants.tsx';

const App: React.FC = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative pt-40 pb-20 md:pt-60 md:pb-40 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full -z-10 opacity-30">
          <div className="absolute top-20 left-10 w-96 h-96 bg-blue-600/30 rounded-full blur-[100px] animate-float"></div>
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-purple-600/30 rounded-full blur-[100px] animate-float" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-white/5 border border-white/10 text-xs font-medium tracking-widest uppercase text-blue-400">
            Available for new opportunities
          </div>
          <h1 className="text-5xl md:text-8xl font-bold tracking-tighter mb-8 leading-tight">
            Engineering the <span className="text-gradient">Future</span> <br className="hidden md:block" /> of the Web
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-400 mb-10 leading-relaxed">
            {USER_INFO.bio}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <a href="#projects" className="w-full sm:w-auto px-8 py-4 bg-white text-slate-950 rounded-full font-bold hover:bg-slate-200 transition-colors">
              View My Work
            </a>
            <a href="#contact" className="w-full sm:w-auto px-8 py-4 bg-white/5 border border-white/10 rounded-full font-bold hover:bg-white/10 transition-colors">
              Get In Touch
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <div className="mb-10 p-2 glass-panel rounded-3xl overflow-hidden aspect-square md:aspect-video lg:aspect-square relative group">
              <img 
                src="https://picsum.photos/seed/engineer/800/800" 
                alt="Alex Chen" 
                className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent"></div>
              <div className="absolute bottom-8 left-8">
                <p className="text-white font-bold text-2xl">{USER_INFO.name}</p>
                <p className="text-slate-300 text-sm">{USER_INFO.title}</p>
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-6">About Me</h2>
            <div className="space-y-6 text-slate-400 leading-relaxed">
              <p>
                Hello! My name is Alex and I enjoy creating things that live on the internet. My interest in web development started back in 2012 when I decided to try editing custom Tumblr themes — turns out hacking together a custom reblog button taught me a lot about HTML & CSS!
              </p>
              <p>
                Fast-forward to today, and I’ve had the privilege of working at an advertising agency, a start-up, a huge corporation, and a student-led design studio. My main focus these days is building accessible, inclusive products and digital experiences at Upstatement for a variety of clients.
              </p>
              <p>
                I also recently started exploring the world of Generative AI, integrating LLMs into modern web stacks to create more intuitive and intelligent user interfaces.
              </p>
            </div>
            
            <div className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-6">
              <div className="p-4 glass-panel rounded-2xl">
                <p className="text-3xl font-bold text-blue-500">8+</p>
                <p className="text-xs text-slate-500 uppercase tracking-widest mt-1">Years Experience</p>
              </div>
              <div className="p-4 glass-panel rounded-2xl">
                <p className="text-3xl font-bold text-purple-500">40+</p>
                <p className="text-xs text-slate-500 uppercase tracking-widest mt-1">Projects Completed</p>
              </div>
              <div className="p-4 glass-panel rounded-2xl">
                <p className="text-3xl font-bold text-pink-500">12k+</p>
                <p className="text-xs text-slate-500 uppercase tracking-widest mt-1">GitHub Stars</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <h2 className="text-4xl font-bold mb-4">Selected Projects</h2>
              <p className="text-slate-400 max-w-xl">A collection of things I've built that I'm particularly proud of. Each one solved a specific problem.</p>
            </div>
            <a href="#" className="text-blue-500 hover:text-blue-400 font-semibold flex items-center group">
              View all archives 
              <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PROJECTS.map((project) => (
              <div key={project.id} className="glass-panel rounded-3xl overflow-hidden group">
                <div className="relative overflow-hidden aspect-video">
                  <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <a href={project.link} className="p-4 bg-white rounded-full text-slate-950">
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                </div>
                <div className="p-8">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map(tag => (
                      <span key={tag} className="text-[10px] font-bold tracking-widest uppercase px-2 py-1 rounded bg-white/5 text-slate-400">{tag}</span>
                    ))}
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-blue-400 transition-colors">{project.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{project.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-16 text-center">My Toolbox</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {(['Frontend', 'Backend', 'Design', 'AI/ML'] as const).map(category => (
              <div key={category} className="glass-panel p-8 rounded-3xl">
                <h3 className="text-lg font-bold mb-6 text-blue-400 uppercase tracking-widest">{category}</h3>
                <ul className="space-y-4">
                  {SKILLS.filter(s => s.category === category).map(skill => (
                    <li key={skill.name}>
                      <div className="flex justify-between mb-1 text-sm">
                        <span className="text-slate-300">{skill.name}</span>
                        <span className="text-slate-500">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                        <div 
                          className="bg-blue-600 h-full rounded-full" 
                          style={{ width: `${skill.level}%` }}
                        ></div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-5xl font-bold mb-8">Get In Touch</h2>
          <p className="text-xl text-slate-400 mb-12">
            I'm currently looking for new opportunities, my inbox is always open. Whether you have a question or just want to say hi, I’ll try my best to get back to you!
          </p>
          <a 
            href={`mailto:${USER_INFO.email}`}
            className="inline-block px-12 py-5 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-bold text-lg transition-all hover:scale-105"
          >
            Say Hello
          </a>
          
          <div className="mt-20 pt-20 border-t border-white/5 grid grid-cols-1 md:grid-cols-3 gap-10">
            <div>
              <p className="text-slate-500 text-sm uppercase tracking-widest mb-2 font-bold">Email</p>
              <a href={`mailto:${USER_INFO.email}`} className="text-lg hover:text-blue-400 transition-colors">{USER_INFO.email}</a>
            </div>
            <div>
              <p className="text-slate-500 text-sm uppercase tracking-widest mb-2 font-bold">Location</p>
              <p className="text-lg">{USER_INFO.location}</p>
            </div>
            <div>
              <p className="text-slate-500 text-sm uppercase tracking-widest mb-2 font-bold">Social</p>
              <div className="flex justify-center space-x-6">
                <a href={USER_INFO.github} className="text-lg hover:text-blue-400">GH</a>
                <a href={USER_INFO.linkedin} className="text-lg hover:text-blue-400">LI</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Assistant Floating Component */}
      <AIChat />
    </Layout>
  );
};

export default App;
