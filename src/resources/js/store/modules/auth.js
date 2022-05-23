import * as authHelper from '../../helpers/auth'

import {logou, logout} from '../../models/auth'

const state = () => ({
    loadding: false,
    status: false,
    user: null,
    token: {
        value: null,
        expiredAt: 0, // timestamp
        type: 'Bearer'
    }
})

const getters = {

}

const mutations = {
    loginOrInit(state) {
        state.status = false
        state.user = null
        state.loadding = true
        state.token.value = null
        state.token.expiredAt = 0
        state.token.type = 'Bearer'
        localStorage.removeItem('token')
        localStorage.removeItem('tokenType')
    },

    loginSuc(state, data) {
        state.status = true
        state.user = data.user
        localStorage.setItem('token', data.token)
        localStorage.setItem('tokenType', data.tokenType)
        state.token.value = data.token
        state.token.type = data.tokenType
        state.token.expiredAt = authHelper.getDecodePayload().exp
        state.loadding = false
    },

    initSuc(state, user) {
        state.status = true
        state.loadding = false
        state.user = user
        state.token.value = localStorage.getItem('token')
        state.token.type = localStorage.getItem('tokenType')
    },

    loginFailOrLogOutOrInitFail(state) {
        if (state.token.value || localStorage.getItem('token')) logout()
        state.status = false
        state.user = null
        state.loadding = false
        state.token.value = null
        state.token.expiredAt = 0
        state.token.type = 'Bearer'
        localStorage.removeItem('token')
        localStorage.removeItem('tokenType')
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
