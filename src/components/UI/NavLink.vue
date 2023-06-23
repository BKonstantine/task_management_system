<template>
  <RouterLink
    active-class="nav-link_active"
    :to="to"
    class="nav-link pointer"
    >{{ text }}</RouterLink
  >
</template>

<script>
import { RouterLink } from "vue-router";
export default {
  name: "NavLink",
  components: {
    RouterLink,
  },
  props: {
    to: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.nav-link {
  padding: 0 16px;
  min-height: 42px;
  text-decoration: none;
  @include flex-settin(_, center);
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
}
</style>
