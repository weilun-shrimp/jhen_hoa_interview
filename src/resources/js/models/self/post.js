import self from './config'

export function index(filter = {}) {
    return self.get('/post', {
        params : filter
    })
}

export function store(data = {title: '', description: ''}) {
    return self.post('/post', data)
}

export function update(id, data = {title: '', description: ''}) {
    return self.put(`/post/${id}`, data)
}

export function destroy(id) {
    return self.delete(`/post/${id}`)
}
