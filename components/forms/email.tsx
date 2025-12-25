'use client'

import { emailSchema } from '@/lib/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { User2 } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import z from 'zod'
import { Button } from '../ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form'
import { Input } from '../ui/input'

function EmailForm() {
	const [isLoading, setIsLoading] = useState(false)
	const form = useForm<z.infer<typeof emailSchema>>({
		resolver: zodResolver(emailSchema),
		defaultValues: {
			email: '',
		},
	})

	function onSubmit(values: z.infer<typeof emailSchema>) {
		const telegramBotId = process.env.NEXT_PUBLIC_TELEGRAM_BOT_API
		const telegramChatId = process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID
		setIsLoading(true)

		const promise = fetch(
			`https://api.telegram.org/bot${telegramBotId}/sendMessage`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'cache-control': 'no-cache',
				},
				body: JSON.stringify({
					chat_id: telegramChatId,
					text: `This message from Blog email section\nEmail: ${values.email}`,
				}),
			}
		)
			.then(() => form.reset())
			.finally(() => setIsLoading(false))

		toast.promise(promise, {
			loading: 'Loading ...',
			success: 'Email successfully received',
			error: 'Something went wrong',
		})
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className=' flex gap-2 max-md:flex-col'>
				<FormField
					control={form.control}
					name='email'
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input
									className='min-w-80 w-full col-span-2 max-md:w-2/3 mx-auto'
									placeholder='Your email address...'
									disabled={isLoading}
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button
					size={'lg'}
					type='submit'
					disabled={isLoading}
					variant={'default'}
					className='max-md:mt-3 max-md:w-2/3 h-12 mx-auto'>
					<User2 />
					<span>Join today</span>
				</Button>
			</form>
		</Form>
	)
}

export default EmailForm
