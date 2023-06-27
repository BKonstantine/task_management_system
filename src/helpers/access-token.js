import Vue from "vue";

Vue.prototype.$saveToken = (token) => {
  localStorage.setItem("accessToken", token);
};

Vue.prototype.$getToken = () => {
  return `Bearer ${localStorage.getItem("accessToken")}`;
};
