<template>
  <button
    v-on="$listeners"
    :class="buttonClasses"
    :type="type"
    :disabled="disabled"
    class="button"
  >
    <div :class="iconClasses"><slot></slot></div>
  </button>
</template>

<script>
export default {
  computed: {
    buttonClasses: function () {
      return {
        pointer: !this.disabled,
        default: this.disabled,
        button_style_secondary: this.secondaryStyle,
        button_style_secondary_active: this.secondaryStyle && this.active,
        button_active: !this.secondaryStyle && this.active,
      };
    },
    iconClasses: function () {
      return {
        primary: !this.secondaryStyle,
        secondary: this.secondaryStyle,
      };
    },
  },

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
      default: false,
    },
    active: {
      type: Boolean,
      default: false,
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

  &_active {
    background-color: $bgc-primary-active;
  }

  &:disabled {
    background-color: $bgc-primary-disabled;
  }

  &:disabled .primary {
    color: $font-color-disabled;
  }

  &_style_secondary {
    border: 1px solid $border-color-default;
    background-color: $bgc-secondary-default;

    &:hover {
      border: 1px solid $border-color-hover;
      background-color: $bgc-secondary-hover;
    }

    &:active {
      border: 1px solid $border-color-active;
      background-color: $bgc-secondary-active;
    }

    &_active {
      border: 1px solid $border-color-active;
      background-color: $bgc-secondary-active;
    }

    &:disabled {
      border: 1px solid $border-color-disabled;
      background-color: $bgc-secondary-default;
    }

    &:disabled .secondary {
      color: $font-color-disabled;
    }
  }
}
.primary {
  color: $font-color-secondary;
}

.secondary {
  color: $font-color-primary;
}
</style>
