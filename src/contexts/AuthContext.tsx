
import { createContext, useContext, useState, ReactNode, useEffect } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  bio?: string; // Added bio as optional field
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  updateProfile: (data: {name?: string; bio?: string}) => void; // Added updateProfile method
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  
  // Check for saved user in localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email: string, password: string) => {
    // This is a mock login - in a real app, you would validate with an API
    // For demo purposes we'll accept any valid-looking email and password combination
    if (email && password && email.includes('@')) {
      const mockUser: User = {
        id: "user1",
        name: email.split('@')[0],
        email,
        avatarUrl: "https://i.pravatar.cc/150?u=" + email,
        bio: "", // Initialize with empty bio
      };
      
      setUser(mockUser);
      localStorage.setItem("user", JSON.stringify(mockUser));
    } else {
      throw new Error("Invalid credentials");
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    // Mock signup function
    if (name && email && password && email.includes('@')) {
      const mockUser: User = {
        id: "user1",
        name: name,
        email,
        avatarUrl: "https://i.pravatar.cc/150?u=" + email,
        bio: "", // Initialize with empty bio
      };
      
      setUser(mockUser);
      localStorage.setItem("user", JSON.stringify(mockUser));
    } else {
      throw new Error("Invalid information");
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  // Add updateProfile function
  const updateProfile = (data: {name?: string; bio?: string}) => {
    if (user) {
      const updatedUser = {
        ...user,
        ...data
      };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
        isAuthenticated: !!user,
        updateProfile, // Include the new function in the context value
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
