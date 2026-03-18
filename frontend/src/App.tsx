import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getTasks, createTask, toggleTask, deleteTask, type Task } from './lib/api';
import TaskInput from './components/TaskInput';
import TaskItem from './components/TaskItem';

function App() {
  const queryClient = useQueryClient();

  // --- LOGIKA REACT QUERY ---
  const { data: tasks, isLoading } = useQuery<Task[]>({
    queryKey: ['tasks'],
    queryFn: getTasks,
  });

  const createMutation = useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  const toggleMutation = useMutation({
    mutationFn: toggleTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  return (
    <div className="min-h-screen bg-white text-[#141414] flex justify-center py-20 px-6 font-sans">
      <div className="w-full max-w-xl">
        

        <h3 className="text-xs uppercase tracking-widest mb-6 font-semibold">
          Tasklist / On Repeat
        </h3>


        <TaskInput 
          onAdd={(title) => createMutation.mutate(title)} 
          isPending={createMutation.isPending} 
        />


        <div className="border-t border-[#141414]/10">
          
          {isLoading && (
            <p className="py-6 text-xs text-[#141414]/30 uppercase tracking-widest">
              Loading tasks...
            </p>
          )}

          {!isLoading && tasks?.length === 0 && (
            <p className="py-6 text-xs uppercase tracking-widest italic">
              No tasks found.
            </p>
          )}

        
          {tasks?.map((task, index) => (
            <TaskItem
              key={task.id}
              task={task}
              index={index}
              isToggling={toggleMutation.isPending && toggleMutation.variables?.id === task.id}
              isDeleting={deleteMutation.isPending && deleteMutation.variables === task.id}
              onToggle={(t) => toggleMutation.mutate({ id: t.id, title: t.title, completed: !t.completed })}
              onDelete={(id) => deleteMutation.mutate(id)}
            />
          ))}
        </div>
        
        <p className="text-[10px] text-[#141414]/30 mt-4 uppercase tracking-wider text-left">
          *Hover over a task to mark as done or delete.
        </p>


      </div>
    </div>
  );
}

export default App;