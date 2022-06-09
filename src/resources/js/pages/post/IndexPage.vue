<template>
    <div class="container py-2">

        <div class="row mb-2">
            <div class="col">
                <router-link :to="{name: 'post.create'}" class="btn btn-primary">Create</router-link>
            </div>
        </div>

        <div class="row">
            <filter-form :cats="cats"/>
        </div>

        <div class="row">
            <div class="col">
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Img</th>
                            <th scope="col">Title</th>
                            <th scope="col">Cat</th>
                            <th scope="col">Description</th>
                            <th scope="col">Created At</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-if="loadding">
                            <td colspan="7">
                                <div class="spinner-border d-block mx-auto" role="status">
                                    <span class="visually-hidden">Loading...</span>
                                </div>
                            </td>
                        </tr>
                        <tr v-for="v in computedIndex">
                            <th scope="row">{{ v.id }}</th>
                            <td><img v-if="v.img" :src="generate_img_src(v.img)"></td>
                            <td><router-link :to="{name: 'post.show', params: {id: v.id}}">{{ v.title }}</router-link></td>
                            <td>{{ v.c_title }}</td>
                            <td>{{ v.description.substr(0, 15) }} {{ v.description.length > 15 ? '...' : '' }}</td>
                            <td>{{ (new Date(v.created_at)).toDateString() }}</td>
                            <td>
                                <router-link :to="{name: 'post.edit', params: { id: v.id }}" class="btn btn-outline-primary">Edit</router-link>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
    import FilterForm from '../../components/post/FilterForm.vue'

    import {index} from '../../models/self/post'
    export default {

        data() {
            return {
                index: [],
                has_next_page: false,
                has_prev_page: false,

                cats: [],

                loadding: false
            }
        },

        components: {
            FilterForm
        },

        created() {
            this.$watch(
                () => this.$route.query,
                () => this.$route.name == 'post.index' ? this.fetchIndex() : (() => {})(),
                // fetch the data when the view is created and the data is
                // already being observed
                { immediate: true }
            )
        },

        methods: {
            fetchIndex() {
                this.loadding = true
                index(this.$route.query).then(res => {
                    this.index = res.data.index.data
                    this.has_next_page = !!res.data.index.next_page_url
                    this.has_prev_page = !!res.data.index.prev_page_url

                    this.cats = res.data.cats
                }).catch(() => {return}).then(() => this.loadding = false)
            },

            generate_img_src(path = null) {
                return !path ? null : window.location.origin + '/storage/' + path
            }
        },

        computed: {
            computedIndex() {
                return this.loadding ? [] : this.index
            }
        }
    }
</script>

<style scoped>
th, td {
    vertical-align: middle;
}

td > img {
    max-width: 50px;
}
</style>
