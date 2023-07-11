<template>
  <PageContainer>
    <FilterContainer>
      <SearchInput v-model="filterValue" @click="handleClear" />
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
    <ul v-if="tasksLength > 0" class="task-list">
      <TaskItem
        :taskData="task"
        :key="index"
        :index="index"
        v-for="(task, index) in tasksList"
      />
      <li v-if="totalPage > 1 && tasksLength > 0" class="block"></li>
    </ul>
    <PaginationItem
      v-if="totalPage > 1 && tasksLength > 0"
      :totalPage="totalPage"
      :currentPage="currentPage"
      @prev-page="prevPage"
      @next-page="nextPage"
      @curr-page="currPage"
      class="task-list__pagination"
    />
    <StopperContainer v-if="tasksLength === 0 && !requestStatus">
      <BaseText v-if="!isFiltered">Не создано ни одной задачи</BaseText>
      <BaseText v-if="isFiltered">
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
    };
  },
  methods: {
    ...mapActions({
      fetchAllUsers: "usersModule/fetchAllUsers",
      fetchTasks: "tasksModule/fetchTasks",
      setCurrentPage: "tasksModule/setCurrentPage",
      setFilterValue: "tasksModule/setFilterValue",
      setClear: "tasksModule/setClear",
      setSortValue: "tasksModule/setSortValue",
    }),
    getTasksWithFilter() {
      if (this.getFilterValue) {
        this.setCurrentPage(1);
      }
      this.fetchTasks({ ...this.taskQuery });
    },
    prevPage() {
      const page = this.currentPage - 1;
      this.setCurrentPage(page);
      this.fetchTasks({ ...this.taskQuery });
    },
    nextPage() {
      const page = this.currentPage + 1;
      this.setCurrentPage(page);
      this.fetchTasks({ ...this.taskQuery });
    },
    currPage(data) {
      this.setCurrentPage(data);
      this.fetchTasks({ ...this.taskQuery });
    },

    setHandleFilterValue() {
      switch (this.$route.query.from) {
        case "profile":
          this.setFilterValue({ author: this.$route.query.id });
          break;
        case "projects":
          this.setFilterValue({ projectId: this.$route.query.id });
          break;
        default:
          this.setFilterValue({ author: this.$route.query.id });
          break;
      }
    },
    handleClear() {
      this.setClear();
      this.setHandleFilterValue();
    },
  },
  computed: {
    ...mapGetters({
      tasksLength: "tasksModule/getTasksLength",
      tasksList: "tasksModule/getTasksList",
      totalPage: "tasksModule/getTotalPage",
      requestStatus: "tasksModule/getRequestStatus",
      currentPage: "tasksModule/getCurrentPage",
      getSortValue: "tasksModule/getSortValue",
      getFilterValue: "tasksModule/getFilterValue",
      taskQuery: "tasksModule/getTaskQuery",
      isFiltered: "tasksModule/getFiltered",
    }),

    filterValue: {
      get() {
        if (this.getFilterValue.name === "") {
          this.setHandleFilterValue();
        }
        return this.getFilterValue.name;
      },
      set(value) {
        this.setFilterValue({ name: value });
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
  },
  beforeMount() {
    this.setHandleFilterValue();
    this.fetchTasks(this.taskQuery);
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
