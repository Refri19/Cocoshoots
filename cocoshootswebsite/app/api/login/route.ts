import { NextResponse } from "next/server";
import dbConnect from "@/lib/database";
import Login from "@/models/Login";

export async function POST(request: Request) {
  try {
    // 1. Connect to the database
    await dbConnect();

    // 2. Get data from the frontend
    const body = await request.json();
    const { email, password } = body;

    // 3. Validation
    if (!email || !password) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // 4. Save to MongoDB
    const user = await Login.findOne({ email, password });

    if (!user) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    return NextResponse.json(
        { message: "Login successful", data: user },
        { status: 200 }
      );        
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}