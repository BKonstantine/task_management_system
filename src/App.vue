<template>
  <div id="app" class="app">
    <RouterView />
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style lang="scss">
.app {
  width: 1024px;
  height: 100%;
  @media screen and (min-width: 1024px) {
    width: 100%;
  }
}
.container {
  align-items: center;
  justify-content: center;
}
</style>
