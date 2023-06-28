<template>
  <div class="stopper">
    <div class="stopper__info">
      <slot />
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.stopper {
  height: 100%;
  border: 1px solid $border-color-default;
  border-radius: 4px;
  @include flex-setting(_, center, center);

  &__info {
    @include flex-setting(column, center, center, 10px);
  }
}
</style>
