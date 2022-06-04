import self from './config'

export function index(filter = {}) {
    return self.get('/post_cat', {
        params : filter
    })
}

export function store(data = {title: '', description: ''}) {
    return self.post('/post_cat', data)
}

export function update(id, data = {title: '', description: ''}) {
    return self.put(`/post_cat/${id}`, data)
}

export function destroy(id) {
    return self.delete(`/post_cat/${id}`)
}
