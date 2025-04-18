
import { Play } from "lucide-react";
import { useState } from "react";
import { Album, Track } from "../data/music";
import { usePlayer } from "../contexts/PlayerContext";

interface AlbumCardProps {
  album: Album;
  className?: string;
}

export function AlbumCard({ album, className = "" }: AlbumCardProps) {
  const [isHovering, setIsHovering] = useState(false);
  const { playTrack } = usePlayer();
  
  const handlePlay = () => {
    if (album.tracks.length > 0) {
      playTrack(album.tracks[0]);
    }
  };
  
  return (
    <div 
      className={`album-card group relative ${className}`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="relative aspect-square mb-3 overflow-hidden rounded-md">
        <img 
          src={album.coverUrl} 
          alt={album.title} 
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
        />
        {isHovering && (
          <div 
            className="absolute bottom-2 right-2 bg-player-highlight rounded-full p-3 shadow-lg cursor-pointer hover:scale-110 transition-transform"
            onClick={handlePlay}
          >
            <Play size={16} fill="white" className="text-white ml-0.5" />
          </div>
        )}
      </div>
      <h3 className="font-medium text-sm text-truncate">{album.title}</h3>
      <p className="text-xs text-player-textSecondary text-truncate">{album.artist}</p>
    </div>
  );
}

interface TrackCardProps {
  track: Track;
  className?: string;
}

export function TrackCard({ track, className = "" }: TrackCardProps) {
  const [isHovering, setIsHovering] = useState(false);
  const { playTrack } = usePlayer();
  
  return (
    <div 
      className={`album-card group relative ${className}`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onClick={() => playTrack(track)}
    >
      <div className="relative aspect-square mb-3 overflow-hidden rounded-md">
        <img 
          src={track.coverUrl} 
          alt={track.title} 
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
        />
        {isHovering && (
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <div className="bg-player-highlight rounded-full p-3 shadow-lg">
              <Play size={20} fill="white" className="text-white ml-0.5" />
            </div>
          </div>
        )}
      </div>
      <h3 className="font-medium text-sm text-truncate">{track.title}</h3>
      <p className="text-xs text-player-textSecondary text-truncate">{track.artist}</p>
    </div>
  );
}

interface PlaylistCardProps {
  playlist: {
    id: string;
    name: string;
    description?: string;
    coverUrl: string;
    tracks?: number;
  };
  className?: string;
}

export function PlaylistCard({ playlist, className = "" }: PlaylistCardProps) {
  const [isHovering, setIsHovering] = useState(false);
  
  return (
    <div 
      className={`album-card group relative ${className}`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="relative aspect-square mb-3 overflow-hidden rounded-md">
        <img 
          src={playlist.coverUrl} 
          alt={playlist.name} 
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
        />
        {isHovering && (
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <div className="bg-player-highlight rounded-full p-3 shadow-lg">
              <Play size={20} fill="white" className="text-white ml-0.5" />
            </div>
          </div>
        )}
      </div>
      <h3 className="font-medium text-sm text-truncate">{playlist.name}</h3>
      {playlist.description && (
        <p className="text-xs text-player-textSecondary text-truncate">{playlist.description}</p>
      )}
      {playlist.tracks && (
        <p className="text-xs text-player-textSecondary mt-1">{playlist.tracks} tracks</p>
      )}
    </div>
  );
}
