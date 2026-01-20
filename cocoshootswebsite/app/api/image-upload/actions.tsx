// app/actions/uploadAction.ts
"use server";

import {prisma} from '@/lib/prisma';
import { revalidatePath } from "next/cache";


export async function uploadPhoto(formData: FormData) {
    const file = formData.get("img") as File;
    const name = formData.get("name") as string;

    if (!file || file.size === 0) {
        throw new Error("No file uploaded");
    }

    // Convert the File object into a Buffer for the 'Bytes' field
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    try {
        await prisma.photo.create({
            data: {
                name: name || "Untitled",
                filename: file.name,
                img: buffer, // This matches the Bytes type
            },
        });

        revalidatePath("/"); // Refresh the page to show new data
        return { success: true };
    } catch (error) {
        console.error("Upload Error:", error);
        return { success: false, error: "Failed to upload to database" };
    }
}