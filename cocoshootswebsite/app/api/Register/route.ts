// app/api/register/route.ts
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    // 1. Check if the body exists and is JSON
    const body = await request.json();
    const {name, email, password} = body;

    // 2. Comprehensive Validation
    if (!name || name.trim().length < 2) {
      return NextResponse.json({error: "Name must be at least 2 characters"}, {status: 400});
    }
    if (!email || !email.includes("@")) {
      return NextResponse.json({error: "Invalid email format"}, {status: 400});
    }
    if (!password || password.length < 8) {
      return NextResponse.json({error: "Password must be at least 8 characters"}, {status: 400});
    }

    const normalizedEmail = email.toLowerCase().trim();

    // 3. Check for existing user
    const existingUser = await prisma.user.findUnique({
      where: {email: normalizedEmail},
    });

    if (existingUser) {
      return NextResponse.json({error: "This email is already registered"}, {status: 400});
    }
    // 4. Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // 5. Create user
    // Note: Ensure your Prisma schema uses 'username' if that's the field name
    const user = await prisma.user.create({
      data: {
        username: name.trim(),
        email: normalizedEmail,
        password: hashedPassword,
      },
    });

    return NextResponse.json(
        {message: "User created successfully", userId: user.id},
        {status: 201}
    );

  } catch (error: unknown) { // Change 'any' to 'unknown'
    console.error("REGISTRATION_ERROR:", error);

    // 2. Handle standard Errors
    if (error instanceof Error) {
      return NextResponse.json(
          {error: error.message},
          {status: 500}
      );
    }

    // 3. Fallback for unexpected error types
    return NextResponse.json(
        {error: "An unexpected internal server error occurred."},
        {status: 500}
    );
  }
}