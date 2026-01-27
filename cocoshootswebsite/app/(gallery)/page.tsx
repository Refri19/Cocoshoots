'use client';

import { useEffect, useState } from 'react';
import { Camera } from 'lucide-react';
import { useSession, signIn } from 'next-auth/react';
import Link from "next/link";
import { FacebookEmbed } from 'react-social-media-embed';

// --- Types ---
interface FacebookPost {
  id: number;
  url: string;
  createdAt: string;
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
  const [posts, setPosts] = useState<FacebookPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // --- UPDATED: Fetch from the API Route instead of Server Action ---
        // Make sure your route file is inside app/api/facebook-post/route.tsx
        const response = await fetch('/api/image-upload', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }

        const data = await response.json();
        setPosts(data);
      } catch (err) {
        console.error("Failed to load posts", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
        <div className="max-w-7xl mx-auto px-4 py-8 flex items-center justify-center min-h-[50vh]">
          <div className="animate-pulse text-[#253939] font-medium">Loading Feed...</div>
        </div>
    )
  }

  return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-[#253939]">Welcome, {username.split(' ')[0]}</h2>
        </div>

        {posts.length === 0 ? (
            <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
              <p className="text-gray-500">No photos uploaded yet.</p>
            </div>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-items-center">
              {posts.map((post) => {
                return (
                    <div key={post.id}>
                      <FacebookEmbed url={post.url} width={550} />
                    </div>
                );
              })}
            </div>
        )}
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