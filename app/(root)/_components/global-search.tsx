import { Badge } from '@/components/ui/badge'
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer'
import { Input } from '@/components/ui/input'
import { popularCategoties, popularTags } from '@/constants'
import { Search } from 'lucide-react'

function GlobalSearch() {
	return (
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
		<Drawer>
			<form>
				<DrawerTrigger asChild>
					<div className='hover:bg-blue-400/20  px-3 cursor-pointer rounded-sm transition-colors flex items-center gap-1 py-2 '>
						<span className='hidden md:flex'>Search</span>
						<Search />
					</div>
				</DrawerTrigger>
				<DrawerContent>
					<div className='container max-w-6xl mx-auto py-12'>
						<Input
							className='bg-secondary'
							placeholder='Type to search blog...'
						/>

						<div className='flex flex-col space-y-2 mt-6'>
							<p className='font-createRound text-2xl'>
								See posts by categories
							</p>
							<div className='flex flex-wrap gap-2'>
								{popularCategoties.map(item => (
									<Badge key={item.slug} variant={'secondary'}>
										{item.name}
									</Badge>
								))}
							</div>
						</div>
						<div className='flex flex-col  space-y-2 mt-6'>
							<p className='font-createRound text-2xl'>See posts by tags</p>
							<div className='flex flex-wrap gap-2'>
								{popularTags.map(item => (
									<Badge key={item.slug} variant={'secondary'}>
										{item.name}
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
