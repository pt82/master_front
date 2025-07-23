import {apiClient} from "src/services/api";

const state = {
  rating: ''
};
const mutations = {
  SET_RATING(state, rating) {
    state.rating = rating
  }
};
const actions = {
  async sendAvatar({commit, dispatch}, data) {
    try {
      const res = await apiClient.post('/mobile/load-avatar', data)
      console.log(res, 'sendAvatar')
    } catch (e) {

    }
  },
  async getRating({commit, dispatch}) {
    try {
      const {data: {data: data}} = await apiClient('/mobile/analytics')
      console.log(data, 'getRating')
      commit('SET_RATING', data)
    } catch (e) {

    }
  }
};
const getters = {};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
