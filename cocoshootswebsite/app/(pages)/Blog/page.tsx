"use client";
import React, { use } from 'react';

// Mock data for your posts
const posts = [
  {
    id: 1,
    title: "Something",
    excerpt: "Something Something",
    date: "Dec 23, 2025",
    category: "Blog"
  },
  {
    id: 2,
    title: "Something",
    excerpt: "Something Something.",
    date: "Dec 23, 2025",
    category: "Blog"
  },
  {
    id: 3,
    title: "Something",
    excerpt: "Something Something",
    date: "Dec 23, 2025",
    category: "Blog"
  }
];

export default function BlogPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="mb-12 border-b pb-8">
        <h1 className="text-4xl font-bold mb-4">Our Journal</h1>
        <p className="text-lg text-gray-600">Thoughts, stories, and about the stories about this studio.</p>
      </div>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <article key={post.id} className="flexflex-col border rounded-lg p-6 hover:shadow-lg transition-shadow bg-white">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#D2532B] mb-2">
              {post.category}
            </span>
            <h2 className="text-xl font-bold mb-3 text-gray-800 hover:text-[#D2532B] cursor-pointer">
              {post.title}
            </h2>
            <p className="text-gray-600 mb-4 flex-grow">
              {post.excerpt}
            </p>
            <div className="text-sm text-gray-400">
              {post.date}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}