<template>
  <button
    :class="buttonClasses"
    :type="type"
    :disabled="disabled"
    class="button"
  >
    <slot :class="iconClasses"></slot>
  </button>
</template>

<script>
export default {
  name: "ButtonIcon",
  props: {
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
    secondaryStyle: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    buttonClasses: function () {
      return {
        pointer: !this.disabled,
        default: this.disabled,
        button_style_secondary: this.secondaryStyle,
      };
    },
    iconClasses: function () {
      return {
        /* icon: true, */
        icon_style_secondary: this.secondaryStyle,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.button {
  @include flex-setting(_, center, center);
  flex: none;
  padding: 0;
  width: 42px;
  height: 42px;
  border: none;
  background-color: $bgc-primary-default;
  border-radius: 4px;

  &:hover {
    background-color: $bgc-primary-hover;
  }

  &:active {
    background-color: $bgc-primary-active;
  }

  &:disabled {
    background-color: $bgc-primary-disabled;
  }

  &:disabled .icon {
    color: $font-color-disabled;
  }

  &_style_secondary {
    border: 1px solid $border-color-default;
    background-color: $bgc-secondary-default;
  }
}

.icon {
  color: $font-color-secondary;

  &_style_secondary {
    color: $font-color-primary;
  }
}
</style>
