import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { DollarSign, Receipt, Users, Calculator, CheckCircle2, AlertCircle, Clock, FileEdit, Send, Ban } from 'lucide-react';
import { useSummary, useTopCustomers } from '../hooks/useDashboard';
import SummaryCard from '../components/SummaryCard';
import TopCustomersChart from '../components/TopCustomersChart';
import { formatCurrency, formatNumber } from '../utils/formatters';
import { CardSkeleton } from '../components/LoadingSkeleton';

function useCountUp(target, duration = 1200) {
  const [value, setValue] = useState(0);
  const raf = useRef(null);

  useEffect(() => {
    if (!target) return;
    const start = performance.now();
    const animate = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(eased * target));
      if (p < 1) raf.current = requestAnimationFrame(animate);
    };
    raf.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf.current);
  }, [target, duration]);

  return value;
}

function AnimatedCount({ value }) {
  const count = useCountUp(value);
  return <>{formatNumber(count)}</>;
}

export default function Summary() {
  const { data: summaryData, isLoading: summaryLoading } = useSummary();
  const { data: topData, isLoading: topLoading } = useTopCustomers();

  const s = summaryData?.data || {};
  const topCustomers = topData?.data || [];

  const mainCards = [
    { title: 'Total billed', value: formatCurrency(s.totalBilled), color: 'blue', icon: <DollarSign className="w-5 h-5" /> },
    { title: 'Total tax',    value: formatCurrency(s.totalTax),    color: 'purple', icon: <Calculator className="w-5 h-5" /> },
    { title: '# Invoices',  value: <AnimatedCount value={s.totalInvoices} />, color: 'gray', icon: <Receipt className="w-5 h-5" /> },
    { title: '# Customers', value: <AnimatedCount value={s.totalCustomers} />, color: 'green', icon: <Users className="w-5 h-5" /> },
  ];

  const statusCards = [
    { title: 'Paid',    value: <AnimatedCount value={s.paidInvoices} />,    color: 'green',  icon: <CheckCircle2 className="w-5 h-5" /> },
    { title: 'Overdue', value: <AnimatedCount value={s.overdueInvoices} />, color: 'red',    icon: <AlertCircle className="w-5 h-5" /> },
    { title: 'Unpaid',  value: <AnimatedCount value={s.unpaidInvoices} />,  color: 'orange', icon: <Clock className="w-5 h-5" /> },
    { title: 'Sent',    value: <AnimatedCount value={s.sentInvoices} />,    color: 'blue',   icon: <Send className="w-5 h-5" /> },
    { title: 'Draft',   value: <AnimatedCount value={s.draftInvoices} />,   color: 'gray',   icon: <FileEdit className="w-5 h-5" /> },
    { title: 'Void',    value: <AnimatedCount value={s.voidInvoices} />,    color: 'gray',   icon: <Ban className="w-5 h-5" /> },
  ];

  return (
    <div className="space-y-6">
      {/* Page title */}
      <div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Analytics & Summary</h2>
        <p className="text-sm text-slate-400 dark:text-slate-500 mt-0.5">Overview of all invoice activity</p>
      </div>

      {/* Main KPIs */}
      <section>
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-600 mb-3">Key metrics</p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {summaryLoading
            ? Array.from({ length: 4 }).map((_, i) => <CardSkeleton key={i} />)
            : mainCards.map((c, i) => <SummaryCard key={c.title} index={i} {...c} />)}
        </div>
      </section>

      {/* Status breakdown */}
      <section>
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-600 mb-3">By status</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {summaryLoading
            ? Array.from({ length: 6 }).map((_, i) => <CardSkeleton key={i} />)
            : statusCards.map((c, i) => <SummaryCard key={c.title} index={i + 4} {...c} />)}
        </div>
      </section>

      {/* Top customers */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.4 }}
        className="card p-6"
      >
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Top customers by value</h3>
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">Ranked by total invoice value</p>
          </div>
          <div className="px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-blue-500/10 text-xs font-semibold text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-500/20">
            Top 5
          </div>
        </div>
        <TopCustomersChart customers={topCustomers} loading={topLoading} />
      </motion.section>
    </div>
  );
}
