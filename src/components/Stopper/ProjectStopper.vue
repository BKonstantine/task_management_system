<template>
  <StopperContainer>
    <p class="text">Не создан ни один проект</p>
    <ButtonItem text="Добавить" />
  </StopperContainer>
</template>

<script>
import StopperContainer from "./StopperContainer.vue";
import ButtonItem from "@/components/UI/ButtonItem.vue";
export default {
  name: "ProjectStopper",
  components: {
    StopperContainer,
    ButtonItem,
  },
};
</script>

<style lang="scss" scoped>
.text {
  @include font-setting(400, 14px, 19px);
}
</style>
