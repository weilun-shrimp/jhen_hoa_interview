<template>
    <form>
        <div class="col-md-3">
            <label for="post_cat_filter_title" class="form-label">Title</label>
            <input type="text" class="form-control" id="post_cat_filter_title" v-model="title">
        </div>
        <div class="col-3">
            <button type="submit" class="btn btn-primary">Filter</button>
        </div>
    </form>
</template>

<script>
    import {reactive} from 'vue'
    export default {
        // setup() {
        //     const title = $route.query.title ?? ''

        //     return {title}
        // },

        data() {
            return {
                title: this.$route.query.title ?? ''
            }
        },


        mounted() {
            // console.log(this.$route)
        }
    }
</script>
