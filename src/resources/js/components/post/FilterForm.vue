<template>
    <form class="row" @submit="submit">
        <div class="col-md-3">
            <label for="post_filter_title" class="form-label">Title</label>
            <input type="text" class="form-control" id="post_filter_title" v-model="title">
        </div>

        <div class="col-md-3">
            <label class="form-label" for="post_filter_cat">Cat</label>
            <select class="form-select" id="post_filter_cat" v-model="cat_id">
                <option value=""></option>
                <option v-for="v in $props.cats" :value="v.id">{{ v.title }} - {{ v.description.substr(0, 15) }} {{ v.description.length > 15 ? '...' : '' }}</option>
            </select>
        </div>

        <div class="col-md-3">
            <label class="form-label">&nbsp;</label>
            <div><button type="submit" class="btn btn-primary">Filter</button></div>
        </div>
    </form>
</template>

<script>
    export default {
        props: {
            cats: Array
        },
        data() {
            return {
                title: this.$route.query.title ?? '',
                cat_id: this.$route.query.cat_id ?? null
            }
        },

        created() {
            this.$watch(
                () => this.$route.query.title,
                (newTitle) => this.title = newTitle ?? '',
                {immediate: true}
            )
        },

        methods: {
            submit() {
                const query = {};
                ['title', 'cat_id'].forEach(v => this[v] ? query[v] = this[v] : null)
                this.$router.push({name: this.$route.name, query})
            }
        },

        mounted() {
            // console.log(this.$route)
        }
    }
</script>
