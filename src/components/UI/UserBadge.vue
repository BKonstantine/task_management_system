<template>
  <div class="user-badge">
    <UserAvatar :userAvatar="userData" />
    <BaseText>{{ userName }}</BaseText>
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
