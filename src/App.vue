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
    ...mapActions(["fetchLogin", "fetchUsers"]),
  },
  beforeMount() {
    //this.fetchLogin();
    this.fetchUsers({ limit: 100 });
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
