<template>
  <div class="container">
    <p class="title">Страница не найдена</p>
  </div>
</template>

<script>
export default {
  name: "NotFoundPage",
};
</script>

<style lang="scss" scoped>
.container {
  height: 100%;
  @include flex-setting(_, center, center);
}

.title {
  @include font-setting(700, 90px, 100%);
}
</style>
