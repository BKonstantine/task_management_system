<template>
  <button class=""><UserAvatar /><SvgIcon id="#dots" /></button>
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
}
</style>
