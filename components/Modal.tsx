import React from 'react';

interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
  fullScreen?: boolean;
}

const Modal: React.FC<ModalProps> = ({ onClose, children, fullScreen = false }) => {
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div 
        className={`relative bg-gray-900/40 border border-white/20 backdrop-blur-xl shadow-2xl overflow-hidden
          ${fullScreen ? 'w-full h-full rounded-none' : 'w-full max-w-4xl h-[80vh] rounded-3xl'}
        `}
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-2 text-white/50 hover:text-white bg-black/20 hover:bg-red-500/80 rounded-full transition-all"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>

        <div className="w-full h-full overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
