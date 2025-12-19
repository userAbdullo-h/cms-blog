import BlogCard from '@/components/cards/blog'
import { getBlogsByTag } from '@/service/tag.service'
import { Dot, Home } from 'lucide-react'
import Link from 'next/link'

async function TagsPage({ params }: { params: { slug: string } }) {
	const tag = await getBlogsByTag(params.slug)

	return (
		<div className='max-w-6xl mx-auto'>
			<div className='relative min-h-[40vh] flex items-center justify-center flex-col'>
				<h2 className='text-center text-4xl section-title font-createRound'>
					<span>{tag.name}</span>
				</h2>

				<div className='flex gap-1 items-center mt-4'>
					<Home className='w-4 h-4' />
					<Link
						href={'/'}
						className='opacity-90 hover:underline hover:opacity-70 transition-colors'>
						Home
					</Link>
					<Dot />
					<p className='text-muted-foreground'>Tags</p>
					<Dot />
					<p className='text-muted-foreground'>{tag.name}</p>
				</div>
			</div>
			<div className='grid grid-cols-2 max-md:grid-cols-1 gap-x-4 gap-y-24 mt-24'>
				{tag.blogs.map(blog => (
					<BlogCard key={blog.title} {...blog} isVertical />
				))}
			</div>
		</div>
	)
}

export default TagsPage
