import Link from 'next/link';

interface TopNavProps {
    currentPage: 'home' | 'blog';
}

export default function TopNav({ currentPage }: TopNavProps) {
    return (
        <div className="fixed top-0 right-0 z-50 bg-white px-8 py-2 w-full">
            <nav className="flex justify-end items-center space-x-8 font-light">
                {currentPage === 'home' ? (
                    <span className="text-black font-medium">Home</span>
                ) : (
                    <Link
                        href="/"
                        className="text-gray-500 hover:text-black transition-colors duration-200"
                    >
                        Home
                    </Link>
                )}
                {currentPage === 'blog' ? (
                    <Link
                        href="/blog"
                        className="text-black font-medium hover:text-gray-600 transition-colors duration-200"
                    >
                        Blog
                    </Link>
                ) : (
                    <Link
                        href="/blog"
                        className="text-gray-500 font-light hover:text-black transition-colors duration-200"
                    >
                        Blog
                    </Link>
                )}
            </nav>
        </div>
    );
}
