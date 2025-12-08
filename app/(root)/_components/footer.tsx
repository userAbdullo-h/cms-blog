'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { User2 } from 'lucide-react'
import { useState } from 'react'

function Footer() {
	const [active, setActive] = useState(false)
	return (
		<footer className='flex py-24 mx-auto flex-col container max-w-2xl space-y-12 '>
			<h1 className='text-5xl max-md:text-4xl font-createRound text-center'>
				Get latest posts delivered right to your inbox
			</h1>
			<div className='grid max-md:grid-cols-1 grid-cols-3 md:gap-4 w-full'>
				<Input
					className='w-full col-span-2 max-md:w-2/3 mx-auto'
					placeholder='Your email address...'
					onFocus={() => setActive(true)}
					onBlur={() => setActive(false)}
				/>
				<Button
					size={'lg'}
					variant={active ? 'default' : 'outline'}
					className='max-md:mt-3 max-md:w-2/3 mx-auto'>
					<User2 />
					<span>Join today</span>
				</Button>
			</div>
		</footer>
	)
}

export default Footer
