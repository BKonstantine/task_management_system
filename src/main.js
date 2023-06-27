import Vue from "vue";
import App from "./App.vue";
import router from "@/router/index";
import store from "@/store/index";
import "@/helpers/register-assets";
import "@/helpers/register-components";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
