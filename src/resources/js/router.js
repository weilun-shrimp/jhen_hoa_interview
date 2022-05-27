
import LoginPage from './pages/LoginPage.vue'

import PostIndex from './pages/post/IndexPage.vue'
import PostCreate from './pages/post/CreatePage.vue'

import CampaignIndex from './pages/campaign/IndexPage.vue'
import CampaignCreate from './pages/campaign/CreatePage.vue'

const routes = [
    { path: '/login', component: LoginPage, name: 'login' },

    { path: '/post', component: PostIndex, name: 'post.index', meta: {requiresAuth: true} },
    { path: '/post/create', component: PostCreate, name: 'post.create', meta: {requiresAuth: true} },

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

    console.log('to', to)
    console.log('from', from)
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
