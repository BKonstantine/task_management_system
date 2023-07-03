<template>
  <div class="auth">
    <div class="auth__container">
      <div class="auth__title">
        <BaseTitle type="h2">Вход</BaseTitle>
      </div>
      <BaseDivider />
      <div class="auth__button">
        <ButtonItem @click="logout">Выйти</ButtonItem>
        <ButtonItem @click="login">Войти</ButtonItem>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AuthPage",
  methods: {
    login() {
      this.$store.commit("setAuth", true);
    },
    logout() {
      this.$store.commit("setAuth", false);
    },
  },
};
</script>

<style lang="scss" scoped>
.auth {
  height: 100%;

  &__container {
    width: 300px;
    border-radius: 4px;
    background: $bgc-secondary-default;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    @include flex-setting(column, center);
  }

  &__title {
    padding: 16px 0;
  }

  &__button {
    width: 100%;
    padding: 24px;
    @include flex-setting(_, center, space-between);
  }
}
</style>
