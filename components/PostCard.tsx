import Link from 'next/link';
import PostMetadata from './PostMetadata';
import ShadowBox from './ShadowBox';

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
        <article className="group max-w-3xl">
            <Link href={`/${path}`} className="block">
                <ShadowBox>
                    <div className="space-y-4">
                        <PostMetadata
                            date={date}
                            readingTime={readingTime}
                            tags={tags}
                            className="mb-8"
                            tagsUseRouter={true}
                        />
                        <div>
                            <h2 className="text-3xl md:text-3xl font-bold tracking-tighter leading-none text-gray-900 group-hover:text-gray-600 transition-colors duration-300">
                                {title}
                            </h2>
                        </div>
                        <div className="prose">
                            {summary && <p className="text-xl text-gray-600">{summary}</p>}
                        </div>
                    </div>
                </ShadowBox>
            </Link>
        </article>
    );
}
