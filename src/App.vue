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
