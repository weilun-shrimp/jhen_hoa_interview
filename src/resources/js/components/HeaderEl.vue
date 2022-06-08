<template>
    <header id="header">
        <div class="left px-3">
            <h4 class="mb-0">WeiLun Interview</h4>
        </div>
        <div class="mid"></div>
        <div class="right px-3">
            <span v-if="$store.state.auth.status"
            @click="$store.commit('auth/loginFailOrLogOutOrInitFail'); $router.push({name: 'login'})">
                <i class="bi bi-box-arrow-right" style="font-size: 1.5em;"></i>
            </span>
        </div>
    </header>
</template>

<script>
    export default {
        setup() {

        },
    }
</script>
