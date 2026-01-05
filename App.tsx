import React, { useState, useEffect } from 'react';
import { ViewState, MenuItem } from './types';
import Background from './components/Background';
import Avatar from './components/Avatar';
import MusicPlayer from './components/MusicPlayer';
import FloatingContact from './components/FloatingContact';
import Modal from './components/Modal';
import Fireworks from './components/Fireworks';
import MiniGame from './components/MiniGame';
import MissionLog from './components/MissionLog';
import AnimeSearch from './components/AnimeSearch';
import Section from './components/Section';

// Assets
const BG_IMAGE = "https://images.unsplash.com/photo-1535868463750-c78d9543614f?q=80&w=2076&auto=format&fit=crop"; 
const AVATAR_IMAGE = "https://picsum.photos/200/200"; 

const MENU_ITEMS: MenuItem[] = [
  { id: ViewState.ANIME, label: 'Neural Archives', icon: '⛩️', description: 'Access Anime Database' },
  { id: ViewState.MISSION_LOG, label: 'Mission Log', icon: '📝', description: 'Operational Objectives' },
  { id: ViewState.GAME, label: 'Cyber Clicker', icon: '🎮', description: 'Reflex Training Module' },
  { id: ViewState.FIREWORKS, label: 'Visual Systems', icon: '🎆', description: 'Test Display Output' },
];

const Clock: React.FC = () => {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);
  return (
    <div className="font-cyber text-cyan-500/80 text-xl md:text-2xl tracking-widest mt-2 animate-pulse">
      {time.toLocaleTimeString([], { hour12: false })}
    </div>
  );
};

