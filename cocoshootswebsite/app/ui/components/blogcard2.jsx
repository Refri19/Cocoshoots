// src/components/BlogList.jsx

/* import React, { useState, useEffect } from 'react';
import BlogPostCard from './BlogPostCard';

const BlogList = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // The hypothetical API endpoint that fetches data from your backend/database
  const API_ENDPOINT = 'https://api.yourwebsite.com/v1/blog-posts';

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(API_ENDPOINT);
        
        // Check for HTTP errors (e.g., 404, 500)
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        setPosts(data); // Assuming the API returns an array of post objects
      } catch (err) {
        // Handle network errors or other exceptions
        setError(err.message);
      } finally {
        // This runs after success or failure
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []); // Empty dependency array means this effect runs only once after the initial render

  /* --- Render Logic --- */
  
  /*if (isLoading) {
    return <div className="blog-list-message">Loading blog posts...</div>;
  }

  if (error) {
    return <div className="blog-list-message error">Error: {error}. Could not fetch data.</div>;
  }

  if (posts.length === 0) {
    return <div className="blog-list-message">No blog posts found.</div>;
  }

  return (
    <div className="blog-list-container">
      <h1>Latest Blog Posts</h1>
      <div className="blog-cards-grid">
        {/* Map through the fetched posts and render a card for each */}
        /*{posts.map(post => (
          <BlogPostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default BlogList; 