<template>
  <span class="status">
    <slot />
  </span>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.status {
  display: inline-block;
  padding: 0 8px;
  border-radius: 4px;
  @include font-setting(400, 14px, 19px, $bgc-secondary-default);
  background-color: $bgc-primary-default;
}
</style>
