<template>
  <div id="app" class="app">
    <NavBar />
    <ButtonIcon><SvgIcon id="#dots" /></ButtonIcon>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import ButtonIcon from "./components/UI/ButtonIcon.vue";
import SvgIcon from "./components/UI/SvgIcon.vue";
export default {
  name: "App",
  components: {
    NavBar,
    ButtonIcon,
    SvgIcon,
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
