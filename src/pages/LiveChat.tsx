
import { useState, useRef, useEffect } from "react";
import { Sidebar } from "../components/Sidebar";
import { Header } from "../components/Header";
import { MusicPlayer } from "../components/MusicPlayer";
import { useAuth } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { Send, Plus, Smile, Paperclip, Image, UserPlus, Play } from "lucide-react";
import { usePlayer } from "../contexts/PlayerContext";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";
import { albums } from "../data/music";

const LiveChat = () => {
  const { isAuthenticated, user } = useAuth();
  const [message, setMessage] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const { playTrack } = usePlayer();
  
  // Auto scroll to bottom on new messages
  useEffect(() => {
    scrollToBottom();
  }, []);
  
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  // Chat members with their messages
  const chatMembers = [
    { id: 'member1', name: 'Meysia', time: 'Now At 10:19', message: 'Good Morning #Grub', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop' },
    { id: 'member2', name: 'Broddy', time: 'Now At 10:06', message: 'Hello Guys, I Have The Latest Music Recommendation', image: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=300&h=300&fit=crop' },
    { id: 'member3', name: 'Wanda', time: 'Now At 09:55', message: 'Oh Yeah… I Like This Song #Brody', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=300&fit=crop' },
    { id: 'member4', name: 'Chelima', time: 'Now At 09:42', message: 'Nice Song #Brody', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop' },
    { id: 'member5', name: 'Jack', time: 'Now At 09:28', message: 'This Music Will Be The Top Music #Brody', image: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=300&h=300&fit=crop' },
  ];

  // Group chats
  const groupChats = [
    { id: 'group1', name: 'Track Pop', members: '130K+ Members With Chat' },
    { id: 'group2', name: 'Mostly Grub', members: '63K+ Members With Chat' },
    { id: 'group3', name: 'Milloway', members: '45K+ Members With Chat' },
    { id: 'group4', name: 'Trading Top Music', members: '122K+ Members With Chat' },
  ];

  // Recent played - using real track data
  const recentlyPlayed = albums.slice(0, 6).map(album => album.tracks[0]);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handlePlayTrack = (track) => {
    playTrack(track);
    toast({
      title: "Now playing",
      description: `${track.title} by ${track.artist}`,
    });
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      // In a real app, this would send the message to a server
      // For now, we'll just clear the input and scroll to bottom
      setMessage("");
      // Adding a slight delay to ensure the DOM updates before scrolling
      setTimeout(scrollToBottom, 100);
      
      toast({
        title: "Message sent",
        description: "Your message has been sent to the chat."
      });
    }
  };
  
  const handleJoinGroup = (groupName: string) => {
    toast({
      title: "Group joined",
      description: `You've joined ${groupName}. Start chatting now!`
    });
  };

  const handleEmojiClick = () => {
    toast({
      title: "Coming soon",
      description: "Emoji picker will be available soon!"
    });
  };

  const handleAttachmentClick = () => {
    toast({
      title: "Coming soon",
      description: "File attachments will be available soon!"
    });
  };

  return (
    <div className="flex h-screen bg-black text-player-text">
      <Sidebar />
      
      <main className="flex-1 overflow-hidden flex">
        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center">
              <h2 className="font-semibold">Live Chat Members</h2>
              <div className="ml-2 flex -space-x-2">
                {chatMembers.slice(0, 3).map((member, index) => (
                  <img 
                    key={index} 
                    src={member.image} 
                    alt={member.name} 
                    className="w-6 h-6 rounded-full border border-black transition-transform hover:scale-110 hover:z-10"
                  />
                ))}
                <span className="w-6 h-6 rounded-full bg-player-highlight flex items-center justify-center text-xs font-semibold border border-black">
                  +{chatMembers.length - 3}
                </span>
              </div>
            </div>
          </div>
          
          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            {chatMembers.map((member) => (
              <div 
                key={member.id} 
                className="flex items-start gap-3 animate-fade-in hover:bg-white/5 p-2 rounded-lg transition-colors duration-200"
              >
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-10 h-10 rounded-full object-cover transition-transform duration-200 hover:scale-110"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium">{member.name}</h3>
                    <span className="text-xs text-player-textSecondary">{member.time}</span>
                  </div>
                  <p className="mt-1 text-sm">{member.message}</p>
                </div>
              </div>
            ))}

            {/* Current User Message */}
            <div className="flex items-start gap-3 justify-end animate-fade-in hover:bg-white/5 p-2 rounded-lg transition-colors duration-200">
              <div className="text-right flex-1">
                <div className="flex items-center gap-2 justify-end">
                  <span className="text-xs text-player-textSecondary">Now</span>
                  <h3 className="font-medium">{user?.name || "You"}</h3>
                </div>
                <p className="mt-1 text-sm bg-player-sidebarActive/20 p-2 rounded-lg inline-block">Wow! What A Beautiful Piece Of Music #Broddy</p>
              </div>
              <img 
                src={user?.avatarUrl || "https://images.unsplash.com/photo-1601412436009-d964bd02edbc?w=300&h=300&fit=crop"} 
                alt="You" 
                className="w-10 h-10 rounded-full object-cover transition-transform duration-200 hover:scale-110"
              />
            </div>
            
            {/* Invisible element to scroll to */}
            <div ref={chatEndRef} />
          </div>
          
          {/* Message Input */}
          <div className="p-4 border-t border-white/10">
            <form onSubmit={handleSendMessage} className="flex items-center gap-3">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type Message..."
                className="flex-1 bg-white/5 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-player-sidebarActive transition-all duration-200 focus:bg-white/10"
              />
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button 
                      type="button" 
                      className="text-player-textSecondary hover:text-white transition-colors duration-200 hover:scale-110"
                      onClick={handleEmojiClick}
                    >
                      <Smile size={20} />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent side="top">
                    <p>Add emoji</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button 
                      type="button" 
                      className="text-player-textSecondary hover:text-white transition-colors duration-200 hover:scale-110"
                      onClick={handleAttachmentClick}
                    >
                      <Paperclip size={20} />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent side="top">
                    <p>Attach file</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button 
                      type="button" 
                      className="text-player-textSecondary hover:text-white transition-colors duration-200 hover:scale-110"
                      onClick={handleAttachmentClick}
                    >
                      <Image size={20} />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent side="top">
                    <p>Add image</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              <button 
                type="submit" 
                className="bg-player-sidebarActive rounded-full p-2 hover:bg-opacity-80 transition-all duration-200 hover:scale-110 active:scale-95"
              >
                <Send size={18} />
              </button>
            </form>
          </div>
        </div>
        
        {/* Right Sidebar */}
        <div className="w-64 border-l border-white/10 flex flex-col">
          {/* User Info */}
          <div className="p-4 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img 
                src={user?.avatarUrl || "https://images.unsplash.com/photo-1601412436009-d964bd02edbc?w=300&h=300&fit=crop"}
                alt="Profile" 
                className="w-8 h-8 rounded-full object-cover transition-transform hover:scale-110"
              />
              <div>
                <h3 className="font-medium text-sm">{user?.name || "You"}</h3>
                <p className="text-xs text-player-textSecondary">Premium King</p>
              </div>
            </div>
          </div>
          
          {/* Create Group Button */}
          <div className="p-4 border-b border-white/10">
            <button className="w-full flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 transition-all duration-300 rounded-md py-2 hover:scale-[1.02]">
              <UserPlus size={16} />
              <span className="text-sm">Create Your Group</span>
            </button>
          </div>
          
          {/* Group Chats */}
          <div className="p-4 border-b border-white/10">
            <h3 className="font-semibold mb-3">Grub Chat</h3>
            <div className="space-y-3">
              {groupChats.map((group) => (
                <div 
                  key={group.id} 
                  className="flex items-center gap-3 cursor-pointer hover:bg-white/5 p-2 rounded-md transition-all duration-200"
                  onClick={() => handleJoinGroup(group.name)}
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-player-sidebarActive to-purple-900 flex items-center justify-center text-sm font-bold transform transition-transform hover:scale-110">
                    {group.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">{group.name}</h4>
                    <p className="text-xs text-player-textSecondary">{group.members}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Recently Played */}
          <div className="p-4 flex-1 overflow-y-auto">
            <h3 className="font-semibold mb-3">Recently Played</h3>
            <div className="space-y-2">
              {recentlyPlayed.map((track) => (
                <div 
                  key={track.id} 
                  className="flex items-center gap-3 group hover:bg-white/5 p-1 rounded-md transition-all duration-200"
                >
                  <img 
                    src={track.coverUrl} 
                    alt={track.title} 
                    className="w-10 h-10 rounded-md object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-truncate">{track.title}</h4>
                    <p className="text-xs text-player-textSecondary text-truncate">{track.artist}</p>
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      className="text-player-sidebarActive hover:scale-110 transition-transform"
                      onClick={() => handlePlayTrack(track)}
                    >
                      <Play size={16} />
                    </button>
                  </div>
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

export default LiveChat;
