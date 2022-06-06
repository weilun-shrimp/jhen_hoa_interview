<template>
    <div class="container py-2">

        <div class="row mb-2">
            <div class="col">
                <router-link :to="{name: 'post.create'}" class="btn btn-primary">Create</router-link>
            </div>
        </div>

        <div class="row">
            <filter-form/>
        </div>

        <div class="row">
            <div class="col">
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Img</th>
                            <th scope="col">Title</th>
                            <th scope="col">Description</th>
                            <th scope="col">Created At</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-if="loadding">
                            <td colspan="6">
                                <div class="spinner-border d-block mx-auto" role="status">
                                    <span class="visually-hidden">Loading...</span>
                                </div>
                            </td>
                        </tr>
                        <tr v-for="v in computedIndex">
                            <th scope="row">{{ v.id }}</th>
                            <td><img v-if="v.img" :src="generate_img_src(v.img)"></td>
                            <td>{{ v.title }}</td>
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
import { computed } from '@vue/runtime-core'
    import FilterForm from '../../components/post_cat/FilterForm.vue'

    import {index as fetch} from '../../models/self/post'
    export default {

        data() {
            return {
                index: [],
                has_next_page: false,
                has_prev_page: false,

                loadding: false
            }
        },

        components: {
            FilterForm
        },

        created() {
            this.fetchIndex()

            this.$watch(
                () => this.$route.query,
                () => this.fetchIndex(),
                // fetch the data when the view is created and the data is
                // already being observed
                { immediate: true }
            )
        },

        methods: {
            fetchIndex() {
                this.loadding = true
                fetch(this.$route.query).then(res => {
                    this.index = res.data.data
                    this.has_next_page = !!res.data.next_page_url
                    this.has_prev_page = !!res.data.prev_page_url
                }).catch(() => {return}).then(() => this.loadding = false)
            },

            generate_img_src(path = null) {
                return !path ? null : window.location.origin + '/storage/' + path
            },

            test() {
                console.log()
                console.log(this.index)
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
