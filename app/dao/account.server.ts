import bcrypt from 'bcryptjs'
import { db } from '~/lib/db.server'

export const accountCreate = async (email: string, password: string) => {
    const salt = bcrypt.genSaltSync(10)
    const passwordHash = bcrypt.hashSync(password, salt)
    const account = await db.account.create({
        data: {
            email: email,
            password: passwordHash,
        },
    })
    return account
}
