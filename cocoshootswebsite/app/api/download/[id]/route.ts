import { NextResponse } from 'next/server';
// 1. Import your existing client instead of creating a new one
import {prisma} from '@/lib/prisma';

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        // Note: In Next.js 15+, 'params' is a Promise.
        // If you are on the latest versions, you should await it.
        const { id } = params;
        const imageId = parseInt(id);

        const imageRecord = await prisma.photo.findUnique({
            where: { id: imageId },
        });

        if (!imageRecord) {
            return new NextResponse('Image-upload not found', { status: 404 });
        }

        return new NextResponse(imageRecord.img, {
            status: 200,
            headers: {
                'Content-Type': 'image/jpeg',
                'Content-Disposition': `attachment; filename="${imageRecord.filename}"`,
            },
        });
    } catch (error) {
        return new NextResponse('Error fetching image', { status: 500 });
    }
}