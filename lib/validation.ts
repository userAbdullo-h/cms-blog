import { z } from 'zod'

export const contactSchema = z.object({
	message: z.string().min(2, { error: 'Enter atleast 2 characters' }),
	email: z.email({ error: 'Enter valid email address' }),
	name: z.string().min(3, { error: 'Enter atleast 3 characters' }),
})

export const emailSchema = z.object({
	email: z.email({ error: 'Enter valid email address' }),
})
