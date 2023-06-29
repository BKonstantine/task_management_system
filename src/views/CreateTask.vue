<template>
  <PageContainer>
    <div class="create-task">
      <BaseTitle class="create-task__title">Создание задачи</BaseTitle>
      <BaseDivider />
      <form class="create-task__form">
        <InputItem :isRequired="true" label="Название" />
      </form>
      <BaseDivider />
      <div class="create-task__buttons">
        <ButtonItem text="Отмена" :secondaryStyle="true" />
        <ButtonItem type="submit" text="Создать задачу" />
      </div>
    </div>
  </PageContainer>
</template>

<script>
import InputItem from "@/components/Form/InputItem.vue";
export default {
  name: "CreateTask",
  components: {
    InputItem,
  },
};
</script>

<style lang="scss" scoped>
.create-task {
  @include flex-setting(column, _, _, 24px);
  padding: 24px;
  height: 100%;
  border-radius: 4px;
  border: 1px solid $border-color-default;

  &__title {
    display: inline-block;
    padding: 10px;
  }

  &__form {
    max-width: 720px;
    height: 100%;
    padding: 32px 24px 24px 24px;
  }
  &__buttons {
    padding: 10px;
    @include flex-setting(_, center, flex-end, 24px);
  }
}
</style>
