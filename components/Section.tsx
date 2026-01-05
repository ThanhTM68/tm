import React, { ReactNode } from 'react';

interface SectionProps {
  id: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
  align?: 'left' | 'center' | 'right';
  className?: string;
}

const Section: React.FC<SectionProps> = ({ id, title, subtitle, children, align = 'center', className = '' }) => {
  return (
    <section 
      id={id} 
      className={`min-h-screen w-full flex flex-col justify-center px-4 py-20 md:px-12 relative border-t border-white/5 ${className}`}
    >
      {/* Background Gradient Spot */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40 pointer-events-none"></div>
      
      <div className={`relative z-10 w-full max-w-7xl mx-auto ${align === 'center' ? 'items-center' : align === 'right' ? 'items-end' : 'items-start'} flex flex-col`}>
        {/* Header */}
        <div className={`mb-12 ${align === 'center' ? 'text-center' : align === 'right' ? 'text-right' : 'text-left'}`}>
          <h2 className="text-4xl md:text-6xl font-cyber font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 mb-2 uppercase tracking-widest drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
            {title}
          </h2>
          {subtitle && (
            <div className="flex items-center gap-4 justify-center opacity-70">
                <div className="h-[1px] w-12 bg-cyan-500"></div>
                <p className="text-cyan-400 font-mono text-sm md:text-base tracking-[0.3em] uppercase">
                {subtitle}
                </p>
                <div className="h-[1px] w-12 bg-cyan-500"></div>
            </div>
          )}
        </div>

        {/* Glass Container */}
        <div className="w-full bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-10 shadow-[0_0_50px_rgba(0,0,0,0.5)] relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-700"></div>
            {children}
        </div>
      </div>
    </section>
  );
};

export default Section;