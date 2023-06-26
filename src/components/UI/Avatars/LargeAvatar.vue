<template>
  <img v-if="src" :src="src" :alt="alt" class="avatar avatar_type_img" />
  <div v-else class="avatar avatar_type_text">{{ initials }}</div>
</template>

<script>
import { replaceText } from "@/helpers/replace-text";
export default {
  name: "LargeAvatar",
  props: {
    src: {
      type: String,
    },
    alt: {
      type: String,
      required: true,
    },
    text: {
      type: String,
    },
  },
  computed: {
    initials: function () {
      return replaceText(this.alt);
    },
  },
};
</script>

<style lang="scss" scoped>
.avatar {
  flex: none;
  width: 300px;
  height: 300px;

  &_type {
    &_img {
      object-fit: cover;
    }
    &_text {
      @include flex-setting(_, center, center);
      @include font-setting(600, 128px, 100%, $font-color-disabled);
      letter-spacing: 3px;
      background-color: $bgc-secondary-active;
    }
  }
}
</style>
