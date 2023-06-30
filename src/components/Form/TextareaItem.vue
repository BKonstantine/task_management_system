<template>
  <fieldset class="textarea-item">
    <div :class="position">
      <InputLabel :isRequired="isRequired">{{ label }}</InputLabel>
      <BaseTextarea v-model="textareaValue" v-bind="$attrs" />
    </div>
    <InputError v-if="error">{{ error }}</InputError>
  </fieldset>
</template>

<script>
export default {
  name: "TextareaItem",
  inheritAttrs: false,
  data() {
    return {
      textareaValue: "",
    };
  },
  props: {
    label: String,
    error: String,
    isRequired: Boolean,
    horizontal: Boolean,
  },
  computed: {
    position() {
      return {
        "textarea-item__container": true,
        "textarea-item__container_position_horizontal": this.horizontal,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.textarea-item {
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
