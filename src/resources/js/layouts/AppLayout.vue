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

    import * as authHelper from '../helpers/auth.js'

    import {asyncMe} from '../models/auth.js'
    export default {
        setup() {

        },

        created() {
            // init auth
            let payload = authHelper.getDecodePayload()
            if (payload !== null && payload.exp * 1000 >= Date.now() && localStorage.getItem('tokenType')) {
                this.$store.commit('auth/loginOrInit')
                asyncMe().then(res => this.$store.commit('auth/initSuc', res.data))
                    .catch(() => this.$store.commit('auth/loginFailOrLogOutOrInitFail'))
            } else this.$store.commit('auth/loginFailOrLogOutOrInitFail')
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
