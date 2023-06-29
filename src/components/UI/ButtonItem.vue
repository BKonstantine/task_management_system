<template>
  <button
    :class="classObject"
    :disabled="disabled"
    v-on="$listeners"
    class="button"
    type="button"
  >
    {{ text }}
  </button>
</template>

<script>
export default {
  computed: {
    classObject: function () {
      return {
        pointer: !this.disabled,
        default: this.disabled,
        button_size_small: this.small,
        button_style_secondary: this.secondaryStyle,
      };
    },
  },

  props: {
    text: {
      type: [String, Number],
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    small: {
      type: Boolean,
    },
    secondaryStyle: {
      type: Boolean,
    },
  },
};
</script>

<style lang="scss" scoped>
.button {
  font-family: inherit;
  padding: 0 16px;
  min-height: 42px;
  @include flex-setting(_, center);
  flex: none;
  border: none;
  border-radius: 4px;
  background-color: $bgc-primary-default;
  @include font-setting(400, 14px, 19px, $font-color-secondary);

  &_size_small {
    width: 42px;
  }

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

  &_style_secondary {
    border: 1px solid $border-color-default;
    background-color: $bgc-secondary-default;
    color: $font-color-primary;

    &:hover {
      border-color: $border-color-hover;
      background-color: $bgc-secondary-hover;
    }

    &:active {
      border-color: $border-color-active;
      background-color: $bgc-secondary-active;
    }

    &:disabled {
      border-color: $border-color-disabled;
      background-color: $bgc-secondary-default;
      color: $font-color-disabled;
    }
  }
}
</style>
