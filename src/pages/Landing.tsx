import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { ChevronRight, Play, Music, Star, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const Landing = () => {
  const { isAuthenticated } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    document.body.classList.add('no-text-select');
    
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      document.body.classList.remove('no-text-select');
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  if (isAuthenticated) {
    return <Navigate to="/home" />;
  }

  const artists = [
    { id: 'artist1', name: 'Ariana Grande', image: 'data:image/jpeg;base64,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' },
    { id: 'artist2', name: 'Taylor Swift', image: 'data:image/jpeg;base64,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' },
    { id: 'artist3', name: 'Ed Sheeran', image: 'data:image/jpeg;base64,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' },
    { id: 'artist4', name: 'Rose', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlz41IbBqnYFl168pFKmmdSmm_h1UIoJ2oYA&s' },
    { id: 'artist5', name: 'Lady Gaga', image: 'data:image/jpeg;base64,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' },
    { id: 'artist6', name: 'Justin Bieber', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTX04OP9oC-kPaxVA-Z2mvPaW_ZSfzWEL9vnQ&s' },
  ];

  const podcasts = [
    { id: 'pod1', title: 'Deep Dive Tech', host: 'Alex Chen', image: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=300&h=300&fit=crop', category: 'Technology' },
    { id: 'pod2', title: 'Mindful Minutes', host: 'Sarah Johnson', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=300&fit=crop', category: 'Wellness' },
    { id: 'pod3', title: 'History Untold', host: 'Mark Williams', image: 'https://images.unsplash.com/photo-1552058544-f2b08422138a?w=300&h=300&fit=crop', category: 'History' },
    { id: 'pod4', title: 'Creative Corner', host: 'Emma Rodriguez', image: 'https://images.unsplash.com/photo-1639149888905-fb39731f2e6c?w=300&h=300&fit=crop', category: 'Arts' },
    { id: 'pod5', title: 'Future Forecast', host: 'David Park', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop', category: 'Science' },
    { id: 'pod6', title: 'Global Grooves', host: 'Leila Hassan', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop', category: 'Music' },
  ];

  const newReleases = [
    { id: 'release1', title: 'Midnight Memories', artist: 'Luna Ray', image: 'https://images.unsplash.com/photo-1561211974-8a2737b4dcac?w=300&h=300&fit=crop' },
    { id: 'release2', title: 'Eternal Summer', artist: 'The Weekenders', image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop' },
    { id: 'release3', title: 'Neon Dreams', artist: 'Aria Skye', image: 'https://images.unsplash.com/photo-1598387181032-a3103a2db5b3?w=300&h=300&fit=crop' },
    { id: 'release4', title: 'Urban Echo', artist: 'Echo & Flow', image: 'https://images.unsplash.com/photo-1496293455970-f8581aae0e3b?w=300&h=300&fit=crop' },
    { id: 'release5', title: 'Starlight', artist: 'Midnight Tales', image: 'https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=300&h=300&fit=crop' },
    { id: 'release6', title: 'Phoenix Rising', artist: 'Ember Collective', image: 'https://images.unsplash.com/photo-1484876065684-b683cf17d276?w=300&h=300&fit=crop' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-purple-900/30 to-black overflow-x-hidden">
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-black/80 backdrop-blur-md py-4' : 'py-6'}`}>
        <div className="flex items-center justify-between px-6 md:px-12 lg:px-20 max-w-7xl mx-auto">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-player-sidebarActive w-7 h-7 flex items-center justify-center rounded-md transition-transform group-hover:scale-110 duration-300">
              <span className="text-white font-bold">♪</span>
            </div>
            <span className="text-lg font-semibold text-white group-hover:text-player-highlight transition-colors">
              Groovo
            </span>
          </Link>
          
          <div className="flex gap-2">
            <Link to="/login">
              <Button variant="outline" className="border-white/20 text-player-text hover:bg-white/5 transition-all duration-300 hover:border-white/40">
                Log in
              </Button>
            </Link>
            <Link to="/signup">
              <Button className="bg-player-highlight text-white hover:bg-player-highlight/80 transition-all duration-300 hover:scale-105">
                Sign up
              </Button>
            </Link>
          </div>
        </div>
      </header>
      
      <section className="mt-28 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1 space-y-6 animate-fade-in">
            <div className="inline-block bg-gradient-to-r from-purple-400 to-pink-600 rounded-full px-3 py-1 text-sm font-medium mb-2">
              <Sparkles className="inline-block mr-1" size={14}/> New Experience
            </div>
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-white to-player-highlight bg-clip-text text-transparent">
              Music that moves <br/> with you
            </h1>
            <p className="text-lg text-player-textSecondary">
              Stream millions of tracks, podcasts and playlists for any mood. Discover new music and build your collection.
            </p>
            <Link to="/signup">
            </Link>
          </div>
          
          <div className="flex-1 relative animate-fade-in">
            <div className="grid grid-cols-3 gap-4 rotate-3 hover:rotate-0 transition-all duration-700">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
                <div 
                  key={i} 
                  className={`${i % 2 === 0 ? 'translate-y-3' : ''} rounded-lg overflow-hidden shadow-lg transition-all duration-500 hover:scale-105 hover:z-10 hover:shadow-xl hover:shadow-player-highlight/20`}
                >
                  <img 
                    src={`https://picsum.photos/300/300?random=${i}`} 
                    alt={`Album cover ${i}`} 
                    className="w-full aspect-square object-cover"
                  />
                </div>
              ))}
            </div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-player-highlight/20 rounded-full blur-3xl"></div>
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-purple-700/20 rounded-full blur-3xl"></div>
          </div>
        </div>
      </section>
      
      <section className="mt-24 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-2xl font-bold flex items-center">
            <Music size={20} className="mr-2 text-player-highlight" />
            New Releases
          </h2>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {newReleases.map((release) => (
            <div 
              key={release.id} 
              className="group relative bg-white/5 rounded-lg overflow-hidden hover:bg-white/10 transition-all duration-300 hover:translate-y-[-5px] hover:shadow-lg"
            >
              <div className="aspect-square relative overflow-hidden">
                <img 
                  src={release.image} 
                  alt={release.title} 
                  className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <button className="bg-player-highlight rounded-full p-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <Play size={20} fill="white" />
                  </button>
                </div>
              </div>
              <div className="p-3">
                <h3 className="font-medium text-truncate">{release.title}</h3>
                <p className="text-sm text-player-textSecondary text-truncate">{release.artist}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      <section className="mt-16 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-2xl font-bold flex items-center">
            <Star size={20} className="mr-2 text-player-highlight" />
            Popular Artists
          </h2>
          <Link to="/home" className="text-sm text-player-highlight hover:underline">
            View all
          </Link>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {artists.map((artist) => (
            <div key={artist.id} className="flex flex-col items-center group">
              <div className="relative">
                <Avatar className="w-28 h-28 md:w-36 md:h-36 hover:scale-105 transition-transform duration-500 cursor-pointer group-hover:shadow-lg group-hover:shadow-player-highlight/20">
                  <AvatarImage src={artist.image} alt={artist.name} className="object-cover" />
                  <AvatarFallback>{artist.name.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <div className="absolute inset-0 rounded-full bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                  <Play size={24} className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform group-hover:scale-110" />
                </div>
              </div>
              <h3 className="mt-3 font-medium group-hover:text-player-highlight transition-colors duration-300">{artist.name}</h3>
              <p className="text-xs text-player-textSecondary">Artist</p>
            </div>
          ))}
        </div>
      </section>
      
      <section className="mt-16 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-2xl font-bold">Popular Podcasts</h2>
          <Link to="/home" className="text-sm text-player-highlight hover:underline">
            View all
          </Link>
        </div>
        
        <Carousel className="w-full">
          <CarouselContent className="-ml-2 md:-ml-4">
            {podcasts.map((podcast) => (
              <CarouselItem key={podcast.id} className="pl-2 md:pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                <Card className="border-0 bg-white/5 hover:bg-white/10 transition-all duration-300 hover:shadow-lg">
                  <CardContent className="p-0">
                    <div className="flex items-center gap-4 p-4 group">
                      <div className="flex-shrink-0 relative overflow-hidden rounded-md">
                        <img 
                          src={podcast.image} 
                          alt={podcast.title} 
                          className="w-16 h-16 object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>
                      <div className="flex-grow overflow-hidden">
                        <h3 className="font-medium text-truncate group-hover:text-player-highlight transition-colors duration-300">{podcast.title}</h3>
                        <p className="text-xs text-player-textSecondary text-truncate">{podcast.host}</p>
                        <span className="text-xs mt-1 bg-white/10 px-2 py-0.5 rounded-full inline-block">{podcast.category}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-center mt-4 gap-2">
            <CarouselPrevious className="static transform-none bg-white/10 hover:bg-white/20 border-0" />
            <CarouselNext className="static transform-none bg-white/10 hover:bg-white/20 border-0" />
          </div>
        </Carousel>
      </section>
      
      <section className="mt-24 mb-20 px-6 md:px-12 lg:px-20">
        <div className="bg-gradient-to-r from-purple-900/40 to-player-highlight/30 rounded-xl p-10 text-center max-w-4xl mx-auto hover:shadow-lg hover:shadow-player-highlight/20 transition-all duration-300 transform hover:scale-[1.01]">
          <h2 className="text-3xl font-bold mb-4">Ready to start listening?</h2>
          <p className="text-lg text-player-textSecondary mb-8 max-w-lg mx-auto">
            Join millions of listeners and discover your new favorite song today.
          </p>
          <div className="flex gap-4 justify-center">
            <Link to="/signup">
              <Button className="bg-player-highlight text-white hover:bg-player-highlight/80 px-8 py-6 text-lg rounded-full hover:scale-105 transition-all duration-300">
                Get Started Free
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="outline" className="border-white/20 text-player-text hover:bg-white/5 px-8 py-6 text-lg rounded-full transition-all duration-300">
                Log In
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      <footer className="border-t border-white/10 py-8 px-6 md:px-12 lg:px-20">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="bg-player-highlight w-6 h-6 flex items-center justify-center rounded-md">
              <span className="text-white font-bold text-sm">♪</span>
            </div>
            <span className="text-lg">
              <span className="font-bold">Groovo</span>
            </span>
            <span className="text-player-textSecondary text-sm">© 2025 Groovo. All rights reserved.</span>
          </div>
          
          <div className="flex gap-8">
            <a href="#" className="text-player-textSecondary hover:text-player-text text-sm transition-colors duration-200">Terms</a>
            <a href="#" className="text-player-textSecondary hover:text-player-text text-sm transition-colors duration-200">Privacy</a>
            <a href="#" className="text-player-textSecondary hover:text-player-text text-sm transition-colors duration-200">About</a>
            <a href="#" className="text-player-textSecondary hover:text-player-text text-sm transition-colors duration-200">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
