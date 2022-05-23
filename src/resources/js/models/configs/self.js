import axios from 'axios'


const headers = {'Content-Type': 'application/json'}
if (localStorage.getItem('token') && localStorage.getItem('tokenType')) headers['Authorization'] = `${localStorage.getItem('tokenType')} ${localStorage.getItem('token')}`

// console.log(process.env.MIX_APP_URL)

const self = axios.create({
    baseURL: `${window.location.origin}/api`,
    timeout: 20000,
    headers
})

// request interceptor
// self.interceptors.request.use(function (config) {
//     // Do something before request is sent
//     return config;
// }, function (error) {
//     console.error('error', error)
//     // Do something with request error
//     return Promise.reject(error);
// })


self.interceptors.response.use(res => {
    // do nothing
    console.log('interceptors res', res)
    return res
}, error => {
    console.log('interceptors error', error)
    // throw Promise.resolve(error.response)
    switch(error.response.status) {
        case 500:
            alert(`Encounter server error. Your request not complete. Please contact tech support. Hint: ${error.config.url}`);
            break
        case 401:

    }
    throw error.response
})

export default self
