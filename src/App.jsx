import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ThemeProvider } from './context/ThemeContext';
import SplashScreen from './components/SplashScreen';
import MainLayout from './layouts/MainLayout';
import Dashboard from './pages/Dashboard';
import CustomerProfile from './pages/CustomerProfile';
import Summary from './pages/Summary';

const pageVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.22, ease: 'easeOut' } },
  exit: { opacity: 0, y: -6, transition: { duration: 0.15 } },
};

function AnimatedPage({ children }) {
  return (
    <motion.div
      className="h-full overflow-y-auto"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {children}
    </motion.div>
  );
}

function AppRoutes() {
  const location = useLocation();
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Navigate to="/invoices" replace />} />
        <Route path="invoices" element={<AnimatedPage><Dashboard /></AnimatedPage>} />
        <Route path="summary" element={<AnimatedPage><Summary /></AnimatedPage>} />
        <Route path="customers/:id" element={<AnimatedPage><CustomerProfile /></AnimatedPage>} />
      </Route>
    </Routes>
  );
}

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setShowSplash(false), 2700);
    return () => clearTimeout(t);
  }, []);

  return (
    <ThemeProvider>
      <AnimatePresence>
        {showSplash && <SplashScreen key="splash" />}
      </AnimatePresence>
      <AppRoutes />
    </ThemeProvider>
  );
}
