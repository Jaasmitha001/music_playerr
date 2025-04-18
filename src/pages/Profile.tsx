import { useState, useRef } from "react";
import { Sidebar } from "../components/Sidebar";
import { Header } from "../components/Header";
import { MusicPlayer } from "../components/MusicPlayer";
import { useAuth } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Camera, Edit2, Save, Music, Play } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Profile = () => {
  const { isAuthenticated, user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || "");
  const [bio, setBio] = useState(user?.bio || "");
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  const handleSave = () => {
    try {
      updateProfile({ name, bio });
      setIsEditing(false);
      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handlePhotoClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="flex h-screen bg-black text-player-text">
      <Sidebar />
      
      <main className="flex-1 overflow-y-auto pb-24">
        <Header />
        
        <div className="p-6 max-w-4xl mx-auto animate-fade-in">
          <div className="mb-8 flex items-end relative">
            <div className="h-36 w-full bg-gradient-to-r from-player-highlight/30 to-purple-800/50 rounded-t-xl 
                        transition-all duration-300 hover:from-player-highlight/40 hover:to-purple-800/60"></div>
            <div className="absolute bottom-0 left-8 transform translate-y-1/2">
              <div className="relative">
                <Avatar 
                  className="h-24 w-24 border-4 border-black transition-transform duration-300 hover:scale-105" 
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}>
                  <AvatarImage src={user?.avatarUrl} />
                  <AvatarFallback className="bg-player-highlight text-white text-2xl">
                    {user?.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <button 
                  className={`absolute bottom-0 right-0 bg-player-highlight rounded-full p-2
                           transition-all duration-300 ${isHovering ? 'scale-110' : ''}`}
                  onClick={handlePhotoClick}
                >
                  <Camera size={16} />
                </button>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  className="hidden" 
                  accept="image/*" 
                  onChange={() => toast({
                    title: "Feature coming soon",
                    description: "Photo upload will be available in the next update.",
                  })}
                />
              </div>
            </div>
            <div className="ml-auto">
              {!isEditing ? (
                <Button 
                  onClick={() => setIsEditing(true)}
                  variant="outline" 
                  className="border-white/20 text-player-text hover:bg-white/5 transition-colors duration-200"
                >
                  <Edit2 size={16} className="mr-2" />
                  Edit Profile
                </Button>
              ) : (
                <Button 
                  onClick={handleSave}
                  className="bg-player-highlight hover:bg-player-highlight/80 transition-colors duration-200"
                >
                  <Save size={16} className="mr-2" />
                  Save Changes
                </Button>
              )}
            </div>
          </div>
          
          <div className="pt-14 bg-player-surface rounded-xl p-6 shadow-lg transition-all duration-300 hover:shadow-xl">
            {isEditing ? (
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1">
                    Display Name
                  </label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-white/5 border-white/10 text-player-text focus-visible:ring-player-highlight
                            transition-all duration-200 focus:scale-[1.01]"
                  />
                </div>
                
                <div>
                  <label htmlFor="bio" className="block text-sm font-medium mb-1">
                    Bio
                  </label>
                  <textarea
                    id="bio"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-md p-2 text-player-text 
                            focus-visible:ring-player-highlight focus:outline-none
                            transition-all duration-200 focus:scale-[1.01]"
                    rows={4}
                  />
                </div>
              </div>
            ) : (
              <div>
                <h1 className="text-2xl font-bold">{user?.name}</h1>
                <p className="text-player-textSecondary mt-2">{user?.bio || "No bio yet. Click Edit Profile to add one."}</p>
                
                <div className="mt-6 flex gap-6 text-center">
                  <div className="transition-all duration-200 hover:scale-105 cursor-pointer">
                    <div className="text-xl font-bold">247</div>
                    <div className="text-sm text-player-textSecondary">Following</div>
                  </div>
                  <div className="transition-all duration-200 hover:scale-105 cursor-pointer">
                    <div className="text-xl font-bold">14K</div>
                    <div className="text-sm text-player-textSecondary">Followers</div>
                  </div>
                  <div className="transition-all duration-200 hover:scale-105 cursor-pointer">
                    <div className="text-xl font-bold">187</div>
                    <div className="text-sm text-player-textSecondary">Playlists</div>
                  </div>
                </div>
              </div>
            )}
            
            <div className="mt-12">
              <h2 className="text-lg font-bold mb-4 flex items-center">
                <Music size={18} className="mr-2 text-player-highlight" />
                Recently Played
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="bg-white/5 p-2 rounded-md group hover:bg-white/10 transition-all duration-300 transform hover:scale-[1.03]">
                    <div className="relative">
                      <img 
                        src={`https://picsum.photos/300/300?random=${i + 10}`}
                        alt={`Recent track ${i}`}
                        className="w-full aspect-square object-cover rounded mb-2"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Button size="icon" variant="ghost" className="bg-player-highlight/80 text-white rounded-full hover:bg-player-highlight hover:scale-110 transition-all">
                          <Play size={20} />
                        </Button>
                      </div>
                    </div>
                    <div className="text-sm font-medium">Track Title {i}</div>
                    <div className="text-xs text-player-textSecondary">Artist Name</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <MusicPlayer />
    </div>
  );
};

export default Profile;
