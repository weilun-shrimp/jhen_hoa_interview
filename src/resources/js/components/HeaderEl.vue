<template>
    <header id="header">
        <div class="left px-3">
            <!-- <h4 class="mb-0">WeiLun Interview</h4> -->
        </div>
        <div class="mid">mid</div>
        <div class="right">
            <span v-if="$store.state.auth.status" @click="$store.commit('auth/loginFailOrLogOutOrInitFail'); $router.push({name: 'login'})">Logout</span>
        </div>
    </header>
</template>

<script>
    export default {
        setup() {

        },
    }
</script>
