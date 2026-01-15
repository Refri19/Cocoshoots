// app/api/posts/actions.ts
import { NextResponse } from 'next/server'
import {prisma} from '@/lib/prisma' // Assumes you have the singleton from the previous step

export async function GET() {
    try {
        const posts = await prisma.blog.findMany({
        })
        return NextResponse.json(posts)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 })
    }
}
