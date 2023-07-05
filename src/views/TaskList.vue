<template>
  <PageContainer>
    <FilterContainer>
      <SearchInput v-model="filterValue" @click="setClear" />
      <ButtonIcon :secondaryStyle="true">
        <SvgIcon id="#filter" />
      </ButtonIcon>
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
      <li v-if="getTotalPage > 1 && getTasksLength > 0" class="block"></li>
    </ul>
    <PaginationItem
      v-if="getTotalPage > 1 && getTasksLength > 0"
      :totalPage="getTotalPage"
      :currentPage="getCurrentPage"
      @prev-page="prevPage"
      @next-page="nextPage"
      @curr-page="currPage"
      class="task-list__pagination"
    />
    <StopperContainer v-if="getTasksLength === 0 && !getRequestStatus">
      <BaseText v-if="!useFilter">Не создано ни одной задачи</BaseText>
      <BaseText v-if="useFilter">
        Ни одна задача не соответствует результатам поиска/фильтрации
      </BaseText>
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
    ...mapActions(["fetchAllUsers"]),
    ...mapActions("tasksModule", [
      "fetchTasks",
      "setCurrentPage",
      "setFilterValue",
      "setClear",
      "setSortValue",
    ]),
    getTasksWithFilter() {
      this.fetchTasks({
        ...this.taskQuery,
        page: this.getCurrentPage,
      });
      if ("filter" in this.taskQuery) {
        this.useFilter = true;
      }
    },
    prevPage() {
      const page = this.getCurrentPage - 1;
      this.setCurrentPage(page);
      this.fetchTasks({ ...this.taskQuery, page: page });
      if ("filter" in this.taskQuery) {
        this.useFilter = true;
      }
    },
    nextPage() {
      const page = this.getCurrentPage + 1;
      this.setCurrentPage(page);
      this.fetchTasks({ ...this.taskQuery, page: page });
      if ("filter" in this.taskQuery) {
        this.useFilter = true;
      }
    },
    currPage(data) {
      this.setCurrentPage(data);
      this.fetchTasks({ ...this.taskQuery, page: data });
      if ("filter" in this.taskQuery) {
        this.useFilter = true;
      }
    },
  },
  computed: {
    ...mapGetters("tasksModule", [
      "getTasksLength",
      "getTasksList",
      "getTotalPage",
      "getRequestStatus",
      "getCurrentPage",
      "getSortValue",
      "getFilterValue",
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
        query.filter = { name: this.filterValue };
      }
      return query;
    },
  },
  beforeMount() {
    this.fetchTasks({
      page: this.getCurrentPage,
      sort: {
        field: this.sortValue,
        type: "desc",
      },
    });
    this.fetchAllUsers();
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
