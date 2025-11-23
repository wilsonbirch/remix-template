import { redirect } from '@remix-run/node'
import { sessionStorage } from '~/auth/sessionStorage.server'

import type { LoaderFunction, LoaderFunctionArgs } from '@remix-run/node'

export const loader: LoaderFunction = async ({
    request,
}: LoaderFunctionArgs) => {
    const session = await sessionStorage.getSession(
        request.headers.get('Cookie')
    )

    return redirect('/auth/login', {
        headers: {
            'Set-Cookie': await sessionStorage.destroySession(session),
        },
    })
}

export default function Logout() {}
