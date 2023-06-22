<template>
  <div id="app" class="app">
    <ButtonItem text="text" />
  </div>
</template>

<script>
import ButtonItem from "@/components/UI/ButtonItem.vue";
export default {
  name: "App",
  components: {
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
