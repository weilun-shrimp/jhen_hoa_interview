
import LoginPage from './pages/LoginPage.vue'

import PostIndex from './pages/post/IndexPage.vue'
import PostCreate from './pages/post/CreatePage.vue'

import CampaignIndex from './pages/campaign/IndexPage.vue'
import CampaignCreate from './pages/campaign/CreatePage.vue'

const routes = [
    { path: '/login', component: LoginPage, name: 'login' },

    { path: '/post', component: PostIndex, name: 'post.index' },
    { path: '/post/create', component: PostCreate, name: 'post.create' },

    { path: '/campaign', component: CampaignIndex, name: 'campaign.index' },
    { path: '/campaign/create', component: CampaignCreate, name: 'campaign.create' },
]

import {createRouter, createWebHashHistory} from 'vue-router'
const router = createRouter({
    history: createWebHashHistory(),
    routes,
})


export default router
