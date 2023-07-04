import { getUsers } from "@/api/users";
import { abbreviateName } from "@/helpers/replace-text";

export const mutation = {
  SET_USERS_LIST: "SET_USERS_LIST",
  SET_USERS_LIST_REQUEST: "SET_USERS_LIST_REQUEST",
  SET_USERS_LIST_SUCCESS: "SET_USERS_LIST_SUCCESS",
  SET_USERS_LIST_ERROR: "SET_USERS_LIST_ERROR",
};

export default {
  state: {
    usersList: [],
    usersListRequest: false,
    usersListSuccess: false,
    usersListError: false,
  },
  mutations: {
    [mutation.SET_USERS_LIST]: (state, payload) => {
      state.usersList = payload;
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
    getUsersTotalPage: (state) => Math.ceil(state.usersList.length / 10),
    findUser: (state) => (id) =>
      state.usersList.find((user) => user._id === id),
    getUsersForOptions: (state) =>
      state.usersList.map((user) => {
        return { label: abbreviateName(user.name), value: user._id };
      }),
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
  },
};
