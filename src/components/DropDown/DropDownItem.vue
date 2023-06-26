<template>
  <li v-on="$listeners" :class="['item', { item_position_last: last }]">
    <slot />
  </li>
</template>

<script>
export default {
  name: "DropDownItem",
  props: {
    text: {
      type: String,
    },
    last: {
      type: Boolean,
    },
  },
};
</script>

<style lang="scss" scoped>
.item {
  list-style: none;
  @include flex-setting(_, center);
  padding: 0 16px;
  height: 35px;
  @include font-setting(400, 14px, 19px, $font-color-primary);

  &:hover {
    background-color: $bgc-secondary-hover;
  }

  &:active {
    background-color: $bgc-secondary-active;
  }

  &_position_last {
    color: $font-color-error;
  }
}
</style>
