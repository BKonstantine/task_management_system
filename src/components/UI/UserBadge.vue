<template>
  <div class="user-badge">
    <UserAvatar :userAvatar="userData" />
    <BaseText v-if="abbreviate">{{ userName }}</BaseText>
    <BaseText v-else>{{ userData.name }}</BaseText>
  </div>
</template>

<script>
import { abbreviateName } from "@/helpers/replace-text";
export default {
  props: {
    userData: {
      type: Object,
      require: true,
    },
    abbreviate: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    userName() {
      return abbreviateName(this.userData.name);
    },
  },
};
</script>

<style lang="scss" scoped>
.user-badge {
  @include flex-setting(_, center, _, 8px);
}
</style>
