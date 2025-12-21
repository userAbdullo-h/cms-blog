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

export const getTags = async () => {
	const query = gql`
		query MyQuery {
			tags {
				name
				slug
				blogs {
					... on Blog {
						id
					}
				}
			}
		}
	`
	// Send the query
	const { tags } = await client.request<{ tags: ICategoryAndTags[] }>(query)
	return tags
}

export const getBlogsByTag = cache(async (slug: string) => {
	const query = gql`
		query MyQuery($slug: String!) {
			tag(where: { slug: $slug }) {
				blogs {
					... on Blog {
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
				}
				name
			}
		}
	`

	// Send the query
	const { tag } = await client.request<{
		tag: { blogs: IBlog[]; name: string }
	}>(query, { slug })
	return tag
})
