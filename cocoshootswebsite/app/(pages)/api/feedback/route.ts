import { NextResponse } from 'next/server';
import dbConnect from '@/lib/database';
import Feedback from '@/models/blog';

export async function POST(request: Request) {
  try {
    // 1. Connect to the database
    await dbConnect();

    // 2. Get data from the frontend
    const body = await request.json();
    const { name, email, category, message } = body;

    // 3. Validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // 4. Save to MongoDB
    const newFeedback = await Feedback.create({
      name,
      email,
      category,
      message,
    });

    return NextResponse.json(
      { message: 'Feedback sent successfully', data: newFeedback }, 
      { status: 201 }
    );

  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' }, 
      { status: 500 }
    );
  }
}