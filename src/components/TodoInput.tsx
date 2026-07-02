import { useState, type FormEvent } from 'react';

interface Props {
  onAdd: (text: string) => void;
}

export default function TodoInput({ onAdd }: Props) {
  const [value, setValue] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!value.trim()) return;
    onAdd(value);
    setValue('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-2 border-b border-slate-100 p-4"
    >
      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 border-slate-200" />
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="What needs doing?"
        className="flex-1 bg-transparent px-2 py-2 text-lg text-slate-800 placeholder:text-slate-400 focus:outline-none"
        autoFocus
      />
      <button
        type="submit"
        disabled={!value.trim()}
        className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none"
      >
        Add
      </button>
    </form>
  );
}
