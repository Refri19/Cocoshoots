'use client';

import { useEffect, useState } from 'react';
import { Camera, ImageIcon, Download, ChevronDown } from 'lucide-react';
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
    { id: 1, title: "Photo 1", color: "bg-orange-200", caption: "Sunset vibes" },
    { id: 2, title: "Photo 2", color: "bg-blue-300", caption: "Ocean breeze" },
    { id: 3, title: "Photo 3", color: "bg-stone-200", caption: "City streets" },
    { id: 4, title: "Photo 4", color: "bg-emerald-200", caption: "Forest walk" },
    { id: 5, title: "Photo 5", color: "bg-slate-300", caption: "Mountain high" },
    { id: 6, title: "Photo 6", color: "bg-pink-100", caption: "Morning coffee" },
  ]);

  // 2. STATE FOR CLICK/PRESS INTERACTION
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
      const response = await fetch(`/api/download?url=${encodeURIComponent(url)}`);
      if (!response.ok) throw new Error('Download failed');

      const blob = await response.blob();

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64data = reader.result as string;
        const link = document.createElement('a');
        link.href = base64data;
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

  // 4. HANDLER FOR TOGGLING DROPDOWN
  const toggleDropdown = (id: number) => {
    setActivePhotoId(prev => (prev === id ? null : id));
  };

  return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold ">Welcome, {username}</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {photos.map((photo) => {
            const isActive = activePhotoId === photo.id;

            return (
                <div
                    key={photo.id}
                    onClick={() => toggleDropdown(photo.id)}
                    className={`group bg-white rounded-[2.5rem] overflow-hidden shadow-sm transition-all duration-500 border border-gray-100 cursor-pointer 
                ${isActive ? 'ring-4 ring-[#D2532B]/20 shadow-xl' : 'hover:shadow-xl'}
              `}
                >
                  {/* IMAGE SECTION - Removed the overlay button from here */}
                  <div className={`h-64 ${photo.color} relative overflow-hidden flex items-center justify-center`}>
                    {photo.url ? (
                        <image
                            href={photo.url}
                            className={`w-full h-full object-cover transition-transform duration-700 ${isActive ? 'scale-105' : 'group-hover:scale-110'}`}
                        />
                    ) : (
                        <ImageIcon className="text-white/40 w-16 h-16" />
                    )}
                  </div>

                  {/* TEXT & DROPDOWN SECTION */}
                  <div className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-lg text-[#253939]">{photo.title}</h3>
                        {photo.caption && <p className="text-gray-500 mt-1 text-sm">{photo.caption}</p>}
                      </div>
                      {/* Indicator Icon */}
                      <ChevronDown
                          className={`text-gray-300 transition-transform duration-300 ${isActive ? 'rotate-180 text-[#D2532B]' : ''}`}
                          size={20}
                      />
                    </div>

                    {/* THE DROPDOWN AREA */}
                    {/* We use max-height transition for the "slide down" effect */}
                    <div
                        className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                            isActive ? 'grid-rows-[1fr] opacity-100 mt-4 pt-4 border-t border-gray-100' : 'grid-rows-[0fr] opacity-0'
                        }`}
                    >
                      <div className="overflow-hidden">
                        {photo.url ? (
                            <button
                                onClick={(e) => {
                                  e.stopPropagation(); // Stop the card from closing when clicking download
                                  handleDownload(photo.url!, photo.title);
                                }}
                                className="w-full bg-[#253939] text-white py-3 px-4 rounded-xl font-bold hover:bg-[#D2532B] transition-colors flex items-center justify-center gap-2"
                            >
                              <Download size={18} />
                              <Link href={'/api/download/${image.id}'}>Download JPG</Link>
                            </button>
                        ) : (
                            <div className="text-center text-sm text-gray-400 italic py-2">
                              No image available to download
                            </div>
                        )}
                      </div>
                    </div>

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