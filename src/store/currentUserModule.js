import { getCurrentUser } from "@/api/user";

export default {
  state: {
    currentUser: null,
    currentUserRequest: false,
    currentUserSuccess: false,
    currentUserError: false,
  },
  mutations: {
    setCurrentUser(state, payload) {
      state.currentUser = payload;
    },
    setCurrentUserRequest(state, payload) {
      state.currentUserRequest = payload;
    },
    setCurrentUserSuccess(state, payload) {
      state.currentUserSuccess = payload;
    },
    setCurrentUserError(state, payload) {
      state.currentUserError = payload;
    },
  },
  getters: {},
  actions: {
    fetchCurrentUser({ commit }) {
      commit("setCurrentUserRequest", true);
      getCurrentUser()
        .then((data) => {
          commit("setCurrentUser", data);
          commit("setCurrentUserRequest", false);
          commit("setCurrentUserSuccess", true);
        })
        .catch(() => {
          commit("setCurrentUserRequest", false);
          commit("setCurrentUserError", true);
        });
    },
  },
};
