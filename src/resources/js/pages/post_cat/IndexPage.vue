<template>
    <div class="container py-2">

        <div class="row mb-2">
            <div class="col">
                <button class="btn btn-primary" @click="toggleModal(0)">Create</button>
            </div>
            <form-modal ref="create_modal" @update-cat="updateCat" @fetch-index="fetchIndex"
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
                        <tr v-if="loadding">
                            <td colspan="5">
                                <div class="spinner-border d-block mx-auto" role="status">
                                    <span class="visually-hidden">Loading...</span>
                                </div>
                            </td>
                        </tr>
                        <tr v-else v-for="k in Object.keys(index).reverse()">
                            <th scope="row">{{ k }}</th>
                            <td>{{ index[k].title }}</td>
                            <td>{{ index[k].description.substr(0, 15) }} {{ index[k].description.length > 15 ? '...' : '' }}</td>
                            <td>{{ (new Date(index[k].created_at)).toDateString() }}</td>
                            <td>
                                <button class="btn btn-outline-primary" @click="toggleModal(k)">Edit</button>
                                <form-modal :ref="`modal${k}`" @update-cat="updateCat" @fetch-index="fetchIndex"
                                    :id="index[k].id"
                                    :title="index[k].title"
                                    :description="index[k].description"
                                />
                                <button class="btn btn-outline-danger mx-1" @click="destroyCat($event, k)">
                                    Delete
                                    <div class="spinner-border delete_spinner" role="status">
                                        <span class="visually-hidden">Loading...</span>
                                    </div>
                                </button>
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
    import FormModal from '../../components/post_cat/FormModal.vue'

    import {index as fetch, destroy} from '../../models/self/post_cat'
    export default {

        data() {
            return {
                index: {},
                has_next_page: false,
                has_prev_page: false,

                loadding: false
            }
        },

        components: {
            FilterForm,
            FormModal
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
                    const pre = {}
                    res.data.data.reverse().forEach(v => pre[v.id] = v)
                    this.index = pre
                    this.has_next_page = !!res.data.next_page_url
                    this.has_prev_page = !!res.data.prev_page_url
                }).catch(() => {return}).then(() => this.loadding = false)
            },

            toggleModal(key) {
                let target = this.$refs
                target = !key ? target.create_modal : target[`modal${key}`][0]
                $(target.$el).modal('toggle')
            },

            updateCat(data) {
                for (const k in data) this.index[data.id][k] = data[k]
            },

            destroyCat(event, id) {
                console.log(event.target.querySelector('.delete_spinner'))
                if (!this.index[id] || this.index[id].count_p > 0) return
                event.target.querySelector('.delete_spinner').classList.add('show')
                destroy(id).then(() => {
                    alert(`Post cat#${id} has been deleted.`)
                    delete this.index[id]
                    return
                }).catch(error => {
                    switch (error.status) {
                        case 400:
                            switch (error.data.type) {
                                case 'PostAssigned':
                                    alert(`The post cat#${id} has been assigned to some posts. Action delete fail.`)
                                    break
                            }
                            break
                        case 404:
                            alert(`System can't find designate resource post cat#${id}. Maybe this resource has been deleted.`)
                            delete this.index[id]
                            break
                    }
                    return
                }).then(() => event.target.querySelector('.delete_spinner').classList.remove('show'))
            },

            test() {
                console.log()
                console.log(this.index)
            }
        }
    }
</script>

<style scoped>
th, td {
    vertical-align: middle;
}

.delete_spinner {
    width: 1rem;
    height: 1rem;
    display: none;
}

.delete_spinner.show {
    display: inline-block;
}
</style>
