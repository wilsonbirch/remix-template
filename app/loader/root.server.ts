import { authenticator } from '~/auth/auth.server'

import type { AuthAccount } from '~/auth/auth.server'

export type LoaderData = {
    account: AuthAccount | null
}

export const rootLoader = async (request: Request) => {
    const account: AuthAccount | null = await authenticator.isAuthenticated(
        request,
        {}
    )

    return { account }
}
