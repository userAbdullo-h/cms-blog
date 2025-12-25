// 'use client'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetTrigger,
} from '@/components/ui/sheet'
import { navLinks } from '@/constants'
import { cn } from '@/lib/utils'
import { Menu } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

function Mobile() {
	const pathname = usePathname()
	return (
		<Sheet>
			<SheetTrigger asChild className='flex md:hidden'>
				<Button variant='outline'>
					<Menu />
				</Button>
			</SheetTrigger>
			<SheetContent side={'left'}>
				<Link href={'/'}>
					<h1 className='text-4xl font-createRound'>UBlog</h1>
				</Link>
				<Separator className='my-3' />
				<div className='flex flex-col space-y-3'>
					{navLinks.map(nav => (
						<Link
							key={nav.route}
							href={nav.route}
							className={cn(
								'hover:bg-blue-400/20 py-1 px-3 cursor-pointer rounded-sm transition-colors',
								pathname === nav.route && 'text-blue-400 bg-blue-400/20'
							)}>
							<SheetClose>{nav.name}</SheetClose>
						</Link>
					))}
				</div>
			</SheetContent>
		</Sheet>
	)
}

export default Mobile
