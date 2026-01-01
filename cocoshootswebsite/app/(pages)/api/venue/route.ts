import { NextResponse } from 'next/server';
import dbConnect from '@/lib/database';
import Venue from '@/models/venue';

export async function POST(request: Request) {
  try {
    // 1. Connect to the database
    await dbConnect();

    // 2. Get data from the frontend
    const body = await request.json();
    const { name, email, phonenumhber, reasoning, createdAt, scheduleAt } = body;

    // 3. Validation
    if (!name || !email || !phonenumhber || !reasoning || !createdAt || !scheduleAt) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // 4. Save to MongoDB
    const newVenue = await Venue.create({
      name,
      email,
      phonenumhber,
      reasoning,
      createdAt,
      scheduleAt,
    });

    return NextResponse.json(
      { message: 'Feedback sent successfully', data: newVenue }, 
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