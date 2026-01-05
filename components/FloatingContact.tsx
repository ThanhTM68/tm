import React from 'react';

const FloatingContact: React.FC = () => {
  return (
    <a 
      href="https://m.me/yourusername" // Replace with actual messenger link
      target="_blank" 
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 group"
    >
      <div className="relative w-14 h-14 rounded-full bg-blue-600 flex items-center justify-center shadow-lg transition-transform duration-300 hover:scale-110 hover:-translate-y-1">
        {/* Glow Ring */}
        <div className="absolute inset-0 rounded-full border-2 border-blue-400 opacity-0 group-hover:opacity-100 group-hover:animate-ping" />
        
        {/* Icon */}
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className="text-white relative z-10"
        >
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>

        {/* Tooltip */}
        <span className="absolute right-full mr-3 bg-white text-blue-900 px-2 py-1 rounded text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Chat with me
        </span>
      </div>
    </a>
  );
};

export default FloatingContact;
