import React from 'react';

// Mock data for your posts
const posts = [
  {
    id: 1,
    title: "Getting Started with Next.js 14",
    excerpt: "Learn how to build modern web applications with the latest Next.js features...",
    date: "Dec 15, 2023",
    category: "Development"
  },
  {
    id: 2,
    title: "Mastering Tailwind CSS",
    excerpt: "Why utility-first CSS is changing the way we design for the web.",
    date: "Dec 10, 2023",
    category: "Design"
  },
  {
    id: 3,
    title: "The Future of AI in Web Dev",
    excerpt: "How generative AI is helping developers write cleaner code faster.",
    date: "Dec 05, 2023",
    category: "Technology"
  }
];

export default function BlogPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <header className="mb-12 border-b pb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Journal</h1>
        <p className="text-lg text-gray-600">Thoughts, stories, and ideas from the tech world.</p>
      </header>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <article key={post.id} className="flex flex-col border rounded-lg p-6 hover:shadow-lg transition-shadow bg-white">
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 mb-2">
              {post.category}
            </span>
            <h2 className="text-xl font-bold mb-3 text-gray-800 hover:text-blue-600 cursor-pointer">
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