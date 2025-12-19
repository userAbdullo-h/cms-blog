export interface ChildProps {
	children: React.ReactNode
}

export interface IBlog {
	title: string
	createdAt: string
	description: string
	author: IAuthor
	category: ICategoryAndTags
	tag: ICategoryAndTags
	image: { url: string }
	content: { html: string }
	slug: string
}

export interface IAuthor {
	name: string
	bio?: string
	image: { url: string }
	blogs: IBlog[]
	id: string

	// descr: string
}

export interface ICategoryAndTags {
	name: string
	slug: string
}
