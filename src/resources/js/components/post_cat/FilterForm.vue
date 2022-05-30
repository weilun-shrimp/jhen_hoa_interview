<template>
    <form class="row" @submit="submit">
        <div class="col-md-3">
            <label for="post_cat_filter_title" class="form-label">Title</label>
            <input type="text" class="form-control" id="post_cat_filter_title" v-model="title">
        </div>
        <div class="col-md-3">
            <label class="form-label">&nbsp;</label>
            <div><button type="submit" class="btn btn-primary">Filter</button></div>
        </div>
    </form>
</template>

<script>
    export default {
        data() {
            return {
                title: this.$route.query.title ?? ''
            }
        },

        methods: {
            submit() {
                this.$router.push({name: this.$route.name, query: {title: this.title}})
            }
        },

        mounted() {
            // console.log(this.$route)
        }
    }
</script>
