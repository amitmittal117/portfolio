import { useState, useEffect } from 'react';
import { ArrowRight, Calendar, X, ChevronLeft } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { blogPosts } from '../../data';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BlurFade } from '@/components/ui/blur-fade';

interface BlogPost {
    id: string;
    title: string;
    tags: string[];
    readTime: string;
    excerpt: string;
    date?: string;
}

// Tag color mapping - minimal and consistent
const getTagColor = (tag: string) => {
    const tagLower = tag.toLowerCase();
    if (tagLower.includes('security') || tagLower.includes('cyber')) {
        return 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20';
    }
    if (tagLower.includes('health') || tagLower.includes('care')) {
        return 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20';
    }
    if (tagLower.includes('enterprise') || tagLower.includes('business')) {
        return 'bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20';
    }
    if (tagLower.includes('telecom') || tagLower.includes('mobile')) {
        return 'bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20';
    }
    return 'bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20';
};

export function Blog() {
    const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
    const [markdown, setMarkdown] = useState<string>('');
    const [loading, setLoading] = useState(false);

    const openPost = async (post: BlogPost) => {
        setSelectedPost(post);
        setLoading(true);
        document.body.style.overflow = 'hidden';
        try {
            const response = await fetch(`./blog/markdowns/${post.id}.md`);
            const text = await response.text();
            setMarkdown(text);
        } catch (error) {
            setMarkdown('# Error loading content\n\nCould not load the blog post.');
        }
        setLoading(false);
    };

    const closePost = () => {
        setSelectedPost(null);
        setMarkdown('');
        document.body.style.overflow = 'auto';
    };

    // Close on escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') closePost();
        };
        window.addEventListener('keydown', handleEscape);
        return () => window.removeEventListener('keydown', handleEscape);
    }, []);

    return (
        <section id="blog" className="section border-t">
            <div className="container">
                <h2 className="section-title text-center sm:text-left">Blog</h2>

                {/* All Posts in Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                    {blogPosts.map((post, index) => (
                        <BlurFade key={post.id} delay={0.1 + index * 0.05}>
                            <Card
                                className="h-full group relative overflow-hidden cursor-pointer border-muted/60 hover:border-primary/40 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
                                onClick={() => openPost(post)}
                            >
                                <CardHeader className="pb-3">
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="flex gap-2 flex-wrap">
                                            {post.tags.slice(0, 2).map((tag) => (
                                                <Badge
                                                    key={tag}
                                                    variant="secondary"
                                                    className={`text-xs border ${getTagColor(tag)}`}
                                                >
                                                    {tag}
                                                </Badge>
                                            ))}
                                        </div>
                                        <span className="text-xs text-muted-foreground flex items-center gap-1 shrink-0">
                                            <Calendar className="w-3 h-3" />
                                            {post.readTime}
                                        </span>
                                    </div>
                                    <CardTitle className="text-lg leading-snug group-hover:text-primary transition-colors duration-200">
                                        {post.title}
                                    </CardTitle>
                                </CardHeader>

                                <CardContent className="pt-0">
                                    <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2 mb-4">
                                        {post.excerpt}
                                    </p>
                                    <div className="flex items-center text-primary text-sm font-medium">
                                        <span>Read More</span>
                                        <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-200" />
                                    </div>
                                </CardContent>
                            </Card>
                        </BlurFade>
                    ))}
                </div>
            </div>

            {/* Blog Reader Modal */}
            {selectedPost && (
                <div className="fixed inset-0 z-50 bg-background">
                    {/* Modal Header - Fixed */}
                    <div className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
                        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={closePost}
                                className="gap-2 text-muted-foreground hover:text-foreground -ml-2"
                            >
                                <ChevronLeft className="w-4 h-4" />
                                Back to Blog
                            </Button>
                            <Button variant="ghost" size="icon" onClick={closePost} className="-mr-2">
                                <X className="w-5 h-5" />
                            </Button>
                        </div>
                    </div>

                    {/* Scrollable Content */}
                    <div className="h-full overflow-y-auto pt-16">
                        <article className="max-w-3xl mx-auto px-6 py-8">
                            {/* Post Header */}
                            <header className="mb-8">
                                <div className="flex items-center gap-2 mb-4 flex-wrap">
                                    {selectedPost.tags.map((tag) => (
                                        <Badge
                                            key={tag}
                                            variant="secondary"
                                            className={`text-xs border ${getTagColor(tag)}`}
                                        >
                                            {tag}
                                        </Badge>
                                    ))}
                                    <span className="text-sm text-muted-foreground flex items-center gap-1">
                                        <Calendar className="w-3.5 h-3.5" />
                                        {selectedPost.readTime}
                                    </span>
                                </div>
                                <h1 className="text-3xl md:text-4xl font-bold leading-tight">
                                    {selectedPost.title}
                                </h1>
                            </header>

                            {/* Markdown Content */}
                            {loading ? (
                                <div className="flex items-center justify-center py-20">
                                    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                                </div>
                            ) : (
                                <div className="prose-container">
                                    <ReactMarkdown
                                        components={{
                                            h1: ({ children }) => (
                                                <h2 className="text-2xl font-bold mt-12 mb-4 text-foreground">
                                                    {children}
                                                </h2>
                                            ),
                                            h2: ({ children }) => (
                                                <h2 className="text-xl font-semibold mt-10 mb-4 text-foreground">
                                                    {children}
                                                </h2>
                                            ),
                                            h3: ({ children }) => (
                                                <h3 className="text-lg font-medium mt-8 mb-3 text-foreground">
                                                    {children}
                                                </h3>
                                            ),
                                            p: ({ children }) => (
                                                <p className="text-base leading-7 text-muted-foreground mb-6">
                                                    {children}
                                                </p>
                                            ),
                                            ul: ({ children }) => (
                                                <ul className="list-disc pl-6 mb-6 space-y-3 text-muted-foreground">
                                                    {children}
                                                </ul>
                                            ),
                                            ol: ({ children }) => (
                                                <ol className="list-decimal pl-6 mb-6 space-y-3 text-muted-foreground">
                                                    {children}
                                                </ol>
                                            ),
                                            li: ({ children }) => (
                                                <li className="text-base leading-7 pl-1">
                                                    {children}
                                                </li>
                                            ),
                                            a: ({ href, children }) => (
                                                <a
                                                    href={href}
                                                    className="text-primary hover:underline underline-offset-4"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    {children}
                                                </a>
                                            ),
                                            strong: ({ children }) => (
                                                <strong className="font-semibold text-foreground">
                                                    {children}
                                                </strong>
                                            ),
                                            code: ({ children }) => (
                                                <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono">
                                                    {children}
                                                </code>
                                            ),
                                            pre: ({ children }) => (
                                                <pre className="bg-muted/50 border border-border rounded-lg p-4 overflow-x-auto mb-6 text-sm">
                                                    {children}
                                                </pre>
                                            ),
                                            blockquote: ({ children }) => (
                                                <blockquote className="border-l-4 border-primary/40 pl-6 my-6 text-muted-foreground italic">
                                                    {children}
                                                </blockquote>
                                            ),
                                        }}
                                    >
                                        {markdown}
                                    </ReactMarkdown>
                                </div>
                            )}

                            {/* Footer spacer */}
                            <div className="h-24" />
                        </article>
                    </div>
                </div>
            )}
        </section>
    );
}

export default Blog;
