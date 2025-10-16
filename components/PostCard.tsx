import Link from 'next/link';
import PostMetadata from './PostMetadata';

interface PostCardProps {
    title: string;
    summary?: string;
    date: string;
    tags?: string[];
    path: string;
    readingTime?: any;
}

export default function PostCard({ title, summary, date, tags, path, readingTime }: PostCardProps) {
    return (
        <article className="group max-w-3xl bg-white rounded-3xl p-16 py-6 shadow-xl border border-gray-100">
            <div className="space-y-4">
                <PostMetadata date={date} readingTime={readingTime} tags={tags} className="mb-8" />
                <div>
                    <h2 className="text-3xl md:text-3xl font-bold tracking-tighter leading-none">
                        <Link
                            href={`/${path}`}
                            className="text-gray-900 hover:text-gray-600 transition-colors duration-300"
                        >
                            {title}
                        </Link>
                    </h2>
                </div>
                <div className="prose">
                    {summary && <p className="text-xl text-gray-600">{summary}</p>}
                </div>
            </div>
        </article>
    );
}
