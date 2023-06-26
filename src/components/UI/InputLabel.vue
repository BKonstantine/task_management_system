<template>
  <label class="label">
    <slot />
    <span class="require">*</span>
  </label>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.label {
  @include flex-setting(_, _, _, 4px);
  @include font-setting(400, 14px, 19px);
}

.require {
  color: $font-color-error;
}
</style>
