<template>
  <PageContainer>
    <ul class="task-list">
      <TaskItem
        :taskData="item"
        :key="index"
        v-for="(item, index) in taskData"
      />
    </ul>
    <StopperContainer>
      <BaseText>Не создано ни одной задачи</BaseText>
    </StopperContainer>
  </PageContainer>
</template>

<script>
import PageContainer from "@/components/UI/PageContainer.vue";
import TaskItem from "@/components/TaskItem.vue";
export default {
  name: "TaskList",

  components: {
    PageContainer,
    TaskItem,
  },

  data() {
    return {
      taskData: [
        {
          title: "Название",
          number: "#1",
          status: "Черновик",
          created: "Иванов И.И. создал 1 час назад",
          changed: "Баранов В.В. изменил 1 минуту назад",
        },
        {
          title: "Название",
          number: "#1",
          status: "Черновик",
          created: "Иванов И.И. создал 1 час назад",
          changed: "Баранов В.В. изменил 1 минуту назад",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.task-list {
  height: 100%;
  @include flex-setting(column, _, _, 10px);
}
</style>
