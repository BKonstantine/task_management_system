<template>
  <StopperContainer>
    <BaseText>Не создан ни один проект</BaseText>
    <ButtonItem text="Добавить" />
  </StopperContainer>
</template>

<script>
import StopperContainer from "./StopperContainer.vue";
export default {
  name: "ProjectStopper",
  components: {
    StopperContainer,
  },
};
</script>

<style lang="scss" scoped></style>