const App: React.FC = () => {
  const [showFireworks, setShowFireworks] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  // Scroll to section handler
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleMenuClick = (id: ViewState) => {
    if (id === ViewState.ANIME) scrollToSection('section-anime');
    else if (id === ViewState.MISSION_LOG) scrollToSection('section-mission');
    else if (id === ViewState.GAME) scrollToSection('section-game');
    else if (id === ViewState.FIREWORKS) setShowFireworks(true);
    else if (id === ViewState.ABOUT) scrollToSection('section-footer');
  };

  return (
    <div className="relative w-full min-h-screen text-white perspective-1000">
      <Background imageUrl={BG_IMAGE} />
      
      {/* Fixed UI Layers */}
      <Avatar imageUrl={AVATAR_IMAGE} onClick={() => setShowProfile(true)} />
      <MusicPlayer />
      <FloatingContact />

      {/* --- SECTION 1: HERO --- */}
      <section className="min-h-screen flex flex-col items-center justify-center p-6 relative">
        <div className="max-w-6xl w-full">
          {/* Header */}
          <div className="text-center mb-16 animate-float relative z-10">
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-cyber font-bold bg-clip-text text-transparent bg-gradient-to-b from-cyan-300 to-blue-600 tracking-tighter drop-shadow-[0_0_25px_rgba(34,211,238,0.6)]">
              CYBER HUB
            </h1>
            <div className="flex flex-col items-center justify-center mt-4 gap-2">
               <p className="text-gray-300 text-lg font-light tracking-[0.5em] uppercase flex items-center justify-center gap-4">
                <span className="w-12 h-[1px] bg-gradient-to-r from-transparent to-cyan-500"></span>
                System Online
                <span className="w-12 h-[1px] bg-gradient-to-l from-transparent to-cyan-500"></span>
              </p>
              <Clock />
            </div>
          </div>

          {/* Navigation Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-2 lg:px-4">
            {MENU_ITEMS.map((item, index) => (
              <button
                key={item.id}
                onClick={() => handleMenuClick(item.id)}
                className="group relative h-40 lg:h-56 bg-black/40 backdrop-blur-md border border-white/10 rounded-xl p-6 text-left transition-all duration-500 hover:scale-105 hover:-translate-y-2 hover:shadow-[0_0_40px_rgba(34,211,238,0.15)] overflow-hidden"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="absolute inset-0 rounded-xl border border-cyan-500/0 group-hover:border-cyan-500/50 transition-colors duration-500"></div>
                <div className="absolute inset-0 bg-[url('https://media.giphy.com/media/26tn33aiTi1jkl6H6/giphy.gif')] opacity-0 group-hover:opacity-5 mix-blend-overlay pointer-events-none bg-cover"></div>
                
                <div className="relative z-10 h-full flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <span className="text-4xl filter drop-shadow-lg transform group-hover:rotate-12 transition-transform duration-300">{item.icon}</span>
                    <span className="text-xs text-cyan-500 font-cyber opacity-0 group-hover:opacity-100 transition-opacity border border-cyan-500/30 px-2 py-1 rounded">
                      NAV // 0{index + 1}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold font-cyber text-white group-hover:text-cyan-400 transition-colors tracking-wide">
                      {item.label}
                    </h3>
                    <div className="w-0 group-hover:w-full h-[1px] bg-cyan-500 transition-all duration-500 mb-2 mt-1"></div>
                    <p className="text-xs text-gray-400 group-hover:text-gray-300 font-mono">
                      {item.description}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
          
          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-cyan-500/50 flex flex-col items-center gap-2 cursor-pointer" onClick={() => scrollToSection('section-anime')}>
             <span className="text-[10px] tracking-widest uppercase font-mono">Scroll Down</span>
             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
          </div>
        </div>
      </section>

      {/* --- SECTION 2: ANIME SEARCH --- */}
      <Section id="section-anime" title="Neural Archives" subtitle="Query Anime Database">
        <div className="h-[600px] w-full">
            <AnimeSearch />
        </div>
      </Section>

      {/* --- SECTION 3: MISSION LOG --- */}
      <Section id="section-mission" title="Mission Log" subtitle="Active Objectives">
        <div className="min-h-[400px]">
            <MissionLog />
        </div>
      </Section>

       {/* --- SECTION 4: MINI GAME --- */}
       <Section id="section-game" title="Training Module" subtitle="Reflex Synchronization">
        <div className="h-[500px] w-full relative bg-black/50 rounded-lg border border-white/5 overflow-hidden">
            <MiniGame />
        </div>
      </Section>

      {/* --- FOOTER --- */}
      <footer id="section-footer" className="py-12 bg-black/80 border-t border-white/10 text-center relative z-10">
        <div className="max-w-4xl mx-auto px-6">
            <h3 className="font-cyber text-2xl text-cyan-600 mb-4">SYSTEM END OF LINE</h3>
            <p className="text-gray-400 text-sm font-mono max-w-lg mx-auto leading-relaxed">
                CyberHub Interface v2.0. Built with React, TailwindCSS, and Google Gemini API compatibility.
                Designed for immersive web experiences.
            </p>
            <div className="mt-8 flex justify-center gap-6 text-xs tracking-widest text-gray-500">
                <span>STATUS: ONLINE</span>
                <span>•</span>
                <span>SECURE CONNECTION</span>
                <span>•</span>
                <span>LATENCY: 12ms</span>
            </div>
        </div>
      </footer>

      {/* --- MODALS (Overlays) --- */}
      
      {/* Visual Systems (Fireworks) Modal */}
      {showFireworks && (
        <Modal onClose={() => setShowFireworks(false)} fullScreen>
          <div className="relative w-full h-full flex items-center justify-center">
             <div className="absolute top-8 left-8 z-10 pointer-events-none bg-black/50 p-2 rounded text-sm text-white/70 font-mono border-l-2 border-cyan-500">
                SYSTEM: CLICK TO DETONATE PARTICLES
             </div>
             <Fireworks />
          </div>
        </Modal>
      )}

      {/* Profile Modal */}
      {showProfile && (
        <Modal onClose={() => setShowProfile(false)}>
          <div className="relative w-full h-full p-8 md:p-12 flex flex-col md:flex-row gap-8 items-center justify-center">
             {/* Reused Profile Content from previous version */}
             <div className="relative group shrink-0">
               <div className="w-48 h-48 rounded-full p-1 bg-gradient-to-tr from-cyan-400 to-purple-600">
                  <img src={AVATAR_IMAGE} alt="Profile" className="w-full h-full rounded-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
               </div>
            </div>
            <div className="flex-1 max-w-lg">
               <h2 className="text-4xl font-cyber text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-purple-300 mb-2">OPERATOR</h2>
               <div className="text-sm text-cyan-500 tracking-widest font-mono mb-6">FULL STACK DEVELOPER</div>
               <p className="text-gray-300 mb-6">
                 Welcome to my personal neural interface. Navigate the sections below to explore active modules.
               </p>
               <button onClick={() => setShowProfile(false)} className="px-6 py-2 border border-cyan-500 text-cyan-400 hover:bg-cyan-500/20 rounded font-bold">CLOSE BIO</button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default App;