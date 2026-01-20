// app/api/image-upload/actions.tsx

// Change this:
// export async function uploadPhoto(formData: FormData) {

// To this:
export async function uploadPhoto(prevState: any, formData: FormData) {
    // Now formData is correctly identified as the second argument
    const file = formData.get("image") as File;
    const name = formData.get("name") as string;

    if (!file || file.size === 0) {
        return { success: false, error: "No file uploaded" };
    }

    // ... rest of your Prisma logic
    try {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // ... prisma.photo.create code

        return { success: true, error: null };
    } catch (e) {
        return { success: false, error: "Database error" };
    }
}