<template>
  <svg width="24px" height="24px">
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

<style lang="scss" scoped></style>
