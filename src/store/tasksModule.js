import { getTasksRequest } from "@/api/tasks";

export const mutation = {
  SET_TASKS_LIST: "SET_TASKS_LIST",
  SET_TASKS_CURRENT_PAGE: "SET_TASKS_CURRENT_PAGE",
  SET_TASKS_TOTAL_PAGE: "SET_TASKS_TOTAL_PAGE",
  SET_TASKS_LIST_REQUEST: "SET_TASKS_LIST_REQUEST",
  SET_TASKS_LIST_SUCCESS: "SET_TASKS_LIST_SUCCESS",
  SET_TASKS_LIST_ERROR: "SET_TASKS_LIST_ERROR",
};

export default {
  state: {
    tasksList: [],
    currentPage: 1,
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
  },
  getters: {
    getTasksList: (state) => state.tasksList,
    getCurrentTasksPage: (state) => state.currentPage,
    getTasksTotalPage: (state) => state.totalPage,
    getTasksRequestStatus: (state) => state.tasksDataRequest,
    getTasksLength: (state) => state.tasksList.length,
  },
  actions: {
    fetchTasks: ({ commit }, taskData) => {
      commit(mutation.SET_TASKS_LIST_REQUEST, true);
      getTasksRequest(taskData)
        .then((data) => {
          commit(mutation.SET_TASKS_LIST, data.tasks);
          commit(mutation.SET_TASKS_TOTAL_PAGE, data.total);
          commit(mutation.SET_TASKS_LIST_REQUEST, false);
          commit(mutation.SET_TASKS_LIST_SUCCESS, true);
        })
        .catch(() => {
          commit(mutation.SET_TASKS_LIST_REQUEST, false);
          commit(mutation.SET_TASKS_LIST_ERROR, true);
        });
    },

    setCurrentTasksPage: ({ commit }, page) => {
      commit(mutation.SET_TASKS_CURRENT_PAGE, page);
    },
  },
};
