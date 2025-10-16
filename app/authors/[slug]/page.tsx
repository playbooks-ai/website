import { allCoreContent, sortPosts } from '@/lib/contentlayer';
import { allBlogs, allAuthors } from 'contentlayer/generated';
import type { Authors } from 'contentlayer/generated';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import BlogHeader from '@/components/BlogHeader';
import PostCard from '@/components/PostCard';
import Image from 'next/image';
import Link from 'next/link';
import { Github, Linkedin, Mail } from 'lucide-react';
import { useMDXComponent } from 'next-contentlayer2/hooks';

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata | undefined> {
    const { slug } = await params;
    const author = allAuthors.find((a) => a.slug === slug);

    if (!author) {
        return;
    }

    return {
        title: `${author.name} - Playbooks AI`,
        description: author.occupation || `Author profile for ${author.name}`,
    };
}

export const generateStaticParams = async () => {
    return allAuthors.map((author) => ({
        slug: author.slug,
    }));
};

function AuthorContent({ code }: { code: string }) {
    const Component = useMDXComponent(code);
    return <Component />;
}

export default async function AuthorPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const author = allAuthors.find((a) => a.slug === slug);

    if (!author) {
        return notFound();
    }

    // Get all posts by this author
    const authorPosts = allCoreContent(
        sortPosts(allBlogs.filter((post) => post.authors?.includes(slug))),
    );

    return (
        <>
            <BlogHeader />
            <div className="max-w-5xl mx-auto px-8 py-20">
                {/* Author Profile */}
                <div className="mb-16">
                    <div className="flex flex-col md:flex-row gap-8 items-start">
                        {/* Avatar */}
                        {author.avatar && (
                            <div className="flex-shrink-0">
                                <Image
                                    src={author.avatar}
                                    alt={author.name}
                                    width={120}
                                    height={120}
                                    className="rounded-full"
                                />
                            </div>
                        )}

                        {/* Info */}
                        <div className="flex-1 space-y-4">
                            <div>
                                <h1 className="text-4xl md:text-5xl font-light tracking-tight mb-2">
                                    {author.name}
                                </h1>
                                {author.occupation && (
                                    <p className="text-xl text-gray-600">{author.occupation}</p>
                                )}
                                {author.company && (
                                    <p className="text-lg text-gray-500">{author.company}</p>
                                )}
                            </div>

                            {/* Bio */}
                            <div className="text-gray-600 leading-relaxed">
                                <AuthorContent code={author.body.code} />
                            </div>

                            {/* Social Links */}
                            <div className="flex gap-4 pt-2">
                                {author.email && (
                                    <a
                                        href={`mailto:${author.email}`}
                                        className="text-gray-600 hover:text-black transition-colors duration-300"
                                        aria-label="Email"
                                    >
                                        <Mail className="w-5 h-5" />
                                    </a>
                                )}
                                {author.github && (
                                    <a
                                        href={author.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-gray-600 hover:text-black transition-colors duration-300"
                                        aria-label="GitHub"
                                    >
                                        <Github className="w-5 h-5" />
                                    </a>
                                )}
                                {author.linkedin && (
                                    <a
                                        href={author.linkedin}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-gray-600 hover:text-black transition-colors duration-300"
                                        aria-label="LinkedIn"
                                    >
                                        <Linkedin className="w-5 h-5" />
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Author's Posts */}
                <div>
                    <h2 className="text-3xl font-light tracking-tight mb-8">
                        Posts by {author.name} ({authorPosts.length})
                    </h2>
                    {authorPosts.length > 0 ? (
                        <div className="space-y-12">
                            {authorPosts.map((post) => (
                                <PostCard
                                    key={post.path}
                                    title={post.title}
                                    summary={post.summary}
                                    date={post.date}
                                    tags={post.tags}
                                    path={post.path}
                                    readingTime={post.readingTime}
                                />
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500">No posts yet.</p>
                    )}
                </div>

                {/* Back Link */}
                <div className="mt-12 pt-8 text-center">
                    <Link
                        href="/blog"
                        className="text-lg font-light text-gray-600 hover:text-black transition-colors duration-300"
                    >
                        ← Back to all posts
                    </Link>
                </div>
            </div>
        </>
    );
}
