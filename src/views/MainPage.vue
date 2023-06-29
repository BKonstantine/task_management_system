<template>
  <div class="main-page">
    <NavBar class="nav-bar" />
    <RouterView />
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
export default {
  name: "MainPage",
  components: {
    NavBar,
  },
};
</script>

<style lang="scss" scoped>
.main-page {
  height: 100%;
}
.nav-bar {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
}
</style>
