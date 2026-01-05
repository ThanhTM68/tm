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

// Assets
const BG_IMAGE = "https://images.unsplash.com/photo-1535868463750-c78d9543614f?q=80&w=2076&auto=format&fit=crop"; // Cyberpunk City
const AVATAR_IMAGE = "https://picsum.photos/200/200"; // Placeholder

const MENU_ITEMS: MenuItem[] = [
  { id: ViewState.ANIME, label: 'Anime DB', icon: '⛩️', description: 'Neural Search' },
  { id: ViewState.MISSION_LOG, label: 'Mission Log', icon: '📝', description: 'Tasks & Objectives' },
  { id: ViewState.FIREWORKS, label: 'Fireworks', icon: '🎆', description: 'Visual Systems Test' },
  { id: ViewState.GAME, label: 'Cyber Clicker', icon: '🎮', description: 'Reflex Training' },
  { id: ViewState.ABOUT, label: 'System Info', icon: '💾', description: 'Core Data' },
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
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.HOME);

  const handleMenuClick = (view: ViewState) => {
    setCurrentView(view);
  };

  const handleAvatarClick = () => {
    setCurrentView(ViewState.PROFILE);
  };

  const handleClose = () => {
    setCurrentView(ViewState.HOME);
  };

  return (
    <div className="relative w-full h-screen text-white overflow-hidden perspective-1000">
      <Background imageUrl={BG_IMAGE} />
      
      {/* UI Layers */}
      <Avatar imageUrl={AVATAR_IMAGE} onClick={handleAvatarClick} />
      <MusicPlayer />
      <FloatingContact />

      {/* Main Content Area */}
      <main className={`absolute inset-0 flex items-center justify-center p-6 transition-opacity duration-500 ${currentView !== ViewState.HOME ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        <div className="max-w-6xl w-full">
          {/* Header Text */}
          <div className="text-center mb-10 lg:mb-16 animate-float relative z-10">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-cyber font-bold bg-clip-text text-transparent bg-gradient-to-b from-cyan-300 to-blue-600 tracking-tighter drop-shadow-[0_0_25px_rgba(34,211,238,0.6)]">
              CYBER HUB
            </h1>
            <div className="flex flex-col items-center justify-center mt-4 gap-2">
               <p className="text-gray-300 text-lg font-light tracking-[0.5em] uppercase flex items-center justify-center gap-4">
                <span className="w-12 h-[1px] bg-gradient-to-r from-transparent to-cyan-500"></span>
                Digital Portal
                <span className="w-12 h-[1px] bg-gradient-to-l from-transparent to-cyan-500"></span>
              </p>
              <Clock />
            </div>
          </div>

          {/* Upgraded Glass Grid Menu */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6 px-2 lg:px-4">
            {MENU_ITEMS.map((item, index) => (
              <button
                key={item.id}
                onClick={() => handleMenuClick(item.id)}
                className="group relative h-40 lg:h-48 bg-black/40 backdrop-blur-md border border-white/10 rounded-xl p-4 lg:p-6 text-left transition-all duration-500 hover:scale-105 hover:-translate-y-2 hover:shadow-[0_0_40px_rgba(34,211,238,0.15)] overflow-hidden"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Animated Border Glow */}
                <div className="absolute inset-0 rounded-xl border border-cyan-500/0 group-hover:border-cyan-500/50 transition-colors duration-500"></div>
                
                {/* Scanline Effect */}
                <div className="absolute inset-0 bg-[url('https://media.giphy.com/media/26tn33aiTi1jkl6H6/giphy.gif')] opacity-0 group-hover:opacity-5 mix-blend-overlay pointer-events-none bg-cover"></div>
                
                {/* Content */}
                <div className="relative z-10 h-full flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <span className="text-3xl lg:text-4xl filter drop-shadow-lg transform group-hover:rotate-12 transition-transform duration-300">{item.icon}</span>
                    <span className="text-[10px] text-gray-500 font-cyber opacity-0 group-hover:opacity-100 transition-opacity">
                      0{index + 1} // SYS
                    </span>
                  </div>
                  
                  <div>
                    <h3 className="text-lg lg:text-xl font-bold font-cyber text-white group-hover:text-cyan-400 transition-colors tracking-wide">
                      {item.label}
                    </h3>
                    <div className="w-0 group-hover:w-full h-[1px] bg-cyan-500 transition-all duration-500 mb-2 mt-1"></div>
                    <p className="text-[10px] lg:text-xs text-gray-400 group-hover:text-gray-300 font-mono line-clamp-1">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Corner Accents */}
                <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-white/20 group-hover:border-cyan-400 transition-colors"></div>
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-white/20 group-hover:border-cyan-400 transition-colors"></div>
              </button>
            ))}
          </div>
        </div>
      </main>

      {/* Modals / Views */}
      {currentView === ViewState.ANIME && (
        <Modal onClose={handleClose}>
          <AnimeSearch />
        </Modal>
      )}

      {currentView === ViewState.MISSION_LOG && (
        <Modal onClose={handleClose}>
          <MissionLog />
        </Modal>
      )}

      {currentView === ViewState.FIREWORKS && (
        <Modal onClose={handleClose} fullScreen>
          <div className="relative w-full h-full flex items-center justify-center">
             <div className="absolute top-8 left-8 z-10 pointer-events-none bg-black/50 p-2 rounded text-sm text-white/70 font-mono border-l-2 border-cyan-500">
                SYSTEM: CLICK TO DETONATE
             </div>
             <Fireworks />
          </div>
        </Modal>
      )}

      {currentView === ViewState.GAME && (
        <Modal onClose={handleClose}>
          <MiniGame />
        </Modal>
      )}

      {currentView === ViewState.ABOUT && (
        <Modal onClose={handleClose}>
          <div className="p-12 flex flex-col items-center text-center">
            <h2 className="text-4xl font-cyber text-cyan-400 mb-6">About This Portal</h2>
            <p className="text-lg text-gray-300 max-w-2xl leading-relaxed font-light">
              This is a demonstration of a React-based single page interactive hub. 
              It features glassmorphism UI principles, particle canvas effects, and state-based navigation 
              without page reloads.
            </p>
            
            <div className="mt-8 grid grid-cols-3 gap-4 w-full max-w-lg">
              <div className="p-4 bg-white/5 rounded border border-white/10 hover:border-cyan-500/50 transition-colors">
                <div className="text-cyan-400 font-bold text-xl">React</div>
                <div className="text-xs text-gray-400 uppercase">Core</div>
              </div>
              <div className="p-4 bg-white/5 rounded border border-white/10 hover:border-purple-500/50 transition-colors">
                <div className="text-purple-400 font-bold text-xl">Tailwind</div>
                <div className="text-xs text-gray-400 uppercase">Style</div>
              </div>
              <div className="p-4 bg-white/5 rounded border border-white/10 hover:border-green-500/50 transition-colors">
                <div className="text-green-400 font-bold text-xl">TS</div>
                <div className="text-xs text-gray-400 uppercase">Safety</div>
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* Profile View */}
      {currentView === ViewState.PROFILE && (
        <Modal onClose={handleClose}>
          <div className="relative w-full h-full p-8 md:p-12 flex flex-col md:flex-row gap-8 items-center justify-center">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 right-0 p-4 opacity-20">
              <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
                <circle cx="50" cy="50" r="48" stroke="cyan" strokeWidth="1" strokeDasharray="4 4" />
                <circle cx="50" cy="50" r="30" stroke="purple" strokeWidth="1" />
              </svg>
            </div>

            {/* Avatar Section */}
            <div className="relative group shrink-0">
               <div className="w-48 h-48 rounded-full p-1 bg-gradient-to-tr from-cyan-400 to-purple-600 animate-spin-slow" style={{ animationDuration: '8s' }}>
                  <div className="w-full h-full rounded-full bg-black p-1">
                     <img src={AVATAR_IMAGE} alt="Profile" className="w-full h-full rounded-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                  </div>
               </div>
               <div className="absolute bottom-4 right-4 bg-green-500 text-black text-xs font-bold px-2 py-1 rounded shadow-lg border border-white/20">
                  ONLINE
               </div>
            </div>

            {/* Info Section */}
            <div className="flex-1 max-w-lg">
               <h2 className="text-4xl font-cyber text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-purple-300 mb-2">
                 YOUR NAME
               </h2>
               <div className="text-sm text-cyan-500 tracking-widest font-mono mb-6 border-b border-white/10 pb-4">
                 FULL STACK DEVELOPER // NETRUNNER
               </div>
               
               <p className="text-gray-300 mb-6 leading-relaxed">
                 Passionate about creating immersive web experiences. 
                 Specialized in React, interactive UI, and futuristic design patterns.
                 Always ready for the next challenge in the digital realm.
               </p>

               {/* Stats / Skills */}
               <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-purple-300">CREATIVITY</span>
                      <span className="text-gray-400">95%</span>
                    </div>
                    <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                       <div className="h-full bg-purple-500 w-[95%] shadow-[0_0_10px_rgba(168,85,247,0.5)]"></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-cyan-300">CODING</span>
                      <span className="text-gray-400">88%</span>
                    </div>
                    <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                       <div className="h-full bg-cyan-500 w-[88%] shadow-[0_0_10px_rgba(34,211,238,0.5)]"></div>
                    </div>
                  </div>

                   <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-pink-300">GAMING</span>
                      <span className="text-gray-400">100%</span>
                    </div>
                    <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                       <div className="h-full bg-pink-500 w-[100%] shadow-[0_0_10px_rgba(236,72,153,0.5)]"></div>
                    </div>
                  </div>
               </div>

               <div className="mt-8 flex gap-4">
                  <button className="px-6 py-2 border border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/20 rounded transition-colors text-sm tracking-wider font-bold hover:shadow-[0_0_15px_rgba(34,211,238,0.4)]">
                    PORTFOLIO
                  </button>
                  <button className="px-6 py-2 border border-purple-500/50 text-purple-400 hover:bg-purple-500/20 rounded transition-colors text-sm tracking-wider font-bold hover:shadow-[0_0_15px_rgba(168,85,247,0.4)]">
                    CONTACT
                  </button>
               </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default App;