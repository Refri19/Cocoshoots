import { NextResponse } from 'next/server';
import dbConnect from '@/lib/database';
import Register from '@/models/register';

export async function POST(request: Request) {
  try {
    // 1. Connect to the database
    await dbConnect();

    // 2. Get data from the frontend
    const body = await request.json();
    const { name, email, password} = body;

    // 3. Validation
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // 4. Save to MongoDB
    const newUser = await Register.create({
      name,
      email,
    password
    });

    return NextResponse.json(
      { message: 'User registered successfully', data: newUser }, 
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