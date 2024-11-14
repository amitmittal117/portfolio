import React from 'react';
import { useNavigate } from 'react-router-dom';

export const BlogButton = () => {
  const navigate = useNavigate();
  
  return (
    <button
      onClick={() => navigate('/portfolio/blogs')}
      className="fixed top-3 right-20 p-2 rounded bg-opacity-20 backdrop-blur-sm 
      dark:text-white shadow-xl text-slate-300 hover:shadow-lg hover:scale-95 transition-all duration-200 z-50 items-center gap-2"
      aria-label="View Blogs"
    >
      <span className="text-xl font-normal dark:text-white "><strong>Blogs</strong></span>
    </button>
  );
};
