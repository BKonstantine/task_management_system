<template>
  <ModalOverlay>
    <div class="header">
      <BaseTitle type="h2">Редактирование проекта</BaseTitle>
    </div>
    <BaseDivider />
    <form class="form" id="editProjectForm" @submit.prevent="editProject">
      <InputItem v-model="query.code" label="Код" :isRequired="true" />
      <InputItem v-model="query.name" label="Название" :isRequired="true" />
    </form>
    <BaseDivider />
    <div class="footer">
      <ButtonItem :secondaryStyle="true" @click="close">Отмена</ButtonItem>
      <ButtonItem type="submit" form="editProjectForm">Сохранить</ButtonItem>
    </div>
  </ModalOverlay>
</template>

<script>
import InputItem from "@/components/Form/InputItem.vue";
export default {
  name: "EditProject",
  components: {
    InputItem,
  },
  props: {
    projectData: Object,
  },
  data() {
    return {
      query: {
        _id: this.projectData._id,
        code: this.projectData.code,
        name: this.projectData.name,
      },
    };
  },
  methods: {
    close() {
      this.$emit("close", false);
    },
    editProject() {
      this.$api.Projects.editProjectsRequest(this.query).then(() => {
        this.close();
      });
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
