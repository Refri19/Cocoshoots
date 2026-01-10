"use client";
import React, { useState } from 'react';

export default function BlogCard({ post }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <article 
      className={`
        blog-card-container 
        ${isExpanded ? 'is-expanded' : ''}
        /* Changed max-w-sm to max-w-none to allow it to be wider */
        max-w-none w-full rounded-3xl border p-10 transition-all duration-500 
        bg-[var(--card-bg)] text-[var(--card-fg)] border-[var(--card-border)]
        shadow-[0_10px_40px_-15px_rgba(210,83,43,0.2)]
      `}
    >
      <div className="space-y-6"> {/* Increased spacing for the wider layout */}
        <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-brand-orange text-brand-cream">
          {post.category}
        </span>

        <h2 className="text-3xl font-bold leading-tight"> {/* Increased text size */}
          {post.title}
        </h2>

        <p className="text-base leading-relaxed opacity-80 max-w-2xl">
          {post.excerpt}
        </p>

        {/* Expanded Content Area */}
        <div 
          className={`transition-all duration-700 ease-in-out overflow-hidden ${
            isExpanded ? 'max-h-[500px] opacity-100 mt-6' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="grid md:grid-cols-2 gap-8 border-t border-brand-orange/20 pt-8">
            <div className="space-y-4 text-sm opacity-90">
              <p>
                {post.morecontent}
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center pt-4 border-t border-brand-orange/5">
          <div className="text-xs font-semibold opacity-50 uppercase tracking-widest">
            {post.date}
          </div>
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="px-8 py-3 rounded-xl bg-brand-orange text-white font-bold hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            {isExpanded ? 'Show Less' : 'Read Full Article'}
          </button>
        </div>
      </div>
    </article>
  );
}