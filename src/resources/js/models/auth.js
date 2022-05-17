import self from './configs/self'

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
