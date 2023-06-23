<template>
  <div id="app" class="app">
    <NavBar />
    <ButtonProfile />
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import ButtonProfile from "./components/UI/ButtonProfile.vue";
export default {
  name: "App",
  components: {
    NavBar,
    ButtonProfile,
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
