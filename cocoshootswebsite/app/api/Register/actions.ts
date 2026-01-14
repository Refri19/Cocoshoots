// app/actions.ts
'use server'; // <--- This is crucial. It marks this file as server-side only.

import { prisma } from "@/lib/prisma"; // Ensure this path matches your project structure
import bcrypt from "bcryptjs";

// Define the shape of the return object for type safety
type ActionResponse = {
    success: boolean;
    message?: string;
    error?: string;
};

export async function registerUser(data: { name: string; email: string; password: string }): Promise<ActionResponse> {
    const { name, email, password } = data;

    try {
        // 1. Validation
        if (!name || name.trim().length < 2) {
            return { success: false, error: "Name must be at least 2 characters" };
        }
        if (!email || !email.includes("@")) {
            return { success: false, error: "Invalid email format" };
        }
        if (!password || password.length < 8) {
            return { success: false, error: "Password must be at least 8 characters" };
        }

        const normalizedEmail = email.toLowerCase().trim();

        // 2. Check for existing user
        const existingUser = await prisma.user.findUnique({
            where: { email: normalizedEmail },
        });

        if (existingUser) {
            return { success: false, error: "This email is already registered" };
        }

        // 3. Hash the password
        const hashedPassword = await bcrypt.hash(password, 12);

        // 4. Create user
        // Mapping 'name' from form to 'username' in DB as per your original logic
        await prisma.user.create({
            data: {
                username: name.trim(),
                email: normalizedEmail,
                password: hashedPassword,
            },
        });

        return { success: true, message: "User created successfully" };

    } catch (error: unknown) {
        console.error("REGISTRATION_ERROR:", error);

        // Handle generic errors
        return {
            success: false,
            error: error instanceof Error ? error.message : "An unexpected internal server error occurred."
        };
    }
}