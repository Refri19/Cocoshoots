'use client';

import { useState } from 'react';
import { Camera, ImageIcon, Heart, Share2, Sparkles, Wand2 } from 'lucide-react';



// --- API Helper ---

const generateGeminiContent = async (prompt: string): Promise<string> => {
  const apiKey = ""; // Set at runtime
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    });
    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || '';
  } catch (error) {
    console.error('Gemini API error:', error);
    return '';
  }
};



// --- View Components ---

// 1. Welcome Screen
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
              Start Creating
              <span>→</span>
            </button>
          </form>
          
          <p className="text-xs text-gray-400 font-medium italic">
            Enter your name and press "Start Creating" to look at your photographs
          </p>
        </div>
      </div>
    </div>
  );
};

// 2. Main Page (Content implemented without a separate header)
const MainPageContent = ({ username }: { username: string }) => {

  const [activeTab, setActiveTab] = useState<'gallery' | 'studio'>('gallery');
  const [loadingCaptions, setLoadingCaptions] = useState<Record<number, boolean>>({});
  const [studioPrompt, setStudioPrompt] = useState('');
  const [studioResult, setStudioResult] = useState('');
  const [isGeneratingIdea, setIsGeneratingIdea] = useState(false);

  const [photos, setPhotos] = useState([
    { id: 1, title: "Photo 1", color: "bg-orange-200", caption: "" },
    { id: 2, title: "Photo 2", color: "bg-blue-300", caption: "" },
    { id: 3, title: "Photo 3", color: "bg-stone-200", caption: "" },
    { id: 4, title: "Photo 4", color: "bg-emerald-200", caption: "" },
    { id: 5, title: "Photo 5", color: "bg-slate-300", caption: "" },
    { id: 6, title: "Photo 6", color: "bg-pink-100", caption: "" },
]);

const saveGalleryToDB = async () => {
    try {
      // Optional: Add a loading state here
      const response = await fetch('/api/photos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: username,
          photos: photos 
        })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        alert("Success! Gallery synced to cloud.");
      } else {
        alert("Error: " + data.error);
      }
    } catch (error) {
      console.error("Save failed", error);
    alert("Failed to connect to server.");
  }
};

