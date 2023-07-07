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
    <ul v-if="projectsLength > 0" class="project-list">
      <ProjectItem
        :projectData="project"
        :key="index"
        :index="index"
        v-for="(project, index) in projectsList"
      />
      <li v-if="totalPage > 1 && projectsLength > 0" class="block"></li>
    </ul>
    <PaginationItem
      v-if="totalPage > 1 && projectsLength > 0"
      :totalPage="totalPage"
      :currentPage="currentPage"
      @prev-page="prevPage"
      @next-page="nextPage"
      @curr-page="currPage"
      class="project-list__pagination"
    />
    <StopperContainer v-if="projectsLength === 0 && !requestStatus">
      <BaseText v-if="!isFiltered">Не создан ни один проект</BaseText>
      <ButtonItem v-if="!isFiltered">Добавить</ButtonItem>
      <BaseText v-if="isFiltered">
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
      if (this.getFilterValue) {
        this.setCurrentPage(1);
      }
      this.fetchProjects({ ...this.projectQuery, page: this.getCurrentPage });
    },
    prevPage() {
      const page = this.getCurrentPage - 1;
      this.setCurrentPage(page);
      this.fetchProjects({ ...this.projectQuery, page: page });
    },
    nextPage() {
      const page = this.getCurrentPage + 1;
      this.setCurrentPage(page);
      this.fetchProjects({ ...this.projectQuery, page: page });
    },
    currPage(data) {
      this.setCurrentPage(data);
      this.fetchProjects({ ...this.projectQuery, page: data });
    },
    toggleModal() {
      this.modal = !this.modal;
    },
  },
  computed: {
    ...mapGetters({
      projectsLength: "projectsModule/getProjectsLength",
      totalPage: "projectsModule/getTotalPage",
      projectsList: "projectsModule/getProjectsList",
      requestStatus: "projectsModule/getRequestStatus",
      currentPage: "projectsModule/getCurrentPage",
      getSortValue: "projectsModule/getSortValue",
      getFilterValue: "projectsModule/getFilterValue",
      projectQuery: "projectsModule/getProjectQuery",
      isFiltered: "projectsModule/getFiltered",
    }),

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
