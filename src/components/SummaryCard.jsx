import { motion } from 'framer-motion';

const ACCENT = {
  blue: {
    border: '#3b82f6',
    label: 'text-blue-600 dark:text-blue-400',
    bar: 'bg-blue-400 dark:bg-blue-500',
    ghost: 'text-blue-400 dark:text-blue-500',
  },
  green: {
    border: '#10b981',
    label: 'text-emerald-600 dark:text-emerald-400',
    bar: 'bg-emerald-400 dark:bg-emerald-500',
    ghost: 'text-emerald-400 dark:text-emerald-500',
  },
  red: {
    border: '#ef4444',
    label: 'text-red-500 dark:text-red-400',
    bar: 'bg-red-400 dark:bg-red-500',
    ghost: 'text-red-400 dark:text-red-500',
  },
  orange: {
    border: '#f59e0b',
    label: 'text-amber-500 dark:text-amber-400',
    bar: 'bg-amber-400 dark:bg-amber-500',
    ghost: 'text-amber-400 dark:text-amber-500',
  },
  purple: {
    border: '#8b5cf6',
    label: 'text-violet-600 dark:text-violet-400',
    bar: 'bg-violet-400 dark:bg-violet-500',
    ghost: 'text-violet-400 dark:text-violet-500',
  },
  gray: {
    border: '#94a3b8',
    label: 'text-slate-500 dark:text-slate-400',
    bar: 'bg-slate-300 dark:bg-slate-600',
    ghost: 'text-slate-300 dark:text-slate-600',
  },
};

export default function SummaryCard({ title, value, icon, color = 'blue', subtitle, index = 0 }) {
  const accent = ACCENT[color] || ACCENT.blue;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.07, ease: 'easeOut' }}
      whileHover={{ y: -2, transition: { duration: 0.2 } }}
      className="card p-5 group cursor-default relative overflow-hidden"
      style={{ borderTop: `3px solid ${accent.border}` }}
    >
      {/* Ghost icon — large, faint, bottom-right */}
      <div className={`absolute right-3 bottom-3 pointer-events-none opacity-[0.09] dark:opacity-[0.06] ${accent.ghost}`}>
        <div className="w-14 h-14 [&>svg]:w-full [&>svg]:h-full">
          {icon}
        </div>
      </div>

      <div className="relative">
        {/* Label row — small icon + colored uppercase text */}
        <div className="flex items-center gap-1.5">
          <div className={`w-3.5 h-3.5 shrink-0 [&>svg]:w-full [&>svg]:h-full ${accent.label}`}>
            {icon}
          </div>
          <p className={`text-[10px] font-bold uppercase tracking-widest ${accent.label}`}>
            {title}
          </p>
        </div>

        {/* Value */}
        <p className="text-[1.65rem] font-bold text-slate-900 dark:text-white mt-2 leading-tight truncate">
          {value}
        </p>

        {/* Subtitle */}
        {subtitle && (
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{subtitle}</p>
        )}

        {/* Colored segment bars */}
        <div className="flex gap-1 mt-4">
          <div className={`h-[3px] rounded-full ${accent.bar} flex-[2]`} />
          <div className={`h-[3px] rounded-full ${accent.bar} opacity-55 flex-[3]`} />
          <div className={`h-[3px] rounded-full ${accent.bar} opacity-30 flex-1`} />
          <div className={`h-[3px] rounded-full ${accent.bar} opacity-15 flex-[1.5]`} />
        </div>
      </div>
    </motion.div>
  );
}
