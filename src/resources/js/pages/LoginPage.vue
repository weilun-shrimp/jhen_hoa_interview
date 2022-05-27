<template>
    <div class="container">
        <div class="row">
            <div class="col">
                <form class="w-50 mx-auto mt-4 p-4 position-relative" @submit.prevent="submit">
                    <div class="loadding_layer position-absolute top-0 start-0 d-flex justify-content-center align-items-center"
                    v-if="$store.state.auth.loadding">
                        <div class="spinner-border" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                    </div>
                    <div class="mb-3">
                        <label for="loginEmail" class="form-label">Email address</label>
                        <input type="email" class="form-control" id="loginEmail" aria-describedby="loginEmailHelp"
                            v-model="email" required>
                        <div id="loginEmailHelp" class="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div class="mb-3">
                        <label for="loginPassword" class="form-label">Password</label>
                        <input type="password" class="form-control" id="loginPassword" v-model="pwd" required>
                    </div>
                    <button type="submit" class="btn btn-primary">Submit</button>
                    <span class="btn btn-primary" @click="test">123</span>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    import {login} from '../models/self/auth.js'

    import {ref} from 'vue'
    export default {
        setup() {
            const email = ref('')
            const pwd = ref('')

            return{email, pwd}
        },

        methods: {
            test() {
                console.log(this.$router)
                console.log(this.$route)
                // console.log(this.$store)
                // console.log(this.$store.state.auth)
                // console.log(this.$store.state.auth.loadding)
            },

            submit() {
                this.$store.commit('auth/loginOrInit')
                login(this.email, this.pwd).then(res => {
                    console.log('res', res)
                    console.log(this.$route)
                    this.$store.commit('auth/loginSuc', res.data)
                    this.$router.push( this.$route.query.redirect_to && this.$route.query.redirect_to !== this.$route.path ? {fullPath: this.$route.query.redirect_to} : {name: 'post.index'})
                }).catch(error => {
                    console.log('error', error)
                })
            }
        }
    }
</script>

<style scoped>
    .loadding_layer {
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.1);
        border-radius: 12px;
    }
</style>
