import {apiClient} from "../services/api";
import {Cookies, SessionStorage} from 'quasar'


const state = {
  user: null,
  notifyConnection: null
};
const mutations = {
  SET_USER_DATA(state, userData) {
    state.user = userData
    Cookies.set('user-master', userData)
    Cookies.set('jwt-master', userData.token)
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${userData.token}`
  },
  CLEAR_USER_DATA() {
    Cookies.remove('user-master')
    Cookies.remove('jwt-master')
    apiClient.defaults.headers.common['Authorization'] = null;
  },
  CLEAR_SESSION_USER_DATA() {
    SessionStorage.remove('user-master')
    SessionStorage.remove('jwt-master')
    apiClient.defaults.headers.common['Authorization'] = null;
  },
  SET_SESSION_USER_DATA(state, userData) {
    state.user = userData
    SessionStorage.set('user-master', userData)
    SessionStorage.set('jwt-master', userData.token)
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${userData.token}`
  },
  SET_NOTIFY_CONNECTION(state, eventSource) {
    state.notifyConnection = eventSource
  },
  CLEAR_USER_STATE(state) {
    state.user = null
  }
};
const actions = {
  async login({commit, dispatch}, credentials) {
    try {
      const {rememberMe} = credentials
      const {data} = await apiClient.post('/login', credentials)
      console.log(rememberMe, 'rememberMe')
      if (rememberMe) {
        commit('SET_USER_DATA', data)
      } else {
        commit('SET_SESSION_USER_DATA', data)
      }
      return data
    } catch ({response: {data: {error}}}) {
      return {
        type: 'negative',
        message: error
      }
    }
  },
  async logout({commit}) {
    /*     const res = await apiClient.post('/logout')
         console.log(res)*/
    commit('CLEAR_USER_DATA')
    commit('CLEAR_SESSION_USER_DATA')
    commit('SET_NOTIFY_CONNECTION', null)
    commit('CLEAR_USER_STATE')
  }
};
const getters = {
  loggedIn(state) {
    if (state.user) {
      console.log(state.user, 'loggedIn')
      return state.user.user_data.user
    }
    return null
  },
  token(state) {
    if (state.user) {
      return state.user.token
    }
    return null
  },
  notifyConnection(state) {
    return state.notifyConnection
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
