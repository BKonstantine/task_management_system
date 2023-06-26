<template>
  <input :type="type" class="base-input" :id="id" />
</template>

<script>
export default {
  name: "BaseInput",
  props: {
    type: {
      validator: function (value) {
        return ["text", "password", "email"].includes(value);
      },
      default: "text",
    },
    id: {
      type: String,
    },
  },
};
</script>

<style lang="scss" scoped>
.base-input {
  padding: 0 12px;
  height: 42px;
  border-radius: 4px;
  border: 1px solid $border-color-default;
  @include font-setting(400, 14px, 19px);
  cursor: text;
}
</style>
