'use client';

import { useEffect, useState } from 'react';
import { Camera, ImageIcon, Heart, Share2, Sparkles, Wand2 } from 'lucide-react';

// --- Types ---
// Added a 'url' property to the Photo type interface
interface Photo {
  id: number;
  title: string;
  color: string;
  caption: string;
  url?: string; // Optional URL for Facebook images
}

// --- API Helper ---
const generateGeminiContent = async (prompt: string): Promise<string> => {
  const apiKey = ""; // Set at runtime
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;
  
  // FIXED: Added missing fetch logic and closing braces for this function
  try {
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
    });
    const data = await response.json();
    return data.candidates[0].content.parts[0].text || "";
  } catch (error) {
    return "Could not generate caption.";
  }
};

// --- View Components ---

const WelcomeScreen = ({ onJoin }: { onJoin: (name: string) => void }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onJoin(name);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-[#253939] p-4 animate-in fade-in zoom-in duration-500">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-10 border border-gray-100">
        <div className="flex flex-col items-center space-y-8">
          <div className="w-20 h-20 bg-[#253939] rounded-2xl flex items-center justify-center shadow-lg">
            <Camera className="text-[#fef6e9] w-10 h-10" />
          </div>
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-black tracking-tight text-[#253939]">COCOSHOOTS</h1>
            <p className="text-gray-500 font-medium">What is your name?</p>
          </div>
          <form onSubmit={handleSubmit} className="w-full space-y-5">
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full px-5 py-4 rounded-2xl border-2 border-gray-100 bg-gray-50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#D2532B]/10 focus:border-[#D2532B] transition-all text-lg text-center"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoFocus
              required
            />
            <button
              type="submit"
              className="w-full bg-[#253939] text-[#fef6e9] font-bold py-4 px-6 rounded-2xl hover:bg-[#D2532B] active:scale-95 transition-all duration-300 flex items-center justify-center gap-3 text-lg shadow-lg"
            >
              Start Creating <span>→</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

const MainPageContent = ({ username }: { username: string }) => {
  const [activeTab, setActiveTab] = useState<'gallery' | 'studio'>('gallery');
  const [loadingCaptions, setLoadingCaptions] = useState<Record<number, boolean>>({});
  const [studioPrompt, setStudioPrompt] = useState('');
  const [studioResult, setStudioResult] = useState('');
  const [isGeneratingIdea, setIsGeneratingIdea] = useState(false);

  // FIXED: Using the Photo interface here
  const [photos, setPhotos] = useState<Photo[]>([
    { id: 1, title: "Photo 1", color: "bg-orange-200", caption: "" },
    { id: 2, title: "Photo 2", color: "bg-blue-300", caption: "" },
    { id: 3, title: "Photo 3", color: "bg-stone-200", caption: "" },
    { id: 4, title: "Photo 4", color: "bg-emerald-200", caption: "" },
    { id: 5, title: "Photo 5", color: "bg-slate-300", caption: "" },
    { id: 6, title: "Photo 6", color: "bg-pink-100", caption: "" },
  ]);

  // FIXED: Moved the Facebook useEffect INSIDE the component where setPhotos is available
// Inside MainPageContent component in page.tsx
useEffect(() => {
  const fetchFacebookPosts = async () => {
    try {
      const res = await fetch('/api/facebook');
      const data = await res.json();

      // Check if the data is an array (our new format)
      if (Array.isArray(data)) {
        setPhotos(prev => {
          // Filter out the initial dummy photos if you want, 
          // or just prepend the new ones
          const fbPhotos: Photo[] = data.map(post => ({
            id: post.id,
            title: post.title,
            color: post.color,
            caption: post.caption,
            url: post.url 
          }));
          return [...fbPhotos, ...prev];
        });
      }
    } catch (err) {
      console.error("FB Fetch failed", err);
    }
  };

  fetchFacebookPosts();
}, []);

  const saveGalleryToDB = async () => {
    try {
      const response = await fetch('/api/photos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, photos })
      });
      if (response.ok) alert("Success! Gallery synced.");
    } catch (error) {
      console.error("Save failed", error);
    }
  };

  const handleGenerateCaption = async (photoId: number, title: string) => {
    setLoadingCaptions(prev => ({ ...prev, [photoId]: true }));
    const prompt = `Write a short, poetic Instagram caption for "${title}".`;
    const caption = await generateGeminiContent(prompt);
    setPhotos(prev => prev.map(p => p.id === photoId ? { ...p, caption: caption.replace(/"/g, '') } : p));
    setLoadingCaptions(prev => ({ ...prev, [photoId]: false }));
  };

  const handleGenerateIdea = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!studioPrompt) return;
    setIsGeneratingIdea(true);
    const result = await generateGeminiContent(`Concept for: ${studioPrompt}`);
    setStudioResult(result);
    setIsGeneratingIdea(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <section>
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-black">Welcome back, {username}</h2>
          <div className="flex justify-center gap-4 mt-4">
            <button onClick={saveGalleryToDB} className="bg-[#253939] text-white px-6 py-2 rounded-full hover:bg-[#D2532B] transition-colors flex items-center gap-2 shadow-lg">
              <Share2 size={16} /> Sync to Cloud
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {photos.map((photo) => (
            <div key={photo.id} className="group bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-50">
              <div className={`h-64 ${photo.color} relative overflow-hidden flex items-center justify-center`}>
                {photo.url ? (
                  <img src={photo.url} alt={photo.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                ) : (
                  <ImageIcon className="text-white/40 w-16 h-16 group-hover:scale-125 transition-transform duration-700" />
                )}
                
                {/* Re-added the Magic Caption Button */}
                <button 
                  onClick={() => handleGenerateCaption(photo.id, photo.title)}
                  className="absolute bottom-4 right-4 bg-white/20 backdrop-blur-md p-3 rounded-2xl opacity-0 group-hover:opacity-100 transition-all hover:bg-white hover:text-[#D2532B]"
                >
                  <Sparkles size={20} />
                </button>
              </div>
              
              <div className="p-8">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-black text-[#253939] text-xl">{photo.title}</h4>
                  <Heart size={20} className="text-gray-300 hover:text-[#D2532B] transition-colors cursor-pointer" />
                </div>
                <div className="min-h-[4rem] bg-[#fef6e9]/50 rounded-2xl p-4 flex items-center justify-center text-center border border-[#253939]/5">
                  {loadingCaptions[photo.id] ? (
                    <span className="animate-pulse text-xs">Thinking...</span>
                  ) : photo.caption ? (
                    <p className="text-sm text-[#D2532B] font-bold italic">"{photo.caption}"</p>
                  ) : (
                    <p className="text-[11px] text-gray-300 font-black uppercase tracking-[0.2em]">Awaiting Inspiration</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default function Home() {
  const [appState, setAppState] = useState('welcome');
  const [username, setUsername] = useState('');
  
  const handleJoin = (name: string) => {
    setUsername(name);
    setAppState('main');
  };

  return (
    <main className="w-full bg-transparent min-h-screen"> 
      <div className="pt-10">
        {appState === 'welcome' ? (
          <WelcomeScreen onJoin={handleJoin} />
        ) : (
          <MainPageContent username={username} />
        )}
      </div>
    </main>
  );
}