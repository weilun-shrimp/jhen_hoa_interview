<template>
    <div class="container py-2">

        <div class="row">
            <div class="col">
                <button class="btn btn-primary" @click="test">Create</button>
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

    import {reactive} from 'vue'
    export default {
        setup() {
            const show_create_modal = false
            const index = reactive([

            ])

            return {show_create_modal, index}
        },

        components: {
            FilterForm,
            CreateEdit
        },

        created() {
            fetch(this.$route.query).then(res => this.index = res.data)
        },

        methods: {
            test() {
                // console.log(this.$refs.create_modal.$el)
                $(this.$refs.create_modal.$el).modal('toggle')
            }
        },


        mounted() {
            // console.log(this.$route)
            console.log(this.$refs)
            console.log(this.$refs.create_modal)
            console.log(this.$ref)
        }
    }
</script>
