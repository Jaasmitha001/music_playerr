
import { useState } from "react";
import { Sidebar } from "../components/Sidebar";
import { Header } from "../components/Header";
import { MusicPlayer } from "../components/MusicPlayer";
import { useAuth } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Lock, Mail, Bell, Globe, Shield, Power } from "lucide-react";

const Settings = () => {
  const { isAuthenticated, logout } = useAuth();
  const [activeSection, setActiveSection] = useState("account");
  const { toast } = useToast();
  
  // Mock settings state
  const [email, setEmail] = useState("user@example.com");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [notificationEmail, setNotificationEmail] = useState(true);
  const [notificationPush, setNotificationPush] = useState(true);
  const [notificationSocial, setNotificationSocial] = useState(false);
  const [language, setLanguage] = useState("english");
  const [theme, setTheme] = useState("dark");
  const [quality, setQuality] = useState("high");
  const [downloadOnly, setDownloadOnly] = useState(false);
  const [privateSession, setPrivateSession] = useState(false);
  
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  const handleSavePassword = () => {
    if (newPassword !== confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match.",
        variant: "destructive",
      });
      return;
    }
    
    if (newPassword.length < 8) {
      toast({
        title: "Password too short",
        description: "Password should be at least 8 characters long.",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Password updated",
      description: "Your password has been updated successfully.",
    });
    
    setNewPassword("");
    setConfirmPassword("");
  };

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out",
      description: "You've been successfully logged out.",
    });
  };

  const settingsSections = [
    { id: "account", label: "Account", icon: <Mail size={18} /> },
    { id: "security", label: "Security", icon: <Lock size={18} /> },
    { id: "notifications", label: "Notifications", icon: <Bell size={18} /> },
    { id: "language", label: "Language & Region", icon: <Globe size={18} /> },
    { id: "privacy", label: "Privacy", icon: <Shield size={18} /> },
  ];

  return (
    <div className="flex h-screen bg-black text-player-text">
      <Sidebar />
      
      <main className="flex-1 overflow-y-auto pb-24">
        <Header />
        
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-6">Settings</h1>
          
          <div className="flex flex-col md:flex-row gap-6">
            {/* Settings Menu */}
            <div className="w-full md:w-64 flex-shrink-0">
              <div className="bg-player-surface rounded-lg p-2">
                {settingsSections.map((section) => (
                  <button
                    key={section.id}
                    className={`w-full flex items-center gap-3 p-3 rounded-md text-left mb-1 ${
                      activeSection === section.id 
                        ? 'bg-player-menuActive text-player-sidebarActive' 
                        : 'hover:bg-white/5'
                    }`}
                    onClick={() => setActiveSection(section.id)}
                  >
                    {section.icon}
                    <span>{section.label}</span>
                  </button>
                ))}
                
                <button
                  className="w-full flex items-center gap-3 p-3 rounded-md text-red-400 hover:bg-white/5 text-left mt-4"
                  onClick={handleLogout}
                >
                  <Power size={18} />
                  <span>Logout</span>
                </button>
              </div>
            </div>
            
            {/* Settings Content */}
            <div className="flex-1 bg-player-surface rounded-lg p-6">
              {/* Account Settings */}
              {activeSection === "account" && (
                <div>
                  <h2 className="text-xl font-bold mb-6">Account Settings</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <Label htmlFor="email" className="mb-2 block">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-white/5 border-white/10 max-w-md"
                      />
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-4">Subscription Plan</h3>
                      <div className="bg-white/5 p-4 rounded-lg max-w-md">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium">Premium Plan</p>
                            <p className="text-sm text-player-textSecondary">$9.99/month</p>
                          </div>
                          <Button variant="outline" className="border-white/20 text-player-text hover:bg-white/5">
                            Change
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-4">Playback</h3>
                      <div className="space-y-4 max-w-md">
                        <div>
                          <Label htmlFor="quality" className="mb-2 block">Streaming Quality</Label>
                          <select 
                            id="quality"
                            value={quality}
                            onChange={(e) => setQuality(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-md p-2 text-player-text focus-visible:ring-player-highlight focus:outline-none"
                          >
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                            <option value="veryhigh">Very High</option>
                          </select>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="space-y-1">
                            <Label htmlFor="downloadOnly">Download Only</Label>
                            <p className="text-sm text-player-textSecondary">Only play downloaded songs</p>
                          </div>
                          <Switch
                            id="downloadOnly"
                            checked={downloadOnly}
                            onCheckedChange={setDownloadOnly}
                          />
                        </div>
                      </div>
                    </div>
                    
                    <Button 
                      onClick={() => toast({ title: "Settings saved", description: "Your account settings have been updated." })}
                      className="bg-player-highlight hover:bg-player-highlight/80 mt-4"
                    >
                      Save Changes
                    </Button>
                  </div>
                </div>
              )}
              
              {/* Security Settings */}
              {activeSection === "security" && (
                <div>
                  <h2 className="text-xl font-bold mb-6">Security Settings</h2>
                  
                  <div className="space-y-6 max-w-md">
                    <div>
                      <h3 className="text-lg font-medium mb-4">Change Password</h3>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="newPassword">New Password</Label>
                          <Input
                            id="newPassword"
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="bg-white/5 border-white/10"
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="confirmPassword">Confirm New Password</Label>
                          <Input
                            id="confirmPassword"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="bg-white/5 border-white/10"
                          />
                        </div>
                        
                        <Button 
                          onClick={handleSavePassword}
                          className="bg-player-highlight hover:bg-player-highlight/80"
                        >
                          Update Password
                        </Button>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t border-white/10">
                      <h3 className="text-lg font-medium mb-4">Login Sessions</h3>
                      <div className="bg-white/5 p-4 rounded-lg">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium">Current Session</p>
                            <p className="text-sm text-player-textSecondary">Chrome on Windows - Apr 10, 2025</p>
                          </div>
                          <div className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full">
                            Active Now
                          </div>
                        </div>
                      </div>
                      
                      <Button 
                        variant="outline"
                        className="border-white/20 text-player-text hover:bg-white/5 mt-4"
                        onClick={() => toast({ title: "Sessions cleared", description: "All other sessions have been logged out." })}
                      >
                        Sign out other sessions
                      </Button>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Notification Settings */}
              {activeSection === "notifications" && (
                <div>
                  <h2 className="text-xl font-bold mb-6">Notification Settings</h2>
                  
                  <div className="space-y-6 max-w-md">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label htmlFor="emailNotifications">Email Notifications</Label>
                        <p className="text-sm text-player-textSecondary">Receive email updates about your account</p>
                      </div>
                      <Switch
                        id="emailNotifications"
                        checked={notificationEmail}
                        onCheckedChange={setNotificationEmail}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label htmlFor="pushNotifications">Push Notifications</Label>
                        <p className="text-sm text-player-textSecondary">Receive push notifications on this device</p>
                      </div>
                      <Switch
                        id="pushNotifications"
                        checked={notificationPush}
                        onCheckedChange={setNotificationPush}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label htmlFor="socialNotifications">Social Notifications</Label>
                        <p className="text-sm text-player-textSecondary">Receive notifications about follower activity</p>
                      </div>
                      <Switch
                        id="socialNotifications"
                        checked={notificationSocial}
                        onCheckedChange={setNotificationSocial}
                      />
                    </div>
                    
                    <Button 
                      onClick={() => toast({ title: "Notification settings saved", description: "Your notification preferences have been updated." })}
                      className="bg-player-highlight hover:bg-player-highlight/80 mt-4"
                    >
                      Save Changes
                    </Button>
                  </div>
                </div>
              )}
              
              {/* Language & Region Settings */}
              {activeSection === "language" && (
                <div>
                  <h2 className="text-xl font-bold mb-6">Language & Region</h2>
                  
                  <div className="space-y-6 max-w-md">
                    <div>
                      <Label htmlFor="language" className="mb-2 block">Language</Label>
                      <select 
                        id="language"
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-md p-2 text-player-text focus-visible:ring-player-highlight focus:outline-none"
                      >
                        <option value="english">English</option>
                        <option value="spanish">Español</option>
                        <option value="french">Français</option>
                        <option value="german">Deutsch</option>
                        <option value="japanese">日本語</option>
                        <option value="korean">한국어</option>
                      </select>
                    </div>
                    
                    <div>
                      <Label htmlFor="theme" className="mb-2 block">Theme</Label>
                      <select 
                        id="theme"
                        value={theme}
                        onChange={(e) => setTheme(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-md p-2 text-player-text focus-visible:ring-player-highlight focus:outline-none"
                      >
                        <option value="dark">Dark</option>
                        <option value="light">Light</option>
                        <option value="system">System Default</option>
                      </select>
                    </div>
                    
                    <Button 
                      onClick={() => toast({ title: "Language settings saved", description: "Your language and region settings have been updated." })}
                      className="bg-player-highlight hover:bg-player-highlight/80 mt-4"
                    >
                      Save Changes
                    </Button>
                  </div>
                </div>
              )}
              
              {/* Privacy Settings */}
              {activeSection === "privacy" && (
                <div>
                  <h2 className="text-xl font-bold mb-6">Privacy Settings</h2>
                  
                  <div className="space-y-6 max-w-md">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label htmlFor="privateSession">Private Session</Label>
                        <p className="text-sm text-player-textSecondary">Listen anonymously. Your activity won't be shared.</p>
                      </div>
                      <Switch
                        id="privateSession"
                        checked={privateSession}
                        onCheckedChange={setPrivateSession}
                      />
                    </div>
                    
                    <div className="pt-4 border-t border-white/10">
                      <h3 className="text-lg font-medium mb-4">Data Privacy</h3>
                      <Button 
                        variant="outline"
                        className="border-white/20 text-player-text hover:bg-white/5"
                        onClick={() => toast({ title: "Data download requested", description: "Your data will be available for download soon." })}
                      >
                        Download Your Data
                      </Button>
                    </div>
                    
                    <div className="pt-4 border-t border-white/10">
                      <h3 className="text-lg font-medium mb-4">Account Actions</h3>
                      <Button 
                        variant="destructive"
                        onClick={() => toast({ 
                          title: "Are you sure?", 
                          description: "This action cannot be undone. Contact support for account deletion.",
                          variant: "destructive"
                        })}
                      >
                        Delete Account
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <MusicPlayer />
    </div>
  );
};

export default Settings;
