import { ChildProps } from '@/types'
import Footer from './_components/footer'
import Navbar from './_components/navbar'

function Layout({ children }: ChildProps) {
	return (
		// O'ZGARISH 1: min-h-screen va flex qo'shildi
		<div className='flex min-h-screen flex-col'>
			<Navbar />

			{/* O'ZGARISH 2: flex-1 qo'shildi. Bu kontentni cho'zib, footerni pastga itaradi */}
			<main className='container mx-auto flex-1'>{children}</main>

			<Footer />
		</div>
	)
}

export default Layout
