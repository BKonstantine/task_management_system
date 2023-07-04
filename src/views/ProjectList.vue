<template>
  <PageContainer>
    <FilterContainer>
      <SearchInput v-model="filterValue" @click="setClearFilterValue" />
      <SelectWithButton
        v-model="sortValue"
        :items="sortList"
        @filter-click="getProjectWithFilter"
      />
      <ButtonItem :secondaryStyle="true">Добавить</ButtonItem>
    </FilterContainer>
    <ul v-if="getProjectsLength > 0" class="project-list">
      <ProjectItem
        :projectData="project"
        :key="index"
        :index="index"
        v-for="(project, index) in getProjectsList"
      />
      <li v-if="getProjectsTotalPage > 1" class="block"></li>
    </ul>
    <PaginationItem
      v-if="getProjectsTotalPage > 1"
      :totalPage="getProjectsTotalPage"
      :currentPage="getCurrentProjectsPage"
      @prev-page="prevPage"
      @next-page="nextPage"
      @curr-page="currPage"
      class="project-list__pagination"
    />
    <StopperContainer
      v-if="getProjectsLength === 0 && !getProjectsRequestStatus"
    >
      <BaseText>Не создан ни один проект</BaseText>
      <ButtonItem>Добавить</ButtonItem>
    </StopperContainer>
  </PageContainer>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import SearchInput from "@/components/Form/SearchInput.vue";
import ProjectItem from "@/components/ProjectItem.vue";
import PaginationItem from "@/components/PaginationItem.vue";
import SelectWithButton from "@/components/Form/SelectWithButton.vue";
export default {
  name: "ProjectList",
  components: {
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
    };
  },
  methods: {
    ...mapActions([
      "fetchProjects",
      "setCurrentProjectsPage",
      "setFilterValue",
      "setSortValue",
      "setClearFilterValue",
    ]),
    getProjectWithFilter() {
      this.fetchProjects({
        sort: {
          field: this.sortValue,
        },
      });
    },
    prevPage() {
      const page = this.getCurrentProjectsPage - 1;
      this.setCurrentProjectsPage(page);
      this.fetchProjects({
        page: page,
      });
    },
    nextPage() {
      const page = this.getCurrentProjectsPage + 1;
      this.setCurrentProjectsPage(page);
      this.fetchProjects({
        page: page,
      });
    },
    currPage(data) {
      this.setCurrentProjectsPage(data);
      this.fetchProjects({
        page: data,
      });
    },
  },
  computed: {
    ...mapGetters([
      "getProjectsLength",
      "getProjectsTotalPage",
      "getProjectsList",
      "getProjectsRequestStatus",
      "getCurrentProjectsPage",
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
  },
  beforeMount() {
    this.fetchProjects({
      page: this.getCurrentProjectsPage,
    });
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
