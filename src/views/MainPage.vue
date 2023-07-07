<template>
  <div class="main-page">
    <NavBar class="nav-bar" />
    <PageContainer v-show="loader" class="container">
      <BaseLoader />
    </PageContainer>
    <RouterView v-show="!loader" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import NavBar from "@/components/NavBar.vue";
export default {
  name: "MainPage",
  components: {
    NavBar,
  },
  computed: {
    ...mapGetters({
      currentUserRequest: "currentUserModule/getRequestStatus",
      usersRequest: "usersModule/getRequestStatus",
      tasksRequest: "tasksModule/getRequestStatus",
      projectsRequest: "projectsModule/getRequestStatus",
    }),

    loader() {
      return (
        this.currentUserRequest ||
        this.usersRequest ||
        this.tasksRequest ||
        this.projectsRequest
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.main-page {
  height: 100%;
}

.container {
  align-items: center;
  justify-content: center;
}
.nav-bar {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
}
</style>
