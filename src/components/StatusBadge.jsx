const CONFIG = {
  Paid:    { dot: 'bg-emerald-500', cls: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20' },
  Overdue: { dot: 'bg-red-500',     cls: 'bg-red-50 text-red-700 border-red-200 dark:bg-red-500/10 dark:text-red-400 dark:border-red-500/20' },
  Draft:   { dot: 'bg-slate-400',   cls: 'bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700' },
  Sent:    { dot: 'bg-blue-500',    cls: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20' },
  Unpaid:  { dot: 'bg-amber-500',   cls: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20' },
  Void:    { dot: 'bg-slate-200',   cls: 'bg-slate-800 text-slate-200 border-slate-700 dark:bg-slate-700 dark:text-slate-300 dark:border-slate-600' },
};

export default function StatusBadge({ status }) {
  const { dot, cls } = CONFIG[status] || { dot: 'bg-gray-400', cls: 'bg-gray-100 text-gray-600 border-gray-200' };
  return (
    <span className={`status-badge ${cls}`}>
      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${dot}`} />
      {status}
    </span>
  );
}
