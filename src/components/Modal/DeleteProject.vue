<template>
  <ModalOverlay>
    <div class="header">
      <BaseTitle type="h2">Удаление</BaseTitle>
    </div>
    <BaseDivider />
    <form class="form" id="editProjectForm" @submit.prevent="deleteProject">
      <BaseText>
        Вы уверены что хотите <InputError>удалить</InputError> проект «{{
          projectData.name
        }}»?
      </BaseText>
    </form>
    <BaseDivider />
    <div class="footer">
      <ButtonItem :secondaryStyle="true" @click="close">Отмена</ButtonItem>
      <ButtonItem type="submit" form="editProjectForm">Да</ButtonItem>
    </div>
  </ModalOverlay>
</template>

<script>
export default {
  name: "DeleteProject",
  props: {
    projectData: Object,
  },

  methods: {
    close() {
      this.$emit("close");
    },
    deleteProject() {
      this.$api.Projects.deleteProjectsRequest(this.projectData._id).then(
        () => {
          this.close();
        }
      );
    },
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
