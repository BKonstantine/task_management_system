import { saveToken } from "@/helpers/access-token";

const userData = {
  login: "buzunov.k",
  password: "jc63fk",
};

export default (api) => {
  api.Auth = {
    loginRequest() {
      return api.instance
        .request({
          method: "post",
          url: `/login`,
          data: userData,
        })
        .then(({ data }) => saveToken(data.token));
    },
  };
};
