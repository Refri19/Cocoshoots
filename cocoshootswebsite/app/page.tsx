'use client';

import { useEffect, useState } from 'react';
import { Camera, ImageIcon, Download } from 'lucide-react';
import { useSession, signIn } from 'next-auth/react';
import Link from "next/link";

// --- Types ---
interface Photo {
  id: number;
  title: string;
  color: string;
  caption: string;
  url?: string;
}

// --- View Components ---

const WelcomeScreen = ({ onJoin }: { onJoin: () => void }) => {
  return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] text-[#253939] p-4 animate-in fade-in zoom-in duration-500">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-10 border border-gray-100">
          <div className="flex flex-col items-center space-y-8">
            <div className="w-20 h-20 bg-[#253939] rounded-2xl flex items-center justify-center shadow-lg">
              <Camera className="text-[#fef6e9] w-10 h-10" />
            </div>
            <div className="text-center space-y-2">
              <h1 className="text-3xl font-black tracking-tight text-[#253939]">COCOSHOOTS</h1>
              <p className="text-gray-500 font-medium">Join our community to start sharing.</p>
            </div>

            <button className="w-full bg-[#253939] text-[#fef6e9] font-bold py-4 px-6 rounded-2xl hover:bg-[#D2532B] active:scale-95 transition-all duration-300 flex items-center justify-center gap-3 text-lg shadow-lg"
            ><Link href='/login'>
              Sign In to Start <span>→</span>
            </Link>
            </button>
          </div>
        </div>
      </div>
  );
};

const MainPageContent = ({ username }: { username: string }) => {
  // 1. STATE FOR PHOTOS
  const [photos, setPhotos] = useState<Photo[]>([
    { id: 1, title: "Photo 1", color: "bg-orange-200", caption: "" },
    { id: 2, title: "Photo 2", color: "bg-blue-300", caption: "" },
    { id: 3, title: "Photo 3", color: "bg-stone-200", caption: "" },
    { id: 4, title: "Photo 4", color: "bg-emerald-200", caption: "" },
    { id: 5, title: "Photo 5", color: "bg-slate-300", caption: "" },
    { id: 6, title: "Photo 6", color: "bg-pink-100", caption: "" },
  ]);

  // 2. STATE FOR CLICK/PRESS INTERACTION (New)
  // This tracks which photo ID is currently "active" to show the overlay
  const [activePhotoId, setActivePhotoId] = useState<number | null>(null);

  useEffect(() => {
    const fetchFacebookPosts = async () => {
      try {
        const res = await fetch('/api/facebook');
        const data = await res.json();

        if (Array.isArray(data)) {
          setPhotos(prev => {
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

  // 3. DOWNLOAD LOGIC
  const handleDownload = async (url: string, title: string) => {
    try {
      // Calls your internal API to bypass CORS
      const response = await fetch(`/api/download?url=${encodeURIComponent(url)}`);
      if (!response.ok) throw new Error('Download failed');

      const blob = await response.blob();

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64data = reader.result as string;
        const link = document.createElement('a');
        link.href = base64data;
        // Forces .jpg extension
        link.download = `${title.replace(/\s+/g, '-').toLowerCase() || 'download'}.jpg`;

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      };
      reader.readAsDataURL(blob);

    } catch (err) {
      console.error(err);
      alert("Download failed. Please try again.");
    }
  };

  // 4. HANDLER FOR TOGGLING OVERLAY
  const toggleOverlay = (id: number) => {
    // If clicking the same photo, close it. If clicking a new one, open it.
    setActivePhotoId(prev => (prev === id ? null : id));
  };

  return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-[#253939]">Welcome, {username}</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {photos.map((photo) => {
            // Determine if this specific photo is active (clicked)
            const isActive = activePhotoId === photo.id;

            return (
                <div
                    key={photo.id}
                    // Add click handler to the container
                    onClick={() => toggleOverlay(photo.id)}
                    className="group bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 cursor-pointer"
                >
                  <div className={`h-64 ${photo.color} relative overflow-hidden flex items-center justify-center`}>
                    {photo.url ? (
                        <img
                            src={photo.url}
                            alt={photo.title}
                            className={`w-full h-full object-cover transition-transform duration-700 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}
                        />
                    ) : (
                        <ImageIcon className="text-white/40 w-16 h-16" />
                    )}

                    {/* OVERLAY VISIBILITY LOGIC:
                   Visible if:
                   1. The photo has a URL
                   AND
                   2. (The user is hovering via CSS OR the user has clicked/set 'isActive')
                */}
                    {photo.url && (
                        <div
                            className={`absolute inset-0 bg-black/20 backdrop-blur-[2px] transition-opacity duration-300 flex items-center justify-center
                      ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}
                    `}
                        >
                          <button
                              onClick={(e) => {
                                e.stopPropagation(); // Prevents the card click from triggering immediately
                                handleDownload(photo.url!, photo.title);
                              }}
                              className="bg-white text-[#253939] px-6 py-3 rounded-2xl font-bold shadow-lg hover:bg-[#D2532B] hover:text-white transition-all transform hover:scale-105 flex items-center gap-2"
                          >
                            <Download size={20} />
                            <span>Download JPG</span>
                          </button>
                        </div>
                    )}
                  </div>

                  <div className="p-6">
                    <h3 className="font-bold text-lg text-[#253939]">{photo.title}</h3>
                    {photo.caption && <p className="text-gray-500 mt-1 text-sm">{photo.caption}</p>}
                  </div>
                </div>
            );
          })}
        </div>
      </div>
  );
};

export default function Home() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-pulse font-black text-[#253939]">Loading Journal...</div>
        </div>
    );
  }

  const handleJoin = () => {
    signIn();
  };

  return (
      <main className="w-full bg-transparent min-h-screen">
        <div className="pt-10">
          {status === 'unauthenticated' ? (
              <WelcomeScreen onJoin={handleJoin} />
          ) : (
              <MainPageContent username={session?.user?.name || 'Creator'} />
          )}
        </div>
      </main>
  );
}