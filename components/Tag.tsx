import Link from 'next/link';
import { slug } from 'github-slugger';

interface Props {
    text: string;
}

const Tag = ({ text }: Props) => {
    return (
        <Link
            href={`/tags/${slug(text)}`}
            className="text-sm font-mono text-gray-500 hover:text-black transition-colors duration-300 text-nowrap"
        >
            {text.split(' ').join('-')}
        </Link>
    );
};

export default Tag;
