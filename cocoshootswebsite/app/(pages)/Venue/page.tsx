'use client';
import { useState, FormEvent, useEffect, useRef } from "react";
import Calendar from "@/app/ui/components/calendar";
import { createVenueAction } from "../../api/venue/actions"; // Import the action

interface VenueData {
    name: string;
    email: string;
    phonenumber: string;
    reasoning: string;
    createdAt: Date;
    scheduleAt: Date;
}

export default function VenueForm() {
    const [formData, setFormData] = useState<VenueData>({
        name: '',
        email: '',
        phonenumber: '',
        reasoning: '',
        createdAt: new Date(),
        scheduleAt: new Date(),
    });

    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const calendarRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
                setIsCalendarOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleDateSelect = (date: Date) => {
        setFormData({ ...formData, scheduleAt: date });
        setIsCalendarOpen(false);
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setStatus('loading');

        try {
            // Calling the Server Action directly
            const result = await createVenueAction({
                name: formData.name,
                email: formData.email,
                phonenumber: formData.phonenumber,
                reasoning: formData.reasoning,
                scheduleAt: formData.scheduleAt,
            });

            if (result.success) {
                setStatus('success');
                setFormData({
                    name: '',
                    email: '',
                    phonenumber: '',
                    reasoning: '',
                    createdAt: new Date(),
                    scheduleAt: new Date()
                });
            } else {
                setStatus('error');
            }
        } catch (error) {
            setStatus('error');
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-md border border-slate-200">
            <h2 className="text-2xl font-bold mb-4 text-slate-800">Create a Schedule</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name */}
                <div>
                    <label className="block font-medium text-slate-700">Name</label>
                    <input
                        type="text"
                        required
                        className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-black shadow-sm focus:ring-1 focus:ring-blue-500"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                </div>

                {/* Email */}
                <div>
                    <label className="block font-medium text-slate-700">Email</label>
                    <input
                        type="email"
                        required
                        className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-black shadow-sm focus:ring-1 focus:ring-blue-500"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                </div>

                {/* Phonenumber */}
                <div>
                    <label className="block font-medium text-slate-700">Phone Number</label>
                    <input
                        type="text"
                        required
                        className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-black shadow-sm focus:ring-1 focus:ring-blue-500"
                        value={formData.phonenumber}
                        onChange={(e) => setFormData({ ...formData, phonenumber: e.target.value })}
                    />
                </div>

                {/* Date Picker */}
                <div className="relative" ref={calendarRef}>
                    <label className="block text-sm font-medium text-slate-700">Scheduled at:</label>
                    <button
                        type="button"
                        onClick={() => setIsCalendarOpen(!isCalendarOpen)}
                        className="mt-1 flex justify-between items-center w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-black shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 text-left"
                    >
                        {formData.scheduleAt.toLocaleDateString()}
                        <span className="text-gray-400 text-xs">▼</span>
                    </button>

                    {isCalendarOpen && (
                        <div className="absolute z-50 mt-2 left-0 w-full bg-white border border-slate-200 shadow-2xl rounded-xl p-2">
                            <Calendar onSelect={handleDateSelect} />
                        </div>
                    )}
                </div>

                {/* Reasoning */}
                <div>
                    <label className="block font-medium text-slate-700">Reasoning</label>
                    <textarea
                        required
                        className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-black shadow-sm focus:ring-1 focus:ring-blue-500"
                        value={formData.reasoning}
                        onChange={(e) => setFormData({ ...formData, reasoning: e.target.value })}
                    />
                </div>

                <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full bg-[#253939] text-[#fef6e9] font-bold py-4 px-6 rounded-2xl hover:bg-[#D2532B] active:scale-95 transition-all duration-300 disabled:opacity-50"
                >
                    {status === 'loading' ? 'Sending...' : 'Submit Schedule'}
                </button>

                {status === 'success' && <p className="text-green-600 text-center">Schedule created successfully!</p>}
                {status === 'error' && <p className="text-red-600 text-center">Something went wrong. Please try again.</p>}
            </form>
        </div>
    );
}