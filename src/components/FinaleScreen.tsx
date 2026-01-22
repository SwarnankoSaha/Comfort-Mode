import { motion } from "framer-motion";
import { Heart, Droplets } from "lucide-react";

export const FinaleScreen = () => {
  return (
    <section className="w-full relative overflow-hidden">
      {/* Floating Hearts Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-primary/20"
            initial={{
              x: Math.random() * 100 + "%",
              y: "100%",
              scale: 0.5 + Math.random() * 0.5,
            }}
            animate={{
              y: "-20%",
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: i * 1.5,
              ease: "easeOut",
            }}
          >
            <Heart className="w-6 h-6 fill-current" />
          </motion.div>
        ))}
      </div>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="glass-card rounded-3xl p-8 md:p-12 text-center relative z-10"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/20 flex items-center justify-center"
        >
          <Heart className="w-10 h-10 text-primary fill-primary" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-xl md:text-2xl lg:text-3xl text-foreground mb-4 leading-relaxed"
        >
          Can't fight your uterus,
          <br />
          <span className="text-gradient">but I can make today less annoying.</span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 inline-flex items-center gap-2 bg-secondary/50 rounded-xl px-4 py-3"
        >
          <Droplets className="w-5 h-5 text-accent-foreground" />
          <p className="text-sm md:text-base font-medium text-foreground">
            PS: Hydration is mandatory. These are the rules.
          </p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-6 text-muted-foreground font-handwritten text-xl"
        >
          💗 take care of yourself today 💗
        </motion.p>
      </motion.div>
    </section>
  );
};
