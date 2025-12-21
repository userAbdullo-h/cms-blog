import { ICategoryAndTags } from '@/types'
import { Layers2, Tags } from 'lucide-react'
import Link from 'next/link'

interface Props extends ICategoryAndTags {
	type: 'tags' | 'category'
}

function CategoriesTagsCard(item: Props) {
	return (
		<Link
			className='bg-secondary p-4  rounded-md shadow-xl flex flex-col items-center gap-2 justify-center hover:bg-secondary/80 transition-colors dark:shadow-white/5'
			href={`/${item.type}/${item.slug}`}>
			{item.type === 'tags' ? <Tags /> : <Layers2 />}
			<h1 className='text-xl font-createRound'>{item.name}</h1>
			<p className=''>{item.blogs.length} blogs</p>
		</Link>
	)
}

export default CategoriesTagsCard
