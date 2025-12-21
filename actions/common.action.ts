'use server'

import { getCategories } from '@/service/category.service'
import { getTags } from '@/service/tag.service'

export async function getSearchFiltersAction() {
	try {
		// Ikkalasini parallel (bir vaqtda) yuklaymiz, tezroq bo'ladi
		const [categories, tags] = await Promise.all([getCategories(), getTags()])

		return {
			success: true,
			categories,
			tags,
		}
	} catch (error) {
		console.error('Filterlarni yuklashda xatolik:', error)
		return {
			success: false,
			categories: [],
			tags: [],
		}
	}
}
