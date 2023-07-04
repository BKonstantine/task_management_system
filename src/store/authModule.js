import { login } from "@/api/auth";
import { saveToken } from "@/helpers/access-token";

export const mutation = {
  SET_AUTH: "SET_AUTH",
  SET_AUTH_REQUEST: "SET_AUTH_REQUEST",
  SET_AUTH_SUCCESS: "SET_AUTH_SUCCESS",
  SET_AUTH_ERROR: "SET_AUTH_ERROR",
};

export default {
  state: {
    isAuth: false,
    isAuthRequest: false,
    isAuthSuccess: false,
    isAuthError: false,
  },
  mutations: {
    [mutation.SET_AUTH]: (state, payload) => {
      state.isAuth = payload;
    },
    [mutation.SET_AUTH_REQUEST]: (state, payload) => {
      state.isAuthRequest = payload;
    },
    [mutation.SET_AUTH_SUCCESS]: (state, payload) => {
      state.isAuthSuccess = payload;
    },
    [mutation.SET_AUTH_ERROR]: (state, payload) => {
      state.isAuthError = payload;
    },
  },
  getters: {},
  actions: {
    fetchLogin: ({ commit }) => {
      commit(mutation.SET_AUTH_REQUEST, true);
      login()
        .then((data) => {
          saveToken(data.token);
          commit(mutation.SET_AUTH, true);
          commit(mutation.SET_AUTH_REQUEST, false);
          commit(mutation.SET_AUTH_SUCCESS, true);
        })
        .catch(() => {
          commit(mutation.SET_AUTH_ERROR, false);
        });
    },
  },
};
