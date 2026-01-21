import { useState, useEffect, useRef } from "react";
import { Search, Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Music, Heart, Filter, Sparkles, Download, Plus, Trash2, ExternalLink } from "lucide-react";
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
  spotifyUrl?: string;
  albumArt?: string;
  isLocal?: boolean;
}

interface LocalPlaylist {
  id: string;
  name: string;
  songs: Song[];
  createdAt: string;
}

const DEFAULT_SONGS: Song[] = [
  // Hindi Songs
  {
    id: "1",
    title: "Tum Hi Ho",
    artist: "Arijit Singh",
    language: "hindi",
    duration: "3:45",
    previewUrl: "https://p.scdn.co/mp3-preview/6a8b8b8a8b8b8b8b8b8b8b8b8b8b",
    spotifyUrl: "https://open.spotify.com/track/6a8b8b8a8b8b8b8b8b8b8b8b8b8b",
    albumArt: "https://i.scdn.co/image/ab67616d0000b273b8b8b8b8b8b8b8b8b8b8b8b"
  },
  {
    id: "2",
    title: "Raatan Lambiyan",
    artist: "Diljit Dosanjh",
    language: "hindi",
    duration: "4:12",
    previewUrl: "https://p.scdn.co/mp3-preview/7c9d9d9c9d9c9d9c9d9c9d9c9d9c9d9c",
    spotifyUrl: "https://open.spotify.com/track/7c9d9d9c9d9c9d9c9d9c9d9c9d9c9d9c",
    albumArt: "https://i.scdn.co/image/ab67616d0000b273c9d9c9d9c9d9c9d9c9d9c9d9c"
  },
  {
    id: "3",
    title: "Khamakha Hai",
    artist: "Jubin Nautiyal",
    language: "hindi",
    duration: "3:28",
    previewUrl: "https://p.scdn.co/mp3-preview/8e0e8e0e8e0e8e0e8e0e8e0e8e0e8e",
    spotifyUrl: "https://open.spotify.com/track/8e0e8e0e8e0e8e0e8e0e8e0e8e0e8e",
    albumArt: "https://i.scdn.co/image/ab67616d0000b2738e0e8e0e8e0e8e0e8e0e8e"
  },
  {
    id: "4",
    title: "Mann Bharrya",
    artist: "B Praak",
    language: "hindi",
    duration: "4:05",
    previewUrl: "https://p.scdn.co/mp3-preview/9f1f9f1f9f1f9f1f9f1f9f1f9f1f9f",
    spotifyUrl: "https://open.spotify.com/track/9f1f9f1f9f1f9f1f9f1f1f9f1f9f1f",
    albumArt: "https://i.scdn.co/image/ab67616d0000b2739f1f9f1f9f1f9f1f9f1f9f1f"
  },
  {
    id: "5",
    title: "Ve Maahi",
    artist: "Jubin Nautiyal",
    language: "hindi",
    duration: "3:52",
    previewUrl: "https://p.scdn.co/mp3-preview/0a2a2a2a2a2a2a2a2a2a2a2a2a",
    spotifyUrl: "https://open.spotify.com/track/0a2a2a2a2a2a2a2a2a2a2a2a2a",
    albumArt: "https://i.scdn.co/image/ab67616d0000b2730a2a2a2a2a2a2a2a2a2a2a"
  },
  // English Songs
  {
    id: "6",
    title: "Perfect",
    artist: "Ed Sheeran",
    language: "english",
    duration: "4:23",
    previewUrl: "https://p.scdn.co/mp3-preview/1b3b1b3b1b3b1b3b1b3b1b3b3b",
    spotifyUrl: "https://open.spotify.com/track/1b3b1b3b1b3b1b3b1b3b1b3b3b",
    albumArt: "https://i.scdn.co/image/ab67616d0000b2731b3b1b3b1b3b1b3b1b3b1b"
  },
  {
    id: "7",
    title: "Someone Like You",
    artist: "Adele",
    language: "english",
    duration: "4:45",
    previewUrl: "https://p.scdn.co/mp3-preview/2c4c2c4c2c4c2c4c2c4c2c4c2c2c",
    spotifyUrl: "https://open.spotify.com/track/2c4c2c4c2c4c2c4c2c4c2c4c2c4c2c",
    albumArt: "https://i.scdn.co/image/ab67616d0000b2732c4c2c4c2c4c2c4c2c4c2c2c"
  },
  {
    id: "8",
    title: "Fix You",
    artist: "Coldplay",
    language: "english",
    duration: "4:55",
    previewUrl: "https://p.scdn.co/mp3-preview/3d5d3d5d3d5d3d5d3d5d3d5d3d5d",
    spotifyUrl: "https://open.spotify.com/track/3d5d3d5d3d5d3d5d3d5d3d5d3d5d",
    albumArt: "https://i.scdn.co/image/ab67616d0000b2733d5d3d5d3d5d3d5d3d5d3d"
  },
  {
    id: "9",
    title: "Shallow",
    artist: "Lady Gaga & Bradley Cooper",
    language: "english",
    duration: "3:35",
    previewUrl: "https://p.scdn.co/mp3-preview/4e6e4e6e4e6e4e6e4e6e4e6e4e6e",
    spotifyUrl: "https://open.spotify.com/track/4e6e4e6e4e6e4e6e4e6e4e6e4e6e",
    albumArt: "https://i.scdn.co/image/ab67616d0000b2734e6e4e6e4e6e4e6e4e6e4e4e"
  },
  {
    id: "10",
    title: "Thinking Out Loud",
    artist: "Ed Sheeran",
    language: "english",
    duration: "4:41",
    previewUrl: "https://p.scdn.co/mp3-preview/5f7f5f7f5f7f5f7f5f7f5f7f5f7f",
    spotifyUrl: "https://open.spotify.com/track/5f7f5f7f5f7f5f7f5f7f5f7f5f7f",
    albumArt: "https://i.scdn.co/image/ab67616d0000b2735f7f5f7f5f7f5f7f5f7f5f5f"
  }
];

