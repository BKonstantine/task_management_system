<template>
  <PageContainer>
    <ul v-if="tasksLength > 0" class="task-list">
      <TaskItem
        :taskData="item"
        :key="index"
        v-for="(item, index) in taskData"
      />
    </ul>
    <StopperContainer v-if="tasksLength === 0 && !request">
      <BaseText>Не создано ни одной задачи</BaseText>
    </StopperContainer>
  </PageContainer>
</template>

<script>
import TaskItem from "@/components/TaskItem.vue";
import { mapState, mapActions, mapGetters } from "vuex";
export default {
  name: "TaskList",
  components: {
    TaskItem,
  },
  methods: {
    ...mapActions(["fetchTasks"]),
  },
  computed: {
    ...mapGetters(["getTasksLength"]),
    ...mapState({
      tasksList: (state) => state.taskModule.tasksList,
      request: (state) => state.taskModule.tasksDataRequest,
    }),
    tasksLength: function () {
      return this.getTasksLength;
    },
  },
  beforeMount() {
    this.fetchTasks();
  },
};
</script>

<style lang="scss" scoped>
.task-list {
  height: 100%;
  @include flex-setting(column, _, _, 10px);
}
</style>
