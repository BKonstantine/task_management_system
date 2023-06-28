import { getTasks } from "@/api/tasks";

export default {
  state: {
    tasksList: [],
    tasksListRequest: false,
    tasksListSuccess: false,
    tasksListError: false,
  },
  mutations: {
    setTasksList(state, payload) {
      state.tasksList = payload;
    },
    setTasksListRequest(state, payload) {
      state.tasksListRequest = payload;
    },
    setTasksListSuccess(state, payload) {
      state.tasksListSuccess = payload;
    },
    setTasksListError(state, payload) {
      state.tasksListError = payload;
    },
  },
  getters: {},
  actions: {
    fetchTasks({ commit }, taskData) {
      commit("setTasksListRequest", true);
      getTasks(taskData)
        .then((data) => {
          commit("setTasksList", data.tasks);
          commit("setTasksListRequest", false);
          commit("setTasksListSuccess", true);
        })
        .catch(() => {
          commit("setTasksListSuccess", false);
          commit("setTasksListError", true);
        });
    },
  },
};
