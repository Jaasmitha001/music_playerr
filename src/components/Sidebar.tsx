
import { Home, Headphones, MessageSquare, Users, Settings, HelpCircle, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { usePlayer } from "../contexts/PlayerContext";

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className = "" }: SidebarProps) {
  const { currentTrack } = usePlayer();
  const location = useLocation();
  const path = location.pathname;

  const menuItems = [
    {
      title: "Profile",
      icon: <User size={18} />,
      path: "/profile",
    },
    {
      title: "Dashboard",
      icon: <Home size={18} />,
      path: "/home",
    },
    {
      title: "Favorite",
      icon: <Headphones size={18} />,
      path: "/favorite",
    },
    {
      title: "Live Chat",
      icon: <MessageSquare size={18} />,
      path: "/chat",
      badge: "3", // This is for the badge shown in the image
    },
    {
      title: "Friends",
      icon: <Users size={18} />,
      path: "/friends",
    }
  ];

  const helpItems = [
    {
      title: "Settings",
      icon: <Settings size={18} />,
      path: "/settings",
    },
    {
      title: "FAQs",
      icon: <HelpCircle size={18} />,
      path: "/faqs",
    }
  ];

  return (
    <div className={`bg-player-sidebar w-56 flex-shrink-0 h-full flex flex-col no-text-select ${className}`}>
      <div className="p-6">
        <Link to="/home" className="flex items-center gap-2 mb-8">
          <div className="bg-player-sidebarActive w-7 h-7 flex items-center justify-center rounded-md">
            <span className="text-white font-bold">♪</span>
          </div>
          <span className="text-white text-lg font-semibold">
            Groovo
          </span>
        </Link>
        
        <div className="mb-8">
          <h3 className="text-xs font-semibold text-gray-500 mb-4 uppercase px-4">Menu</h3>
          <nav className="space-y-1">
            {menuItems.map((item) => (
              <Link 
                key={item.title} 
                to={item.path} 
                className={`sidebar-item relative ${item.path === path ? 'sidebar-item-active' : 'sidebar-item-inactive'}`}
              >
                {item.icon}
                <span>{item.title}</span>
                {item.badge && (
                  <span className="absolute right-4 bg-player-sidebarActive text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </Link>
            ))}
          </nav>
        </div>
        
        <div>
          <h3 className="text-xs font-semibold text-gray-500 mb-4 uppercase px-4">Help</h3>
          <nav className="space-y-1">
            {helpItems.map((item) => (
              <Link 
                key={item.title} 
                to={item.path} 
                className={`sidebar-item ${item.path === path ? 'sidebar-item-active' : 'sidebar-item-inactive'}`}
              >
                {item.icon}
                <span>{item.title}</span>
              </Link>
            ))}
          </nav>
        </div>
      </div>
      
      {currentTrack && (
        <div className="mt-auto p-4 border-t border-white/10 flex items-center gap-3">
          <img 
            src={currentTrack.coverUrl || "https://via.placeholder.com/40"} 
            alt={currentTrack.title} 
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="overflow-hidden">
            <div className="text-sm font-medium text-truncate">{currentTrack.title}</div>
            <div className="text-xs text-player-textSecondary text-truncate">{currentTrack.artist}</div>
          </div>
        </div>
      )}
    </div>
  );
}
