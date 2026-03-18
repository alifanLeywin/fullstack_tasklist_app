import type { Task } from '../lib/api';

interface TaskItemProps {
  task: Task;
  index: number;
  onToggle: (task: Task) => void;
  onDelete: (id: string) => void;
  isToggling: boolean;
  isDeleting: boolean;
}

export default function TaskItem({ task, index, onToggle, onDelete, isToggling, isDeleting }: TaskItemProps) {
  return (
    <div className="group flex items-baseline gap-4 py-3 md:py-4 border-b border-[#141414]/10 hover:border-[#141414]/30 transition-colors">
      

      <span className="text-[10px] font-mono text-[#141414]/25 shrink-0 w-6">
        {String(index + 1).padStart(2, '0')}
      </span>


      <div className="flex-1 flex flex-col md:flex-row md:items-baseline gap-1 md:gap-3 leading-snug">
        <span 
          className={`text-[15px] font-medium transition-all duration-300 group-hover:italic text-left ${
            task.completed ? 'text-[#141414]/40 line-through' : 'text-[#141414]'
          }`}
        >
          {task.title}
        </span>
        <span className="text-xs text-[#141414]/50 transition-all duration-300 md:opacity-0 group-hover:opacity-100 text-left">
          — {task.completed ? 'Completed' : 'Pending'}
        </span>
      </div>


      <div className="shrink-0 flex gap-2 text-[10px] font-bold uppercase tracking-widest transition-all duration-300 opacity-0 group-hover:opacity-100">
        <button
          onClick={() => onToggle(task)}
          disabled={isToggling}
          className={`transition-colors ${task.completed ? 'text-[#141414]/40 hover:text-[#141414]' : 'text-[#141414] hover:text-[#141414]/50'}`}
        >
          {isToggling ? '[ ... ]' : `[ ${task.completed ? 'UNDO' : 'DONE'} ]`}
        </button>
        <button
          onClick={() => onDelete(task.id)}
          disabled={isDeleting}
          className="text-red-500/50 hover:text-red-500 transition-colors"
        >
          {isDeleting ? '[ ... ]' : '[ DEL ]'}
        </button>
      </div>
    </div>
  );
}