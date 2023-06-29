<template>
  <h1 v-if="type === 'h1'" class="title"><slot /></h1>
  <h2 v-else class="title title_type_h2"><slot /></h2>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: "h1",
    },
  },
};
</script>

<style lang="scss" scoped>
.title {
  @include font-setting(600, 40px, normal, $font-color-primary);

  &_type_h2 {
    font-size: 24px;
  }
}
</style>
