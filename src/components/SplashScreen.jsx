import { motion } from 'framer-motion';

export default function SplashScreen() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.03 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center overflow-hidden"
      style={{ background: 'linear-gradient(145deg, #060917 0%, #0c1a3a 35%, #12063a 65%, #060917 100%)' }}
    >
      {/* Radial glows */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full opacity-30"
          style={{ background: 'radial-gradient(circle, #3b82f6, transparent 65%)' }}
        />
        <div
          className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full opacity-25"
          style={{ background: 'radial-gradient(circle, #7c3aed, transparent 65%)' }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full opacity-10"
          style={{ background: 'radial-gradient(ellipse, #6366f1, transparent 70%)' }}
        />
      </div>

      {/* Subtle grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
          backgroundSize: '52px 52px',
        }}
      />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center gap-8">
        {/* Brand name */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          className="text-center"
        >
          <h1 className="text-6xl font-bold tracking-tight text-white leading-none">
            Invoice
            <span
              style={{
                background: 'linear-gradient(135deg, #60a5fa 0%, #a78bfa 50%, #818cf8 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Flow
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.55, duration: 0.6 }}
            className="mt-3 text-sm font-medium tracking-[0.2em] uppercase"
            style={{ color: 'rgba(148,163,184,0.7)' }}
          >
            Track · Invoice · Get Paid
          </motion.p>
        </motion.div>

        {/* Progress bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="w-56"
        >
          <div className="h-[2px] rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 2.0, ease: [0.22, 1, 0.36, 1], delay: 0.8 }}
              style={{
                height: '100%',
                background: 'linear-gradient(90deg, #3b82f6, #7c3aed, #a78bfa)',
                transformOrigin: 'left',
                borderRadius: 9999,
              }}
            />
          </div>

          {/* Bouncing dots */}
          <div className="flex items-center justify-center gap-2 mt-5">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{ y: [0, -5, 0], opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1, repeat: Infinity, delay: i * 0.18, ease: 'easeInOut' }}
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: i === 0 ? '#60a5fa' : i === 1 ? '#818cf8' : '#a78bfa' }}
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 text-xs tracking-widest uppercase"
        style={{ color: 'rgba(148,163,184,0.3)' }}
      >
        Powered by PowerPlay
      </motion.p>
    </motion.div>
  );
}
