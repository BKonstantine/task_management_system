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
    ...mapActions({
      checkAuth: "authModule/checkAuth",
      fetchCurrentUser: "currentUserModule/fetchCurrentUser",
    }),
  },
  beforeMount() {
    this.$api.Auth.loginRequest();
    this.fetchCurrentUser();
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
