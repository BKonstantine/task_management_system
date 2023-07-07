import api from "@/api";

export const mutation = {
  SET_TASKS_LIST: "SET_TASKS_LIST",
  SET_TASKS_CURRENT_PAGE: "SET_TASKS_CURRENT_PAGE",
  SET_TASKS_TOTAL_PAGE: "SET_TASKS_TOTAL_PAGE",
  SET_TASKS_LIST_REQUEST: "SET_TASKS_LIST_REQUEST",
  SET_TASKS_LIST_SUCCESS: "SET_TASKS_LIST_SUCCESS",
  SET_TASKS_LIST_ERROR: "SET_TASKS_LIST_ERROR",
  SET_FILTER_VALUE: "SET_FILTER_VALUE",
  SET_FILTERED: "SET_FILTERED",
  SET_SORT_VALUE: "SET_SORT_VALUE",
};

export default {
  namespaced: true,

  state: {
    tasksList: [],
    filterValue: null,
    sortValue: "name",
    currentPage: 1,
    filtered: false,
    totalPage: null,
    tasksDataRequest: false,
    tasksDataSuccess: false,
    tasksDataError: false,
  },

  mutations: {
    [mutation.SET_TASKS_LIST]: (state, payload) => {
      state.tasksList = payload;
    },
    [mutation.SET_TASKS_CURRENT_PAGE]: (state, payload) => {
      state.currentPage = payload;
    },
    [mutation.SET_TASKS_TOTAL_PAGE]: (state, payload) => {
      state.totalPage = payload;
    },
    [mutation.SET_TASKS_LIST_REQUEST]: (state, payload) => {
      state.tasksDataRequest = payload;
    },
    [mutation.SET_TASKS_LIST_SUCCESS]: (state, payload) => {
      state.tasksDataSuccess = payload;
    },
    [mutation.SET_TASKS_LIST_ERROR]: (state, payload) => {
      state.tasksDataError = payload;
    },
    [mutation.SET_FILTER_VALUE]: (state, payload) => {
      state.filterValue = payload;
    },
    [mutation.SET_SORT_VALUE]: (state, payload) => {
      state.sortValue = payload;
    },
    [mutation.SET_FILTERED]: (state, payload) => {
      state.filtered = payload;
    },
  },

  getters: {
    getTasksList: (state) => state.tasksList,
    getCurrentPage: (state) => state.currentPage,
    getTotalPage: (state) => state.totalPage,
    getRequestStatus: (state) => state.tasksDataRequest,
    getTasksLength: (state) => state.tasksList.length,
    getSortValue: (state) => state.sortValue,
    getFilterValue: (state) => state.filterValue,
    getTaskQuery: (state) => {
      const query = {
        sort: {
          field: state.sortValue,
          type: "desc",
        },
      };
      if (state.filterValue) {
        query.filter = { name: state.filterValue };
      }
      return query;
    },
    getFiltered: (state) => state.filtered,
  },

  actions: {
    fetchTasks: ({ commit, state }, taskData) => {
      commit(mutation.SET_TASKS_LIST_REQUEST, true);
      api.Tasks.getTasksRequest(taskData)
        .then(({ data }) => {
          if (state.currentPage > data.total) {
            api.Tasks.getTasksRequest({ ...taskData, page: data.total }).then(
              ({ data }) => {
                commit(mutation.SET_TASKS_LIST, data.tasks);
                commit(mutation.SET_TASKS_TOTAL_PAGE, data.total);
                commit(mutation.SET_TASKS_CURRENT_PAGE, data.total);
                commit(mutation.SET_TASKS_LIST_REQUEST, false);
                commit(mutation.SET_TASKS_LIST_SUCCESS, true);
              }
            );
          } else {
            commit(mutation.SET_TASKS_LIST, data.tasks);
            commit(mutation.SET_TASKS_TOTAL_PAGE, data.total);
            commit(mutation.SET_TASKS_LIST_REQUEST, false);
            commit(mutation.SET_TASKS_LIST_SUCCESS, true);
          }
        })
        .catch(() => {
          commit(mutation.SET_TASKS_LIST_REQUEST, false);
          commit(mutation.SET_TASKS_LIST_ERROR, true);
        })
        .finally(() => {
          if (state.filterValue) {
            commit(mutation.SET_FILTERED, true);
          } else {
            commit(mutation.SET_FILTERED, false);
          }
        });
    },

    fetchAllTasks: ({ commit }, taskData) => {
      commit(mutation.SET_TASKS_LIST_REQUEST, true);
      api.Tasks.getTasksRequest(taskData)
        .then(({ data }) => {
          if (data.total > 1) {
            api.Tasks.getTasksRequest({
              ...taskData,
              limit: data.total * 10,
            }).then(({ data }) => {
              commit(mutation.SET_TASKS_LIST, data.tasks);
              commit(mutation.SET_TASKS_LIST_REQUEST, false);
              commit(mutation.SET_TASKS_LIST_SUCCESS, true);
            });
          } else {
            commit(mutation.SET_TASKS_LIST, data.tasks);
            commit(mutation.SET_TASKS_LIST_REQUEST, false);
            commit(mutation.SET_TASKS_LIST_SUCCESS, true);
          }
        })
        .catch(() => {
          commit(mutation.SET_TASKS_LIST_REQUEST, false);
          commit(mutation.SET_TASKS_LIST_ERROR, true);
        });
    },

    setCurrentPage: ({ commit }, page) => {
      commit(mutation.SET_TASKS_CURRENT_PAGE, page);
    },

    setFilterValue: ({ commit }, payload) => {
      commit(mutation.SET_FILTER_VALUE, payload);
    },

    setClear: ({ commit }) => {
      commit(mutation.SET_FILTER_VALUE, null);
    },

    setSortValue: ({ commit }, payload) => {
      commit(mutation.SET_SORT_VALUE, payload);
    },
  },
};
