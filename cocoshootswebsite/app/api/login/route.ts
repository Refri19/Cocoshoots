// app/api/login/route.js or pages/api/login.js

import {prisma} from '@/lib/prisma';
import bcrypt from 'bcryptjs'; // You need to install bcryptjs: npm install bcryptjs
import {NextRequest, NextResponse} from 'next/server';

export async function POST(request: NextRequest, res: NextResponse) {
  const { email, password } = await request.json();

  if (!email || !password) {
    return NextResponse.json({ message: 'Email and password are required' }, { status: 400 });
  }

  try {
    // 1. Find the user by email
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    // 2. Compare the provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    // 3. Handle successful login (e.g., create a session)
    // ***
    // NOTE: You should use a library like NextAuth.js or manually set
    // a secure HttpOnly cookie here to manage the user session.
    // This example returns a success message for simplicity.
    // ***

    return NextResponse.json({ message: 'Login successful', user: { email: user.email, name: user.username } }, { status: 200 });

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
  }
}
