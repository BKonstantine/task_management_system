<template>
  <textarea
    v-bind="$attrs"
    class="textarea"
    placeholder="Введите текст..."
    :value="value"
    @input="onChange"
    ref="textarea"
  ></textarea>
</template>

<script>
export default {
  props: ["value", "areaSize"],
  methods: {
    onChange(event) {
      this.$emit("input", event.target.value);
      this.autoResize();
    },
    autoResize() {
      const { textarea } = this.$refs;
      textarea.style.height = this.areaSize;
      textarea.style.height = textarea.scrollHeight + 2 + "px";
    },
  },
  mounted() {
    const { textarea } = this.$refs;
    textarea.style.height = this.areaSize;
  },
};
</script>

<style lang="scss" scoped>
.textarea {
  padding: 10px 12px;
  width: 100%;
  resize: none;
  border-radius: 4px;
  border: 1px solid $border-color-default;
  font-family: inherit;
  @include font-setting(400, 14px, 19px);
  cursor: text;

  &:hover {
    border: 1px solid $border-color-hover;
  }

  &:focus {
    border: 1px solid $border-color-active;
    outline: none;
  }

  &::placeholder {
    font-family: "Open Sans", sans-serif;
    color: $font-color-placeholder;
  }
}
</style>
