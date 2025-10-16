import { ReactNode } from 'react';
import { CoreContent } from '@/lib/contentlayer';
import type { Blog, Authors } from 'contentlayer/generated';
import Link from 'next/link';
import Tag from '@/components/Tag';
import BlogHeader from '@/components/BlogHeader';
import PostMetadata from '@/components/PostMetadata';

interface LayoutProps {
    post: Blog;
    content: CoreContent<Blog>;
    authorDetails: CoreContent<Authors>[];
    next?: { path: string; title: string };
    prev?: { path: string; title: string };
    children: ReactNode;
}

export default function PostLayout({
    post,
    content,
    authorDetails,
    next,
    prev,
    children,
}: LayoutProps) {
    const { path, date, title, readingTime } = content;
    const basePath = path.split('/')[0];

    return (
        <>
            <BlogHeader />
            <div className="max-w-3xl mx-auto px-8 py-20">
                <article>
                    <header className="mb-8 text-left">
                        <div className="space-y-6">
                            <h1 className="text-4xl md:text-4xl font-bold tracking-tighter leading-none">
                                {title}
                            </h1>
                            <div className="border-b border-t border-gray-200 py-2">
                                <PostMetadata
                                    date={date}
                                    readingTime={readingTime}
                                    tags={post.tags}
                                    authors={post.authors}
                                />
                            </div>
                        </div>
                    </header>

                    <div className="blog-content max-w-none">{children}</div>

                    <footer className="mt-20 pt-12 space-y-12">
                        {(next || prev) && (
                            <div className="flex justify-between gap-8">
                                {prev && prev.path ? (
                                    <div className="flex-1">
                                        <div className="text-sm font-mono text-gray-500 mb-2">
                                            Previous
                                        </div>
                                        <Link
                                            href={`/${prev.path}`}
                                            className="text-xl font-light hover:text-gray-600 transition-colors duration-300 block"
                                        >
                                            {prev.title}
                                        </Link>
                                    </div>
                                ) : (
                                    <div className="flex-1" />
                                )}
                                {next && next.path ? (
                                    <div className="flex-1 text-right">
                                        <div className="text-sm font-mono text-gray-500 mb-2">
                                            Next
                                        </div>
                                        <Link
                                            href={`/${next.path}`}
                                            className="text-xl font-light hover:text-gray-600 transition-colors duration-300 block"
                                        >
                                            {next.title}
                                        </Link>
                                    </div>
                                ) : (
                                    <div className="flex-1" />
                                )}
                            </div>
                        )}
                        <div className="text-center">
                            <Link
                                href={`/${basePath}`}
                                className="text-lg font-light text-gray-600 hover:text-black transition-colors duration-300"
                            >
                                ← Back to all posts
                            </Link>
                        </div>
                    </footer>
                </article>
            </div>
        </>
    );
}
