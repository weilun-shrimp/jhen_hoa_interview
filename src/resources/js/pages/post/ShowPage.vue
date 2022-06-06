<template>
    <div class="container p-5">
        <div class="row mb-3">
            <div class="col">
                <h1>{{ post.title }}</h1>
            </div>
        </div>

        <div class="row mb-3" v-if="img_src">
            <div class="col">
                <img class="mw-100" :src="img_src">
            </div>
        </div>

        <div class="row" v-if="post.created_at">
            <div class="col">
                <p>{{ (new Date(post.created_at)).toDateString() }}</p>
            </div>
        </div>

        <div class="row mb-3">
            <div class="col">
                <span class="btn btn-outline-info tag" v-for="v in tags">{{ v.value }}</span>
            </div>
        </div>

        <div class="row mb-3">
            <div class="col">
                <p>{{ post.description }}</p>
            </div>
        </div>

        <div class="row">
            <div class="col">
                <p>{{ post.content }}</p>
            </div>
        </div>
    </div>


</template>

<script>
    import {show} from '../../models/self/post'
    export default {
        data() {
            return {
                post: {
                    id: 0,
                    cat_id: null,
                    cat_title: null,
                    img: null,
                    title: null,
                    description: null,
                    content: null,
                    created_at: null,
                    updated_at: null,
                },
                tags: [],
                loadding: false
            }
        },

        created() {
            this.retrieve()
        },

        beforeRouteUpdate (to) {
            this.retrieve(to.params.id)
        },

        methods: {
            retrieve(id = this.$route.params.id) {
                this.loadding = true
                this.tags = []
                show(id).then(res => ['post', 'tags'].forEach(v => this[v] = res.data[v])).catch(error => {switch (error.status) {
                    case 404:
                        alert(`System can't find designate post#${this.$route.params.id}. Maybe this resource has been deleted.`)
                        this.$router.push({name: 'post.index'})
                        break
                }}).then(() => this.loadding = false)
            }
        },

        computed: {
            img_src() {
                return !this.post.img ? null : window.location.origin + '/storage/' + this.post.img
            }
        }
    }
</script>

<style scoped>
.container {
    max-width: 800px;
}

span.tag:not(:first-child) {
    margin-left: 1em;
}

span.tag {
    cursor: default;
}
</style>
