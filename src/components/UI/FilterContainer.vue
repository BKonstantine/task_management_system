<template>
  <div class="filter"><slot /></div>
</template>

<script>
export default {
  name: "FilterContainer",
};
</script>

<style lang="scss" scoped>
.filter {
  width: 100%;
  @include flex-setting(_, center, space-between, 24px);
}
</style>
