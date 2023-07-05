import { getToken } from "@/helpers/access-token";

export default (api) => {
  api.Projects = {
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
  };
};
