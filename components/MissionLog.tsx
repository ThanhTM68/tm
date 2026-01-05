import React, { useState, useEffect } from 'react';

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

const MissionLog: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState('');

  // Load from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem('cyberhub_missions');
    if (saved) {
      setTasks(JSON.parse(saved));
    } else {
        // Default tasks
        setTasks([
            { id: 1, text: 'Explore CyberHub', completed: true },
            { id: 2, text: 'Check the new music', completed: false }
        ])
    }
  }, []);

  // Save to local storage on change
  useEffect(() => {
    localStorage.setItem('cyberhub_missions', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
    setNewTask('');
  };

  const toggleTask = (id: number) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  return (
    <div className="p-8 w-full max-w-2xl mx-auto">
      <h2 className="text-3xl font-cyber text-cyan-400 mb-2 tracking-widest border-b border-cyan-500/30 pb-4">
        MISSION LOG
      </h2>
      <p className="text-gray-400 text-sm mb-6 font-mono">TRACKING OBJECTIVES // PERSISTENT DATA</p>

      <form onSubmit={addTask} className="flex gap-2 mb-8">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter new objective..."
          className="flex-1 bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors"
        />
        <button 
          type="submit"
          className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold px-6 py-3 rounded-lg shadow-[0_0_15px_rgba(8,145,178,0.4)] transition-all"
        >
          ADD
        </button>
      </form>

      <div className="space-y-3">
        {tasks.length === 0 && (
            <div className="text-center text-gray-500 italic py-8">No active missions.</div>
        )}
        
        {tasks.map(task => (
          <div 
            key={task.id}
            className={`flex items-center justify-between p-4 rounded-lg border transition-all duration-300
              ${task.completed 
                ? 'bg-green-900/10 border-green-500/20 opacity-60' 
                : 'bg-white/5 border-white/10 hover:border-cyan-500/50 hover:bg-white/10'
              }
            `}
          >
            <div className="flex items-center gap-4 flex-1">
              <button 
                onClick={() => toggleTask(task.id)}
                className={`w-6 h-6 rounded border flex items-center justify-center transition-colors
                  ${task.completed ? 'bg-green-500 border-green-500' : 'border-gray-500 hover:border-cyan-400'}
                `}
              >
                {task.completed && (
                  <svg className="w-4 h-4 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </button>
              <span className={`text-lg ${task.completed ? 'line-through text-gray-500' : 'text-gray-100'}`}>
                {task.text}
              </span>
            </div>
            
            <button 
              onClick={() => deleteTask(task.id)}
              className="text-gray-500 hover:text-red-400 transition-colors p-2"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MissionLog;