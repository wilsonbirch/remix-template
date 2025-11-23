import { authenticator } from '~/auth/auth.server'

export const indexLoader = async (request: Request) => {
    const account = await authenticator.isAuthenticated(request)

    return { account }
}
