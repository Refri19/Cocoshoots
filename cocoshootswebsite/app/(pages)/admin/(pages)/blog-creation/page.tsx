"use client"
import {useActionState,useState} from "react";
import {uploadPhoto} from "@/app/api/blog-upload/actions";
import {AlertCircle, CheckCircle2, Image as ImageIcon, Loader2, UploadCloud, X} from "lucide-react";

const initialState = {
    loading: false,
    success: false,
    message: " ",
}
export default function BlogUploadPage() {
    const [state, formAction, isPending] = useActionState(uploadPhoto, initialState);
    const [preview, setPreview] = useState<string | null>(null);
    const [fileName, setFileName] = useState<string>('');

    // Handle local file preview
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFileName(file.name);
            const objectUrl = URL.createObjectURL(file);
            setPreview(objectUrl);
        }
    };

    // Clear selection
    const clearSelection = () => {
        setPreview(null);
        setFileName('');
    };

    return (
        <div className="space-y-8 max-w-5xl mx-auto">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-slate-900">Media Upload</h1>
                <p className="text-slate-500">Add new images to your client gallery.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Left Column: Upload Form */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                        <div className="p-6 border-b border-slate-200">
                            <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                                <UploadCloud size={20} className="text-blue-600" />
                                Upload New Image
                            </h3>
                        </div>

                        <div className="p-6">
                            {/* Feedback Messages */}
                            {state.message && (
                                <div className={`mb-6 p-4 rounded-lg flex items-center gap-3 text-sm font-medium ${
                                    state.success ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                                }`}>
                                    {state.success ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
                                    {state.message}
                                </div>
                            )}

                            <form action={formAction} className="space-y-6">
                                {/* File Drop Zone */}
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-slate-700">Image File</label>
                                    <div className={`relative border-2 border-dashed rounded-xl p-8 transition-colors ${
                                        preview ? 'border-blue-500 bg-blue-50/10' : 'border-slate-300 hover:border-slate-400 hover:bg-slate-50'
                                    }`}>
                                        <input
                                            type="file"
                                            name="file"
                                            accept="image/*"
                                            onChange={handleFileChange}
                                            required
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                        />

                                        {preview ? (
                                            <div className="relative z-20 text-center">
                                                <img
                                                    src={preview}
                                                    alt="Preview"
                                                    className="mx-auto h-64 object-contain rounded-lg shadow-sm"
                                                />
                                                <div className="mt-4 flex items-center justify-center gap-2">
                                                    <span className="text-sm font-medium text-slate-600 bg-white px-3 py-1 rounded-full border border-slate-200">
                                                        {fileName}
                                                    </span>
                                                    <button
                                                        type="button"
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            clearSelection();
                                                        }}
                                                        className="p-1 hover:bg-red-100 text-red-500 rounded-full transition-colors"
                                                    >
                                                        <X size={16} />
                                                    </button>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="text-center">
                                                <div className="mx-auto h-12 w-12 text-slate-300 mb-4">
                                                    <ImageIcon className="w-full h-full" />
                                                </div>
                                                <p className="text-sm font-medium text-slate-900">
                                                    Click to upload or drag and drop
                                                </p>
                                                <p className="text-xs text-slate-500 mt-1">
                                                    SVG, PNG, JPG or GIF (max. 5MB)
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Inputs */}
                                <div className="grid gap-6 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-slate-700">Title</label>
                                        <input
                                            type="text"
                                            name="title"
                                            required
                                            placeholder="e.g. Summer Wedding"
                                            className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-slate-700">Tags (Optional)</label>
                                        <input
                                            type="text"
                                            name="tags"
                                            placeholder="e.g. nature, portrait"
                                            className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-slate-700">Description</label>
                                    <textarea
                                        name="description"
                                        rows={3}
                                        placeholder="Add details about this shot..."
                                        className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all resize-none"
                                    />
                                </div>

                                {/* Submit Button */}
                                <div className="pt-4 border-t border-slate-100 flex justify-end">
                                    <button
                                        type="submit"
                                        disabled={isPending}
                                        className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-6 py-2.5 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isPending ? (
                                            <>
                                                <Loader2 size={18} className="animate-spin" />
                                                Uploading...
                                            </>
                                        ) : (
                                            <>
                                                Upload Image
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Right Column: Tips or Status */}
                <div className="space-y-6">
                    <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                        <h4 className="font-semibold text-blue-900 mb-2">Upload Guidelines</h4>
                        <ul className="space-y-3 text-sm text-blue-800">
                            <li className="flex gap-2">
                                <span className="block w-1.5 h-1.5 mt-1.5 rounded-full bg-blue-400 shrink-0" />
                                High resolution images are preferred (min 1920px width).
                            </li>
                            <li className="flex gap-2">
                                <span className="block w-1.5 h-1.5 mt-1.5 rounded-full bg-blue-400 shrink-0" />
                                Maintain aspect ratio for gallery consistency.
                            </li>
                            <li className="flex gap-2">
                                <span className="block w-1.5 h-1.5 mt-1.5 rounded-full bg-blue-400 shrink-0" />
                                File size should not exceed 10MB per image.
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}