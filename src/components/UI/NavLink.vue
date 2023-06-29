<template>
  <RouterLink active-class="nav-link_active" :to="to" :class="classObject">
    {{ text }}
  </RouterLink>
</template>

<script>
export default {
  props: {
    to: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    secondaryStyle: {
      type: Boolean,
    },
  },
  computed: {
    classObject: function () {
      return {
        "nav-link": true,
        pointer: true,
        "nav-link_style_secondary": this.secondaryStyle,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.nav-link {
  padding: 0 16px;
  min-height: 42px;
  text-decoration: none;
  @include flex-setting(_, center);
  width: min-content;
  border: 1px solid $bgc-secondary-default;
  border-radius: 4px;
  background-color: $bgc-primary-default;
  @include font-setting(400, 14px, 19px, $font-color-secondary);

  &_active {
    background-color: $bgc-secondary-default;
    border: 1px solid $bgc-secondary-default;
    color: $font-color-primary;
  }

  &:hover {
    background-color: $bgc-secondary-hover;
    border: 1px solid $bgc-secondary-hover;
    color: $font-color-primary;
  }

  &:active {
    background-color: $bgc-secondary-default;
    border: 1px solid $bgc-secondary-default;
    color: $font-color-primary;
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
