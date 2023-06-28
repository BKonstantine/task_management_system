import { getProjects } from "@/api/projects";

export default {
  state: {
    projectsList: [],
    projectsListRequest: false,
    projectsListSuccess: false,
    projectsListError: false,
  },
  mutations: {
    setProjectsList(state, payload) {
      state.projectsList = payload;
    },
    setProjectsListRequest(state, payload) {
      state.projectsListRequest = payload;
    },
    setProjectsListSuccess(state, payload) {
      state.projectsListSuccess = payload;
    },
    setProjectsListError(state, payload) {
      state.projectsListError = payload;
    },
  },
  getters: {},
  actions: {
    fetchProjects({ commit }, projectData) {
      commit("setProjectsListRequest", true);
      getProjects(projectData)
        .then((data) => {
          commit("setProjectsList", data);
          commit("setProjectsListRequest", false);
          commit("setProjectsListSuccess", true);
        })
        .catch(() => {
          commit("setProjectsListSuccess", false);
          commit("setProjectsListError", true);
        });
    },
  },
};
