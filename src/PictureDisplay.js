import React, { useState } from 'react';

const PictureDisplay = () => {
  // State to store the picture object
  const [picture, setPicture] = useState({ id: '', url: '' });
  const [error, setError] = useState(null);

  // Function to fetch a random picture using fetch
  const fetchRandomPhoto = async () => {
    try {
      const response = await fetch('https://crenewjersey.com/random', {
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
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-800 mb-10 text-center">
          Picture Gallery
        </h1>

        {/* Display the picture if URL exists */}
        {error && <p className="text-red-500 text-center">Error: {error}</p>}
        {picture.url ? (
          <div className="relative shadow-lg rounded-xl overflow-hidden w-full max-w-screen-lg mx-auto">
            <img
              src={picture.url}
              alt={`ID: ${picture.id}`}
              className="w-full h-auto object-cover"
              style={{ maxHeight: '80vh', borderRadius: '0.5rem' }}
            />
          </div>
        ) : (
          <p className="text-center">No picture loaded yet.</p>
        )}

        {/* Button to fetch a new random picture */}
        <div className="flex justify-center mt-5">
          <button
            onClick={fetchRandomPhoto}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300"
          >
            Fetch Random Picture
          </button>
        </div>
      </div>
    </div>
  );
};

export default PictureDisplay;
