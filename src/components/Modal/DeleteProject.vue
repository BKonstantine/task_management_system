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
import { mapActions, mapGetters } from "vuex";
export default {
  name: "DeleteProject",
  props: {
    projectData: Object,
  },

  methods: {
    close() {
      this.$emit("close");
    },
    ...mapActions({
      fetchProjects: "projectsModule/fetchProjects",
    }),
    deleteProject() {
      this.$api.Projects.deleteProjectsRequest(this.projectData._id).then(
        () => {
          this.close();
          this.fetchProjects({ ...this.projectQuery, page: this.currentPage });
        }
      );
    },
  },
  computed: {
    ...mapGetters({
      currentPage: "projectsModule/getCurrentPage",
      projectQuery: "projectsModule/getProjectQuery",
    }),
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
