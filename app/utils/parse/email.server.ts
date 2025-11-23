import Result, { ok, err } from 'true-myth/result'

import type { Error } from '~/types/common'

export function parseEmail(email: string): Result<string, Error> {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (emailRegex.test(email)) {
        return ok(email)
    } else {
        return err({ message: 'Not a valid email', code: 401 })
    }
}
