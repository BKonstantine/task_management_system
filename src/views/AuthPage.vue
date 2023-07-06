<template>
  <div class="auth">
    <div class="auth__container">
      <div class="auth__title">
        <BaseTitle type="h2">Вход</BaseTitle>
      </div>
      <BaseDivider />
      <form id="loginForm" class="auth__form">
        <InputItem
          :isRequired="true"
          label="Логин"
          v-model="loginQuery.login"
        />
        <InputItem
          :isRequired="true"
          label="Пароль"
          v-model="loginQuery.password"
        />
      </form>

      <BaseDivider />
      <div class="auth__button">
        <ButtonItem form="loginForm">Войти</ButtonItem>
      </div>
    </div>
  </div>
</template>

<script>
import InputItem from "@/components/Form/InputItem.vue";
export default {
  name: "AuthPage",
  components: {
    InputItem,
  },
  data() {
    return {
      loginQuery: {
        login: null,
        password: null,
      },
    };
  },
  methods: {},
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

  &__form {
    width: 100%;
    padding: 24px 24px 48px 24px;
    @include flex-setting(column, _, _, 36px);
  }

  &__button {
    width: 100%;
    padding: 24px;
    @include flex-setting(_, center, flex-end);
  }
}
</style>
