'use client';
import { saveFacebookPost } from '@/app/api/image-upload/actions';
import { FacebookEmbed } from 'react-social-media-embed';

export default function PostManager({ savedPosts }) {
    return (
        <div className="w-full max-w-md space-y-8 bg-white p-10 shadow-xl rounded-xl">
            {/* Form to submit new URL */}
            <form action={saveFacebookPost}>
                <input name="facebookUrl" type="url" placeholder="Paste Facebook URL" required className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-[#D2532B] sm:text-sm" />
                <button type="submit" className="w-full bg-[#253939] text-[#fef6e9] font-bold py-4 px-6 rounded-2xl hover:bg-[#D2532B] active:scale-95 transition-all duration-300 flex items-center justify-center gap-3 text-lg shadow-lg disabled:opacity-70 disabled:cursor-not-allowed">Save Post</button>
            </form>
            <p> Note: Please link only facebook post inside this form, and make sure that the URL we are clicking here is a public post, further update(maybe) is that it only specifies inside the cocoshoots page</p>

            <div className="posts-grid">
                {savedPosts?.map((post) => (
                    <FacebookEmbed key={post.id} url={post.url} width={550} />
                ))}
            </div>
        </div>
    );
}
