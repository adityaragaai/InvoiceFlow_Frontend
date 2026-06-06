import { useState } from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, BarChart3, Menu, X, Moon, Sun, Bell, ChevronRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import powerplayLogo from '../assets/powerplay.avif';

const NAV_ITEMS = [
  { to: '/invoices', label: 'Invoices', Icon: FileText },
  { to: '/summary', label: 'Analytics', Icon: BarChart3 },
];

function SidebarNavItem({ item }) {
  const { to, label, Icon } = item;
  return (
    <NavLink to={to} className="block">
      {({ isActive }) => (
        <div className="relative">
          {isActive && (
            <motion.div
              layoutId="sidebar-pill"
              className="absolute inset-0 rounded-xl"
              style={{ background: 'linear-gradient(135deg, rgba(59,130,246,0.12), rgba(99,102,241,0.08))' }}
              transition={{ type: 'spring', stiffness: 380, damping: 32 }}
            />
          )}
          {isActive && (
            <motion.div
              layoutId="sidebar-bar"
              className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-r-full"
              style={{ background: 'linear-gradient(180deg, #3b82f6, #6366f1)' }}
              transition={{ type: 'spring', stiffness: 380, damping: 32 }}
            />
          )}
          <div
            className={`relative flex items-center gap-3 px-3 py-2.5 rounded-xl select-none transition-colors duration-150 ${
              isActive
                ? 'text-blue-700 dark:text-blue-400'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-white/5'
            }`}
          >
            <Icon
              className={`w-[18px] h-[18px] shrink-0 transition-all duration-150 ${
                isActive ? 'text-blue-600 dark:text-blue-400' : ''
              }`}
              strokeWidth={isActive ? 2.2 : 1.8}
            />
            <span className="text-sm font-medium">{label}</span>
          </div>
        </div>
      )}
    </NavLink>
  );
}

export default function MainLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  const currentPage =
    NAV_ITEMS.find((n) => location.pathname.startsWith(n.to))?.label ||
    (location.pathname.startsWith('/customers') ? 'Customer Profile' : 'Dashboard');

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-[#070b14] overflow-hidden">
      {/* Mobile backdrop */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={() => setMobileOpen(false)}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* ── Sidebar ────────────────────────────────────────── */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-50 flex flex-col w-64 shrink-0
          bg-white dark:bg-[#0d1117]
          border-r border-slate-100 dark:border-slate-800/60
          transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]
          ${mobileOpen ? 'translate-x-0 shadow-soft-xl' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-slate-100 dark:border-slate-800/60 shrink-0">
          <div className="flex items-center pl-2">
            <span className="text-[18px] font-bold text-slate-900 dark:text-white tracking-tight">
              Invoice<span className="text-blue-600 dark:text-blue-400">Flow</span>
            </span>
          </div>
          <button
            onClick={() => setMobileOpen(false)}
            className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
          <p className="px-3 pt-2 pb-2.5 text-[10px] font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-600">
            Menu
          </p>
          {NAV_ITEMS.map((item) => (
            <SidebarNavItem key={item.to} item={item} />
          ))}
        </nav>

        {/* Bottom — Powered by */}
        <div className="px-4 pt-4 pb-4 border-t border-slate-100 dark:border-slate-800/60 shrink-0 flex items-center justify-center">
          <div className="relative flex items-center justify-center">
            <p className="absolute top-5 left-1/2 -translate-x-1/2 z-10 text-[9px] text-slate-400 dark:text-slate-600 font-medium tracking-widest uppercase whitespace-nowrap">
              Powered by
            </p>
            <img
              src={powerplayLogo}
              alt="PowerPlay"
              className="h-24 w-auto object-contain opacity-90 dark:opacity-80 hover:opacity-100 transition-opacity duration-200 mt-4"
            />
          </div>
        </div>
      </aside>

      {/* ── Main content ──────────────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Topbar */}
        <header className="h-16 shrink-0 sticky top-0 z-30 flex items-center justify-between px-4 lg:px-6 glass border-b">
          <div className="flex items-center gap-3">
            {/* Mobile hamburger */}
            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2 rounded-xl text-slate-500 hover:text-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <Menu className="w-5 h-5" />
            </motion.button>

            {/* Breadcrumb — desktop */}
            <div className="hidden lg:flex items-center gap-2 text-sm">
              <span className="text-slate-400 dark:text-slate-600 font-medium">InvoiceFlow</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-300 dark:text-slate-700" />
              <span className="font-semibold text-slate-700 dark:text-slate-300">{currentPage}</span>
            </div>

            {/* Page title — mobile */}
            <span className="lg:hidden text-base font-bold text-slate-800 dark:text-white">{currentPage}</span>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-1">
            {/* Notification */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.93 }}
              className="relative p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <Bell className="w-[18px] h-[18px]" strokeWidth={1.8} />
              <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-blue-500 rounded-full ring-2 ring-white dark:ring-slate-900" />
            </motion.button>

            {/* Theme toggle */}
            <motion.button
              onClick={toggleTheme}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.93 }}
              className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <motion.div
                key={theme}
                initial={{ rotate: -30, opacity: 0, scale: 0.7 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                transition={{ duration: 0.22 }}
              >
                {theme === 'dark' ? (
                  <Sun className="w-[18px] h-[18px] text-amber-400" strokeWidth={1.8} />
                ) : (
                  <Moon className="w-[18px] h-[18px]" strokeWidth={1.8} />
                )}
              </motion.div>
            </motion.button>

            {/* Avatar */}
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center text-[11px] font-bold text-white cursor-pointer ml-1"
              style={{ background: 'linear-gradient(135deg, #3b82f6, #6366f1)', boxShadow: '0 2px 8px rgba(99,102,241,0.35)' }}
            >
              AD
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-hidden flex flex-col p-4 lg:p-6 min-h-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
