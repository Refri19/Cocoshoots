'use client';

import { useState, FormEvent } from 'react';

type FeedbackType = 'bug' | 'suggestion' | 'praise' | 'other';

interface FeedbackData {
  name: string;
  email: string;
  category: FeedbackType;
  message: string;
}

export default function FeedbackForm() {
  const [formData, setFormData] = useState<FeedbackData>({
    name: '',
    email: '',
    category: 'suggestion',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    // Replace this with your actual API endpoint logic
    try {
      console.log('Feedback submitted:', formData);
      // const response = await fetch('/api/feedback', { method: 'POST', body: JSON.stringify(formData) });
      
      // Simulating API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setStatus('success');
      setFormData({ name: '', email: '', category: 'suggestion', message: '' });
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-md border border-slate-200">
      <h2 className="text-2xl font-bold mb-4 text-slate-800">Send us Feedback</h2>
      
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
 font-medium text-slate-700">Category</label>
          <select
            className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-black
 shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value as FeedbackType })}
          >
            <option value="suggestion">Suggestion</option>
            <option value="bug">Report a Bug</option>
            <option value="praise">Praise</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Message Textarea */}
        <div>
          <label className="block text-black
 font-medium text-slate-700">Message</label>
          <textarea
            required
            rows={4}
            className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-black
 shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
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