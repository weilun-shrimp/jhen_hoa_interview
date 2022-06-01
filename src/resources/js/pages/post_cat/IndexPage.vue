<template>
    <div class="container py-2">

        <div class="row">
            <div class="col">
                <button class="btn btn-primary" @click="toggle_create_modal">Create</button>
            </div>
            <create-edit ref="create_modal"
                :id="0"
                :title="''"
                :description="''"
            />
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
                            <th scope="col">Title</th>
                            <th scope="col">Description</th>
                            <th scope="col">Created At</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="v of index">
                            <th scope="row">{{ v.id }}</th>
                            <td>{{ v.title }}</td>
                            <td>{{ v.description.substr(0, 15) }} {{ v.description.length > 15 ? '...' : '' }}</td>
                            <td>{{ (new Date(v.created_at + '+00:00')).toDateString() }}</td>
                            <td>
                                <button class="btn btn-outline-primary">Edit</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
    import FilterForm from '../../components/post_cat/FilterForm.vue'
    import CreateEdit from '../../components/post_cat/CreateEdit.vue'

    import {index as fetch} from '../../models/self/post_cat'
    export default {

        data() {
            return {
                index: [],
                has_next_page: false,
                has_prev_page: false
            }
        },

        components: {
            FilterForm,
            CreateEdit
        },

        created() {
            fetch(this.$route.query).then(res => {
                this.index = res.data.data
                this.has_next_page = !!res.data.next_page_url
                this.has_prev_page = !!res.data.prev_page_url
            })
        },

        methods: {
            toggle_create_modal() {
                $(this.$refs.create_modal.$el).modal('toggle')
            },

            test() {
                console.log(this.index)
            }
        }
    }
</script>
