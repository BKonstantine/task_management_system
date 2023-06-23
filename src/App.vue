<template>
  <div id="app" class="app">
    <NavBar />
    <UserAvatar alt="Бузунов Костя" />
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import UserAvatar from "./components/UI/UserAvatar.vue";
export default {
  name: "App",
  components: {
    NavBar,
    UserAvatar,
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
