import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useState, useEffect } from 'react';



const BlogPage = ({ post }) => {
  const navigate = useNavigate();
  const [markdownNames, setMarkdownNames] = useState([]);
  const [blogPosts, setBlogPosts] = useState({});

  useEffect(() => {
    const fetchMarkdownNames = async () => {
      try {
        const response = await fetch(`/portfolio/blog/posts.json`);
        const data = await response.json();

        const keys = Object.keys(data);
        setMarkdownNames(keys);
        setBlogPosts(data)
      } catch (error) {
        console.error("Error fetching markdown names:", error);
      }
    };

    fetchMarkdownNames();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <div className="container mx-auto px-4 py-16">
        {/* Back button */}
        <button
          onClick={() => navigate(`/`)}
          className="flex items-center gap-2 mb-8 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          Back to Portfolio
        </button>

        <h1 className="text-4xl font-bold mb-8 text-gray-800 dark:text-white">Blog Posts</h1>

        {/* Blog posts grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {markdownNames.map((keys) => (
            <article
              key={blogPosts[keys].id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 overflow-hidden"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {new Date(blogPosts[keys].date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{blogPosts[keys].readTime}</p>
                  </div>
                </div>
                
                <h2 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  <a href={`/portfolio/blog/${blogPosts[keys].id}`} className="block">
                    {blogPosts[keys].title}
                  </a>
                </h2>
                
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {blogPosts[keys].excerpt}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {blogPosts[keys].tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;