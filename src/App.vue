<template>
  <div id="app" class="app">
    <RouterView />
  </div>
</template>

<script>
import { RouterView } from "vue-router";
export default {
  name: "App",
  components: {
    RouterView,
  },
  mounted() {
    /* this.$api.Auth.login()
      .then(({ data }) => {
        this.$saveToken(data.token);
      })
      .catch((e) => {
        console.log(e);
      }); */
    /* console.log(this.$getToken()); */
    this.$api.User.getCurrentUser().then(({ data }) => {
      console.log(data);
    });
  },
};
</script>

<style lang="scss">
.app {
  height: 100%;
  width: 1024px;

  @media screen and (min-width: 1024px) {
    width: 100%;
  }
}
</style>
