import { getCurrentUserRequest } from "@/api/current-user";

export const mutation = {
  SET_CURRENT_USER: "SET_CURRENT_USER",
  SET_CURRENT_USER_REQUEST: "SET_CURRENT_USER_REQUEST",
  SET_CURRENT_USER_SUCCESS: "SET_CURRENT_USER_SUCCESS",
  SET_CURRENT_USER_ERROR: "SET_CURRENT_USER_ERROR",
};

export default {
  state: {
    currentUser: null,
    currentUserRequest: false,
    currentUserSuccess: false,
    currentUserError: false,
  },
  mutations: {
    [mutation.SET_CURRENT_USER]: (state, payload) => {
      state.currentUser = payload;
    },
    [mutation.SET_CURRENT_USER_REQUEST]: (state, payload) => {
      state.currentUserRequest = payload;
    },
    [mutation.SET_CURRENT_USER_SUCCESS]: (state, payload) => {
      state.currentUserSuccess = payload;
    },
    [mutation.SET_CURRENT_USER_ERROR]: (state, payload) => {
      state.currentUserError = payload;
    },
  },
  getters: {
    getCurrentUser: (state) => state.currentUser,
    getRequestStatus: (state) => state.currentUserRequest,
  },
  actions: {
    fetchCurrentUser: ({ commit }) => {
      commit(mutation.SET_CURRENT_USER_REQUEST, true);
      getCurrentUserRequest()
        .then((data) => {
          commit(mutation.SET_CURRENT_USER, data);
          commit(mutation.SET_CURRENT_USER_REQUEST, false);
          commit(mutation.SET_CURRENT_USER_SUCCESS, true);
        })
        .catch(() => {
          commit(mutation.SET_CURRENT_USER_REQUEST, false);
          commit(mutation.SET_CURRENT_USER_ERROR, true);
        });
    },
  },
};
