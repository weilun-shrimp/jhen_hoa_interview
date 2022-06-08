// import { getGlobalThis } from '@vue/shared';
import self from './config'

function construct_formdata(data = {
    cat_id: 0,
    img: null,
    title: null,
    description: null,
    content: null,
    tags: []
}) {
    const formdata = new FormData();
    ['title', 'img', 'cat_id', 'description', 'content'].forEach(v => data[v] ? formdata.append(v, data[v]) : null)
    data.tags.forEach(v => formdata.append('tags[]', v))
    return formdata
}

export function index(filter = {}) {
    return self.get('/post', {
        params : filter
    })
}

export function show(id) {
    return self.get(`/post/${id}`)
}

export function create() {
    return self.get('/post/create')
}

export function edit(id) {
    return self.get(`/post/edit/${id}`)
}

export function store(data = {
    cat_id: null,
    img: '',
    title: '',
    description: '',
    content: '',
    tags: []
}) {
    self.defaults.headers.common['Content-Type'] = 'multipart/form-data'
    return self.post('/post', construct_formdata(data))
}

export function update(id, data = {
    cat_id: null,
    img: '',
    title: '',
    description: '',
    content: '',
    tags: []
}) {
    self.defaults.headers.common['Content-Type'] = 'multipart/form-data'
    const formdata = construct_formdata(data)
    formdata.append('_method', 'PUT')
    return self.post(`/post/${id}`, formdata)
}

export function destroy(id) {
    return self.post(`/post/${id}`, {
        _method: 'DELETE'
    })
}
