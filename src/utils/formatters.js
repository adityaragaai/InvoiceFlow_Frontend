export const formatCurrency = (value) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 2 }).format(value || 0);

export const formatDate = (date) => {
  if (!date) return '-';
  return new Date(date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
};

export const formatNumber = (value) =>
  new Intl.NumberFormat('en-IN').format(value || 0);

export const STATUS_COLORS = {
  Paid: 'bg-green-100 text-green-800 border-green-200',
  Overdue: 'bg-red-100 text-red-800 border-red-200',
  Draft: 'bg-gray-100 text-gray-700 border-gray-200',
  Sent: 'bg-blue-100 text-blue-800 border-blue-200',
  Unpaid: 'bg-orange-100 text-orange-800 border-orange-200',
  Void: 'bg-slate-800 text-white border-slate-700',
};

export const STATUSES = ['Sent', 'Unpaid', 'Overdue', 'Paid', 'Void', 'Draft'];
export const TAX_RATES = [0, 3, 5, 18, 28];
