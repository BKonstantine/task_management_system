<template>
  <StopperContainer>
    <BaseText>Не создано ни одной задачи</BaseText>
  </StopperContainer>
</template>

<script>
import StopperContainer from "./StopperContainer.vue";
import BaseText from "@/components/UI/BaseText.vue";
export default {
  name: "TaskStopper",
  components: {
    StopperContainer,
    BaseText,
  },
};
</script>

<style lang="scss" scoped></style>
