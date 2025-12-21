import { ThemeProvider } from '@/components/providers/theme-provider'
import { Toaster } from '@/components/ui/sonner'
import { ChildProps } from '@/types'
import type { Metadata } from 'next'
import { Crete_Round, Work_Sans } from 'next/font/google'
import NextTopLoader from 'nextjs-toploader'
import './globals.css'

const createRound = Crete_Round({
	weight: ['400'],
	subsets: ['latin'],
	variable: '--font-createRound',
})
const workSans = Work_Sans({
	weight: ['500', '600'],
	subsets: ['latin'],
	variable: '--font-workSans',
})

export const metadata: Metadata = {
	metadataBase: new URL('https://userabdullo.link'),
	title: 'UBlog',
	description:
		'Programming news, tips, and the latest programming news. You can find a guide to learning and developing programming on our blog. Also you can find interesting memes about IT world',
	authors: [{ name: 'Abdulloh Tursunov', url: 'https://userabdullo.link/' }],
	icons: { icon: '/blog-icon.png' },
	keywords:
		'Funny memes, Programmer humor, Coding memes, Developer struggles, Sysadmin memes, Debugging jokes, Production failure memes, Junior vs Senior developer, Tech interview memes, Imposter syndrome in tech, Code review roast, Tech layoffs news, Silicon Valley drama, Startup culture, Remote work trends, AI replacing programmers, ChatGPT coding fails, Copilot memes, LLM news',
	openGraph: {
		title: 'Sammi dasturlashga oid maqolalar',
		description:
			'Programming news, tips, and the latest programming news. You can find a guide to learning and developing programming on our blog. Also you can find interesting memes about IT world',
		type: 'website',
		url: 'https://userabdullo.link/',
		locale: 'en_EN',
		images:
			'https://static.vecteezy.com/system/resources/thumbnails/069/469/030/small/blogger-black-circle-outline-logo-on-transparent-background-free-png.png',
		countryName: 'Uzbekistan',
		siteName: 'UBlog',
		emails: 'info@sammi.ac',
	},
}

function RootLayout({ children }: ChildProps) {
	return (
		<html lang='en' suppressHydrationWarning>
			<body
				className={`${createRound.variable} ${workSans.variable} overflow-x-hidden`}>
				<ThemeProvider
					attribute='class'
					defaultTheme='system'
					enableSystem
					disableTransitionOnChange>
					<NextTopLoader />
					{children}
					<Toaster position='top-center' />
				</ThemeProvider>
			</body>
		</html>
	)
}

export default RootLayout

