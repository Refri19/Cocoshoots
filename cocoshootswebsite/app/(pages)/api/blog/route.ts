import dbConnect from '@/lib/database';
import { NextResponse } from 'next/server';
import Blog from '@/models/blog';

export async function GET() {
    try {  
        await dbConnect();
        const blogs = await Blog.find().sort({ createdAt: -1 });
        return NextResponse.json({ data: blogs }, { status: 200 });
    } catch (error) {
        console.error('Database Error:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' }, 
            { status: 500 }
        );
    }
}