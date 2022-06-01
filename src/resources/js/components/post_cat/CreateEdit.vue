<template>
    <div class="modal fade" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">{{ !$props.id ? 'Create' : 'Edit' }} Post Cat {{ $props.id ? `#${$props.id}` : '' }}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <form action="" @submit.prevent="submit">
                    <div class="modal-body">
                        <p>Modal body text goes here.</p>
                        <div class="mb-3">
                            <label :for="`post_cat_modal_${id}_title`" class="form-label">Title</label>
                            <input type="text" class="form-control" :class="{'is-invalid': errors.title.length}" maxlength="255" :id="`post_cat_modal_${id}_title`" v-model="title" required>
                            <div class="invalid-feedback" v-if="errors.title.length" v-for="v in errors.title">
                                {{ v }}
                            </div>
                        </div>

                        <div class="mb-3">
                            <label :for="`post_cat_modal_${id}_description`" class="form-label">Description</label>
                            <textarea class="form-control" :class="{'is-invalid': errors.description.length}" maxlength="512" :id="`post_cat_modal_${id}_description`" rows="3" v-model="description"></textarea>
                            <div class="invalid-feedback" v-if="errors.description.length" v-for="v in errors.description">
                                {{ v }}
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="submit" class="btn btn-primary">
                            Save changes
                            <div class="spinner-border" role="status" v-if="loadding">
                                <span class="visually-hidden">Loading...</span>
                            </div>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    import {store, update} from '../../models/self/post_cat'
    export default {
        props: ['id', 'title', 'description'],
        data() {
            return {
                id: this.$props.id,
                description: this.$props.description,
                title: this.$props.title,

                errors: {
                    title: [],
                    description: []
                },

                loadding: false
            }
        },

        methods: {
            submit() {
                this.loadding = true
                const data = {
                    title: this.title,
                    description: this.description
                }
                console.log(data)
                const req = !this.id ? store(data) : update(this.id, data)
                req.then(res => {
                    console.log(res)
                    alert(`Post Cat #${res.data.id} has been ${this.id ? 'updated' : 'Created'}`)
                    this.$router.push({name: 'post_cat.index'})
                    return
                }).catch(error => {
                    switch(error.status) {
                        case 400:
                            Object.entries(error.data).forEach(([k, v]) => this.errors[k] = v)
                            break
                    }
                    return
                }).then(() => this.loadding = false)

            }
        },

        mounted() {
            // console.log(this.$route)
        }
    }
</script>
