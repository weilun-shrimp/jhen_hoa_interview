/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');


import {createApp} from 'vue'

import AppLayout from './layouts/AppLayout'
import NullLayout from './layouts/NullLayout'

const App = createApp(AppLayout)

import router from './router.js'
App.use(router)

import store from './store/index.js'
App.use(store)

// import self_axios from './models/configs/self'
// App.config.globalProperties.$axios = self_axios





App.mount('#app')
