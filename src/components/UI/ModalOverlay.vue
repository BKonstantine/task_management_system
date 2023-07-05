<template>
  <div class="modal-overlay">
    <div class="modal">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: "ModalOverlay",
};
</script>

<style lang="scss" scoped>
.modal-overlay {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: $border-color-default;
  z-index: 10;
  @include flex-setting(_, center, center);
}

.modal {
  min-width: 500px;
  background-color: $bgc-secondary-default;
  box-shadow: 0px 0px 30px 0px rgba(0, 0, 0, 0.1);
}
</style>
