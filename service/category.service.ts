import { IBlog, ICategoryAndTags } from '@/types'
// 1. GraphQLClient ni import qiling
import { GraphQLClient, gql } from 'graphql-request'
import { cache } from 'react'

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT!
const hygraphToken = process.env.HYGRAPH_ASSET_TOKEN // Tokenni o'qiymiz
const client = new GraphQLClient(graphqlAPI, {
	headers: {
		Authorization: `Bearer ${hygraphToken}`,
	},
})

export const getCategories = async () => {
	const query = gql`
		query MyQuery {
			categories {
				name
				slug
				blogs {
					id
				}
			}
		}
	`
	// Send the query
	const { categories } = await client.request<{
		categories: ICategoryAndTags[]
	}>(query)
	return categories
}

export const getBlogsByCategory = cache(async (slug: string) => {
	const query = gql`
		query MyQuery($slug: String!) {
			category(where: { slug: $slug }) {
				blogs {
					author {
						name
						image {
							url
						}
						bio
					}

					createdAt
					content {
						html
					}
					image {
						url
					}
					slug
					tag {
						name
						slug
					}
					category {
						name
						slug
					}
					title
					description
				}
				name
			}
		}
	`

	// Send the query
	const { category } = await client.request<{
		category: { blogs: IBlog[]; name: string }
	}>(query, {
		slug,
	})
	return category
})
