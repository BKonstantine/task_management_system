<template>
  <svg width="24" height="24">
    <use :xlink:href="id" />
  </svg>
</template>

<script>
export default {
  name: "SvgIcon",
  props: {
    id: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss"></style>
