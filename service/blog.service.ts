import { IBlog } from '@/types'
// 1. GraphQLClient ni import qiling
import { GraphQLClient, gql } from 'graphql-request'

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT!
const hygraphToken = process.env.HYGRAPH_ASSET_TOKEN // Tokenni o'qiymiz
const client = new GraphQLClient(graphqlAPI, {
	headers: {
		Authorization: `Bearer ${hygraphToken}`,
	},
})

export const getBlogs = async () => {
	const query = gql`
		query MyQuery {
			blogs(first: 1000) {
				title
				createdAt
				author {
					name
					image {
						url
					}
				}
				category {
					name
					slug
				}
				description
				tag {
					name
					slug
				}
				image {
					url
				}
				content {
					html
				}
				slug
			}
		}
	`
	// Send the query
	const { blogs } = await client.request<{ blogs: IBlog[] }>(query)
	return blogs
}

export const getDetailedBlog = async (slug: string) => {
	const query = gql`
		query MyQuery($slug: String!) {
			blog(where: { slug: $slug }) {
				id
				author {
					name
					id
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
			}
		}
	`

	// Send the query
	const { blog } = await client.request<{ blog: IBlog }>(query, { slug })
	return blog
}
