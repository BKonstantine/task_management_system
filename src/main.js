import Vue from "vue";
import App from "./App.vue";
import router from "@/router/index";
import store from "@/store/index";
import Api from "@/api/index";
import "@/helpers/register-assets";
import "@/helpers/register-components";
import clickInside from "@/directives/click-inside";
import clickOutside from "@/directives/click-outside";

Vue.config.productionTip = false;

Vue.use(Api);

Vue.directive("click-outside", clickOutside);

Vue.directive("click-inside", clickInside);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
