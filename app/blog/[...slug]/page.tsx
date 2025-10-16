import { allCoreContent, sortPosts, coreContent } from '@/lib/contentlayer';
import { allBlogs, allAuthors } from 'contentlayer/generated';
import type { Authors, Blog } from 'contentlayer/generated';
import PostLayout from '@/layouts/PostLayout';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import MDXContent from '@/components/MDXContent';

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string[] }>;
}): Promise<Metadata | undefined> {
    const { slug } = await params;
    const slugStr = decodeURI(slug.join('/'));
    const post = allBlogs.find((p) => p.slug === slugStr);

    if (!post) {
        return;
    }

    return {
        title: post.title,
        description: post.summary,
    };
}

export const generateStaticParams = async () => {
    return allBlogs.map((p) => ({ slug: p.slug.split('/').map((name) => decodeURI(name)) }));
};

export default async function Page({ params }: { params: Promise<{ slug: string[] }> }) {
    const { slug } = await params;
    const slugStr = decodeURI(slug.join('/'));

    const sortedCoreContents = allCoreContent(sortPosts(allBlogs));
    const postIndex = sortedCoreContents.findIndex((p) => p.slug === slugStr);

    if (postIndex === -1) {
        return notFound();
    }

    const prev = sortedCoreContents[postIndex + 1];
    const next = sortedCoreContents[postIndex - 1];
    const post = allBlogs.find((p) => p.slug === slugStr) as Blog;
    const authorList = post?.authors || ['default'];
    const authorDetails = authorList.map((author) => {
        const authorResults = allAuthors.find((p) => p.slug === author);
        return coreContent(authorResults as Authors);
    });
    const mainContent = coreContent(post);

    return (
        <PostLayout
            post={post}
            content={mainContent}
            authorDetails={authorDetails}
            next={next}
            prev={prev}
        >
            <MDXContent code={post.body.code} />
        </PostLayout>
    );
}
