<template>
  <main class="main">
    <slot />
  </main>
</template>

<script>
export default {
  name: "PageContainer",
};
</script>

<style lang="scss" scoped>
.main {
  padding: 24px;
  @include flex-setting(column, _, _, 24px);
  height: calc(100% - 90px);
}
</style>
