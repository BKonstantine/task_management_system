export const mutation = {
  SET_LOADER: "SET_LOADER",
};

export default {
  namespaced: true,
  state: {
    loader: false,
  },
  mutations: {
    [mutation.SET_LOADER]: (state, payload) => {
      state.loader = payload;
    },
  },
  getters: {},
  actions: {},
};
