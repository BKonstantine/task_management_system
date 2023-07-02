<template>
  <PageContainer>
    <div class="create-task">
      <BaseTitle class="create-task__title">Создание задачи</BaseTitle>
      <BaseDivider />
      <form class="create-task__form" id="createTaskForm" @submit="createTask">
        <div class="wrapper">
          <div class="wrapper__input">
            <InputLabel :isRequired="true">Название</InputLabel>
            <BaseInput v-model="taskData.name" />
          </div>
        </div>
        <div class="wrapper">
          <div class="wrapper__input">
            <InputLabel>Описание</InputLabel>
            <BaseTextarea v-model="taskData.description" />
          </div>
        </div>
        <div class="wrapper">
          <div class="wrapper__input">
            <InputLabel :isRequired="true">Проект</InputLabel>
            <SelectItem
              v-model="taskData.projectId"
              :items="getProjectsForOptions"
              placeholder="Не выбран..."
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
            />
          </div>
        </div>
      </form>
      <BaseDivider />
      <div class="create-task__buttons">
        <ButtonItem text="Отмена" :secondaryStyle="true" @click="goBackPage" />
        <ButtonItem type="submit" text="Создать задачу" form="createTaskForm" />
      </div>
    </div>
  </PageContainer>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import SelectItem from "@/components/Form/SelectItem.vue";
import { createTaskRequest } from "@/api/tasks";
export default {
  name: "CreateTask",
  components: {
    SelectItem,
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
      createTaskRequest(this.taskData).then((res) => {
        console.log(res);
        this.$router.replace({ name: "Tasks" });
      });
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
