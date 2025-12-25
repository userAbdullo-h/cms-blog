'use client'

import { Button } from '@/components/ui/button'
import { Facebook, Link2, Linkedin, Send, Twitter } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { toast } from 'sonner'

function ShareBtns() {
	const pathname = usePathname()
	// Asosiy URLni olish. Agar env yo'q bo'lsa, xatolik bermasligi uchun bo'sh qator qo'shdik
	const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || ''
	const shareLink = `${baseUrl}${pathname}`

	// 1. Ijtimoiy tarmoqlarga ulashish funksiyasi
	const onShare = (platform: string) => {
		// Linkni to'g'ri formatlash (maxsus belgilarni kodlash)
		const encodedLink = encodeURIComponent(shareLink)
		let url = ''

		switch (platform) {
			case 'twitter':
				url = `https://twitter.com/intent/tweet?url=${encodedLink}`
				break
			case 'facebook':
				url = `https://www.facebook.com/sharer/sharer.php?u=${encodedLink}`
				break
			case 'linkedin':
				url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedLink}`
				break
			case 'telegram': // 'Send' iconi uchun Telegram ishlatamiz
				url = `https://t.me/share/url?url=${encodedLink}`
				break
			default:
				return
		}

		// Yangi oynada ochish
		window.open(url, '_blank', 'noopener,noreferrer')
	}

	// 2. Nusxalash funksiyasi (faqat Link tugmasi uchun)
	const onCopy = () => {
		navigator.clipboard
			.writeText(shareLink)
			.then(() => toast.success('Link nusxalandi!'))
			.catch(() => toast.error("Nusxalashda xatolik bo'ldi"))
	}

	return (
		<div className='flex flex-col max-md:flex-row md:space-y-3 max-md:space-x-3 mt-4'>
			{/* Twitter */}
			<Button
				size={'icon'}
				variant={'outline'}
				onClick={() => onShare('twitter')}>
				<Twitter />
			</Button>

			{/* Facebook */}
			<Button
				size={'icon'}
				variant={'outline'}
				onClick={() => onShare('facebook')}>
				<Facebook />
			</Button>

			{/* Linkedin */}
			<Button
				size={'icon'}
				variant={'outline'}
				onClick={() => onShare('linkedin')}>
				<Linkedin />
			</Button>

			{/* Telegram (Send icon) */}
			<Button
				size={'icon'}
				variant={'outline'}
				onClick={() => onShare('telegram')}>
				<Send />
			</Button>

			{/* Copy Link - bu eski onCopy funksiyasini ishlatadi */}
			<Button size={'icon'} variant={'outline'} onClick={onCopy}>
				<Link2 />
			</Button>
		</div>
	)
}

export default ShareBtns
