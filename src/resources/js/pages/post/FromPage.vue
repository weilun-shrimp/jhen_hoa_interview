<template>

    <form class="container p-5 position-relative" :class="{loadding: loadding}" style="max-width: 1200px;" @submit.prevent="submit">
        <div class="mb-3 row">
            <label for="title" class="form-label">Title</label>
            <input type="text" class="form-control" :class="{'is-invalid': errors.title.length}"
            id="title" maxlength="255" v-model="post.title" @change="errors.title = []">
            <div id="title_errors" class="invalid-feedback" v-if="errors.title.length">
                <span v-for="v in errors.title">{{ v }}<br></span>
            </div>
        </div>

        <div class="mb-3 row">
            <label for="img" class="form-label">IMG</label>
            <input ref="img" class="form-control mb-2" :class="{'is-invalid': errors.img.length}"
            type="file" id="img" accept=".png, .jpg, .jpeg" @change="update_img_preview_src($event); errors.img = []">
            <img v-if="img_preview_src" :src="img_preview_src" id="img_preview" class="d-block mx-auto">
            <div id="img_errors" class="invalid-feedback" v-if="errors.img.length">
                <span v-for="v in errors.img">{{ v }}<br></span>
            </div>
        </div>

        <div class="mb-3 form-floating row">
            <select class="form-select" :class="{'is-invalid': errors.cat_id.length}" id="cat" v-model="post.cat_id" @change="errors.cat_id = []">
                <option v-for="v in cats" :value="v.id">{{ v.title }} - {{ v.description.substr(0, 15) }} {{ v.description.length > 15 ? '...' : '' }}</option>
            </select>
            <label for="cat">Cat</label>
            <div id="cat_id_errors" class="invalid-feedback" v-if="errors.cat_id.length">
                <span v-for="v in errors.cat_id">{{ v }}<br></span>
            </div>
        </div>

        <div class="mb-3 form-floating row">
            <input type="text" class="form-control mb-3" id="append_tag" maxlength="255" placeholder="tag"
            @keypress.enter="append_tag($event)" @change="errors.tags = []">
            <label for="key_tag">Append Tag</label>
            <div id="tags_container">
                <span v-for="v in tags" class="btn btn-outline-info tags" @click="remove_tag(v); errors.tags = []">{{ v }} <i class="bi bi-x"></i></span>
            </div>
            <div id="tags_errors" class="invalid-feedback" v-if="errors.tags.length">
                <span v-for="v in errors.tags">{{ v }}<br></span>
            </div>
        </div>

        <div class="mb-3 row">
            <label for="description" class="form-label">Description</label>
            <textarea class="form-control" :class="{'is-invalid': errors.description.length}" id="description"
            rows="3" maxlength="512" v-model="post.description" @change="errors.description = []">{{ post.description }}</textarea>
            <div id="description_errors" class="invalid-feedback" v-if="errors.description.length">
                <span v-for="v in errors.description">{{ v }}<br></span>
            </div>
        </div>

        <div class="mb-3 row">
            <label for="content" class="form-label">Content</label>
            <textarea class="form-control" :class="{'is-invalid': errors.content.length}" id="content"
            rows="10" v-model="post.content" @change="errors.content = []">{{ post.content }}</textarea>
            <div id="content_errors" class="invalid-feedback" v-if="errors.content.length">
                <span v-for="v in errors.content">{{ v }}<br></span>
            </div>
        </div>
        <button type="submit" class="btn btn-primary" :disabled="loadding">
            Submit
            <div class="spinner-border" role="status" v-if="loadding" style="width: 1rem; height: 1rem;">
                <span class="visually-hidden">Loading...</span>
            </div>
        </button>
    </form>
</template>

<script>
    import {create, edit, store, update} from '../../models/self/post'
    export default {
        data() {
            return {
                post: {
                    id: 0,
                    cat_id: null,
                    img: null,
                    title: null,
                    description: null,
                    content: null,
                    created_at: null,
                    updated_at: null,
                },
                cats: [],
                tags: [],
                img_preview_src: null,
                errors: {
                    cat_id: [],
                    img: [],
                    title: [],
                    description: [],
                    content: [],
                    tags: []
                },
                loadding: false
            }
        },

        created() {
            this.retrieve()
        },

        beforeRouteEnter (to, from, next) {
            next(vm => {
                if (from.name == 'post.edit' && to.name == 'post.create') vm.flush_data()
                if (from.name == 'post.create' && to.name == 'post.edit') vm.retrieve()
            })
        },

        beforeRouteUpdate (to) {
            this.retrieve(to.params.id)
        },

        methods: {
            update_img_preview_src(event) {
                if (event.target.files[0]) {
                    const file_reader = new FileReader()
                    file_reader.onload = () => this.img_preview_src = file_reader.result
                    file_reader.readAsDataURL(event.target.files[0])
                }
            },

            retrieve(id = this.$route.params.id) {
                this.loadding = true
                this.tags = []
                const retrieve = !this.$route.params.id ? create() : edit(id)
                retrieve.then(res => {
                    if (res.data.post) this.post = res.data.post
                    if (res.data.tags) res.data.tags.forEach(v => this.tags.push(v.value))
                    this.cats = res.data.cats

                    // set default
                    if (!this.$route.params.id && this.cats) this.post.cat_id = this.cats[0].id
                    if (this.post.img) this.img_preview_src = window.location.origin + '/storage/' + this.post.img
                }).catch(error => {switch (error.status) {
                    case 404:
                        alert(`System can't find designate post#${this.$route.params.id}. Maybe this resource has been deleted.`)
                        this.$router.push({name: 'post.index'})
                        break
                }}).then(() => this.loadding = false)
            },

            submit() {
                this.loadding = true
                const data = {
                    cat_id: this.post.cat_id,
                    img: this.$refs.img.files[0] ?? null,
                    title: this.post.title,
                    description: this.post.description,
                    content: this.post.content,
                    tags: this.tags
                }
                const req = !this.post.id ? store(data) : update(this.post.id, data)
                req.then(() => {
                    if (!this.post.id) this.$router.push({name: 'post.index'})
                    else alert(`Post#${this.post.id} has been updated.`)
                }).catch(error => {switch(error.status) {
                    case 422:
                        for (const k in error.data) this.errors[k] = error.data[k]
                        alert('There have some errors. Please fix it and submit again.')
                        break
                }}).then(() => this.loadding = false)
            },

            remove_tag(value) {
                this.tags = this.tags.filter(v => v != value)
            },

            append_tag(event) {
                event.preventDefault()
                for (const v of this.tags) if (v == event.target.value) return
                this.tags.push(event.target.value)
                event.target.value = null
            },

            flush_data() {
                this.post.id = 0
                this.post.cat_id = this.cats.length ? this.cats[0].id : null;
                ['img', 'title', 'description', 'content', 'created_at', 'updated_at'].forEach(v => this.post[v] = null)
                this.tags = []
                this.img_preview_src = null;
                ['cat_id', 'img', 'title', 'description', 'content', 'tags'].forEach(v => this.errors[v] = [])
            }
        }
    }
</script>

<style scoped>
#img_preview {
    max-width: 600px;
}

span.tags:not(:first-child) {
    margin-left: 1em;
}

form.loadding {
    opacity: 0.4;
}

</style>
