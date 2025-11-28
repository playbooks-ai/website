'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { slug } from 'github-slugger';

interface Props {
    text: string;
    useRouter?: boolean;
}

const Tag = ({ text, useRouter: useRouterNav = false }: Props) => {
    const router = useRouter();
    const content = text.split(' ').join('-');
    const href = `/tags/${slug(text)}`;
    const className = "text-sm font-mono text-gray-500 hover:text-black transition-colors duration-300 text-nowrap cursor-pointer";
    
    if (useRouterNav) {
        return (
            <span
                className={className}
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    router.push(href);
                }}
            >
                {content}
            </span>
        );
    }
    
    return (
        <Link href={href} className={className}>
            {content}
        </Link>
    );
};

export default Tag;
