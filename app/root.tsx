import { ReactNode, useEffect, useState } from 'react'
import { Links, Meta, Outlet, Scripts, ScrollRestoration, useNavigate } from '@remix-run/react'
import { NextUIProvider } from '@nextui-org/react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { Header, Toast } from '~/components'
import { rootLoader } from './loader/root.server'

import type { LoaderFunction } from '@remix-run/node'
import type { Account } from '@prisma/client'

import '~/styles/tailwind.css'
import '~/styles/main.css'
import 'remixicon/fonts/remixicon.css'

export type RootContext = {
	setToast: React.Dispatch<React.SetStateAction<{ message: null | string; error?: boolean }>>
	setAccount: React.Dispatch<React.SetStateAction<Account | null>>
}

// export const links: LinksFunction = () => [
// 	{ rel: 'preconnect', href: 'https://fonts.googleapis.com' },
// 	{
// 		rel: 'preconnect',
// 		href: 'https://fonts.gstatic.com',
// 		crossOrigin: 'anonymous',
// 	},
// 	{
// 		rel: 'stylesheet',
// 		href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap',
// 	},
// ]

export const loader: LoaderFunction = async ({ request }) => {
	return rootLoader(request)
}

export function Layout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='en'>
			<head>
				<meta charSet='utf-8' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<Meta />
				<Links />
			</head>
			<body>
				{children}
				<ScrollRestoration />
				<Scripts />
			</body>
		</html>
	)
}

export function Providers({ children }: { children: ReactNode }) {
	const navigate = useNavigate()
	return (
		<NextUIProvider navigate={navigate}>
			<NextThemesProvider attribute='class' defaultTheme='dark'>
				{children}
			</NextThemesProvider>
		</NextUIProvider>
	)
}

export default function App() {
	const [account, setAccount] = useState<Account | null>(null)
	const [theme, setTheme] = useState('dark')
	const [toast, setToast] = useState<{
		message: null | string
		error?: boolean
	}>({
		message: null,
		error: false,
	})

	const rootContext: RootContext = { setToast, setAccount }

	useEffect(() => {
		if (account) {
			setAccount(account)
			setToast({
				message: `Authenticated: ${account.email}`,
				error: false,
			})
		}
	}, [account])

	return (
		<Providers>
			<main className={`${theme} text-foreground bg-background`}>
				<Header account={account} />
				<div className='container mx-auto'>
					<Outlet context={rootContext} />
					<Toast message={toast.message} error={toast.error} setToast={setToast} />
				</div>
			</main>
		</Providers>
	)
}
