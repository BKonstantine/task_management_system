<template>
  <main class="main">
    <slot />
  </main>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.main {
  padding: 24px;
  @include flex-setting(column, _, _, 24px);
}
</style>
