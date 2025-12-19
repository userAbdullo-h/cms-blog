'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerTrigger,
} from '@/components/ui/drawer'
import { Input } from '@/components/ui/input'
import { categories, tags } from '@/constants'
import { Minus, Search } from 'lucide-react'
import Link from 'next/link'

function GlobalSearch() {
	// const tags = await getTags()
	// const categories = await getCategories()

	// console.log(`Tags: ${tags} \n Categories: ${categories}`)

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
						/>

						<div className='flex flex-col space-y-2 mt-6'>
							<div className='flex items-center gap-2'>
								<p className='font-createRound text-2xl'>
									See posts by categories
								</p>
								<Minus />
								<Link
									href={'/category'}
									className='text-blue-500 underline hover:opacity-65'>
									<DrawerClose>See all</DrawerClose>
								</Link>
							</div>
							<div className='flex flex-wrap gap-2'>
								{categories.map(category => (
									<Badge key={category.slug} variant={'secondary'}>
										{category.name}
									</Badge>
								))}
							</div>
						</div>
						<div className='flex flex-col  space-y-2 mt-6'>
							<div className='flex items-center gap-2'>
								<p className='font-createRound text-2xl'>See posts by tags</p>
								<Minus />
								<Link
									href={'/tags'}
									className='text-blue-500 underline hover:opacity-65'>
									<DrawerClose>See all</DrawerClose>
								</Link>
							</div>
							<div className='flex flex-wrap gap-2'>
								{tags.map(tag => (
									<Badge key={tag.slug} variant={'secondary'}>
										{tag.name}
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
