<template>
  <input v-bind="$attrs" class="base-input" placeholder="Введите текст..." />
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.base-input {
  padding: 0 12px;
  width: 100%;
  height: 42px;
  border-radius: 4px;
  border: 1px solid $border-color-default;
  @include font-setting(400, 14px, 19px);
  cursor: text;

  &::placeholder {
    font-family: "Open Sans", sans-serif;
    color: $font-color-placeholder;
  }
}
</style>
