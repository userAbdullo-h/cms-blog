import BlogCard from '@/components/cards/blog'
import BgArrow from '@/components/shared/bg-arrow'
import NotFound from '@/components/shared/not-found'
import { getLastBlogs } from '@/service/blog.service'

async function HomePage() {
	const blogs = await getLastBlogs()

	return (
		<div className='max-w-6xl mx-auto'>
			<div className='relative min-h-[60vh] flex place-items-center justify-center'>
				<h1 className='text-3xl md:text-4xl lg:text-5xl text-center font-createRound  max-w-2xl'>
					Taking control of your daily life is easy when you know how!
				</h1>
				<BgArrow />
			</div>
			<h2 className='text-center text-4xl section-title font-createRound'>
				<span>See posts</span>
			</h2>

			<div className='flex flex-col space-y-24 mt-24'>
				{blogs.length ? (
					blogs.map(blog => <BlogCard key={blog.title} {...blog} />)
				) : (
					<div className=''>
						<NotFound description='No posts published belongs to this category' />
					</div>
				)}
			</div>
		</div>
	)
}

export default HomePage
