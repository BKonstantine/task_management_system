<template>
  <div id="app" class="app">
    <RouterView />
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "App",
  methods: {
    ...mapActions([
      "fetchLogin",
      "fetchUsers",
      "fetchCurrentUser",
      "fetchProjects",
    ]),
  },

  beforeMount() {
    //this.fetchLogin();
    this.fetchCurrentUser();
    this.fetchUsers({ limit: 100 });
    this.fetchProjects({ limit: 1000 });
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
</style>
