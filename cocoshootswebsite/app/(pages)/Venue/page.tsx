'use client';
import {useState, FormEvent, useEffect, useRef} from "react";
import Calendar from "@/app/ui/components/calendar";


interface VenueData {
  name: string;
  email: string;
  ponenumber: string;
  reasoning: string;
    createdAt: Date;
    scheduleAt: Date;
}
export default function VenueForm() 
{
    const [formData, setFormData] = useState<VenueData>({
        name: '',
        email: '',
        ponenumber: '',
        reasoning: '',
        createdAt: new Date(),
        scheduleAt: new Date(),
    });
const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    const calendarRef = useRef<HTMLDivElement>(null);

    // Handle clicking outside to close the calendar
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
        setIsCalendarOpen(false); // Close dropdown after selection
    };
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        // Replace this with your actual API endpoint logic
        try {
          console.log('Feedback submitted:', formData);
            const response = await fetch('/api/venue', { method: 'POST', body: JSON.stringify(formData) });
          
          // Simulating API delay
          await new Promise((resolve) => setTimeout(resolve, 1000));
            setStatus('success');
          setFormData({ name: '', email: '', ponenumber: '', reasoning: '', createdAt: new Date(), scheduleAt: new Date() });
        } catch (error) {
          setStatus('error');
        }
      };
  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-md border border-slate-200">
      <h2 className="text-2xl font-bold mb-4 text-slate-800">Create a Schedule and </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name Input */}
        <div>
          <label className="block text-black
 font-medium text-slate-700">Name</label>
          <input
            type="text"
            required
            className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-black
 shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>

        {/* Email Input */}
        <div>
          <label className="block text-black
 font-medium text-slate-700">Email</label>
          <input
            type="email"
            required
            className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-black
 shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>

        {/* Category Dropdown */}
        <div>
          <label className="block text-black
 font-medium text-slate-700">Phonenumber</label>
          <input
            type="text"
            required
            className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-black
 shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            value={formData.ponenumber}
            onChange={(e) => setFormData({ ...formData, ponenumber: e.target.value })}
          />
        </div>
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
                        <div className="absolute z-50 mt-2 left-0 w-full bg-white border border-slate-200 shadow-2xl rounded-xl p-2 animate-in fade-in zoom-in-95 duration-200">
                            <Calendar onSelect={handleDateSelect} />
                        </div>
                    )}
                </div>

        {/* Message Textarea */}
        <div>
          <label className="block text-black
 font-medium text-slate-700">Reasoning</label>
          <textarea
            required
            className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-black
 shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            value={formData.reasoning}
            onChange={(e) => setFormData({ ...formData, reasoning: e.target.value })}
          />
        </div>
        

        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full bg-[#253939] text-[#fef6e9] font-bold py-4 px-6 rounded-2xl hover:bg-[#D2532B] active:scale-95 transition-all duration-300 flex items-center justify-center gap-3 text-lg shadow-lg"
        >
          {status === 'loading' ? 'Sending...' : 'Submit Feedback'}
        </button>

        {/* Status Messages */}
        {status === 'success' && (
          <p className="text-green-600 text-black
 text-center">Thank you! Your feedback has been sent.</p>
        )}
        {status === 'error' && (
          <p className="text-red-600 text-black
 text-center">Something went wrong. Please try again.</p>
        )}
      </form>
    </div>
  );
}