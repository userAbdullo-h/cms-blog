import { IAuthor } from '@/types'
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

export const getAuthors = async () => {
	const query = gql`
		query MyQuery {
			authors {
				blogs {
					id
				}
				name
				bio
				id
				image {
					url
				}
			}
		}
	`
	// Send the query
	const { authors } = await client.request<{ authors: IAuthor[] }>(query)
	return authors
}

export const getDetailedAuthor = cache(async (id: string) => {
	const query = gql`
		query MyQuery($id: ID) {
			author(where: { id: $id }) {
				bio
				image {
					url
				}
				name
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
					id
					tag {
						name
						slug
					}
					category {
						name
						slug
					}
					title
					slug
					description
				}
			}
		}
	`

	// Send the query
	const { author } = await client.request<{ author: IAuthor }>(query, { id })
	return author
})
