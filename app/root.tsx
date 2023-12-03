import { useState } from 'react';
import { NextUIProvider } from '@nextui-org/react';
import { Sidebar } from './components';
import {
	Links,
	LiveReload,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
} from '@remix-run/react';

import type { LinksFunction } from '@remix-run/node';

// CSS imports
import { cssBundleHref } from '@remix-run/css-bundle';
import tailwindCss from '~/styles/tailwind.css';
import mainCss from '~/styles/main.css';
import remixiconCss from 'remixicon/fonts/remixicon.css';

const styles = [
	{ rel: 'stylesheet', href: tailwindCss },
	{ rel: 'stylesheet', href: mainCss },
	{ rel: 'stylesheet', href: remixiconCss },
];

export const links: LinksFunction = () => [
	...(cssBundleHref
		? [{ rel: 'stylesheet', href: cssBundleHref }, ...styles]
		: [...styles]),
];

export default function App() {
	const [theme, setTheme] = useState('dark');
	return (
		<html lang='en'>
			<head>
				<meta charSet='utf-8' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<Meta />
				<Links />
			</head>
			<body>
				<NextUIProvider>
					<main className={`${theme} text-foreground bg-background`}>
						<Sidebar />
						<Outlet />
					</main>
				</NextUIProvider>
				<ScrollRestoration />
				<Scripts />
				<LiveReload />
			</body>
		</html>
	);
}
