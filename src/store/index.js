import Vue from "vue";
import Vuex from "vuex";
import currentUserModule from "./currentUserModule";
import tasksModule from "./tasksModule";
import projectsModule from "./projectsModule";
import usersModule from "./usersModule";
import authModule from "./authModule";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    currentUserModule,
    tasksModule,
    projectsModule,
    usersModule,
    authModule,
  },
});
