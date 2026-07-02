import { useMemo, useState } from 'react';
import { useTodos } from '@/hooks/useTodos';
import type { Filter } from '@/types/todo';
import TodoInput from '@/components/TodoInput';
import TodoList from '@/components/TodoList';
import FilterBar from '@/components/FilterBar';

export default function Home() {
  const { todos, addTodo, toggleTodo, deleteTodo, updateTodo, clearCompleted } =
    useTodos();
  const [filter, setFilter] = useState<Filter>('all');

  const visible = useMemo(() => {
    if (filter === 'active') return todos.filter((t) => !t.completed);
    if (filter === 'completed') return todos.filter((t) => t.completed);
    return todos;
  }, [todos, filter]);

  const activeCount = todos.filter((t) => !t.completed).length;
  const completedCount = todos.length - activeCount;

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-white">
      <div className="mx-auto max-w-2xl px-4 pt-16 pb-24 sm:pt-24">
        {/* Header */}
        <header className="mb-8 text-center">
          <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-600 to-fuchsia-600 bg-clip-text text-transparent">
            todos
          </h1>
          <p className="mt-3 text-slate-500">
            {todos.length === 0
              ? 'Nothing on your plate. Add your first task below.'
              : `${activeCount} to do · ${completedCount} done`}
          </p>
        </header>

        <div className="rounded-2xl bg-white shadow-xl shadow-indigo-100/60 ring-1 ring-slate-200 overflow-hidden">
          <TodoInput onAdd={addTodo} />

          <TodoList
            todos={visible}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
            onUpdate={updateTodo}
            filter={filter}
            totalCount={todos.length}
          />

          {todos.length > 0 && (
            <FilterBar
              filter={filter}
              onFilterChange={setFilter}
              activeCount={activeCount}
              completedCount={completedCount}
              onClearCompleted={clearCompleted}
            />
          )}
        </div>

        <footer className="mt-8 text-center text-xs text-slate-400">
          Double-click a task to edit · Your list is saved to this browser
        </footer>
      </div>
    </div>
  );
}
