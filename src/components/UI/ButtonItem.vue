<template>
  <button
    :class="['disabled' ? 'cursor-pointer' : 'cursor-default']"
    :type="type"
    class="button"
  >
    {{ text }}
  </button>
</template>

<script>
export default {
  name: "ButtonItem",
  props: {
    text: {
      type: String,
      required: true,
    },
    type: {
      validator: function (value) {
        return ["button", "submit", "reset"].includes(value);
      },
      default: "button",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.button {
  font-family: inherit;
  padding: 0 16px;
  @include flex-settin(_, center);
  min-height: 42px;
  border: none;
  border-radius: 4px;
  background-color: $bgc-primary-default;
  @include font-setting(400, 14px, 19px, $font-color-secondary);

  &:hover {
    background-color: $bgc-primary-hover;
  }

  &:active {
    background-color: $bgc-primary-active;
  }

  &:disabled {
    color: $font-color-disabled;
    background-color: $bgc-primary-disabled;
  }
}
</style>
