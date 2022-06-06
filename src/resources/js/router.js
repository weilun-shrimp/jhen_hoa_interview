
import LoginPage from './pages/LoginPage.vue'

import PostIndex from './pages/post/IndexPage.vue'
import PostShow from './pages/post/ShowPage.vue'
import FromPage from './pages/post/FromPage.vue'

import PostCatIndex from './pages/post_cat/IndexPage.vue'

import CampaignIndex from './pages/campaign/IndexPage.vue'
import CampaignCreate from './pages/campaign/CreatePage.vue'

const routes = [
    { path: '/login', component: LoginPage, name: 'login' },

    { path: '/post', component: PostIndex, name: 'post.index', meta: {requiresAuth: true} },
    { path: '/post/:id', component: PostShow, name: 'post.show', meta: {requiresAuth: true} },
    { path: '/post/create', component: FromPage, name: 'post.create', meta: {requiresAuth: true} },
    { path: '/post/:id/edit', component: FromPage, name: 'post.edit', meta: {requiresAuth: true} },

    { path: '/post_cat', component: PostCatIndex, name: 'post_cat.index', meta: {requiresAuth: true} },

    { path: '/campaign', component: CampaignIndex, name: 'campaign.index' },
    { path: '/campaign/create', component: CampaignCreate, name: 'campaign.create' },
]

import {createRouter, createWebHashHistory} from 'vue-router'
const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

import store from './store/index'
import * as authHelper from './helpers/auth'
import {asyncMe} from './models/self/auth.js'
router.beforeEach(async (to, from) => {
    // ...
    console.log('from', from)
    console.log('to', to)
    let auth = true
    if (to.meta.requiresAuth && !store.state.auth.status) {
        auth = false
        const payload = authHelper.getDecodePayload()
        if (payload !== null && payload.exp * 1000 >= Date.now() && localStorage.getItem('tokenType')) {
            store.commit('auth/loginOrInit')
            await asyncMe().then(res => {
                store.commit('auth/initSuc', res.data)
                auth = true
            }).catch(() => store.commit('auth/loginFailOrLogOutOrInitFail'))
        } else store.commit('auth/loginFailOrLogOutOrInitFail')
    }
    // return false // explicitly return false to cancel the navigation
    if (!auth && to.name !== 'login') return {name: 'login', query: {redirect_to: to.fullPath}}
})


export default router
