<template>
  <span class="error">
    <slot />
  </span>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.error {
  @include font-setting(400, 14px, 19px, $font-color-error);
}
</style>
