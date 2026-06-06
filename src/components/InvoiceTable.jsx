import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Edit2, Trash2, ArrowUpDown, ArrowUp, ArrowDown, ChevronRight, FileText } from 'lucide-react';
import StatusBadge from './StatusBadge';
import { formatCurrency, formatDate } from '../utils/formatters';
import { useDeleteInvoice } from '../hooks/useInvoices';
import { TableSkeleton } from './LoadingSkeleton';

const AVATAR_COLORS = [
  '#3b82f6', '#8b5cf6', '#ec4899', '#14b8a6',
  '#f59e0b', '#ef4444', '#10b981', '#f97316',
  '#6366f1', '#0891b2', '#e11d48', '#16a34a',
];

function avatarColor(name = '') {
  return AVATAR_COLORS[
    name.split('').reduce((a, c) => a + c.charCodeAt(0), 0) % AVATAR_COLORS.length
  ];
}

function Avatar({ name }) {
  const initials = name?.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2) || '?';
  return (
    <div
      className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold text-white shrink-0"
      style={{ backgroundColor: avatarColor(name) }}
    >
      {initials}
    </div>
  );
}

function SortBtn({ field, sortBy, order, onSort, children }) {
  const active = sortBy === field;
  return (
    <button
      onClick={() => onSort(field)}
      className={`inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider transition-colors ${
        active
          ? 'text-blue-600 dark:text-blue-400'
          : 'text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
      }`}
    >
      {children}
      {active
        ? order === 'asc'
          ? <ArrowUp className="w-3 h-3" />
          : <ArrowDown className="w-3 h-3" />
        : <ArrowUpDown className="w-3 h-3 opacity-40" />}
    </button>
  );
}

function HeaderCell({ children, className = '' }) {
  return (
    <th className={`px-4 py-4 text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-500 ${className}`}>
      {children}
    </th>
  );
}

