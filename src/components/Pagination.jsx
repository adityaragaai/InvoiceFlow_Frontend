import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Pagination({ page, pages, total, limit, onPageChange }) {
  const from = total === 0 ? 0 : (page - 1) * limit + 1;
  const to = Math.min(page * limit, total);

  const getPages = () => {
    const delta = 1;
    const range = [];
    const out = [];
    let last;
    for (let i = 1; i <= pages; i++) {
      if (i === 1 || i === pages || Math.abs(i - page) <= delta) range.push(i);
    }
    for (const i of range) {
      if (last && i - last > 1) out.push('…');
      out.push(i);
      last = i;
    }
    return out;
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <p className="text-sm text-slate-500 dark:text-slate-400">
        {total === 0 ? (
          'No results'
        ) : (
          <>
            Showing{' '}
            <span className="font-semibold text-slate-700 dark:text-slate-300">{from.toLocaleString()}–{to.toLocaleString()}</span>
            {' '}of{' '}
            <span className="font-semibold text-slate-700 dark:text-slate-300">{total.toLocaleString()}</span>
          </>
        )}
      </p>

      {pages > 1 && (
        <div className="flex items-center gap-1">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => onPageChange(page - 1)}
            disabled={page <= 1}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </motion.button>

          {getPages().map((p, i) =>
            p === '…' ? (
              <span key={`d${i}`} className="w-8 h-8 flex items-center justify-center text-slate-400 text-sm">
                …
              </span>
            ) : (
              <motion.button
                key={p}
                whileTap={{ scale: 0.9 }}
                onClick={() => onPageChange(p)}
                className={`w-8 h-8 rounded-xl text-sm font-medium transition-all duration-150 ${
                  p === page
                    ? 'text-white shadow-blue-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
                style={p === page ? { background: 'linear-gradient(135deg, #2563eb, #6366f1)' } : {}}
              >
                {p}
              </motion.button>
            )
          )}

          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => onPageChange(page + 1)}
            disabled={page >= pages}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </motion.button>
        </div>
      )}
    </div>
  );
}
