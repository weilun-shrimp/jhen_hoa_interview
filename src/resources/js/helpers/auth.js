export function getDecodePayload(token = localStorage.getItem('token')) {
    if (!token || typeof token !== 'string') return null
    let decode = token.split('.')
    if (typeof decode[1] === 'undefined') return null
    return JSON.parse(window.atob(decode[1]))
}
