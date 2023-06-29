<template>
  <input
    :type="type"
    v-bind="$attrs"
    class="base-input"
    :id="id"
    placeholder="Введите текст..."
  />
</template>

<script>
export default {
  props: {
    type: {
      validator: function (value) {
        return ["text", "password", "email"].includes(value);
      },
      default: "text",
    },
    id: {
      type: String,
    },
  },
};
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
    font-family: inherit;
    color: $font-color-placeholder;
  }
}
</style>