export const ComfortMusicGenerator = () => {
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState([30]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Song[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState<"all" | "hindi" | "english">("all");
  const [showPlaylist, setShowPlaylist] = useState(true);
  const [localSongs, setLocalSongs] = useState<Song[]>([]);
  const [localPlaylists, setLocalPlaylists] = useState<LocalPlaylist[]>([]);
  const [isSearchingSpotify, setIsSearchingSpotify] = useState(false);
  const [spotifyResults, setSpotifyResults] = useState<Song[]>([]);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedSongs = localStorage.getItem('localSongs');
    const savedPlaylists = localStorage.getItem('localPlaylists');
    
    if (savedSongs) {
      setLocalSongs(JSON.parse(savedSongs));
    }
    
    if (savedPlaylists) {
      setLocalPlaylists(JSON.parse(savedPlaylists));
    }
    
    // Set initial song
    setCurrentSong(DEFAULT_SONGS[0]);
  }, []);

  // Save to localStorage whenever localSongs changes
  useEffect(() => {
    if (localSongs.length > 0) {
      localStorage.setItem('localSongs', JSON.stringify(localSongs));
    }
  }, [localSongs]);

  // Save playlists to localStorage
  useEffect(() => {
    if (localPlaylists.length > 0) {
      localStorage.setItem('localPlaylists', JSON.stringify(localPlaylists));
    }
  }, [localPlaylists]);

  const playSong = (song: Song) => {
    setCurrentSong(song);
    setIsPlaying(true);
    if (audioRef.current && song.previewUrl) {
      audioRef.current.src = song.previewUrl;
      audioRef.current.play();
    }
  };

  const togglePlayPause = () => {
    if (!currentSong) return;
    
    if (isPlaying) {
      audioRef.current?.pause();
    } else {
      if (audioRef.current && currentSong.previewUrl) {
        audioRef.current.src = currentSong.previewUrl;
        audioRef.current.play();
      }
    }
    setIsPlaying(!isPlaying);
  };

  const playNext = () => {
    if (!currentSong) return;
    const allSongs = [...DEFAULT_SONGS, ...localSongs];
    const currentIndex = allSongs.findIndex(s => s.id === currentSong.id);
    const nextIndex = (currentIndex + 1) % allSongs.length;
    playSong(allSongs[nextIndex]);
  };

  const playPrevious = () => {
    if (!currentSong) return;
    const allSongs = [...DEFAULT_SONGS, ...localSongs];
    const currentIndex = allSongs.findIndex(s => s.id === currentSong.id);
    const prevIndex = currentIndex === 0 ? allSongs.length - 1 : currentIndex - 1;
    playSong(allSongs[prevIndex]);
  };

  const searchLocalSongs = () => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    const allSongs = [...DEFAULT_SONGS, ...localSongs];
    const filteredSongs = allSongs.filter(song => 
      song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      song.artist.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(filteredSongs);
  };

  const searchSpotify = async () => {
    if (!searchQuery.trim()) return;
    
    setIsSearchingSpotify(true);
    try {
      // Note: This is a mock implementation
      // In production, you'd need to use Spotify Web API with proper authentication
      const mockSpotifyResults: Song[] = [
        {
          id: `spotify-${Date.now()}-1`,
          title: `${searchQuery} - Spotify Result 1`,
          artist: "Various Artists",
          language: "english",
          duration: "3:30",
          previewUrl: "https://p.scdn.co/mp3-preview/sample1",
          spotifyUrl: "https://open.spotify.com/search?q=" + encodeURIComponent(searchQuery),
          albumArt: "https://i.scdn.co/image/default"
        },
        {
          id: `spotify-${Date.now()}-2`,
          title: `${searchQuery} - Spotify Result 2`,
          artist: "Various Artists",
          language: "english",
          duration: "4:15",
          previewUrl: "https://p.scdn.co/mp3-preview/sample2",
          spotifyUrl: "https://open.spotify.com/search?q=" + encodeURIComponent(searchQuery),
          albumArt: "https://i.scdn.co/image/default"
        }
      ];
      
      setSpotifyResults(mockSpotifyResults);
    } catch (error) {
      console.error('Spotify search error:', error);
    } finally {
      setIsSearchingSpotify(false);
    }
  };

  const downloadSong = (song: Song) => {
    // Add song to local storage
    const newLocalSong = { ...song, id: `local-${Date.now()}`, isLocal: true };
    setLocalSongs([...localSongs, newLocalSong]);
    
    // In a real implementation, you would download the actual audio file
    // For now, we'll just save the metadata
    alert(`Song "${song.title}" added to local library!`);
  };

  const removeLocalSong = (songId: string) => {
    setLocalSongs(localSongs.filter(song => song.id !== songId));
  };

  const createPlaylist = () => {
    const newPlaylist: LocalPlaylist = {
      id: `playlist-${Date.now()}`,
      name: `My Playlist ${localPlaylists.length + 1}`,
      songs: currentSong ? [currentSong] : [],
      createdAt: new Date().toISOString()
    };
    setLocalPlaylists([...localPlaylists, newPlaylist]);
  };

  const getFilteredSongs = () => {
    const allSongs = [...DEFAULT_SONGS, ...localSongs];
    if (selectedLanguage === "all") return allSongs;
    return allSongs.filter(song => song.language === selectedLanguage);
  };

  const getAllSongs = () => {
    return [...DEFAULT_SONGS, ...localSongs];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-4">
      {/* Hidden Audio Element */}
      <audio ref={audioRef} onEnded={playNext} />
      
      {/* Floating Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-32 h-32 bg-indigo-300/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-purple-300/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-pink-300/20 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-4 p-6 rounded-3xl bg-white/90 backdrop-blur-xl border border-white/20 shadow-2xl">
            <div className="p-3 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 shadow-lg">
              <Music className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Comfort Music Generator
              </h1>
              <p className="text-muted-foreground flex items-center gap-2">
                <Heart className="w-4 h-4 text-pink-500" />
                Spotify Integration & Local Storage
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Player */}
          <div className="lg:col-span-2 space-y-6">
            {/* Current Playing Card */}
            <Card className="bg-white/90 backdrop-blur-xl border border-white/20 shadow-2xl">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">Now Playing</CardTitle>
                  <Button onClick={createPlaylist} size="sm" variant="outline">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Playlist
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {currentSong ? (
                  <>
                    {/* Album Art */}
                    <div className="relative h-64 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl overflow-hidden">
                      <img
                        src={currentSong.albumArt || "https://via.placeholder.com/300"}
                        alt={currentSong.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-6">
                        <div className="text-white">
                          <h3 className="text-2xl font-bold mb-1">{currentSong.title}</h3>
                          <p className="text-lg opacity-90">{currentSong.artist}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold rounded-full">
                              {currentSong.language.toUpperCase()}
                            </span>
                            <span className="text-sm">{currentSong.duration}</span>
                            {currentSong.isLocal && (
                              <span className="px-2 py-1 bg-green-500/80 text-white text-xs rounded-full">LOCAL</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Player Controls */}
                    <div className="flex items-center justify-center gap-4">
                      <Button onClick={playPrevious} variant="outline" size="lg" className="rounded-full">
                        <SkipBack className="w-5 h-5" />
                      </Button>
                      <Button onClick={togglePlayPause} size="lg" className="rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white px-8">
                        {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                      </Button>
                      <Button onClick={playNext} variant="outline" size="lg" className="rounded-full">
                        <SkipForward className="w-5 h-5" />
                      </Button>
                    </div>

                    {/* Volume Control */}
                    <div className="flex items-center gap-3">
                      {volume[0] > 0 ? <Volume2 className="w-5 h-5 text-indigo-600" /> : <VolumeX className="w-5 h-5 text-indigo-600" />}
                      <Slider value={volume} onValueChange={setVolume} max={100} step={5} className="flex-1" />
                    </div>

                    {/* Action Buttons */}
                    {currentSong.spotifyUrl && (
                      <div className="flex gap-2">
                        <Button onClick={() => window.open(currentSong.spotifyUrl, '_blank')} variant="outline" className="flex-1">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Open in Spotify
                        </Button>
                        <Button onClick={() => downloadSong(currentSong)} variant="outline">
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="h-64 flex flex-col items-center justify-center text-muted-foreground">
                    <Music className="w-16 h-16 mb-4" />
                    <p className="text-lg">Select a song to play</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Search Section */}
            <Card className="bg-white/90 backdrop-blur-xl border border-white/20 shadow-2xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="w-5 h-5" />
                  Search Music
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Search Input */}
                <div className="flex gap-2">
                  <Input
                    placeholder="Search for songs..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && searchLocalSongs()}
                    className="flex-1"
                  />
                  <Button onClick={searchLocalSongs} variant="outline">Local</Button>
                  <Button onClick={searchSpotify} disabled={isSearchingSpotify}>
                    {isSearchingSpotify ? 'Searching...' : 'Spotify'}
                  </Button>
                </div>

                {/* Search Results */}
                {(searchResults.length > 0 || spotifyResults.length > 0) && (
                  <div className="space-y-4 max-h-64 overflow-y-auto">
                    {searchResults.length > 0 && (
                      <div>
                        <h4 className="font-semibold mb-2">Local Results</h4>
                        <div className="space-y-2">
                          {searchResults.map((song) => (
                            <div key={song.id} onClick={() => playSong(song)} className="flex items-center gap-3 p-3 rounded-lg bg-indigo-50 hover:bg-indigo-100 cursor-pointer transition-colors">
                              <img src={song.albumArt || "https://via.placeholder.com/50"} alt={song.title} className="w-12 h-12 rounded-lg object-cover" />
                              <div className="flex-1">
                                <p className="font-medium">{song.title}</p>
                                <p className="text-sm text-muted-foreground">{song.artist}</p>
                              </div>
                              <span className="text-xs px-2 py-1 bg-indigo-500 text-white rounded-full">{song.language}</span>
                              {song.isLocal && (
                                <Button onClick={(e) => { e.stopPropagation(); removeLocalSong(song.id); }} variant="outline" size="sm">
                                  <Trash2 className="w-3 h-3" />
                                </Button>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {spotifyResults.length > 0 && (
                      <div>
                        <h4 className="font-semibold mb-2">Spotify Results</h4>
                        <div className="space-y-2">
                          {spotifyResults.map((song) => (
                            <div key={song.id} className="flex items-center gap-3 p-3 rounded-lg bg-green-50 hover:bg-green-100 cursor-pointer transition-colors">
                              <img src={song.albumArt || "https://via.placeholder.com/50"} alt={song.title} className="w-12 h-12 rounded-lg object-cover" />
                              <div className="flex-1">
                                <p className="font-medium">{song.title}</p>
                                <p className="text-sm text-muted-foreground">{song.artist}</p>
                              </div>
                              <Button onClick={() => downloadSong(song)} size="sm">
                                <Download className="w-4 h-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Language Filter */}
            <Card className="bg-white/90 backdrop-blur-xl border border-white/20 shadow-2xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="w-5 h-5" />
                  Filter
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-2">
                  <Button
                    variant={selectedLanguage === "all" ? "default" : "outline"}
                    onClick={() => setSelectedLanguage("all")}
                    className="w-full"
                  >
                    All Songs ({getAllSongs().length})
                  </Button>
                  <Button
                    variant={selectedLanguage === "hindi" ? "default" : "outline"}
                    onClick={() => setSelectedLanguage("hindi")}
                    className="w-full"
                  >
                    Hindi ({getAllSongs().filter(s => s.language === 'hindi').length})
                  </Button>
                  <Button
                    variant={selectedLanguage === "english" ? "default" : "outline"}
                    onClick={() => setSelectedLanguage("english")}
                    className="w-full"
                  >
                    English ({getAllSongs().filter(s => s.language === 'english').length})
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Local Playlists */}
            {localPlaylists.length > 0 && (
              <Card className="bg-white/90 backdrop-blur-xl border border-white/20 shadow-2xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5" />
                    My Playlists
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {localPlaylists.map((playlist) => (
                      <div key={playlist.id} className="p-3 rounded-lg bg-purple-50 hover:bg-purple-100 cursor-pointer transition-colors">
                        <p className="font-medium">{playlist.name}</p>
                        <p className="text-sm text-muted-foreground">{playlist.songs.length} songs</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Playlist */}
            <Card className="bg-white/90 backdrop-blur-xl border border-white/20 shadow-2xl">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Music className="w-5 h-5" />
                    Library
                  </div>
                  <Button onClick={() => setShowPlaylist(!showPlaylist)} variant="outline" size="sm">
                    {showPlaylist ? 'Hide' : 'Show'}
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {showPlaylist && (
                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {getFilteredSongs().map((song) => (
                      <div
                        key={song.id}
                        onClick={() => playSong(song)}
                        className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all ${
                          currentSong?.id === song.id
                            ? 'bg-gradient-to-r from-indigo-100 to-purple-100 border-2 border-indigo-300'
                            : 'bg-gray-50 hover:bg-gray-100'
                        }`}
                      >
                        <img src={song.albumArt || "https://via.placeholder.com/50"} alt={song.title} className="w-12 h-12 rounded-lg object-cover" />
                        <div className="flex-1">
                          <p className="font-medium text-sm">{song.title}</p>
                          <p className="text-xs text-muted-foreground">{song.artist}</p>
                        </div>
                        <span className="text-xs px-2 py-1 bg-indigo-500 text-white rounded-full">{song.language}</span>
                        {song.isLocal && (
                          <span className="text-xs px-2 py-1 bg-green-500 text-white rounded-full">LOCAL</span>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
