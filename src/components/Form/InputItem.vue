<template>
  <fieldset class="input-item">
    <div class="input-item__container">
      <InputLabel :isRequired="isRequired">{{ label }}</InputLabel>
      <BaseInput v-bind="$attrs" />
    </div>
    <InputError v-if="error">{{ error }}</InputError>
  </fieldset>
</template>

<script>
export default {
  name: "InputItem",
  inheritAttrs: false,
  props: {
    label: String,
    error: String,
    isRequired: Boolean,
    horizontal: Boolean,
  },
};
</script>

<style lang="scss" scoped>
.input-item {
  border: none;

  &__container {
    @include flex-setting(column, _, _, 8px);
  }
}
</style>
