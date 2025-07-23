import {apiClient} from "src/services/api";

const state = {
  reviews: null
};
const mutations = {
  SET_REVIEWS(state, reviews) {
    state.reviews = reviews;
  },
};
const actions = {
  async getReviews({commit, dispatch}) {
    try {
      const {data: {data: data}} = await apiClient.get('/comment/staff')
      commit('SET_REVIEWS', data)
      return data
    } catch (e) {

    }
  }
};
const getters = {
  ShowReviews(state) {
    if (state.reviews) {
      return state.reviews
    }
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
