import { IArchivedBlogs, IBlog } from '@/types'
import { GraphQLClient, gql } from 'graphql-request'
import { cache } from 'react'

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT!
const hygraphToken = process.env.HYGRAPH_ASSET_TOKEN
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
	const { blogs } = await client.request<{ blogs: IBlog[] }>(query)
	return blogs
}
export const getLastBlogs = async () => {
	const query = gql`
		query MyQuery {
			blogs(first: 4) {
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
	const { blogs } = await client.request<{ blogs: IBlog[] }>(query)
	return blogs
}

export const getDetailedBlog = cache(async (slug: string) => {
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

	const { blog } = await client.request<{ blog: IBlog }>(query, { slug })
	return blog
})

export const getSearchBlog = async (title: string) => {
	const query = gql`
		query MyQuery($title: String!) {
			blogs(where: { title_contains: $title }) {
				id
				title
				image {
					url
				}
				slug
				createdAt
			}
		}
	`
	const { blogs } = await client.request<{ blogs: IBlog[] }>(query, { title })
	return blogs
}

export const getArchivedBlogs = async () => {
	const query = gql`
		query MyQuery {
			blogs(first: 1000, where: { archive: true }) {
				title
				createdAt
				slug
			}
		}
	`
	const { blogs } = await client.request<{ blogs: IBlog[] }>(query)
	const filteredBlogs = blogs.reduce(
		(acc: { [year: string]: IArchivedBlogs }, blog: IBlog) => {
			const year = blog.createdAt.substring(0, 4)
			if (!acc[year]) {
				acc[year] = { year, blogs: [] }
			}
			acc[year].blogs.push(blog)
			return acc
		},
		{}
	)
	const results: IArchivedBlogs[] = Object.values(filteredBlogs)
	return results
}
