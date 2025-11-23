import { useLoaderData, useNavigate } from '@remix-run/react'
import { useEffect } from 'react'
import { homeLoader } from '~/loader/home.server'
import { useAuth } from '~/providers'

import type {
    LoaderFunction,
    LoaderFunctionArgs,
    MetaFunction,
} from '@remix-run/node'
import type { LoaderData } from '~/loader/home.server'

export const meta: MetaFunction = () => {
    return [
        { title: 'remix-template | Home' },
        { name: 'home', content: 'Home page for remix-template application' },
    ]
}

export const loader: LoaderFunction = async ({
    request,
}: LoaderFunctionArgs) => {
    return homeLoader(request)
}

export default function Home() {
    const navigate = useNavigate()
    const { account, nextUrl } = useLoaderData<LoaderData>()
    const { account: authAccount, setAccount } = useAuth()

    useEffect(() => {
        if (!authAccount) {
            setAccount({
                id: account.id,
                email: account.email,
                role: account.role,
            })
        }
        if (nextUrl) {
            navigate(nextUrl)
        }
    }, [])

    return (
        <div className="my-2">
            <p>Home</p>
        </div>
    )
}
