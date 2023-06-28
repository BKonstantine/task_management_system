import { getProjects } from "@/api/projects";

export default {
  state: {
    projectsList: [],
    projectsDataRequest: false,
    projectsDataSuccess: false,
    projectsDataError: false,
  },
  mutations: {
    setProjectsList(state, payload) {
      state.projectsList = payload;
    },
    setProjectsDataRequest(state, payload) {
      state.projectsDataRequest = payload;
    },
    setProjectsDataSuccess(state, payload) {
      state.projectsDataSuccess = payload;
    },
    setProjectsDataError(state, payload) {
      state.projectsDataError = payload;
    },
  },
  getters: {},
  actions: {
    fetchProjects({ commit }, projectData) {
      commit("setProjectsDataRequest", true);
      getProjects(projectData)
        .then((data) => {
          commit("setProjectsList", data.projects);
          commit("setProjectsDataRequest", false);
          commit("setProjectsDataSuccess", true);
        })
        .catch(() => {
          commit("setProjectsDataSuccess", false);
          commit("setProjectsDataError", true);
        });
    },
  },
};
