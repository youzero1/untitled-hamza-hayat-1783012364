import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import type { Todo } from '@/types/todo';

interface Props {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, text: string) => void;
}

export default function TodoItem({ todo, onToggle, onDelete, onUpdate }: Props) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(todo.text);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editing) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [editing]);

  const commit = () => {
    if (draft.trim() !== todo.text) {
      onUpdate(todo.id, draft);
    }
    setEditing(false);
  };

  const cancel = () => {
    setDraft(todo.text);
    setEditing(false);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') commit();
    else if (e.key === 'Escape') cancel();
  };

  return (
    <li className="group flex items-center gap-3 px-4 py-3 transition hover:bg-slate-50">
      <button
        type="button"
        aria-label={todo.completed ? 'Mark as not done' : 'Mark as done'}
        onClick={() => onToggle(todo.id)}
        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition ${
          todo.completed
            ? 'border-emerald-500 bg-emerald-500 text-white'
            : 'border-slate-300 hover:border-indigo-400'
        }`}
      >
        {todo.completed && (
          <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
            <path
              fillRule="evenodd"
              d="M16.7 5.3a1 1 0 010 1.4l-7.5 7.5a1 1 0 01-1.4 0L3.3 9.7a1 1 0 011.4-1.4l3.8 3.8 6.8-6.8a1 1 0 011.4 0z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </button>

      {editing ? (
        <input
          ref={inputRef}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={commit}
          onKeyDown={onKeyDown}
          className="flex-1 rounded-md border border-indigo-300 bg-white px-2 py-1 text-slate-800 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
        />
      ) : (
        <span
          onDoubleClick={() => setEditing(true)}
          className={`flex-1 select-none cursor-text truncate text-slate-800 ${
            todo.completed ? 'line-through text-slate-400' : ''
          }`}
          title="Double-click to edit"
        >
          {todo.text}
        </span>
      )}

      <button
        type="button"
        onClick={() => onDelete(todo.id)}
        aria-label="Delete task"
        className="ml-1 rounded-md p-1.5 text-slate-300 opacity-0 transition hover:bg-rose-50 hover:text-rose-500 group-hover:opacity-100 focus:opacity-100"
      >
        <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
          <path
            fillRule="evenodd"
            d="M8.5 3a1 1 0 00-.95.68L7.3 4.5H4a1 1 0 100 2h.5l.6 9.1A2 2 0 007.1 17.5h5.8a2 2 0 002-1.9l.6-9.1H16a1 1 0 100-2h-3.3l-.25-.82A1 1 0 0011.5 3h-3zM8 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 10-2 0v6a1 1 0 102 0V8z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </li>
  );
}
