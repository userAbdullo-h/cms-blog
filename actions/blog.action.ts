// actions/blog.action.ts
'use server' // <-- BU JUDA MUHIM! Bu kod faqat serverda ishlaydi

import { getSearchBlog } from '@/service/blog.service'

export async function searchBlogsAction(query: string) {
	// Bu yerda process.env bemalol ishlaydi
	try {
		const data = await getSearchBlog(query)
		return { success: true, data }
	} catch (error) {
		console.log(error)
		return { success: false, error: 'Search failed' }
	}
}
