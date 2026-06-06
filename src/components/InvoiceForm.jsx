import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Building2, DollarSign, Calendar, Tag, Loader2 } from 'lucide-react';
import { useCustomers } from '../hooks/useCustomers';
import { useCreateInvoice, useUpdateInvoice } from '../hooks/useInvoices';
import { STATUSES, TAX_RATES, formatCurrency } from '../utils/formatters';

const INITIAL = { customer: '', amount: '', taxRate: 18, status: 'Draft', issueDate: '', dueDate: '' };

export default function InvoiceForm({ invoice, onClose }) {
  const isEdit = !!invoice;
  const [form, setForm] = useState(INITIAL);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [search, setSearch] = useState('');
  const [dropdown, setDropdown] = useState(false);
  const [errors, setErrors] = useState({});

  const { data: customersData } = useCustomers({ search, limit: 20 });
  const customers = customersData?.data || [];
  const createM = useCreateInvoice();
  const updateM = useUpdateInvoice();
  const saving = createM.isPending || updateM.isPending;

  useEffect(() => {
    if (invoice) {
      setForm({
        customer: invoice.customer?._id || invoice.customer || '',
        amount: invoice.amount ?? '',
        taxRate: invoice.taxRate ?? 18,
        status: invoice.status || 'Draft',
        issueDate: invoice.issueDate ? invoice.issueDate.slice(0, 10) : '',
        dueDate: invoice.dueDate ? invoice.dueDate.slice(0, 10) : '',
      });
      if (invoice.customer) {
        setSelectedCustomer(invoice.customer);
        setSearch(invoice.customer.name || '');
      }
    }
  }, [invoice]);

  const tax = form.amount ? +((+form.amount * +form.taxRate) / 100).toFixed(2) : 0;
  const total = form.amount ? +((+form.amount + tax).toFixed(2)) : 0;

  const validate = () => {
    const e = {};
    if (!form.customer) e.customer = 'Required';
    if (!form.amount || +form.amount <= 0) e.amount = 'Must be > 0';
    if (!form.issueDate) e.issueDate = 'Required';
    if (!form.dueDate) e.dueDate = 'Required';
    if (form.issueDate && form.dueDate && form.dueDate < form.issueDate) e.dueDate = 'Must be after issue date';
    setErrors(e);
    return !Object.keys(e).length;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    const payload = { customer: form.customer, amount: +form.amount, taxRate: +form.taxRate, status: form.status, issueDate: form.issueDate, dueDate: form.dueDate };
    try {
      if (isEdit) await updateM.mutateAsync({ id: invoice._id, data: payload });
      else await createM.mutateAsync(payload);
      onClose();
    } catch (err) {
      setErrors({ submit: err.message });
    }
  };

  const selectCustomer = (c) => {
    setSelectedCustomer(c);
    setForm((f) => ({ ...f, customer: c._id }));
    setSearch(c.name);
    setDropdown(false);
  };

  return (
    <AnimatePresence>
      <motion.div
        key="modal-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/50 backdrop-blur-sm"
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <motion.div
          key="modal-content"
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.97 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="bg-white dark:bg-slate-900 w-full sm:max-w-lg rounded-t-3xl sm:rounded-2xl shadow-soft-xl overflow-hidden"
          style={{ maxHeight: '90vh' }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800 shrink-0">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                {isEdit ? 'Edit invoice' : 'New invoice'}
              </h2>
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
                {isEdit ? 'Update invoice details below' : 'Fill in the details to create an invoice'}
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.92 }}
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </motion.button>
          </div>

          {/* Body */}
          <div className="overflow-y-auto p-6 space-y-4" style={{ maxHeight: 'calc(90vh - 140px)' }}>
            <form onSubmit={handleSubmit} className="space-y-4">

              {/* Customer */}
              <div className="relative">
                <label className="label">Customer</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    className={`input pl-10 ${errors.customer ? 'border-red-400 focus:ring-red-400/30 focus:border-red-400' : ''}`}
                    placeholder="Search customers…"
                    value={search}
                    onChange={(e) => { setSearch(e.target.value); setDropdown(true); if (!e.target.value) { setSelectedCustomer(null); setForm((f) => ({ ...f, customer: '' })); } }}
                    onFocus={() => setDropdown(true)}
                  />
                </div>
                {errors.customer && <p className="text-xs text-red-500 mt-1">{errors.customer}</p>}

                <AnimatePresence>
                  {dropdown && customers.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: -6, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -6, scale: 0.97 }}
                      transition={{ duration: 0.15 }}
                      className="absolute z-10 w-full mt-1.5 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl shadow-soft-lg overflow-hidden max-h-44 overflow-y-auto"
                    >
                      {customers.map((c) => (
                        <button
                          key={c._id}
                          type="button"
                          className="w-full text-left px-3.5 py-2.5 hover:bg-blue-50 dark:hover:bg-slate-700 transition-colors"
                          onClick={() => selectCustomer(c)}
                        >
                          <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">{c.name}</p>
                          <p className="text-xs text-slate-400 dark:text-slate-500">{c.company}</p>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Company (auto-filled) */}
              <div>
                <label className="label">Company <span className="text-slate-400 font-normal">(auto-filled)</span></label>
                <div className="relative">
                  <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 dark:text-slate-600" />
                  <input
                    type="text"
                    className="input pl-10 bg-slate-50 dark:bg-slate-800/50 text-slate-400 dark:text-slate-500 cursor-not-allowed"
                    value={selectedCustomer?.company || ''}
                    readOnly
                    placeholder="Auto-filled from customer"
                  />
                </div>
              </div>

              {/* Amount + Tax */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="label">Amount</label>
                  <div className="relative">
                    <DollarSign className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="number" min="0" step="0.01"
                      className={`input pl-10 ${errors.amount ? 'border-red-400 focus:ring-red-400/30 focus:border-red-400' : ''}`}
                      placeholder="0.00"
                      value={form.amount}
                      onChange={(e) => setForm((f) => ({ ...f, amount: e.target.value }))}
                    />
                  </div>
                  {errors.amount && <p className="text-xs text-red-500 mt-1">{errors.amount}</p>}
                </div>
                <div>
                  <label className="label">Tax rate</label>
                  <div className="relative">
                    <Tag className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <select
                      className="input pl-10 appearance-none"
                      value={form.taxRate}
                      onChange={(e) => setForm((f) => ({ ...f, taxRate: +e.target.value }))}
                    >
                      {TAX_RATES.map((r) => <option key={r} value={r}>{r}%</option>)}
                    </select>
                  </div>
                </div>
              </div>

              {/* Dates */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="label">Issue date</label>
                  <div className="relative">
                    <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input type="date" className={`input pl-10 ${errors.issueDate ? 'border-red-400' : ''}`}
                      value={form.issueDate} onChange={(e) => setForm((f) => ({ ...f, issueDate: e.target.value }))} />
                  </div>
                  {errors.issueDate && <p className="text-xs text-red-500 mt-1">{errors.issueDate}</p>}
                </div>
                <div>
                  <label className="label">Due date</label>
                  <div className="relative">
                    <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input type="date" className={`input pl-10 ${errors.dueDate ? 'border-red-400' : ''}`}
                      value={form.dueDate} onChange={(e) => setForm((f) => ({ ...f, dueDate: e.target.value }))} />
                  </div>
                  {errors.dueDate && <p className="text-xs text-red-500 mt-1">{errors.dueDate}</p>}
                </div>
              </div>

              {/* Status */}
              <div>
                <label className="label">Status</label>
                <select className="input" value={form.status} onChange={(e) => setForm((f) => ({ ...f, status: e.target.value }))}>
                  {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              {/* Computed */}
              <div className="rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50 px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm">
                  <span className="text-slate-500 dark:text-slate-400">
                    Tax <span className="font-bold text-slate-700 dark:text-slate-200">{formatCurrency(tax)}</span>
                  </span>
                  <span className="text-slate-300 dark:text-slate-700">·</span>
                  <span className="text-slate-500 dark:text-slate-400">
                    Total <span className="font-bold text-slate-900 dark:text-white">{formatCurrency(total)}</span>
                  </span>
                </div>
                <span className="text-xs text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded-md">computed</span>
              </div>

              {errors.submit && (
                <div className="rounded-xl bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 px-4 py-3">
                  <p className="text-sm text-red-600 dark:text-red-400">{errors.submit}</p>
                </div>
              )}

              {/* Actions */}
              <div className="flex justify-end gap-2.5 pt-1">
                <button type="button" onClick={onClose} className="btn-secondary">Cancel</button>
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  type="submit"
                  disabled={saving}
                  className="btn-primary min-w-[120px]"
                >
                  {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                  {saving ? 'Saving…' : 'Save invoice'}
                </motion.button>
              </div>
            </form>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
