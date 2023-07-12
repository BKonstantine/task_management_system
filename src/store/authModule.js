import { checkToken } from "@/helpers/access-token";

export const mutation = {
  SET_AUTH: "SET_AUTH",
  SET_AUTH_REQUEST: "SET_AUTH_REQUEST",
  SET_AUTH_SUCCESS: "SET_AUTH_SUCCESS",
  SET_AUTH_ERROR: "SET_AUTH_ERROR",
};

export default {
  namespaced: true,
  state: {
    isAuth: checkToken("accessToken"),
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
  actions: {},
};
