import self from './config'

/**
 * @param {string} email
 * @param {string} pwd
 */
export function login(email, pwd) {
    return self.post('/auth/login', {
        email: email,
        password: pwd
    })
}

export function me() {
    return self.post('/auth/me')
}

export async function asyncMe() {
    return await self.post('/auth/me')
}

export function logout() {
    return self.post('/auth/logout')
}

export function refresh() {
    console.log('refresh start')
    return self.post('/auth/refresh')
}
