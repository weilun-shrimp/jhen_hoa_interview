export function getDecodePayload(token = localStorage.getItem('token')) {
    if (!token || typeof token !== 'string') return null
    let decode = token.split('.')
    if (typeof decode[1] === 'undefined') return null
    return JSON.parse(window.atob(decode[1]))
}



import store from '../store/index'
import {refresh} from '../models/self/auth'

export function setRefreshTimeOut() {
    if (localStorage.getItem('tokenRefreshId')) clearTimeout(localStorage.getItem('tokenRefreshId'))
    const decode_payload = getDecodePayload()
    if (!decode_payload) return null
    const min_second = (decode_payload.exp * 1000) - Date.now()
    if (min_second <= 30000) return null

    localStorage.setItem('tokenRefreshId', setTimeout(() => {
        refresh().then(res => {
            store.commit('auth/loginSucOrRefreshSuc', res.data)
            setRefreshTimeOut()
        }).catch(() => localStorage.removeItem('tokenRefreshId'))
    }, min_second - 30000))
}
