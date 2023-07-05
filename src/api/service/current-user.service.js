import { getToken } from "@/helpers/access-token";

export default (api) => {
  api.CurrentUser = {
    getCurrentUserRequest() {
      return api.instance.request({
        method: "get",
        url: `/users/current`,
        headers: {
          Authorization: getToken(),
        },
      });
    },
  };
};
