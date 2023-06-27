<template>
  <span class="status" :style="{ backgroundColor: color }">
    <slot />
  </span>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.status {
  display: inline-block;
  padding: 0 8px;
  border-radius: 4px;
  @include font-setting(400, 14px, 19px, $bgc-secondary-default);
}
</style>
