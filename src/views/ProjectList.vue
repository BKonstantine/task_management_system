<template>
  <PageContainer>
    <FilterContainer>
      <SearchInput v-model="filterValue" @click="setClear" />
      <SelectWithButton
        v-model="sortValue"
        :items="sortList"
        @filter-click="getProjectsWithFilter"
      />
      <ButtonItem :secondaryStyle="true" @click="toggleModal">
        Добавить
      </ButtonItem>
    </FilterContainer>
    <ul v-if="getProjectsLength > 0" class="project-list">
      <ProjectItem
        :projectData="project"
        :key="index"
        :index="index"
        v-for="(project, index) in getProjectsList"
      />
      <li v-if="getTotalPage > 1 && getProjectsLength > 0" class="block"></li>
    </ul>
    <PaginationItem
      v-if="getTotalPage > 1 && getProjectsLength > 0"
      :totalPage="getTotalPage"
      :currentPage="getCurrentPage"
      @prev-page="prevPage"
      @next-page="nextPage"
      @curr-page="currPage"
      class="project-list__pagination"
    />
    <StopperContainer v-if="getProjectsLength === 0 && !getRequestStatus">
      <BaseText v-if="!useFilter">Не создан ни один проект</BaseText>
      <ButtonItem v-if="!useFilter">Добавить</ButtonItem>
      <BaseText v-if="useFilter">
        Ни один проект не соответствует результатам поиска
      </BaseText>
    </StopperContainer>
    <CreateProject v-if="modal" @close="toggleModal" />
  </PageContainer>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import CreateProject from "@/components/Modal/CreateProject.vue";
import SearchInput from "@/components/Form/SearchInput.vue";
import ProjectItem from "@/components/ProjectItem.vue";
import PaginationItem from "@/components/PaginationItem.vue";
import SelectWithButton from "@/components/Form/SelectWithButton.vue";
export default {
  name: "ProjectList",
  components: {
    CreateProject,
    ProjectItem,
    PaginationItem,
    SearchInput,
    SelectWithButton,
  },
  data() {
    return {
      sortList: [
        { label: "По названию", value: "name" },
        { label: "По автору", value: "author" },
        { label: "По дате создания", value: "dateCreated" },
        { label: "По дате обновления", value: "dateEdited" },
      ],
      useFilter: false,
      modal: false,
    };
  },
  methods: {
    ...mapActions({
      fetchAllUsers: "usersModule/fetchAllUsers",
      fetchProjects: "projectsModule/fetchProjects",
      setCurrentPage: "projectsModule/setCurrentPage",
      setFilterValue: "projectsModule/setFilterValue",
      setSortValue: "projectsModule/setSortValue",
      setClear: "projectsModule/setClear",
    }),
    getProjectsWithFilter() {
      if ("filter" in this.projectQuery) {
        this.useFilter = true;
        this.setCurrentPage(1);
      }
      this.fetchProjects({ ...this.projectQuery, page: this.getCurrentPage });
    },
    prevPage() {
      const page = this.getCurrentPage - 1;
      this.setCurrentPage(page);
      this.fetchProjects({ ...this.projectQuery, page: page });
      if ("filter" in this.projectQuery) {
        this.useFilter = true;
      }
    },
    nextPage() {
      const page = this.getCurrentPage + 1;
      this.setCurrentPage(page);
      this.fetchProjects({ ...this.projectQuery, page: page });
      if ("filter" in this.projectQuery) {
        this.useFilter = true;
      }
    },
    currPage(data) {
      this.setCurrentPage(data);
      this.fetchProjects({ ...this.projectQuery, page: data });
      if ("filter" in this.projectQuery) {
        this.useFilter = true;
      }
    },
    toggleModal() {
      this.modal = !this.modal;
    },
  },
  computed: {
    ...mapGetters("projectsModule", [
      "getProjectsLength",
      "getTotalPage",
      "getProjectsList",
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

    projectQuery() {
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
    this.fetchProjects({
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
.project-list {
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
</style>
