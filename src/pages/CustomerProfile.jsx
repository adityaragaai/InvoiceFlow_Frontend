import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, Building2, TrendingUp, DollarSign, Receipt } from 'lucide-react';
import { useCustomer } from '../hooks/useCustomers';
import StatusBadge from '../components/StatusBadge';
import { formatCurrency, formatDate, formatNumber } from '../utils/formatters';
import { ProfileSkeleton } from '../components/LoadingSkeleton';

const STATUS_PILL = {
  Paid:    { bg: 'bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/20', text: 'text-emerald-700 dark:text-emerald-400', dot: 'bg-emerald-500' },
  Unpaid:  { bg: 'bg-amber-50 dark:bg-amber-500/10 border-amber-200 dark:border-amber-500/20',       text: 'text-amber-700 dark:text-amber-400',     dot: 'bg-amber-500'   },
  Overdue: { bg: 'bg-red-50 dark:bg-red-500/10 border-red-200 dark:border-red-500/20',               text: 'text-red-700 dark:text-red-400',         dot: 'bg-red-500'     },
  Draft:   { bg: 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700',            text: 'text-slate-600 dark:text-slate-400',     dot: 'bg-slate-400'   },
  Sent:    { bg: 'bg-blue-50 dark:bg-blue-500/10 border-blue-200 dark:border-blue-500/20',           text: 'text-blue-700 dark:text-blue-400',       dot: 'bg-blue-500'    },
  Void:    { bg: 'bg-slate-800 border-slate-700',                                                     text: 'text-slate-300',                         dot: 'bg-slate-400'   },
};

const METRIC_ACCENT = {
  blue:   { border: '#3b82f6',  label: 'text-blue-600 dark:text-blue-400',   ghost: 'text-blue-400 dark:text-blue-500',   bar: 'bg-blue-400 dark:bg-blue-500' },
  green:  { border: '#10b981',  label: 'text-emerald-600 dark:text-emerald-400', ghost: 'text-emerald-400 dark:text-emerald-500', bar: 'bg-emerald-400 dark:bg-emerald-500' },
  red:    { border: '#ef4444',  label: 'text-red-500 dark:text-red-400',     ghost: 'text-red-400 dark:text-red-500',     bar: 'bg-red-400 dark:bg-red-500' },
  purple: { border: '#8b5cf6',  label: 'text-violet-600 dark:text-violet-400', ghost: 'text-violet-400 dark:text-violet-500', bar: 'bg-violet-400 dark:bg-violet-500' },
};

function MetricCard({ label, value, icon, color, index }) {
  const accent = METRIC_ACCENT[color] || METRIC_ACCENT.blue;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 + index * 0.06, duration: 0.35 }}
      className="card p-4 relative overflow-hidden"
      style={{ borderTop: `3px solid ${accent.border}` }}
    >
      {/* Ghost icon */}
      {icon && (
        <div className={`absolute right-2 bottom-2 pointer-events-none opacity-[0.09] dark:opacity-[0.06] ${accent.ghost}`}>
          <div className="w-10 h-10 [&>svg]:w-full [&>svg]:h-full">{icon}</div>
        </div>
      )}
      <div className="relative">
        <div className="flex items-center gap-1.5">
          {icon && (
            <div className={`w-3 h-3 shrink-0 [&>svg]:w-full [&>svg]:h-full ${accent.label}`}>{icon}</div>
          )}
          <p className={`text-[10px] font-bold uppercase tracking-widest ${accent.label}`}>{label}</p>
        </div>
        <p className="text-xl font-bold text-slate-900 dark:text-white mt-1.5 truncate">{value}</p>
        <div className="flex gap-1 mt-3">
          <div className={`h-[3px] rounded-full ${accent.bar} flex-[2]`} />
          <div className={`h-[3px] rounded-full ${accent.bar} opacity-55 flex-[3]`} />
          <div className={`h-[3px] rounded-full ${accent.bar} opacity-25 flex-1`} />
        </div>
      </div>
    </motion.div>
  );
}

