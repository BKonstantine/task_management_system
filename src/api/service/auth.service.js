const userData = {
  login: "buzunov.k",
  password: "jc63fk",
};

export default (api) => {
  api.Auth = {
    login() {
      return api.instance.request({
        method: "post",
        url: `/login`,
        data: userData,
      });
    },
  };
};
