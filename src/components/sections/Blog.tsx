
import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { ArrowRight, Calendar, X } from 'lucide-react';
import { blogPosts } from '../../data';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BlurFade } from '@/components/ui/blur-fade';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface BlogPost {
    id: string;
    title: string;
    tags: string[];
    readTime: string;
    excerpt: string;
}

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
                <h2 className="section-title">Blog</h2>

                <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                        {blogPosts.map((post, index) => (
                            <BlurFade key={post.id} delay={0.1 + index * 0.05}>
                                <Card
                                    className="h-full hover:shadow-lg hover:border-primary/50 transition-all cursor-pointer border-muted/60 group relative overflow-hidden"
                                    onClick={() => openPost(post)}
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <CardHeader>
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="flex gap-2">
                                                {post.tags.slice(0, 2).map((tag, i) => {
                                                    const colors = [
                                                        "bg-blue-500/10 text-blue-500 border-blue-500/20",
                                                        "bg-purple-500/10 text-purple-500 border-purple-500/20",
                                                        "bg-green-500/10 text-green-500 border-green-500/20",
                                                        "bg-orange-500/10 text-orange-500 border-orange-500/20",
                                                    ];
                                                    const colorClass = colors[i % colors.length];
                                                    return (
                                                        <Badge key={tag} variant="secondary" className={`text-xs border ${colorClass}`}>
                                                            {tag}
                                                        </Badge>
                                                    );
                                                })}
                                            </div>
                                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                                                <Calendar className="w-3 h-3" />
                                                {post.readTime}
                                            </span>
                                        </div>
                                        <CardTitle className="text-xl group-hover:text-primary transition-colors">
                                            {post.title}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-muted-foreground text-sm line-clamp-3 mb-4">
                                            {post.excerpt}
                                        </p>
                                        <div className="flex items-center text-primary text-sm font-medium group-hover:translate-x-1 transition-transform">
                                            Read More <ArrowRight className="w-4 h-4 ml-1" />
                                        </div>
                                    </CardContent>
                                </Card>
                            </BlurFade>
                        ))}
                    </div>
                </div>
            </div>

            {/* Blog Reader Modal */}
            {selectedPost && (
                <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm overflow-y-auto">
                    <div className="container py-8">
                        {/* Breadcrumb */}
                        <div className="flex items-center justify-between mb-6">
                            <Breadcrumb>
                                <BreadcrumbList>
                                    <BreadcrumbItem>
                                        <BreadcrumbLink onClick={closePost} className="cursor-pointer">
                                            Home
                                        </BreadcrumbLink>
                                    </BreadcrumbItem>
                                    <BreadcrumbSeparator />
                                    <BreadcrumbItem>
                                        <BreadcrumbLink onClick={closePost} className="cursor-pointer">
                                            Blog
                                        </BreadcrumbLink>
                                    </BreadcrumbItem>
                                    <BreadcrumbSeparator />
                                    <BreadcrumbItem>
                                        <BreadcrumbPage className="max-w-[200px] truncate">
                                            {selectedPost.title}
                                        </BreadcrumbPage>
                                    </BreadcrumbItem>
                                </BreadcrumbList>
                            </Breadcrumb>
                            <Button variant="ghost" size="icon" onClick={closePost}>
                                <X className="w-5 h-5" />
                            </Button>
                        </div>

                        {/* Post Header */}
                        <div className="mb-8">
                            <div className="flex items-center gap-2 mb-3">
                                {selectedPost.tags.map((tag) => (
                                    <Badge key={tag} variant="secondary">
                                        {tag}
                                    </Badge>
                                ))}
                                <span className="text-sm text-muted-foreground">
                                    {selectedPost.readTime}
                                </span>
                            </div>
                            <h1 className="text-3xl font-bold mb-4">{selectedPost.title}</h1>
                        </div>

                        {/* Markdown Content */}
                        {loading ? (
                            <p className="text-muted-foreground">Loading...</p>
                        ) : (
                            <article className="prose prose-neutral dark:prose-invert max-w-none">
                                <ReactMarkdown
                                    components={{
                                        h1: ({ children }) => <h1 className="text-2xl font-bold mt-8 mb-4">{children}</h1>,
                                        h2: ({ children }) => <h2 className="text-xl font-semibold mt-6 mb-3 text-primary">{children}</h2>,
                                        h3: ({ children }) => <h3 className="text-lg font-medium mt-4 mb-2">{children}</h3>,
                                        p: ({ children }) => <p className="mb-4 leading-relaxed text-muted-foreground">{children}</p>,
                                        ul: ({ children }) => <ul className="list-disc pl-6 mb-4 space-y-1 text-muted-foreground">{children}</ul>,
                                        ol: ({ children }) => <ol className="list-decimal pl-6 mb-4 space-y-1 text-muted-foreground">{children}</ol>,
                                        li: ({ children }) => <li>{children}</li>,
                                        a: ({ href, children }) => <a href={href} className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">{children}</a>,
                                        strong: ({ children }) => <strong className="font-semibold text-foreground">{children}</strong>,
                                        code: ({ children }) => <code className="bg-muted px-1.5 py-0.5 rounded text-sm">{children}</code>,
                                        blockquote: ({ children }) => <blockquote className="border-l-4 border-primary pl-4 italic my-4">{children}</blockquote>,
                                    }}
                                >
                                    {markdown}
                                </ReactMarkdown>
                            </article>
                        )}


                    </div>
                </div>
            )}
        </section>
    );
}

export default Blog;
