import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { formatCurrency } from '../utils/formatters';
import { TrendingUp } from 'lucide-react';

export default function TopCustomersChart({ customers = [], loading }) {
  if (loading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-center gap-4">
            <div className="shimmer h-4 rounded w-28 shrink-0" />
            <div className="flex-1 shimmer h-8 rounded-xl" style={{ width: `${90 - i * 14}%` }} />
            <div className="shimmer h-4 rounded w-16 shrink-0" />
          </div>
        ))}
      </div>
    );
  }

  if (!customers.length) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-slate-400 dark:text-slate-600">
        <TrendingUp className="w-8 h-8 mb-2 opacity-40" />
        <p className="text-sm">No customer data</p>
      </div>
    );
  }

  const max = customers[0]?.totalValue || 1;

  return (
    <div className="space-y-3">
      {customers.map((c, i) => {
        const pct = Math.round((c.totalValue / max) * 100);
        const barColors = [
          'from-blue-500 to-indigo-500',
          'from-blue-400 to-blue-600',
          'from-indigo-400 to-blue-500',
          'from-violet-400 to-indigo-500',
          'from-blue-300 to-indigo-400',
        ];

        return (
          <div key={c._id} className="flex items-center gap-3 group">
            {/* Rank */}
            <span className="text-xs font-bold text-slate-300 dark:text-slate-700 w-4 shrink-0 text-right">
              {i + 1}
            </span>

            {/* Name */}
            <div className="w-32 shrink-0 text-right">
              <Link
                to={`/customers/${c._id}`}
                className="text-sm font-semibold text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors truncate block"
              >
                {c.name}
              </Link>
              <p className="text-xs text-slate-400 dark:text-slate-500 truncate">{c.company}</p>
            </div>

            {/* Bar */}
            <div className="flex-1 min-w-0">
              <div className="relative h-8 bg-slate-100 dark:bg-slate-800 rounded-xl overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.max(pct, 6)}%` }}
                  transition={{ duration: 0.8, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className={`absolute inset-y-0 left-0 rounded-xl bg-gradient-to-r ${barColors[i]} flex items-center px-3`}
                >
                  <span className="text-xs font-semibold text-white whitespace-nowrap drop-shadow-sm">
                    {formatCurrency(c.totalValue)}
                  </span>
                </motion.div>
              </div>
            </div>

            {/* Invoice count */}
            <span className="text-xs font-medium text-slate-400 dark:text-slate-500 shrink-0 w-14 text-right">
              {c.invoiceCount} inv
            </span>
          </div>
        );
      })}
    </div>
  );
}
