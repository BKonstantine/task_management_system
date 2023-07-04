<template>
  <PageContainer>
    <FilterContainer>
      <BaseInput />
      <ButtonItem class="button" :secondaryStyle="true">Добавить</ButtonItem>
    </FilterContainer>
    <ul v-if="getProjectsLength > 0" class="project-list">
      <ProjectItem
        :projectData="project"
        :key="index"
        :index="index"
        v-for="(project, index) in getProjectsPage(this.getCurrentProjectsPage)"
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
      <ButtonItem text="Добавить" />
    </StopperContainer>
  </PageContainer>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import ProjectItem from "@/components/ProjectItem.vue";
import PaginationItem from "@/components/PaginationItem.vue";
export default {
  name: "ProjectList",
  components: {
    ProjectItem,
    PaginationItem,
  },
  data() {
    return {
      currentPage: 1,
    };
  },
  methods: {
    ...mapActions(["fetchProjects", "setCurrentProjectsPage"]),
    prevPage() {
      const page = this.getCurrentProjectsPage - 1;
      this.setCurrentProjectsPage(page);
    },
    nextPage() {
      const page = this.getCurrentProjectsPage + 1;
      this.setCurrentProjectsPage(page);
    },
    currPage(data) {
      this.setCurrentProjectsPage(data);
    },
  },
  computed: {
    ...mapGetters([
      "getProjectsLength",
      "getProjectsTotalPage",
      "getProjectsPage",
      "getProjectsRequestStatus",
      "getCurrentProjectsPage",
    ]),
  },
  beforeMount() {
    this.fetchProjects();
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

.button {
  margin-left: auto;
}
</style>
