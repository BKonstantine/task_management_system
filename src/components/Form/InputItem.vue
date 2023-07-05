<template>
  <fieldset class="input-item">
    <div :class="position">
      <InputLabel :isRequired="isRequired">{{ label }}</InputLabel>
      <BaseInput
        v-bind="$attrs"
        v-model="inputValue"
        @input="$emit('input', inputValue)"
      />
    </div>
    <InputError v-if="error">{{ error }}</InputError>
  </fieldset>
</template>

<script>
export default {
  name: "InputItem",
  inheritAttrs: false,
  data() {
    return {
      inputValue: this.value,
    };
  },
  props: {
    value: String,
    label: String,
    error: String,
    isRequired: Boolean,
    horizontal: Boolean,
  },
  computed: {
    position() {
      return {
        "input-item__container": true,
        "input-item__container_position_horizontal": this.horizontal,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.input-item {
  border: none;

  &__container {
    @include flex-setting(column, _, _, 8px);

    &_position {
      &_horizontal {
        flex-direction: row;
      }
    }
  }
}
</style>
