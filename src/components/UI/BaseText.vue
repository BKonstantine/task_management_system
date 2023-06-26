<template>
  <p class="text"><slot /></p>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.text {
  @include font-setting(400, 14px, 19px);
}
</style>
