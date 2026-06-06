import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, SlidersHorizontal, X, ChevronDown } from 'lucide-react';
import { useInvoices } from '../hooks/useInvoices';
import InvoiceTable from '../components/InvoiceTable';
import InvoiceForm from '../components/InvoiceForm';
import Pagination from '../components/Pagination';
import { STATUSES, TAX_RATES } from '../utils/formatters';

const LIMIT = 20;

function FilterChip({ label, value, onClear }) {
  if (!value) return null;
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.85 }}
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 text-xs font-medium border border-blue-200 dark:border-blue-500/20"
    >
      <span className="text-blue-400 dark:text-blue-500 font-normal">{label}:</span> {value}
      <button onClick={onClear} className="hover:text-blue-900 dark:hover:text-blue-200 transition-colors ml-0.5">
        <X className="w-3 h-3" />
      </button>
    </motion.span>
  );
}

export default function Dashboard() {
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState('createdAt');
  const [order, setOrder] = useState('desc');
  const [filters, setFilters] = useState({ search: '', status: '', taxRate: '', issueDateFrom: '', issueDateTo: '', dueDateFrom: '', dueDateTo: '' });
  const [searchInput, setSearchInput] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingInvoice, setEditingInvoice] = useState(null);
  const [showDateFilters, setShowDateFilters] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => { setFilters((f) => ({ ...f, search: searchInput })); setPage(1); }, 400);
    return () => clearTimeout(t);
  }, [searchInput]);

  const queryParams = { page, limit: LIMIT, sortBy, order, ...Object.fromEntries(Object.entries(filters).filter(([, v]) => v !== '')) };
  const { data, isLoading, isError, error } = useInvoices(queryParams);
  const invoices = data?.data || [];
  const pagination = data?.pagination || {};

  const handleSort = (field) => {
    if (sortBy === field) setOrder((o) => (o === 'asc' ? 'desc' : 'asc'));
    else { setSortBy(field); setOrder('desc'); }
    setPage(1);
  };

  const setFilter = (key, value) => { setFilters((f) => ({ ...f, [key]: value })); setPage(1); };

  const clearAll = () => { setFilters({ search: '', status: '', taxRate: '', issueDateFrom: '', issueDateTo: '', dueDateFrom: '', dueDateTo: '' }); setSearchInput(''); setPage(1); };

  const hasFilters = Object.values(filters).some(Boolean);
  const activeChips = [
    filters.status && { label: 'Status', value: filters.status, key: 'status' },
    filters.taxRate !== '' && filters.taxRate !== undefined && { label: 'Tax', value: `${filters.taxRate}%`, key: 'taxRate' },
    filters.issueDateFrom && { label: 'Issue from', value: filters.issueDateFrom, key: 'issueDateFrom' },
    filters.issueDateTo && { label: 'Issue to', value: filters.issueDateTo, key: 'issueDateTo' },
    filters.dueDateFrom && { label: 'Due from', value: filters.dueDateFrom, key: 'dueDateFrom' },
    filters.dueDateTo && { label: 'Due to', value: filters.dueDateTo, key: 'dueDateTo' },
  ].filter(Boolean);

  return (
    <div className="flex flex-col h-full gap-4 min-h-0">
      {/* ── Filter panel ──────────────────────────────────── */}
      <div className="card p-4 space-y-3 shrink-0">
        {/* Row 1: search + filters + new button */}
        <div className="flex flex-wrap gap-2 items-center">
          {/* Search */}
          <div className="relative flex-1 min-w-56">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              className="input pl-10 h-9 text-sm"
              placeholder="Search invoice / customer…"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            {searchInput && (
              <button onClick={() => setSearchInput('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Status */}
          <div className="relative min-w-[120px]">
            <select
              className="input h-9 pr-8 text-sm appearance-none cursor-pointer"
              value={filters.status}
              onChange={(e) => setFilter('status', e.target.value)}
            >
              <option value="">Status</option>
              {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
            <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
          </div>

          {/* Tax rate */}
          <div className="relative min-w-[120px]">
            <select
              className="input h-9 pr-8 text-sm appearance-none cursor-pointer"
              value={filters.taxRate}
              onChange={(e) => setFilter('taxRate', e.target.value)}
            >
              <option value="">Tax rate</option>
              {TAX_RATES.map((r) => <option key={r} value={r}>{r}%</option>)}
            </select>
            <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
          </div>

          {/* Date toggle */}
          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={() => setShowDateFilters((v) => !v)}
            className={`btn-secondary h-9 text-sm gap-1.5 ${showDateFilters ? 'border-blue-300 bg-blue-50 text-blue-700 dark:border-blue-500/30 dark:bg-blue-500/10 dark:text-blue-400' : ''}`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            Date filters
          </motion.button>

          {hasFilters && (
            <button onClick={clearAll} className="btn-ghost h-9 text-sm">
              Clear all
            </button>
          )}

          {/* Spacer */}
          <div className="flex-1" />

          {/* New invoice */}
          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={() => { setEditingInvoice(null); setShowForm(true); }}
            className="btn-primary h-9"
          >
            <Plus className="w-4 h-4" />
            New invoice
          </motion.button>
        </div>

        {/* Date filter row */}
        {showDateFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="grid sm:grid-cols-2 gap-3 pt-1 pb-0.5 border-t border-slate-100 dark:border-slate-800"
          >
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Issue date range</p>
              <div className="flex items-center gap-2">
                <input type="date" className="input h-8 text-xs flex-1" value={filters.issueDateFrom} onChange={(e) => setFilter('issueDateFrom', e.target.value)} />
                <span className="text-slate-300 dark:text-slate-600 text-xs">→</span>
                <input type="date" className="input h-8 text-xs flex-1" value={filters.issueDateTo} onChange={(e) => setFilter('issueDateTo', e.target.value)} />
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Due date range</p>
              <div className="flex items-center gap-2">
                <input type="date" className="input h-8 text-xs flex-1" value={filters.dueDateFrom} onChange={(e) => setFilter('dueDateFrom', e.target.value)} />
                <span className="text-slate-300 dark:text-slate-600 text-xs">→</span>
                <input type="date" className="input h-8 text-xs flex-1" value={filters.dueDateTo} onChange={(e) => setFilter('dueDateTo', e.target.value)} />
              </div>
            </div>
          </motion.div>
        )}

        {/* Active filter chips */}
        {activeChips.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-0.5">
            {activeChips.map((chip) => (
              <FilterChip key={chip.key} label={chip.label} value={chip.value} onClear={() => setFilter(chip.key, '')} />
            ))}
          </div>
        )}
      </div>

      {/* ── Table ─────────────────────────────────────────── */}
      <div className="card overflow-hidden flex flex-col flex-1 min-h-0">
        {isError ? (
          <div className="p-12 text-center">
            <div className="w-12 h-12 rounded-2xl bg-red-50 dark:bg-red-500/10 flex items-center justify-center mx-auto mb-3">
              <X className="w-6 h-6 text-red-400" />
            </div>
            <p className="font-semibold text-slate-700 dark:text-slate-300">Failed to load invoices</p>
            <p className="text-sm text-slate-400 mt-1">{error?.message}</p>
          </div>
        ) : (
          <>
            <div className="flex-1 min-h-0 overflow-auto">
              <InvoiceTable invoices={invoices} loading={isLoading} onEdit={(inv) => { setEditingInvoice(inv); setShowForm(true); }} sortBy={sortBy} order={order} onSort={handleSort} />
            </div>
            <div className="px-4 py-3.5 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/20 shrink-0">
              <Pagination page={pagination.page || 1} pages={pagination.pages || 1} total={pagination.total || 0} limit={LIMIT} onPageChange={setPage} />
            </div>
          </>
        )}
      </div>

      {/* Modal */}
      {showForm && <InvoiceForm invoice={editingInvoice} onClose={() => { setShowForm(false); setEditingInvoice(null); }} />}
    </div>
  );
}
