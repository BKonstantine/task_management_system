<template>
  <img
    v-if="userAvatar.pucture"
    :src="userAvatar.pucture"
    :alt="userAvatar.name"
    :class="imageClasses"
  />
  <div v-else :class="textClasses">{{ initials }}</div>
</template>

<script>
import { replaceText } from "@/helpers/replace-text";
export default {
  props: {
    userAvatar: Object,
    large: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    initials: function () {
      return replaceText(this.userAvatar.name);
    },
    imageClasses: function () {
      return {
        avatar: true,
        avatar_size_large: this.large,
        avatar__image: true,
      };
    },
    textClasses: function () {
      return {
        avatar: true,
        avatar_size_large: this.large,
        avatar__text: true,
        avatar__text_size_large: this.large,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.avatar {
  flex: none;
  width: 24px;
  height: 24px;
  border-radius: 50%;

  &_size_large {
    width: 300px;
    height: 300px;
    border-radius: 0;
  }

  &__image {
    object-fit: cover;
  }

  &__text {
    @include flex-setting(_, center, center);
    @include font-setting(600, 10px, 100%, $font-color-disabled);
    background-color: $bgc-secondary-active;

    &_size_large {
      font-size: 128px;
    }
  }
}
</style>
