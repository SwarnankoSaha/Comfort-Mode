import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export const FloatingHearts = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: `${5 + (i * 8)}%`,
          }}
          initial={{
            y: "110vh",
            opacity: 0,
            scale: 0.3 + Math.random() * 0.4,
            rotate: -20 + Math.random() * 40,
          }}
          animate={{
            y: "-10vh",
            opacity: [0, 0.3, 0.3, 0],
            rotate: [-20, 20, -20],
          }}
          transition={{
            duration: 15 + Math.random() * 10,
            repeat: Infinity,
            delay: i * 2,
            ease: "linear",
          }}
        >
          <Heart 
            className="text-primary/20 fill-primary/10" 
            style={{ 
              width: `${16 + Math.random() * 16}px`,
              height: `${16 + Math.random() * 16}px`,
            }}
          />
        </motion.div>
      ))}
    </div>
  );
};
