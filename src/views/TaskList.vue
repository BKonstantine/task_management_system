<template>
  <PageContainer>
    <FilterContainer>
      <SearchInput v-model="filterValue" @click="setClear" />
      <SelectWithButton
        v-model="sortValue"
        :items="sortList"
        @filter-click="getTasksWithFilter"
      />
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
      <li v-if="getTotalPage > 1" class="block"></li>
    </ul>
    <PaginationItem
      v-if="getTotalPage > 1"
      :totalPage="getTotalPage"
      :currentPage="getCurrentPage"
      @prev-page="prevPage"
      @next-page="nextPage"
      @curr-page="currPage"
      class="task-list__pagination"
    />
    <StopperContainer v-if="getTasksLength === 0 && !getRequestStatus">
      <BaseText>Не создано ни одной задачи</BaseText>
    </StopperContainer>
  </PageContainer>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import TaskItem from "@/components/TaskItem.vue";
import PaginationItem from "@/components/PaginationItem.vue";
import SearchInput from "@/components/Form/SearchInput.vue";
import SelectWithButton from "@/components/Form/SelectWithButton.vue";
export default {
  name: "TaskList",
  components: {
    TaskItem,
    PaginationItem,
    SearchInput,
    SelectWithButton,
  },
  data() {
    return {
      sortList: [
        { label: "По названию", value: "name" },
        { label: "По автору", value: "author" },
        { label: "По статусу", value: "status" },
        { label: "По исполнителю", value: "executor" },
        { label: "По дате создания", value: "dateCreated" },
        { label: "По дате обновления", value: "dateEdited" },
      ],
      useFilter: false,
    };
  },
  methods: {
    ...mapActions("tasksModule", [
      "fetchTasks",
      "setCurrentPage",
      "setFilterValue",
      "setClear",
      "setSortValue",
    ]),
    getTasksWithFilter() {
      this.fetchProjects({
        ...this.taskQuery,
        page: this.getCurrentPage,
      });
      if ("filter" in this.projectQuery) {
        this.useFilter = true;
      }
    },
    prevPage() {
      const page = this.getCurrentPage - 1;
      this.setCurrentPage(page);
      this.fetchTasks({ page: page });
    },
    nextPage() {
      const page = this.getCurrentPage + 1;
      this.setCurrentPage(page);
      this.fetchTasks({ page: page });
    },
    currPage(data) {
      this.setCurrentPage(data);
      this.fetchTasks({ page: data });
    },
  },
  computed: {
    ...mapGetters("tasksModule", [
      "getTasksLength",
      "getTasksList",
      "getTotalPage",
      "getRequestStatus",
      "getCurrentPage",
    ]),

    filterValue: {
      get() {
        return this.getFilterValue;
      },
      set(value) {
        this.setFilterValue(value);
      },
    },

    sortValue: {
      get() {
        return this.getSortValue;
      },
      set(value) {
        this.setSortValue(value);
      },
    },

    taskQuery() {
      const query = {
        sort: {
          field: this.sortValue,
          type: "desc",
        },
      };
      if (this.filterValue) {
        query.filter = {
          name: this.filterValue,
        };
      }

      return query;
    },
  },
  beforeMount() {
    this.fetchTasks({
      page: this.getCurrentPage,
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
