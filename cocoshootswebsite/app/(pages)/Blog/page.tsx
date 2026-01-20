import React from 'react';
import BlogCard from '@/app/ui/components/blogcard';
import {prisma} from '@/lib/prisma';


export default async function BlogPage() {
  const posts = await prisma.blog.findMany()
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="mb-12 border-b pb-8">
        <h1 className="text-4xl font-bold mb-4">Our Journal</h1>
        <p className="text-lg text-gray-600">Thoughts, stories, and about the stories about this studio.</p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((blog) => (
          <BlogCard key={blog.id}
                    category={blog.category}
                    title={blog.title}
                    excerpt={blog.excerpt}
          morecontent={blog.morecontent}
          createdAt={blog.createdAt}/>
        ))}
      </div>
    </div>
  );
}