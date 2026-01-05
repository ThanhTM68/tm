import React from 'react';

interface AvatarProps {
  imageUrl: string;
  onClick?: () => void;
}

const Avatar: React.FC<AvatarProps> = ({ imageUrl, onClick }) => {
  return (
    <div 
      className="fixed top-6 left-6 z-40 group cursor-pointer"
      onClick={onClick}
    >
      <div className="relative w-16 h-16 md:w-20 md:h-20 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
        {/* Glow Effect */}
        <div className="absolute inset-0 rounded-full bg-cyan-500 blur-md opacity-50 group-hover:opacity-100 group-hover:blur-lg transition-all duration-300 animate-pulse" />
        
        {/* Ring Animation */}
        <div className="absolute -inset-1 rounded-full border border-cyan-300/30 border-dashed animate-spin-slow opacity-0 group-hover:opacity-100 transition-opacity" style={{ animationDuration: '10s' }}></div>

        {/* Image */}
        <img 
          src={imageUrl} 
          alt="User Avatar" 
          className="relative w-full h-full rounded-full object-cover border-2 border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.5)] z-10"
        />
        
        {/* Status Indicator */}
        <div className="absolute bottom-0 right-0 z-20 w-4 h-4 bg-green-500 rounded-full border-2 border-gray-900 shadow-md group-hover:bg-green-400 transition-colors" />
        
        {/* Tooltip hint */}
        <div className="absolute left-full top-1/2 -translate-y-1/2 ml-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-[-10px] group-hover:translate-x-0 whitespace-nowrap">
           <span className="bg-black/80 text-cyan-400 text-xs px-2 py-1 rounded border border-cyan-500/30 font-cyber">
             VIEW ID CARD
           </span>
        </div>
      </div>
    </div>
  );
};

export default Avatar;