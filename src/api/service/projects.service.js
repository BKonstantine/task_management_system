import { getToken } from "@/helpers/access-token";

export default (api) => {
  api.Projects = {
    getProjectsRequest(data) {
      return api.instance.request({
        method: "post",
        url: `/projects/search`,
        headers: {
          Authorization: getToken(),
        },
        data: data,
      });
    },

    createProjectRequest(data) {
      return api.instance.request({
        method: "post",
        url: `/projects`,
        headers: {
          Authorization: getToken(),
        },
        data: data,
      });
    },

    editProjectsRequest(data) {
      return api.instance.request({
        method: "put",
        url: `/projects`,
        headers: {
          Authorization: getToken(),
        },
        data: data,
      });
    },

    deleteProjectsRequest(id) {
      return api.instance.request({
        method: "delete",
        url: `/projects/${id}`,
        headers: {
          Authorization: getToken(),
        },
      });
    },
  };
};
