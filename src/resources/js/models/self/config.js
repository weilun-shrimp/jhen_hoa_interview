import axios from 'axios'

const self = axios.create({
    baseURL: `${window.location.origin}/api`,
    timeout: 20000
})

// request interceptor
self.interceptors.request.use(function (config) {
    // Do something before request is sent
    if (localStorage.getItem('token') && localStorage.getItem('tokenType')) config.headers['Authorization'] = `${localStorage.getItem('tokenType')} ${localStorage.getItem('token')}`
    return config;
}, function (error) {
    console.error('req interceptor error', error)
    // Do something with request error
    return Promise.reject(error);
})


import router from '../../router'
import store from '../../store/index'
self.interceptors.response.use(res => {
    // do nothing
    // console.log('interceptors res', res)
    return res
}, error => {
    // console.log('interceptors error', error)
    // throw Promise.resolve(error.response)
    switch(error.response.status) {
        case 500:
            alert(`Encounter server error. Your request not complete. Please contact tech support. Hint: ${error.config.url}`);
            break
        case 401:
            switch (error.response.data.type) {
                case 'notProvide': alert('You need to login first.'); break
                case 'expired': alert('You have overed authorized period. Please login again.'); break
                case 'unauthorized': alert('You are unauthorized. Please login.'); break
            }
            store.commit('auth/loginFailOrLogOutOrInitFail')
            if (router.currentRoute.value.name !== 'login') router.push({name: 'login', query: {redirect_to: router.currentRoute.value.fullPath}})
            break
        case 403:
            alert('You have no permission to access this resource.')
            break
    }
    throw error.response
})

export default self
