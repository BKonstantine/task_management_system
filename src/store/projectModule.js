import { getProjects } from "@/api/projects";

export default {
  state: {
    projectsList: [],
    totalPage: null,
    projectsDataRequest: false,
    projectsDataSuccess: false,
    projectsDataError: false,
  },
  mutations: {
    setProjectsList(state, payload) {
      state.projectsList = payload;
    },
    setTotalPage(state, payload) {
      state.totalPage = payload;
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
  getters: {
    getProjectsLength(state) {
      return state.projectsList.length;
    },
  },
  actions: {
    fetchProjects({ commit }, projectData) {
      commit("setProjectsDataRequest", true);
      getProjects(projectData)
        .then((data) => {
          commit("setProjectsList", data.projects);
          commit("setTotalPage", data.total);
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
