'use client'

import { searchBlogsAction } from '@/actions/blog.action'
import { getSearchFiltersAction } from '@/actions/common.action'
import SearchCard from '@/components/cards/search'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerTrigger,
} from '@/components/ui/drawer'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { IBlog, ICategoryAndTags } from '@/types'
import { debounce } from 'lodash'
import { Loader2, Minus, Search } from 'lucide-react'
import Link from 'next/link'
import { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { toast } from 'sonner'

function GlobalSearch() {
	const [categories, setCategories] = useState<ICategoryAndTags[]>([])
	const [tags, setTags] = useState<ICategoryAndTags[]>([])
	const [isLoading, setIsLoading] = useState(false)
	const [blogs, setBlogs] = useState<IBlog[]>([])

	useEffect(() => {
		const fetchFilters = async () => {
			const res = await getSearchFiltersAction()
			if (res.success) {
				setCategories(res.categories)
				setTags(res.tags)
			}
		}
		fetchFilters()
	}, []) // [] bo'sh array - faqat bir marta ishlaydi

	const handleSearch = useCallback(async (e: ChangeEvent<HTMLInputElement>) => {
		const text = e.target.value.toLowerCase()

		if (text && text.length > 2) {
			setIsLoading(true)
			try {
				const res = await searchBlogsAction(text)
				if (res.success && res.data) {
					setBlogs(res.data)
				} else {
					setBlogs([])
					toast.error('Nothing found')
				}
			} catch (error) {
				console.error('Search error:', error)
				toast.error('Failed to search blogs')
				setBlogs([])
			} finally {
				setIsLoading(false)
			}
		} else {
			setBlogs([])
			setIsLoading(false)
		}
	}, [])
	const debounceSearch = debounce(handleSearch, 1000)

	return (
		<Drawer>
			<form>
				<DrawerTrigger asChild>
					<Button
						variant={'outline'}
						className='hover:bg-blue-400/20  px-3 cursor-pointer rounded-sm transition-colors flex items-center gap-1 py-2 '>
						<Search />
						<span className='hidden md:flex'>Search</span>
					</Button>
				</DrawerTrigger>
				<DrawerContent>
					<div className='container max-w-6xl mx-auto py-12'>
						<Input
							className='bg-secondary'
							placeholder='Type to search blog...'
							onChange={debounceSearch}
							disabled={isLoading}
						/>
						{isLoading && <Loader2 className='animate-spin mt-4 mx-auto' />}
						{blogs.length > 0 ? (
							<>
								<div className='text-2xl font-createRound mt-8'>
									{blogs.length} results found
								</div>
								<div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 mt-2 gap-4'>
									{blogs.map(blog => (
										<SearchCard key={blog.title} {...blog} />
									))}
								</div>
								<Separator className='mt-3' />
							</>
						) : null}
						<div className='flex flex-col space-y-2 mt-6'>
							<div className='flex items-center gap-2'>
								<p className='font-createRound text-2xl'>
									See posts by categories
								</p>
								<Minus />
								<DrawerClose asChild>
									<Link
										href={'/category'}
										className='text-blue-500 underline hover:opacity-65'>
										See all
									</Link>
								</DrawerClose>
							</div>
							<div className='flex flex-wrap gap-2'>
								{categories.map(category => (
									<Badge key={category.slug} variant={'secondary'}>
										<DrawerClose asChild>
											<Link href={`/category/${category.slug}`}>
												{category.name}
											</Link>
										</DrawerClose>
									</Badge>
								))}
							</div>
						</div>
						<div className='flex flex-col  space-y-2 mt-6'>
							<div className='flex items-center gap-2'>
								<p className='font-createRound text-2xl'>See posts by tags</p>
								<Minus />
								<DrawerClose asChild>
									<Link
										href={'/tags'}
										className='text-blue-500 underline hover:opacity-65'>
										See all
									</Link>
								</DrawerClose>
							</div>
							<div className='flex flex-wrap gap-2'>
								{tags.map(tag => (
									<Badge key={tag.slug} variant={'secondary'}>
										<DrawerClose asChild>
											<Link href={`/tags/${tag.slug}`}>{tag.name}</Link>
										</DrawerClose>
									</Badge>
								))}
							</div>
						</div>
					</div>
				</DrawerContent>
			</form>
		</Drawer>
	)
}

export default GlobalSearch

// <Dialog>
// 	<form>
// 		<DialogTrigger asChild>
// 			<div className='hover:bg-blue-400/20  px-3 cursor-pointer rounded-sm transition-colors flex items-center gap-1 py-2 '>
// 				<span className='hidden md:flex'>Search</span>
// 				<Search />
// 			</div>
// 		</DialogTrigger>
// 		<DialogContent className='sm:max-w-[425px] border-md '>
// 			<DialogHeader>
// 				<DialogTitle className='font-createRound font-normal text-2xl'>
// 					Search posts
// 				</DialogTitle>
// 			</DialogHeader>
// 			<div className='container max-w-6xl mx-auto'>
// 				<Input
// 					name='name'
// 					className='bg-secondary'
// 					placeholder='Type to search blog...'
// 				/>
// 			</div>
// 			<div className='flex flex-col gap-2'>
// 				<p className='font-createRound text-xl'>See posts by categories</p>
// 				<div className='flex flex-wrap gap-2'>
// 					{popularCategoties.map(item => (
// 						<Badge key={item.slug} variant={'secondary'}>
// 							{item.name}
// 						</Badge>
// 					))}
// 				</div>
// 			</div>
// 			<div className='flex flex-col gap-2'>
// 				<p className='font-createRound text-xl'>See posts by tags</p>
// 				<div className='flex flex-wrap gap-2'>
// 					{popularTags.map(item => (
// 						<Badge key={item.slug} variant={'secondary'}>
// 							{item.name}
// 						</Badge>
// 					))}
// 				</div>
// 			</div>
// 		</DialogContent>
// 	</form>
// </Dialog>
