import { getTasks } from "@/api/tasks";

export default {
  state: {
    tasksList: [],
    tasksDataRequest: false,
    tasksDataSuccess: false,
    tasksDataError: false,
  },
  mutations: {
    setTasksList(state, payload) {
      state.tasksList = payload;
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
  getters: {},
  actions: {
    fetchTasks({ commit }, taskData) {
      commit("setTasksDataRequest", true);
      getTasks(taskData)
        .then((data) => {
          commit("setTasksList", data);
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
