// app/components/DynamicFacebookPost.tsx
'use client';

import { FacebookEmbed } from 'react-social-media-embed';

interface Props {
    postUrl: string; // This comes from your Admin/DB
}

export default function DynamicFacebookPost({ postUrl }: Props) {
    // 1. Simple validation to ensure it's actually a URL before rendering
    const isValidUrl = postUrl && postUrl.includes('facebook.com');

    if (!isValidUrl) {
        return <p className="text-gray-500">No valid Facebook URL provided.</p>;
    }

    return (
        <div className="w-full flex justify-center my-6">
            <FacebookEmbed
                url={postUrl}
                width={550} // This is max-width; it will scale down on mobile
            />
        </div>
    );
}