<template>
  <label class="label">
    <slot />
    <span v-if="require" class="require">*</span>
  </label>
</template>

<script>
export default {
  props: {
    require: Boolean,
  },
};
</script>

<style lang="scss" scoped>
.label {
  @include flex-setting(_, _, _, 4px);
  @include font-setting(400, 14px, 19px, $font-color-disabled);
}

.require {
  color: $font-color-error;
}
</style>
