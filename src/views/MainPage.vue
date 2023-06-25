<template>
  <div class="main-page">
    <NavBar />
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
</style>
