import vuex from 'vuex'
import auth from './modules/auth.js'


const store = vuex.createStore({
    modules: {
        auth: auth
    }
})

export default store
