<template>
  <div id="app" class="app">
    <RouterView />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "App",
  methods: {
    ...mapActions({
      checkAuth: "authModule/checkAuth",
      fetchCurrentUser: "currentUserModule/fetchCurrentUser",
      fetchAllUsers: "usersModule/fetchAllUsers",
      fetchProjects: "projectsModule/fetchProjects",
    }),

    async getData() {
      await this.$api.Auth.loginRequest();
      await this.fetchCurrentUser();
      await this.fetchProjects({ ...this.projectQuery });
      await this.fetchAllUsers();
    },
  },
  computed: {
    ...mapGetters({
      projectQuery: "projectsModule/getProjectQuery",
    }),
  },
  beforeMount() {
    this.getData();
  },
};
</script>

<style lang="scss">
.app {
  width: 1024px;
  height: 100%;
  @media screen and (min-width: 1024px) {
    width: 100%;
  }
}
.container {
  align-items: center;
  justify-content: center;
}
</style>
