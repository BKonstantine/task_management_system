import { getToken } from "@/helpers/access-token";

export default (api) => {
  api.Users = {
    getUsersRequest(data) {
      return api.instance.request({
        method: "post",
        url: `/users/search`,
        headers: {
          Authorization: getToken(),
        },
        data: data,
      });
    },
  };
};
