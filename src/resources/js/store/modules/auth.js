import * as authHelper from '../../helpers/auth'

import {logout} from '../../models/self/auth'

const state = () => ({
    loadding: false,
    status: false,
    user: null,
    token: {
        value: null,
        expiredAt: 0, // timestamp
        type: 'Bearer',
        refreshTimeOutId: null
    }
})

const getters = {

}

const mutations = {
    loginOrInit(state) {
        state.status = false
        state.user = null
        state.loadding = true
        state.token = {
            value: null,
            expiredAt: 0, // timestamp
            type: 'Bearer',
            refreshTimeOutId: null
        }
    },

    loginSuc(state, data) {
        state.status = true
        state.user = data.user
        localStorage.setItem('token', data.token)
        localStorage.setItem('tokenType', data.tokenType)
        state.token = {
            value: data.token,
            expiredAt: authHelper.getDecodePayload().exp, // timestamp
            type: data.tokenType,
            refreshTimeOutId: null
        }
        state.loadding = false
    },

    initSuc(state, user) {
        state.status = true
        state.user = user
        state.token = {
            value: localStorage.getItem('token'),
            expiredAt: authHelper.getDecodePayload().exp, // timestamp
            type: localStorage.getItem('tokenType'),
            refreshTimeOutId: null
        }
        state.loadding = false
    },

    loginFailOrLogOutOrInitFail(state) {
        if (state.token.value || localStorage.getItem('token')) logout().then(() => {
            localStorage.removeItem('token')
            localStorage.removeItem('tokenType')
        }).catch(() => { // remove localstorage, what ever it back
            localStorage.removeItem('token')
            localStorage.removeItem('tokenType')
        })
        state.status = false
        state.user = null
        state.loadding = false
        state.token = {
            value: null,
            expiredAt: 0, // timestamp
            type: 'Bearer',
            refreshTimeOutId: null
        }
    }
}

const actions = {

}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
