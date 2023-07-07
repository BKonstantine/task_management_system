import api from "@/api";
import { abbreviateName } from "@/helpers/replace-text";

export const mutation = {
  SET_USERS_LIST: "SET_USERS_LIST",
  SET_USERS_CURRENT_PAGE: "SET_USERS_CURRENT_PAGE",
  SET_USERS_TOTAL_PAGE: "SET_USERS_TOTAL_PAGE",
  SET_USERS_LIST_REQUEST: "SET_USERS_LIST_REQUEST",
  SET_USERS_LIST_SUCCESS: "SET_USERS_LIST_SUCCESS",
  SET_USERS_LIST_ERROR: "SET_USERS_LIST_ERROR",
  SET_FILTER_VALUE: "SET_FILTER_VALUE",
  SET_FILTERED: "SET_FILTERED",
};

export default {
  namespaced: true,

  state: {
    usersList: [],
    filterValue: null,
    currentPage: 1,
    filtered: false,
    totalPage: null,
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
    [mutation.SET_USERS_TOTAL_PAGE]: (state, payload) => {
      state.totalPage = payload;
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
    [mutation.SET_FILTER_VALUE]: (state, payload) => {
      state.filterValue = payload;
    },
    [mutation.SET_FILTERED]: (state, payload) => {
      state.filtered = payload;
    },
  },
  getters: {
    getUsersList: (state) => state.usersList,
    getRequestStatus: (state) => state.usersListRequest,
    getUsersLength: (state) => state.usersList.length,
    getCurrentPage: (state) => state.currentPage,
    getTotalPage: (state) => state.totalPage,
    findUser: (state) => (id) =>
      state.usersList.find((user) => user._id === id),
    getUsersForOptions: (state) =>
      state.usersList.map((user) => {
        return { label: abbreviateName(user.name), value: user._id };
      }),
    getUserQuery: (state) => {
      const query = {};
      if (state.filterValue) {
        query.filter = { name: state.filterValue };
      }
      return query;
    },
    getFiltered: (state) => state.filtered,
    getFilterValue: (state) => state.filterValue,
  },
  actions: {
    fetchUsers: ({ commit, state }, userData) => {
      commit(mutation.SET_USERS_LIST_REQUEST, true);
      api.Users.getUsersRequest(userData)
        .then(({ data }) => {
          if (state.currentPage > data.total) {
            api.Users.getUsersRequest({ ...userData, page: data.total }).then(
              ({ data }) => {
                commit(mutation.SET_USERS_LIST, data.users);
                commit(mutation.SET_USERS_TOTAL_PAGE, data.total);
                commit(mutation.SET_USERS_LIST_REQUEST, false);
                commit(mutation.SET_USERS_LIST_SUCCESS, true);
              }
            );
          } else {
            commit(mutation.SET_USERS_LIST, data.users);
            commit(mutation.SET_USERS_TOTAL_PAGE, data.total);
            commit(mutation.SET_USERS_LIST_REQUEST, false);
            commit(mutation.SET_USERS_LIST_SUCCESS, true);
          }
        })
        .catch(() => {
          commit(mutation.SET_USERS_LIST_REQUEST, false);
          commit(mutation.SET_USERS_LIST_ERROR, true);
        })
        .finally(() => {
          if (state.filterValue) {
            commit(mutation.SET_FILTERED, true);
          } else {
            commit(mutation.SET_FILTERED, false);
          }
        });
    },

    fetchAllUsers: ({ commit }, userData) => {
      commit(mutation.SET_USERS_LIST_REQUEST, true);
      api.Users.getUsersRequest(userData)
        .then(({ data }) => {
          if (data.total > 1) {
            api.Users.getUsersRequest({
              ...userData,
              limit: data.total * 10,
            }).then(({ data }) => {
              commit(mutation.SET_USERS_LIST, data.users);
              commit(mutation.SET_USERS_LIST_REQUEST, false);
              commit(mutation.SET_USERS_LIST_SUCCESS, true);
            });
          } else {
            commit(mutation.SET_USERS_LIST, data.users);
            commit(mutation.SET_USERS_LIST_REQUEST, false);
            commit(mutation.SET_USERS_LIST_SUCCESS, true);
          }
        })
        .catch(() => {
          commit(mutation.SET_USERS_LIST_REQUEST, false);
          commit(mutation.SET_USERS_LIST_ERROR, true);
        });
    },

    setCurrentPage: ({ commit }, page) => {
      commit(mutation.SET_USERS_CURRENT_PAGE, page);
    },
    setFilterValue: ({ commit }, payload) => {
      commit(mutation.SET_FILTER_VALUE, payload);
    },

    setClear: ({ commit }) => {
      commit(mutation.SET_FILTER_VALUE, null);
    },
  },
};
