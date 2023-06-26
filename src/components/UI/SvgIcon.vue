<template>
  <svg class="icon">
    <use :xlink:href="id" />
  </svg>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss">
.icon {
  width: 24px;
  height: 24px;
}
</style>
