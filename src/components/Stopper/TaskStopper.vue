<template>
  <StopperContainer>
    <p class="text">Не создано ни одной задачи</p>
  </StopperContainer>
</template>

<script>
import StopperContainer from "./StopperContainer.vue";
export default {
  name: "TaskStopper",
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
