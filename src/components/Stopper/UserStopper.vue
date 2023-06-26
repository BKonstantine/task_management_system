<template>
  <StopperContainer>
    <BaseText>Нет ни одного пользователя</BaseText>
  </StopperContainer>
</template>

<script>
import StopperContainer from "./StopperContainer.vue";
import BaseText from "@/components/UI/BaseText.vue";
export default {
  name: "UserStopper",
  components: {
    StopperContainer,
    BaseText,
  },
};
</script>

<style lang="scss" scoped></style>