function StatusPill({ status, count }) {
  const cfg = STATUS_PILL[status] || STATUS_PILL.Draft;
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-semibold border ${cfg.bg} ${cfg.text}`}>
      <span className={`w-2 h-2 rounded-full ${cfg.dot}`} />
      {status}
      <span className="font-bold opacity-70">({count || 0})</span>
    </span>
  );
}

export default function CustomerProfile() {
  const { id } = useParams();
  const { data, isLoading, isError, error } = useCustomer(id);

  if (isLoading) return <ProfileSkeleton />;

  if (isError) {
    return (
      <div className="card p-12 text-center">
        <p className="font-semibold text-slate-600 dark:text-slate-400">Failed to load customer</p>
        <p className="text-sm text-slate-400 mt-1">{error?.message}</p>
        <Link to="/invoices" className="btn-secondary mt-4 inline-flex">← Back to Invoices</Link>
      </div>
    );
  }

  const { customer, invoices = [], metrics = {} } = data?.data || {};
  const initials = customer?.name?.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2) || '?';

  const AVATAR_COLORS = [
    '#e11d48', '#db2777', '#9333ea', '#7c3aed',
    '#2563eb', '#0891b2', '#059669', '#d97706',
    '#ea580c', '#16a34a',
  ];
  const avatarColor = AVATAR_COLORS[
    (customer?.name || '').split('').reduce((acc, c) => acc + c.charCodeAt(0), 0) % AVATAR_COLORS.length
  ];

  return (
    <div className="space-y-4">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-sm">
        <Link to="/invoices" className="text-slate-400 dark:text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium">Invoices</Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-300 dark:text-slate-700" />
        <span className="font-semibold text-slate-700 dark:text-slate-300">Customer Profile</span>
      </nav>

      <div className="card overflow-hidden">
        {/* Profile header with gradient */}
        <div className="relative px-6 pt-6 pb-5 border-b border-slate-100 dark:border-slate-800"
          style={{ background: 'linear-gradient(135deg, rgba(59,130,246,0.04) 0%, rgba(99,102,241,0.03) 100%)' }}>
          <div className="absolute inset-0 dark:opacity-50"
            style={{ background: 'linear-gradient(135deg, rgba(59,130,246,0.06) 0%, rgba(99,102,241,0.04) 100%)' }} />

          <div className="relative flex items-center gap-4">
            {/* Avatar */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="w-16 h-16 rounded-full flex items-center justify-center text-xl font-semibold text-white shrink-0 ring-4 ring-white dark:ring-slate-900"
              style={{ backgroundColor: avatarColor, boxShadow: `0 4px 14px ${avatarColor}55` }}
            >
              {initials}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1, duration: 0.35 }}
            >
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">{customer?.name}</h2>
              <div className="flex items-center gap-1.5 mt-0.5">
                <Building2 className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" strokeWidth={1.8} />
                <span className="text-sm text-slate-500 dark:text-slate-400 font-medium">{customer?.company}</span>
                <span className="text-slate-300 dark:text-slate-700 text-xs">· 1:1</span>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* KPI cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <MetricCard label="Total billed"   value={formatCurrency(metrics.totalBilled)} color="blue"   icon={<DollarSign className="w-4 h-4" strokeWidth={2} />} index={0} />
            <MetricCard label="Total tax"      value={formatCurrency(metrics.totalTax)}    color="purple" icon={<TrendingUp className="w-4 h-4" strokeWidth={2} />} index={1} />
            <MetricCard label="Outstanding"    value={formatCurrency(metrics.outstanding)} color="red"    icon={<DollarSign className="w-4 h-4" strokeWidth={2} />} index={2} />
            <MetricCard label="# Invoices"     value={formatNumber(metrics.totalInvoices)} color="green"  icon={<Receipt className="w-4 h-4" strokeWidth={2} />}   index={3} />
          </div>

          {/* Status pills */}
          <div className="flex flex-wrap gap-2">
            {[
              { status: 'Paid',    count: metrics.paidCount },
              { status: 'Unpaid',  count: metrics.unpaidCount },
              { status: 'Overdue', count: metrics.overdueCount },
              { status: 'Draft',   count: metrics.draftCount },
              { status: 'Sent',    count: metrics.sentCount },
              { status: 'Void',    count: metrics.voidCount },
            ].map(({ status, count }) => (
              <StatusPill key={status} status={status} count={count} />
            ))}
          </div>

          {/* Invoice history */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3">Invoice history</h3>

            {invoices.length === 0 ? (
              <div className="text-center py-12 text-slate-400 dark:text-slate-600">
                <Receipt className="w-8 h-8 mx-auto mb-2 opacity-40" />
                <p className="text-sm">No invoices found</p>
              </div>
            ) : (
              <div className="rounded-2xl border border-slate-100 dark:border-slate-800 overflow-hidden">
                <table className="w-full text-sm table-fixed">
                  <colgroup>
                    <col className="w-[20%]" />
                    <col className="w-[17%]" />
                    <col className="w-[17%]" />
                    <col className="w-[16%]" />
                    <col className="w-[15%]" />
                    <col className="w-[15%]" />
                  </colgroup>
                  <thead className="bg-slate-100 dark:bg-slate-800/50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-500">Invoice</th>
                      <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-500">Amount</th>
                      <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-500">Total</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-500">Status</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-500 hidden sm:table-cell">Issued</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-500 hidden md:table-cell">Due</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                    {invoices.map((inv, i) => (
                      <motion.tr
                        key={inv._id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: i * 0.02, duration: 0.2 }}
                        className="hover:bg-blue-50/40 dark:hover:bg-blue-500/5 transition-colors"
                      >
                        <td className="px-4 py-3.5 font-mono text-xs text-slate-500 dark:text-slate-400 truncate">{inv.invoiceId}</td>
                        <td className="px-4 py-3.5 text-right font-semibold text-slate-700 dark:text-slate-300 tabular-nums">{formatCurrency(inv.amount)}</td>
                        <td className="px-4 py-3.5 text-right font-bold text-slate-900 dark:text-white tabular-nums">{formatCurrency(inv.total)}</td>
                        <td className="px-4 py-3.5"><StatusBadge status={inv.status} /></td>
                        <td className="px-4 py-3.5 text-xs text-slate-400 dark:text-slate-500 hidden sm:table-cell">{formatDate(inv.issueDate)}</td>
                        <td className="px-4 py-3.5 text-xs text-slate-400 dark:text-slate-500 hidden md:table-cell">{formatDate(inv.dueDate)}</td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
