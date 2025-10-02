import { useState, useEffect } from "react";
import { Leaf } from "lucide-react";
import { motion } from "framer-motion";

interface CarbonCounterProps {
  carbonSaved?: number;
  animated?: boolean;
}

const CarbonCounter = ({ carbonSaved = 15420, animated = true }: CarbonCounterProps) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!animated) {
      setDisplayValue(carbonSaved);
      return;
    }

    let start = 0;
    const duration = 2000;
    const increment = carbonSaved / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= carbonSaved) {
        setDisplayValue(carbonSaved);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [carbonSaved, animated]);

  return (
    <motion.div 
      className="inline-flex items-center gap-2 px-4 py-2 bg-success/10 rounded-full border border-success/20"
      initial={animated ? { scale: 0.9, opacity: 0 } : {}}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Leaf className="h-4 w-4 text-success" />
      <span className="text-sm font-semibold text-success">
        {displayValue.toLocaleString()} kg CO₂ saved
      </span>
    </motion.div>
  );
};

export default CarbonCounter;
