import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Plus, Minus, Sparkles, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Chocolate {
  id: number;
  name: string;
  image: string;
  color: string;
  glow: string;
}

const chocolates: Chocolate[] = [
  { 
    id: 1, 
    name: "Dairy Milk Silk Oreo", 
    image: "https://images.unsplash.com/photo-1697635452382-5e57f32399c4?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    color: "from-purple-500/20 to-purple-600/30",
    glow: "shadow-[0_0_30px_rgba(147,51,234,0.3)]"
  },
  { 
    id: 2, 
    name: "Ferrero Rocher", 
    image: "https://images.unsplash.com/photo-1654245384480-368638d6df9d?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3Dw=200&h=200&fit=crop",
    color: "from-amber-500/20 to-yellow-600/30",
    glow: "shadow-[0_0_30px_rgba(245,158,11,0.3)]"
  },
  { 
    id: 3, 
    name: "KitKat", 
    image: "https://images.unsplash.com/photo-1558403317-978b523a27ff?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?w=200&h=200&fit=crop",
    color: "from-red-500/20 to-red-600/30",
    glow: "shadow-[0_0_30px_rgba(239,68,68,0.3)]"
  },
  
  { 
    id: 4, 
    name: "Snickers", 
    image: "https://images.unsplash.com/photo-1657264879420-c0419ecd96da?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3Dw=200&h=200&fit=crop",
    color: "from-amber-700/20 to-amber-800/30",
    glow: "shadow-[0_0_30px_rgba(180,83,9,0.3)]"
  },
  { 
    id: 5, 
    name: "5 Star", 
    image: "https://5.imimg.com/data5/SELLER/Default/2023/7/329076668/OK/LX/QG/72541272/whatsapp-image-2023-07-26-at-17-25-40-500x500.jpeg?w=200&h=200&fit=crop",
    color: "from-slate-400/20 to-slate-500/30",
    glow: "shadow-[0_0_30px_rgba(148,163,184,0.3)]"
  },
  { 
    id: 6, 
    name: "Dark Chocolate 70%", 
    image: "https://yvcare.in/wp-content/uploads/2020/08/pro_amul_chocolate.jpg?w=200&h=200&fit=crop",
    color: "from-stone-700/20 to-stone-800/30",
    glow: "shadow-[0_0_30px_rgba(87,83,78,0.3)]"
  },
];

interface ChocolateRequest {
  chocolate: Chocolate;
  quantity: number;
}

