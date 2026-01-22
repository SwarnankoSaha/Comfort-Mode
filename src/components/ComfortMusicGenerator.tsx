import { useState, useRef } from "react";
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Music, Heart, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Song {
  id: string;
  title: string;
  artist: string;
  language: "hindi" | "english";
  duration: string;
  previewUrl?: string;
  albumArt?: string;
  isLocal?: boolean;
}

const DEFAULT_SONGS: Song[] = [
  // Hindi Songs
  { id: "1", title: "Tum Hi Ho", artist: "Arijit Singh", language: "hindi", duration: "3:45" },
  { id: "2", title: "Raatan Lambiyan", artist: "Diljit Dosanjh", language: "hindi", duration: "4:12" },
  { id: "3", title: "Khamakha Hai", artist: "Jubin Nautiyal", language: "hindi", duration: "3:28" },
  { id: "4", title: "Mann Bharrya", artist: "B Praak", language: "hindi", duration: "4:05" },
  { id: "5", title: "Ve Maahi", artist: "Jubin Nautiyal", language: "hindi", duration: "3:52" },
  // English Songs
  { id: "6", title: "Perfect", artist: "Ed Sheeran", language: "english", duration: "4:23" },
  { id: "7", title: "Someone Like You", artist: "Adele", language: "english", duration: "4:45" },
  { id: "8", title: "Fix You", artist: "Coldplay", language: "english", duration: "4:55" },
  { id: "9", title: "Shallow", artist: "Lady Gaga & Bradley Cooper", language: "english", duration: "3:35" },
  { id: "10", title: "Thinking Out Loud", artist: "Ed Sheeran", language: "english", duration: "4:41" }
];

export const ComfortMusicGenerator = () => {
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState([30]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState<"all" | "hindi" | "english">("all");
  const audioRef = useRef<HTMLAudioElement>(null);

  useState(() => {
    setCurrentSong(DEFAULT_SONGS[0]);
  });

  const playSong = (song: Song) => {
    setCurrentSong(song);
    setIsPlaying(true);
  };

  const togglePlayPause = () => {
    if (!currentSong) return;
    setIsPlaying(!isPlaying);
  };

  const playNext = () => {
    if (!currentSong) return;
    const currentIndex = DEFAULT_SONGS.findIndex(s => s.id === currentSong.id);
    const nextIndex = (currentIndex + 1) % DEFAULT_SONGS.length;
    playSong(DEFAULT_SONGS[nextIndex]);
  };

  const playPrevious = () => {
    if (!currentSong) return;
    const currentIndex = DEFAULT_SONGS.findIndex(s => s.id === currentSong.id);
    const prevIndex = currentIndex === 0 ? DEFAULT_SONGS.length - 1 : currentIndex - 1;
    playSong(DEFAULT_SONGS[prevIndex]);
  };

  const getFilteredSongs = () => {
    if (selectedLanguage === "all") return DEFAULT_SONGS;
    return DEFAULT_SONGS.filter(song => song.language === selectedLanguage);
  };

  const searchSongs = () => {
    if (!searchQuery.trim()) return;
    const filteredSongs = DEFAULT_SONGS.filter(song => 
      song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      song.artist.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return filteredSongs;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-4">
      <audio ref={audioRef} onEnded={playNext} />
      
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 p-4 rounded-2xl bg-white/90 backdrop-blur-xl shadow-lg">
            <Music className="w-6 h-6 text-purple-600" />
            <h1 className="text-2xl font-bold text-purple-600">Comfort Music</h1>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Player */}
          <Card className="bg-white/90 backdrop-blur-xl">
            <CardHeader>
              <CardTitle>Now Playing</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {currentSong ? (
                <>
                  <div className="text-center">
                    <div className="w-32 h-32 mx-auto bg-gradient-to-br from-purple-200 to-pink-200 rounded-xl flex items-center justify-center mb-4">
                      <Music className="w-12 h-12 text-purple-600" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{currentSong.title}</h3>
                    <p className="text-gray-600 mb-2">{currentSong.artist}</p>
                    <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                      {currentSong.language.toUpperCase()}
                    </span>
                  </div>

                  <div className="flex items-center justify-center gap-4">
                    <Button onClick={playPrevious} variant="outline" size="lg" className="rounded-full">
                      <SkipBack className="w-5 h-5" />
                    </Button>
                    <Button onClick={togglePlayPause} size="lg" className="rounded-full bg-purple-600 hover:bg-purple-700 text-white px-6">
                      {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                    </Button>
                    <Button onClick={playNext} variant="outline" size="lg" className="rounded-full">
                      <SkipForward className="w-5 h-5" />
                    </Button>
                  </div>

                  <div className="flex items-center gap-3">
                    {volume[0] > 0 ? <Volume2 className="w-5 h-5 text-purple-600" /> : <VolumeX className="w-5 h-5 text-purple-600" />}
                    <Slider value={volume} onValueChange={setVolume} max={100} step={5} className="flex-1" />
                  </div>
                </>
              ) : (
                <div className="h-64 flex flex-col items-center justify-center text-gray-400">
                  <Music className="w-16 h-16 mb-4" />
                  <p>Select a song to play</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Playlist */}
          <Card className="bg-white/90 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Music className="w-5 h-5" />
                Playlist
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Filter */}
              <div className="mb-4">
                <div className="grid grid-cols-3 gap-2 mb-4">
                  <Button
                    variant={selectedLanguage === "all" ? "default" : "outline"}
                    onClick={() => setSelectedLanguage("all")}
                    className="w-full"
                  >
                    All
                  </Button>
                  <Button
                    variant={selectedLanguage === "hindi" ? "default" : "outline"}
                    onClick={() => setSelectedLanguage("hindi")}
                    className="w-full"
                  >
                    Hindi
                  </Button>
                  <Button
                    variant={selectedLanguage === "english" ? "default" : "outline"}
                    onClick={() => setSelectedLanguage("english")}
                    className="w-full"
                  >
                    English
                  </Button>
                </div>

                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Search songs..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Songs List */}
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {getFilteredSongs().map((song) => (
                  <div
                    key={song.id}
                    onClick={() => playSong(song)}
                    className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all ${
                      currentSong?.id === song.id
                        ? 'bg-purple-100 border-2 border-purple-300'
                        : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                  >
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-200 to-pink-200 rounded-lg flex items-center justify-center">
                      <Music className="w-5 h-5 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{song.title}</p>
                      <p className="text-sm text-gray-600">{song.artist}</p>
                    </div>
                    <span className="text-xs px-2 py-1 bg-purple-500 text-white rounded-full">
                      {song.language}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
