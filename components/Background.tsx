import React from 'react';

interface BackgroundProps {
  imageUrl: string;
}

const Background: React.FC<BackgroundProps> = ({ imageUrl }) => {
  return (
    <div className="fixed inset-0 -z-50 overflow-hidden">
      {/* Base Image with Parallax/Zoom effect */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center animate-slow-zoom"
        style={{ backgroundImage: `url(${imageUrl})` }}
      />
      
      {/* Dark Gradient Overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/60 backdrop-blur-[2px]" />
      
      {/* Optional: Cyber grid overlay pattern */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      />
    </div>
  );
};

export default Background;
