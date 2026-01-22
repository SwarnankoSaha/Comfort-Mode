import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";

const comfortMessages = [
  {
    id: 1,
    text: "Warm your hands because your blood circulation retired.",
    emoji: "🧤",
  },
  {
    id: 2,
    text: "Buy you chocolates knowing you'll inhale them like oxygen.",
    emoji: "🍫",
  },
  {
    id: 3,
    text: "Hold you so your uterus stops acting like it pays rent.",
    emoji: "🤗",
  },
  {
    id: 4,
    text: "Give you a blanket and zero productivity expectations.",
    emoji: "🛋️",
  },
  {
    id: 5,
    text: "Listen to your rant because you're right 93% of the time.",
    emoji: "👂",
  },
  {
    id: 6,
    text: "Let you emotionally bully me (limited period offer™).",
    emoji: "😤",
  },
  {
    id: 7,
    text: "Just be there. Apparently, that works.",
    emoji: "💗",
  },
];

const cardColors = [
  "bg-peach",
  "bg-lavender",
  "bg-blush",
  "bg-cream",
  "bg-mint",
  "bg-peach",
  "bg-lavender",
];

export const ComfortCards = () => {
  const [revealedCards, setRevealedCards] = useState<Set<number>>(new Set());

  const toggleCard = (id: number) => {
    setRevealedCards((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <section className="w-full">
      <div className="flex items-center gap-2 mb-6">
        <Heart className="w-5 h-5 text-primary" />
        <h2 className="text-xl md:text-2xl text-foreground">
          Things I Wish I Could Do For You Today
        </h2>
      </div>
      <p className="text-muted-foreground mb-6 font-handwritten text-lg">
        tap to reveal ✨
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {comfortMessages.map((card, index) => (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
            onClick={() => toggleCard(card.id)}
            className={`
              relative cursor-pointer rounded-2xl p-6 min-h-[160px]
              ${cardColors[index]} shadow-soft
              transition-all duration-300 hover:shadow-glow
              flex items-center justify-center
            `}
            whileHover={{ scale: 1.02, y: -4 }}
            whileTap={{ scale: 0.98 }}
          >
            <AnimatePresence mode="wait">
              {!revealedCards.has(card.id) ? (
                <motion.div
                  key="hidden"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8, rotate: 10 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="flex flex-col items-center gap-3"
                >
                  <Sparkles className="w-8 h-8 text-primary animate-pulse-soft" />
                  <span className="text-sm font-medium text-muted-foreground">
                    Tap me
                  </span>
                </motion.div>
              ) : (
                <motion.div
                  key="revealed"
                  initial={{ opacity: 0, scale: 0.5, rotateY: 90 }}
                  animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  className="text-center"
                >
                  <span className="text-4xl mb-3 block">{card.emoji}</span>
                  <p className="text-sm md:text-base font-medium text-foreground leading-relaxed">
                    {card.text}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
