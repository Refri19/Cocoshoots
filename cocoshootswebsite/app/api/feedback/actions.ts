'use server'

import { prisma } from "@/lib/prisma"; // Adjust this path to your prisma client location
import { revalidatePath } from "next/cache";
import {Category} from "@/src/generated/prisma/enums";


export async function createFeedbackAction(formData: {
    name: string;
    email: string;
    category:Category;
    message:string;
}) {
    try {
        const feedback = await prisma.feedback.create({
            data: {
                name: formData.name,
                email: formData.email,
                category:formData.category,
                message:formData.message,
            },
        });
        revalidatePath('/');

        return { success: true, data: feedback };
    } catch (error) {
        console.error("Database Error:", error);
        return { success: false, error: "Failed to create a feedback" };

    }
}