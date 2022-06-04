import vuex from 'vuex'
import auth from './modules/auth.js'


const store = vuex.createStore({
    state () {
        return {
            app_url: process.env.MIX_APP_URL
        }
    },
    modules: {
        auth: auth
    }
})

export default store
