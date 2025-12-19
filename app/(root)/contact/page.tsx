import ContactForm from '@/components/forms/contact'
import { Dot, Home, Mail, Phone } from 'lucide-react'
import Link from 'next/link'

function ContantPage() {
	return (
		<div className='max-w-6xl mx-auto'>
			<div className='relative min-h-[40vh] flex items-center justify-center flex-col'>
				<h2 className='text-center text-4xl section-title font-createRound'>
					<span>Contact</span>
				</h2>

				<div className='flex gap-1 items-center mt-4'>
					<Home className='w-4 h-4' />
					<Link
						href={'/'}
						className='opacity-90 hover:underline hover:opacity-70 transition-colors'>
						Home
					</Link>
					<Dot />
					<p className='text-muted-foreground'>Contact</p>
				</div>
			</div>
			<div className='grid grid-cols-2 max-md:grid-cols-1 gap-4 mt-6'>
				<div className='flex flex-col'>
					<h1 className='text-4xl font-createRound'>Contact with userA</h1>
					<p className='mt-2 text-muted-foreground'>
						I am here to help and answer any question you might have. I look
						forward to hearing from
					</p>

					<div className='mt-12 flex items-center gap-3'>
						<Mail className='w-4 h-4' />
						<p className='text-sm'>user@email.com</p>
					</div>
					<div className='mt-2 flex items-center gap-3'>
						<Phone className='w-4 h-4' />
						<p className='text-sm'>+998 00 000 00 00</p>
					</div>
				</div>
				<div>
					<h1 className='text-4xl font-createRound mb-2'>Contact form</h1>
					<ContactForm />
				</div>
			</div>
		</div>
	)
}

export default ContantPage
