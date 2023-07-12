<template>
  <div class="auth">
    <div class="auth__container">
      <div class="auth__title">
        <BaseTitle type="h2">Вход</BaseTitle>
      </div>
      <BaseDivider />
      <form id="loginForm" class="auth__form" @submit.prevent="login">
        <InputItem
          :isRequired="true"
          label="Логин"
          placeholder=""
          v-model="loginQuery.login"
        />
        <PasswordInput
          :isRequired="true"
          label="Пароль"
          v-model="loginQuery.password"
        />
      </form>

      <BaseDivider />
      <div class="auth__button">
        <ButtonItem type="submit" form="loginForm">Войти</ButtonItem>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import InputItem from "@/components/Form/InputItem.vue";
import PasswordInput from "@/components/Form/PasswordInput.vue";
export default {
  name: "AuthPage",
  components: {
    InputItem,
    PasswordInput,
  },
  data() {
    return {
      loginQuery: {
        login: "buzunov.k",
        password: "jc63fk",
      },
    };
  },
  methods: {
    ...mapActions({
      setAuth: "authModule/setAuth",
    }),

    login() {
      this.$api.Auth.loginRequest(this.loginQuery).then(() => {
        this.setAuth(true);
        this.$router.replace("/projects");
      });
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
