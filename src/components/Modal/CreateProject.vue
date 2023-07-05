<template>
  <ModalOverlay>
    <div class="header">
      <BaseTitle type="h2">Создание проекта</BaseTitle>
    </div>
    <BaseDivider />
    <form class="form" id="createProjectForm">
      <InputItem label="Код" :isRequired="true" />
      <InputItem label="Название" :isRequired="true" />
    </form>
    <BaseDivider />
    <div class="footer">
      <ButtonItem :secondaryStyle="true" @click="$emit('close')">
        Отмена
      </ButtonItem>
      <ButtonItem type="submit" form="createProjectForm">
        Создать проект
      </ButtonItem>
    </div>
  </ModalOverlay>
</template>

<script>
import InputItem from "@/components/Form/InputItem.vue";
export default {
  name: "CreateProject",
  components: {
    InputItem,
  },
};
</script>

<style lang="scss" scoped>
.header {
  padding: 16px;
}

.form {
  padding: 24px;
  @include flex-setting(column, _, _, 24px);
}

.footer {
  padding: 24px;
  @include flex-setting(_, center, flex-end, 8px);
}
</style>
