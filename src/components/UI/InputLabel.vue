<template>
  <label class="label">
    <slot />
    <span v-if="isRequired" class="require">*</span>
  </label>
</template>

<script>
export default {
  props: {
    isRequired: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.label {
  @include flex-setting(_, _, _, 4px);
  @include font-setting(400, 14px, 19px, $font-color-disabled);
  max-width: 120px;
}

.require {
  color: $font-color-error;
}
</style>
