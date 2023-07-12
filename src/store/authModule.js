import { checkToken } from "@/helpers/access-token";

export const mutation = {
  SET_AUTH: "SET_AUTH",
  SET_AUTH_REQUEST: "SET_AUTH_REQUEST",
};

export default {
  namespaced: true,
  state: {
    isAuth: false,
    isAuthRequest: false,
  },
  mutations: {
    [mutation.SET_AUTH]: (state, payload) => {
      state.isAuth = payload;
    },
    [mutation.SET_AUTH_REQUEST]: (state, payload) => {
      state.isAuthRequest = payload;
    },
  },
  getters: {
    getAuth: (state) => state.isAuth,
    getAuthRequest: (state) => state.isAuthRequest,
  },
  actions: {
    setAuth: ({ commit }, payload) => {
      commit(mutation.SET_AUTH, payload);
    },

    checkAuth: ({ commit, state }) => {
      const token = checkToken("accessToken");
      if (token && !state.isAuth) {
        commit(mutation.SET_AUTH, true);
      }
    },
  },
};
