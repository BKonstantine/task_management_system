<template>
  <PageContainer>
    <ul v-if="tasksLength > 0" class="task-list">
      <TaskItem
        :taskData="task"
        :key="index"
        :index="index"
        v-for="(task, index) in tasksList"
      />
      <li v-if="totalPage > 1" class="block"></li>
    </ul>
    <PaginationItem
      v-if="totalPage > 1"
      :totalPage="totalPage"
      :currentPage="currentPage"
      @prev-page="prevPage"
      @next-page="nextPage"
      @curr-page="currPage"
      class="task-list__pagination"
    />
    <StopperContainer v-if="tasksLength === 0 && !request">
      <BaseText>Не создано ни одной задачи</BaseText>
    </StopperContainer>
  </PageContainer>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import TaskItem from "@/components/TaskItem.vue";
import PaginationItem from "@/components/PaginationItem.vue";
export default {
  name: "TaskList",
  components: {
    TaskItem,
    PaginationItem,
  },
  data() {
    return {
      currentPage: 1,
    };
  },
  methods: {
    ...mapActions(["fetchTasks"]),
    prevPage(data) {
      this.currentPage -= data;
      this.fetchTasks({ page: this.currentPage });
    },
    nextPage(data) {
      this.currentPage += data;
      this.fetchTasks({ page: this.currentPage });
    },
    currPage(data) {
      this.currentPage = data;
      this.fetchTasks({ page: this.currentPage });
    },
  },
  computed: {
    ...mapGetters(["getTasksLength"]),
    ...mapState({
      tasksList: (state) => state.taskModule.tasksList,
      totalPage: (state) => state.taskModule.totalPage,
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
  @include flex-setting(column, _, _, 10px);

  &__pagination {
    position: fixed;
    bottom: 0;
    left: 24px;
    z-index: 1;
  }
}

.block {
  height: 48px;
  list-style: none;
}
</style>
