import { useState } from 'react';

interface TaskInputProps {
  onAdd: (title: string) => void;
  isPending: boolean;
}

export default function TaskInput({ onAdd, isPending }: TaskInputProps) {
  const [title, setTitle] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd(title);
    setTitle(''); 
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="group flex items-baseline gap-4 py-3 md:py-4 border-b border-[#141414]/10 hover:border-[#141414]/30 transition-colors mb-8"
    >
      <span className="text-[10px] font-mono text-[#141414]/25 shrink-0 w-6">
        ++
      </span>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add new task... (e.g., Beat Nameless Puppet in Lies of P)"
        className="flex-1 bg-transparent text-[15px] font-medium text-[#141414] placeholder:text-[#141414]/60 focus:outline-none focus:italic transition-all"
        disabled={isPending}
      />
      <button
        type="submit"
        disabled={isPending || !title.trim()}
        className="shrink-0 text-[10px] font-bold uppercase tracking-widest transition-all duration-300 text-[#141414]/0 group-hover:text-[#141414] disabled:opacity-0"
      >
        {isPending ? '[ ADDING ]' : '[ ADD ]'}
      </button>
    </form>
  );
}