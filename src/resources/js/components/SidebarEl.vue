<template>
    <nav id="sidebar" v-if="show">
        <ul>
            <li v-for="(i, k) in index">
                <router-link :to="i.to" :class="{match: i.to.name == $route.name}">
                    <i class="bi icon" :class="[`bi-${i.icon}`]"></i>
                    {{ i.title }}
                </router-link>
                <i class="bi open" :class="[`bi-chevron-${i.open_sub ? 'down' : 'right'}`]" v-if="i.subs" @click="switch_subs(k)"></i>

                <ul v-if="i.subs" :data-key="k" :style="{height: `${i.open_sub ? i.sub_scroll_height : 0}px`}">
                    <router-link v-for="s in i.subs" :to="s.to" :class="{match: s.to.name == $route.name}">
                        <li>{{ s.title }}</li>
                    </router-link>
                </ul>
            </li>
        </ul>
    </nav>
</template>

<script>
    import {reactive} from 'vue'
    export default {
        setup() {
            const index = reactive([
                {
                    to: {name: 'post.index'},
                    title: 'Post',
                    icon: 'file-text',
                    open_sub: false,
                    sub_scroll_height: 0,
                    subs: [
                        {
                            to: {name: 'post.create'},
                            title: 'Create',
                        },{
                            to: {name: 'post_cat.index'},
                            title: 'Cat',
                        }
                    ]
                },{
                    to: {name: 'campaign.index'},
                    title: 'Campaign',
                    icon: 'file-text',
                    open_sub: false,
                    sub_scroll_height: 0,
                    subs: [
                        {
                            to: {name: 'campaign.create'},
                            title: 'Create',
                        }
                    ]
                },{
                    to: {name: 'login'},
                    title: 'Login',
                    icon: 'box-arrow-in-left',
                    // subs: [
                    //     {
                    //         to: {name: 'post.index'},
                    //         title: 'Create',
                    //     }
                    // ]
                }
            ])

            const switch_subs = key => {
                index[key].open_sub = !index[key].open_sub
                console.log(index)
            }

            return {index, switch_subs}
        },

        computed: {
            show() {
                return this.$route.name != 'login'
            }
        },

        watch: {
            '$route' (to, from) {
                this.index.forEach(i => {
                    if (i.subs) i.subs.forEach(s => {
                        if (s.to.name == to.name) {
                            i.open_sub = true
                            return
                        }
                    })
                })
            }
        },

        mounted() {
            // this.$el.querySelectorAll('ul ul').forEach(el => {
            //     this.index[el.dataset.key].sub_scroll_height = el.scrollHeight
            // })

            this.index.forEach((i, k) => { // init sub scroll height and init load route match
                if (i.subs) {
                    i.sub_scroll_height = this.$el.querySelector(`ul ul[data-key="${k}"]`).scrollHeight
                }
            })
        }
    }
</script>

<style scoped>
</style>
