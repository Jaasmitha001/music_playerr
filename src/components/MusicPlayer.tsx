
import { useEffect, useState, useRef } from "react";
import { usePlayer } from "../contexts/PlayerContext";
import { Play, Pause, SkipBack, SkipForward, Volume2, Volume1, VolumeX, Heart, Repeat, Shuffle } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export function MusicPlayer() {
  const { currentTrack, isPlaying, togglePlayPause, volume, setVolume, nextTrack, prevTrack } = usePlayer();
  const [progress, setProgress] = useState(0);
  const [liked, setLiked] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  // Create audio element on mount
  useEffect(() => {
    audioRef.current = new Audio();
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Update audio source when track changes
  useEffect(() => {
    if (!currentTrack || !audioRef.current) return;
    
    // In a real app, we would set the audio source to the track's URL
    audioRef.current.src = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";
    
    if (isPlaying) {
      audioRef.current.play().catch(e => console.error("Playback error:", e));
    } else {
      audioRef.current.pause();
    }
    
    // Reset progress
    setProgress(0);
  }, [currentTrack]);

  // Handle play/pause state changes
  useEffect(() => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.play().catch(e => console.error("Playback error:", e));
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  // Update volume when it changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);
  
  // Update progress during playback
  useEffect(() => {
    if (!audioRef.current || !currentTrack) return;
    
    const updateProgress = () => {
      if (!audioRef.current) return;
      const percentage = (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(percentage || 0);
      
      // Handle track ended
      if (audioRef.current.ended) {
        if (repeat) {
          audioRef.current.currentTime = 0;
          audioRef.current.play().catch(e => console.error("Replay error:", e));
        } else {
          nextTrack();
        }
      }
    };
    
    audioRef.current.addEventListener("timeupdate", updateProgress);
    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener("timeupdate", updateProgress);
      }
    };
  }, [currentTrack, nextTrack, repeat]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleVolumeChange = (newVolume: number[]) => {
    setVolume(newVolume[0]);
  };

  const handleProgressChange = (newProgress: number[]) => {
    if (!audioRef.current || !currentTrack) return;
    
    const seekTime = (newProgress[0] / 100) * audioRef.current.duration;
    audioRef.current.currentTime = seekTime;
    setProgress(newProgress[0]);
  };

  // If no track is selected, don't render the player
  if (!currentTrack) return null;
  
  const currentTime = audioRef.current ? audioRef.current.currentTime : 0;
  const duration = audioRef.current ? audioRef.current.duration : currentTrack.duration;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black bg-opacity-95 border-t border-white/5 px-4 py-3 flex items-center backdrop-blur-sm transition-all duration-300 hover:bg-opacity-100 z-50">
      <div className="flex items-center w-1/4">
        <img 
          src={currentTrack.coverUrl} 
          alt={currentTrack.title}
          className="h-14 w-14 object-cover rounded-md mr-3 transition-transform duration-300 hover:scale-105 cursor-pointer"
        />
        <div>
          <h4 className="text-sm font-medium text-truncate">{currentTrack.title}</h4>
          <p className="text-xs text-player-textSecondary text-truncate">{currentTrack.artist}</p>
        </div>
        <button 
          className={`ml-4 text-player-textSecondary hover:text-player-highlight transition-colors duration-200 ${liked ? 'text-player-highlight' : ''}`}
          onClick={() => setLiked(!liked)}
        >
          <Heart size={16} fill={liked ? "currentColor" : "none"} />
        </button>
      </div>
      
      <div className="flex-1 flex flex-col items-center justify-center px-4">
        <div className="flex items-center gap-4 mb-1">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button 
                  className={`text-player-textSecondary hover:text-player-text transition-colors duration-200 ${shuffle ? 'text-player-highlight' : ''}`}
                  onClick={() => setShuffle(!shuffle)}
                >
                  <Shuffle size={20} />
                </button>
              </TooltipTrigger>
              <TooltipContent side="top">
                <p>Shuffle</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button 
                  className="text-player-textSecondary hover:text-player-text transition-colors duration-200 transform active:scale-90" 
                  onClick={prevTrack}
                >
                  <SkipBack size={20} />
                </button>
              </TooltipTrigger>
              <TooltipContent side="top">
                <p>Previous</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <button 
            className="bg-white text-black rounded-full p-2 hover:scale-105 transition-transform duration-200 active:scale-95"
            onClick={togglePlayPause}
          >
            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
          </button>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button 
                  className="text-player-textSecondary hover:text-player-text transition-colors duration-200 transform active:scale-90" 
                  onClick={nextTrack}
                >
                  <SkipForward size={20} />
                </button>
              </TooltipTrigger>
              <TooltipContent side="top">
                <p>Next</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button 
                  className={`text-player-textSecondary hover:text-player-text transition-colors duration-200 ${repeat ? 'text-player-highlight' : ''}`}
                  onClick={() => setRepeat(!repeat)}
                >
                  <Repeat size={20} />
                </button>
              </TooltipTrigger>
              <TooltipContent side="top">
                <p>Repeat</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        
        <div className="w-full flex items-center gap-2">
          <span className="text-xs text-player-textSecondary w-10 text-right">
            {formatTime(currentTime)}
          </span>
          <div className="flex-1">
            <Slider
              value={[progress]}
              min={0}
              max={100}
              step={0.1}
              className="cursor-pointer"
              onValueChange={handleProgressChange}
            />
          </div>
          <span className="text-xs text-player-textSecondary w-10">
            {formatTime(duration || 0)}
          </span>
        </div>
      </div>
      
      <div className="w-1/4 flex items-center justify-end gap-2">
        <div className="text-player-textSecondary">
          {volume === 0 ? (
            <VolumeX size={20} />
          ) : volume < 0.5 ? (
            <Volume1 size={20} />
          ) : (
            <Volume2 size={20} />
          )}
        </div>
        <div className="w-24">
          <Slider
            value={[volume]}
            min={0}
            max={1}
            step={0.01}
            onValueChange={handleVolumeChange}
            className="cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}
