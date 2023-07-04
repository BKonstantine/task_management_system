<template>
  <PageContainer>
    <FilterContainer>
      <BaseInput />
      <NavLink
        :to="{ name: 'CreateTask' }"
        class="button"
        text="Добавить"
        :secondaryStyle="true"
      />
    </FilterContainer>
    <ul v-if="getTasksLength > 0" class="task-list">
      <TaskItem
        :taskData="task"
        :key="index"
        :index="index"
        v-for="(task, index) in getTasksList"
      />
      <li v-if="getTasksTotalPage > 1" class="block"></li>
    </ul>
    <PaginationItem
      v-if="getTasksTotalPage > 1"
      :totalPage="getTasksTotalPage"
      :currentPage="getCurrentTasksPage"
      @prev-page="prevPage"
      @next-page="nextPage"
      @curr-page="currPage"
      class="task-list__pagination"
    />
    <StopperContainer v-if="getTasksLength === 0 && !getTasksRequestStatus">
      <BaseText>Не создано ни одной задачи</BaseText>
    </StopperContainer>
  </PageContainer>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
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
    ...mapActions(["fetchTasks", "setCurrentTasksPage"]),
    prevPage() {
      const page = this.getCurrentTasksPage - 1;
      this.setCurrentTasksPage(page);
      this.fetchTasks({ page: page });
    },
    nextPage() {
      const page = this.getCurrentTasksPage + 1;
      this.setCurrentTasksPage(page);
      this.fetchTasks({ page: page });
    },
    currPage(data) {
      this.setCurrentTasksPage(data);
      this.fetchTasks({ page: data });
    },
  },
  computed: {
    ...mapGetters([
      "getTasksLength",
      "getTasksList",
      "getTasksTotalPage",
      "getTasksRequestStatus",
      "getCurrentTasksPage",
    ]),
  },
  beforeMount() {
    this.fetchTasks({
      page: this.getCurrentTasksPage,
    });
  },
};
</script>

<style lang="scss" scoped>
.task-list {
  @include flex-setting(column, _, _, 10px);

  &__pagination {
    padding: 20px 44px;
    position: fixed;
    bottom: 0;
    left: 0px;
    z-index: 1;
  }
}

.block {
  height: 72px;
  list-style: none;
}

.button {
  margin-left: auto;
}
</style>
