<template>
  <PageContainer>
    <div class="create-task">
      <BaseTitle class="create-task__title">Редактирование задачи</BaseTitle>
      <BaseDivider />
      <form class="create-task__form" id="createTaskForm" @submit="createTask">
        <InputItem
          v-model="taskData.name"
          :horizontal="true"
          :isRequired="true"
          label="Название"
        />
        <TextareaItem
          v-model="taskData.description"
          :horizontal="true"
          label="Описание"
        />
        <div class="wrapper">
          <div class="wrapper__input">
            <InputLabel :isRequired="true">Проект</InputLabel>
            <SelectItem
              v-model="taskData.projectId"
              :items="getProjectsForOptions"
              placeholder="Не выбран..."
              :zIndex="2"
            />
          </div>
        </div>
        <div class="wrapper">
          <div class="wrapper__input">
            <InputLabel>Исполнитель</InputLabel>
            <SelectItem
              v-model="taskData.executor"
              :items="getUsersForOptions"
              placeholder="Не назначен..."
              :zIndex="1"
            />
          </div>
        </div>
      </form>
      <BaseDivider />
      <div class="create-task__buttons">
        <ButtonItem :secondaryStyle="true" @click="goBackPage">
          Отмена
        </ButtonItem>
        <ButtonItem type="submit" form="createTaskForm">
          Сохранить изменения
        </ButtonItem>
      </div>
    </div>
  </PageContainer>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import TextareaItem from "@/components/Form/TextareaItem.vue";
import InputItem from "@/components/Form/InputItem.vue";
import SelectItem from "@/components/Form/SelectItem.vue";
export default {
  name: "EditTask",
  components: {
    SelectItem,
    InputItem,
    TextareaItem,
  },
  data() {
    return {
      taskData: {
        name: "",
        description: "",
        projectId: "",
        executor: "648af1e37287972ce8676f02",
      },
    };
  },
  methods: {
    ...mapActions(["fetchProjects"]),
    goBackPage() {
      this.$router.go(-1);
    },
    createTask(e) {
      e.preventDefault();
    },
  },
  computed: {
    ...mapGetters(["getUsersForOptions", "getProjectsForOptions"]),
  },
  beforeMount() {
    this.fetchProjects();
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
    @include flex-setting(column, _, _, 24px);
    max-width: 720px;
    height: 100%;
    padding: 32px 24px 24px 24px;
  }
  &__buttons {
    padding: 10px;
    @include flex-setting(_, center, flex-end, 24px);
  }
}

.wrapper {
  @include flex-setting(column, _, _, 8px);
  width: 100%;

  &__input {
    @include flex-setting(_, _, _, 8px);
  }
}
</style>
