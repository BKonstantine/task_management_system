import Vue from "vue";
import Vuex from "vuex";
import userModule from "./userModule";
import taskModule from "./taskModule";
import projectModule from "./projectModule";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    userModule,
    taskModule,
    projectModule,
  },
});
