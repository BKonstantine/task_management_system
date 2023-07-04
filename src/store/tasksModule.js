import { getTasksRequest } from "@/api/tasks";

export const mutation = {
  SET_TASKS_LIST: "SET_TASKS_LIST",
  SET_TASKS_CURRENT_PAGE: "SET_TASKS_CURRENT_PAGE",
  SET_TASKS_LIST_REQUEST: "SET_TASKS_LIST_REQUEST",
  SET_TASKS_LIST_SUCCESS: "SET_TASKS_LIST_SUCCESS",
  SET_TASKS_LIST_ERROR: "SET_TASKS_LIST_ERROR",
};

export default {
  state: {
    tasksList: [],
    currentPage: 1,
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
    getTasksTotalPage: (state) => Math.ceil(state.tasksList.length / 10),
    getTasksRequestStatus: (state) => state.tasksDataRequest,
    getTasksLength: (state) => state.tasksList.length,
    getTasksPage: (state) => (page) => {
      const startIndex = (page - 1) * 10;
      const endIndex = startIndex + 10;
      return state.tasksList.slice(startIndex, endIndex);
    },
  },
  actions: {
    fetchTasks: ({ commit }, taskData) => {
      commit(mutation.SET_TASKS_LIST_REQUEST, true);
      getTasksRequest(taskData)
        .then((data) => {
          getTasksRequest({ ...taskData, limit: data.total * 10 }).then(
            (data) => {
              commit(mutation.SET_TASKS_LIST, data.tasks);
              commit(mutation.SET_TASKS_LIST_REQUEST, false);
              commit(mutation.SET_TASKS_LIST_SUCCESS, true);
            }
          );
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
