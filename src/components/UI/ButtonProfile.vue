<template>
  <button class="button">
    <UserAvatar alt="Бузунов Костя" /><SvgIcon id="#dots" />
  </button>
</template>

<script>
import SvgIcon from "./SvgIcon.vue";
import UserAvatar from "./UserAvatar.vue";
export default {
  name: "ButtonProfile",
  components: {
    SvgIcon,
    UserAvatar,
  },
};
</script>

<style lang="scss" scoped>
.button {
  @include flex-setting(_, center, _, 8px);
}
</style>
