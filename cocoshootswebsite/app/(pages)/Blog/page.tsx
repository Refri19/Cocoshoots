"use client";
import React from 'react';
import BlogCard from '@/app/ui/components/blogcard'; // Adjust the path as needed

const posts = [
  {
    id: 1,
    title: "The Future of Tailwind",
    excerpt: "Exploring what's new in version 4.0 and how it changes styling.",
    date: "Dec 23, 2025",
    category: "Design"
    ,morecontent: ""
  },
  {
    id: 2,
    title: "Minimalist Workflows",
    excerpt: "How to stay productive by doing less but focusing more.",
    date: "Dec 24, 2025",
    category: "Studio"
    ,morecontent: ""
  },
  {
    id: 3,
    title: "Brand Consistency",
    excerpt: "Maintaining your orange accent across different color modes.",
    date: "Dec 25, 2025",
    category: "Strategy"
    ,morecontent: ""
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
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}