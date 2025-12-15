import { ChildProps } from '@/types'
import Footer from './_components/footer'
import Navbar from './_components/navbar'

function Layout({ children }: ChildProps) {
	return (
		<div>
			<Navbar />
			<div className='container mx-auto'>{children}</div>
			<Footer />
		</div>
	)
}

export default Layout
