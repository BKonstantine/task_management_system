import { getToken } from "@/helpers/access-token";

export default (api) => {
  api.Tasks = {
    getTasksRequest(data) {
      return api.instance.request({
        method: "post",
        url: `/tasks/search`,
        headers: {
          Authorization: getToken(),
        },
        data: data,
      });
    },

    createTaskRequest(data) {
      return api.instance.request({
        method: "post",
        url: `/tasks`,
        headers: {
          Authorization: getToken(),
        },
        data: data,
      });
    },

    getCurrentTaskRequest(id) {
      return api.instance.request({
        method: "get",
        url: `/tasks/${id}`,
        headers: {
          Authorization: getToken(),
        },
      });
    },
  };
};
