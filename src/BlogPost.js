import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar, Tag } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow as codeTheme } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';


const BlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [markdownContent, setMarkdownContent] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [post, setBlogPosts] = useState({});

  useEffect(() => {
    const fetchMarkdownNames = async () => {
      try {
        const response = await fetch(`/portfolio/blog/posts.json`);
        const data = await response.json();
        setBlogPosts(data[id])
      } catch (error) {
        console.error("Error fetching markdown names:", error);
      }
    };

    fetchMarkdownNames();
  }, [id]);


  useEffect(() => {
    const fetchMarkdown = async () => {
      if (!post) {
        setError('Post not found');
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(`/portfolio/blog/markdowns/${id}.md`);

        if (!response.ok) {
          throw new Error(`Failed to fetch markdown: ${response.statusText}`);
        }
        const markdown = await response.text();
        setMarkdownContent(markdown);
        setIsLoading(false);
      } catch (err) {
        console.error('Error loading markdown:', err);
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchMarkdown();
  }, [id, post]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
            {error || 'Blog post not found'}
          </h1>
          <button onClick={() => navigate('/blogs')} className="text-blue-600 dark:text-blue-400 hover:underline">
            Return to blogs
          </button>
        </div>
      </div>
    );
  }

  const components = {
    code({ node, inline, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || '');
      return !inline && match ? (
        <SyntaxHighlighter
          style={codeTheme}
          language={match[1]}
          PreTag="div"
          className="rounded-lg my-4"
          {...props}
        >
          {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
      ) : (
        <code className={`${className} bg-gray-100 dark:bg-gray-700 rounded px-1`} {...props}>
          {children}
        </code>
      );
    },
    h1: ({ node, ...props }) => (
      <h1 className="text-3xl font-bold mt-8 mb-4 text-gray-900 dark:text-white" {...props}>
        {props.children}
      </h1>
    ),
    h2: ({ node, ...props }) => (
      <h2 className="text-2xl font-bold mt-6 mb-3 text-gray-800 dark:text-gray-100" {...props}>
        {props.children}
      </h2>
    ),
    h3: ({ node, ...props }) => (
      <h3 className="text-xl font-bold mt-4 mb-2 text-gray-800 dark:text-gray-100" {...props}>
        {props.children}
      </h3>
    ),
    p: ({ node, ...props }) => <p className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed" {...props} />,
    ul: ({ node, ...props }) => <ul className="list-disc list-inside mb-4 ml-4 text-gray-700 dark:text-gray-300" {...props} />,
    ol: ({ node, ...props }) => <ol className="list-decimal list-inside mb-4 ml-4 text-gray-700 dark:text-gray-300" {...props} />,
    li: ({ node, ...props }) => <li className="mb-2" {...props} />,
    strong: ({ node, ...props }) => <strong className="font-bold text-gray-900 dark:text-white" {...props} />,
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <div className="container mx-auto px-4 py-16">
        <button
          onClick={() => navigate('/blogs')}
          className="flex items-center gap-2 mb-8 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          Back to Blogs
        </button>

        <article className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="p-8 border-b border-gray-200 dark:border-gray-700">
            <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">{post.title}</h1>
            
            <div className="flex flex-wrap gap-4 text-gray-600 dark:text-gray-300 mb-6">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                <span>{new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                <span>{post.readTime}</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                <span className="text-xl font-bold text-blue-600 dark:text-blue-400">{post.author.charAt(0)}</span>
              </div>
              <div>
                <h3 className="font-medium text-gray-800 dark:text-white">{post.author}</h3>
                <p className="text-gray-600 dark:text-gray-300">{post.authorRole}</p>
              </div>
            </div>
          </div>

          <div className="px-8 py-4 border-b border-gray-200 dark:border-gray-700 flex gap-2">
            {post.tags.map((tag, index) => (
              <span
                key={index}
                className="flex items-center gap-1 px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm"
              >
                <Tag className="h-4 w-4" />
                {tag}
              </span>
            ))}
          </div>

          <div className="p-8 prose dark:prose-invert max-w-none">
            <ReactMarkdown
              components={components}
              remarkPlugins={[remarkGfm]}
            >
              {markdownContent}
            </ReactMarkdown>
          </div>
        </article>
      </div>
    </div>
  );
};

export default BlogPost;