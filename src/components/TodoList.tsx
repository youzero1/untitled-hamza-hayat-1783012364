import type { Filter, Todo } from '@/types/todo';
import TodoItem from '@/components/TodoItem';

interface Props {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, text: string) => void;
  filter: Filter;
  totalCount: number;
}

export default function TodoList({
  todos,
  onToggle,
  onDelete,
  onUpdate,
  filter,
  totalCount,
}: Props) {
  if (totalCount === 0) {
    return (
      <div className="px-6 py-14 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-indigo-50 text-2xl">
          ✨
        </div>
        <p className="text-slate-500">Your list is empty. Add something above to get started.</p>
      </div>
    );
  }

  if (todos.length === 0) {
    const label =
      filter === 'active' ? 'No active tasks — nice work!' : 'Nothing completed yet.';
    return (
      <div className="px-6 py-12 text-center text-slate-500">{label}</div>
    );
  }

  return (
    <ul className="divide-y divide-slate-100">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
    </ul>
  );
}
