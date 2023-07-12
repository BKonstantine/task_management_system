import { saveToken } from "@/helpers/access-token";

/* const loginData = {
  login: "buzunov.k",
  password: "jc63fk",
}; */

export default (api) => {
  api.Auth = {
    loginRequest(loginData) {
      return api.instance
        .request({
          method: "post",
          url: `/login`,
          data: loginData,
        })
        .then(({ data }) => saveToken(data.token));
    },
  };
};
