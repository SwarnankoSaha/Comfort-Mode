import { useState, useRef, useEffect } from "react";
import { Music, Music2, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

export const BackgroundMusic = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState([30]);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = volume[0] / 100;
      audio.loop = true;
    }
  }, [volume]);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      // Ensure loop is always set
      audio.loop = true;
      
      // Handle audio events
      const handleEnded = () => {
        if (isPlaying) {
          audio.currentTime = 0;
          audio.play().catch(error => {
            console.log("Audio restart failed:", error);
          });
        }
      };

      const handleStalled = () => {
        if (isPlaying) {
          audio.play().catch(error => {
            console.log("Audio stalled, retrying:", error);
          });
        }
      };

      audio.addEventListener('ended', handleEnded);
      audio.addEventListener('stalled', handleStalled);
      audio.addEventListener('waiting', handleStalled);

      return () => {
        audio.removeEventListener('ended', handleEnded);
        audio.removeEventListener('stalled', handleStalled);
        audio.removeEventListener('waiting', handleStalled);
      };
    }
  }, [isPlaying]);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (audio) {
      if (isPlaying) {
        audio.pause();
      } else {
        // Ensure audio is ready before playing
        audio.currentTime = 0;
        audio.loop = true;
        const playPromise = audio.play();
        
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            console.log("Audio play failed:", error);
            // Try again after a short delay
            setTimeout(() => {
              audio.play().catch(err => console.log("Retry failed:", err));
            }, 100);
          });
        }
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        loop
        preload="auto"
        src="https://www.bensound.com/bensound-music/bensound-sweet.mp3"
      />
      
      <div className="fixed bottom-4 right-4 z-50 glass-card rounded-2xl p-4 border border-white/20 backdrop-blur-xl shadow-lg">
        <div className="flex items-center gap-3">
          <Button
            size="sm"
            onClick={togglePlayPause}
            className="rounded-full bg-primary/20 hover:bg-primary/30 text-primary border border-white/20 backdrop-blur-sm"
          >
            {isPlaying ? (
              <Music2 className="w-4 h-4" />
            ) : (
              <Music className="w-4 h-4" />
            )}
          </Button>
          
          {isPlaying && (
            <div className="flex items-center gap-2">
              {volume[0] > 0 ? (
                <Volume2 className="w-4 h-4 text-muted-foreground" />
              ) : (
                <VolumeX className="w-4 h-4 text-muted-foreground" />
              )}
              <Slider
                value={volume}
                onValueChange={setVolume}
                max={100}
                step={5}
                className="w-24"
              />
            </div>
          )}
        </div>
        
        <p className="text-xs text-muted-foreground mt-2 text-center">
          {isPlaying ? "Playing" : "Paused"}
        </p>
      </div>
    </>
  );
};
