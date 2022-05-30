import self from './config'

export function index(filter = {}) {
    return self.get('/post_cat', {
        params : filter
    })
}
