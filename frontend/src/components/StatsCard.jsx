import { motion, AnimatePresence } from "framer-motion";

export default function StatsCard({ label, value }) {
  return (
    <div className="stats-card">
      <h4>{label}</h4>
      <AnimatePresence mode="wait">
        <motion.p
          key={value}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.3 }}
        >
          {value}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}
