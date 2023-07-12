<template>
  <div class="container">
    <div class="wrapper">
      <ButtonItem @click="navigate">Вернуться назад</ButtonItem>
      <p class="title">Страница не найдена</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "NotFoundPage",
  methods: {
    navigate() {
      this.$router.replace("/");
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  padding: 24px;
  height: 100%;
  width: 100%;
  @include flex-setting(_, center, center);
}

.wrapper {
  height: 100%;
  width: 100%;
  padding: 24px;
  border-radius: 4px;
  border: 1px solid $border-color-default;
}

.title {
  @include font-setting(700, 90px, 100%);
  position: fixed;
  text-align: center;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