const handleGenerateCaption = async (photoId: number, title: string) => {
    setLoadingCaptions(prev => ({ ...prev, [photoId]: true }));
    const prompt = `Write a short, poetic Instagram caption (max 12 words) for a photograph titled "${title}".`;
    const caption = await generateGeminiContent(prompt);
    setPhotos(prev => prev.map(p => p.id === photoId ? { ...p, caption: caption.replace(/"/g, '') } : p));
    setLoadingCaptions(prev => ({ ...prev, [photoId]: false }));
  };

  const handleGenerateIdea = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!studioPrompt) return;
    setIsGeneratingIdea(true);
    const prompt = `Create a photography concept for theme: "${studioPrompt}". Include: Concept, Lighting, and Props. Keep it short.`;
    const result = await generateGeminiContent(prompt);
    setStudioResult(result);
    setIsGeneratingIdea(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 animate-in fade-in slide-in-from-bottom-4 duration-700 rounded-md">
      

      {activeTab === 'gallery' ? (
        <section>
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-black">Welcome back, {username}</h2>
            <div className="flex justify-center gap-4 mt-4">
              <button 
                onClick={saveGalleryToDB}
                className="bg-[#253939] text-white px-6 py-2 rounded-full hover:bg-[#D2532B] transition-colors flex items-center gap-2 shadow-lg"
              >
                <Share2 size={16} /> 
                Sync to Cloud
              </button>
            </div>
            <p className="text-gray-500 mt-2">Here is your current inspiration board.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {photos.map((photo) => (
              <div key={photo.id} className="group bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-50">
                <div className={`h-64 ${photo.color} relative overflow-hidden flex items-center justify-center`}>
                   <ImageIcon className="text-white/40 w-16 h-16 group-hover:scale-125 transition-transform duration-700" />
                   
                   <button 
                      onClick={() => handleGenerateCaption(photo.id, photo.title)}
                      disabled={loadingCaptions[photo.id]}
                      className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md text-[#253939] py-4 rounded-2xl text-sm font-black shadow-xl flex items-center justify-center gap-2 translate-y-32 group-hover:translate-y-0 transition-transform duration-500 disabled:opacity-50"
                   >
                     {loadingCaptions[photo.id] ? (
                       <span className="animate-spin text-[#D2532B]">✦</span>
                     ) : (
                       <Sparkles size={18} className="text-[#D2532B]" />
                     )}
                     {photo.caption ? 'Regenerate Caption' : 'Magic Caption'}
                   </button>
                </div>
                
                <div className="p-8">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="font-black text-[#253939] text-xl">{photo.title}</h4>
                    <Heart size={20} className="text-gray-300 hover:text-[#D2532B] transition-colors cursor-pointer" />
                  </div>
                  
                  <div className="min-h-[4rem] bg-[#fef6e9]/50 rounded-2xl p-4 flex items-center justify-center text-center border border-[#253939]/5">
                    {photo.caption ? (
                       <p className="text-sm text-[#D2532B] font-bold italic animate-in fade-in duration-1000">
                         "{photo.caption}"
                       </p>
                    ) : (
                      <p className="text-[11px] text-gray-300 font-black uppercase tracking-[0.2em]">Awaiting Inspiration</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      ) : (
        <section className="max-w-4xl mx-auto">
          <div className="bg-[#253939] rounded-[3rem] shadow-2xl overflow-hidden text-[#fef6e9]">
            <div className="p-12 text-center space-y-4">
              <div className="inline-flex p-4 bg-[#D2532B]/20 rounded-2xl mb-2">
                <Wand2 className="text-[#D2532B] w-8 h-8" />
              </div>
              <h2 className="text-4xl font-black italic tracking-tight">AI Creative Studio</h2>
              <p className="text-[#fef6e9]/60 font-medium max-w-lg mx-auto">Input a theme or mood, and Gemini will architect your next professional photoshoot concept.</p>
            </div>

            <div className="px-12 pb-12">
              <form onSubmit={handleGenerateIdea} className="relative">
                <input 
                  type="text"
                  value={studioPrompt}
                  onChange={(e) => setStudioPrompt(e.target.value)}
                  placeholder="e.g. '80s Synthwave Fashion' or 'Moody Rain'"
                  className="w-full px-8 py-6 rounded-3xl bg-white/5 border-2 border-white/10 focus:border-[#D2532B] focus:bg-white focus:text-[#253939] outline-none text-xl transition-all pr-44 placeholder:text-white/20"
                />
                <button 
                  type="submit"
                  disabled={isGeneratingIdea || !studioPrompt}
                  className="absolute right-3 top-3 bottom-3 bg-[#D2532B] text-white px-8 rounded-2xl font-black hover:scale-105 active:scale-95 disabled:opacity-50 transition-all shadow-xl"
                >
                  {isGeneratingIdea ? 'Wait...' : 'Generate'}
                </button>
              </form>

              {studioResult && (
                <div className="mt-10 bg-white/5 border border-white/10 rounded-[2rem] p-8 animate-in fade-in slide-in-from-bottom-5 duration-700">
                  <div className="prose prose-invert max-w-none whitespace-pre-line text-[#fef6e9] font-medium leading-relaxed">
                    {studioResult}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

// --- Main Entry ---

export default function Home() {
  const [appState, setAppState] = useState('welcome');
  const [username, setUsername] = useState('');
  
  const handleJoin = (name: string) => {
    setUsername(name);
    setAppState('main');
  };

  return (
    <main className="w-full bg-transparent min-h-screen rounded-2xl"> 
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