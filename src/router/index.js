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
        meta: { auth: true },
      },
      {
        path: "tasks",
        component: TaskOverlay,
        children: [
          {
            path: "",
            name: "Tasks",
            component: TaskList,
            meta: { auth: true },
          },
          {
            path: "create",
            name: "CreateTask",
            component: CreateTask,
            meta: { auth: true },
          },
          {
            path: "edit/:id",
            name: "EditTask",
            component: EditTask,
            meta: { auth: true },
          },
          {
            path: ":id",
            name: "CurrentTask",
            component: CurrentTask,
            meta: { auth: true },
          },
        ],
      },
      {
        path: "users",
        name: "Users",
        component: UserList,
        meta: { auth: true },
      },
      {
        path: "users/:id",
        name: "CurrentUser",
        component: ProfilePage,
        meta: { auth: true },
      },
      {
        path: "profile/:id",
        name: "Profile",
        component: ProfilePage,
        meta: { auth: true },
      },
    ],
  },
  {
    path: "/auth",
    name: "Auth",
    component: AuthPage,
  },
  {
    path: "*",
    name: "NotFound",
    component: NotFoundPage,
  },
];

const router = new VueRouter({
  mode: "history",
  base: "/",
  routes,
});

export default router;
