<template>
  <label class="label" :for="htmlFor">
    <slot />
    <span class="require">*</span>
  </label>
</template>

<script>
export default {
  name: "InputLabel",
  props: {
    htmlFor: {
      type: String,
    },
  },
};
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
