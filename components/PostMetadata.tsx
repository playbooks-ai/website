import { formatDate } from '@/lib/contentlayer';
import Tag from './Tag';
import Author from './Author';

interface PostMetadataProps {
    date: string;
    readingTime?: any;
    tags?: string[];
    className?: string;
    authors?: string[];
    tagsUseRouter?: boolean;
}

export default function PostMetadata({
    date,
    readingTime,
    tags,
    className = '',
    authors,
    tagsUseRouter = false,
}: PostMetadataProps) {
    let components = [];
    if (date) {
        components.push(
            <time key="date" dateTime={date}>
                {formatDate(date)}
            </time>,
        );
    }
    if (readingTime) {
        components.push(
            <span key="readingTimeSeparator" className="mx-2">
                •
            </span>,
        );
        components.push(<span key="readingTime">{readingTime.text}</span>);
    }
    if (authors && authors.length > 0) {
        components.push(
            <span key="authorsSeparator" className="mx-2">
                •
            </span>,
        );
        authors.map((author) => {
            components.push(
                <span key={author}>
                    <Author author={author} />
                </span>,
            );
        });
    }
    if (tags && tags.length > 0) {
        components.push(
            <span key="tagsSeparator" className="mx-2">
                •
            </span>,
        );
        tags.map((tag) => {
            components.push(
                <span className="pr-2 inline-block" key={tag}>
                    <Tag text={tag} useRouter={tagsUseRouter} />
                </span>,
            );
        });
    }
    return <div className={`text-sm font-mono text-gray-500 ${className}`}>{components}</div>;
}
