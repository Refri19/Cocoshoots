// app/api/posts/actions.ts
import { NextResponse } from 'next/server'
import {prisma} from '@/lib/prisma'

export async function GET() {
    try {
        const blog = await prisma.blog.findMany({
            orderBy: {
                createdAt:'desc',
            }
        })
        return NextResponse.json(blog, {status:200})
    } catch (err) {
        return NextResponse.json({ error: 'Failed to fetch posts',err }, { status: 500 })
    }
}
