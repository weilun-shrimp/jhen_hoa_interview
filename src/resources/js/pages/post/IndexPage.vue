<template>

    <table class="table">
        <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">First</th>
                <th scope="col">Last</th>
                <th scope="col">Handle</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <th scope="row">1</th>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
            </tr>
        </tbody>
    </table>
</template>

<script>
    import {reactive} from 'vue'
    export default {
        setup() {
            const index = reactive({

            })
        },

        created() {

        },


        mounted() {
            // console.log(this.$route)
        }
    }
</script>