export default function InvoiceTable({ invoices = [], loading, onEdit, sortBy, order, onSort }) {
  const navigate = useNavigate();
  const deleteMutation = useDeleteInvoice();
  const [deletingId, setDeletingId] = useState(null);
  const [confirmId, setConfirmId] = useState(null);
  const [hoveredId, setHoveredId] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    if (confirmId !== id) {
      setConfirmId(id);
      setTimeout(() => setConfirmId((c) => (c === id ? null : c)), 3000);
      return;
    }
    setDeletingId(id);
    try {
      await deleteMutation.mutateAsync(id);
    } finally {
      setDeletingId(null);
      setConfirmId(null);
    }
  };

  if (loading) return <TableSkeleton rows={10} />;

  if (!invoices.length) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4">
          <FileText className="w-8 h-8 text-slate-300 dark:text-slate-600" strokeWidth={1.5} />
        </div>
        <p className="font-semibold text-slate-600 dark:text-slate-400">No invoices found</p>
        <p className="text-sm text-slate-400 dark:text-slate-600 mt-1">Try adjusting your search or filters</p>
      </div>
    );
  }

  return (
    <div className="relative">
      <table className="w-full border-collapse">
        {/* ── Header ── */}
        <thead className="sticky top-0 z-10">
          <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-[#0d1117]">
            <HeaderCell className="text-left pl-5">Invoice</HeaderCell>
            <HeaderCell className="text-left">Customer</HeaderCell>
            <HeaderCell className="text-left hidden md:table-cell">Company</HeaderCell>
            <HeaderCell className="text-right">
              <SortBtn field="amount" sortBy={sortBy} order={order} onSort={onSort}>Amount</SortBtn>
            </HeaderCell>
            <HeaderCell className="text-right hidden lg:table-cell">Tax%</HeaderCell>
            <HeaderCell className="text-right">
              <div className="flex justify-end">
                <SortBtn field="total" sortBy={sortBy} order={order} onSort={onSort}>Total</SortBtn>
              </div>
            </HeaderCell>
            <HeaderCell className="text-left">Status</HeaderCell>
            <HeaderCell className="text-left hidden xl:table-cell">
              <SortBtn field="issueDate" sortBy={sortBy} order={order} onSort={onSort}>Issued</SortBtn>
            </HeaderCell>
            <HeaderCell className="text-left hidden xl:table-cell">
              <SortBtn field="dueDate" sortBy={sortBy} order={order} onSort={onSort}>Due date</SortBtn>
            </HeaderCell>
            <HeaderCell className="text-center">Actions</HeaderCell>
          </tr>
        </thead>

        {/* ── Body ── */}
        <tbody>
          {invoices.map((inv) => {
            const hovered = hoveredId === inv._id;
            const name = inv.customer?.name || '—';

            return (
              <tr
                key={inv._id}
                onMouseEnter={() => setHoveredId(inv._id)}
                onMouseLeave={() => setHoveredId(null)}
                onMouseMove={(e) => setMousePos({ x: e.clientX, y: e.clientY })}
                onClick={() => navigate(`/customers/${inv.customer?._id}`)}
                className={`
                  relative group/row cursor-pointer
                  border-b border-slate-50 dark:border-slate-800/50
                  transition-colors duration-100
                  ${hovered
                    ? 'bg-blue-50/70 dark:bg-blue-950/25'
                    : 'bg-white dark:bg-transparent'}
                `}
              >
                {/* Invoice ID + left accent bar */}
                <td className="relative pl-5 pr-4 py-4 whitespace-nowrap">
                  {/* Left blue bar */}
                  <span
                    className={`absolute left-0 top-0 bottom-0 w-[3px] rounded-r-full bg-blue-500 transition-all duration-150 ${
                      hovered ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                  <span className="font-mono text-[11px] text-slate-400 dark:text-slate-500">
                    {inv.invoiceId}
                  </span>
                </td>

                {/* Customer — avatar + name + tooltip */}
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="relative flex items-center gap-2.5">
                    <Avatar name={name} />
                    <span
                      className={`text-sm font-semibold transition-colors duration-100 ${
                        hovered
                          ? 'text-blue-600 dark:text-blue-400'
                          : 'text-slate-800 dark:text-slate-200'
                      }`}
                    >
                      {name}
                    </span>

                  </div>
                </td>

                {/* Company */}
                <td className="px-4 py-4 text-sm text-slate-500 dark:text-slate-400 hidden md:table-cell">
                  {inv.customer?.company || '—'}
                </td>

                {/* Amount */}
                <td className="px-4 py-4 text-right text-sm font-semibold text-slate-700 dark:text-slate-300 tabular-nums whitespace-nowrap">
                  {formatCurrency(inv.amount)}
                </td>

                {/* Tax % */}
                <td className="px-4 py-4 text-right text-xs text-slate-400 dark:text-slate-500 hidden lg:table-cell tabular-nums">
                  {inv.taxRate}%
                </td>

                {/* Total */}
                <td className="px-4 py-4 text-right text-sm font-bold text-slate-900 dark:text-white tabular-nums whitespace-nowrap">
                  {formatCurrency(inv.total)}
                </td>

                {/* Status */}
                <td className="px-4 py-4">
                  <StatusBadge status={inv.status} />
                </td>

                {/* Issue date */}
                <td className="px-4 py-4 text-xs text-slate-400 dark:text-slate-500 hidden xl:table-cell tabular-nums">
                  {formatDate(inv.issueDate)}
                </td>

                {/* Due date */}
                <td className="px-4 py-4 text-xs text-slate-400 dark:text-slate-500 hidden xl:table-cell tabular-nums">
                  {formatDate(inv.dueDate)}
                </td>

                {/* Actions */}
                <td className="px-4 py-4" onClick={(e) => e.stopPropagation()}>
                  <div className="flex items-center justify-center gap-1">
                    {/* Edit / Delete — visible on hover */}
                    <div className={`flex items-center gap-0.5 transition-opacity duration-150 ${hovered ? 'opacity-100' : 'opacity-0'}`}>
                      <button
                        onClick={(e) => { e.stopPropagation(); onEdit(inv); }}
                        title="Edit invoice"
                        className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-500/10 transition-all"
                      >
                        <Edit2 className="w-3.5 h-3.5" strokeWidth={1.8} />
                      </button>
                      <button
                        onClick={(e) => handleDelete(e, inv._id)}
                        disabled={deletingId === inv._id}
                        title={confirmId === inv._id ? 'Click again to confirm' : 'Delete invoice'}
                        className={`p-1.5 rounded-lg transition-all ${
                          confirmId === inv._id
                            ? 'bg-red-500 text-white hover:bg-red-600'
                            : 'text-slate-400 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10'
                        }`}
                      >
                        {deletingId === inv._id
                          ? <svg className="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
                          : <Trash2 className="w-3.5 h-3.5" strokeWidth={1.8} />
                        }
                      </button>
                    </div>

                    {/* Chevron — slides in on hover */}
                    <ChevronRight
                      className={`w-4 h-4 text-blue-400 transition-all duration-150 ${
                        hovered ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-1.5'
                      }`}
                      strokeWidth={2.5}
                    />
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Cursor-following tooltip */}
      <AnimatePresence>
        {hoveredId && (() => {
          const inv = invoices.find((i) => i._id === hoveredId);
          if (!inv) return null;
          return (
            <motion.div
              key="cursor-tip"
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.12 }}
              className="fixed z-[9999] pointer-events-none bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2"
              style={{
                left: mousePos.x + 16,
                top: mousePos.y + 16,
                boxShadow: '0 8px 24px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.06)',
              }}
            >
              <p className="text-xs font-semibold text-slate-800 dark:text-white whitespace-nowrap">
                Click to view customer profile
              </p>
              <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5 whitespace-nowrap">
                {inv.customer?.name}&nbsp;·&nbsp;{inv.invoiceId}
              </p>
            </motion.div>
          );
        })()}
      </AnimatePresence>
    </div>
  );
}
