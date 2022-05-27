import * as authHelper from '../../helpers/auth'

import {logout} from '../../models/self/auth'

const state = () => ({
    loadding: false,
    status: false,
    user: null,
    token: {
        value: null,
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
        if (localStorage.getItem('refreshTimeOutId')) {
            clearTimeout(localStorage.getItem('refreshTimeOutId'))
            localStorage.removeItem('refreshTimeOutId')
        }
        state.token = {
            value: null,
            type: 'Bearer'
        }
    },

    loginSucOrRefreshSuc(state, data) {
        state.status = true
        state.user = data.user
        localStorage.setItem('token', data.token)
        localStorage.setItem('tokenType', data.tokenType)
        state.token = {
            value: data.token,
            type: data.tokenType
        }
        state.loadding = false
        authHelper.setRefreshTimeOut()
    },

    initSuc(state, user) {
        state.status = true
        state.user = user
        state.token = {
            value: localStorage.getItem('token'),
            type: localStorage.getItem('tokenType')
        }
        state.loadding = false
        authHelper.setRefreshTimeOut()
    },

    loginFailOrLogOutOrInitFail(state) {
        if (localStorage.getItem('refreshTimeOutId')) {
            clearTimeout(localStorage.getItem('refreshTimeOutId'))
            localStorage.removeItem('refreshTimeOutId')
        }
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
            type: 'Bearer'
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
