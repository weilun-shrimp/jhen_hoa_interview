import axios from 'axios'


const headers = {'Content-Type': 'application/json'}
if (localStorage.getItem('token')) headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`

// console.log(process.env.MIX_APP_URL)

const self = axios.create({
    baseURL: `${window.location.origin}/api`,
    timeout: 10000,
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
    return Promise.resolve(error.response);
})

export default self
