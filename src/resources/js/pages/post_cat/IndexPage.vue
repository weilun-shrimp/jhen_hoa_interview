<template>
    <div class="container py-2">

        <div class="row mb-2">
            <div class="col">
                <button class="btn btn-primary" @click="toggleModal(0)">Create</button>
            </div>
            <create-edit ref="create_modal" @update-cat="updateCat" @fetch-index="fetchIndex"
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
                        <tr v-for="(v, k) in index">
                            <th scope="row">{{ v.id }}</th>
                            <td>{{ v.title }}</td>
                            <td>{{ v.description.substr(0, 15) }} {{ v.description.length > 15 ? '...' : '' }}</td>
                            <td>{{ (new Date(v.created_at)).toDateString() }}</td>
                            <td>
                                <button class="btn btn-outline-primary" @click="toggleModal(k + 1)">Edit</button>
                                <create-edit ref="modals" @update-cat="updateCat" @fetch-index="fetchIndex"
                                    :id="v.id"
                                    :title="v.title"
                                    :description="v.description"
                                />
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
                fetch(this.$route.query).then(res => {
                    this.index = res.data.data
                    this.has_next_page = !!res.data.next_page_url
                    this.has_prev_page = !!res.data.prev_page_url
                })
            },

            toggleModal(key) {
                let target = this.$refs
                target = !key ? target.create_modal : target.modals[key - 1]
                $(target.$el).modal('toggle')
            },

            updateCat(data) {
                for (const k in this.index) if (this.index[k].id == data.id){
                    this.index[k] = data
                    break
                }
            },

            test() {
                console.log(this.$refs)
            }
        }
    }
</script>

<style scoped>
th, td {
    vertical-align: middle;
}
</style>