export const ChocolateShelf = () => {
  const [requests, setRequests] = useState<ChocolateRequest[]>([]);
  const [phoneNumber, setPhoneNumber] = useState("+919876543210"); // Default phone number

  const updateQuantity = (chocolateId: number, delta: number) => {
    setRequests((prev) => {
      const existing = prev.find((item) => item.chocolate.id === chocolateId);
      if (existing) {
        const newQuantity = existing.quantity + delta;
        if (newQuantity <= 0) {
          return prev.filter((item) => item.chocolate.id !== chocolateId);
        }
        return prev.map((item) =>
          item.chocolate.id === chocolateId
            ? { ...item, quantity: newQuantity }
            : item
        );
      } else if (delta > 0) {
        const chocolate = chocolates.find(c => c.id === chocolateId);
        if (chocolate) {
          return [...prev, { chocolate, quantity: delta }];
        }
      }
      return prev;
    });
  };

  const sendWhatsAppNotification = () => {
    if (requests.length === 0) return;
    
    const message = requests
      .map(item => `${item.quantity}x ${item.chocolate.name}`)
      .join(', ');
    
    const whatsappMessage = encodeURIComponent(
      `🍫 Chocolate Request 🍫\n\nShe would love:\n${message}\n\nPlease make her day special! 💕`
    );
    
    const whatsappUrl = `https://wa.me/${phoneNumber.replace(/[^\d]/g, '')}?text=${whatsappMessage}`;
    window.open(whatsappUrl, '_blank');
    
    // Clear requests after sending
    setRequests([]);
  };

  const totalItems = requests.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <section className="w-full">
      <div className="flex items-center gap-2 mb-4">
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Sparkles className="w-6 h-6 text-primary" />
        </motion.div>
        <h2 className="text-xl md:text-2xl text-foreground">
          Chocolate Comfort Shelf
        </h2>
      </div>
      <p className="text-muted-foreground mb-6 font-handwritten text-lg italic">
        "Chocolate is not food. It's survival equipment." 🍫
      </p>

      {/* Futuristic Horizontal Shelf */}
      <div className="relative">
        {/* Glow backdrop */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 blur-3xl" />
        
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory relative">
          {chocolates.map((chocolate, index) => (
            <motion.div
              key={chocolate.id}
              initial={{ opacity: 0, y: 30, rotateY: -15 }}
              animate={{ opacity: 1, y: 0, rotateY: 0 }}
              transition={{ 
                delay: index * 0.08,
                type: "spring",
                stiffness: 100
              }}
              className="flex-shrink-0 snap-start perspective-1000"
            >
              <motion.div
                className={`
                  relative w-44 rounded-3xl p-4
                  bg-gradient-to-br ${chocolate.color}
                  backdrop-blur-xl border border-white/20
                  ${chocolate.glow}
                  transition-all duration-500
                  overflow-hidden group
                `}
                whileHover={{ 
                  scale: 1.05, 
                  y: -8,
                  rotateY: 5,
                }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Animated gradient border */}
                <motion.div 
                  className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: "linear-gradient(45deg, transparent, rgba(255,255,255,0.1), transparent)",
                  }}
                  animate={{
                    backgroundPosition: ["0% 0%", "100% 100%"],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                />

                {/* Floating particles effect */}
                <div className="absolute inset-0 overflow-hidden rounded-3xl">
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-white/40 rounded-full"
                      initial={{ 
                        x: Math.random() * 100, 
                        y: 100 + Math.random() * 20 
                      }}
                      animate={{ 
                        y: -20,
                        opacity: [0, 1, 0]
                      }}
                      transition={{
                        duration: 3,
                        delay: i * 0.5,
                        repeat: Infinity,
                        ease: "easeOut"
                      }}
                    />
                  ))}
                </div>

                <div className="relative text-center">
                  {/* Chocolate Image */}
                  <motion.div 
                    className="relative mx-auto mb-3 w-24 h-24 rounded-2xl overflow-hidden"
                    whileHover={{ rotate: [0, -3, 3, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <img
                      src={chocolate.image}
                      alt={chocolate.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  </motion.div>

                  <p className="text-sm text-foreground mb-3 line-clamp-2 h-10">
                    {chocolate.name}
                  </p>

                  <div className="flex items-center justify-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-8 h-8 rounded-full p-0 bg-secondary/20 hover:bg-secondary/30"
                      onClick={() => updateQuantity(chocolate.id, -1)}
                    >
                      <Minus className="w-3 h-3" />
                    </Button>
                    <span className="text-sm w-8 text-center">
                      {requests.find(r => r.chocolate.id === chocolate.id)?.quantity || 0}
                    </span>
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-8 h-8 rounded-full p-0 bg-secondary/20 hover:bg-secondary/30"
                      onClick={() => updateQuantity(chocolate.id, 1)}
                    >
                      <Plus className="w-3 h-3" />
                    </Button>
                  </div>
                  <Button
                    size="sm"
                    className="w-full gap-2 rounded-xl bg-primary/90 hover:bg-primary text-primary-foreground backdrop-blur-sm border border-white/20 mt-3"
                    onClick={() => updateQuantity(chocolate.id, 1)}
                  >
                    <MessageCircle className="w-3 h-3" />
                    <span className="text-xs">I Want This</span>
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Futuristic Cart Summary */}
      <AnimatePresence>
        {requests.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            className="mt-6 relative"
          >
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-purple-500/10 to-primary/20 blur-2xl rounded-3xl" />
            
            <div className="relative glass-card rounded-3xl p-5 border border-white/20 backdrop-blur-xl">
              <div className="flex items-center gap-3 mb-4">
                <motion.div
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="p-2 rounded-xl bg-primary/20"
                >
                  <MessageCircle className="w-5 h-5 text-primary" />
                </motion.div>
                <h3 className="text-foreground text-lg">
                  Chocolate Requests
                  <motion.span 
                    className="ml-2 px-2 py-0.5 text-xs bg-primary/20 text-primary rounded-full"
                    key={totalItems}
                    initial={{ scale: 1.3 }}
                    animate={{ scale: 1 }}
                  >
                    {totalItems} {totalItems === 1 ? "item" : "items"}
                  </motion.span>
                </h3>
              </div>

              <div className="flex flex-wrap gap-3">
                {requests.map((item) => (
                  <motion.div
                    key={item.chocolate.id}
                    layout
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className="flex items-center gap-3 bg-secondary/30 backdrop-blur-sm rounded-2xl px-3 py-2 border border-white/10"
                  >
                    <img 
                      src={item.chocolate.image} 
                      alt={item.chocolate.name}
                      className="w-10 h-10 rounded-lg object-cover"
                    />
                    <div>
                      <span className="text-sm font-medium text-foreground block">
                        {item.chocolate.name}
                      </span>
                      <div className="flex items-center gap-2 mt-1">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => updateQuantity(item.chocolate.id, -1)}
                          className="w-6 h-6 rounded-full bg-muted/80 flex items-center justify-center hover:bg-destructive/30 transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </motion.button>
                        <motion.span 
                          className="text-sm w-5 text-center"
                          key={item.quantity}
                          initial={{ scale: 1.3 }}
                          animate={{ scale: 1 }}
                        >
                          {item.quantity}
                        </motion.span>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => updateQuantity(item.chocolate.id, 1)}
                          className="w-6 h-6 rounded-full bg-muted/80 flex items-center justify-center hover:bg-primary/30 transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-4 space-y-3">
                <div className="flex items-center gap-2">
                  <input
                    type="tel"
                    placeholder="Phone number (e.g., +919876543210)"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="flex-1 px-3 py-2 text-sm bg-secondary/20 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
                
                <Button
                  onClick={sendWhatsAppNotification}
                  className="w-full gap-2 rounded-xl bg-green-600 hover:bg-green-700 text-white backdrop-blur-sm border border-green-500/20"
                  size="sm"
                >
                  <Send className="w-4 h-4" />
                  <span className="text-sm">Send to WhatsApp</span>
                </Button>
                
                <motion.p 
                  className="text-sm text-muted-foreground font-handwritten text-base flex items-center gap-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <Sparkles className="w-4 h-4 text-primary" />
                  Your chocolate wishes will be sent! 💕
                </motion.p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
