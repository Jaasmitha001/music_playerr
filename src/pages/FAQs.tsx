
import { useState } from "react";
import { Sidebar } from "../components/Sidebar";
import { Header } from "../components/Header";
import { MusicPlayer } from "../components/MusicPlayer";
import { useAuth } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { ChevronDown, Search, Headphones, CreditCard, Music, Users } from "lucide-react";
import { Input } from "@/components/ui/input";

const FAQs = () => {
  const { isAuthenticated } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [openFaq, setOpenFaq] = useState<string | null>(null);
  
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  const toggleFaq = (id: string) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  const categories = [
    { id: "all", name: "All FAQs", icon: <Headphones size={18} /> },
    { id: "account", name: "Account", icon: <Users size={18} /> },
    { id: "billing", name: "Billing", icon: <CreditCard size={18} /> },
    { id: "music", name: "Music", icon: <Music size={18} /> }
  ];

  const faqs = [
    { 
      id: "faq1", 
      category: "account",
      question: "How do I change my account email?", 
      answer: "To change your email address, go to your account settings, click on the 'Email' section, enter your new email address, and click 'Save Changes'. You'll receive a verification email to confirm the change."
    },
    { 
      id: "faq2", 
      category: "account",
      question: "Can I use my account on multiple devices?", 
      answer: "Yes, you can use your Groovo account on multiple devices. Simply sign in with the same email and password. With a Premium subscription, you can download music for offline listening on up to 5 devices."
    },
    { 
      id: "faq3", 
      category: "billing",
      question: "How do I update my payment method?", 
      answer: "To update your payment method, go to your account settings, select 'Payment', and then click on 'Update payment method'. You can add a new credit card, PayPal account, or other supported payment options."
    },
    { 
      id: "faq4", 
      category: "billing",
      question: "How do I cancel my subscription?", 
      answer: "To cancel your subscription, go to your account settings, click on 'Subscription', and then select 'Cancel Subscription'. Follow the prompts to complete the cancellation. Your subscription will remain active until the end of your current billing period."
    },
    { 
      id: "faq5", 
      category: "music",
      question: "How do I create a playlist?", 
      answer: "To create a playlist, click the '+' button in the sidebar, or click 'New Playlist' from the menu. You can then add songs to your playlist by right-clicking on any track and selecting 'Add to Playlist'."
    },
    { 
      id: "faq6", 
      category: "music",
      question: "How do I download music for offline listening?", 
      answer: "If you have a Premium subscription, you can download music for offline listening by clicking the download icon next to an album, playlist, or individual song. Downloaded content will be available in the 'Downloads' section of your library."
    },
    { 
      id: "faq7", 
      category: "music",
      question: "How do I share a playlist with friends?", 
      answer: "To share a playlist, open the playlist and click the 'Share' button. You can copy the link or share directly to social media. Your friends can access the playlist even if they don't have a Premium subscription, but they'll hear ads between songs."
    },
    { 
      id: "faq8", 
      category: "account",
      question: "How do I reset my password?", 
      answer: "If you forgot your password, go to the login page and click 'Forgot Password'. Enter the email associated with your account, and you'll receive instructions to reset your password. For security reasons, password reset links expire after 24 hours."
    },
  ];

  const filteredFaqs = faqs.filter(faq => {
    const matchesCategory = activeCategory === "all" || faq.category === activeCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex h-screen bg-black text-player-text">
      <Sidebar />
      
      <main className="flex-1 overflow-y-auto pb-24">
        <Header />
        
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-6">Frequently Asked Questions</h1>
          
          <div className="mb-8 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-player-textSecondary" size={18} />
            <Input
              type="text"
              placeholder="Search for answers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white/5 border-white/10 max-w-2xl"
            />
          </div>
          
          <div className="flex flex-col md:flex-row gap-6">
            {/* Categories */}
            <div className="w-full md:w-64 flex-shrink-0">
              <h2 className="font-bold mb-4">Categories</h2>
              <div className="bg-player-surface rounded-lg overflow-hidden">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    className={`w-full flex items-center gap-3 p-3 text-left ${
                      activeCategory === category.id 
                        ? 'bg-player-menuActive text-player-sidebarActive' 
                        : 'hover:bg-white/5'
                    }`}
                    onClick={() => setActiveCategory(category.id)}
                  >
                    {category.icon}
                    <span>{category.name}</span>
                  </button>
                ))}
              </div>
              
              <div className="mt-6 bg-player-surface p-4 rounded-lg">
                <h3 className="font-medium mb-2">Need more help?</h3>
                <p className="text-sm text-player-textSecondary mb-4">
                  Can't find what you're looking for? Contact our support team.
                </p>
                <button className="text-player-highlight hover:underline text-sm">
                  Contact Support
                </button>
              </div>
            </div>
            
            {/* FAQ Items */}
            <div className="flex-1">
              {filteredFaqs.length === 0 ? (
                <div className="bg-player-surface p-6 rounded-lg text-center">
                  <p className="text-lg font-medium">No FAQs found</p>
                  <p className="text-sm text-player-textSecondary mt-2">
                    Try using different keywords or browsing by category
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredFaqs.map((faq) => (
                    <div key={faq.id} className="bg-player-surface rounded-lg overflow-hidden">
                      <button
                        className="w-full flex items-center justify-between p-4 text-left"
                        onClick={() => toggleFaq(faq.id)}
                      >
                        <span className="font-medium">{faq.question}</span>
                        <ChevronDown
                          size={18}
                          className={`transition-transform ${
                            openFaq === faq.id ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      
                      {openFaq === faq.id && (
                        <div className="p-4 pt-0 border-t border-white/10">
                          <p className="text-player-textSecondary">{faq.answer}</p>
                        </div>
                      )}
                    </div>
                  ))}
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

export default FAQs;
