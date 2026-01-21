import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Headphones, ExternalLink, Music, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Playlist {
  id: number;
  name: string;
  mood: string;
  emoji: string;
  spotifyUrl: string;
  description: string;
  artist?: string;
}

const playlists: Playlist[] = [
  {
    id: 1,
    name: "Talwiinder Vibes",
    mood: "chill",
    emoji: "🎤",
    spotifyUrl: "https://open.spotify.com/artist/4zBRYXP4GNARNIqZ8fQ5Wa",
    description: "Smooth Punjabi R&B for your soul",
    artist: "Talwiinder"
  },
  {
    id: 2,
    name: "Arijit Singh Sad Hours",
    mood: "sad",
    emoji: "💔",
    spotifyUrl: "https://open.spotify.com/artist/4YRxDV8wJFPHPTeXepOstw",
    description: "When you need to feel all the feelings",
    artist: "Arijit Singh"
  },
  {
    id: 3,
    name: "A.R. Rahman Magic",
    mood: "peaceful",
    emoji: "✨",
    spotifyUrl: "https://open.spotify.com/artist/1mYsTxnqsietFxj1OgoGbG",
    description: "Timeless melodies for comfort",
    artist: "A.R. Rahman"
  },
  {
    id: 4,
    name: "Bollywood Lo-Fi Beats",
    mood: "cozy",
    emoji: "🌙",
    spotifyUrl: "https://open.spotify.com/playlist/37i9dQZF1DX9n3KZ6SJYE0",
    description: "Remixed classics for blanket mode",
  },
  {
    id: 5,
    name: "Prateek Kuhad Sessions",
    mood: "romantic",
    emoji: "🥺",
    spotifyUrl: "https://open.spotify.com/artist/6omKGHsfNNbGxKLHZLvVSM",
    description: "Soft indie for when you're feeling tender",
    artist: "Prateek Kuhad"
  },
  {
    id: 6,
    name: "AP Dhillon Energy",
    mood: "dramatic",
    emoji: "🔥",
    spotifyUrl: "https://open.spotify.com/artist/5f7VJjfbwm532GiveGC0ZK",
    description: "Main character vibes only",
    artist: "AP Dhillon"
  },
  {
    id: 7,
    name: "Shreya Ghoshal Classics",
    mood: "nostalgic",
    emoji: "🌸",
    spotifyUrl: "https://open.spotify.com/artist/0oOet2f43PA68X5RxKobEy",
    description: "Voice of angels for emotional days",
    artist: "Shreya Ghoshal"
  },
  {
    id: 8,
    name: "Hindi Indie Mix",
    mood: "zen",
    emoji: "🎧",
    spotifyUrl: "https://open.spotify.com/playlist/37i9dQZF1DX4WK6YlxSOtz",
    description: "Fresh indie Hindi for good vibes",
  },
];

const moodColors: Record<string, string> = {
  chill: "from-blue-500/20 to-purple-500/20",
  sad: "from-indigo-500/20 to-blue-600/20",
  peaceful: "from-amber-400/20 to-orange-500/20",
  cozy: "from-pink-400/20 to-rose-500/20",
  romantic: "from-rose-400/20 to-pink-500/20",
  dramatic: "from-orange-500/20 to-red-500/20",
  nostalgic: "from-purple-400/20 to-pink-400/20",
  zen: "from-teal-400/20 to-cyan-500/20",
};

const moodGlow: Record<string, string> = {
  chill: "shadow-[0_0_25px_rgba(139,92,246,0.2)]",
  sad: "shadow-[0_0_25px_rgba(99,102,241,0.2)]",
  peaceful: "shadow-[0_0_25px_rgba(251,146,60,0.2)]",
  cozy: "shadow-[0_0_25px_rgba(244,114,182,0.2)]",
  romantic: "shadow-[0_0_25px_rgba(251,113,133,0.2)]",
  dramatic: "shadow-[0_0_25px_rgba(249,115,22,0.2)]",
  nostalgic: "shadow-[0_0_25px_rgba(192,132,252,0.2)]",
  zen: "shadow-[0_0_25px_rgba(45,212,191,0.2)]",
};

export const PlaylistGenerator = () => {
  const [selectedPlaylist, setSelectedPlaylist] = useState<Playlist | null>(null);

  return (
    <section className="w-full">
      <div className="flex items-center gap-2 mb-4">
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Headphones className="w-5 h-5 text-primary" />
        </motion.div>
        <h2 className="text-xl md:text-2xl font-bold text-foreground">
          Desi Comfort Playlists
        </h2>
      </div>
      <p className="text-muted-foreground mb-6 font-handwritten text-lg">
        Hindi songs to match your mood 🎧
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {playlists.map((playlist, index) => (
          <motion.button
            key={playlist.id}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ 
              delay: index * 0.06,
              type: "spring",
              stiffness: 100
            }}
            onClick={() => setSelectedPlaylist(playlist)}
            className={`
              relative bg-gradient-to-br ${moodColors[playlist.mood]} 
              backdrop-blur-xl rounded-2xl p-4
              border border-white/20 ${moodGlow[playlist.mood]}
              text-left overflow-hidden group
              transition-all duration-300
              ${selectedPlaylist?.id === playlist.id ? "ring-2 ring-primary" : ""}
            `}
            whileHover={{ 
              scale: 1.03, 
              y: -4,
            }}
            whileTap={{ scale: 0.97 }}
          >
            {/* Animated shimmer effect */}
            <motion.div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
              style={{
                background: "linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)",
                backgroundSize: "200% 200%"
              }}
              animate={{
                backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear"
              }}
            />

            <motion.span 
              className="text-3xl block mb-2"
              animate={{ 
                rotate: selectedPlaylist?.id === playlist.id ? [0, -10, 10, 0] : 0
              }}
              transition={{ duration: 0.5 }}
            >
              {playlist.emoji}
            </motion.span>
            <p className="text-sm font-bold text-foreground">{playlist.name}</p>
            {playlist.artist && (
              <p className="text-xs text-muted-foreground mt-1 opacity-80">
                {playlist.artist}
              </p>
            )}
          </motion.button>
        ))}
      </div>

      {/* Selected Playlist Display */}
      <AnimatePresence>
        {selectedPlaylist && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            className="mt-6 relative"
          >
            {/* Glow backdrop */}
            <div className={`absolute inset-0 bg-gradient-to-r ${moodColors[selectedPlaylist.mood]} blur-3xl rounded-3xl`} />
            
            <div className="relative glass-card rounded-3xl p-6 border border-white/20 backdrop-blur-xl">
              <div className="flex items-start gap-4">
                <motion.div 
                  className="text-5xl"
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  {selectedPlaylist.emoji}
                </motion.div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-foreground mb-1 flex items-center gap-2">
                    {selectedPlaylist.name}
                    <Sparkles className="w-4 h-4 text-primary" />
                  </h3>
                  {selectedPlaylist.artist && (
                    <p className="text-sm text-primary font-medium mb-1">
                      🎤 {selectedPlaylist.artist}
                    </p>
                  )}
                  <p className="text-sm text-muted-foreground mb-4">
                    {selectedPlaylist.description}
                  </p>
                  <Button
                    asChild
                    className="gap-2 rounded-xl bg-[#1DB954] hover:bg-[#1ed760] text-white border-0"
                  >
                    <a
                      href={selectedPlaylist.spotifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Music className="w-4 h-4" />
                      Open on Spotify
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
