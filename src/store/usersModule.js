import { getUsers } from "@/api/users";

export default {
  state: {
    usersList: [],
    usersListRequest: false,
    usersListSuccess: false,
    usersListError: false,
  },
  mutations: {
    setUsersList(state, payload) {
      state.usersList = payload;
    },
    setUsersListRequest(state, payload) {
      state.usersListRequest = payload;
    },
    setUsersListSuccess(state, payload) {
      state.usersListSuccess = payload;
    },
    setUsersListError(state, payload) {
      state.usersListError = payload;
    },
  },
  getters: {
    findUser: (state) => (id) => {
      return state.usersList.find((user) => user._id === id);
    },
  },
  actions: {
    fetchUsers({ commit }, userData) {
      commit("setUsersListRequest", true);
      getUsers(userData)
        .then((data) => {
          commit("setUsersList", data.users);
          commit("setUsersListRequest", false);
          commit("setUsersListSuccess", true);
        })
        .catch(() => {
          commit("setUsersListSuccess", false);
          commit("setUsersListError", true);
        });
    },
  },
};
