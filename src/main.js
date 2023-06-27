import Vue from "vue";
import App from "./App.vue";
import router from "@/router/index";
import store from "@/store/index";
import Api from "@/api/index";
import "@/helpers/register-assets";
import "@/helpers/register-components";
import "@/helpers/access-token";

Vue.config.productionTip = false;

Vue.use(Api);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
