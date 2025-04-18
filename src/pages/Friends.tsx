
import { useState } from "react";
import { Sidebar } from "../components/Sidebar";
import { Header } from "../components/Header";
import { MusicPlayer } from "../components/MusicPlayer";
import { useAuth } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { Search, UserPlus, MessagesSquare, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const Friends = () => {
  const { isAuthenticated } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();
  
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  const friends = [
    { id: 'friend1', name: 'Alex Johnson', status: 'online', lastSeen: 'Now playing: Blinding Lights', image: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=300&h=300&fit=crop' },
    { id: 'friend2', name: 'Emma Wilson', status: 'online', lastSeen: 'Listening to Taylor Swift', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop' },
    { id: 'friend3', name: 'Michael Brown', status: 'offline', lastSeen: 'Last seen 2 hours ago', image: 'https://images.unsplash.com/photo-1552058544-f2b08422138a?w=300&h=300&fit=crop' },
    { id: 'friend4', name: 'Sophia Garcia', status: 'online', lastSeen: 'Browsing playlists', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=300&fit=crop' },
    { id: 'friend5', name: 'Daniel Lee', status: 'offline', lastSeen: 'Last seen yesterday', image: 'https://images.unsplash.com/photo-1583864697784-a0efc8379f70?w=300&h=300&fit=crop' },
    { id: 'friend6', name: 'Olivia Martinez', status: 'online', lastSeen: 'Creating a new playlist', image: 'https://images.unsplash.com/photo-1601412436009-d964bd02edbc?w=300&h=300&fit=crop' },
  ];

  const suggestedFriends = [
    { id: 'suggested1', name: 'Noah Smith', mutualFriends: 5, image: 'https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?w=300&h=300&fit=crop' },
    { id: 'suggested2', name: 'Isabella Clark', mutualFriends: 3, image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=300&fit=crop' },
    { id: 'suggested3', name: 'Ethan Taylor', mutualFriends: 2, image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&h=300&fit=crop' },
    { id: 'suggested4', name: 'Ava White', mutualFriends: 1, image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=300&h=300&fit=crop' },
  ];

  const handleAddFriend = (friendId: string) => {
    toast({
      title: "Friend request sent",
      description: "Your friend request has been sent.",
    });
    console.log("Sent friend request to:", friendId);
  };

  const handleMessage = (friendId: string) => {
    console.log("Open chat with:", friendId);
    toast({
      title: "Chat opened",
      description: "Chat window opened.",
    });
  };

  return (
    <div className="flex h-screen bg-black text-player-text">
      <Sidebar />
      
      <main className="flex-1 overflow-y-auto pb-24">
        <Header />
        
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold">Friends</h1>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-player-textSecondary" size={16} />
              <Input
                type="text"
                placeholder="Search friends..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white/10 border-white/10"
              />
            </div>
          </div>
          
          {/* Current Friends */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Your Friends</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {friends.map(friend => (
                <div key={friend.id} className="flex items-center bg-player-surface p-4 rounded-lg">
                  <div className="relative">
                    <img 
                      src={friend.image} 
                      alt={friend.name} 
                      className="w-14 h-14 rounded-full object-cover"
                    />
                    <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-player-surface ${friend.status === 'online' ? 'bg-green-500' : 'bg-gray-500'}`}></div>
                  </div>
                  <div className="ml-4 flex-1">
                    <h3 className="font-medium">{friend.name}</h3>
                    <p className="text-xs text-player-textSecondary">{friend.lastSeen}</p>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleMessage(friend.id)}
                      className="p-2 hover:bg-white/10 rounded-full"
                    >
                      <MessagesSquare size={18} />
                    </button>
                    <button className="p-2 hover:bg-white/10 rounded-full">
                      <MoreHorizontal size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Friend Suggestions */}
          <div>
            <h2 className="text-xl font-bold mb-4">People You May Know</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {suggestedFriends.map(friend => (
                <div key={friend.id} className="bg-player-surface p-4 rounded-lg flex flex-col items-center text-center">
                  <img 
                    src={friend.image}
                    alt={friend.name}
                    className="w-20 h-20 rounded-full object-cover mb-3"
                  />
                  <h3 className="font-medium">{friend.name}</h3>
                  <p className="text-xs text-player-textSecondary mb-4">{friend.mutualFriends} mutual friends</p>
                  <Button 
                    onClick={() => handleAddFriend(friend.id)}
                    className="w-full bg-player-highlight hover:bg-player-highlight/80"
                    size="sm"
                  >
                    <UserPlus size={16} className="mr-2" />
                    Add Friend
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      
      <MusicPlayer />
    </div>
  );
};

export default Friends;
