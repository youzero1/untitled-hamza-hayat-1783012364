import type { Filter } from '@/types/todo';

interface Props {
  filter: Filter;
  onFilterChange: (f: Filter) => void;
  activeCount: number;
  completedCount: number;
  onClearCompleted: () => void;
}

const OPTIONS: { value: Filter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'completed', label: 'Completed' },
];

export default function FilterBar({
  filter,
  onFilterChange,
  activeCount,
  completedCount,
  onClearCompleted,
}: Props) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 bg-slate-50/60 px-4 py-3 text-sm">
      <span className="text-slate-500">
        {activeCount} {activeCount === 1 ? 'item' : 'items'} left
      </span>

      <div className="flex items-center gap-1 rounded-lg bg-white p-1 ring-1 ring-slate-200">
        {OPTIONS.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => onFilterChange(opt.value)}
            className={`rounded-md px-3 py-1 text-xs font-medium transition ${
              filter === opt.value
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {completedCount > 0 ? (
        <button
          type="button"
          onClick={onClearCompleted}
          className="text-slate-500 transition hover:text-rose-600"
        >
          Clear completed
        </button>
      ) : (
        <span className="text-slate-300">Clear completed</span>
      )}
    </div>
  );
}
