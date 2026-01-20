import {prisma} from "@/lib/prisma"
import UploadForm from "@/app/ui/components/UploadForm";
import Image from "next/image";

export default async function HomePage() {
    // 1. Fetch all photos from the database
    const photos = await prisma.photo.findMany({
        orderBy: { id: "desc" },
    });

    return (
        <main className="max-w-4xl mx-auto p-8">
            <h1 className="text-3xl font-bold mb-8 text-center">Image Vault</h1>

            <section className="mb-12 bg-gray-50 p-6 rounded-lg border border-dashed border-gray-300">
                <h2 className="text-xl font-semibold mb-4">Upload New Image</h2>
                <UploadForm />
            </section>

            <hr className="my-10" />

            <section>
                <h2 className="text-2xl font-semibold mb-6">Gallery</h2>

                {photos.length === 0 ? (
                    <p className="text-gray-500 italic">No photos uploaded yet.</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {photos.map((photo) => {
                            // 2. Convert the Bytes (Buffer) to a Base64 string for display
                            const base64Image = photo.img
                                ? `data:image/jpeg;base64,${photo.img.toString("base64")}`
                                : null;

                            return (
                                <div key={photo.id} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                                    {base64Image && (
                                        <div className="relative h-48 w-full bg-gray-200">
                                            <img
                                                src={base64Image}
                                                alt={photo.name || "Uploaded image"}
                                                className="object-cover w-full h-full"
                                            />
                                        </div>
                                    )}
                                    <div className="p-3">
                                        <p className="font-medium truncate">{photo.name || "Untitled"}</p>
                                        <p className="text-xs text-gray-500 truncate">{photo.filename}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </section>
        </main>
    );
}