# Blog System Documentation

## Overview

This website now includes a complete blog system built with Contentlayer and Next.js, featuring:

- MDX-based blog posts with frontmatter
- Tag-based categorization and filtering
- Reading time calculation
- Author profiles
- Pagination support
- Static site generation for optimal performance

## Directory Structure

```
/data
  /blog/              # Blog posts as .mdx files
  /authors/           # Author profiles as .mdx
  siteMetadata.ts     # Blog configuration

/app
  /blog/
    page.tsx          # Main blog listing
    /[...slug]/
      page.tsx        # Individual blog post pages
  /tags/
    page.tsx          # All tags page
    /[tag]/
      page.tsx        # Tag-filtered blog listing
  tag-data.json       # Auto-generated tag counts

/components
  BlogHeader.tsx      # Navigation for blog pages
  Tag.tsx             # Tag component
  PostCard.tsx        # Blog post preview card
  MDXContent.tsx      # MDX content renderer

/layouts
  PostLayout.tsx              # Layout for individual blog posts
  ListLayoutWithTags.tsx      # Layout for blog listing with tag sidebar

/lib
  contentlayer.ts     # Utility functions for posts
```

## Navigation Behavior

### Landing Page (/)
- Top navigation with: **Home** (not linked) | **Blog** (linked to /blog)

### Blog Pages (/blog, /tags/*, /blog/*)
- Top navigation with: **Home** (linked to /) | **Blog** (not linked)

## Creating a New Blog Post

1. Create a new `.mdx` file in `/data/blog/`

2. Add frontmatter:

```mdx
---
title: Your Post Title
date: '2025-01-30'
tags: ['tag1', 'tag2']
draft: false
summary: A brief summary of your post
authors: ['default']
---

Your content here...
```

3. Write your content using Markdown/MDX

4. Build the site: `npm run build`

The tag counts and routes will be automatically generated.

## Frontmatter Fields

- `title` (required): Post title
- `date` (required): Publication date in YYYY-MM-DD format
- `tags`: Array of tags
- `draft`: Boolean, set to true to hide post
- `summary`: Brief description for listings
- `authors`: Array of author slugs (default: ['default'])
- `images`: Array of image URLs for social sharing
- `lastmod`: Last modified date
- `layout`: Custom layout (defaults to PostLayout)

## Authors

Create author profiles in `/data/authors/`:

```mdx
---
name: Author Name
avatar: /images/avatar.png
occupation: Title
company: Company Name
email: author@email.com
linkedin: https://linkedin.com/in/username
github: https://github.com/username
---

Author bio...
```

## Styling

The blog follows the same visual design language as the home page:

- **Typography**: Light font weights (font-light), large headings (text-5xl to text-7xl)
- **Spacing**: Generous whitespace with consistent padding (py-20, space-y-6)
- **Colors**: Minimal black/white aesthetic with subtle gray variations
- **Transitions**: Smooth 300ms duration transitions on hover states
- **Fonts**: Font-mono for metadata/dates, standard sans for content
- **Blog Content**: Custom `.blog-content` class in `app/blog.css` for MDX content styling
- **Responsive**: Mobile-first design with md: breakpoints

## Configuration

Main configuration in `data/siteMetadata.ts`:

```typescript
const siteMetadata = {
  title: 'Blog Title',
  author: 'Author Name',
  description: 'Blog description',
  siteUrl: 'https://yoursite.com',
  // ... more settings
}
```

## Build Process

1. Contentlayer processes MDX files from `/data`
2. Generates TypeScript types in `.contentlayer/generated`
3. Creates tag count JSON during build
4. Next.js generates static pages for all posts and tags

## Technologies Used

- Next.js 15
- Contentlayer 2 - MDX processing
- Tailwind CSS - Styling
- TypeScript - Type safety
- Reading Time - Estimate reading time
- GitHub Slugger - URL-safe slugs
- Rehype/Remark - MDX transformation

