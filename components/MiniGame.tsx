import React, { useState, useEffect } from 'react';

const MiniGame: React.FC = () => {
  const [score, setScore] = useState(0);
  const [position, setPosition] = useState({ top: '50%', left: '50%' });
  const [timeLeft, setTimeLeft] = useState(30);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    let timer: any;
    if (isPlaying && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsPlaying(false);
      setGameOver(true);
    }
    return () => clearInterval(timer);
  }, [isPlaying, timeLeft]);

  const moveTarget = () => {
    const top = Math.random() * 80 + 10; // Keep within 10-90%
    const left = Math.random() * 80 + 10;
    setPosition({ top: `${top}%`, left: `${left}%` });
  };

  const handleTargetClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent clicking the container
    if (!isPlaying) return;
    setScore((prev) => prev + 1);
    moveTarget();
  };

  const startGame = () => {
    setScore(0);
    setTimeLeft(30);
    setIsPlaying(true);
    setGameOver(false);
    moveTarget();
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center p-4">
      <h2 className="text-3xl font-cyber text-cyan-400 mb-4 tracking-widest">CYBER CLICKER</h2>
      
      {!isPlaying && !gameOver && (
        <button 
          onClick={startGame}
          className="px-8 py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-lg shadow-[0_0_15px_rgba(8,145,178,0.5)] transition-all transform hover:scale-105"
        >
          START MISSION
        </button>
      )}

      {gameOver && (
        <div className="text-center animate-bounce">
          <p className="text-2xl text-white mb-2">Mission Complete!</p>
          <p className="text-4xl font-bold text-yellow-400 mb-6">Score: {score}</p>
          <button 
            onClick={startGame}
            className="px-6 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded transition-colors"
          >
            Replay
          </button>
        </div>
      )}

      {isPlaying && (
        <>
           <div className="absolute top-4 w-full flex justify-between px-8 text-xl font-bold font-cyber">
             <span className="text-white">Score: {score}</span>
             <span className="text-red-400">Time: {timeLeft}s</span>
           </div>
           
           <button
             onClick={handleTargetClick}
             style={{ top: position.top, left: position.left }}
             className="absolute w-12 h-12 bg-red-500 rounded-full shadow-[0_0_20px_rgba(239,68,68,0.8)] border-2 border-white cursor-pointer active:scale-90 transition-transform duration-75"
           >
             <div className="absolute inset-0 animate-ping bg-red-400 rounded-full opacity-75"></div>
           </button>
        </>
      )}
    </div>
  );
};

export default MiniGame;
