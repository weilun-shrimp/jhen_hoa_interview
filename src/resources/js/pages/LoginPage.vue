<template>
    <div class="container">
        <div class="row">
            <div class="col">
                <form class="w-50 mx-auto mt-4" @submit.prevent="submit">
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
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    import {login} from '../models/auth.js'

    import {ref} from 'vue'
    export default {
        setup() {
            const email = ref('')
            const pwd = ref('')

            const submit = () => {
                console.log(email.value, pwd.value)
                login(email.value, pwd.value).then(res => {
                    console.log(res)

                })
            }

            return{email, pwd, submit}
        },
    }
</script>
