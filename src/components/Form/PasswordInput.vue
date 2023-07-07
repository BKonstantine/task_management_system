<template>
  <div class="password-input">
    <InputLabel :isRequired="isRequired">{{ label }}</InputLabel>
    <fieldset class="password-input__container">
      <BaseInput
        class="password-input__input"
        :type="inputType"
        v-bind="$attrs"
        v-model="inputValue"
        @input="$emit('input', inputValue)"
        placeholder=""
      />
      <button
        type="button"
        @click.stop="showPassword"
        class="password-input__button pointer"
      >
        <SvgIcon v-if="password" id="#eye-close" />
        <SvgIcon v-else id="#eye-open" />
      </button>
    </fieldset>
    <InputError v-if="error">{{ error }}</InputError>
  </div>
</template>

<script>
export default {
  name: "PasswordInput",
  inheritAttrs: false,
  props: {
    value: String,
    label: String,
    error: String,
    isRequired: Boolean,
  },
  data() {
    return {
      inputValue: this.value,
      password: true,
    };
  },
  methods: {
    showPassword() {
      this.password = !this.password;
    },
  },
  computed: {
    inputType() {
      return this.password ? "password" : "text";
    },
  },
};
</script>

<style lang="scss" scoped>
.password-input {
  @include flex-setting(column, _, _, 8px);

  &__container {
    border: none;
    width: 100%;
    position: relative;
  }
  &__input {
    padding: 0 42px 0 12px;
  }

  &__button {
    position: absolute;
    right: 9px;
    top: 50%;
    transform: translateY(-50%);
    border: none;
    @include flex-setting(_, center);
    background-color: transparent;
    color: $font-color-disabled;
  }
}
</style>
