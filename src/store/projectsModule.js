import api from "@/api";

export const mutation = {
  SET_PROJECTS_LIST: "SET_PROJECTS_LIST",
  SET_PROJECTS_CURRENT_PAGE: "SET_PROJECTS_CURRENT_PAGE",
  SET_PROJECTS_TOTAL_PAGE: "SET_PROJECTS_TOTAL_PAGE",
  SET_PROJECTS_LIST_REQUEST: "SET_PROJECTS_LIST_REQUEST",
  SET_PROJECTS_LIST_SUCCESS: "SET_PROJECTS_LIST_SUCCESS",
  SET_PROJECTS_LIST_ERROR: "SET_PROJECTS_LIST_ERROR",
  SET_FILTER_VALUE: "SET_FILTER_VALUE",
  SET_SORT_VALUE: "SET_SORT_VALUE",
};

export default {
  namespaced: true,

  state: {
    projectsList: [],
    filterValue: null,
    sortValue: "name",
    currentPage: 1,
    totalPage: null,
    projectsListRequest: false,
    projectsListSuccess: false,
    projectsListError: false,
  },

  mutations: {
    [mutation.SET_PROJECTS_LIST]: (state, payload) => {
      state.projectsList = payload;
    },
    [mutation.SET_PROJECTS_CURRENT_PAGE]: (state, payload) => {
      state.currentPage = payload;
    },
    [mutation.SET_PROJECTS_TOTAL_PAGE]: (state, payload) => {
      state.totalPage = payload;
    },
    [mutation.SET_PROJECTS_LIST_REQUEST]: (state, payload) => {
      state.projectsListRequest = payload;
    },
    [mutation.SET_PROJECTS_LIST_SUCCESS]: (state, payload) => {
      state.projectsListSuccess = payload;
    },
    [mutation.SET_PROJECTS_LIST_ERROR]: (state, payload) => {
      state.projectsListError = payload;
    },
    [mutation.SET_FILTER_VALUE]: (state, payload) => {
      state.filterValue = payload;
    },
    [mutation.SET_SORT_VALUE]: (state, payload) => {
      state.sortValue = payload;
    },
  },

  getters: {
    getProjectsList: (state) => state.projectsList,
    getCurrentPage: (state) => state.currentPage,
    getTotalPage: (state) => state.totalPage,
    getRequestStatus: (state) => state.projectsListRequest,
    getProjectsLength: (state) => state.projectsList.length,
    getProjectsForOptions: (state) =>
      state.projectsList.map((project) => {
        return { label: project.name, value: project._id };
      }),
    getSortValue: (state) => state.sortValue,
    getFilterValue: (state) => state.filterValue,
  },

  actions: {
    fetchProjects: ({ commit, state }, projectData) => {
      commit(mutation.SET_PROJECTS_LIST_REQUEST, true);
      api.Projects.getProjectsRequest(projectData)
        .then(({ data }) => {
          if (state.currentPage > data.total) {
            api.Projects.getProjectsRequest({
              ...projectData,
              page: data.total,
            }).then(({ data }) => {
              commit(mutation.SET_PROJECTS_LIST, data.projects);
              commit(mutation.SET_PROJECTS_TOTAL_PAGE, data.total);
              commit(mutation.SET_PROJECTS_LIST_REQUEST, false);
              commit(mutation.SET_PROJECTS_LIST_SUCCESS, true);
            });
          } else {
            commit(mutation.SET_PROJECTS_LIST, data.projects);
            commit(mutation.SET_PROJECTS_TOTAL_PAGE, data.total);
            commit(mutation.SET_PROJECTS_LIST_REQUEST, false);
            commit(mutation.SET_PROJECTS_LIST_SUCCESS, true);
          }
        })
        .catch(() => {
          commit(mutation.SET_PROJECTS_LIST_REQUEST, false);
          commit(mutation.SET_PROJECTS_LIST_ERROR, true);
        });
    },

    fetchAllProjects: ({ commit }, projectData) => {
      commit(mutation.SET_PROJECTS_LIST_REQUEST, true);
      api.Projects.getProjectsRequest(projectData)
        .then(({ data }) => {
          if (data.total > 1) {
            api.Projects.getProjectsRequest({
              ...projectData,
              limit: data.total * 10,
            }).then(({ data }) => {
              commit(mutation.SET_PROJECTS_LIST, data.projects);
              commit(mutation.SET_PROJECTS_LIST_REQUEST, false);
              commit(mutation.SET_PROJECTS_LIST_SUCCESS, true);
            });
          } else {
            commit(mutation.SET_PROJECTS_LIST, data.projects);
            commit(mutation.SET_PROJECTS_LIST_REQUEST, false);
            commit(mutation.SET_PROJECTS_LIST_SUCCESS, true);
          }
        })
        .catch(() => {
          commit(mutation.SET_PROJECTS_LIST_REQUEST, false);
          commit(mutation.SET_PROJECTS_LIST_ERROR, true);
        });
    },

    setCurrentPage: ({ commit }, page) => {
      commit(mutation.SET_PROJECTS_CURRENT_PAGE, page);
    },

    setFilterValue: ({ commit }, payload) => {
      commit(mutation.SET_FILTER_VALUE, payload);
    },

    setClear: ({ commit }) => {
      commit(mutation.SET_FILTER_VALUE, null);
    },

    setSortValue: ({ commit }, payload) => {
      commit(mutation.SET_SORT_VALUE, payload);
    },
  },
};
