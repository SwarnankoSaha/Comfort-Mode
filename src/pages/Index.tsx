import { motion } from "framer-motion";
import { ComfortCards } from "@/components/ComfortCards";
import { ChocolateShelf } from "@/components/ChocolateShelf";
import { PlaylistGenerator } from "@/components/PlaylistGenerator";
import { FinaleScreen } from "@/components/FinaleScreen";
import { FloatingHearts } from "@/components/FloatingHearts";
import { Sparkles, Heart, Music, ShoppingBag } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden">
      {/* Ambient floating hearts */}
      <FloatingHearts />

      {/* Gradient overlay */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-accent/10" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
      </div>

      {/* Main content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-screen flex flex-col items-center justify-center px-4 py-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/20 to-accent/20 backdrop-blur-sm border border-primary/20 rounded-full px-6 py-3 mb-8"
            >
              <Sparkles className="w-5 h-5 text-primary animate-pulse" />
              <span className="text-sm font-medium bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                made just for you
              </span>
              <Heart className="w-4 h-4 text-accent animate-pulse" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-5xl md:text-7xl lg:text-8xl font-extrabold mb-6"
            >
              <span className="bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent">
                Comfort Mode
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-xl md:text-2xl text-muted-foreground font-handwritten mb-12"
            >
              because sometimes your body is rude and you deserve nice things ✨
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <a
                href="#comfort"
                className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-full shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 hover:-translate-y-1"
              >
                <Heart className="w-5 h-5 group-hover:scale-110 transition-transform" />
                Get Cozy
              </a>
              <a
                href="#chocolates"
                className="group inline-flex items-center gap-2 px-8 py-4 bg-background/50 backdrop-blur-sm border border-border/50 text-foreground rounded-full hover:bg-background/80 transition-all duration-300 hover:-translate-y-1"
              >
                <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform" />
                Browse Chocolates
              </a>
            </motion.div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex items-start justify-center p-2"
            >
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-1.5 h-3 bg-primary rounded-full"
              />
            </motion.div>
          </motion.div>
        </section>

        {/* Comfort Cards Section */}
        <section id="comfort" className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-2 mb-4">
                <Heart className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">Little Things</span>
              </div>
              <h2 className="text-3xl md:text-4xl text-foreground mb-4">
                Things I Wish I Could Do For You
              </h2>
              <p className="text-muted-foreground font-handwritten text-lg">
                tap to reveal the sweetness inside 💝
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="glass-card rounded-3xl p-8"
            >
              <ComfortCards />
            </motion.div>
          </div>
        </section>

        {/* Chocolate Section */}
        <section id="chocolates" className="py-20 px-4 bg-gradient-to-b from-transparent via-accent/5 to-transparent">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <div className="inline-flex items-center gap-2 bg-accent/10 rounded-full px-4 py-2 mb-4">
                <ShoppingBag className="w-4 h-4 text-accent" />
                <span className="text-sm font-medium text-accent">Survival Kit</span>
              </div>
              <h2 className="text-3xl md:text-4xl text-foreground mb-4">
                Chocolate Comfort Shelf 🍫
              </h2>
              <p className="text-muted-foreground font-handwritten text-lg">
                pick your weapons of mass relaxation
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="glass-card rounded-3xl p-8"
            >
              <ChocolateShelf />
            </motion.div>
          </div>
        </section>

        {/* Playlist Section */}
        <section id="playlist" className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-2 mb-4">
                <Music className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">Mood Music</span>
              </div>
              <h2 className="text-3xl md:text-4xl text-foreground mb-4">
                Comfort Playlist Generator 🎧
              </h2>
              <p className="text-muted-foreground font-handwritten text-lg">
                choose your emotional state, get the perfect tunes
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="glass-card rounded-3xl p-8"
            >
              <PlaylistGenerator />
            </motion.div>
          </div>
        </section>

        {/* Finale Section */}
        <section className="py-20 px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <FinaleScreen />
          </motion.div>
        </section>

        {/* Footer */}
        <footer className="py-12 text-center border-t border-border/20">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-muted-foreground font-handwritten text-lg"
          >
            made with 💗 and probably too much caffeine
          </motion.p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
