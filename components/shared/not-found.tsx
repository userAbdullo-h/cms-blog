import { Button } from '@/components/ui/button'
import { SearchX } from 'lucide-react'
import Link from 'next/link'

interface Props {
	title?: string
	description?: string
	linkText?: string
	href?: string
}

const NoResults = ({
	title = 'No data found',
	description = 'The blog or article you are looking for does not exist. Please try changing the keyword.',
	linkText = 'Go to main page',
	href = '/',
}: Props) => {
	return (
		<div className='flex flex-col items-center justify-center py-12 text-center space-y-4'>
			{/* Icon qismi */}
			<div className='bg-secondary p-4 rounded-full animate-in zoom-in-50 duration-500'>
				<SearchX className='w-10 h-10 text-muted-foreground' />
			</div>

			{/* Matn qismi */}
			<div className='space-y-1'>
				<h3 className='text-2xl font-bold font-createRound'>{title}</h3>
				<p className='text-muted-foreground text-sm max-w-xs mx-auto'>
					{description}
				</p>
			</div>

			{/* Tugma qismi (agar href berilsa chiqadi) */}
			{href && (
				<Button asChild variant={'outline'} className='mt-2'>
					<Link href={href}>{linkText}</Link>
				</Button>
			)}
		</div>
	)
}

export default NoResults
