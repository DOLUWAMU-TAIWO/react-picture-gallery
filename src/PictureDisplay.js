import React, { useState } from 'react';

const PictureDisplay = () => {
  // State to store the picture object
  const [picture, setPicture] = useState({ id: '', url: '' });
  const [error, setError] = useState(null);

  // Function to fetch a random picture using fetch
  const fetchRandomPhoto = async () => {
    try {
      const response = await fetch('https://rocky-badlands-23396-f4979b1e0bda.herokuapp.com/random', {  // Direct backend URL
        method: 'GET',
        credentials: 'include', // Include credentials if your backend requires authentication
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setPicture({ id: data.id, url: data.url });
      setError(null); // Reset any previous error
    } catch (error) {
      console.error('Error fetching the photo:', error);
      setError(error.message); // Store error message for displaying to the user
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-10">
        Picture Gallery
      </h1>

      {/* Display the picture if URL exists */}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {picture.url ? (
        <div className="relative shadow-lg rounded-xl overflow-hidden w-full md:w-1/2">
         <img
          src={picture.url}
          alt={picture.id}  // Simply use the picture ID or any relevant info
          className="w-full h-96 object-cover"
        />
        </div>
      ) : (
        <p>No picture loaded yet.</p>
      )}

      {/* Button to fetch a new random picture */}
      <button
        onClick={fetchRandomPhoto}
        className="mt-5 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300"
      >
        Fetch Random Picture
      </button>
    </div>
  );
};

export default PictureDisplay;