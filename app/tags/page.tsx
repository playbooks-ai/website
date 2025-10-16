import Link from 'next/link'
import { slug } from 'github-slugger'
import BlogHeader from '@/components/BlogHeader'
import tagData from '@/app/tag-data.json'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tags - Playbooks AI Blog',
  description: 'Browse blog posts by topic',
}

export default function TagsPage() {
  const tagCounts = tagData as Record<string, number>
  const tagKeys = Object.keys(tagCounts)
  const sortedTags = tagKeys.sort((a, b) => tagCounts[b] - tagCounts[a])

  return (
    <>
      <BlogHeader />
      <div className="max-w-5xl mx-auto px-8 py-20">
        <div className="mb-16 text-center">
          <h1 className="text-5xl md:text-5xl font-light tracking-tighter leading-none mb-6">Topics</h1>
          <p className="text-xl text-gray-600">Browse blog posts by topic</p>
        </div>
        <div className="flex flex-wrap gap-6 justify-center">
          {sortedTags.map((t) => (
            <Link
              key={t}
              href={`/tags/${slug(t)}`}
              className="px-6 py-3 bg-white border border-gray-200 hover:border-black text-gray-900 rounded-full transition-all duration-300 hover:shadow-lg"
            >
              <span className="font-mono text-sm">{t}</span>
              <span className="ml-2 text-gray-500">({tagCounts[t]})</span>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}

