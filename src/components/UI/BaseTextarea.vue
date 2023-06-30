<template>
  <textarea
    v-bind="$attrs"
    class="textarea"
    placeholder="Введите текст..."
    :value="value"
    @input="autoResize, $emit('input', $event.target.value)"
    ref="textarea"
  ></textarea>
</template>

<script>
export default {
  props: ["value"],
  methods: {
    autoResize() {
      this.$refs.textarea.style.height = "auto";
      this.$refs.textarea.style.height =
        this.$refs.textarea.scrollHeight + 2 + "px";
    },
  },
};
</script>

<style lang="scss" scoped>
.textarea {
  padding: 10px 12px;
  width: 100%;
  min-height: 120px;
  resize: none;
  border-radius: 4px;
  border: 1px solid $border-color-default;
  font-family: inherit;
  @include font-setting(400, 14px, 19px);
  cursor: text;

  &::placeholder {
    font-family: "Open Sans", sans-serif;
    color: $font-color-placeholder;
  }
}
</style>
