import React from 'react';
import { useNavigate } from 'react-router-dom';

export const BlogButton = () => {
  const navigate = useNavigate();
  
  return (
    <button
      onClick={() => navigate('/blogs')}
      className="fixed top-3 right-20 p-2 rounded bg-opacity-20 backdrop-blur-sm 
      dark:bg-gray-900  text-white shadow-xl hover:shadow-lg hover:scale-95 transition-all duration-200 z-50 items-center gap-2"
      aria-label="View Blogs"
    >
      <span className="text-xl font-normal dark:bg-gray-900 "><strong>Blogs</strong></span>
    </button>
  );
};
