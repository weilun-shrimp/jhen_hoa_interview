<template>
    <main id="mainContent" :class="{full: fullMain}">
        <router-view></router-view>
    </main>
    <header-el></header-el>
    <sidebar-el></sidebar-el>
</template>

<script>
    import HeaderEl from '../components/HeaderEl.vue'
    import SidebarEl from '../components/SidebarEl.vue'
    export default {
        setup() {

        },
        components: {
            HeaderEl,
            SidebarEl
        },
        computed: {
            fullMain() {
                return this.$route.name === 'login'
            }
        },
        mounted() {
            console.log(this.$route)
        }
    }
</script>
