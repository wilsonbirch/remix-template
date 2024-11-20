import { useEffect, useState } from 'react'
import { Button, Input } from '@nextui-org/react'
import { authSignupLoader } from '~/loader/auth.signup.server'
import { authSignupAction } from '~/actions/auth.signup.server'
import { Form, useActionData, useFetcher, useLoaderData, useOutletContext } from '@remix-run/react'

import type { ActionFunctionArgs, LoaderFunction, MetaFunction } from '@remix-run/node'
import type { RootContext } from '~/root'
import type { ActionData } from '~/actions/auth.signup.server'

export const meta: MetaFunction = () => {
	return [{ title: 'Signup | 3DF' }, { name: '3DF Signup', content: '3DF signup page' }]
}

export const loader: LoaderFunction = async ({ request }) => {
	return authSignupLoader(request)
}

export async function action({ request }: ActionFunctionArgs) {
	return authSignupAction(request)
}

const inputClass = 'my-2'

export default function Signup() {
	const actionData = useActionData<ActionData>()

	// const loaderData = useLoaderData<LoaderData>()
	const { setToast, setAccount } = useOutletContext<RootContext>()
	const fetcher = useFetcher<{ message: string; code: number }>()
	const [formData, setFormData] = useState<{
		email: string
		password: string
		confirm: string
		hidePassword: boolean
	}>({
		email: '',
		password: '',
		confirm: '',
		hidePassword: true,
	})
	const [error, setError] = useState<{
		email: boolean
		password: boolean
	}>({
		email: false,
		password: false,
	})

	useEffect(() => {
		setAccount(null)
	}, [])

	useEffect(() => {
		if (actionData) {
			if (actionData.message) {
				setToast({
					error: true,
					message: actionData.message,
				})
				if (actionData.message.includes('characters')) {
					setError({
						email: false,
						password: true,
					})
				} else if (actionData.message.includes('email')) {
					setError({
						email: true,
						password: false,
					})
				} else {
					setError({
						email: true,
						password: true,
					})
				}
			}
		}
	}, [actionData])

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, formDataField: string) => {
		setError({
			email: false,
			password: false,
		})
		setFormData((form) => ({ ...form, [formDataField]: e.target.value }))
	}

	return (
		<div className='mt-40 mx-auto max-w-80'>
			<h1 className='mx-auto w-fit'>Signup for 3DF</h1>
			<Form method='post'>
				<Input
					className={inputClass}
					type='text'
					name='email'
					label='Email'
					color={error.email ? 'danger' : 'default'}
					value={formData.email}
					onChange={(e) => handleInputChange(e, 'email')}
				/>
				<Input
					className={inputClass}
					type={formData.hidePassword ? 'password' : 'text'}
					label='Password'
					name='password'
					value={formData.password}
					onChange={(e) => handleInputChange(e, 'password')}
					color={error.password ? 'danger' : 'default'}
					endContent={
						<button
							onClick={(e) => {
								e.preventDefault()
								setFormData({
									...formData,
									hidePassword: !formData.hidePassword,
								})
							}}
						>
							{formData.hidePassword ? (
								<i className='ri-eye-line ri-lg'></i>
							) : (
								<i className='ri-eye-off-line ri-lg'></i>
							)}
						</button>
					}
				/>
				<Input
					className={inputClass}
					type={formData.hidePassword ? 'password' : 'text'}
					label='Confirm Password'
					name='confirm'
					value={formData.confirm}
					color={'default'}
					onChange={(e) => handleInputChange(e, 'confirm')}
				/>
				<div className='mx-auto w-fit'>
					<Button
						color='default'
						type='submit'
						isDisabled={
							formData.password !== formData.confirm ||
							formData.password.length === 0 ||
							formData.email.length === 0
						}
					>
						Sign up
					</Button>
				</div>
			</Form>
		</div>
	)
}
