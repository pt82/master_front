const state = {
  layout: "default-layout"
};
const mutations = {
  setLayout(state, payload) {
    state.layout = payload;
  }
};
const actions = {};
const getters = {
  layout(state) {
    return state.layout;
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
