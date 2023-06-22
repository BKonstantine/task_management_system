<template>
  <div id="app" class="app">
    <p>Text</p>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style lang="scss" scoped>
.app {
  width: 1024px;

  @media screen and (min-width: 1024px) {
    width: 100%;
  }
}
</style>
