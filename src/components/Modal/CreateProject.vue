<template>
  <ModalOverlay>
    <div class="header">
      <BaseTitle type="h2">Создание проекта</BaseTitle>
    </div>
    <BaseDivider />
    <form class="form" id="createProjectForm" @submit.prevent="createProject">
      <InputItem v-model="query.code" label="Код" :isRequired="true" />
      <TextareaItem
        v-model="query.name"
        label="Название"
        :isRequired="true"
        :small="true"
      />
    </form>
    <BaseDivider />
    <div class="footer">
      <ButtonItem :secondaryStyle="true" @click="close">Отмена</ButtonItem>
      <ButtonItem type="submit" form="createProjectForm">
        Создать проект
      </ButtonItem>
    </div>
  </ModalOverlay>
</template>

<script>
import InputItem from "@/components/Form/InputItem.vue";
import TextareaItem from "../Form/TextareaItem.vue";
export default {
  name: "CreateProject",
  components: {
    InputItem,
    TextareaItem,
  },
  data() {
    return {
      query: {
        code: null,
        name: null,
      },
    };
  },

  methods: {
    close() {
      this.$emit("close");
    },
    createProject() {
      this.$api.Projects.createProjectRequest(this.query).then(() => {
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
