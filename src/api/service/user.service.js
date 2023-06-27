export default (api) => {
  api.User = {
    getCurrentUser() {
      return api.instance.request({
        method: "get",
        url: `/users/current`,
      });
    },
  };
};
