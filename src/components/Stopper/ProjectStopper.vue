<template>
  <StopperContainer>
    <BaseText>Не создан ни один проект</BaseText>
    <ButtonItem text="Добавить" />
  </StopperContainer>
</template>

<script>
import StopperContainer from "./StopperContainer.vue";
import ButtonItem from "@/components/UI/ButtonItem.vue";
import BaseText from "@/components/UI/BaseText.vue";
export default {
  name: "ProjectStopper",
  components: {
    StopperContainer,
    ButtonItem,
    BaseText,
  },
};
</script>

<style lang="scss" scoped></style>
