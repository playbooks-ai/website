import Link from 'next/link';
import { Authors, allAuthors } from 'contentlayer/generated';

interface Props {
    author: Authors | string;
}

const Author = ({ author }: Props) => {
    // If author is a string, look it up
    const authorData =
        typeof author === 'string' ? allAuthors.find((a) => a.slug === author) : author;

    if (!authorData) {
        return null;
    }

    return (
        <Link
            href={`/authors/${authorData.slug}`}
            className="text-sm font-mono text-gray-500 hover:text-black transition-colors duration-300 text-nowrap"
        >
            {authorData.name}
        </Link>
    );
};

export default Author;
