<template>
  <div id="app" class="app">
    <RouterView />
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { RouterView } from "vue-router";
export default {
  name: "App",
  components: {
    RouterView,
  },
  methods: {
    ...mapActions(["fetchLogin", "fetchTasks"]),
  },
  beforeMount() {
    //this.fetchLogin();
    this.fetchTasks();
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
