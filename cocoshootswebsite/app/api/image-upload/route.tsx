import { NextResponse } from 'next/server'
import {prisma} from '@/lib/prisma'

export async function GET() {
    try {
        const getfacebookpost = await prisma.facebookpost.findMany({
            orderBy: {
                createdAt:'desc',
            }
        })
        return NextResponse.json(getfacebookpost, {status:200})
    } catch (err) {
        return NextResponse.json({ error: 'Failed to fetch posts',err }, { status: 500 })
    }
}
