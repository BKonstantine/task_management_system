import { getUsers } from "@/api/users";
import { abbreviateName } from "@/helpers/replace-text";

export const mutation = {
  SET_USERS_LIST: "SET_USERS_LIST",
  SET_USERS_CURRENT_PAGE: "SET_USERS_CURRENT_PAGE",
  SET_USERS_LIST_REQUEST: "SET_USERS_LIST_REQUEST",
  SET_USERS_LIST_SUCCESS: "SET_USERS_LIST_SUCCESS",
  SET_USERS_LIST_ERROR: "SET_USERS_LIST_ERROR",
};

export default {
  state: {
    usersList: [],
    currentPage: 1,
    usersListRequest: false,
    usersListSuccess: false,
    usersListError: false,
  },
  mutations: {
    [mutation.SET_USERS_LIST]: (state, payload) => {
      state.usersList = payload;
    },
    [mutation.SET_USERS_CURRENT_PAGE]: (state, payload) => {
      state.currentPage = payload;
    },
    [mutation.SET_USERS_LIST_REQUEST]: (state, payload) => {
      state.usersListRequest = payload;
    },
    [mutation.SET_USERS_LIST_SUCCESS]: (state, payload) => {
      state.usersListSuccess = payload;
    },
    [mutation.SET_USERS_LIST_ERROR]: (state, payload) => {
      state.usersListError = payload;
    },
  },
  getters: {
    getUsersList: (state) => state.usersList,
    getUsersRequestStatus: (state) => state.usersListRequest,
    getUsersLength: (state) => state.usersList.length,
    getCurrentUsersPage: (state) => state.currentPage,
    getUsersTotalPage: (state) => Math.ceil(state.usersList.length / 10),
    findUser: (state) => (id) =>
      state.usersList.find((user) => user._id === id),
    getUsersForOptions: (state) =>
      state.usersList.map((user) => {
        return { label: abbreviateName(user.name), value: user._id };
      }),
    getUsersPage: (state) => (page) => {
      const startIndex = (page - 1) * 10;
      const endIndex = startIndex + 10;
      return state.usersList.slice(startIndex, endIndex);
    },
  },
  actions: {
    fetchUsers({ commit }, userData) {
      commit(mutation.SET_USERS_LIST_REQUEST, true);
      getUsers(userData)
        .then((data) => {
          getUsers({ ...userData, limit: data.total * 10 }).then((data) => {
            commit(mutation.SET_USERS_LIST, data.users);
            commit(mutation.SET_USERS_LIST_REQUEST, false);
            commit(mutation.SET_USERS_LIST_SUCCESS, true);
          });
        })
        .catch(() => {
          commit(mutation.SET_USERS_LIST_REQUEST, false);
          commit(mutation.SET_USERS_LIST_ERROR, true);
        });
    },

    setCurrentUsersPage: ({ commit }, page) => {
      commit(mutation.SET_USERS_CURRENT_PAGE, page);
    },
  },
};
