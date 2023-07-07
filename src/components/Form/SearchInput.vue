<template>
  <fieldset class="search-input">
    <BaseInput
      class="search-input__input"
      v-bind="$attrs"
      v-model="inputValue"
      @input="$emit('input', inputValue)"
      placeholder="Поиск..."
    />
    <div class="search-input__icons">
      <button
        v-show="inputValue"
        class="search-input__clear-button pointer"
        @click="clear"
      >
        <SvgIcon id="#clear" class="search-input__clear-icon" />
      </button>
      <SvgIcon id="#search" />
    </div>
  </fieldset>
</template>

<script>
export default {
  name: "SearchInput",
  inheritAttrs: false,
  props: ["value"],
  data() {
    return {
      inputValue: this.value,
    };
  },
  methods: {
    clear() {
      this.inputValue = null;
      this.$emit("click");
    },
  },
};
</script>

<style lang="scss" scoped>
.search-input {
  border: none;
  width: 100%;
  position: relative;

  &__input {
    padding: 0 62px 0 12px;
  }

  &__icons {
    @include flex-setting(_, center, _, 8px);
    position: absolute;
    right: 9px;
    top: 50%;
    transform: translateY(-50%);
    color: $font-color-disabled;
  }

  &__clear-button {
    border: none;
    @include flex-setting(_, center);
    background-color: transparent;
    color: $font-color-disabled;
  }

  &__clear-icon {
    width: 16px;
    height: 16px;
  }
}
</style>
