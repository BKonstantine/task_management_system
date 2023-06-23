<template>
  <div id="app" class="app">
    <NavBar />
    <!-- <ButtonIcon><SvgIcon id="#dots" /></ButtonIcon> -->
    <ButtonItem text="B" small="true" secondary-style="true" />
  </div>
</template>

<script>
import ButtonItem from "./components/UI/ButtonItem.vue";
import NavBar from "@/components/NavBar.vue";
/* import ButtonIcon from "./components/UI/ButtonIcon.vue";
import SvgIcon from "./components/UI/SvgIcon.vue"; */
export default {
  name: "App",
  components: {
    NavBar,
    /*  ButtonIcon,
    SvgIcon, */
    ButtonItem,
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
