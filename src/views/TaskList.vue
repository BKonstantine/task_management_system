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
import TaskItem from "@/components/TaskItem.vue";
export default {
  name: "TaskList",
  components: {
    TaskItem,
  },
};
</script>

<style lang="scss" scoped>
.task-list {
  height: 100%;
  @include flex-setting(column, _, _, 10px);
}
</style>
