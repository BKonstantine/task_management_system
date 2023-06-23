<template>
  <div id="app" class="app">
    <ButtonItem text="text" />
    <NavLink to="/to" text="link" />
  </div>
</template>

<script>
import ButtonItem from "@/components/UI/ButtonItem.vue";
import NavLink from "@/components/UI/NavLink.vue";
export default {
  name: "App",
  components: {
    ButtonItem,
    NavLink,
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
