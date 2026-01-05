import React, { useState, useEffect, useRef } from 'react';
import { getYouTubeID } from '../utils';

// Updated to user request
const DEFAULT_MUSIC = "https://youtu.be/lIX7nr8NygA?si=f4yehDov-bxZF-_1"; 

const MusicPlayer: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [url, setUrl] = useState(DEFAULT_MUSIC);
  const [videoId, setVideoId] = useState<string | null>(getYouTubeID(DEFAULT_MUSIC));
  const [isPlaying, setIsPlaying] = useState(false);
  
  // Ref to the input element
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const id = getYouTubeID(url);
    if (id) {
      setVideoId(id);
    }
  }, [url]);

  // Attempt auto-play on load (Note: browsers may block unmuted autoplay without interaction)
  useEffect(() => {
     if (videoId) {
         // We set playing to true, but the iframe logic handles the actual play command
         setIsPlaying(true);
     }
  }, [videoId]);

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="fixed top-6 right-6 z-50 flex flex-col items-end">
      {/* Controller Toggle */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`group flex items-center gap-2 backdrop-blur-md border rounded-full px-4 py-2 transition-all shadow-[0_0_15px_rgba(168,85,247,0.3)] hover:shadow-[0_0_20px_rgba(168,85,247,0.6)]
          ${isPlaying ? 'bg-purple-900/60 border-purple-400/50' : 'bg-black/40 border-white/10 hover:bg-white/10'}
        `}
      >
        <div className="flex items-center justify-center gap-1 h-4">
            {isPlaying ? (
               <>
                 <div className="w-1 bg-purple-400 animate-[bounce_1s_infinite] h-3"></div>
                 <div className="w-1 bg-purple-400 animate-[bounce_1.2s_infinite] h-4"></div>
                 <div className="w-1 bg-purple-400 animate-[bounce_0.8s_infinite] h-2"></div>
               </>
            ) : (
                <span className="text-purple-300 text-xl">♫</span>
            )}
        </div>
        <span className="font-cyber text-sm text-white hidden md:block group-hover:text-purple-200 ml-1">
          {isPlaying ? 'PLAYING' : 'MUSIC'}
        </span>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="mt-4 w-80 bg-gray-900/95 backdrop-blur-xl border border-purple-500/30 rounded-xl p-5 shadow-2xl animate-float">
           <div className="mb-4 flex items-center justify-between">
             <label className="text-xs text-purple-300 uppercase font-bold tracking-wider">Audio Interface</label>
             <div className="flex gap-1">
                <div className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
             </div>
           </div>
           
           {/* Hidden Iframe Wrapper */}
           <div className="fixed opacity-0 pointer-events-none w-1 h-1 overflow-hidden -z-50 top-0 left-0">
              {videoId ? (
                <iframe
                  id="yt-player"
                  width="100"
                  height="100"
                  src={`https://www.youtube.com/embed/${videoId}?autoplay=${isPlaying ? 1 : 0}&controls=0&disablekb=1&fs=0&loop=1&playlist=${videoId}&origin=${typeof window !== 'undefined' ? window.location.origin : ''}&enablejsapi=1`}
                  title="Music Player"
                  allow="autoplay; encrypted-media;"
                  onError={() => console.error("YT Error")}
                ></iframe>
              ) : null}
           </div>

           {/* Custom Controls */}
           <div className="bg-black/40 rounded-lg p-3 border border-white/5 mb-4">
              <div className="text-xs text-gray-400 mb-2 truncate font-mono">
                 ID: {videoId || 'None'}
              </div>
              <button 
                onClick={togglePlay}
                className={`w-full text-sm font-bold py-3 rounded transition-all shadow-lg flex items-center justify-center gap-2
                  ${isPlaying 
                    ? 'bg-purple-600/20 text-purple-300 border border-purple-500/50 hover:bg-purple-600/30' 
                    : 'bg-purple-600 hover:bg-purple-500 text-white border border-transparent'
                  }
                `}
              >
                {isPlaying ? (
                    <>
                       <span>❚❚</span> PAUSE MUSIC
                    </>
                ) : (
                    <>
                       <span>▶</span> PLAY STREAM
                    </>
                )}
              </button>
           </div>

           <div className="space-y-1">
             <label className="text-[10px] text-gray-500 uppercase tracking-widest">Load Frequency (YouTube URL)</label>
             <div className="relative">
                <input 
                  ref={inputRef}
                  type="text" 
                  value={url} 
                  onChange={handleUrlChange}
                  className="w-full bg-black/50 border border-white/10 rounded px-3 py-2 text-xs text-purple-200 focus:outline-none focus:border-purple-500 transition-colors font-mono"
                  placeholder="Paste YouTube Link..."
                />
                <div className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-600">
                    <svg width="12" height="12" fill="currentColor" viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>
                </div>
             </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default MusicPlayer;