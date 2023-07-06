<template>
  <fieldset class="textarea-item">
    <div :class="position">
      <InputLabel :isRequired="isRequired">{{ label }}</InputLabel>
      <BaseTextarea
        v-bind="$attrs"
        :class="size"
        v-model="textareaValue"
        @input="$emit('input', textareaValue)"
      />
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
      textareaValue: this.value,
    };
  },
  props: {
    value: String,
    label: String,
    error: String,
    isRequired: Boolean,
    horizontal: Boolean,
    small: Boolean,
  },
  computed: {
    position() {
      return {
        "textarea-item__container": true,
        "textarea-item__container_position_horizontal": this.horizontal,
      };
    },
    size() {
      return {
        "textarea-item_size_small": this.small,
        "textarea-item_size_large": !this.small,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.textarea-item {
  border: none;

  &_size {
    &_small {
      height: 42px;
    }
    &_large {
      height: 120px;
    }
  }

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
