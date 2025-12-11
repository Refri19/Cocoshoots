/* src/components/BlogPostCard.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DataCard = () => {
  // State for storing the fetched data, handling loading status, and errors
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // The API endpoint URL (replace with your actual backend URL)
  const API_URL = 'https://api.example.com/item/1'; // Example URL

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(API_URL);
        setData(response.data); // Axios automatically parses JSON
        setError(null);
      } catch (err) {
        setError(err.message);
        setData(null);
      } finally {
        setLoading(false); // Set loading to false once the request is complete
      }
    };

    fetchData();
  }, []); // The empty dependency array ensures this runs only once when the component mounts

  if (loading) {
    return <div className="card loading">Loading...</div>;
  }

  if (error) {
    return <div className="card error">Error: {error}</div>;
  }

  // Ensure data exists before trying to access its properties
  if (!data) {
    return <div className="card">No data found.</div>;
  }

  return (
    <div className="card">
      <img src={data.imageUrl || 'placeholder-image.jpg'} alt={data.title} className="card-image" />
      <div className="card-content">
        <h2 className="card-title">{data.title}</h2>
        <p className="card-description">{data.description}</p>
        <p className="card-price">${data.price}</p>
        <a href={data.url} className="card-button" target="_blank" rel="noopener noreferrer">
          View Item
        </a>
      </div>
    </div>
  );
};

export default DataCard;
*/