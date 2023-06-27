import { login } from "@/api/auth";
import { saveToken } from "@/helpers/access-token";

export default {
  state: {
    isAuth: false,
    isAuthRequest: false,
    isAuthSuccess: false,
    isAuthError: false,
  },
  mutations: {
    setAuth(state, payload) {
      state.isAuth = payload;
    },
    setAuthRequest(state, payload) {
      state.isAuthRequest = payload;
    },
    setAuthSuccess(state, payload) {
      state.isAuthSuccess = payload;
    },
    setAuthError(state, payload) {
      state.isAuthError = payload;
    },
  },
  getters: {},
  actions: {
    fetchLogin({ commit }) {
      commit("setAuthRequest", true);
      login()
        .then((data) => {
          saveToken(data.token);
          commit("setAuth", true);
          commit("setAuthRequest", false);
          commit("setAuthSuccess", false);
        })
        .catch(() => {
          commit("setAuthError", false);
        });
    },
  },
};
