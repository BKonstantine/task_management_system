import { getTasksRequest } from "@/api/tasks";

export default {
  state: {
    tasksList: [],
    totalPage: null,
    tasksDataRequest: false,
    tasksDataSuccess: false,
    tasksDataError: false,
  },
  mutations: {
    setTasksList(state, payload) {
      state.tasksList = payload;
    },
    setTasksTotalPage(state, payload) {
      state.totalPage = payload;
    },
    setTasksDataRequest(state, payload) {
      state.tasksDataRequest = payload;
    },
    setTasksDataSuccess(state, payload) {
      state.tasksDataSuccess = payload;
    },
    setTasksDataError(state, payload) {
      state.tasksDataError = payload;
    },
  },
  getters: {
    getTasksList(state) {
      return state.tasksList;
    },
    getTasksTotalPage(state) {
      return state.totalPage;
    },
    getTasksRequestStatus(state) {
      return state.tasksDataRequest;
    },
    getTasksLength(state) {
      return state.tasksList.length;
    },
  },
  actions: {
    fetchTasks({ commit }, taskData) {
      commit("setTasksDataRequest", true);
      getTasksRequest(taskData)
        .then((data) => {
          commit("setTasksList", data.tasks);
          commit("setTasksTotalPage", data.total);
          commit("setTasksDataRequest", false);
          commit("setTasksDataSuccess", true);
        })
        .catch(() => {
          commit("setTasksDataSuccess", false);
          commit("setTasksDataError", true);
        });
    },
  },
};
