<template>
  <div>
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

<style lang="scss" scoped></style>
