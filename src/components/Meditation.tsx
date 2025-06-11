import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Brain, Play, Pause, Timer, Heart, Music, Headphones, BookOpen, Moon, SkipBack, SkipForward, Volume2, VolumeX, Clock, Share2, Bookmark, MessageCircle, Sun, Sparkles } from 'lucide-react';

interface MeditationTrack {
  id: string;
  title: string;
  artist: string;
  duration: number;
  audioUrl: string;
  coverImage: string;
  category: string;
  likes: number;
  comments: number;
  notes?: string;
}

interface Playlist {
  id: string;
  title: string;
  description: string;
  tracks: MeditationTrack[];
  coverImage: string;
  icon: React.ElementType;
}

const Meditation = () => {
  const [activeTab, setActiveTab] = useState('sessions');
  const [currentTrack, setCurrentTrack] = useState<MeditationTrack | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [showNotes, setShowNotes] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const tracks: MeditationTrack[] = [
    {
      id: '1',
      title: 'Morning Meditation',
      artist: 'Mindful Moments',
      duration: 600,
      audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
      coverImage: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&auto=format&fit=crop&q=60',
      category: 'Morning',
      likes: 234,
      comments: 45,
      notes: 'Start your day with this gentle meditation focusing on breath awareness and setting positive intentions.'
    },
    {
      id: '2',
      title: 'Stress Relief',
      artist: 'Calm Collective',
      duration: 900,
      audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
      coverImage: 'https://images.unsplash.com/photo-1508672019048-805c876b67e2?w=800&auto=format&fit=crop&q=60',
      category: 'Stress',
      likes: 189,
      comments: 32,
      notes: 'A guided meditation to help release tension and find inner peace during stressful moments.'
    },
    {
      id: '3',
      title: 'Deep Sleep',
      artist: 'Sleep Well',
      duration: 1200,
      audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
      coverImage: 'https://images.unsplash.com/photo-1541480609187-5ec6ea5e9a27?w=800&auto=format&fit=crop&q=60',
      category: 'Sleep',
      likes: 312,
      comments: 67,
      notes: 'A soothing meditation designed to help you relax and prepare for a restful night\'s sleep.'
    },
    {
      id: '4',
      title: 'Mindful Breathing',
      artist: 'Peaceful Mind',
      duration: 480,
      audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
      coverImage: 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?w=800&auto=format&fit=crop&q=60',
      category: 'Breathing',
      likes: 156,
      comments: 28,
      notes: 'Focus on your breath with this guided breathing meditation for clarity and calm.'
    },
    {
      id: '5',
      title: 'Body Scan',
      artist: 'Wellness Guide',
      duration: 720,
      audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
      coverImage: 'https://images.unsplash.com/photo-1515896769750-31548aa180ed?w=800&auto=format&fit=crop&q=60',
      category: 'Body',
      likes: 198,
      comments: 42,
      notes: 'A progressive body scan meditation to release tension and promote relaxation.'
    },
    {
      id: '6',
      title: 'Gratitude Practice',
      artist: 'Mindful Living',
      duration: 540,
      audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3',
      coverImage: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&auto=format&fit=crop&q=60',
      category: 'Gratitude',
      likes: 245,
      comments: 53,
      notes: 'Cultivate gratitude and positive thinking with this uplifting meditation practice.'
    }
  ];

  const playlists: Playlist[] = [
    {
      id: '1',
      title: 'Morning Routine',
      description: 'Start your day with mindfulness and intention',
      tracks: tracks.filter(track => track.category === 'Morning' || track.category === 'Breathing'),
      coverImage: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&auto=format&fit=crop&q=60',
      icon: Sun
    },
    {
      id: '2',
      title: 'Stress Relief',
      description: 'Find peace in challenging moments',
      tracks: tracks.filter(track => track.category === 'Stress' || track.category === 'Body'),
      coverImage: 'https://images.unsplash.com/photo-1508672019048-805c876b67e2?w=800&auto=format&fit=crop&q=60',
      icon: Heart
    },
    {
      id: '3',
      title: 'Sleep Well',
      description: 'Prepare your mind and body for restful sleep',
      tracks: tracks.filter(track => track.category === 'Sleep'),
      coverImage: 'https://images.unsplash.com/photo-1541480609187-5ec6ea5e9a27?w=800&auto=format&fit=crop&q=60',
      icon: Moon
    },
    {
      id: '4',
      title: 'Gratitude & Positivity',
      description: 'Cultivate a positive mindset through gratitude',
      tracks: tracks.filter(track => track.category === 'Gratitude'),
      coverImage: 'https://images.unsplash.com/photo-1515896769750-31548aa180ed?w=800&auto=format&fit=crop&q=60',
      icon: Sparkles
    }
  ];

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.addEventListener('timeupdate', handleTimeUpdate);
      audioRef.current.addEventListener('ended', handleTrackEnd);
      audioRef.current.addEventListener('error', handleAudioError);
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('timeupdate', handleTimeUpdate);
        audioRef.current.removeEventListener('ended', handleTrackEnd);
        audioRef.current.removeEventListener('error', handleAudioError);
        audioRef.current.pause();
        audioRef.current.src = '';
      }
    };
  }, []);

  const handleAudioError = (e: Event) => {
    console.error('Audio playback error:', e);
    setIsPlaying(false);
  };

  const handleTrackEnd = () => {
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleTrackSelect = (track: MeditationTrack) => {
    if (audioRef.current) {
      if (currentTrack?.id === track.id) {
        if (isPlaying) {
          audioRef.current.pause();
          setIsPlaying(false);
        } else {
          audioRef.current.play().catch(handleAudioError);
          setIsPlaying(true);
        }
      } else {
        audioRef.current.src = track.audioUrl;
        audioRef.current.load();
        audioRef.current.play().catch(handleAudioError);
        setCurrentTrack(track);
        setIsPlaying(true);
        setCurrentTime(0);
      }
    }
  };

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(handleAudioError);
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const handleMuteToggle = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const seekTime = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = seekTime;
      setCurrentTime(seekTime);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const ImageWithFallback = ({ src, alt, className }: { src: string; alt: string; className?: string }) => {
    const [imgSrc, setImgSrc] = useState(src);
    const [isLoading, setIsLoading] = useState(true);

    const handleError = () => {
      setImgSrc('https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&auto=format&fit=crop&q=60');
      setIsLoading(false);
    };

    return (
      <div className={`relative ${className}`}>
        {isLoading && (
          <div className="absolute inset-0 bg-[#1E1E1E] animate-pulse" />
        )}
        <img
          src={imgSrc}
          alt={alt}
          className={`w-full h-full object-cover ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
          onLoad={() => setIsLoading(false)}
          onError={handleError}
        />
      </div>
    );
  };

  const TrackCard = ({ track, onSelect, isPlaying }: { track: MeditationTrack; onSelect: () => void; isPlaying: boolean }) => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className={`glass-card overflow-hidden relative ${isPlaying ? 'ring-1 ring-[#FF7A00]/50' : ''}`}
    >
      <div className="relative">
        <ImageWithFallback
          src={track.coverImage}
          alt={track.title}
          className="w-full h-48"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200">
          <button 
            onClick={onSelect}
            className={`w-12 h-12 rounded-full ${isPlaying ? 'bg-white' : 'bg-[#FF7A00]'} flex items-center justify-center transition-colors duration-200`}
          >
            {isPlaying ? (
              <Pause className={`w-6 h-6 ${isPlaying ? 'text-[#FF7A00]' : 'text-black'}`} />
            ) : (
              <Play className="w-6 h-6 text-black" />
            )}
          </button>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className={`px-2 py-1 ${isPlaying ? 'bg-[#FF7A00] text-white' : 'bg-[#FF7A00]/20 text-[#FF7A00]'} rounded-full text-sm transition-colors duration-200`}>
            {track.category}
          </span>
          {isPlaying && (
            <div className="flex items-center gap-1 text-[#FF7A00]">
              <Music className="w-4 h-4" />
              <span className="text-sm">Now Playing</span>
            </div>
          )}
        </div>
        <h3 className={`text-lg font-bold ${isPlaying ? 'text-[#FF7A00]' : 'text-white'} mb-1 transition-colors duration-200`}>
          {track.title}
        </h3>
        <p className="text-[#B3B3B3] text-sm mb-3">By {track.artist}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 text-[#B3B3B3]">
              <Clock className="w-4 h-4" />
              <span>{formatTime(track.duration)}</span>
            </div>
            <div className="flex items-center gap-1 text-[#B3B3B3]">
              <Heart className="w-4 h-4" />
              <span>{track.likes}</span>
            </div>
          </div>
          <button 
            onClick={() => setShowNotes(!showNotes)}
            className={`${isPlaying ? 'text-white' : 'text-[#FF7A00]'} hover:text-[#FFB347] transition-colors duration-200`}
          >
            {showNotes ? 'Hide Notes' : 'Show Notes'}
          </button>
        </div>
        {showNotes && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="mt-4 p-3 bg-[#1E1E1E] rounded-lg overflow-hidden"
          >
            <p className="text-[#B3B3B3] text-sm">{track.notes}</p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );

  const PlaylistCard = ({ playlist, onTrackSelect }: { playlist: Playlist; onTrackSelect: (track: MeditationTrack) => void }) => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="glass-card overflow-hidden"
    >
      <div className="relative">
        <ImageWithFallback
          src={playlist.coverImage}
          alt={playlist.title}
          className="w-full h-48"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <playlist.icon className="w-12 h-12 text-white" />
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-2">{playlist.title}</h3>
        <p className="text-[#B3B3B3] mb-4">{playlist.description}</p>
        <div className="space-y-2">
          {playlist.tracks.map((track) => (
            <div 
              key={track.id}
              className="flex items-center justify-between p-2 hover:bg-[#1E1E1E] rounded-lg cursor-pointer"
              onClick={() => onTrackSelect(track)}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-[#FF7A00]/20 flex items-center justify-center">
                  <Music className="w-4 h-4 text-[#FF7A00]" />
                </div>
                <div>
                  <p className="text-white text-sm">{track.title}</p>
                  <p className="text-[#B3B3B3] text-xs">{track.artist}</p>
                </div>
              </div>
              <span className="text-[#B3B3B3] text-sm">{formatTime(track.duration)}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-gradient-to-r from-[#FF7A00]/20 to-[#FFB347]/20 backdrop-blur-lg rounded-2xl p-6 border border-[#FF7A00]/20"
      >
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-[#FF7A00] flex items-center justify-center">
            <Headphones className="w-8 h-8 text-black" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">Meditation & Mindfulness</h1>
            <p className="text-white/70">Find peace and clarity through guided meditation</p>
          </div>
        </div>
      </motion.div>

      {/* Navigation Tabs */}
      <div className="glass-card p-4">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveTab('sessions')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'sessions'
                ? 'bg-[#FF7A00] text-black'
                : 'bg-[#1E1E1E] text-white hover:bg-[#2A2A2A]'
            }`}
          >
            <Music className="w-4 h-4" />
            <span>Meditation Sessions</span>
          </button>
          <button
            onClick={() => setActiveTab('playlists')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'playlists'
                ? 'bg-[#FF7A00] text-black'
                : 'bg-[#1E1E1E] text-white hover:bg-[#2A2A2A]'
            }`}
          >
            <Timer className="w-4 h-4" />
            <span>Playlists</span>
          </button>
        </div>
      </div>

      {/* Content Section */}
      <div className="mt-6">
        {activeTab === 'sessions' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tracks.map((track) => (
              <TrackCard
                key={track.id}
                track={track}
                onSelect={() => handleTrackSelect(track)}
                isPlaying={currentTrack?.id === track.id && isPlaying}
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {playlists.map((playlist) => (
              <PlaylistCard
                key={playlist.id}
                playlist={playlist}
                onTrackSelect={handleTrackSelect}
              />
            ))}
          </div>
        )}
      </div>

      {/* Audio Player */}
      {currentTrack && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-0 left-0 right-0 bg-[#1A1A1A] border-t border-[#2A2A2A] p-4"
        >
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            <div className="flex items-center gap-4 flex-1">
              <img
                src={currentTrack.coverImage}
                alt={currentTrack.title}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div>
                <h3 className="font-bold">{currentTrack.title}</h3>
                <p className="text-[#B3B3B3] text-sm">{currentTrack.artist}</p>
              </div>
            </div>

            <div className="flex flex-col items-center gap-2 flex-1">
              <div className="flex items-center gap-4">
                <button
                  onClick={handlePlayPause}
                  className="w-10 h-10 rounded-full bg-[#FF7A00] flex items-center justify-center hover:bg-[#FFB347] transition-colors"
                >
                  {isPlaying ? (
                    <Pause className="w-5 h-5 text-black" />
                  ) : (
                    <Play className="w-5 h-5 text-black" />
                  )}
                </button>
              </div>
              <div className="flex items-center gap-2 w-full">
                <span className="text-sm text-[#B3B3B3]">{formatTime(currentTime)}</span>
                <input
                  type="range"
                  min={0}
                  max={currentTrack.duration}
                  value={currentTime}
                  onChange={handleSeek}
                  className="flex-1 h-1 bg-[#2A2A2A] rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#FF7A00]"
                />
                <span className="text-sm text-[#B3B3B3]">{formatTime(currentTrack.duration)}</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={handleMuteToggle}
                className="text-[#B3B3B3] hover:text-white transition-colors"
              >
                {isMuted ? (
                  <VolumeX className="w-5 h-5" />
                ) : (
                  <Volume2 className="w-5 h-5" />
                )}
              </button>
              <input
                type="range"
                min={0}
                max={1}
                step={0.1}
                value={volume}
                onChange={handleVolumeChange}
                className="w-24 h-1 bg-[#2A2A2A] rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#FF7A00]"
              />
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Meditation; 