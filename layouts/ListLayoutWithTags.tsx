'use client'

import { usePathname } from 'next/navigation'
import { slug } from 'github-slugger'
import { CoreContent } from '@/lib/contentlayer'
import type { Blog } from 'contentlayer/generated'
import Link from 'next/link'
import PostCard from '@/components/PostCard'
import BlogHeader from '@/components/BlogHeader'
import tagData from '@/app/tag-data.json'

interface PaginationProps {
  totalPages: number
  currentPage: number
}

interface ListLayoutProps {
  posts: CoreContent<Blog>[]
  title: string
  initialDisplayPosts?: CoreContent<Blog>[]
  pagination?: PaginationProps
}

function Pagination({ totalPages, currentPage }: PaginationProps) {
  const pathname = usePathname()
  const basePath = pathname
    .replace(/^\//, '')
    .replace(/\/page\/\d+\/?$/, '')
    .replace(/\/$/, '')
  const prevPage = currentPage - 1 > 0
  const nextPage = currentPage + 1 <= totalPages

  return (
    <div className="pt-12 mt-12 border-t border-gray-200">
      <nav className="flex justify-between items-center">
        {prevPage ? (
          <Link
            href={currentPage - 1 === 1 ? `/${basePath}/` : `/${basePath}/page/${currentPage - 1}`}
            rel="prev"
            className="text-lg font-light text-gray-600 hover:text-black transition-colors duration-300"
          >
            ← Previous
          </Link>
        ) : (
          <div className="text-lg font-light text-gray-300">
            ← Previous
          </div>
        )}
        <span className="text-sm font-mono text-gray-500">
          {currentPage} of {totalPages}
        </span>
        {nextPage ? (
          <Link 
            href={`/${basePath}/page/${currentPage + 1}`} 
            rel="next"
            className="text-lg font-light text-gray-600 hover:text-black transition-colors duration-300"
          >
            Next →
          </Link>
        ) : (
          <div className="text-lg font-light text-gray-300">
            Next →
          </div>
        )}
      </nav>
    </div>
  )
}

export default function ListLayoutWithTags({
  posts,
  title,
  initialDisplayPosts = [],
  pagination,
}: ListLayoutProps) {
  const pathname = usePathname()
  const tagCounts = tagData as Record<string, number>
  const tagKeys = Object.keys(tagCounts)
  const sortedTags = tagKeys.sort((a, b) => tagCounts[b] - tagCounts[a])

  const displayPosts = initialDisplayPosts.length > 0 ? initialDisplayPosts : posts

  return (
    <>
      <BlogHeader />
      <div className="max-w-7xl mx-auto px-8 py-20">
        <div className="mb-16 text-center">
          <h1 className="text-5xl md:text-5xl font-light tracking-tighter leading-none">{title}</h1>
        </div>
        <div className="flex flex-col md:flex-row gap-16">
          {/* Tags Sidebar */}
          <div className="md:min-w-24 flex-shrink-0">
            <div className="sticky top-24 px-8">
              <div className="text-sm font-mono text-gray-500 mb-6">
                Topics
              </div>
              <div className="space-y-3">
                {pathname.startsWith('/blog') ? (
                  <div className="text-black font-medium">All Posts</div>
                ) : (
                  <Link
                    href="/blog"
                    className="text-gray-600 hover:text-black transition-colors duration-300 block"
                  >
                    All Posts
                  </Link>
                )}
                {sortedTags.map((t) => {
                  const isActive = decodeURI(pathname.split('/tags/')[1]) === slug(t)
                  return (
                    <div key={t}>
                      {isActive ? (
                        <div className="text-black font-medium">
                          {t} ({tagCounts[t]})
                        </div>
                      ) : (
                        <Link
                          href={`/tags/${slug(t)}`}
                          className="text-gray-600 hover:text-black transition-colors duration-300 block font-light"
                        >
                          {t} ({tagCounts[t]})
                        </Link>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Posts List */}
          <div className="flex-1">
            <div className="space-y-12 px-8">
              {displayPosts.map((post) => (
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
            {pagination && pagination.totalPages > 1 && (
              <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} />
            )}
          </div>
        </div>
      </div>
    </>
  )
}

