import { getProjects } from "@/api/projects";

export const mutation = {
  SET_PROJECTS_LIST: "SET_PROJECT_LIST",
  SET_PROJECTS_CURRENT_PAGE: "SET_PROJECTS_CURRENT_PAGE",
  SET_PROJECTS_TOTAL_PAGE: "SET_PROJECTS_TOTAL_PAGE",
  SET_PROJECTS_LIST_REQUEST: "SET_PROJECT_LIST_REQUEST",
  SET_PROJECTS_LIST_SUCCESS: "SET_PROJECT_LIST_SUCCESS",
  SET_PROJECTS_LIST_ERROR: "SET_PROJECT_LIST_ERROR",
  SET_FILTER_VALUE: "SET_FILTER_VALUE",
  SET_CLEAR_FILTER_VALUE: "SET_CLEAR_FILTER_VALUE",
  SET_SORT_VALUE: "SET_SORT_VALUE",
};

export default {
  state: {
    projectsList: [],
    filterValue: null,
    sortValue: "name",
    currentPage: 1,
    totalPage: null,
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
    [mutation.SET_PROJECTS_TOTAL_PAGE]: (state, payload) => {
      state.totalPage = payload;
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
    [mutation.SET_FILTER_VALUE]: (state, payload) => {
      state.filterValue = payload;
    },
    [mutation.SET_CLEAR_FILTER_VALUE]: (state) => {
      state.filterValue = null;
    },
    [mutation.SET_SORT_VALUE]: (state, payload) => {
      state.sortValue = payload;
    },
  },
  getters: {
    getProjectsList: (state) => state.projectsList,
    getCurrentProjectsPage: (state) => state.currentPage,
    getProjectsTotalPage: (state) => state.totalPage,
    getProjectsRequestStatus: (state) => state.projectsDataRequest,
    getProjectsLength: (state) => state.projectsList.length,
    getProjectsForOptions: (state) =>
      state.projectsList.map((project) => {
        return { label: project.name, value: project._id };
      }),
    getSortValue: (state) => state.sortValue,
    getFilterValue: (state) => state.filterValue,
  },
  actions: {
    fetchProjects: ({ commit }, projectData) => {
      commit(mutation.SET_PROJECTS_LIST_REQUEST, true);
      getProjects(projectData)
        .then((data) => {
          commit(mutation.SET_PROJECTS_LIST, data.projects);
          commit(mutation.SET_PROJECTS_TOTAL_PAGE, data.total);
          commit(mutation.SET_PROJECTS_LIST_REQUEST, false);
          commit(mutation.SET_PROJECTS_LIST_SUCCESS, true);
        })
        .catch(() => {
          commit(mutation.SET_PROJECTS_LIST_REQUEST, false);
          commit(mutation.SET_PROJECTS_LIST_ERROR, true);
        });
    },

    /* fetchAllProjects: ({ commit }, projectData) => {
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
    }, */

    setCurrentProjectsPage: ({ commit }, page) => {
      commit(mutation.SET_PROJECTS_CURRENT_PAGE, page);
    },

    setFilterValue: ({ commit }, payload) => {
      commit(mutation.SET_FILTER_VALUE, payload);
    },

    setClearFilterValue: ({ commit }) => {
      commit(mutation.SET_CLEAR_FILTER_VALUE);
    },

    setSortValue: ({ commit }, payload) => {
      commit(mutation.SET_SORT_VALUE, payload);
    },
  },
};
