'use server';
import { prisma } from '@/lib/prisma'; // Your database client (Prisma, Drizzle, etc.)
import { revalidatePath } from 'next/cache';

export async function saveFacebookPost(formData: FormData) {
    const url = formData.get('facebookUrl') as string;

    if (!url || !url.includes('facebook.com')) {
        return { error: 'Invalid Facebook URL' };
    }

    // Insert into your database
    await prisma.facebookpost.create({

        data: { url },
    });

    // Refresh the page to show the new embed
    revalidatePath('/');
    return { success: true };
}
