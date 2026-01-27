// app/posts/[id]/page.tsx
import DynamicFacebookPost from '@/app/ui/components/dynamicfacebookpost';
import { prisma } from '@/lib/prisma';

export default async function BlogPost({ params }: { params: { id: string } }) {
    // Fetch data where the admin saved the URL
    const postData = await prisma.facebookpost.findUnique({
        where: { id: params.id }
    });

    return (
        <main className="p-4">
            <h1 className="text-2xl font-bold">{postData.title}</h1>

            {/* Pass the admin's chosen URL into the component */}
            <DynamicFacebookPost postUrl={postData.url} />

            <p>{postData.content}</p>
        </main>
    );
}