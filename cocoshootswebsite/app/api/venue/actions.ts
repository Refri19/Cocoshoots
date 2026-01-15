'use server'

import { prisma } from "@/lib/prisma"; // Adjust this path to your prisma client location
import { revalidatePath } from "next/cache";

export async function createVenueAction(formData: {
    name: string;
    email: string;
    phonenumber: string;
    reasoning: string;
    scheduleAt: Date;
}) {
    try {
        const venue = await prisma.venue.create({
            data: {
                name: formData.name,
                email: formData.email,
                phonenumber: formData.phonenumber,
                reasoning: formData.reasoning,
                scheduleAt: formData.scheduleAt,
            },
        });
        revalidatePath('/');

        return { success: true, data: venue };
    } catch (error) {
        console.error("Database Error:", error);
        return { success: false, error: "Failed to create schedule" };

    }
}