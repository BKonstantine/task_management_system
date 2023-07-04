import { getProjects } from "@/api/projects";

export const mutation = {
  SET_PROJECT_LIST: "SET_PROJECT_LIST",
  SET_TOTAL_PAGE: "SET_TOTAL_PAGE",
  SET_PROJECT_LIST_REQUEST: "SET_PROJECT_LIST_REQUEST",
  SET_PROJECT_LIST_SUCCESS: "SET_PROJECT_LIST_SUCCESS",
  SET_PROJECT_LIST_ERROR: "SET_PROJECT_LIST_ERROR",
};

export default {
  state: {
    projectsList: [],
    totalPage: null,
    projectsDataRequest: false,
    projectsDataSuccess: false,
    projectsDataError: false,
  },
  mutations: {
    [mutation.SET_PROJECT_LIST]: (state, payload) => {
      state.projectsList = payload;
    },
    [mutation.SET_TOTAL_PAGE]: (state, payload) => {
      state.totalPage = payload;
    },
    [mutation.SET_PROJECT_LIST_REQUEST]: (state, payload) => {
      state.projectsDataRequest = payload;
    },
    [mutation.SET_PROJECT_LIST_SUCCESS]: (state, payload) => {
      state.projectsDataSuccess = payload;
    },
    [mutation.SET_PROJECT_LIST_ERROR]: (state, payload) => {
      state.projectsDataError = payload;
    },
  },
  getters: {
    getProjectList: (state) => state.projectsList,
    getProjectsTotalPage: (state) => state.totalPage,
    getProjectRequestStatus: (state) => state.projectsDataRequest,
    getProjectsLength: (state) => state.projectsList.length,
    getProjectsForOptions: (state) =>
      state.projectsList.map((project) => {
        return { label: project.name, value: project._id };
      }),
  },
  actions: {
    fetchProjects: ({ commit }, projectData) => {
      commit(mutation.SET_PROJECT_LIST_REQUEST, true);
      getProjects(projectData)
        .then((data) => {
          commit(mutation.SET_PROJECT_LIST, data.projects);
          commit(mutation.SET_TOTAL_PAGE, data.total);
          commit(mutation.SET_PROJECT_LIST_REQUEST, false);
          commit(mutation.SET_PROJECT_LIST_SUCCESS, true);
        })
        .catch(() => {
          commit(mutation.SET_PROJECT_LIST_REQUEST, false);
          commit(mutation.SET_PROJECT_LIST_ERROR, true);
        });
    },
  },
};
