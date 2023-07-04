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
    ...mapActions(["fetchLogin", "fetchUsers", "fetchCurrentUser"]),
  },

  beforeMount() {
    //this.fetchLogin();
    //this.$api.Auth.login();
    this.fetchCurrentUser();
    this.fetchUsers();
    localStorage.setItem("isAuth", false);
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
