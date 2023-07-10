import Vue from "vue";
import VueRouter from "vue-router";
import MainPage from "@/views/MainPage.vue";
import ProjectList from "@/views/ProjectList.vue";
import TaskList from "@/views/TaskList.vue";
import UserList from "@/views/UserList.vue";
import TaskOverlay from "@/views/TaskOverlay.vue";
import ProfilePage from "@/views/ProfilePage.vue";
import NotFoundPage from "@/views/NotFoundPage.vue";
import CreateTask from "@/views/CreateTask.vue";
import CurrentTask from "@/views/CurrentTask.vue";
import AuthPage from "@/views/AuthPage.vue";
import EditTask from "@/views/EditTask.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: MainPage,
    redirect: "/projects",
    children: [
      {
        path: "projects",
        name: "Projects",
        component: ProjectList,
      },
      {
        path: "tasks",
        component: TaskOverlay,
        children: [
          {
            path: "",
            name: "Tasks",
            component: TaskList,
          },
          {
            path: "create",
            name: "CreateTask",
            component: CreateTask,
          },
          {
            path: "edit/:id",
            name: "EditTask",
            component: EditTask,
          },
          {
            path: ":id",
            name: "CurrentTask",
            component: CurrentTask,
          },
        ],
      },
      {
        path: "users",
        component: UserList,
      },
      {
        path: "users/:id",
        name: "CurrentUser",
        component: ProfilePage,
      },
      {
        path: "profile/:id",
        name: "Profile",
        component: ProfilePage,
      },
    ],
  },
  {
    path: "/auth",
    component: AuthPage,
  },
  {
    path: "*",
    component: NotFoundPage,
  },
];

const router = new VueRouter({
  mode: "history",
  base: "/",
  routes,
});

export default router;
