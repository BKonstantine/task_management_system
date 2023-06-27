import Vue from "vue";
import Vuex from "vuex";
import currentUserModule from "./currentUserModule";
import taskModule from "./taskModule";
import projectModule from "./projectModule";
import auth from "./auth";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    currentUserModule,
    taskModule,
    projectModule,
    auth,
  },
});
