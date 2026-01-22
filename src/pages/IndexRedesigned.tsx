import { motion } from "framer-motion";
import { ComfortCards } from "@/components/ComfortCards";
import { ChocolateShelf } from "@/components/ChocolateShelf";
import { ComfortMusicGenerator } from "@/components/ComfortMusicGenerator";
import { FloatingHearts } from "@/components/FloatingHearts";
import { 
  Sparkles, 
  Heart, 
  Music, 
  ShoppingBag, 
  Moon, 
  Sun,
  Coffee,
  Cookie,
  Headphones,
  Home,
  User
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const Index = () => {
  const [activeSection, setActiveSection] = useState("home");

  const navigationItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "comfort", label: "Comfort", icon: Heart },
    { id: "chocolates", label: "Chocolates", icon: Cookie },
    { id: "music", label: "Music", icon: Headphones },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-br from-rose-200/30 to-pink-200/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-32 right-16 w-48 h-48 bg-gradient-to-br from-purple-200/30 to-blue-200/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-gradient-to-br from-yellow-200/20 to-orange-200/20 rounded-full blur-2xl animate-pulse delay-500"></div>
        <div className="absolute top-3/4 right-1/3 w-24 h-24 bg-gradient-to-br from-green-200/20 to-teal-200/20 rounded-full blur-xl animate-pulse delay-1500"></div>
      </div>

      {/* Floating Hearts */}
      <FloatingHearts />

      {/* Navigation Header */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-white/20 shadow-lg"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-gradient-to-br from-rose-400 to-pink-400 shadow-lg">
                <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-foreground">
                  Period Pal
                </h1>
                <p className="text-xs text-muted-foreground hidden sm:block">Your comfort companion</p>
              </div>
              <div className="sm:hidden">
                <h1 className="text-foreground">
                  Period Pal
                </h1>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-2">
              {navigationItems.map((item) => (
                <Button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  variant={activeSection === item.id ? "default" : "ghost"}
                  className={`${
                    activeSection === item.id
                      ? "bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-lg"
                      : "text-muted-foreground hover:bg-rose-50 hover:text-rose-600"
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Button>
              ))}
            </nav>

            {/* User Profile */}
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="p-1.5 sm:p-2 rounded-full bg-gradient-to-br from-purple-400 to-pink-400">
                <User className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Tablet Navigation */}
        <div className="hidden md:flex lg:hidden justify-center px-4 py-3 border-t border-white/20">
          <div className="flex gap-2 overflow-x-auto max-w-full">
            {navigationItems.map((item) => (
              <Button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                variant={activeSection === item.id ? "default" : "ghost"}
                size="sm"
                className={`${
                  activeSection === item.id
                    ? "bg-gradient-to-r from-rose-500 to-pink-500 text-white"
                    : "text-muted-foreground"
                } whitespace-nowrap px-3 py-1.5 text-sm`}
              >
                <item.icon className="w-3.5 h-3.5" />
                <span className="ml-1">{item.label}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex justify-center px-4 py-2 border-t border-white/20">
          <div className="flex gap-1 overflow-x-auto max-w-full">
            {navigationItems.map((item) => (
              <Button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                variant={activeSection === item.id ? "default" : "ghost"}
                size="sm"
                className={`${
                  activeSection === item.id
                    ? "bg-gradient-to-r from-rose-500 to-pink-500 text-white"
                    : "text-muted-foreground"
                } whitespace-nowrap px-2 py-1.5 text-xs min-w-fit`}
              >
                <item.icon className="w-3 h-3" />
                <span className="ml-1">{item.label}</span>
              </Button>
            ))}
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="relative z-10">
        {/* Hero Section - Only show on home */}
        {activeSection === "home" && (
          <motion.section 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20"
          >
            <div className="text-center max-w-4xl mx-auto w-full">
              {/* Welcome Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="bg-white/90 backdrop-blur-xl border-2 border-white/20 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-2xl mb-6 sm:mb-8"
              >
                <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                  <div className="p-2 sm:p-3 rounded-xl sm:rounded-2xl bg-gradient-to-br from-rose-400 to-pink-400 shadow-lg">
                    <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-white animate-pulse" />
                  </div>
                  <h2 className="text-foreground">
                    Welcome to Your Safe Space
                  </h2>
                </div>
                <p className="text-base sm:text-lg text-muted-foreground mb-6 sm:mb-8 leading-relaxed px-2">
                  A gentle companion for your toughest days. 
                  <br className="hidden sm:block" />
                  Find comfort, peace, and little moments of joy.
                </p>
                
                {/* Quick Actions */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveSection("comfort")}
                    className="group cursor-pointer"
                  >
                    <div className="bg-gradient-to-br from-rose-100 to-pink-100 p-4 sm:p-6 rounded-xl sm:rounded-2xl border-2 border-rose-200 group-hover:border-rose-300 transition-all h-full">
                      <Heart className="w-6 h-6 sm:w-8 sm:h-8 text-rose-500 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                      <h3 className="text-sm sm:text-base text-foreground">Comfort Zone</h3>
                      <p className="text-xs sm:text-sm text-muted-foreground">Self-care activities</p>
                    </div>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveSection("chocolates")}
                    className="group cursor-pointer"
                  >
                    <div className="bg-gradient-to-br from-amber-100 to-orange-100 p-4 sm:p-6 rounded-xl sm:rounded-2xl border-2 border-amber-200 group-hover:border-amber-300 transition-all h-full">
                      <Cookie className="w-6 h-6 sm:w-8 sm:h-8 text-amber-600 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                      <h3 className="text-sm sm:text-base text-foreground">Chocolate Shelf</h3>
                      <p className="text-xs sm:text-sm text-muted-foreground">Treat yourself</p>
                    </div>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveSection("music")}
                    className="group cursor-pointer"
                  >
                    <div className="bg-gradient-to-br from-purple-100 to-blue-100 p-4 sm:p-6 rounded-xl sm:rounded-2xl border-2 border-purple-200 group-hover:border-purple-300 transition-all h-full">
                      <Headphones className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                      <h3 className="text-sm sm:text-base text-foreground">Music Therapy</h3>
                      <p className="text-xs sm:text-sm text-muted-foreground">Soothing melodies</p>
                    </div>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="group cursor-pointer opacity-60"
                  >
                    <div className="bg-gradient-to-br from-green-100 to-teal-100 p-4 sm:p-6 rounded-xl sm:rounded-2xl border-2 border-green-200 h-full">
                      <Moon className="w-6 h-6 sm:w-8 sm:h-8 text-green-600 mx-auto mb-2" />
                      <h3 className="text-sm sm:text-base text-foreground">Coming Soon</h3>
                      <p className="text-xs sm:text-sm text-muted-foreground">More features</p>
                    </div>
                  </motion.div>
                </div>

                {/* Daily Affirmation */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="bg-gradient-to-r from-rose-50 to-pink-50 p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-rose-200"
                >
                  <Coffee className="w-4 h-4 sm:w-5 sm:h-5 text-rose-500 mb-2 mx-auto" />
                  <p className="text-center font-medium text-sm sm:text-base text-foreground italic px-2">
                    "You are strong, worthy, and deserving of all the comfort in the world."
                  </p>
                </motion.div>
              </motion.div>
            </div>
          </motion.section>
        )}

        {/* Comfort Section */}
        {activeSection === "comfort" && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="min-h-screen px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20"
          >
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-8 sm:mb-12"
              >
                <div className="inline-flex items-center gap-2 sm:gap-3 bg-white/90 backdrop-blur-xl border-2 border-white/20 rounded-full px-4 sm:px-6 py-2 sm:py-3 mb-4">
                  <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-rose-500" />
                  <span className="text-foreground">
                    Comfort Activities
                  </span>
                </div>
                <p className="text-muted-foreground text-base sm:text-lg px-2">
                  Gentle activities for your peace of mind
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white/90 backdrop-blur-xl border-2 border-white/20 rounded-2xl sm:rounded-3xl shadow-2xl"
              >
                <ComfortCards />
              </motion.div>
            </div>
          </motion.section>
        )}

        {/* Chocolates Section */}
        {activeSection === "chocolates" && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="min-h-screen px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20"
          >
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-8 sm:mb-12"
              >
                <div className="inline-flex items-center gap-2 sm:gap-3 bg-white/90 backdrop-blur-xl border-2 border-white/20 rounded-full px-4 sm:px-6 py-2 sm:py-3 mb-4">
                  <Cookie className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600" />
                  <span className="text-foreground">
                    Chocolate Comfort Shelf
                  </span>
                </div>
                <p className="text-muted-foreground text-base sm:text-lg px-2">
                  Pick your weapons of mass relaxation
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white/90 backdrop-blur-xl border-2 border-white/20 rounded-2xl sm:rounded-3xl shadow-2xl"
              >
                <ChocolateShelf />
              </motion.div>
            </div>
          </motion.section>
        )}

        {/* Music Section */}
        {activeSection === "music" && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="min-h-screen px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20"
          >
            <ComfortMusicGenerator />
          </motion.section>
        )}
      </main>

      {/* Footer */}
      <motion.footer 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="relative z-10 py-6 sm:py-8 text-center border-t border-white/20 bg-white/50 backdrop-blur-xl"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 mb-2">
            <Heart className="w-4 h-4 text-rose-500" />
            <span className="text-sm font-medium text-foreground">
              Made with love for your comfort
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            © 2024 Period Pal - Your gentle companion
          </p>
        </div>
      </motion.footer>
    </div>
  );
};

export default Index;
