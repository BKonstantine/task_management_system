import Vue from "vue";
import VueRouter from "vue-router";
import MainPage from "@/views/MainPage.vue";
import ProjectList from "@/views/ProjectList.vue";
import TaskList from "@/views/TaskList.vue";
import UserList from "@/views/UserList.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: MainPage,
    redirect: "/projects",
    children: [
      {
        path: "projects",
        component: ProjectList,
      },
      {
        path: "tasks",
        component: TaskList,
      },
      {
        path: "users",
        component: UserList,
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: "/",
  routes,
});

export default router;
