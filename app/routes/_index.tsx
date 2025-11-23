import { indexLoader } from '~/loader/index.server'

import type { LoaderFunction, MetaFunction } from '@remix-run/node'

export const meta: MetaFunction = () => {
    return [
        { title: 'remix-template' },
        { name: 'remix-template', content: 'index route for remix-template' },
    ]
}

export const loader: LoaderFunction = async ({ request }) => {
    return indexLoader(request)
}

export default function Index() {
    return (
        <div>
            <p>index</p>
        </div>
    )
}
