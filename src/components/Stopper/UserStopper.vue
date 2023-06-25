<template>
  <StopperContainer>
    <p class="text">Нет ни одного пользователя</p>
  </StopperContainer>
</template>

<script>
import StopperContainer from "./StopperContainer.vue";
export default {
  name: "UserStopper",
  components: {
    StopperContainer,
  },
};
</script>

<style lang="scss" scoped>
.text {
  @include font-setting(400, 14px, 19px);
}
</style>
