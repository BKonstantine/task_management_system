import { getProjects } from "@/api/projects";

export const mutation = {
  SET_PROJECTS_LIST: "SET_PROJECT_LIST",
  SET_PROJECTS_CURRENT_PAGE: "SET_CURRENT_PAGE",
  SET_PROJECTS_LIST_REQUEST: "SET_PROJECT_LIST_REQUEST",
  SET_PROJECTS_LIST_SUCCESS: "SET_PROJECT_LIST_SUCCESS",
  SET_PROJECTS_LIST_ERROR: "SET_PROJECT_LIST_ERROR",
};

export default {
  state: {
    projectsList: [],
    currentPage: 1,
    projectsDataRequest: false,
    projectsDataSuccess: false,
    projectsDataError: false,
  },
  mutations: {
    [mutation.SET_PROJECTS_LIST]: (state, payload) => {
      state.projectsList = payload;
    },
    [mutation.SET_PROJECTS_CURRENT_PAGE]: (state, payload) => {
      state.currentPage = payload;
    },
    [mutation.SET_PROJECTS_LIST_REQUEST]: (state, payload) => {
      state.projectsDataRequest = payload;
    },
    [mutation.SET_PROJECTS_LIST_SUCCESS]: (state, payload) => {
      state.projectsDataSuccess = payload;
    },
    [mutation.SET_PROJECTS_LIST_ERROR]: (state, payload) => {
      state.projectsDataError = payload;
    },
  },
  getters: {
    getProjectList: (state) => state.projectsList,
    getCurrentProjectPage: (state) => state.currentPage,
    getProjectsTotalPage: (state) => Math.ceil(state.projectsList.length / 10),
    getProjectRequestStatus: (state) => state.projectsDataRequest,
    getProjectsLength: (state) => state.projectsList.length,
    getProjectsForOptions: (state) =>
      state.projectsList.map((project) => {
        return { label: project.name, value: project._id };
      }),
  },
  actions: {
    fetchProjects: ({ commit }, projectData) => {
      commit(mutation.SET_PROJECTS_LIST_REQUEST, true);
      getProjects(projectData)
        .then((data) => {
          getProjects({ ...projectData, limit: data.total * 10 }).then(
            (data) => {
              commit(mutation.SET_PROJECTS_LIST, data.projects);
              commit(mutation.SET_PROJECTS_LIST_REQUEST, false);
              commit(mutation.SET_PROJECTS_LIST_SUCCESS, true);
            }
          );
        })
        .catch(() => {
          commit(mutation.SET_PROJECTS_LIST_REQUEST, false);
          commit(mutation.SET_PROJECTS_LIST_ERROR, true);
        });
    },

    setCurrentProjectPage: ({ commit }, page) => {
      commit(mutation.SET_PROJECTS_CURRENT_PAGE, page);
    },
  },
};
