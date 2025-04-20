
export interface Album {
  id: string;
  title: string;
  artist: string;
  coverUrl: string;
  year: number;
  genre: string;
  tracks: Track[];
}

export interface Track {
  id: string;
  title: string;
  artist: string;
  duration: number;
  albumId: string;
  url: string;
  coverUrl: string;
}

export interface Playlist {
  id: string;
  name: string;
  description: string;
  coverUrl: string;
  tracks: number;
  createdBy: string;
}

export interface Category {
  id: string;
  name: string;
}

export const categories: Category[] = [
  { id: 'all', name: 'All' },
  { id: 'relax', name: 'Relax' },
  { id: 'sad', name: 'Sad' },
  { id: 'party', name: 'Party' },
  { id: 'romance', name: 'Romance' },
  { id: 'energetic', name: 'Energetic' },
  { id: 'relaxing', name: 'Relaxing' },
  { id: 'jazz', name: 'Jazz' },
  { id: 'alternative', name: 'Alternative' },
];

export const albums: Album[] = [
  {
    id: 'album1',
    title: 'City Afterglow',
    artist: 'Jon Hickman',
    coverUrl: 'https://images.unsplash.com/photo-1521336575822-6da63fb45455?q=80&w=300&h=300&auto=format&fit=crop',
    year: 2023,
    genre: 'Electronic',
    tracks: [
      {
        id: 'track1',
        title: 'Afterglow Skyline',
        artist: 'Jon Hickman',
        duration: 238,
        albumId: 'album1',
        url: '#',
        coverUrl: 'https://images.unsplash.com/photo-1521336575822-6da63fb45455?q=80&w=300&h=300&auto=format&fit=crop'
      },
      {
        id: 'track2',
        title: 'Downtown Pulse',
        artist: 'Jon Hickman',
        duration: 197,
        albumId: 'album1',
        url: '#',
        coverUrl: 'https://images.unsplash.com/photo-1521336575822-6da63fb45455?q=80&w=300&h=300&auto=format&fit=crop'
      }
    ]
  },
  {
    id: 'album2',
    title: 'Golden Days',
    artist: 'Tess Carter',
    coverUrl: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=300&h=300&auto=format&fit=crop',
    year: 2022,
    genre: 'R&B',
    tracks: [
      {
        id: 'track3',
        title: 'Golden Days',
        artist: 'Tess Carter',
        duration: 215,
        albumId: 'album2',
        url: '#',
        coverUrl: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=300&h=300&auto=format&fit=crop'
      }
    ]
  },
  {
    id: 'album3',
    title: 'Feeling Human',
    artist: 'Ella Ford',
    coverUrl: 'https://images.unsplash.com/photo-1605020420620-20c943cc4669?q=80&w=300&h=300&auto=format&fit=crop',
    year: 2023,
    genre: 'Pop',
    tracks: [
      {
        id: 'track4',
        title: 'Feeling Human',
        artist: 'Ella Ford',
        duration: 198,
        albumId: 'album3',
        url: '#',
        coverUrl: 'https://images.unsplash.com/photo-1605020420620-20c943cc4669?q=80&w=300&h=300&auto=format&fit=crop'
      }
    ]
  },
  {
    id: 'album4',
    title: 'Waves of Time',
    artist: 'Lana Rivers',
    coverUrl: 'https://images.unsplash.com/photo-1598387993441-a364f854c3e1?q=80&w=300&h=300&auto=format&fit=crop',
    year: 2022,
    genre: 'Electronic',
    tracks: [
      {
        id: 'track5',
        title: 'Waves of Time',
        artist: 'Lana Rivers',
        duration: 225,
        albumId: 'album4',
        url: '#',
        coverUrl: 'https://images.unsplash.com/photo-1598387993441-a364f854c3e1?q=80&w=300&h=300&auto=format&fit=crop'
      }
    ]
  },
  {
    id: 'album5',
    title: 'Neon Dreams',
    artist: 'Miki Lowell',
    coverUrl: 'https://images.unsplash.com/photo-1594623930572-300a3011d9ae?q=80&w=300&h=300&auto=format&fit=crop',
    year: 2023,
    genre: 'Synthwave',
    tracks: [
      {
        id: 'track6',
        title: 'Neon Dreams',
        artist: 'Miki Lowell',
        duration: 210,
        albumId: 'album5',
        url: '#',
        coverUrl: 'https://images.unsplash.com/photo-1594623930572-300a3011d9ae?q=80&w=300&h=300&auto=format&fit=crop'
      }
    ]
  },
  {
    id: 'album6',
    title: 'Shadows & Light',
    artist: 'Ryan Miller',
    coverUrl: 'https://images.unsplash.com/photo-1574169208507-84376144848b?q=80&w=300&h=300&auto=format&fit=crop',
    year: 2022,
    genre: 'Ambient',
    tracks: [
      {
        id: 'track7',
        title: 'Shadows & Light',
        artist: 'Ryan Miller',
        duration: 240,
        albumId: 'album6',
        url: '#',
        coverUrl: 'https://images.unsplash.com/photo-1574169208507-84376144848b?q=80&w=300&h=300&auto=format&fit=crop'
      }
    ]
  }
];

export const featuredPlaylists: Playlist[] = [
  {
    id: 'playlist1',
    name: 'Vibes & Chill',
    description: 'Relaxing beats to unwind',
    coverUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=300&h=300&auto=format&fit=crop',
    tracks: 32,
    createdBy: 'BeatScape'
  },
  {
    id: 'playlist2',
    name: 'Morning Boost',
    description: 'Energizing tunes to start your day',
    coverUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=300&h=300&auto=format&fit=crop',
    tracks: 28,
    createdBy: 'BeatScape'
  },
  {
    id: 'playlist3',
    name: 'Rhythm & Energy',
    description: 'High tempo tracks to keep you moving',
    coverUrl: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=300&h=300&auto=format&fit=crop',
    tracks: 45,
    createdBy: 'BeatScape'
  },
  {
    id: 'playlist4',
    name: 'Playlist of the Day',
    description: 'Fresh picks updated daily',
    coverUrl: 'https://images.unsplash.com/photo-1558459654-c430be5b0a69?q=80&w=300&h=300&auto=format&fit=crop',
    tracks: 28,
    createdBy: 'BeatScape'
  }
];

// Helper function to get track by ID
export function getTrackById(id: string): Track | undefined {
  for (const album of albums) {
    const track = album.tracks.find(t => t.id === id);
    if (track) return track;
  }
  return undefined;
}
